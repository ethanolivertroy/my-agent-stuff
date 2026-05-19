# aws_db_instance

## AC_AWS_0058: rdsHasStorageEncrypted

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_db_instance`

### Description
Ensure that your RDS database instances encrypt the underlying storage. Encrypted RDS instances use the industry standard AES-256 encryption algorithm to encrypt data on the server that hosts RDS DB instances. After data is encrypted, RDS handles authentication of access and description of data transparently with minimal impact on performance.

### What to Check
- Verify encryption is enabled.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0057: rdsCAExpired

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_db_instance`

### Description
Ensure Certificate used in RDS instance is updated

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0056: rdsAutoMinorVersionUpgradeEnabled

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_db_instance`

### Description
RDS Instance Auto Minor Version Upgrade flag disabled

### What to Check
- Verify attribute is set to `false`.
- Verify secure version or protocol is used.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0054: rdsPubliclyAccessible

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_db_instance`

### Description
RDS Instance publicly_accessible flag is true

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0052: rdsBackupDisabled

- **Severity**: 🔴 HIGH
- **Category**: Data Protection
- **Resource**: `aws_db_instance`

### Description
Ensure automated backups are enabled for AWS RDS instances

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0454: rdsLogExportDisabled

- **Severity**: 🟡 MEDIUM
- **Category**: Logging and Monitoring
- **Resource**: `aws_db_instance`

### Description
Ensure CloudWatch logging is enabled for AWS DB instances

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---

## AC_AWS_0053: rdsIamAuthEnabled

- **Severity**: 🟡 MEDIUM
- **Category**: Data Protection
- **Resource**: `aws_db_instance`

### Description
Ensure that your RDS database has IAM Authentication enabled.

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_db_instance" "bad" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = false
  publicly_accessible = true
}

```

### Good Example
```hcl
resource "aws_db_instance" "good" {
  identifier         = "mydb"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  storage_encrypted  = true
  publicly_accessible = false
}

```

---
