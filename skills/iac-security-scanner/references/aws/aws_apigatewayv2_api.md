# aws_apigatewayv2_api

## AC_AWS_0441: apiGatewayMisconfiguredCors

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_apigatewayv2_api`

### Description
Insecure Cross-Origin Resource Sharing Configuration allowing all domains

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_apigatewayv2_api" "example" {
  # Configure per: apiGatewayMisconfiguredCors
}

```

### Good Example
```hcl
resource "aws_apigatewayv2_api" "example" {
  # Remediated per: apiGatewayMisconfiguredCors
}

```

---
