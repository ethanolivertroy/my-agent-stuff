# aws_sns_topic

## AC_AWS_0385: snsPublicAccess

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_sns_topic`

### Description
Ensure SNS Topic is Publicly Accessible For Subscription

### What to Check
- Verify attribute is set to `true`.
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_sns_topic" "example" {
  policy = false
}

```

### Good Example
```hcl
resource "aws_sns_topic" "example" {
  policy = true
}

```

---

## AC_AWS_0502: notEncryptedSns

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_sns_topic`

### Description
Ensure SNS topic is Encrypted using KMS master key

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_sns_topic" "example" {
  # kms_master_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_sns_topic" "example" {
  kms_master_key_id = true
}

```

---
