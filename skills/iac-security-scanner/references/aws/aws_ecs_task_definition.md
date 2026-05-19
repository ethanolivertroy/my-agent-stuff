# aws_ecs_task_definition

## AC_AWS_0095: containerDefinitionContainsPASSWORD

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_ecs_task_definition`

### Description
Sensitive Information Disclosure

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ecs_task_definition" "example" {
  # Configure per: containerDefinitionContainsPASSWORD
}

```

### Good Example
```hcl
resource "aws_ecs_task_definition" "example" {
  # Remediated per: containerDefinitionContainsPASSWORD
}

```

---

## AC_AWS_0088: instanceNotInVpc

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_ecs_task_definition`

### Description
Like any other EC2 instance it is recommended to place ECS instance within a VPC. AWS VPCs provides the controls to facilitate a formal process for approving and testing all network connections and changes to the firewall and router configurations

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_ecs_task_definition" "example" {
  network_mode = false
}

```

### Good Example
```hcl
resource "aws_ecs_task_definition" "example" {
  network_mode = true
}

```

---

## AC_AWS_0463: noTransitEncryptionECS

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_ecs_task_definition`

### Description
Ensure EFS volume used for ECS task definition has in transit encryption enabled

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_ecs_task_definition" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_ecs_task_definition" "example" {
  encryption = true
}

```

---
