# aws_ecr_repository

## AC_AWS_0462: ecrNoSecurePolicyAttached

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `aws_ecr_repository`

### Description
Ensure ECR repository has policy attached.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ecr_repository" "example" {
  # Configure per: ecrNoSecurePolicyAttached
}

```

### Good Example
```hcl
resource "aws_ecr_repository" "example" {
  # Remediated per: ecrNoSecurePolicyAttached
}

```

---

## AC_AWS_0461: ecrNotEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_ecr_repository`

### Description
Ensure ECR repository is encrypted at rest

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_ecr_repository" "example" {
  # encryption_configuration = ... (not set)
}

```

### Good Example
```hcl
resource "aws_ecr_repository" "example" {
  encryption_configuration = true
}

```

---

## AC_AWS_0083: scanOnPushDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Configuration and Vulnerability Analysis
- **Resource**: `aws_ecr_repository`

### Description
Unscanned images may contain vulnerabilities

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_ecr_repository" "example" {
  image_scanning_configuration {
    scan_on_push = false
  }
}

```

### Good Example
```hcl
resource "aws_ecr_repository" "example" {
  image_scanning_configuration {
    scan_on_push = true
  }
}

```

---
