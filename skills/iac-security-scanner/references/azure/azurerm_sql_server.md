# azurerm_sql_server

## AC_AZURE_0378: reme_sqlServerADAdminConfigured

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `azurerm_sql_server`

### Description
Ensure that Azure Active Directory Admin is configured for SQL Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_server" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
m�뇧r�^��eiǝ

```

---

## AC_AZURE_0377: reme_sqlServerPredictableAccount

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `azurerm_sql_server`

### Description
Avoid using names like 'Admin' for an Azure SQL Server admin account login

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "azurerm_sql_server" "example" {
  administrator_login = false
}

```

### Good Example
```hcl
resource "azurerm_sql_server" "example" {
  administrator_login = true
}

```

---

## AC_AZURE_0376: sqlServerAuditingEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_sql_server`

### Description
Ensure that 'Auditing' is set to 'On' for SQL servers

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_server" "example" {
  audit_log_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_sql_server" "example" {
  audit_log_enabled = true
}

```

---

## AC_AZURE_0375: sqlAuditingRetention

- **Severity**: 🟢 LOW
- **Category**: Compliance Validation
- **Resource**: `azurerm_sql_server`

### Description
Ensure that 'Auditing' Retention is 'greater than 90 days' for SQL servers.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_server" "example" {
  audit_log_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_sql_server" "example" {
  audit_log_enabled = true
}

```

---
