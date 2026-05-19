# google_project_iam_binding

## AC_GCP_0007: iamServiceAccountUsed

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_project_iam_binding`

### Description
Ensure that IAM users are not assigned the Service Account User or Service Account Token Creator roles at project level.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_project_iam_binding" "example" {
  # Configure per: iamServiceAccountUsed
}

```

### Good Example
```hcl
resource "google_project_iam_binding" "example" {
  # Remediated per: iamServiceAccountUsed
}

```

---

## AC_GCP_0008: noGmailAccount

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `google_project_iam_binding`

### Description
Ensure that corporate login credentials are used instead of Gmail accounts.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_project_iam_binding" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_project_iam_binding" "example" {
  logging_enabled = true
}

```

---
