# aws_globalaccelerator_accelerator

## AC_AWS_0471: globalAccFlowLogsDisabled

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_globalaccelerator_accelerator`

### Description
Ensure Global Accelerator accelerator has flow logs enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_globalaccelerator_accelerator" "example" {
  # attributes = ... (not set)
}

```

### Good Example
```hcl
resource "aws_globalaccelerator_accelerator" "example" {
  attributes = true
}

```

---
