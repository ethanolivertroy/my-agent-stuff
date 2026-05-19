# aws_eks_cluster

## AC_AWS_0465: eksControlPlaneLoggingDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_eks_cluster`

### Description
Ensure EKS clusters have control plane logging enabled.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_eks_cluster" "example" {
  # enabled_cluster_log_types = ... (not set)
}

```

### Good Example
```hcl
resource "aws_eks_cluster" "example" {
  enabled_cluster_log_types = true
}

```

---
