# aws_secretsmanager_secret

## AC_AWS_0500: notEncryptedSecrets

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_secretsmanager_secret`

### Description
Ensure SecretsManager Secrets are Encrypted using KMS key

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_secretsmanager_secret" "example" {
  # kms_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_secretsmanager_secret" "example" {
  kms_key_id = true
}

```

---
