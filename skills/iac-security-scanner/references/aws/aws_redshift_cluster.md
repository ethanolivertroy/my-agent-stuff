# aws_redshift_cluster

## AC_AWS_0199: redshiftPublicAccess

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_redshift_cluster`

### Description
Ensure Redshift clusters are not publicly accessible to minimize security risks.

### What to Check
- Verify attribute is set to `true`.
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_redshift_cluster" "example" {
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_redshift_cluster" "example" {
  publicly_accessible = false
}

```

---

## AC_AWS_0198: redshiftEncryptedFalse

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_redshift_cluster`

### Description
Use customer-managed KMS keys instead of AWS-managed keys, to have granular control over encrypting and encrypting data. Encrypt Redshift clusters with a Customer-managed KMS key. This is a recommended best practice.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_redshift_cluster" "example" {
  encrypted = false
}

```

### Good Example
```hcl
resource "aws_redshift_cluster" "example" {
  encrypted = true
}

```

---

## AC_AWS_0200: redshiftAuditLogs

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_redshift_cluster`

### Description
Ensure AWS Redshift cluster instances have logging enabled.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_redshift_cluster" "example" {
  # logging = ... (not set)
}

```

### Good Example
```hcl
resource "aws_redshift_cluster" "example" {
  logging = true
}

```

---
