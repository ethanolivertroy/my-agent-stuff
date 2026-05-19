# azurerm_container_registry

## AC_AZURE_0185: reme_containerRegistryResourceLock

- **Severity**: 🔴 HIGH
- **Category**: Resilience
- **Resource**: `azurerm_container_registry`

### Description
Ensure Container Registry has locks

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_container_registry" "example" {
  # Missing required companion resource or configuration
}

```

### Good Example
```hcl
# Add the required resource per policy: Ensure Container Registry has locks

```

---

## AC_AZURE_0186: reme_containerRegistryAdminEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `azurerm_container_registry`

### Description
Ensure that admin user is disabled for Container Registry

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_container_registry" "example" {
  admin_enabled = true
}

```

### Good Example
```hcl
resource "azurerm_container_registry" "example" {
  admin_enabled = false
}

```

---
