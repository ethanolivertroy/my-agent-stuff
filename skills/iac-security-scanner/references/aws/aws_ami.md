# aws_ami

## AC_AWS_0005: amiNotEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_ami`

### Description
Enable AWS AMI Encryption

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ami" "example" {
  # ebs_block_device = ... (not set)
}

```

### Good Example
```hcl
resource "aws_ami" "example" {
  ebs_block_device = true
}

```

---
