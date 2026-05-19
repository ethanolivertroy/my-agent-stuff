# aws_lb_listener

## AC_AWS_0491: listenerNotHttps

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_lb_listener`

### Description
Ensure there is a listener configured on HTTPs or with a port 443

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_lb_listener" "example" {
  protocol = "HTTP"
}

```

### Good Example
```hcl
resource "aws_lb_listener" "example" {
  protocol = "HTTPS"
}

```

---
