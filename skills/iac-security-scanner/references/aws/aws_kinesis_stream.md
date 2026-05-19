# aws_kinesis_stream

## AC_AWS_0157: kinesisNotEncryptedWithKms

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_kinesis_stream`

### Description
Ensure Kinesis Stream is encrypted

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_kinesis_stream" "example" {
  # encryption_type = ... (not set)
}

```

### Good Example
```hcl
resource "aws_kinesis_stream" "example" {
  encryption_type = true
}

```

---
