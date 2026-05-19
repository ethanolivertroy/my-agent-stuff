# azurerm_sql_active_directory_administrator

## AC_AZURE_0384: reme_sqlServerADPredictableAccount

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `azurerm_sql_active_directory_administrator`

### Description
Avoid using names like 'Admin' for an Azure SQL Server Active Directory Administrator account

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "azurerm_sql_active_directory_administrator" "example" {
  login = false
}

```

### Good Example
```hcl
resource "azurerm_sql_active_directory_administrator" "example" {
  login = true
}

```

---
