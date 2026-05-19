# google_storage_bucket_iam_member

## AC_GCP_0238: checkNoPublicAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_storage_bucket_iam_member`

### Description
Ensure that Cloud Storage bucket is not anonymously or publicly Accessible.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_storage_bucket_iam_member" "example" {
  publicly_accessible = false
}

```

### Good Example
```hcl
resource "google_storage_bucket_iam_member" "example" {
  publicly_accessible = true
}

```

---
