# aws_s3_bucket_policy

## AC_AWS_0224: allowWriteACPActionFromAllPrncpls

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---

## AC_AWS_0221: allowPutActionFromAllPrncpls

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---

## AC_AWS_0220: allowListActionFromAllPrncpls

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---

## AC_AWS_0219: allowGetActionFromAllPrncpls

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---

## AC_AWS_0218: allowDeleteActionFromAllPrncpls

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---

## AC_AWS_0217: allowActionsFromAllPrincipals

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `aws_s3_bucket_policy`

### Description
Misconfigured S3 buckets can leak private information to the entire internet or allow unauthorized data tampering / deletion

### What to Check
- Verify attribute is set to `true`.

### Bad Example
```hcl
resource "aws_s3_bucket_policy" "bad" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

### Good Example
```hcl
resource "aws_s3_bucket_policy" "good" {
  bucket = aws_s3_bucket.data.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {"AWS" = "arn:aws:iam::123456789012:role/app"}
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

```

---
