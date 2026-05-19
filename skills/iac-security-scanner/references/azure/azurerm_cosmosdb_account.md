# azurerm_cosmosdb_account

## AC_AZURE_0184: reme_ipRangeFilterMissing

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_cosmosdb_account`

### Description
Ensure to filter source Ips for Cosmos DB Account

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_cosmosdb_account" "example" {
  # ip_range_filter = ... (not set)
}

```

### Good Example
```hcl
resource "azurerm_cosmosdb_account" "example" {
  ip_range_filter = "<cidr>"
}

```

---

## AC_AZURE_0277: reme_noTags

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `azurerm_cosmosdb_account`

### Description
Ensure that Cosmos DB Account has an associated tag

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_cosmosdb_account" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "tags": {
    "added_by": "accurics"
  }
}

```

---
