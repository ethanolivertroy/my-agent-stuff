# google_compute_disk

## AC_GCP_0229: vmEncryptedwithCsek

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `google_compute_disk`

### Description
Ensure VM disks for critical VMs are encrypted with Customer Supplied Encryption Keys (CSEK) .

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "google_compute_disk" "example" {
  # disk_encryption_key = ... (not set)
}

```

### Good Example
```hcl
resource "google_compute_disk" "example" {
  disk_encryption_key = true
}

```

---
