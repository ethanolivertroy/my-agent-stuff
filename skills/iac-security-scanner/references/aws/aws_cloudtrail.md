# aws_cloudtrail

## AC_AWS_0033: cloudTrailLogNotEncrypted

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Ensure CloudTrail logs are encrypted using KMS

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0450: configEnabledForAllRegions

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Ensure AWS Config is enabled in all regions

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0449: ec2ebsnotoptimized

- **Severity**: 🟡 MEDIUM
- **Category**: Security Best Practices
- **Resource**: `aws_cloudtrail`

### Description
Ensure that EC2 is EBS optimized

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0448: cloudTrailMultiRegionEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Cloud Trail Multi Region not enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0446: cloudTrailLogValidationDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Ensure CloudTrail has log file validation enabled.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0035: reme_enableSNSTopic

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Ensure appropriate subscribers to each SNS topic

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0034: cloudTrailMultiRegionNotCreated

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudtrail`

### Description
Cloud Trail Multi Region not enabled

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---

## AC_AWS_0447: ecrmaketagsimmutable

- **Severity**: 🟢 LOW
- **Category**: Security Best Practices
- **Resource**: `aws_cloudtrail`

### Description
ECR should have an image tag be immutable

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudtrail" "bad" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = false
  enable_log_file_validation    = false
}

```

### Good Example
```hcl
resource "aws_cloudtrail" "good" {
  name                          = "trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

```

---
