# aws_iam_account_password_policy

## AC_AWS_0142: passwordRequireMinLength14

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Setting a lengthy password increases account resiliency against brute force login attempts

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = true
}

```

---

## AC_AWS_0141: passwordRequireMinLength

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Setting a lengthy password increases account resiliency against brute force login attempts

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = true
}

```

---

## AC_AWS_0137: passwordRequireSymbol

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Special symbols not present in the Password, Password Complexity is not high. Increased Password complexity increases resiliency against brute force attack

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Configure per: passwordRequireSymbol
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Remediated per: passwordRequireSymbol
}

```

---

## AC_AWS_0136: passwordRequireNumber

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Number not present in the Password, Password Complexity is not high. Increased Password complexity increases resiliency against brute force attack

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Configure per: passwordRequireNumber
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Remediated per: passwordRequireNumber
}

```

---

## AC_AWS_0135: passwordRequireUpperCase

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Upper case alphabet not present in the Password, Password Complexity is not high. Increased Password complexity increases resiliency against brute force attack

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Configure per: passwordRequireUpperCase
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Remediated per: passwordRequireUpperCase
}

```

---

## AC_AWS_0472: passwordReuseNotAllowed

- **Severity**: 🟢 LOW
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
It is recommended that the password policy prevent the reuse of passwords.Preventing password reuse increases account resiliency against brute force login attempts

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  logging_enabled = true
}

```

---

## AC_AWS_0138: passwordRotateEvery90Days

- **Severity**: 🟢 LOW
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Reducing the password lifetime increases account resiliency against brute force login attempts

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  max_password_age = 0
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  max_password_age = 90
}

```

---

## AC_AWS_0134: passwordRequireLowerCase

- **Severity**: 🟢 LOW
- **Category**: Compliance Validation
- **Resource**: `aws_iam_account_password_policy`

### Description
Lower case alphabet not present in the Password, Password Complexity is not high. Increased Password complexity increases resiliency against brute force attack

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Configure per: passwordRequireLowerCase
}

```

### Good Example
```hcl
resource "aws_iam_account_password_policy" "example" {
  # Remediated per: passwordRequireLowerCase
}

```

---
