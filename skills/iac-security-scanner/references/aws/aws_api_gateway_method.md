# aws_api_gateway_method

## AC_AWS_0439: apiGatewayAuthorizationDisabled

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_api_gateway_method`

### Description
Ensure there is no open access to back-end resources through API

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_method" "example" {
  # Configure per: apiGatewayAuthorizationDisabled
}

```

### Good Example
```hcl
resource "aws_api_gateway_method" "example" {
  # Remediated per: apiGatewayAuthorizationDisabled
}

```

---
