# google_compute_service_attachment

## AC_GCP_0296: serviceAttachmentAcceptAutomatic

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_service_attachment`

### Description
Service Attachment with connection_preference ACCEPT_AUTOMATIC allow any project to connect.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_service_attachment" "example" {
  # Configure per: serviceAttachmentAcceptAutomatic
}

```

### Good Example
```hcl
resource "google_compute_service_attachment" "example" {
  # Remediated per: serviceAttachmentAcceptAutomatic
}

```

---
