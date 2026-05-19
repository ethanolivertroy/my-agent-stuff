# google_container_cluster

## AC_GCP_0294: privateClusterEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_container_cluster`

### Description
Ensure Kubernetes Cluster is created with Private cluster enabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: privateClusterEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: privateClusterEnabled
}

```

---

## AC_GCP_0293: networkPolicyEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_container_cluster`

### Description
Ensure Network policy is enabled on Kubernetes Engine Clusters.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  network_rules = false
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  network_rules = true
}

```

---

## AC_GCP_0030: stackDriverLoggingEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `google_container_cluster`

### Description
Ensure Stackdriver Logging is enabled on Kubernetes Engine Clusters.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  logging_enabled = false
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  logging_enabled = true
}

```

---

## AC_GCP_0029: stackDriverMonitoringEnabled

- **Severity**: 🔴 HIGH
- **Category**: Logging and Monitoring
- **Resource**: `google_container_cluster`

### Description
Ensure Stackdriver Monitoring is enabled on Kubernetes Engine Clusters.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  monitoring_enabled = false
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  monitoring_enabled = true
}

```

---

## AC_GCP_0028: legacyAuthEnabled

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_container_cluster`

### Description
Ensure Legacy Authorization is set to disabled on Kubernetes Engine Clusters.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  enable_legacy_abac = true
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  enable_legacy_abac = false
}

```

---

## AC_GCP_0027: masterAuthEnabled

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_container_cluster`

### Description
Ensure Master Authentication is set to enabled on Kubernetes Engine Clusters.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: masterAuthEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: masterAuthEnabled
}

```

---

## AC_GCP_0025: ipAliasingEnabled

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `google_container_cluster`

### Description
Ensure Kubernetes Cluster is created with Alias IP ranges enabled

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: ipAliasingEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: ipAliasingEnabled
}

```

---

## AC_GCP_0023: gkeControlPlaneNotPublic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_container_cluster`

### Description
Ensure GKE Control Plane is not public.

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # master_authorized_networks_config = ... (not set)
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  master_authorized_networks_config = true
}

```

---

## AC_GCP_0022: podSecurityPolicyEnabled

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `google_container_cluster`

### Description
Ensure PodSecurityPolicy controller is enabled on the Kubernetes Engine Clusters.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: podSecurityPolicyEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: podSecurityPolicyEnabled
}

```

---

## AC_GCP_0021: gkeBasicAuthDisabled

- **Severity**: 🔴 HIGH
- **Category**: Identity and Access Management
- **Resource**: `google_container_cluster`

### Description
Ensure GKE basic auth is disabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: gkeBasicAuthDisabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: gkeBasicAuthDisabled
}

```

---

## AC_GCP_0019: clusterLabelsEnabled

- **Severity**: 🔴 HIGH
- **Category**: Compliance Validation
- **Resource**: `google_container_cluster`

### Description
Ensure Kubernetes Clusters are configured with Labels.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: clusterLabelsEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: clusterLabelsEnabled
}

```

---

## AC_GCP_0292: gkeControlPlanePublicAccess

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_container_cluster`

### Description
GKE Control Plane is exposed to few public IP addresses using master-authorized-network-config

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  publicly_accessible = false
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  publicly_accessible = true
}

```

---

## AC_GCP_0024: clientCertificateEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Identity and Access Management
- **Resource**: `google_container_cluster`

### Description
Ensure Kubernetes Cluster is created with Client Certificate disabled.

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_container_cluster" "example" {
  # Configure per: clientCertificateEnabled
}

```

### Good Example
```hcl
resource "google_container_cluster" "example" {
  # Remediated per: clientCertificateEnabled
}

```

---
