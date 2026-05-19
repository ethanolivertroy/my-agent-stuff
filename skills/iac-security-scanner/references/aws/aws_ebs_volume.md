# aws_ebs_volume

## AC_AWS_0460: ebsVolumeEncryptedWithNoKms

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_ebs_volume`

### Description
Ensure that AWS EBS clusters are encrypted. Data encryption at rest, prevents unauthorized users from accessing sensitive data on your AWS EBS clusters and associated cache storage systems.

### What to Check
- Verify attribute is set to `true`.
- Verify attribute is set to `false`.
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_ebs_volume" "example" {
  encrypted = false
}

```

### Good Example
```hcl
resource "aws_ebs_volume" "example" {
  encrypted = true
}

```

---

## AC_AWS_0459: ebsSnapshotDisabled

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_ebs_volume`

### Description
Enable AWS EBS Snapshot Encryption

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ebs_volume" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_ebs_volume" "example" {
  encryption = true
}

```

---
