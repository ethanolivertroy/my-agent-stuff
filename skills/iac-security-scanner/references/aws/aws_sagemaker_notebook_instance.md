# aws_sagemaker_notebook_instance

## AC_AWS_0499: notEncryptedSageMaker

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_sagemaker_notebook_instance`

### Description
Ensure SageMaker Instance is Encrypted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_sagemaker_notebook_instance" "example" {
  # kms_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_sagemaker_notebook_instance" "example" {
  kms_key_id = true
}

```

---
