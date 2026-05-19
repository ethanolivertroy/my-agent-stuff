# azurerm_storage_account

## AC_AZURE_0373: reme_storageAccountEnableHttps

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `azurerm_storage_account`

### Description
Ensure that 'Secure transfer required' is enabled for Storage Accounts

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_storage_account" "example" {
  enable_https_traffic_only = false
}

```

### Good Example
```hcl
resource "azurerm_storage_account" "example" {
  enable_https_traffic_only = true
}

```

---

## AC_AZURE_0371: reme_storageAccountTrustedMicrosoftServicesEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_storage_account`

### Description
Ensure 'Trusted Microsoft Services' is enabled for Storage Account access

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_storage_account" "example" {
  network_rules {
    bypass = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "azurerm_storage_account" "example" {
  network_rules {
    bypass = ["10.0.0.0/16"]
  }
}

```

---

## AC_AZURE_0370: reme_storageAccountOpenToPublic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_storage_account`

### Description
Ensure default network access rule for Storage Accounts is not open to public

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "azurerm_storage_account" "example" {
  network_rules {
    ip_rules = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "azurerm_storage_account" "example" {
  network_rules {
    ip_rules = ["10.0.0.0/16"]
  }
}

```

---
