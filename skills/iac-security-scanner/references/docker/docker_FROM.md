# docker_FROM

## AC_DOCKER_0041: imageVersionnotusinglatest

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_FROM`

### Description
Ensure :latest version is not used for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:22.04
CMD ["app"]
```

---

## AC_DOCKER_0001: docFilePlatformFlag

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_FROM`

### Description
Ensure platform flag with FROM command is not used for Docker file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: docFilePlatformFlag
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: docFilePlatformFlag
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---

## AC_DOCKER_0047: healthcheck

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `docker_FROM`

### Description
Ensure that HEALTHCHECK is being used.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:22.04
HEALTHCHECK CMD curl -f http://localhost/ || exit 1
CMD ["app"]
```

---
