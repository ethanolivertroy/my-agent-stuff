# docker_RUN

## AC_DOCKER_0052: runUsingUpgrade

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure that Commands 'apt-get upgrade' and 'apt-get dist-upgrade' are not being used

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y curl
```

### Good Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
```

---

## AC_DOCKER_0029: yumupdate

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure Yum update is being used

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: yumupdate
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: yumupdate
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0007: runWithSudo

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure to avoid RUN with sudo command

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN sudo apt-get update
```

### Good Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update
```

---

## AC_DOCKER_0053: multipleCMDInstructions

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure that there is only be one CMD instruction in a Dockerfile. If you list more than one CMD then only the last CMD will take effect

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: multipleCMDInstructions
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: multipleCMDInstructions
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0049: updateInstructionsAlone

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure instruction 'RUN <package-manager> update' should always be followed by '<package-manager> install' in the same RUN statement

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: updateInstructionsAlone
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: updateInstructionsAlone
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0039: useofapkupgrade

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure apk upgrade is not being used.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: useofapkupgrade
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: useofapkupgrade
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0033: yumInstallWithoutVersion

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure package version is specified to avoid failures

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```dockerfile
# Dockerfile - violates: yumInstallWithoutVersion
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: yumInstallWithoutVersion
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0031: pipInstallKeepingCachedPackages

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure when installing packages with pip, the '--no-cache-dir' flag should be set to make Docker images smaller

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```dockerfile
# Dockerfile - violates: pipInstallKeepingCachedPackages
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: pipInstallKeepingCachedPackages
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0018: runusingcd

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure WORKDIR command is getting used instead of proliferating instructions like RUN

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*
```

### Good Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
```

---

## AC_DOCKER_0010: pipUnpinnedVersion

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure Pinned Pip Package Version

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```dockerfile
# Dockerfile - violates: pipUnpinnedVersion
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: pipUnpinnedVersion
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0009: yumCleanAllMissing

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure Yum Clean All is used after Yum Install

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: yumCleanAllMissing
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: yumCleanAllMissing
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0005: lastUserRoot

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure root with RUN command is not used for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
RUN apt-get update
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:latest
RUN apt-get update
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0004: yumInstallAllowInput

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure yum install allow manual input with RUN command for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: yumInstallAllowInput
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: yumInstallAllowInput
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0003: runUsingDnfUpdate

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure dnf Update is not used for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*
```

### Good Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
```

---

## AC_DOCKER_00025: dnfCleanAllMissing

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure Cached package data should be cleaned after installation to reduce image size

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: dnfCleanAllMissing
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: dnfCleanAllMissing
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0002: runUsingApt

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure apt is not used with RUN command for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y curl
```

### Good Example
```dockerfile
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
```

---

## AC_DOCKER_0014: aptnotavoiding

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `docker_RUN`

### Description
Ensure any apt-get installs don't use '--no-install-recommends' flag

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: aptnotavoiding
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: aptnotavoiding
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---
