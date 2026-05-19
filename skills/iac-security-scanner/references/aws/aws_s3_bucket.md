# aws_s3_bucket

## AC_AWS_0496: s3PublicAclNoAccessBlock

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
Ensure S3 buckets do not have, a both public ACL on the bucket and a public access block.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0215: s3EnforceUserACL

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
S3 bucket Access is allowed to all AWS Account Users.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0214: s3Versioning

- **Severity**: 🔴 HIGH
- **Category**: Resilience
- **Resource**: `aws_s3_bucket`

### Description
Enabling S3 versioning will enable easy recovery from both unintended user actions, like deletes and overwrites

### What to Check
- Verify attribute is set to `false`.
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0213: allUsersReadWriteAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0212: allUsersWriteAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0211: authUsersReadAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0210: allUsersReadAccess

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0207: s3BucketSseRulesWithKmsNull

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_s3_bucket`

### Description
Ensure that S3 Buckets have server side encryption at rest enabled with KMS key to protect sensitive data.

### What to Check
- Verify encryption is enabled.
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0497: s3BucketAccessLoggingDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_s3_bucket`

### Description
Ensure S3 buckets have access logging enabled.

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---

## AC_AWS_0208: s3BucketNoWebsiteIndexDoc

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_s3_bucket`

### Description
Ensure that there are not any static websites being hosted on buckets you aren't aware of

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
  acl    = "public-read"
}

```

### Good Example
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-sensitive-data"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

```

---
