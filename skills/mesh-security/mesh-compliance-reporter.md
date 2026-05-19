---
name: mesh-compliance-reporter
description: Generate FedRAMP and NIST 800-53 compliance reports for service mesh configurations. Use when users need compliance documentation, POA&M entries, control coverage analysis, or assessment reports for Istio, Consul, or Linkerd. Triggers on keywords like "FedRAMP report", "NIST compliance", "POA&M", "compliance assessment", or "audit report".
license: MIT
metadata:
  author: mesh-config-analyzer
  version: "1.0.0"
---

# Mesh Compliance Reporter

Generate FedRAMP and NIST 800-53 compliance reports for service mesh configurations.

## Quick Start

```bash
# Generate FedRAMP compliance report (markdown)
node ~/.codex/skills/mesh-security/lib/report-generator.js <config-file> --fedramp

# Specify FedRAMP impact level
node ~/.codex/skills/mesh-security/lib/report-generator.js <config-file> --fedramp --impact high

# Output as JSON
node ~/.codex/skills/mesh-security/lib/report-generator.js <config-file> --json
```

## Report Types

### FedRAMP Compliance Report

Comprehensive compliance assessment against FedRAMP Moderate or High baselines.

**Includes:**
- System information summary
- Executive summary with compliance rate
- Risk summary by severity
- NIST 800-53 control coverage by family
- Control-by-control assessment with determinations
- POA&M entries for findings

### NIST Control Coverage

Analysis of how findings map to NIST 800-53 Rev 5 controls.

**Control Families Covered:**
| Family | Name |
|--------|------|
| AC | Access Control |
| AU | Audit and Accountability |
| CA | Security Assessment and Authorization |
| CM | Configuration Management |
| IA | Identification and Authentication |
| SC | System and Communications Protection |
| SI | System and Information Integrity |

### POA&M Entries

Automatically generated Plan of Action and Milestones entries for Critical and High severity findings.

**POA&M ID Format:** `{YEAR}-{CONTROL}-{###}`

Example: `2026-SC-8-001`

**Milestone Timelines:**
| Severity | Planned Completion |
|----------|-------------------|
| Critical | 30 days |
| High | 90 days |
| Medium | 180 days |

## FedRAMP Control Requirements

### SC-8: Transmission Confidentiality and Integrity
- All service-to-service communication must use mTLS
- TLS 1.2 or higher required

### SC-13: Cryptographic Protection
- Use FIPS 140-2 validated cryptographic modules
- FIPS-approved cipher suites required

### AC-3: Access Enforcement
- Implement role-based access control
- Default deny policies

### AC-4: Information Flow Enforcement
- Control information flow between services
- Policy-based traffic control

### AU-2/AU-12: Audit Events
- Log all service mesh access events
- Generate audit records for operations

### CM-6/CM-7: Configuration Management
- Security-focused configuration settings
- Restrict to essential capabilities

### IA-2: Identification and Authentication
- Uniquely identify all services
- Certificate-based service identity

### SC-7: Boundary Protection
- Control service mesh network boundaries
- Egress traffic restrictions

### SC-12: Cryptographic Key Management
- Certificate lifecycle management
- Proper validity periods

## Workflow: Generate Compliance Report

1. **Analyze the configuration** to identify security findings
2. **Run the report generator** with desired options
3. **Review the executive summary** for overall compliance status
4. **Check control assessments** for specific findings
5. **Export POA&M entries** for tracking

### Example Session

```
User: Generate a FedRAMP Moderate compliance report for my Consul config

Steps:
1. Run: node ~/.codex/skills/mesh-security/lib/report-generator.js ./consul-config.json --fedramp --impact moderate
2. Present executive summary
3. Highlight controls with findings
4. Show POA&M entries for critical/high items
5. Offer to save report to file
```

## Output Example

### Executive Summary Section

```markdown
## Executive Summary

The Consul service mesh configuration has been analyzed against
FedRAMP Moderate baseline requirements.

### Compliance Status

| Metric | Value |
|--------|-------|
| **Controls Satisfied** | 8 |
| **Controls with Findings** | 3 |
| **Compliance Rate** | 73% |

### Risk Summary

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High | 2 |
| Medium | 3 |
| Low | 1 |
| **Total** | 7 |
```

### Control Assessment Section

```markdown
### SC-8 - Transmission Confidentiality and Integrity

**Status:** Other Than Satisfied

**Requirement:** All service-to-service communication must use mTLS with TLS 1.2 or higher

**Determination:** Findings identified for SC-8. See POA&M entries.

**Findings:**

- [Critical] mTLS is not enforced between services
- [High] TLS minimum version is below 1.2
```

### POA&M Section

```markdown
### 2026-SC-8-001

| Field | Value |
|-------|-------|
| **Control** | SC-8 |
| **Severity** | Critical |
| **Status** | Open |
| **Identified** | 2026-01-14 |
| **Planned Completion** | 2026-02-13 |

**Weakness:** mTLS is not enforced between services

**Recommendation:** Enable mTLS with STRICT mode enforcement
```

## Programmatic Usage

```javascript
const { analyzeConfig } = require('~/.codex/skills/mesh-security/lib/analyzer-wrapper.js');
const {
  generateFedRAMPAssessment,
  generatePOAMEntries,
  formatComplianceReport
} = require('~/.codex/skills/mesh-security/lib/report-generator.js');

// Analyze and generate report
const results = analyzeConfig('./config.yaml');
const report = formatComplianceReport(results, {
  impactLevel: 'moderate',
  systemName: 'Production Service Mesh'
});

// Or get structured data
const assessment = generateFedRAMPAssessment(results, 'moderate');
const poamEntries = generatePOAMEntries(results.findings, 'Production Mesh');
```

## Related Skills

- **mesh-security** - Primary security analysis
- **mesh-remediation** - Generate and apply fixes
