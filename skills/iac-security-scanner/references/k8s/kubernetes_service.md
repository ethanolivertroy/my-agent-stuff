# kubernetes_service

## AC_K8S_0112: ensurePrivateIP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_service`

### Description
Vulnerable to CVE-2020-8554, restrict the use of externalIPs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: true

```

---

## AC_K8S_0110: tillerServiceDeleted

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_service`

### Description
Ensure that the Tiller Service (Helm v2) is deleted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: true

```

---

## AC_K8S_0114: ensureServiceWithSelector

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_service`

### Description
Ensure the use of selector is enforced for Kubernetes Ingress or LoadBalancer service

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: false

```

### Good Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  unknown: true

```

---

## AC_K8S_0111: nodePort

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_service`

### Description
Nodeport service can expose the worker nodes as they have public interface

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  spec:
    type: NodePort

```

### Good Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example
spec:
  spec:
    type: ClusterIP

```

---
