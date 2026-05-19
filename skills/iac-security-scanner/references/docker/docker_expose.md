# docker_expose

## AC_DOCKER_0011: UNIXPortsOutOfRange

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `docker_expose`

### Description
Ensure range of ports is from 0 to 65535

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
EXPOSE
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:latest
EXPOSE
CMD ["app"]
```

---

## AC_DOCKER_0026: exposeport

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `docker_expose`

### Description
Ensure only the ports that your application needs are used and avoid exposing ports like SSH (22)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```dockerfile
FROM ubuntu:latest
EXPOSE 22
CMD ["app"]
```

### Good Example
```dockerfile
FROM ubuntu:latest
EXPOSE 8080
CMD ["app"]
```

---
