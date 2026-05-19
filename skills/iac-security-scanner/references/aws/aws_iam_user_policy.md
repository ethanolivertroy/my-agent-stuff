# aws_iam_user_policy

## AC_AWS_0474: iamPolicyWithFullAdminControl

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_user_policy`

### Description
It is recommended and considered a standard security advice to grant least privileges that is, granting only the permissions required to perform a task. IAM policies are the means by which privileges are granted to users, groups, or roles. Determine what users need to do and then craft policies for them that let the users perform only those tasks, instead of granting full administrative privileges.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_user_policy" "bad" {
  name = "wildcard-user-policy"
  user = aws_iam_user.dev.name
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
resource "aws_iam_user_policy" "good" {
  name = "scoped-user-policy"
  user = aws_iam_user.dev.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket"]
      }
    ]
  })
}

```

---

## AC_AWS_0151: userWithPassNotContainMfaActive

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_iam_user_policy`

### Description
It is recommended that MFA be enabled for all accounts that have a console password. Enabling MFA provides increased security for console access as it requires the authenticating principal to possess a device that emits a time-sensitive key and have knowledge of a credential

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_user_policy" "bad" {
  name = "wildcard-user-policy"
  user = aws_iam_user.dev.name
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
resource "aws_iam_user_policy" "good" {
  name = "scoped-user-policy"
  user = aws_iam_user.dev.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket"]
      }
    ]
  })
}

```

---

## AC_AWS_0150: rootUserNotContainMfaTypeHardware

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_iam_user_policy`

### Description
Ensure Hardware MFA device is enabled for the "root" account

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_user_policy" "bad" {
  name = "wildcard-user-policy"
  user = aws_iam_user.dev.name
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
resource "aws_iam_user_policy" "good" {
  name = "scoped-user-policy"
  user = aws_iam_user.dev.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket"]
      }
    ]
  })
}

```

---

## AC_AWS_0149: rootUserNotContainMfaTypeVirtual

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_iam_user_policy`

### Description
Ensure Virtual MFA device is enabled for the "root" account

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_iam_user_policy" "bad" {
  name = "wildcard-user-policy"
  user = aws_iam_user.dev.name
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
resource "aws_iam_user_policy" "good" {
  name = "scoped-user-policy"
  user = aws_iam_user.dev.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket"]
      }
    ]
  })
}

```

---

## AC_AWS_0475: iamUserInlinePolicy

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_user_policy`

### Description
Ensure IAM policies are attached only to groups or roles

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_user_policy" "bad" {
  name = "wildcard-user-policy"
  user = aws_iam_user.dev.name
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
resource "aws_iam_user_policy" "good" {
  name = "scoped-user-policy"
  user = aws_iam_user.dev.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-bucket"]
      }
    ]
  })
}

```

---
