# aws_api_gateway_stage

## AC_AWS_0014: apiGatewayName

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_api_gateway_stage`

### Description
Enable AWS CloudWatch Logs for APIs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_stage" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_api_gateway_stage" "example" {
  logging_enabled = true
}

```

---

## AC_AWS_0013: apiGatewaySslCertificate

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_api_gateway_stage`

### Description
Enable SSL Client Certificate

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_stage" "example" {
  ssl_enforcement_enabled = false
}

```

### Good Example
```hcl
resource "aws_api_gateway_stage" "example" {
  ssl_enforcement_enabled = true
}

```

---

## AC_AWS_0012: apiGatewayLogging

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_api_gateway_stage`

### Description
Ensure that AWS CloudWatch logs are enabled for all your APIs created with Amazon API Gateway service in order to track and analyze execution behavior at the API stage level.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_api_gateway_stage" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "access_log_settings": {
    "destination_arn": "<destination_arn>",
    "format": "<format>>"
  }
}

```

---

## AC_AWS_0015: apiGatewayTracing

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_api_gateway_stage`

### Description
Ensure AWS API Gateway has active xray tracing enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_stage" "example" {
  # xray_tracing_enabled = ... (not set)
}

```

### Good Example
```hcl
resource "aws_api_gateway_stage" "example" {
  xray_tracing_enabled = true
}

```

---
