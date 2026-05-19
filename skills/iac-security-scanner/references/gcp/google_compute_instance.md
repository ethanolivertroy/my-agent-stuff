# google_compute_instance

## AC_GCP_0041: checkVM_NoFullCloudAccess

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_instance`

### Description
Instances may have been configured to use the default service account with full access to all Cloud APIs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # Configure per: checkVM_NoFullCloudAccess
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  # Remediated per: checkVM_NoFullCloudAccess
}

```

---

## AC_GCP_0040: defaultServiceAccountUsed

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_compute_instance`

### Description
Instances may have been configured to use the default service account with full access to all Cloud APIs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # Configure per: defaultServiceAccountUsed
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  # Remediated per: defaultServiceAccountUsed
}

```

---

## AC_GCP_0039: projectWideSshKeysUsed

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_instance`

### Description
Ensure 'Block Project-wide SSH keys' is enabled for VM instances.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # Configure per: projectWideSshKeysUsed
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  # Remediated per: projectWideSshKeysUsed
}

```

---

## AC_GCP_0232: checkIpForward

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_instance`

### Description
Ensure IP forwarding is not enabled on Instances.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  can_ip_forward = true
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  can_ip_forward = false
}

```

---

## AC_GCP_0038: osLoginEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `google_compute_instance`

### Description
Ensure that no instance in the project overrides the project setting for enabling OSLogin

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  logging_enabled = true
}

```

---

## AC_GCP_0037: serialPortEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_instance`

### Description
Ensure 'Enable connecting to serial ports' is not enabled for VM instances.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # Configure per: serialPortEnabled
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  # Remediated per: serialPortEnabled
}

```

---

## AC_GCP_0036: encryptedwithCsek

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `google_compute_instance`

### Description
VM disks attached to a compute instance should be encrypted with Customer Supplied Encryption Keys (CSEK) .

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # disk_encryption_key = ... (not set)
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  disk_encryption_key = true
}

```

---

## AC_GCP_0035: shieldedVmEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_instance`

### Description
Ensure Compute instances are launched with Shielded VM enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_instance" "example" {
  # Configure per: shieldedVmEnabled
}

```

### Good Example
```hcl
resource "google_compute_instance" "example" {
  # Remediated per: shieldedVmEnabled
}

```

---
