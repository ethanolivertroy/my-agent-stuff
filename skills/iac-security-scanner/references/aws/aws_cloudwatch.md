# aws_cloudwatch

## AC_AWS_0451: logGroupNotEncryptedWithKms

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_cloudwatch`

### Description
AWS CloudWatch log group is not encrypted with a KMS CMK

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudwatch" "example" {
  # kms_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_cloudwatch" "example" {
  kms_key_id = true
}

```

---

## AC_AWS_0041: awsCloudWatchRetentionPeriod

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudwatch`

### Description
App-Tier CloudWatch Log Group Retention Period

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudwatch" "example" {
  # retention_in_days = ... (not set)
}

```

### Good Example
```hcl
resource "aws_cloudwatch" "example" {
  retention_in_days = "<retention_in_days>"
}

```

---
