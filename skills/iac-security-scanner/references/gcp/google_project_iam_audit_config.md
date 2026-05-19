# google_project_iam_audit_config

## AC_GCP_0009: checkAuditLoggingConfig

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `google_project_iam_audit_config`

### Description
Ensure that Cloud Audit Logging is configured properly across all services and all users from a project.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "google_project_iam_audit_config" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_project_iam_audit_config" "example" {
  logging_enabled = true
}

```

---
