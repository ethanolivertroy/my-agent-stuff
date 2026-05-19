# azurerm_virtual_network

## AC_AZURE_0356: reme_noSecurityGroupAssociated

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_virtual_network`

### Description
Ensure that Azure Virtual Network subnet is configured with a Network Security Group

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_virtual_network" "example" {
  # Missing required companion resource or configuration
}

```

### Good Example
```hcl
# Add the required resource per policy: Ensure that Azure Virtual Network subnet is configured with a Network Security G

```

---
