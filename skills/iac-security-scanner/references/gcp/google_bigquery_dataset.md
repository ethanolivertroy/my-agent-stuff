# google_bigquery_dataset

## AC_GCP_0230: bqDatasetPubliclyAccessible

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_bigquery_dataset`

### Description
BigQuery datasets may be anonymously or publicly accessible.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_bigquery_dataset" "example" {
  publicly_accessible = false
}

```

### Good Example
```hcl
resource "google_bigquery_dataset" "example" {
  publicly_accessible = true
}

```

---
