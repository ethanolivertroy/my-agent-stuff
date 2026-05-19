# aws_iam_role

## AC_AWS_0146: iamRoleWithFullAdminCntrl

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_role`

### Description
It is recommended and considered a standard security advice to grant least privileges that is, granting only the permissions required to perform a task. IAM policies are the means by which privileges are granted to users, groups, or roles. Determine what users need to do and then craft policies for them that let the users perform only those tasks, instead of granting full administrative privileges.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_role" "example" {
  policy = false
}

```

### Good Example
```hcl
resource "aws_iam_role" "example" {
  policy = true
}

```

---
