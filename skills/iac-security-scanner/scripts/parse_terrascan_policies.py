#!/usr/bin/env python3
"""
Parse Terrascan policies and generate markdown reference files.
Usage: python parse_terrascan_policies.py /path/to/terrascan/pkg/policies/opa/rego ./output
"""

import base64
import json
import re
import sys
from collections import defaultdict
from pathlib import Path


CATEGORY_TO_NIST = {
    "NETWORK_SECURITY": ["SC-7", "SC-8", "AC-4"],
    "ENCRYPTION": ["SC-13", "SC-28", "SC-8"],
    "IDENTITY_AND_ACCESS_MANAGEMENT": ["AC-2", "AC-3", "AC-6", "IA-2"],
    "LOGGING": ["AU-2", "AU-3", "AU-6", "AU-12"],
    "DATA_PROTECTION": ["SC-28", "MP-4", "MP-5"],
    "INFRASTRUCTURE_SECURITY": ["CM-2", "CM-6", "CM-7"],
    "RESILIENCE": ["CP-9", "CP-10", "SC-5"],
}


# ---------------------------------------------------------------------------
# retVal parser — extract structured remediation from Rego policies
# ---------------------------------------------------------------------------

def parse_retval(rego_content: str) -> dict | None:
    """Extract Traverse, Expected, Actual, ReplaceType from retVal in Rego."""
    # Always check for helper function call pattern first to build parameter mappings
    # e.g. retval := getretval(sg.id, traverse_attribute, ...)
    extra_vars = {}
    helper_match = re.search(
        r'ret[Vv]al\s*:=\s*(\w+)\(([^)]*)\)', rego_content
    )
    if helper_match:
        func_name = helper_match.group(1)
        call_args = [a.strip() for a in helper_match.group(2).split(",")]
        func_def = re.search(
            rf'{func_name}\(([^)]*)\)\s*=\s*\w+\s*\{{',
            rego_content,
        )
        if func_def:
            func_params = [p.strip() for p in func_def.group(1).split(",")]
            for param, arg in zip(func_params, call_args):
                extra_vars[param] = arg

    # Match retVal := { ... } — handles quoted strings that may contain }
    pattern = r'ret[Vv]al\s*:=\s*\{((?:[^}"]|"[^"]*")*)\}'
    match = re.search(pattern, rego_content, re.DOTALL)

    if not match:
        return None

    block = match.group(1)

    # Build a variable resolution table from earlier assignments in the Rego
    var_table = _build_var_table(rego_content)

    # Resolve helper function parameter → call-site argument → variable value
    for param, arg in extra_vars.items():
        if arg in var_table:
            var_table[param] = var_table[arg]
        elif re.match(r'^[a-zA-Z_]\w*$', arg):
            # Try to resolve transitively
            resolved = _resolve_var(arg, var_table, rego_content)
            if resolved != arg:
                var_table[param] = resolved

    def extract_field(name: str) -> str | None:
        # Match "FieldName": value patterns inside the retVal block
        m = re.search(rf'"{name}"\s*:\s*(.+?)(?:,\s*"|}})', block)
        if m:
            raw = m.group(1).strip().rstrip(",").strip()
            # Resolve variable references (unquoted identifiers)
            resolved = _resolve_var(raw, var_table, rego_content)
            return resolved
        return None

    result = {}
    result["ReplaceType"] = _unquote(extract_field("ReplaceType") or "edit")
    result["Traverse"] = _unquote(extract_field("Traverse") or "")
    result["Attribute"] = _unquote(extract_field("Attribute") or "")
    result["AttributeDataType"] = _unquote(extract_field("AttributeDataType") or "string")

    expected_raw = extract_field("Expected")
    actual_raw = extract_field("Actual")
    result["Expected"] = _parse_rego_value(expected_raw)
    result["Actual"] = _parse_rego_value(actual_raw)

    # Skip template variables (e.g. {{.required_parameter}})
    if result["Traverse"] and "{{" in result["Traverse"]:
        result["Traverse"] = ""

    return result


def _build_var_table(rego_content: str) -> dict[str, str]:
    """Build a table of variable assignments from Rego content.

    Matches patterns like:
        traverse := "enable_https_traffic_only"
        traverse = "publicly_accessible"
    """
    table = {}
    for m in re.finditer(r'(\w+)\s*:?=\s*"([^"]*)"', rego_content):
        var_name = m.group(1)
        var_value = m.group(2)
        # Skip retVal assignments and input/config references
        if var_name not in ("retVal", "retval", "input", "config", "package"):
            table[var_name] = f'"{var_value}"'
    return table


