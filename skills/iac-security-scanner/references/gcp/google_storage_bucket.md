# google_storage_bucket

## AC_GCP_0241: checkVersioningEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `google_storage_bucket`

### Description
Ensure that object versioning is enabled on log-buckets.

### What to Check
- Verify attribute is set to `false`.
- Verify logging is enabled.
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "google_storage_bucket" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_storage_bucket" "example" {
  logging_enabled = true
}

```

---

## AC_GCP_0233: checkLoggingEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `google_storage_bucket`

### Description
Ensure that logging is enabled for Cloud storage buckets.

### What to Check
- Verify attribute is set to `false`.
- Verify logging is enabled.
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "google_storage_bucket" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_storage_bucket" "example" {
  logging_enabled = true
}

```

---

## AC_GCP_0234: uniformBucketEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `google_storage_bucket`

### Description
Ensure that Cloud Storage buckets have uniform bucket-level access enabled.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "google_storage_bucket" "example" {
  uniform_bucket_level_access = true
}

```

### Good Example
```hcl
resource "google_storage_bucket" "example" {
  uniform_bucket_level_access = false
}

```

---
