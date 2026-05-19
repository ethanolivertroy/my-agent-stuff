# azurerm_key_vault_secret

## AC_AZURE_0163: reme_checkSecretExpirationIsSet

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `azurerm_key_vault_secret`

### Description
Ensure that all secrets have an expiration date set which must expire within 2 years

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_key_vault_secret" "example" {
  expiration_date = false
}

```

### Good Example
```hcl
resource "azurerm_key_vault_secret" "example" {
  expiration_date = true
}

```

---
