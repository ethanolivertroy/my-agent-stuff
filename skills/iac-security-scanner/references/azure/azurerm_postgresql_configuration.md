# azurerm_postgresql_configuration

## AC_AZURE_0414: reme_connectionThrottling

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'connection_throttling' is set to 'ON' for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = true
}

```

---

## AC_AZURE_0413: reme_logConnections

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'log_connections' is set to 'ON' for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = true
}

```

---

## AC_AZURE_0412: reme_logDisconnections

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'log_disconnections' is set to 'ON' for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = true
}

```

---

## AC_AZURE_0411: reme_logDuration

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'log_duration' is set to 'ON' for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = true
}

```

---

## AC_AZURE_0410: logRetentionPsql

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'log_retention_days' is greater than 3 days for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  # value = ... (not set)
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  value = "4"
}

```

---

## AC_AZURE_0409: postgreSqlLogsEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_postgresql_configuration`

### Description
Ensure server parameter 'log_checkpoints' is set to 'ON' for PostgreSQL Database Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "azurerm_postgresql_configuration" "example" {
  logging_enabled = true
}

```

---
