# aws_db_security_group

## AC_AWS_0067: rdsScopeIsPublic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_db_security_group`

### Description
RDS should not be open to a public scope. Firewall and router configurations should be used to restrict connections between untrusted networks and any system components in the cloud environment.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_db_security_group" "example" {
  ingress {
    cidr = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_db_security_group" "example" {
  ingress {
    cidr = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0066: rdsIsPublic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_db_security_group`

### Description
RDS should not be defined with public interface. Firewall and router configurations should be used to restrict connections between untrusted networks and any system components in the cloud environment.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_db_security_group" "example" {
  ingress {
    cidr = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_db_security_group" "example" {
  ingress {
    cidr = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0065: rdsHostsHigherThan256

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_db_security_group`

### Description
RDS should not be open to a large scope. Firewall and router configurations should be used to restrict connections between untrusted networks and any system components in the cloud environment.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_db_security_group" "example" {
  # cidr = ... (not set)
}

```

### Good Example
```hcl
resource "aws_db_security_group" "example" {
  ingress {
    cidr = "0/0"
  }
}

```

---
