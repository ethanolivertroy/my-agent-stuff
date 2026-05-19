# aws_api_gateway_rest_api_policy

## AC_AWS_0440: apiGatewayRestApiPolicyNotSecure

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_api_gateway_rest_api_policy`

### Description
Ensure use of API Gateway endpoint policy, and no action wildcards are being used.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_api_gateway_rest_api_policy" "example" {
  # Configure per: apiGatewayRestApiPolicyNotSecure
}

```

### Good Example
```hcl
resource "aws_api_gateway_rest_api_policy" "example" {
  # Remediated per: apiGatewayRestApiPolicyNotSecure
}

```

---