def _resolve_var(raw: str, var_table: dict, rego_content: str) -> str:
    """Resolve a raw retVal field value, looking up variable references."""
    if not raw:
        return raw

    stripped = raw.strip()

    # Already a literal (quoted string, bool, number, null) — return as-is
    if (stripped.startswith('"') and stripped.endswith('"')):
        return stripped
    if stripped in ("true", "false", "null"):
        return stripped
    try:
        int(stripped)
        return stripped
    except (ValueError, TypeError):
        pass

    # Variable reference like "traverse" — look up in var_table
    if re.match(r'^[a-zA-Z_]\w*$', stripped):
        if stripped in var_table:
            return var_table[stripped]

        # Look for sprintf assignment: varname = sprintf("template", [args])
        sprintf_m = re.search(
            rf'{stripped}\s*:?=\s*sprintf\("([^"]+)"',
            rego_content,
        )
        if sprintf_m:
            template = re.sub(r'%[ds]', '0', sprintf_m.group(1))
            return f'"{template}"'

        # Look for any other assignment: varname := expression
        assign_m = re.search(
            rf'{stripped}\s*:?=\s*"([^"]+)"',
            rego_content,
        )
        if assign_m:
            return f'"{assign_m.group(1)}"'

    # Expression reference like "db.config.publicly_accessible" or "config.source_ranges"
    # Infer value from condition (e.g. "X.config.attr == true")
    config_match = re.search(r'(?:^|\.)config\.(\w+)', stripped)
    if config_match:
        attr_name = config_match.group(1)
        # Look for condition: X.config.attr == value
        cond = re.search(
            rf'\.config\.{re.escape(attr_name)}\s*==\s*(true|false|\d+|"[^"]*")',
            rego_content,
        )
        if cond:
            return cond.group(1)

    # sprintf expressions — extract the template
    if "sprintf" in stripped:
        m = re.search(r'sprintf\("([^"]+)"', stripped)
        if m:
            # Replace %d/%s with 0 for display purposes
            template = re.sub(r'%[ds]', '0', m.group(1))
            return f'"{template}"'

    return raw


def _unquote(s: str) -> str:
    """Remove surrounding quotes from a string."""
    if not s:
        return ""
    s = s.strip()
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1]
    return s


def _parse_rego_value(raw: str | None):
    """Parse a raw Rego value into a Python type."""
    if raw is None:
        return None
    raw = raw.strip()
    if raw == "true":
        return True
    if raw == "false":
        return False
    if raw == "null":
        return None
    if raw.startswith('"') and raw.endswith('"'):
        return raw[1:-1]
    try:
        return int(raw)
    except (ValueError, TypeError):
        pass
    return raw


# ---------------------------------------------------------------------------
# Rego condition parser — for policies without retVal
# ---------------------------------------------------------------------------

def parse_rego_conditions(rego_content: str) -> dict | None:
    """Extract attribute/value patterns from Rego conditions (non-retVal policies)."""
    # config.attr == false
    m = re.search(r'config\.(\w+)\s*==\s*false', rego_content)
    if m:
        return {"attr": m.group(1), "bad": False, "good": True}

    # config.attr == true (violation when true, e.g. publicly_accessible)
    m = re.search(r'config\.(\w+)\s*==\s*true', rego_content)
    if m:
        return {"attr": m.group(1), "bad": True, "good": False}

    # not config.attr
    m = re.search(r'not\s+\w+\.config\.(\w+)', rego_content)
    if m:
        return {"attr": m.group(1), "bad": None, "good": True}

    # object.get(config, "attr", "undefined") == "undefined"
    m = re.search(r'object\.get\(\w+\.config,\s*"(\w+)",\s*"undefined"\)', rego_content)
    if m:
        return {"attr": m.group(1), "bad": None, "good": True}

    # config.spec.type == "Value"
    m = re.search(r'config\.spec\.type\s*==\s*"([^"]+)"', rego_content)
    if m:
        return {"attr": "spec.type", "bad": m.group(1), "good": "ClusterIP"}

    # contains(config, "22") — Docker port exposure
    m = re.search(r'contains\(config[^,]*,\s*"(\d+)"\)', rego_content)
    if m:
        return {"attr": "port", "bad": m.group(1), "good": "8080"}

    # upper(...protocol) == "HTTP"
    m = re.search(r'upper\([^)]*\.(\w+)\)\s*==\s*"HTTP"', rego_content)
    if m:
        return {"attr": m.group(1), "bad": "HTTP", "good": "HTTPS"}

    # cidr pattern: 0.0.0.0/0
    if "0.0.0.0/0" in rego_content:
        return {"attr": "cidr_blocks", "bad": "0.0.0.0/0", "good": "10.0.0.0/16"}

    # Action[_] = "*" — IAM wildcard
    if 'Action' in rego_content and '"*"' in rego_content:
        return {"attr": "Action", "bad": "*", "good": "specific:Action"}

    return None


# ---------------------------------------------------------------------------
# Per-provider template generators
# ---------------------------------------------------------------------------

def generate_hcl_example(
    resource_type: str, attr_path: str, bad_value, good_value
) -> tuple[str, str, str]:
    """Generate bad/good HCL resource blocks."""
    bad_attr = _format_hcl_attr(attr_path, bad_value)
    good_attr = _format_hcl_attr(attr_path, good_value)

    bad = (
        f'resource "{resource_type}" "example" {{\n'
        f'{bad_attr}'
        f'}}\n'
    )
    good = (
        f'resource "{resource_type}" "example" {{\n'
        f'{good_attr}'
        f'}}\n'
    )
    return bad, good, "hcl"


def _format_hcl_attr(attr_path: str, value) -> str:
    """Format an HCL attribute assignment, handling nested paths."""
    if not attr_path:
        return ""

    # Strip array indices for display (e.g. "block[0].attr" → "block.attr")
    clean = re.sub(r'\[\d+\]', '', attr_path)
    parts = clean.split(".")

    if value is None:
        return f"  # {parts[-1]} = ... (not set)\n"

    formatted = _hcl_value(value)

    if len(parts) == 1:
        return f"  {parts[0]} = {formatted}\n"

    # Nested: wrap in block(s)
    lines = []
    for i, part in enumerate(parts[:-1]):
        indent = "  " * (i + 1)
        lines.append(f"{indent}{part} {{\n")
    inner_indent = "  " * len(parts)
    lines.append(f"{inner_indent}{parts[-1]} = {formatted}\n")
    for i in range(len(parts) - 2, -1, -1):
        indent = "  " * (i + 1)
        lines.append(f"{indent}}}\n")
    return "".join(lines)


