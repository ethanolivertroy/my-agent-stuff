# aws_elasticsearch_domain

## AC_AWS_0112: elastiSearchEncryptAtRest

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_elasticsearch_domain`

### Description
Enable AWS ElasticSearch Encryption At Rest

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  # encrypt_at_rest = ... (not set)
}

```

### Good Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  encrypt_at_rest = true
}

```

---

## AC_AWS_0468: noNodeToNodeEncryptionDomain

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_elasticsearch_domain`

### Description
Ensure Elasticsearch domains being created are set to be encrypted node-to-node

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  # node_to_node_encryption = ... (not set)
}

```

### Good Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  node_to_node_encryption = true
}

```

---

## AC_AWS_0111: elastiSearchNoKms

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_elasticsearch_domain`

### Description
ElasticSearch Domain Encrypted with KMS CMKs

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  encryption = false
}

```

### Good Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  encryption = true
}

```

---

## AC_AWS_0105: esloggingdisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Compliance Validation
- **Resource**: `aws_elasticsearch_domain`

### Description
Ensure that your AWS Elasticsearch clusters have enabled the support for publishing slow logs to AWS CloudWatch Logs. This feature enables you to publish slow logs from the indexing and search operations performed on your ES clusters and gain full insight into the performance of these operations.

### What to Check
- Verify attribute is set to `false`.
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_elasticsearch_domain" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "log_publishing_options": {
    "cloudwatch_log_group_arn": "<cloudwatch_log_group_arn>",
    "log_type": "<log_type>",
    "enabled": true
  }
}

```

---
