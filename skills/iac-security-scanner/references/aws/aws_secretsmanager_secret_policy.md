# aws_secretsmanager_secret_policy

## AC_AWS_0501: secretManagerPolicyNotSecret

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_secretsmanager_secret_policy`

### Description
Ensure secrets manager do not wildcard policies attached

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_secretsmanager_secret_policy" "example" {
  Action = "*"
}

```

### Good Example
```hcl
resource "aws_secretsmanager_secret_policy" "example" {
  Action = "specific:Action"
}

```

---
