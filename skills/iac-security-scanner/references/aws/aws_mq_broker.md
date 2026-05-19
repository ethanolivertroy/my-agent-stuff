# aws_mq_broker

## AC_AWS_0175: awsMqPubliclyAccessible

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_mq_broker`

### Description
Publicly Accessible MQ Brokers

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_mq_broker" "example" {
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_mq_broker" "example" {
  publicly_accessible = false
}

```

---

## AC_AWS_0174: awsMqLoggingEnabled

- **Severity**: 🟢 LOW
- **Category**: Logging and Monitoring
- **Resource**: `aws_mq_broker`

### Description
Enable AWS MQ Log Exports

### What to Check
- Verify attribute is set to `false`.
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_mq_broker" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "aws_mq_broker" "example" {
  logging_enabled = true
}

```

---
