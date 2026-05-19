# aws_dynamodb_table

## AC_AWS_0458: dynamoderecovery_enabled

- **Severity**: 🟡 MEDIUM
- **Category**: Resilience
- **Resource**: `aws_dynamodb_table`

### Description
Ensure Point In Time Recovery is enabled for DynamoDB Tables

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_dynamodb_table" "example" {
  # point_in_time_recovery = ... (not set)
}

```

### Good Example
```hcl
resource "aws_dynamodb_table" "example" {
  point_in_time_recovery = true
}

```

---

## AC_AWS_0457: dynamoDbEncrypted

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_dynamodb_table`

### Description
Ensure DynamoDb is encrypted at rest

### What to Check
- Verify attribute is set to `false`.
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_dynamodb_table" "example" {
  # server_side_encryption = ... (not set)
}

```

### Good Example
```hcl
resource "aws_dynamodb_table" "example" {
  server_side_encryption = true
}

```

---
