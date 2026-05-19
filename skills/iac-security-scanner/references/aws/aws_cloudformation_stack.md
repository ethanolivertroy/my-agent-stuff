# aws_cloudformation_stack

## AC_AWS_0445: cloudFormationStackPolicy

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_cloudformation_stack`

### Description
AWS CloudFormation Stack Policy

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Configure per: cloudFormationStackPolicy
}

```

### Good Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Remediated per: cloudFormationStackPolicy
}

```

---

## AC_AWS_0444: awsCloudFormationInUse

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_cloudformation_stack`

### Description
AWS CloudFormation Not In Use

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Configure per: awsCloudFormationInUse
}

```

### Good Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Remediated per: awsCloudFormationInUse
}

```

---

## AC_AWS_0022: cloudFormationTerminationProtection

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_cloudformation_stack`

### Description
Enable AWS CloudFormation Stack Termination Protection

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_cloudformation_stack" "example" {
  retain_stack = false
}

```

### Good Example
```hcl
resource "aws_cloudformation_stack" "example" {
  retain_stack = true
}

```

---

## AC_AWS_0021: cloudFormationStackNotifs

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_cloudformation_stack`

### Description
Enable AWS CloudFormation Stack Notifications

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Configure per: cloudFormationStackNotifs
}

```

### Good Example
```hcl
resource "aws_cloudformation_stack" "example" {
  # Remediated per: cloudFormationStackNotifs
}

```

---
