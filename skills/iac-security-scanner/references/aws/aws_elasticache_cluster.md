# aws_elasticache_cluster

## AC_AWS_0103: noMemcachedInElastiCache

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_elasticache_cluster`

### Description
ElastiCache for Memcached is not in use in AWS PCI DSS environments

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_elasticache_cluster" "example" {
  engine = false
}

```

### Good Example
```hcl
resource "aws_elasticache_cluster" "example" {
  engine = true
}

```

---

## AC_AWS_0102: redisVersionCompliance

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_elasticache_cluster`

### Description
ElastiCache for Redis version is not compliant with AWS PCI DSS requirements

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "aws_elasticache_cluster" "example" {
  engine_version = false
}

```

### Good Example
```hcl
resource "aws_elasticache_cluster" "example" {
  engine_version = true
}

```

---

## AC_AWS_0104: elastiCacheMultiAZ

- **Severity**: 🟡 MEDIUM
- **Category**: Resilience
- **Resource**: `aws_elasticache_cluster`

### Description
AWS ElastiCache Multi-AZ

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_elasticache_cluster" "example" {
  # Configure per: elastiCacheMultiAZ
}

```

### Good Example
```hcl
resource "aws_elasticache_cluster" "example" {
  # Remediated per: elastiCacheMultiAZ
}

```

---
