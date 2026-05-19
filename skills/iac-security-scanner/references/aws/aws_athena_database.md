# aws_athena_database

## AC_AWS_0443: athenaDatabaseEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_athena_database`

### Description
Ensure Athena Database is encrypted at rest

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_athena_database" "example" {
  # encryption_configuration = ... (not set)
}

```

### Good Example
```hcl
resource "aws_athena_database" "example" {
  encryption_configuration = true
}

```

---
