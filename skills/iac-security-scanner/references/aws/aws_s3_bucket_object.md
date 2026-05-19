# aws_s3_bucket_object

## AC_AWS_0498: notEncryptedObject

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_s3_bucket_object`

### Description
Ensure S3 object is Encrypted

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_s3_bucket_object" "example" {
  # kms_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_s3_bucket_object" "example" {
  kms_key_id = true
}

```

---
