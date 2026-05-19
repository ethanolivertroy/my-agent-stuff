# aws_cloudfront_distribution

## AC_AWS_0024: cloudfrontNoHTTPSTraffic

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_cloudfront_distribution`

### Description
Use encrypted connection between CloudFront and origin server

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  # viewer_protocol_policy = ... (not set)
}

```

### Good Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  ordered_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
  }
}

```

---

## AC_AWS_0023: cloudfrontNoSecureCiphers

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_cloudfront_distribution`

### Description
Secure ciphers are not used in CloudFront distribution

### What to Check
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  viewer_certificate {
    minimum_protocol_version = false
  }
}

```

### Good Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  viewer_certificate {
    minimum_protocol_version = true
  }
}

```

---

## AC_AWS_0032: noWafEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_cloudfront_distribution`

### Description
Ensure that cloud-front has web application firewall enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  # web_acl_id = ... (not set)
}

```

### Good Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  web_acl_id = "<arn-of-waf-acl>"
}

```

---

## AC_AWS_0025: cloudfrontNoLogging

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_cloudfront_distribution`

### Description
Ensure that your AWS Cloudfront distributions have the Logging feature enabled in order to track all viewer requests for the content delivered through the Content Delivery Network (CDN).

### What to Check
- Verify logging is enabled.

### Bad Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  # Missing required companion resource
}

```

### Good Example
```hcl
{
  "logging_config": {
    "include_cookies": false,
    "bucket": "<bucket>",
    "prefix": "<prefix>"
  }
}

```

---

## AC_AWS_0026: cloudfrontNoGeoRestriction

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_cloudfront_distribution`

### Description
Ensure that geo restriction is enabled for your Amazon CloudFront CDN distribution to whitelist or blacklist a country in order to allow or restrict users in specific locations from accessing web application content.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  restrictions {
    geo_restriction {
      restriction_type = false
    }
  }
}

```

### Good Example
```hcl
resource "aws_cloudfront_distribution" "example" {
  restrictions {
    geo_restriction {
      restriction_type = true
    }
  }
}

```

---
