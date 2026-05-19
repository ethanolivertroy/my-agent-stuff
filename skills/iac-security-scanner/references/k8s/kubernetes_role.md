# kubernetes_role

## AC_K8S_0113: defaultServiceAccountUsed

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_role`

### Description
Ensure that default service accounts are not actively used in Kubernetes Role

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: example
spec:
  unknown: true

```

---
