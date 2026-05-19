# google_compute_project_metadata

## AC_GCP_0291: checkOSLoginEnabled

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_compute_project_metadata`

### Description
Ensure oslogin is enabled for a Project

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_project_metadata" "example" {
  # metadata = ... (not set)
}

```

### Good Example
```hcl
resource "google_compute_project_metadata" "example" {
  metadata = true
}

```

---
