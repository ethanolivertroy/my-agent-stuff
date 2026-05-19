# aws_apigatewayv2_stage

## AC_AWS_0442: apiGatewayNoAccessLogs

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_apigatewayv2_stage`

### Description
AWS API Gateway V2 Stage is missing access logs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_apigatewayv2_stage" "example" {
  # access_log_settings = ... (not set)
}

```

### Good Example
```hcl
resource "aws_apigatewayv2_stage" "example" {
  access_log_settings = true
}

```

---
