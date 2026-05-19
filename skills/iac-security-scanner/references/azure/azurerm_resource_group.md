# azurerm_resource_group

## AC_AZURE_0389: reme_resourceGroupLock

- **Severity**: 🟢 LOW
- **Category**: Identity and Access Management
- **Resource**: `azurerm_resource_group`

### Description
Ensure that Azure Resource Group has resource lock enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_resource_group" "example" {
  # Missing required companion resource or configuration
}

```

### Good Example
```hcl
# Add the required resource per policy: Ensure that Azure Resource Group has resource lock enabled

```

---
