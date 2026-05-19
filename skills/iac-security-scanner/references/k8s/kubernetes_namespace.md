# kubernetes_namespace

## AC_K8S_0013: noOwnerLabel

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `kubernetes_namespace`

### Description
No owner for namespace affects the operations

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: example
spec:
  unknown: true

```

---
