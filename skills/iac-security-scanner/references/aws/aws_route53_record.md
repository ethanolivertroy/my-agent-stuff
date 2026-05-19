# aws_route53_record

## AC_AWS_0205: noRoute53RecordSet

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `aws_route53_record`

### Description
Route53HostedZone should have recordSets.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_route53_record" "example" {
  records = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "aws_route53_record" "example" {
  records = ["10.0.0.0/16"]
}

```

---
