# google_dns_managed_zone

## AC_GCP_0013: rsaSha1NotUsedDNSSEC

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_dns_managed_zone`

### Description
Ensure that RSASHA1 is not used for the zone-signing and key-signing keys in Cloud DNS DNSSEC.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_dns_managed_zone" "example" {
  # Configure per: rsaSha1NotUsedDNSSEC
}

```

### Good Example
```hcl
resource "google_dns_managed_zone" "example" {
  # Remediated per: rsaSha1NotUsedDNSSEC
}

```

---

## AC_GCP_0014: dnsStateIsNotOn

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_dns_managed_zone`

### Description
Ensure that DNSSEC is enabled for Cloud DNS.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_dns_managed_zone" "example" {
  # Configure per: dnsStateIsNotOn
}

```

### Good Example
```hcl
resource "google_dns_managed_zone" "example" {
  # Remediated per: dnsStateIsNotOn
}

```

---
