# aws_rds_cluster

## AC_AWS_0186: storageNotEncrypted

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_rds_cluster`

### Description
Encrypt Amazon RDS instances and snapshots at rest, by enabling the encryption option for your Amazon RDS DB instance

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_rds_cluster" "bad" {
  cluster_identifier = "app-db"
  engine             = "aurora-mysql"
  storage_encrypted  = false
}

```

### Good Example
```hcl
resource "aws_rds_cluster" "good" {
  cluster_identifier = "app-db"
  engine             = "aurora-mysql"
  storage_encrypted  = true
}

```

---

## AC_AWS_0495: backupRetentionRDS

- **Severity**: 🟡 MEDIUM
- **Category**: Resilience
- **Resource**: `aws_rds_cluster`

### Description
Ensure backup retention period is set for rds cluster

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_rds_cluster" "bad" {
  cluster_identifier = "app-db"
  engine             = "aurora-mysql"
  storage_encrypted  = false
}

```

### Good Example
```hcl
resource "aws_rds_cluster" "good" {
  cluster_identifier = "app-db"
  engine             = "aurora-mysql"
  storage_encrypted  = true
}

```

---
