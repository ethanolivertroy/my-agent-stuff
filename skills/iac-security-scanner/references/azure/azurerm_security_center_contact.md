# azurerm_security_center_contact

## AC_AZURE_0386: emailAlertsSecurityCenterContact

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_security_center_contact`

### Description
Ensure that 'Send email notification for high severity alerts' is set to 'On'

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "azurerm_security_center_contact" "example" {
  alert_notifications = true
}

```

### Good Example
```hcl
resource "azurerm_security_center_contact" "example" {
  alert_notifications = false
}

```

---
