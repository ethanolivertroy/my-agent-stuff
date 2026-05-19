# docker_add

## AC_DOCKER_0035: CurlWgetinsteadofAdd

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `docker_add`

### Description
Ensure use Curl or Wget instead of Add to fetch packages from remote URLs, because using Add is strongly discouraged

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
ADD https://example.com/app.tar.gz /opt/
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:latest
COPY app.tar.gz /opt/
CMD ["app"]
```

---

## AC_DOCKER_0032: addinsteadofcopy

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `docker_add`

### Description
Ensure use of COPY instead of ADD unless, running a tar file

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
ADD https://example.com/app.tar.gz /opt/
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:latest
COPY app.tar.gz /opt/
CMD ["app"]
```

---
