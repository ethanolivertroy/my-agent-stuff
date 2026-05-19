# aws_efs_file_system_policy

## AC_AWS_0464: efsPolicyNotSecure

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_efs_file_system_policy`

### Description
Ensure EFS file system does not use insecure wildcard policies.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_efs_file_system_policy" "example" {
  Action = "*"
}

```

### Good Example
```hcl
resource "aws_efs_file_system_policy" "example" {
  Action = "specific:Action"
}

```

---
