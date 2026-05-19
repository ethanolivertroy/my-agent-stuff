# aws_cloudwatch_log_group

## AC_AWS_0452: cloudWatchLogGroupNoRetentionPolicy

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudwatch_log_group`

### Description
Ensure AWS Cloudwatch log group has retention policy set.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudwatch_log_group" "bad" {
  name              = "/aws/lambda/app"
  retention_in_days = 0
}

```

### Good Example
```hcl
resource "aws_cloudwatch_log_group" "good" {
  name              = "/aws/lambda/app"
  retention_in_days = 90
}

```

---
