# azurerm_sql_database

## AC_AZURE_0383: reme_checkAuditEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_sql_database`

### Description
Ensure that 'Threat Detection' is enabled for Azure SQL Database

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_database" "example" {
  threat_detection_policy {
    state = false
  }
}

```

### Good Example
```hcl
resource "azurerm_sql_database" "example" {
  threat_detection_policy {
    state = true
  }
}

```

---
