# aws_iam_user_login_profile

## AC_AWS_0148: noPasswordPolicyEnabled

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `aws_iam_user_login_profile`

### Description
Password policies are, in part, used to enforce password complexity requirements. IAM password policies can be used to ensure password are comprised of different character sets, have minimal length, rotation and history restrictions

### What to Check
- Verify attribute is set to `true`.
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_iam_user_login_profile" "example" {
  # password_length = ... (not set)
}

```

### Good Example
```hcl
resource "aws_iam_user_login_profile" "example" {
  password_length = "ewogICJwYXNzd29yZF9sZW5ndGgiOiAxNiwKICAicGFzc3dvcmRfcmVzZXRfcmVxdWlyZWQiOiB0cnVlCn0="
}

```

---
