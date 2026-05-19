# azurerm_redis_cache

## AC_AZURE_0393: reme_redisCacheNoUpdatePatchSchedule

- **Severity**: 🔴 HIGH
- **Category**: Security Best Practices
- **Resource**: `azurerm_redis_cache`

### Description
Ensure that Redis is updated regularly with security and operational updates.

Note this feature is only available to Premium tier Redis Caches.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "azurerm_redis_cache" "example" {
  # patch_schedule = ... (not set)
}

```

### Good Example
```hcl
resource "azurerm_redis_cache" "example" {
  patch_schedule = "ewogICJwYXRjaF9zY2hlZHVsZSI6IHsKICAgICJkYXlfb2Zfd2VlayI6ICJTdW5kYXkiLAogICAgInN0YXJ0X2hvdXJfdXRjIjogMAogIH0KfQ=="
}

```

---

## AC_AZURE_0392: reme_entirelyAccessible

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_redis_cache`

### Description
Ensure there are no firewall rules allowing unrestricted access to Redis from the Internet

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = false
}

```

### Good Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = true
}

```

---

## AC_AZURE_0391: reme_publiclyAccessible

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_redis_cache`

### Description
Ensure there are no firewall rules allowing unrestricted access to Redis from other Azure sources

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = false
}

```

### Good Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = true
}

```

---

## AC_AZURE_0394: reme_nonSslEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_redis_cache`

### Description
Ensure that the Redis Cache accepts only SSL connections

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_redis_cache" "example" {
  enable_non_ssl_port = true
}

```

### Good Example
```hcl
resource "azurerm_redis_cache" "example" {
  enable_non_ssl_port = false
}

```

---

## AC_AZURE_0390: reme_allowLessHosts

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_redis_cache`

### Description
Ensure there are no firewall rules allowing Redis Cache access for a large number of source IPs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = false
}

```

### Good Example
```hcl
resource "azurerm_redis_cache" "example" {
  firewall_rules = true
}

```

---
