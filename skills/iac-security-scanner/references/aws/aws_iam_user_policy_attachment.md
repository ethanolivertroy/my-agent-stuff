# aws_iam_user_policy_attachment

## AC_AWS_0476: iamUserManagedPolicyAttachment

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_user_policy_attachment`

### Description
Ensure IAM permissions are not given directly to users

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_user_policy_attachment" "example" {
  # Configure per: iamUserManagedPolicyAttachment
}

```

### Good Example
```hcl
resource "aws_iam_user_policy_attachment" "example" {
  # Remediated per: iamUserManagedPolicyAttachment
}

```

---
