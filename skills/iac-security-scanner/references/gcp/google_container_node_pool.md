# google_container_node_pool

## AC_GCP_0016: cosNodeImageUsed

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `google_container_node_pool`

### Description
Ensure Container-Optimized OS (cos) is used for Kubernetes Engine Clusters Node image.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_node_pool" "example" {
  # Configure per: cosNodeImageUsed
}

```

### Good Example
```hcl
resource "google_container_node_pool" "example" {
  # Remediated per: cosNodeImageUsed
}

```

---

## AC_GCP_0017: autoNodeUpgradeEnabled

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `google_container_node_pool`

### Description
Ensure 'Automatic node upgrade' is enabled for Kubernetes Clusters.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "google_container_node_pool" "example" {
  # Configure per: autoNodeUpgradeEnabled
}

```

### Good Example
```hcl
resource "google_container_node_pool" "example" {
  # Remediated per: autoNodeUpgradeEnabled
}

```

---

## AC_GCP_0015: autoNodeRepairEnabled

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `google_container_node_pool`

### Description
Ensure 'Automatic node repair' is enabled for Kubernetes Clusters.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "google_container_node_pool" "example" {
  # Configure per: autoNodeRepairEnabled
}

```

### Good Example
```hcl
resource "google_container_node_pool" "example" {
  # Remediated per: autoNodeRepairEnabled
}

```

---
