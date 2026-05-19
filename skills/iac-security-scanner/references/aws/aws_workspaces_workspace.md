# aws_workspaces_workspace

## AC_AWS_0504: workspaceUserEncryptionCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_workspaces_workspace`

### Description
Ensure user volume for Workspaces is Encrypted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_workspaces_workspace" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_workspaces_workspace" "example" {
  encryption = true
}

```

---

## AC_AWS_0503: workspaceRootEncryptionCheck

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_workspaces_workspace`

### Description
Ensure root volume for Workspaces is Encrypted

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_workspaces_workspace" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_workspaces_workspace" "example" {
  encryption = true
}

```

---
