# azurerm_mysql_server

## AC_AZURE_0131: sslConnectionEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_mysql_server`

### Description
Ensure 'Enforce SSL connection' is set to 'ENABLED' for MySQL Database Server.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "azurerm_mysql_server" "example" {
  ssl_enforcement_enabled = true
}

```

### Good Example
```hcl
resource "azurerm_mysql_server" "example" {
  ssl_enforcement_enabled = false
}

```

---
