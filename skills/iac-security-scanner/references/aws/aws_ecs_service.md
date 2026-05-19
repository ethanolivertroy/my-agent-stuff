# aws_ecs_service

## AC_AWS_0087: ecsServiceAdmin

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_ecs_service`

### Description
Ensure there are no ECS services Admin roles

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ecs_service" "example" {
  # Configure per: ecsServiceAdmin
}

```

### Good Example
```hcl
resource "aws_ecs_service" "example" {
  # Remediated per: ecsServiceAdmin
}

```

---
