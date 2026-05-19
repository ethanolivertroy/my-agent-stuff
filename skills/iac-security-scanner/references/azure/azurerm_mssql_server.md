# azurerm_mssql_server

## AC_AZURE_0137: mssqlServerAuditingEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_mssql_server`

### Description
Ensure that 'Auditing' is set to 'On' for MSSQL servers

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_mssql_server" "example" {
  audit_log_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_mssql_server" "example" {
  audit_log_enabled = true
}

```

---

## AC_AZURE_0136: mssqlAuditingRetention

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_mssql_server`

### Description
Ensure that 'Auditing' Retention is 'greater than 90 days' for MSSQL servers.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_mssql_server" "example" {
  audit_log_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_mssql_server" "example" {
  audit_log_enabled = true
}

```

---
