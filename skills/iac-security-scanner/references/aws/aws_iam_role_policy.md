# aws_iam_role_policy

## AC_AWS_0473: iamRolePolicyWithPrivilegeEscalation

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_role_policy`

### Description
Ensure IAM roles do not have any policies attached that may cause privilege escalation.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_role_policy" "bad" {
  name = "wildcard-policy"
  role = aws_iam_role.app.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "*"
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_iam_role_policy" "good" {
  name = "scoped-policy"
  role = aws_iam_role.app.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Effect   = "Allow"
        Resource = ["arn:aws:logs:*:*:log-group:/aws/lambda/app:*"]
      }
    ]
  })
}

```

---

## AC_AWS_0147: iamRolePolicyWithFullAdminCntrl

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_role_policy`

### Description
It is recommended and considered a standard security advice to grant least privileges that is, granting only the permissions required to perform a task. IAM policies are the means by which privileges are granted to users, groups, or roles. Determine what users need to do and then craft policies for them that let the users perform only those tasks, instead of granting full administrative privileges.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_role_policy" "bad" {
  name = "wildcard-policy"
  role = aws_iam_role.app.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "*"
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_iam_role_policy" "good" {
  name = "scoped-policy"
  role = aws_iam_role.app.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Effect   = "Allow"
        Resource = ["arn:aws:logs:*:*:log-group:/aws/lambda/app:*"]
      }
    ]
  })
}

```

---
