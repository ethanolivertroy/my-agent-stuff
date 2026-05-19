# docker_workdir

## AC_DOCKER_0013: workdir

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `docker_workdir`

### Description
Ensure the use absolute paths for your WORKDIR.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
RUN cd /opt && ./app
```

### Good Example
```dockerfile
FROM ubuntu:22.04
WORKDIR /opt
RUN ./app
```

---
