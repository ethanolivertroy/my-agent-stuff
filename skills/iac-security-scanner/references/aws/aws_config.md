# aws_config

## AC_AWS_0048: awsConfigEncryptedVol

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_config`

### Description
Ensure AWS Config Rule is enabled for Encrypted Volumes

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_config" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_config" "example" {
  encryption = true
}

```

---
