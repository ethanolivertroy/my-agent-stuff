# aws_sqs_queue

## AC_AWS_0366: sqsSseDisabled

- **Severity**: 🔴 HIGH
- **Category**: Security Best Practices
- **Resource**: `aws_sqs_queue`

### Description
Ensure that your Amazon Simple Queue Service (SQS) queues are protecting the contents of their messages using Server-Side Encryption (SSE). The SQS service uses an AWS KMS Customer Master Key (CMK) to generate data keys required for the encryption/decryption process of SQS messages. There is no additional charge for using SQS Server-Side Encryption, however, there is a charge for using AWS KMS

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_sqs_queue" "example" {
  # kms_master_key_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_sqs_queue" "example" {
  kms_master_key_id = true
}

```

---

## AC_AWS_0365: sqsQueueExposed

- **Severity**: 🔴 HIGH
- **Category**: Security Best Practices
- **Resource**: `aws_sqs_queue`

### Description
Identify any publicly accessible SQS queues available in your AWS account and update their permissions in order to protect against unauthorized users.

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_sqs_queue" "example" {
  policy = false
}

```

### Good Example
```hcl
resource "aws_sqs_queue" "example" {
  policy = true
}

```

---
