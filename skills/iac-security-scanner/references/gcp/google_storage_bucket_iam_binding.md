# google_storage_bucket_iam_binding

## AC_GCP_0237: checkPubliclyAccessible

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `google_storage_bucket_iam_binding`

### Description
Ensure that Cloud Storage bucket is not anonymously or publicly accessible.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_storage_bucket_iam_binding" "example" {
  publicly_accessible = false
}

```

### Good Example
```hcl
resource "google_storage_bucket_iam_binding" "example" {
  publicly_accessible = true
}

```

---
