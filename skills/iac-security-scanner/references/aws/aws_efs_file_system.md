# aws_efs_file_system

## AC_AWS_0098: efsEncryptedWithNoKms

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_efs_file_system`

### Description
Enable encryption of your EFS file systems in order to protect your data and metadata from breaches or unauthorized access and fulfill compliance requirements for data-at-rest encryption within your organization.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_efs_file_system" "example" {
  # kms_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_efs_file_system" "example" {
  kms_key_id = "<kms_key_id>"
}

```

---

## AC_AWS_0097: efsEncryptedFalse

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_efs_file_system`

### Description
Enable encryption of your EFS file systems in order to protect your data and metadata from breaches or unauthorized access and fulfill compliance requirements for data-at-rest encryption within your organization.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_efs_file_system" "example" {
  encrypted = false
}

```

### Good Example
```hcl
resource "aws_efs_file_system" "example" {
  encrypted = true
}

```

---
