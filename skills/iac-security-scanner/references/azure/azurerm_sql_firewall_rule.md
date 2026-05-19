# azurerm_sql_firewall_rule

## AC_AZURE_0381: reme_sqlPublicAccess

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_sql_firewall_rule`

### Description
Ensure entire Azure infrastructure doesn't have access to Azure SQL ServerEnsure entire Azure infrastructure doesn't have access to Azure SQL Server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Configure per: reme_sqlPublicAccess
}

```

### Good Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Remediated per: reme_sqlPublicAccess
}

```

---

## AC_AZURE_0380: reme_sqlIngressAccess

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_sql_firewall_rule`

### Description
Ensure that no SQL Server allows ingress from 0.0.0.0/0 (ANY IP)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Configure per: reme_sqlIngressAccess
}

```

### Good Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Remediated per: reme_sqlIngressAccess
}

```

---

## AC_AZURE_0280: reme_moreHostsAllowed

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_sql_firewall_rule`

### Description
Restrict Azure SQL Server accessibility to a minimal address range

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Configure per: reme_moreHostsAllowed
}

```

### Good Example
```hcl
resource "azurerm_sql_firewall_rule" "example" {
  # Remediated per: reme_moreHostsAllowed
}

```

---
