# google_compute_ssl_policy

## AC_GCP_0034: weakCipherSuitesEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_ssl_policy`

### Description
Ensure no HTTPS or SSL proxy load balancers permit SSL policies with weak cipher suites.

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "google_compute_ssl_policy" "example" {
  # min_tls_version = ... (not set)
}

```

### Good Example
```hcl
resource "google_compute_ssl_policy" "example" {
  min_tls_version = true
}

```

---
