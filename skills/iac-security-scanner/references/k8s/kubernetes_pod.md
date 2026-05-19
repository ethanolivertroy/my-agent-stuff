# kubernetes_pod

## AC_K8S_0087: runAsNonRootCheck

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Minimize Admission of Root Containers

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0086: otherNamespace

- **Severity**: 🔴 HIGH
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
Default Namespace Should Not be Used

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0085: privilegeEscalationCheck

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `kubernetes_pod`

### Description
Containers Should Not Run with AllowPrivilegeEscalation

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0076: allowedHostPath

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Allowing hostPaths to mount to Pod arise the probability of getting access to the node's filesystem

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0051: secretsAsEnvVariables

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Prefer using secrets as files over secrets as environment variables

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0046: privilegedContainersEnabled

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Minimize the admission of privileged containers

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0130: disAllowedVolumes

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `kubernetes_pod`

### Description
Vulnerable to CVE-2020-8555 (affected version of kube-controller-manager: v1.18.0, v1.17.0 - v1.17.4, v1.16.0 - v1.16.8, and v1.15.11

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0100: MemorylimitsCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
Memory Limits Not Set in config file.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0099: MemoryRequestsCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
Memory Request Not Set in config file.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0098: CpulimitsCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
CPU Limits Not Set in config file.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0097: CpuRequestsCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
CPU Request Not Set in config file.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0088: dontConnectDockerSock

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Restrict Mounting Docker Socket in a Container

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0084: falseHostNetwork

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Containers Should Not Share the Host Network Namespace

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0083: falseHostIPC

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Containers Should Not Share Host IPC Namespace

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0082: falseHostPID

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Containers Should Not Share Host Process ID Namespace

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0081: allowedVolumes

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Some volume types mount the host file system paths to the pod or container, thus increasing the chance of escaping the container to access the host

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0080: secCompProfile

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Default seccomp profile not enabled will make the container to make non-essential system calls

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0079: containersAsHighUID

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Containers Should Run as a High UID to Avoid Host Conflict

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0078: readOnlyFileSystem

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Container images with readOnlyRootFileSystem set as false mounts the container root file system with write permissions

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0077: allowedProcMount

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Unmasking the procMount will allow more information than is necessary to the program running in the containers spawned by k8s

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0075: capSysAdminUsed

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Do Not Use CAP_SYS_ADMIN Linux Capability

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0074: disallowedSysCalls

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Allowing the pod to make system level calls provide access to host/node sensitive information

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0073: appArmorProfile

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
AppArmor profile not set to default or custom profile will make the container vulnerable to kernel level threats

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0071: tillerDeployed

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `kubernetes_pod`

### Description
Ensure That Tiller (Helm V2) Is Not Deployed

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0069: imageWithoutDigest

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Image without digest affects the integrity principle of image security

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0067: kubeDashboardEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `kubernetes_pod`

### Description
Ensure Kubernetes Dashboard Is Not Deployed

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0064: securityContextUsed

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `kubernetes_pod`

### Description
Apply Security Context to Your Pods and Containers

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0048: netRawCapabilityUsed

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Minimize the admission of containers with the NET_RAW capability

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0045: autoMountTokenEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `kubernetes_pod`

### Description
Ensure that Service Account Tokens are only mounted where necessary

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0021: alwaysPullImages

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `kubernetes_pod`

### Description
AlwaysPullImages plugin is not set

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0072: noReadinessProbe

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
No readiness probe will affect automatic recovery in case of unexpected errors

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0070: nolivenessProbe

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
No liveness probe will ensure there is no recovery in case of unexpected errors

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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

## AC_K8S_0068: imageWithLatestTag

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `kubernetes_pod`

### Description
No tag or container image with :Latest tag makes difficult to rollback and track

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: insecure
spec:
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        privileged: true

```

### Good Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure
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
