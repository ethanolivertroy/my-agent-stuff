# azurerm_storage_account_network_rules

## AC_AZURE_0309: defStorageAccessDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_storage_account_network_rules`

### Description
Ensure default network access rule for Storage Accounts is set to deny.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_storage_account_network_rules" "example" {
  network_rules = false
}

```

### Good Example
```hcl
resource "azurerm_storage_account_network_rules" "example" {
  network_rules = true
}

```

---
