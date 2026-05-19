# aws_instance

## AC_AWS_0480: detailedMonitoringEnabledInstance

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `aws_instance`

### Description
Ensure that detailed monitoring is enabled for EC2 instances.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_instance" "example" {
  # monitoring = ... (not set)
}

```

### Good Example
```hcl
resource "aws_instance" "example" {
  monitoring = true
}

```

---

## AC_AWS_0478: instanceExposedToInternet

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_instance`

### Description
Security group attached to launch configuration is wide open to internet and this can be related to reconnaissance phase

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_instance" "example" {
  cidr_blocks = "0.0.0.0/0"
}

```

### Good Example
```hcl
resource "aws_instance" "example" {
  cidr_blocks = "10.0.0.0/16"
}

```

---

## AC_AWS_0477: overlyPermissiveInstance

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_instance`

### Description
Ensure that instance launched follows the least privilege principle as this can be related to delivery-exploitation-Installation phases of kill  chain

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_instance" "example" {
  Action = "*"
}

```

### Good Example
```hcl
resource "aws_instance" "example" {
  Action = "specific:Action"
}

```

---

## AC_AWS_0479: ec2UsingIMDSv1

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_instance`

### Description
EC2 instances should disable IMDS or require IMDSv2 as this can be related to the weaponization phase of kill chain

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_instance" "example" {
  # metadata_options = ... (not set)
}

```

### Good Example
```hcl
resource "aws_instance" "example" {
  metadata_options = true
}

```

---

## AC_AWS_0153: instanceWithNoVpc

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_instance`

### Description
Ensure that your AWS application is not deployed within the default Virtual Private Cloud in order to follow security best practices

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_instance" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "aws_vpc": {
    "accurics_vpc": {
      "cidr_block": "<cidr_block>",
      "enable_dns_support": "<enable_dns_support>",
      "enable_dns_hostnames": "<enable_dns_hostnames>"
    }
  }
}

```

---
