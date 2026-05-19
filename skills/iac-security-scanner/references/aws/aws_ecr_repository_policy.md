# aws_ecr_repository_policy

## AC_AWS_0084: ecrRepoIsPublic

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_ecr_repository_policy`

### Description
Identify any exposed Amazon ECR image repositories available within your AWS account and update their permissions in order to protect against unauthorized access. Amazon Elastic Container Registry (ECR) is a managed Docker registry service that makes it easy for DevOps teams to store, manage and deploy Docker container images. An ECR repository is a collection of Docker images available on AWS cloud.

### What to Check
- Verify attribute is set to `true`.
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_ecr_repository_policy" "example" {
  policy = false
}

```

### Good Example
```hcl
resource "aws_ecr_repository_policy" "example" {
  policy = true
}

```

---
