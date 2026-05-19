# aws_kinesis_firehose_delivery_stream

## AC_AWS_0156: kinesisSseNotConfigured

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_kinesis_firehose_delivery_stream`

### Description
AWS Kinesis Server data at rest has server side encryption (SSE)

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_kinesis_firehose_delivery_stream" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "server_side_encryption": {
    "enabled": true
  }
}

```

---
