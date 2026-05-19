# kubernetes_ingress

## AC_K8S_0002: noHttps

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_ingress`

### Description
TLS disabled can affect the confidentiality of the data in transit

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example
spec:
  min_tls_version: false

```

### Good Example
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example
spec:
  min_tls_version: true

```

---
