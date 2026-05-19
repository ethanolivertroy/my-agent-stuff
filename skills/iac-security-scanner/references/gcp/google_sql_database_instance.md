# google_sql_database_instance

## AC_GCP_0295: checkNoPublicAccess

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_sql_database_instance`

### Description
Ensure that Cloud SQL database Instances are not open to the world.

### What to Check
- Verify attribute is set to `false`.
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_sql_database_instance" "example" {
  # Configure per: checkNoPublicAccess
}

```

### Good Example
```hcl
resource "google_sql_database_instance" "example" {
  # Remediated per: checkNoPublicAccess
}

```

---

## AC_GCP_0003: checkRequireSSLEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_sql_database_instance`

### Description
Ensure that Cloud SQL database instance requires all incoming connections to use SSL

### What to Check
- Verify attribute is set to `false`.
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_sql_database_instance" "example" {
  ssl_enforcement_enabled = false
}

```

### Good Example
```hcl
resource "google_sql_database_instance" "example" {
  ssl_enforcement_enabled = true
}

```

---

## AC_GCP_0001: backupConfigEnabled

- **Severity**: 🔴 HIGH
- **Category**: Resilience
- **Resource**: `google_sql_database_instance`

### Description
Ensure all Cloud SQL database instance have backup configuration enabled.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "google_sql_database_instance" "example" {
  backup_retention_period = false
}

```

### Good Example
```hcl
resource "google_sql_database_instance" "example" {
  backup_retention_period = true
}

```

---
