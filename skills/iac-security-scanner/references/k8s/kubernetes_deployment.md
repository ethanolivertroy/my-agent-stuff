# kubernetes_deployment

## AC_K8S_0050: allowedCustomSnippetAnnotations

- **Severity**: 🔴 HIGH
- **Category**: Configuration and Vulnerability Analysis
- **Resource**: `kubernetes_deployment`

### Description
CVE-2021-25742: Ingress-nginx with custom snippets allows retrieval of ingress-nginx serviceaccount token and secrets across all namespaces.

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: insecure
spec:
  template:
    spec:
      containers:
        - name: app
          image: nginx:latest
          securityContext:
            privileged: true

```

### Good Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure
spec:
  template:
    spec:
      containers:
        - name: app
          image: nginx:latest
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            privileged: false

```

---

## AC_K8S_0050: allowedCustomSnippetAnnotationsWithWrongVersion

- **Severity**: 🔴 HIGH
- **Category**: Configuration and Vulnerability Analysis
- **Resource**: `kubernetes_deployment`

### Description
CVE-2021-25742: Ingress-nginx with custom snippets with a version that does not support mitigation and allows retrieval of ingress-nginx serviceaccount token and secrets across all namespaces.

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: insecure
spec:
  template:
    spec:
      containers:
        - name: app
          image: nginx:latest
          securityContext:
            privileged: true

```

### Good Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure
spec:
  template:
    spec:
      containers:
        - name: app
          image: nginx:latest
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            privileged: false

```

---
