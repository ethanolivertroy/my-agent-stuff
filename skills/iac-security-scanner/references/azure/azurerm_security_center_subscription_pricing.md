# azurerm_security_center_subscription_pricing

## AC_AZURE_0385: reme_securityCenterPricingTier

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `azurerm_security_center_subscription_pricing`

### Description
Ensure that standard pricing tiers are selected

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_security_center_subscription_pricing" "example" {
  # Configure per: reme_securityCenterPricingTier
}

```

### Good Example
```hcl
resource "azurerm_security_center_subscription_pricing" "example" {
  # Remediated per: reme_securityCenterPricingTier
}

```

---
