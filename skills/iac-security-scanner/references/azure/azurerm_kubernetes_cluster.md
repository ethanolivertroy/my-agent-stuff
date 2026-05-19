# azurerm_kubernetes_cluster

## AC_AZURE_0161: kubeDashboardDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_kubernetes_cluster`

### Description
Ensure Kube Dashboard is disabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_kubernetes_cluster" "example" {
  # Configure per: kubeDashboardDisabled
}

```

### Good Example
```hcl
resource "azurerm_kubernetes_cluster" "example" {
  # Remediated per: kubeDashboardDisabled
}

```

---

## AC_AZURE_0158: networkPolicyEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_kubernetes_cluster`

### Description
Ensure AKS cluster has Network Policy configured.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "azurerm_kubernetes_cluster" "example" {
  network_rules = false
}

```

### Good Example
```hcl
resource "azurerm_kubernetes_cluster" "example" {
  network_rules = true
}

```

---
