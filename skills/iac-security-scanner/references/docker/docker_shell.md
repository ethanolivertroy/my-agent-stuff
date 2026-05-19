# docker_shell

## AC_DOCKER_0020: shellusingshell

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `docker_shell`

### Description
Ensure the command SHELL to override the default shell instead of the RUN command.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:22.04
SHELL ["/bin/sh", "-c"]
RUN echo hello
```

### Good Example
```dockerfile
FROM ubuntu:22.04
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN echo hello
```

---
