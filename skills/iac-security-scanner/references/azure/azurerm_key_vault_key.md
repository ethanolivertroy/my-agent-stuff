# azurerm_key_vault_key

## AC_AZURE_0164: reme_checkKeyExpirationIsSet

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `azurerm_key_vault_key`

### Description
Ensure that the expiration date is set on all keys

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_key_vault_key" "example" {
  expiration_date = false
}

```

### Good Example
```hcl
resource "azurerm_key_vault_key" "example" {
  expiration_date = true
}

```

---