def _hcl_value(value) -> str:
    """Format a Python value as HCL literal."""
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, str):
        return f'"{value}"'
    if isinstance(value, list):
        items = ", ".join(f'"{v}"' if isinstance(v, str) else str(v) for v in value)
        return f"[{items}]"
    return str(value)


def generate_k8s_example(
    resource_type: str, attr_path: str, bad_value, good_value, policy_desc: str = ""
) -> tuple[str, str, str]:
    """Generate bad/good Kubernetes YAML manifests."""
    kind = _k8s_kind(resource_type)
    api = _k8s_api(kind)

    if attr_path and "." in attr_path:
        yaml_path = attr_path.replace(".", ":\n    ")
    else:
        yaml_path = attr_path or "unknown"

    bad_val = _yaml_value(bad_value)
    good_val = _yaml_value(good_value)

    bad = (
        f"apiVersion: {api}\n"
        f"kind: {kind}\n"
        f"metadata:\n"
        f"  name: example\n"
        f"spec:\n"
        f"  {yaml_path}: {bad_val}\n"
    )
    good = (
        f"apiVersion: {api}\n"
        f"kind: {kind}\n"
        f"metadata:\n"
        f"  name: example\n"
        f"spec:\n"
        f"  {yaml_path}: {good_val}\n"
    )
    return bad, good, "yaml"


def _k8s_kind(resource_type: str) -> str:
    """Map Terraform-style k8s resource names to Kind."""
    mapping = {
        "kubernetes_pod": "Pod",
        "kubernetes_deployment": "Deployment",
        "kubernetes_service": "Service",
        "kubernetes_ingress": "Ingress",
        "kubernetes_namespace": "Namespace",
        "kubernetes_role": "Role",
        "kubernetes_cluster_role": "ClusterRole",
        "kubernetes_endpoint_slice": "EndpointSlice",
        "kubernetes_network_policy": "NetworkPolicy",
        "kubernetes_pod_security_policy": "PodSecurityPolicy",
        "kubernetes_service_account": "ServiceAccount",
        "kubernetes_cron_job": "CronJob",
        "kubernetes_daemonset": "DaemonSet",
        "kubernetes_stateful_set": "StatefulSet",
        "kubernetes_job": "Job",
    }
    return mapping.get(resource_type, resource_type.replace("kubernetes_", "").title())


def _k8s_api(kind: str) -> str:
    """Return a reasonable apiVersion for a K8s kind."""
    api_map = {
        "Pod": "v1", "Service": "v1", "Namespace": "v1", "ServiceAccount": "v1",
        "Deployment": "apps/v1", "DaemonSet": "apps/v1", "StatefulSet": "apps/v1",
        "Ingress": "networking.k8s.io/v1", "NetworkPolicy": "networking.k8s.io/v1",
        "Role": "rbac.authorization.k8s.io/v1", "ClusterRole": "rbac.authorization.k8s.io/v1",
        "CronJob": "batch/v1", "Job": "batch/v1",
        "EndpointSlice": "discovery.k8s.io/v1",
    }
    return api_map.get(kind, "v1")


def _yaml_value(value) -> str:
    """Format a Python value as YAML literal."""
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return '""  # not set'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return "\n" + "\n".join(f"    - {v}" for v in value)
    return str(value)


