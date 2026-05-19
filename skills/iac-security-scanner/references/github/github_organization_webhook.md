# github_organization_webhook

## AC_GITHUB_0001: insecureSslUsed

- **Severity**: 🟡 MEDIUM
- **Category**: Encryption and Key Management
- **Resource**: `github_organization_webhook`

### Description
Insecure SSL is used for organization webhook.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "github_organization_webhook" "example" {
  ssl_enforcement_enabled = false
}

```

### Good Example
```hcl
resource "github_organization_webhook" "example" {
  ssl_enforcement_enabled = true
}

```

---
