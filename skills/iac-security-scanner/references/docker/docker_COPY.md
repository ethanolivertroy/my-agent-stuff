# docker_COPY

## AC_DOCKER_00024: chownFlagExists

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_COPY`

### Description
Ensure not to use --chown flag when user only needs execution permission

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
# Dockerfile - violates: chownFlagExists
FROM ubuntu:latest
CMD ["app"]
```

### Good Example
```dockerfile
# Dockerfile - satisfies: chownFlagExists
FROM ubuntu:22.04
USER nonroot
CMD ["app"]
```

---