def generate_dockerfile_example(
    policy_name: str, bad_detail: str, good_detail: str, policy_desc: str = ""
) -> tuple[str, str, str]:
    """Generate bad/good Dockerfile snippets."""
    name_lower = policy_name.lower()

    if "expose" in name_lower or "port" in name_lower:
        bad = f"FROM ubuntu:latest\nEXPOSE {bad_detail}\nCMD [\"app\"]"
        good = f"FROM ubuntu:latest\nEXPOSE {good_detail}\nCMD [\"app\"]"
    elif "root" in name_lower or "user" in name_lower:
        bad = "FROM ubuntu:latest\nRUN apt-get update\nCMD [\"app\"]"
        good = "FROM ubuntu:latest\nRUN apt-get update\nUSER nonroot\nCMD [\"app\"]"
    elif "add" in name_lower or "copy" in name_lower:
        bad = "FROM ubuntu:latest\nADD https://example.com/app.tar.gz /opt/\nCMD [\"app\"]"
        good = "FROM ubuntu:latest\nCOPY app.tar.gz /opt/\nCMD [\"app\"]"
    elif "latest" in name_lower or "tag" in name_lower:
        bad = "FROM ubuntu:latest\nCMD [\"app\"]"
        good = "FROM ubuntu:22.04\nCMD [\"app\"]"
    elif "healthcheck" in name_lower:
        bad = "FROM ubuntu:22.04\nCMD [\"app\"]"
        good = "FROM ubuntu:22.04\nHEALTHCHECK CMD curl -f http://localhost/ || exit 1\nCMD [\"app\"]"
    elif "shell" in name_lower:
        bad = "FROM ubuntu:22.04\nSHELL [\"/bin/sh\", \"-c\"]\nRUN echo hello"
        good = "FROM ubuntu:22.04\nSHELL [\"/bin/bash\", \"-eo\", \"pipefail\", \"-c\"]\nRUN echo hello"
    elif "workdir" in name_lower:
        bad = "FROM ubuntu:22.04\nRUN cd /opt && ./app"
        good = "FROM ubuntu:22.04\nWORKDIR /opt\nRUN ./app"
    elif "run" in name_lower:
        if "apt" in policy_desc.lower() or "install" in policy_desc.lower():
            bad = "FROM ubuntu:22.04\nRUN apt-get update\nRUN apt-get install -y curl"
            good = "FROM ubuntu:22.04\nRUN apt-get update && \\\n    apt-get install -y --no-install-recommends curl && \\\n    rm -rf /var/lib/apt/lists/*"
        elif "sudo" in policy_desc.lower():
            bad = "FROM ubuntu:22.04\nRUN sudo apt-get update"
            good = "FROM ubuntu:22.04\nRUN apt-get update"
        elif "pip" in policy_desc.lower():
            bad = "FROM python:3.11\nRUN pip install flask"
            good = "FROM python:3.11\nRUN pip install --no-cache-dir flask"
        elif "curl" in policy_desc.lower() or "wget" in policy_desc.lower():
            bad = "FROM ubuntu:22.04\nRUN curl -o /tmp/app http://example.com/app"
            good = "FROM ubuntu:22.04\nRUN curl -fsSL -o /tmp/app https://example.com/app"
        elif "gpg" in policy_desc.lower() or "key" in policy_desc.lower():
            bad = "FROM ubuntu:22.04\nRUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ABC123"
            good = "FROM ubuntu:22.04\nRUN curl -fsSL https://example.com/key.gpg | gpg --dearmor -o /usr/share/keyrings/example.gpg"
        else:
            bad = "FROM ubuntu:22.04\nRUN apt-get update\nRUN apt-get install -y curl\nRUN rm -rf /var/lib/apt/lists/*"
            good = "FROM ubuntu:22.04\nRUN apt-get update && \\\n    apt-get install -y --no-install-recommends curl && \\\n    rm -rf /var/lib/apt/lists/*"
    elif "from" in name_lower:
        if "scratch" in policy_desc.lower():
            bad = "FROM ubuntu:22.04\nCOPY app /app\nCMD [\"/app\"]"
            good = "FROM scratch\nCOPY app /app\nCMD [\"/app\"]"
        else:
            bad = "FROM ubuntu:latest\nCMD [\"app\"]"
            good = "FROM ubuntu:22.04\nCMD [\"app\"]"
    else:
        # Generic Dockerfile fallback
        bad = f"# Dockerfile - violates: {policy_name}\nFROM ubuntu:latest\nCMD [\"app\"]"
        good = f"# Dockerfile - satisfies: {policy_name}\nFROM ubuntu:22.04\nUSER nonroot\nCMD [\"app\"]"

    return bad, good, "dockerfile"


def generate_github_example(
    resource_type: str, attr_path: str, bad_value, good_value
) -> tuple[str, str, str]:
    """Generate bad/good HCL for GitHub provider resources."""
    return generate_hcl_example(resource_type, attr_path, bad_value, good_value)


# ---------------------------------------------------------------------------
# Hardcoded high-quality examples (preserved as-is from original)
# ---------------------------------------------------------------------------

