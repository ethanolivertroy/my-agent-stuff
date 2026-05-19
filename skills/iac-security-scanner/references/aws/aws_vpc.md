# aws_vpc

## AC_AWS_0370: defaultVpcExist

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_vpc`

### Description
Avoid creating resources in default VPC

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_vpc" "example" {
  is_default = true
}

```

### Good Example
```hcl
resource "aws_vpc" "example" {
  is_default = false
}

```

---

## AC_AWS_0369: vpcFlowLogsNotEnabled

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_vpc`

### Description
Ensure VPC flow logging is enabled in all VPCs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_vpc" "example" {
  # Missing required companion resource or configuration
}

```

### Good Example
```hcl
# Add the required resource per policy: Ensure VPC flow logging is enabled in all VPCs

```

---
