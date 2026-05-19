# github_repository_webhook

## AC_GITHUB_0003: insecureSslUsed

- **Severity**: 🟡 MEDIUM
- **Category**: Encryption and Key Management
- **Resource**: `github_repository_webhook`

### Description
Insecure SSL is used for repository webhook.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "github_repository_webhook" "example" {
  ssl_enforcement_enabled = false
}

```

### Good Example
```hcl
resource "github_repository_webhook" "example" {
  ssl_enforcement_enabled = true
}

```

---
