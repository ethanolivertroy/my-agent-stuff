# aws_elasticsearch_domain_policy

## AC_AWS_0469: esDomainInsecurePolicy

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_elasticsearch_domain_policy`

### Description
Ensure Elasticsearch domains do not have wildcard policies.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_elasticsearch_domain_policy" "example" {
  Action = "*"
}

```

### Good Example
```hcl
resource "aws_elasticsearch_domain_policy" "example" {
  Action = "specific:Action"
}

```

---
