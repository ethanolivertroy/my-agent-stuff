# aws_api_gateway_rest_api

## AC_AWS_0011: apiGatewayEndpointConfig

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_api_gateway_rest_api`

### Description
API Gateway Private Endpoints

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_rest_api" "example" {
  # Configure per: apiGatewayEndpointConfig
}

```

### Good Example
```hcl
resource "aws_api_gateway_rest_api" "example" {
  # Remediated per: apiGatewayEndpointConfig
}

```

---

## AC_AWS_0010: apiGatewayContentEncoding

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_api_gateway_rest_api`

### Description
Enable Content Encoding

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_rest_api" "example" {
  # Configure per: apiGatewayContentEncoding
}

```

### Good Example
```hcl
resource "aws_api_gateway_rest_api" "example" {
  # Remediated per: apiGatewayContentEncoding
}

```

---