HARDCODED_EXAMPLES: dict[str, tuple[str, str, str]] = {
    "aws_s3_bucket": (
        'resource "aws_s3_bucket" "data" {\n'
        '  bucket = "my-sensitive-data"\n'
        '  acl    = "public-read"\n'
        '}\n',
        'resource "aws_s3_bucket" "data" {\n'
        '  bucket = "my-sensitive-data"\n'
        '}\n\n'
        'resource "aws_s3_bucket_public_access_block" "data" {\n'
        '  bucket                  = aws_s3_bucket.data.id\n'
        '  block_public_acls       = true\n'
        '  block_public_policy     = true\n'
        '  ignore_public_acls      = true\n'
        '  restrict_public_buckets = true\n'
        '}\n',
        "hcl",
    ),
    "aws_s3_bucket_policy": (
        'resource "aws_s3_bucket_policy" "bad" {\n'
        '  bucket = aws_s3_bucket.data.id\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Effect = "Allow"\n'
        '        Principal = "*"\n'
        '        Action = "s3:GetObject"\n'
        '        Resource = "arn:aws:s3:::my-bucket/*"\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        'resource "aws_s3_bucket_policy" "good" {\n'
        '  bucket = aws_s3_bucket.data.id\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Effect = "Allow"\n'
        '        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}\n'
        '        Action = "s3:GetObject"\n'
        '        Resource = "arn:aws:s3:::my-bucket/*"\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        "hcl",
    ),
    "aws_kms_key": (
        'resource "aws_kms_key" "bad" {\n'
        '  description = "app key"\n'
        '  enable_key_rotation = false\n'
        '}\n',
        'resource "aws_kms_key" "good" {\n'
        '  description = "app key"\n'
        '  enable_key_rotation = true\n'
        '}\n',
        "hcl",
    ),
    "aws_security_group": (
        'resource "aws_security_group" "bad" {\n'
        '  name = "allow-ssh-world"\n'
        '  ingress {\n'
        '    from_port   = 22\n'
        '    to_port     = 22\n'
        '    protocol    = "tcp"\n'
        '    cidr_blocks = ["0.0.0.0/0"]\n'
        '  }\n'
        '}\n',
        'resource "aws_security_group" "good" {\n'
        '  name = "allow-ssh-vpn"\n'
        '  ingress {\n'
        '    from_port   = 22\n'
        '    to_port     = 22\n'
        '    protocol    = "tcp"\n'
        '    cidr_blocks = ["10.0.0.0/16"]\n'
        '  }\n'
        '}\n',
        "hcl",
    ),
    "aws_iam_role_policy": (
        'resource "aws_iam_role_policy" "bad" {\n'
        '  name = "wildcard-policy"\n'
        '  role = aws_iam_role.app.name\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = "*"\n'
        '        Effect   = "Allow"\n'
        '        Resource = "*"\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        'resource "aws_iam_role_policy" "good" {\n'
        '  name = "scoped-policy"\n'
        '  role = aws_iam_role.app.name\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]\n'
        '        Effect   = "Allow"\n'
        '        Resource = ["arn:aws:logs:*:*:log-group:/aws/lambda/app:*"]\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        "hcl",
    ),
    "aws_iam_policy": (
        'resource "aws_iam_policy" "bad" {\n'
        '  name   = "wildcard-policy"\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = "*"\n'
        '        Effect   = "Allow"\n'
        '        Resource = "*"\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        'resource "aws_iam_policy" "good" {\n'
        '  name   = "least-privilege-policy"\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = ["s3:GetObject"]\n'
        '        Effect   = "Allow"\n'
        '        Resource = ["arn:aws:s3:::my-bucket/*"]\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        "hcl",
    ),
    "aws_iam_user_policy": (
        'resource "aws_iam_user_policy" "bad" {\n'
        '  name = "wildcard-user-policy"\n'
        '  user = aws_iam_user.dev.name\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = "*"\n'
        '        Effect   = "Allow"\n'
        '        Resource = "*"\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        'resource "aws_iam_user_policy" "good" {\n'
        '  name = "scoped-user-policy"\n'
        '  user = aws_iam_user.dev.name\n'
        '  policy = jsonencode({\n'
        '    Version = "2012-10-17"\n'
        '    Statement = [\n'
        '      {\n'
        '        Action   = ["s3:ListBucket"]\n'
        '        Effect   = "Allow"\n'
        '        Resource = ["arn:aws:s3:::my-bucket"]\n'
        '      }\n'
        '    ]\n'
        '  })\n'
        '}\n',
        "hcl",
    ),
    "aws_db_instance": (
        'resource "aws_db_instance" "bad" {\n'
        '  identifier         = "mydb"\n'
        '  engine             = "mysql"\n'
        '  instance_class     = "db.t3.micro"\n'
        '  storage_encrypted  = false\n'
        '  publicly_accessible = true\n'
        '}\n',
        'resource "aws_db_instance" "good" {\n'
        '  identifier         = "mydb"\n'
        '  engine             = "mysql"\n'
        '  instance_class     = "db.t3.micro"\n'
        '  storage_encrypted  = true\n'
        '  publicly_accessible = false\n'
        '}\n',
        "hcl",
    ),
    "aws_rds_cluster": (
        'resource "aws_rds_cluster" "bad" {\n'
        '  cluster_identifier = "app-db"\n'
        '  engine             = "aurora-mysql"\n'
        '  storage_encrypted  = false\n'
        '}\n',
        'resource "aws_rds_cluster" "good" {\n'
        '  cluster_identifier = "app-db"\n'
        '  engine             = "aurora-mysql"\n'
        '  storage_encrypted  = true\n'
        '}\n',
        "hcl",
    ),
    "aws_cloudtrail": (
        'resource "aws_cloudtrail" "bad" {\n'
        '  name                          = "trail"\n'
        '  s3_bucket_name                = aws_s3_bucket.logs.id\n'
        '  is_multi_region_trail         = false\n'
        '  enable_log_file_validation    = false\n'
        '}\n',
        'resource "aws_cloudtrail" "good" {\n'
        '  name                          = "trail"\n'
        '  s3_bucket_name                = aws_s3_bucket.logs.id\n'
        '  is_multi_region_trail         = true\n'
        '  enable_log_file_validation    = true\n'
        '}\n',
        "hcl",
    ),
    "aws_cloudwatch_log_group": (
        'resource "aws_cloudwatch_log_group" "bad" {\n'
        '  name              = "/aws/lambda/app"\n'
        '  retention_in_days = 0\n'
        '}\n',
        'resource "aws_cloudwatch_log_group" "good" {\n'
        '  name              = "/aws/lambda/app"\n'
        '  retention_in_days = 90\n'
        '}\n',
        "hcl",
    ),
    "kubernetes_pod": (
        "apiVersion: v1\n"
        "kind: Pod\n"
        "metadata:\n"
        "  name: insecure\n"
        "spec:\n"
        "  containers:\n"
        "    - name: app\n"
        "      image: nginx:latest\n"
        "      securityContext:\n"
        "        privileged: true\n",
        "apiVersion: v1\n"
        "kind: Pod\n"
        "metadata:\n"
        "  name: secure\n"
        "spec:\n"
        "  containers:\n"
        "    - name: app\n"
        "      image: nginx:latest\n"
        "      securityContext:\n"
        "        runAsNonRoot: true\n"
        "        allowPrivilegeEscalation: false\n"
        "        privileged: false\n",
        "yaml",
    ),
    "kubernetes_deployment": (
        "apiVersion: apps/v1\n"
        "kind: Deployment\n"
        "metadata:\n"
        "  name: insecure\n"
        "spec:\n"
        "  template:\n"
        "    spec:\n"
        "      containers:\n"
        "        - name: app\n"
        "          image: nginx:latest\n"
        "          securityContext:\n"
        "            privileged: true\n",
        "apiVersion: apps/v1\n"
        "kind: Deployment\n"
        "metadata:\n"
        "  name: secure\n"
        "spec:\n"
        "  template:\n"
        "    spec:\n"
        "      containers:\n"
        "        - name: app\n"
        "          image: nginx:latest\n"
        "          securityContext:\n"
        "            runAsNonRoot: true\n"
        "            allowPrivilegeEscalation: false\n"
        "            privileged: false\n",
        "yaml",
    ),
}


# ---------------------------------------------------------------------------
# Main example dispatcher
# ---------------------------------------------------------------------------

def get_examples(
    resource_type: str,
    policy_name: str,
    rego_content: str,
    policy_metadata: dict,
) -> tuple[str, str, str]:
    """Return bad/good example snippets using Rego-aware generation.

    Priority:
    1. Hardcoded high-quality examples (13 resource types)
    2. retVal-based generation (structured Traverse/Expected/Actual)
    3. Rego condition pattern extraction
    4. Policy-description-driven fallback with resource type context
    """
    provider = policy_metadata.get("policy_type", "").lower()
    description = policy_metadata.get("description", "")

    # 1. Hardcoded examples for well-known resource types
    if resource_type in HARDCODED_EXAMPLES:
        return HARDCODED_EXAMPLES[resource_type]

    # 2. retVal-based generation
    if rego_content:
        retval = parse_retval(rego_content)
        if retval and retval.get("Traverse"):
            attr = retval["Traverse"]
            expected = retval["Expected"]
            actual = retval["Actual"]

            # Resolve: in the Rego, Expected is the GOOD value, Actual is the BAD value
            bad_val = actual if actual is not None else _invert_value(expected)
            good_val = expected

            # If values are unresolved or both None, use attribute-aware heuristics
            if (bad_val is None and good_val is None) or _is_unresolved(bad_val) or _is_unresolved(good_val):
                bad_val, good_val = _infer_values_from_attr(
                    attr, rego_content, retval.get("AttributeDataType", ""),
                )

            if provider == "k8s":
                return generate_k8s_example(resource_type, attr, bad_val, good_val, description)
            if provider == "docker":
                return generate_dockerfile_example(
                    policy_name, str(bad_val), str(good_val), description
                )
            return generate_hcl_example(resource_type, attr, bad_val, good_val)

        # retVal with ReplaceType "add" — try to decode base64 Expected
        if retval and retval.get("ReplaceType") == "add":
            return _handle_add_retval(retval, resource_type, provider, description)

    # 3. Rego condition pattern extraction
    if rego_content:
        cond = parse_rego_conditions(rego_content)
        if cond:
            attr = cond["attr"]
            bad_val = cond["bad"]
            good_val = cond["good"]

            if provider == "k8s":
                return generate_k8s_example(resource_type, attr, bad_val, good_val, description)
            if provider == "docker":
                return generate_dockerfile_example(
                    policy_name, str(bad_val) if bad_val else "", str(good_val), description
                )
            return generate_hcl_example(resource_type, attr, bad_val, good_val)

    # 4. Docker-specific fallback using policy name/description
    if provider == "docker":
        return generate_dockerfile_example(policy_name, "", "", description)

    # 5. K8s fallback
    if provider == "k8s":
        attr = _guess_attr_from_description(description)
        return generate_k8s_example(resource_type, attr, False, True, description)

    # 6. HCL fallback — generate a template comment with context
    attr = _guess_attr_from_description(description)
    if attr:
        return generate_hcl_example(resource_type, attr, False, True)

    return (
        f'resource "{resource_type}" "example" {{\n'
        f'  # Configure per: {policy_name}\n'
        f'}}\n',
        f'resource "{resource_type}" "example" {{\n'
        f'  # Remediated per: {policy_name}\n'
        f'}}\n',
        "hcl",
    )


def _handle_add_retval(
    retval: dict, resource_type: str, provider: str, description: str
) -> tuple[str, str, str]:
    """Handle retVal with ReplaceType='add' — decode base64 to get the good example."""
    expected = retval.get("Expected", "")
    if isinstance(expected, str) and len(expected) > 20:
        try:
            decoded = base64.b64decode(expected).decode("utf-8", errors="replace")
            # Clean up template placeholders
            decoded = re.sub(r'##\w+##', 'example', decoded)
            if decoded.strip():
                lang = "yaml" if provider == "k8s" else "hcl"
                bad = (
                    f'resource "{resource_type}" "example" {{\n'
                    f'  # Missing required companion resource\n'
                    f'}}\n'
                )
                return bad, decoded.strip() + "\n", lang
        except Exception:
            pass

    # Fallback for add-type
    return (
        f'resource "{resource_type}" "example" {{\n'
        f'  # Missing required companion resource or configuration\n'
        f'}}\n',
        f'# Add the required resource per policy: {description[:80]}\n',
        "hcl",
    )


def _invert_value(value):
    """Invert a value to create the 'bad' counterpart."""
    if isinstance(value, bool):
        return not value
    if value == "true":
        return "false"
    if value == "false":
        return "true"
    if isinstance(value, (int, float)):
        return 0
    return None


def _is_unresolved(value) -> bool:
    """Check if a value is an unresolved Rego expression rather than a usable literal."""
    if value is None or isinstance(value, (bool, int, float)):
        return False
    if isinstance(value, str):
        s = value.strip()
        # Resolved literals
        if s in ("true", "false", "null", ""):
            return False
        if s.startswith('"') and s.endswith('"'):
            return False
        try:
            int(s)
            return False
        except (ValueError, TypeError):
            pass
        # Unresolved if it contains dots, brackets, or is a bare identifier
        if "." in s or "[" in s or re.match(r'^[a-zA-Z_]\w*$', s):
            return True
    return False


def _infer_values_from_attr(
    attr: str, rego_content: str, data_type: str
) -> tuple:
    """Infer bad/good values from attribute name and Rego conditions."""
    attr_lower = attr.lower()

    # CIDR-related attributes
    if any(kw in attr_lower for kw in ("source_range", "cidr", "source_address", "ip_range")):
        if "0.0.0.0/0" in rego_content or '"*"' in rego_content:
            return ["0.0.0.0/0"], ["10.0.0.0/16"]
        return ["0.0.0.0/0"], ["10.0.0.0/16"]

    # Boolean-like attributes
    bool_keywords = {
        "enabled": (False, True), "disabled": (True, False),
        "encrypt": (False, True), "public": (True, False),
        "ssl": (False, True), "tls": (False, True),
        "https": (False, True), "logging": (False, True),
        "audit": (False, True), "monitor": (False, True),
        "backup": (False, True), "rotation": (False, True),
        "mfa": (False, True), "multi_region": (False, True),
        "all_regions": (False, True),
    }
    for keyword, (bad, good) in bool_keywords.items():
        if keyword in attr_lower:
            return bad, good

    # String-typed attributes with common patterns
    if data_type in ("string", "str"):
        # Look for == comparison in conditions
        m = re.search(rf'\.{re.escape(attr)}\s*==\s*"([^"]+)"', rego_content)
        if m:
            bad_str = m.group(1)
            return bad_str, f"<secure-{attr}>"

    # List-typed attributes
    if data_type == "list":
        return ["0.0.0.0/0"], ["10.0.0.0/16"]

    # Default: boolean
    return False, True


def _guess_attr_from_description(description: str) -> str:
    """Guess the relevant attribute from the policy description."""
    desc_lower = description.lower()
    attr_hints = {
        "encrypt": "encryption",
        "logging": "logging_enabled",
        "log": "logging_enabled",
        "public": "publicly_accessible",
        "ssl": "ssl_enforcement_enabled",
        "tls": "min_tls_version",
        "https": "enable_https_traffic_only",
        "backup": "backup_retention_period",
        "version": "engine_version",
        "rotation": "enable_key_rotation",
        "mfa": "mfa_delete",
        "tag": "tags",
        "firewall": "firewall_rules",
        "network": "network_rules",
        "audit": "audit_log_enabled",
        "monitor": "monitoring_enabled",
    }
    for keyword, attr in attr_hints.items():
        if keyword in desc_lower:
            return attr
    return ""


# ---------------------------------------------------------------------------
# Policy parsing (unchanged from original)
# ---------------------------------------------------------------------------

def parse_policy_json(json_path: Path) -> dict | None:
    """Parse a Terrascan policy JSON file."""
    try:
        with json_path.open() as f:
            data = json.load(f)
        return {
            "id": data.get("id", "UNKNOWN"),
            "name": data.get("name", ""),
            "description": data.get("description", ""),
            "severity": data.get("severity", "MEDIUM"),
            "category": data.get("category", "General"),
            "resource_type": data.get("resource_type", ""),
            "policy_type": data.get("policy_type", ""),
            "file": data.get("file", ""),
            "version": data.get("version", 1),
        }
    except Exception as exc:
        print(f"Error parsing {json_path}: {exc}", file=sys.stderr)
        return None


def parse_rego_file(rego_path: Path) -> str:
    """Extract the rego logic for context."""
    try:
        with rego_path.open() as f:
            return f.read()
    except Exception:
        return ""


def extract_check_logic(rego_content: str) -> str:
    """Extract human-readable check logic from rego."""
    checks = []

    if "not" in rego_content and "== true" in rego_content:
        checks.append("Verify attribute is set to `true`.")
    if "== false" in rego_content:
        checks.append("Verify attribute is set to `false`.")
    if "encryption" in rego_content.lower():
        checks.append("Verify encryption is enabled.")
    if "public" in rego_content.lower():
        checks.append("Verify resource is not publicly accessible.")
    if "logging" in rego_content.lower():
        checks.append("Verify logging is enabled.")
    if "version" in rego_content.lower():
        checks.append("Verify secure version or protocol is used.")

    if not checks:
        checks.append("Review resource configuration against security best practices.")

    return "\n".join(f"- {check}" for check in checks)


def group_policies_by_resource(policies: list[dict]) -> dict:
    """Group policies by cloud provider and resource type."""
    grouped = defaultdict(lambda: defaultdict(list))

    for policy in policies:
        provider = policy["policy_type"].lower()
        resource = policy["resource_type"]
        grouped[provider][resource].append(policy)

    return grouped


def generate_resource_markdown(
    resource_type: str, policies: list[dict], rego_contents: dict
) -> str:
    """Generate markdown for a specific resource type."""
    lines = [f"# {resource_type}\n"]

    severity_rank = {"HIGH": 3, "MEDIUM": 2, "LOW": 1}
    for policy in sorted(
        policies, key=lambda p: (severity_rank.get(p["severity"], 0), p["id"]), reverse=True
    ):
        severity_emoji = {"HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🟢"}.get(
            policy["severity"], "⚪"
        )
        nist_controls = CATEGORY_TO_NIST.get(policy["category"], [])

        lines.append(f"## {policy['id']}: {policy['name']}")
        lines.append("")
        lines.append(f"- **Severity**: {severity_emoji} {policy['severity']}")
        lines.append(f"- **Category**: {policy['category']}")
        lines.append(f"- **Resource**: `{policy['resource_type']}`")
        if nist_controls:
            lines.append(f"- **NIST 800-53**: {', '.join(nist_controls)}")
        lines.append("")
        lines.append("### Description")
        lines.append(policy["description"])
        lines.append("")

        rego_key = policy.get("file", "")
        rego_content = rego_contents.get(rego_key, "")
        check_logic = extract_check_logic(rego_content)

        lines.append("### What to Check")
        lines.append(check_logic)
        lines.append("")
        bad_example, good_example, lang = get_examples(
            resource_type, policy["name"], rego_content, policy
        )
        lines.append("### Bad Example")
        lines.append(f"```{lang}")
        lines.append(bad_example)
        lines.append("```")
        lines.append("")
        lines.append("### Good Example")
        lines.append(f"```{lang}")
        lines.append(good_example)
        lines.append("```")
        lines.append("")
        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def generate_provider_index(provider: str, resources: dict) -> str:
    """Generate index markdown for a provider."""
    lines = [
        f"# {provider.upper()} Security Policies\n",
        f"Total policies: {sum(len(p) for p in resources.values())}\n",
        "## Resources\n",
    ]

    for resource, policies in sorted(resources.items()):
        high = sum(1 for p in policies if p["severity"] == "HIGH")
        med = sum(1 for p in policies if p["severity"] == "MEDIUM")
        low = sum(1 for p in policies if p["severity"] == "LOW")
        safe_name = resource.replace("/", "_").replace("\\", "_")
        lines.append(
            f"- [{resource}](./{safe_name}.md) - {len(policies)} policies "
            f"(🔴{high} 🟡{med} 🟢{low})"
        )

    return "\n".join(lines)


def main(rego_path: str, output_path: str) -> None:
    rego_dir = Path(rego_path)
    output_dir = Path(output_path)

    if not rego_dir.exists():
        print(f"Error: {rego_dir} does not exist", file=sys.stderr)
        sys.exit(1)

    all_policies = []
    rego_contents = {}

    for json_file in rego_dir.rglob("*.json"):
        policy = parse_policy_json(json_file)
        if policy:
            all_policies.append(policy)
            rego_file = json_file.parent / policy.get("file", "")
            if rego_file.exists():
                rego_contents[policy["file"]] = parse_rego_file(rego_file)

    print(f"Found {len(all_policies)} policies")

    # Track example generation stats
    stats = {"retval": 0, "condition": 0, "hardcoded": 0, "fallback": 0}

    grouped = group_policies_by_resource(all_policies)

    for provider, resources in grouped.items():
        provider_dir = output_dir / "references" / provider
        provider_dir.mkdir(parents=True, exist_ok=True)

        index_md = generate_provider_index(provider, resources)
        (provider_dir / "README.md").write_text(index_md)

        for resource, policies in resources.items():
            safe_name = resource.replace("/", "_").replace("\\", "_")

            # Count stats per policy
            for p in policies:
                rego_key = p.get("file", "")
                rego_content = rego_contents.get(rego_key, "")
                if resource in HARDCODED_EXAMPLES:
                    stats["hardcoded"] += 1
                elif rego_content and parse_retval(rego_content) and (
                    parse_retval(rego_content).get("Traverse")
                    or parse_retval(rego_content).get("ReplaceType") == "add"
                ):
                    stats["retval"] += 1
                elif rego_content and parse_rego_conditions(rego_content):
                    stats["condition"] += 1
                else:
                    stats["fallback"] += 1

            resource_md = generate_resource_markdown(resource, policies, rego_contents)
            (provider_dir / f"{safe_name}.md").write_text(resource_md)

        print(f"Generated {len(resources)} files for {provider}")

    summary_lines = [
        "# Policy Summary\n",
        f"Total policies extracted: {len(all_policies)}\n",
        "## By Provider\n",
    ]
    for provider, resources in grouped.items():
        count = sum(len(p) for p in resources.values())
        summary_lines.append(
            f"- **{provider.upper()}**: {count} policies across {len(resources)} resource types"
        )

    summary_path = output_dir / "references" / "SUMMARY.md"
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.write_text("\n".join(summary_lines))

    print(f"\nExample generation stats:")
    print(f"  retVal-based:    {stats['retval']}")
    print(f"  condition-based: {stats['condition']}")
    print(f"  hardcoded:       {stats['hardcoded']}")
    print(f"  fallback:        {stats['fallback']}")
    print(f"  total:           {sum(stats.values())}")
    print(f"\nOutput written to {output_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python parse_terrascan_policies.py <rego_path> <output_path>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
