# azurerm_role_assignment

## AC_AZURE_0388: reme_checkGuestUser

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `azurerm_role_assignment`

### Description
Ensure that there are no guest users

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_role_assignment" "example" {
  # Configure per: reme_checkGuestUser
}

```

### Good Example
```hcl
resource "azurerm_role_assignment" "example" {
  # Remediated per: reme_checkGuestUser
}

```

---
