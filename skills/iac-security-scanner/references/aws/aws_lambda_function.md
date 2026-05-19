# aws_lambda_function

## AC_AWS_0483: lambdaNotEncryptedWithKms

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_lambda_function`

### Description
Lambda does not use KMS CMK key to protect environment variables.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lambda_function" "example" {
  # environment = ... (not set)
}

```

### Good Example
```hcl
resource "aws_lambda_function" "example" {
  environment = true
}

```

---

## AC_AWS_0484: lambdaPolicyNotAttached

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_lambda_function`

### Description
Ensure AWS Lambda function has policy attached.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lambda_function" "example" {
  # Configure per: lambdaPolicyNotAttached
}

```

### Good Example
```hcl
resource "aws_lambda_function" "example" {
  # Remediated per: lambdaPolicyNotAttached
}

```

---

## AC_AWS_0486: lambdaNotInVpc

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_lambda_function`

### Description
Lambda function does not include a VPC configuration.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lambda_function" "example" {
  # vpc_config = ... (not set)
}

```

### Good Example
```hcl
resource "aws_lambda_function" "example" {
  vpc_config = true
}

```

---

## AC_AWS_0485: lambdaXRayTracingDisabled

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_lambda_function`

### Description
Lambda tracing is not enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lambda_function" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "tracing_config": {
    "mode": "Active"
  }
}

```

---

## AC_AWS_0163: lambdaXRayTracingDisabled

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_lambda_function`

### Description
Lambda tracing is not enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lambda_function" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "tracing_config": {
    "mode": "Active"
  }
}

```

---
