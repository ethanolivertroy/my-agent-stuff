# github_repository

## AC_GITHUB_0002: privateRepoEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `github_repository`

### Description
Repository is Not Private or Internal.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "github_repository" "example" {
  private = true
}

```

### Good Example
```hcl
resource "github_repository" "example" {
  private = false
}

```

---
