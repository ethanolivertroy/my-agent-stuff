# aws_elasticcache_replication_group

## AC_AWS_0467: inTransitNotEncryptedElasticCache

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_elasticcache_replication_group`

### Description
Ensure Elastic Cache Replication Group is encrypted in transit

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_elasticcache_replication_group" "example" {
  # transit_encryption_enabled = ... (not set)
}

```

### Good Example
```hcl
resource "aws_elasticcache_replication_group" "example" {
  transit_encryption_enabled = true
}

```

---

## AC_AWS_0466: atRestNotEncryptedElasticCache

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_elasticcache_replication_group`

### Description
Ensure Elastic Cache Replication Group is encrypted at rest

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_elasticcache_replication_group" "example" {
  # at_rest_encryption_enabled = ... (not set)
}

```

### Good Example
```hcl
resource "aws_elasticcache_replication_group" "example" {
  at_rest_encryption_enabled = true
}

```

---
