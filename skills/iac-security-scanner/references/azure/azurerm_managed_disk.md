# azurerm_managed_disk

## AC_AZURE_0143: checkDiskEncryption

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `azurerm_managed_disk`

### Description
Ensure that 'Unattached disks' are encrypted in Azure Managed Disk

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "azurerm_managed_disk" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "azurerm_managed_disk" "example" {
  encryption = true
}

```

---
