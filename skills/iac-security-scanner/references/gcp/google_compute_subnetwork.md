# google_compute_subnetwork

## AC_GCP_0033: vpcFlowLogEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `google_compute_subnetwork`

### Description
Ensure that VPC Flow Logs is enabled for every subnet in a VPC Network.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_subnetwork" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_compute_subnetwork" "example" {
  logging_enabled = true
}

```

---
