# google_kms_crypto_key

## AC_GCP_0012: checkRotation365Days

- **Severity**: 🔴 HIGH
- **Category**: Security Best Practices
- **Resource**: `google_kms_crypto_key`

### Description
Ensure Encryption keys are rotated within a period of 365 days.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_kms_crypto_key" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "google_kms_crypto_key" "example" {
  encryption = true
}

```

---

## AC_GCP_0011: checkRotation90Days

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `google_kms_crypto_key`

### Description
Ensure Encryption keys are rotated within a period of 90 days.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_kms_crypto_key" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "google_kms_crypto_key" "example" {
  encryption = true
}

```

---
