# google_project

## AC_GCP_0010: autoCreateNetDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_project`

### Description
Ensure that the default network does not exist in a project.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "google_project" "example" {
  auto_create_network = false
}

```

### Good Example
```hcl
resource "google_project" "example" {
  auto_create_network = true
}

```

---
