# azurerm_key_vault

## AC_AZURE_0169: reme_keyVaultAuditLoggingEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_key_vault`

### Description
Ensure that logging for Azure KeyVault is 'Enabled'

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "azurerm_key_vault" "example" {
  # Missing required companion resource or configuration
}

```

### Good Example
```hcl
# Add the required resource per policy: Ensure that logging for Azure KeyVault is 'Enabled'

```

---

## AC_AZURE_0170: reme_keyVaultSoftDeleteEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `azurerm_key_vault`

### Description
Ensure the key vault is recoverable - enable "Soft Delete" setting for a Key Vault

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_key_vault" "example" {
  soft_delete_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_key_vault" "example" {
  soft_delete_enabled = true
}

```

---
