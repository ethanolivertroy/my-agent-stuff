# aws_launch_configuration

## AC_AWS_0489: securityGroupWideOpentoInternetLaunchConfig

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_launch_configuration`

### Description
Security group attached to launch configuration is wide open to internet

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  cidr_blocks = "0.0.0.0/0"
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  cidr_blocks = "10.0.0.0/16"
}

```

---

## AC_AWS_0488: overlyPermissiveLaunchConfig

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_launch_configuration`

### Description
Ensure that launch configuration launched follows the least privilege principle

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  Action = "*"
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  Action = "specific:Action"
}

```

---

## AC_AWS_0487: imdsv1LaunchConfig

- **Severity**: 🔴 HIGH
- **Category**: Configuration and Vulnerability Analysis
- **Resource**: `aws_launch_configuration`

### Description
Launch configuration uses IMDSv1 which vulnerable to SSRF

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  # metadata_options = ... (not set)
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  metadata_options = true
}

```

---

## AC_AWS_0170: hardCodedShellScript

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_launch_configuration`

### Description
Avoid using base64 encoded shell script as part of config

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  # Configure per: hardCodedShellScript
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  # Remediated per: hardCodedShellScript
}

```

---

## AC_AWS_0168: hardCodedKey

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_launch_configuration`

### Description
Avoid using base64 encoded private keys as part of config

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  # Configure per: hardCodedKey
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  # Remediated per: hardCodedKey
}

```

---

## AC_AWS_0167: launchConfigurationEBSBlockUnEncrypted

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_launch_configuration`

### Description
Ensure that AWS ECS clusters are encrypted. Data encryption at rest, prevents unauthorized users from accessing sensitive data on your AWS ECS clusters and associated cache storage systems.

### What to Check
- Verify attribute is set to `false`.
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  ebs_block_device {
    encrypted = false
  }
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  ebs_block_device {
    encrypted = true
  }
}

```

---

## AC_AWS_0490: cloudWatchMonitoringLaunchConfig

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_launch_configuration`

### Description
It is important to enable cloudWatch monitoring incase monitoring the activity

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_launch_configuration" "example" {
  enable_monitoring = false
}

```

### Good Example
```hcl
resource "aws_launch_configuration" "example" {
  enable_monitoring = true
}

```

---
