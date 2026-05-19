# aws_iam_access_key

## AC_AWS_0132: noAccessKeyForRootAccount

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_access_key`

### Description
The root account is the most privileged user in an AWS account. AWS Access Keys provide programmatic access to a given AWS account. It is recommended that all access keys associated with the root account be removed. Removing access keys associated with the root account limits vectors by which the account can be compromised. Additionally, removing the root access keys encourages the creation and use of role based accounts that are least privileged.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_access_key" "example" {
  status = "Active"
}

```

### Good Example
```hcl
resource "aws_iam_access_key" "example" {
  status = "<secure-status>"
}

```

---

## AC_AWS_0133: programmaticAccessCreation

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `aws_iam_access_key`

### Description
Ensure that there are no exposed Amazon IAM access keys in order to protect your AWS resources against unapproved access

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_access_key" "example" {
  status = "Active"
}

```

### Good Example
```hcl
resource "aws_iam_access_key" "example" {
  status = "<secure-status>"
}

```

---
