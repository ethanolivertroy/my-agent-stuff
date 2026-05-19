# google_compute_firewall

## AC_GCP_0228: networkPort20ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SSH (TCP:20) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0225: networkPort3389ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0222: networkPort9000ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Hadoop Name Node (TCP:9000) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0219: networkPort9090ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CiscoSecure, Websm (TCP:9090) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0216: networkPort389ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (TCP:389) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0213: networkPort389ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (UDP:389) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0210: networkPort1521ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:1521) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0207: networkPort2483ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:2483) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0204: networkPort2483ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (UDP:2483) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0201: networkPort6379ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Redis (TCP:6379) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0198: networkPort7000ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Internode Communication (TCP:7000) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0194: networkPort7199ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Monitoring (TCP:7199) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0191: networkPort8888ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Website (TCP:8888) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0188: networkPort9042ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Client (TCP:9042) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0185: networkPort9160ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Thrift (TCP:9160) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0182: networkPort9200ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9200) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0179: networkPort9300ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9300) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0176: networkPort11211ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (TCP:11211) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0173: networkPort11211ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (UDP:11211) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0170: networkPort27017ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Mongo Instances (TCP:27017) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0167: networkPort61620ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Monitoring (TCP:61620) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0164: networkPort135ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Debugger (TCP:135) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0161: networkPort636ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP SSL (TCP:636) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0158: networkPort1433ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Server (TCP:1433) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0155: networkPort2383ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Services (TCP:2383) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0152: networkPort2484ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (TCP:2484) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0149: networkPort2484ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (UDP:2484) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0146: networkPort3306ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MySQL (TCP:3306) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0143: networkPort5432ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (TCP:5432) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0140: networkPort5432ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (UDP:5432) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0137: networkPort7001ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra (TCP:7001) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0134: networkPort3389ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0131: networkPort11214ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11214) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0128: networkPort11214ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11214) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0125: networkPort11215ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11215) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0122: networkPort11215ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11215) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0119: networkPort23ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Telnet (TCP:23) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0116: networkPort445ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Microsoft-DS (TCP:445) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0113: networkPort25ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SMTP (TCP:25) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0110: networkPort110ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure POP3 (TCP:110) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0107: networkPort137ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (TCP:137) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0104: networkPort137ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (UDP:137) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0101: networkPort138ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0098: networkPort138ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0095: networkPort139ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (TCP:139) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0092: networkPort139ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (UDP:139) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0089: networkPort161ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SNMP (UDP:161) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0086: networkPort53ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure DNS (UDP:53) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0083: networkPort3000ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Prevalent known internal port (TCP:3000) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0080: networkPort3020ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CIFS / SMB (TCP:3020) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0077: networkPort4505ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4505) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0074: networkPort4506ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4506) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0071: networkPort8000ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8000) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0068: networkPort8080ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8080) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0065: networkPort5500ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Listener (TCP:5500) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0062: networkPort5900ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Server (TCP:5900) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0059: networkPort1434ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Admin (TCP:1434) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0056: networkPort1434ExposedToInternetUGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Browser Service (UDP:1434) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0053: networkPort2382ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Service browser (TCP:2382) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0050: networkPort8140ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Puppet Master (TCP:8140) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0047: networkPort27018ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Mongo Web Portal (TCP:27018) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0044: networkPort61621ExposedToInternetGCP

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter agent (TCP:61621) is not exposed to entire internet for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0227: networkPort20ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SSH (TCP:20) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0224: networkPort3389ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0221: networkPort9000ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Hadoop Name Node (TCP:9000) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0218: networkPort9090ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CiscoSecure, Websm (TCP:9090) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0215: networkPort389ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (TCP:389) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0212: networkPort389ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (UDP:389) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0209: networkPort1521ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:1521) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0206: networkPort2483ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:2483) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0203: networkPort2483ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (UDP:2483) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0200: networkPort6379ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Redis (TCP:6379) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0197: networkPort7000ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Internode Communication (TCP:7000) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0193: networkPort7199ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Monitoring (TCP:7199) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0190: networkPort8888ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Website (TCP:8888) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0187: networkPort9042ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Client (TCP:9042) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0184: networkPort9160ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Thrift (TCP:9160) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0181: networkPort9200ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9200) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0178: networkPort9300ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9300) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0175: networkPort11211ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (TCP:11211) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0172: networkPort11211ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (UDP:11211) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0169: networkPort27017ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Mongo Instances (TCP:27017) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0166: networkPort61620ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Monitoring (TCP:61620) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0163: networkPort135ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Debugger (TCP:135) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0160: networkPort636ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP SSL (TCP:636) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0157: networkPort1433ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Server (TCP:1433) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0154: networkPort2383ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Services (TCP:2383) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0151: networkPort2484ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (TCP:2484) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0148: networkPort2484ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (UDP:2484) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0145: networkPort3306ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MySQL (TCP:3306) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0142: networkPort5432ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (TCP:5432) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0139: networkPort5432ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (UDP:5432) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0136: networkPort7001ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra (TCP:7001) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0133: networkPort3389ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0130: networkPort11214ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11214) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0127: networkPort11214ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11214) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0124: networkPort11215ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11215) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0121: networkPort11215ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11215) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0118: networkPort23ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Telnet (TCP:23) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0115: networkPort445ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Microsoft-DS (TCP:445) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0112: networkPort25ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SMTP (TCP:25) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0109: networkPort110ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure POP3 (TCP:110) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0106: networkPort137ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (TCP:137) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0103: networkPort137ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (UDP:137) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0100: networkPort138ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0097: networkPort138ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0094: networkPort139ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (TCP:139) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0091: networkPort139ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (UDP:139) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0088: networkPort161ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SNMP (UDP:161) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0085: networkPort53ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure DNS (UDP:53) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0082: networkPort3000ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Prevalent known internal port (TCP:3000) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0079: networkPort3020ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CIFS / SMB (TCP:3020) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0076: networkPort4505ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4505) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0073: networkPort4506ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4506) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0070: networkPort8000ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8000) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0067: networkPort8080ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8080) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0064: networkPort5500ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Listener (TCP:5500) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0061: networkPort5900ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Server (TCP:5900) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0058: networkPort1434ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Admin (TCP:1434) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0055: networkPort1434ExposedToPublicUGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Browser Service (UDP:1434) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0052: networkPort2382ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Service browser (TCP:2382) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0049: networkPort8140ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Puppet Master (TCP:8140) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0046: networkPort27018ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Mongo Web Portal (TCP:27018) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0043: networkPort61621ExposedToPublicGCP

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter agent (TCP:61621) is not exposed to public for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0226: networkPort20ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SSH (TCP:20) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0223: networkPort3389ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0220: networkPort9000ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Hadoop Name Node (TCP:9000) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0217: networkPort9090ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CiscoSecure, Websm (TCP:9090) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0214: networkPort389ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (TCP:389) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0211: networkPort389ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP (UDP:389) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0208: networkPort1521ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:1521) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0205: networkPort2483ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (TCP:2483) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0202: networkPort2483ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB (UDP:2483) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0199: networkPort6379ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Redis (TCP:6379) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0196: networkPort7000ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Internode Communication (TCP:7000) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0192: networkPort7199ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Monitoring (TCP:7199) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0189: networkPort8888ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Website (TCP:8888) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0186: networkPort9042ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Client (TCP:9042) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0183: networkPort9160ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra Thrift (TCP:9160) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0180: networkPort9200ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9200) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0177: networkPort9300ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Elastic Search (TCP:9300) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0174: networkPort11211ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (TCP:11211) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0171: networkPort11211ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Memcached Instances (UDP:11211) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0168: networkPort27017ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Unencrypted Mongo Instances (TCP:27017) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0165: networkPort61620ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter Monitoring (TCP:61620) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0162: networkPort135ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Debugger (TCP:135) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0159: networkPort636ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure LDAP SSL (TCP:636) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0156: networkPort1433ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Server (TCP:1433) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0153: networkPort2383ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Services (TCP:2383) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0150: networkPort2484ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (TCP:2484) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0147: networkPort2484ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Oracle DB SSL (UDP:2484) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0144: networkPort3306ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MySQL (TCP:3306) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0141: networkPort5432ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (TCP:5432) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0138: networkPort5432ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Postgres SQL (UDP:5432) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0135: networkPort7001ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra (TCP:7001) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0132: networkPort3389ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Remote Desktop (TCP:3389) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0129: networkPort11214ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11214) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0126: networkPort11214ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11214) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0123: networkPort11215ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (TCP:11215) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0120: networkPort11215ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Memcached SSL (UDP:11215) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0117: networkPort23ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Telnet (TCP:23) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0114: networkPort445ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Microsoft-DS (TCP:445) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0111: networkPort25ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SMTP (TCP:25) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0108: networkPort110ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure POP3 (TCP:110) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0105: networkPort137ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (TCP:137) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0102: networkPort137ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBIOS Name Service (UDP:137) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0099: networkPort138ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0096: networkPort138ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Datagram Service (TCP:138) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0093: networkPort139ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (TCP:139) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0090: networkPort139ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure NetBios Session Service (UDP:139) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0087: networkPort161ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SNMP (UDP:161) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0084: networkPort53ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure DNS (UDP:53) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0081: networkPort3000ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Prevalent known internal port (TCP:3000) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0078: networkPort3020ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure CIFS / SMB (TCP:3020) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0075: networkPort4505ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4505) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0072: networkPort4506ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SaltStack Master (TCP:4506) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0069: networkPort8000ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8000) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0066: networkPort8080ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Known internal web port (TCP:8080) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0063: networkPort5500ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Listener (TCP:5500) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0060: networkPort5900ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure VNC Server (TCP:5900) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0057: networkPort1434ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Admin (TCP:1434) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0054: networkPort1434ExposedToPrivateUGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure MSSQL Browser Service (UDP:1434) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0051: networkPort2382ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure SQL Server Analysis Service browser (TCP:2382) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0048: networkPort8140ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Puppet Master (TCP:8140) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0045: networkPort27018ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Mongo Web Portal (TCP:27018) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---

## AC_GCP_0042: networkPort61621ExposedToPrivateGCP

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `google_compute_firewall`

### Description
Ensure Cassandra OpsCenter agent (TCP:61621) is not exposed to private hosts more than 32 for Google Compute Firewall

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "google_compute_firewall" "example" {
  source_ranges = ["10.0.0.0/16"]
}

```

---
