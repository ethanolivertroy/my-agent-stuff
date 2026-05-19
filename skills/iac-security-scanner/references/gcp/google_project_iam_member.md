# google_project_iam_member

## AC_GCP_0006: iamServiceAccountUsed

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_project_iam_member`

### Description
Ensure that IAM users are not assigned the Service Account User or Service Account Token Creator roles at project level.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_project_iam_member" "example" {
  # Configure per: iamServiceAccountUsed
}

```

### Good Example
```hcl
resource "google_project_iam_member" "example" {
  # Remediated per: iamServiceAccountUsed
}

```

---

## AC_GCP_0005: serviceAccountAdminPrivileges

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_project_iam_member`

### Description
Ensure that Service Account has no Admin privileges.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_project_iam_member" "example" {
  # Configure per: serviceAccountAdminPrivileges
}

```

### Good Example
```hcl
resource "google_project_iam_member" "example" {
  # Remediated per: serviceAccountAdminPrivileges
}

```

---
