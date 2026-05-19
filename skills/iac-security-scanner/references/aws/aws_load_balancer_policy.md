# aws_load_balancer_policy

## AC_AWS_0172: elbSsLTsLProtocol

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_load_balancer_policy`

### Description
Using insecure ciphers for your ELB Predefined or Custom Security Policy, could make the SSL connection between the client and the load balancer vulnerable to exploits. TLS 1.0 was recommended to be disabled by PCI Council after June 30, 2016

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_load_balancer_policy" "example" {
  policy_attribute {
    name = false
  }
}

```

### Good Example
```hcl
resource "aws_load_balancer_policy" "example" {
  policy_attribute {
    name = true
  }
}

```

---

## AC_AWS_0171: elbWeakCipher

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_load_balancer_policy`

### Description
Remove insecure ciphers for your ELB Predefined or Custom Security Policy, to reduce the risk of the SSL connection between the client and the load balancer being exploited.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_load_balancer_policy" "example" {
  # name = ... (not set)
}

```

### Good Example
```hcl
resource "aws_load_balancer_policy" "example" {
  policy_attribute {
    name = "AES256-SHA256"
  }
}

```

---
