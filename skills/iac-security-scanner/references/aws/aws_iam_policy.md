# aws_iam_policy

## AC_AWS_0144: reme_iamPolicyWithFullAdminControl

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_policy`

### Description
It is recommended and considered a standard security advice to grant least privileges that is, granting only the permissions required to perform a task. IAM policies are the means by which privileges are granted to users, groups, or roles. Determine what users need to do and then craft policies for them that let the users perform only those tasks, instead of granting full administrative privileges.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_policy" "bad" {
  name   = "wildcard-policy"
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
resource "aws_iam_policy" "good" {
  name   = "least-privilege-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:GetObject"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket/*"]
      }
    ]
  })
}

```

---
