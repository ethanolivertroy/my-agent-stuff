# aws_kms_key

## AC_AWS_0482: kmsKeySecurePolicyNotUsed

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_kms_key`

### Description
Ensure KMS key policy does not have wildcard policies attached.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_kms_key" "bad" {
  description = "app key"
  enable_key_rotation = false
}

```

### Good Example
```hcl
resource "aws_kms_key" "good" {
  description = "app key"
  enable_key_rotation = true
}

```

---

## AC_AWS_0481: kmsKeyPolicyMissingPrincipal

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_kms_key`

### Description
Ensure IAM policies do not have 'Principal' element missing from the policy statement.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_kms_key" "bad" {
  description = "app key"
  enable_key_rotation = false
}

```

### Good Example
```hcl
resource "aws_kms_key" "good" {
  description = "app key"
  enable_key_rotation = true
}

```

---

## AC_AWS_0162: kmsKeyExposedPolicy

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_kms_key`

### Description
Identify any publicly accessible AWS Key Management Service master keys and update their access policy in order to stop any unsigned requests made to these resources.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_kms_key" "bad" {
  description = "app key"
  enable_key_rotation = false
}

```

### Good Example
```hcl
resource "aws_kms_key" "good" {
  description = "app key"
  enable_key_rotation = true
}

```

---

## AC_AWS_0160: kmsKeyRotationDisabled

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_kms_key`

### Description
Ensure rotation for customer created CMKs is enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_kms_key" "bad" {
  description = "app key"
  enable_key_rotation = false
}

```

### Good Example
```hcl
resource "aws_kms_key" "good" {
  description = "app key"
  enable_key_rotation = true
}

```

---
