# aws_docdb_cluster

## AC_AWS_0456: docDbLogExportDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_docdb_cluster`

### Description
Ensure DocDb clusters have log exports enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_docdb_cluster" "example" {
  # enabled_cloudwatch_logs_exports = ... (not set)
}

```

### Good Example
```hcl
resource "aws_docdb_cluster" "example" {
  enabled_cloudwatch_logs_exports = true
}

```

---

## AC_AWS_0455: docDbEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_docdb_cluster`

### Description
Ensure DocDb is encrypted at rest

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_docdb_cluster" "example" {
  # storage_encrypted = ... (not set)
}

```

### Good Example
```hcl
resource "aws_docdb_cluster" "example" {
  storage_encrypted = true
}

```

---
