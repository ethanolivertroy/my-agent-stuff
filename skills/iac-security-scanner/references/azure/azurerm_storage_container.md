# azurerm_storage_container

## AC_AZURE_0366: reme_checkStorageContainerAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `azurerm_storage_container`

### Description
Anonymous, public read access to a container and its blobs can be enabled in Azure Blob storage. This is only recommended if absolutely necessary.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_storage_container" "example" {
  publicly_accessible = false
}

```

### Good Example
```hcl
resource "azurerm_storage_container" "example" {
  publicly_accessible = true
}

```

---
