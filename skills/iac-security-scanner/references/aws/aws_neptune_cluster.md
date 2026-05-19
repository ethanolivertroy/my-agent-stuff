# aws_neptune_cluster

## AC_AWS_0494: neptuneClusterLoggingDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_neptune_cluster`

### Description
Ensure AWS Neptune clusters have logging enabled.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_neptune_cluster" "example" {
  # enable_cloudwatch_logs_exports = ... (not set)
}

```

### Good Example
```hcl
resource "aws_neptune_cluster" "example" {
  enable_cloudwatch_logs_exports = true
}

```

---

## AC_AWS_0493: neptuneClusterNotEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_neptune_cluster`

### Description
Ensure Neptune Cluster is Encrypted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_neptune_cluster" "example" {
  # storage_encrypted = ... (not set)
}

```

### Good Example
```hcl
resource "aws_neptune_cluster" "example" {
  storage_encrypted = true
}

```

---
