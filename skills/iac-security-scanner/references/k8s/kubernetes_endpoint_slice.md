# kubernetes_endpoint_slice

## AC_K8S_0132: loopbackAddressUsed

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_endpoint_slice`

### Description
Ensure endpoint slice is not created or updated with loopback addresses as this acts as an attack vector for exploiting CVE-2021-25737 by an authorized user

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: example
spec:
  unknown: true

```

---
