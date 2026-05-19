# aws_api_gateway_method_settings

## AC_AWS_0007: apiGatewaySettingMetrics

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_api_gateway_method_settings`

### Description
Enable Detailed CloudWatch Metrics for APIs

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_api_gateway_method_settings" "example" {
  settings {
    metrics_enabled = false
  }
}

```

### Good Example
```hcl
resource "aws_api_gateway_method_settings" "example" {
  settings {
    metrics_enabled = true
  }
}

```

---
