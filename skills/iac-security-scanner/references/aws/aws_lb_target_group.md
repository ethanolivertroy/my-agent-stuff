# aws_lb_target_group

## AC_AWS_0492: targetGroupUsingHttp

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_lb_target_group`

### Description
Ensure Target Group use HTTPs to ensure end to end encryption

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lb_target_group" "example" {
  protocol = "HTTP"
}

```

### Good Example
```hcl
resource "aws_lb_target_group" "example" {
  protocol = "HTTPS"
}

```

---
