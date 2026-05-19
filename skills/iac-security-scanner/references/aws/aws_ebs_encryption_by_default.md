# aws_ebs_encryption_by_default

## AC_AWS_0079: ebsDefaultEncryption

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_ebs_encryption_by_default`

### Description
Ensure that the AWS EBS that hold sensitive and critical data is encrypted by default to fulfill compliance requirements for data-at-rest encryption.

### What to Check
- Verify attribute is set to `false`.
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_ebs_encryption_by_default" "example" {
  enabled = false
}

```

### Good Example
```hcl
resource "aws_ebs_encryption_by_default" "example" {
  enabled = true
}

```

---
