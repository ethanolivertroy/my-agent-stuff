---
name: mesh-remediation
description: Generate and apply security fixes for Istio, Consul, and Linkerd service mesh configuration issues. Use when users want to fix mesh security vulnerabilities, generate remediation playbooks, or get configuration snippets to resolve security findings. Triggers on keywords like "fix mesh config", "remediate", "security fix", "patch config", or "generate playbook".
license: MIT
metadata:
  author: mesh-config-analyzer
  version: "1.0.0"
---

# Mesh Security Remediation

Generate security fixes and remediation playbooks for service mesh configuration issues.

## Quick Start

```bash
# Generate remediation recommendations
node ~/.codex/skills/mesh-security/lib/remediation-engine.js <config-file>

# Generate a step-by-step playbook
node ~/.codex/skills/mesh-security/lib/remediation-engine.js <config-file> --playbook

# Output as JSON
node ~/.codex/skills/mesh-security/lib/remediation-engine.js <config-file> --json
```

## Available Automated Fixes

### Istio Fixes

| Category | Fix Description |
|----------|-----------------|
| mTLS | Set mode to STRICT |
| RBAC | Enable access logging |
| Trust Domain | Configure explicit trust domain |
| Proxy Configuration | Disable privileged mode, enable holdApplicationUntilProxyStarts |
| Traffic Policy | Set outbound traffic to REGISTRY_ONLY |
| Telemetry | Enable tracing and access logging |

### Consul Fixes

| Category | Fix Description |
|----------|-----------------|
| Access Control | Enable ACL with default deny |
| TLS Security | Enable verification and TLS 1.2 minimum |
| Gossip Security | Enable gossip encryption |
| Service Mesh | Enable Connect |
| FedRAMP Compliance | Configure FIPS-approved cipher suites |

### Linkerd Fixes

| Category | Fix Description |
|----------|-----------------|
| TLS Security | Enable and enforce TLS 1.2+ |
| Service Identity | Configure certificate issuance |
| Authorization | Enable policy with default deny |
| Proxy Security | Disable privileged mode, set resource limits |
| Observability | Enable tracing and metrics |

## Workflow: Fix Security Issues

### Interactive Remediation

1. **Analyze the configuration** to identify issues
2. **Review the remediation plan** grouped by severity
3. **Apply fixes** starting with Critical/High severity
4. **Verify the changes** by re-running analysis

### Example Session

```
User: Fix the security issues in my Istio config at ./istio-meshconfig.yaml

Steps:
1. Run analysis: node ~/.codex/skills/mesh-security/lib/analyzer-wrapper.js ./istio-meshconfig.yaml
2. Generate fixes: node ~/.codex/skills/mesh-security/lib/remediation-engine.js ./istio-meshconfig.yaml
3. Present fixes grouped by severity
4. For each fix:
   - Show the current problematic configuration
   - Show the recommended fix
   - Ask user to confirm before applying
5. Apply approved fixes by editing the file
6. Re-run analysis to verify fixes
```

## Output Formats

### Remediation Plan (Default)

```markdown
## Remediation Plan for Istio Configuration

**Total Issues:** 5
**Automated Fixes Available:** 4
**Manual Remediation Required:** 1

---

### Critical Priority

#### Fix 1: mTLS Configuration

**Issue:** mTLS is not set to STRICT mode
**Recommendation:** Set mTLS mode to STRICT

**Fix Available:** Yes
**Configuration Path:** `spec.mtls.mode`

**Suggested Configuration:**
\`\`\`yaml
spec:
  mtls:
    mode: STRICT
\`\`\`
```

### Playbook (--playbook)

```markdown
# Remediation Playbook

**Target:** ./istio-config.yaml
**Mesh Type:** istio
**Generated:** 2026-01-14T12:00:00.000Z

## Pre-Requisites

1. Backup the current configuration
2. Ensure you have access to modify the mesh configuration
3. Plan a maintenance window if changes affect production

## Remediation Steps

### Step 1: Fix mTLS Configuration (Critical)

**Issue:** mTLS is not enforced
**Action:** Apply the following configuration change:

\`\`\`yaml
spec:
  mtls:
    mode: STRICT
\`\`\`

**Verification:** Re-run the security analyzer to confirm the issue is resolved.
```

## Safety Guidelines

1. **Always backup** before making changes
2. **Preview changes** before applying (use --json to inspect)
3. **Test in non-production** environments first
4. **Verify after fixing** by re-running the analyzer
5. **Document changes** for audit trails

## Programmatic Usage

```javascript
const { analyzeConfig } = require('~/.codex/skills/mesh-security/lib/analyzer-wrapper.js');
const { generateRemediations, generatePlaybook } = require('~/.codex/skills/mesh-security/lib/remediation-engine.js');

// Get analysis results
const results = analyzeConfig('./config.yaml');

// Generate remediations
const remediations = generateRemediations(results);

// Or generate a full playbook
const playbook = generatePlaybook(results);
```

## Related Skills

- **mesh-security** - Primary security analysis
- **mesh-compliance-reporter** - Generate compliance reports
