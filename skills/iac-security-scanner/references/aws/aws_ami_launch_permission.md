# aws_ami_launch_permission

## AC_AWS_0006: amiSharedToMultipleAccounts

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_ami_launch_permission`

### Description
Limit access to AWS AMIs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ami_launch_permission" "example" {
  # Configure per: amiSharedToMultipleAccounts
}

```

### Good Example
```hcl
resource "aws_ami_launch_permission" "example" {
  # Remediated per: amiSharedToMultipleAccounts
}

```

---
