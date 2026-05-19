# azurerm_postgresql_server

## AC_AZURE_0408: reme_sslEnforceDisabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_postgresql_server`

### Description
Ensure 'Enforce SSL connection' is set to 'ENABLED' for PostgreSQL Database Server

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_postgresql_server" "example" {
  ssl_enforcement_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_server" "example" {
  ssl_enforcement_enabled = true
}

```

---

## AC_AZURE_0407: reme_geoRedundancyDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Resilience
- **Resource**: `azurerm_postgresql_server`

### Description
Ensure that Geo Redundant Backups is enabled on PostgreSQL

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_server" "example" {
  geo_redundant_backup_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_server" "example" {
  geo_redundant_backup_enabled = true
}

```

---
