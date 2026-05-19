# aws_config_configuration_aggregator

## AC_AWS_0049: configEnabledForAllRegions

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `aws_config_configuration_aggregator`

### Description
Ensure AWS Config is enabled in all regions

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_config_configuration_aggregator" "example" {
  account_aggregation_source {
    all_regions = false
  }
}

```

### Good Example
```hcl
resource "aws_config_configuration_aggregator" "example" {
  account_aggregation_source {
    all_regions = true
  }
}

```

---
