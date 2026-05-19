# aws_route53_query_log

## AC_AWS_0204: route53LoggingDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_route53_query_log`

### Description
Ensure CloudWatch logging is enabled for Route53 hosted zones.

### What to Check
- Verify resource is not publicly accessible.
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_route53_query_log" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_route53_query_log" "example" {
  logging_enabled = true
}

```

---
