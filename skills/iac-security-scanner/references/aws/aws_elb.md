# aws_elb

## AC_AWS_0470: elbAccessLoggingDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_elb`

### Description
Ensure AWS ELB has access logging enabled.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_elb" "example" {
  # access_logs = ... (not set)
}

```

### Good Example
```hcl
resource "aws_elb" "example" {
  access_logs = true
}

```

---

## AC_AWS_0120: elbLbProtocolNotSecured

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_elb`

### Description
AWS ELB incoming traffic not encrypted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_elb" "example" {
  listener {
    lb_protocol = false
  }
}

```

### Good Example
```hcl
resource "aws_elb" "example" {
  listener {
    lb_protocol = true
  }
}

```

---
