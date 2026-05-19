# azurerm_network_watcher_flow_log

## AC_AZURE_0418: reme_networkWatcherEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `azurerm_network_watcher_flow_log`

### Description
Enable Network Watcher for Azure subscriptions. Network diagnostic and visualization tools available with Network Watcher help users understand, diagnose, and gain insights to the network in Azure.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_network_watcher_flow_log" "example" {
  enabled = false
}

```

### Good Example
```hcl
resource "azurerm_network_watcher_flow_log" "example" {
  enabled = true
}

```

---

## AC_AZURE_0419: logRetentionGreaterThan90Days

- **Severity**: 🟡 MEDIUM
- **Category**: Resilience
- **Resource**: `azurerm_network_watcher_flow_log`

### Description
Ensure that Network Security Group Flow Log retention period is 'greater than 90 days' for Azure Network Watcher Flow Log

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_network_watcher_flow_log" "example" {
  enabled = false
}

```

### Good Example
```hcl
resource "azurerm_network_watcher_flow_log" "example" {
  enabled = true
}

```

---
