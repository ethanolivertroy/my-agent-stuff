# azurerm_application_gateway

## AC_AZURE_0189: reme_appGatewayWAFEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_application_gateway`

### Description
Ensure Azure Application Gateway Web application firewall (WAF) is enabled

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_application_gateway" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "waf_configuration": {
    "enabled": true,
    "firewall_mode": "Detection",
    "rule_set_type": "OWASP"
  }
}

```

---
