# aws_dax_cluster

## AC_AWS_0375: awsDaxSseEnabledCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_dax_cluster`

### Description
Ensure server-side encryption is enabled for AWS DAX Cluster

### What to Check
- Verify attribute is set to `false`.
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_dax_cluster" "example" {
  # server_side_encryption = ... (not set)
}

```

### Good Example
```hcl
resource "aws_dax_cluster" "example" {
  server_side_encryption = true
}

```

---
