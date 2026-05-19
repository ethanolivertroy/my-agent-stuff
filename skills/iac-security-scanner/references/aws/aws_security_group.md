# aws_security_group

## AC_AWS_0318: port9300AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Elasticsearch (TCP,9300) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0317: port9200AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Elasticsearch (TCP,9200) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0316: port27017AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MongoDB (TCP,27017) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0315: port445AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure CIFS for file/printer (TCP,445) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0314: port25AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SMTP (TCP,25) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0313: port23AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Telnet (TCP,23) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0312: port1521AlbNetworkPortSecurityPublicScope

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Oracle Database Server (TCP,1521) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0276: unknownPortOpenToInternet

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Unknown Port is not exposed to the entire internet

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0275: portWideOpenToPublic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure no security groups is wide open to public, that is, allows traffic from 0.0.0.0/0 to ALL ports and protocols

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0274: port27017AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MongoDB (TCP,27017)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0273: port445AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - CIFS for file/printer (TCP,445)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0272: port25AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SMTP (TCP,25)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0271: port23AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Telnet (TCP,23)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0270: port1521AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Oracle Database Server (TCP,1521)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0269: port4505AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SaltStack Master (TCP,4505)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0268: port2383AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SQL Server Analysis Services (TCP,2383)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0267: port2382AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SQL Server Analysis Service browser (TCP,2382)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0266: port161UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SNMP (UDP,161)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0265: port8140AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Puppet Master (TCP,8140)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0264: port3000AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Prevalent known internal port (TCP,3000)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0263: port5432UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Postgres SQL (UDP,5432)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0262: port5432AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Postgres SQL (TCP,5432)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0261: port2484UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Oracle DB SSL (UDP,2484)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0260: port2484AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Oracle DB SSL (TCP,2484)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0259: port139UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Session Service (UDP,139)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0258: port139AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Session Service (TCP,139)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0257: port138UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Datagram Service (UDP,138)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0256: port138AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Datagram Service (TCP,138)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0255: port137UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Name Service (UDP,137)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0254: port137AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - NetBIOS Name Service (TCP,137)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0253: port3306AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MySQL (TCP,3306)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0252: port27018AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Mongo Web Portal (TCP,27018)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0251: port11215UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Memcached SSL (UDP,11215)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0250: port11214UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Memcached SSL (UDP,11214)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0249: port11215AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Memcached SSL (TCP,11215)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0248: port11214AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Memcached SSL (TCP,11214)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0247: port1433AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MSSQL Server (TCP,1433)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0246: port135AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MSSQL Debugger (TCP,135)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0245: port1434UdpAlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MSSQL Browser Service (UDP,1434)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0244: port1434AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - MSSQL Admin (TCP,1434)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0243: port636AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - LDAP SSL (TCP,636)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0242: port8080AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Known internal web port (TCP,8080)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0241: port8000AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Known internal web port (TCP,8000)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0240: port9000AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Hadoop Name Node (TCP,9000)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0239: port7001AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Cassandra (TCP,7001)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0238: port61621AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Cassandra OpsCenter agent (TCP,61621)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0237: port3020AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - CIFS / SMB (TCP,3020)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0236: port4506AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SaltStack Master (TCP,4506)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0235: port9300AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Elasticsearch (TCP,9300)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0234: port9200AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - Elasticsearch (TCP,9200)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0233: port4505AlbNetworkPortSecurity

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - SaltStack Master (TCP,4505)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0232: defaultSGNotRestrictsAllTraffic

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure no default security groups are used as they allow ingress from 0.0.0.0/0 to ALL ports and protocols

### What to Check
- Verify attribute is set to `false`.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0231: unrestrictedIngressAccess

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure no security groups allow ingress from 0.0.0.0/0 to ALL ports and protocols

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0230: port3389OpenToInternet

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - remote desktop port (TCP,3389)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0228: port80OpenToInternet

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - (HTTP,80)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0227: port22OpenToInternet

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - (SSH,22)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0311: port4505AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SaltStack Master (TCP,4505) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0310: port2383AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SQL Server Analysis Services (TCP,2383) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0309: port2382AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SQL Server Analysis Service browser (TCP,2382) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0308: port161UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SNMP (UDP,161) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0307: port8140AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Puppet Master (TCP:8140) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0306: port3000AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Prevalent known internal port (TCP,3000) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0305: port5432UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Postgres SQL (UDP,5432) is not accessible by a CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0304: port5432AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Postgres SQL (TCP,5432) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0303: port2484UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Oracle DB SSL (UDP,2484) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0302: port2484AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Oracle DB SSL (TCP,2484) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0301: port139UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBios Session Service (UDP,139) is not accessible by a CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0300: port139AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBios Session Service (TCP,139) is not accessible by a CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0299: port138UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBios Datagram Service (UDP,138) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0298: port138AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBios Datagram Service (TCP,138) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0297: port137UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOS Name Service (UDP,137) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0296: port137AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOS Name Service (TCP,137) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0295: port3306AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MySQL (TCP,3306) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0294: port27018AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Mongo Web Portal (TCP,27018) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0293: port11215UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Memcached SSL (UDP,11215) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0292: port11214UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Memcached SSL (UDP,11214) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0291: port11215AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Memcached SSL (TCP,11215) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0290: port11214AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Memcached SSL (TCP,11214) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0289: port1433AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MSSQL Server (TCP,1433) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0288: port135AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MSSQL Debugger (TCP,135) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0287: port1434UdpAlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MSSQL Browser Service (UDP,1434) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0286: port1434AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MSSQL Admin (TCP,1434) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0285: port636AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure LDAP SSL (TCP,636) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0284: port8080AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Known internal web port (TCP,8080) is not accessible by a CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0283: port8000AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Known internal web port (TCP,8000) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0282: port9000AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Hadoop Name Node (TCP,9000) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0281: port7001AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Cassandra (TCP,7001) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0280: port61621AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Cassandra OpsCenter agent port (TCP,61621) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0279: port3020AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure CIFS / SMB (TCP,3020) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0278: port4506AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SaltStack Master (TCP,4506) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0277: port4505AlbNetworkPortSecurityPublicScope

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SaltStack Master (TCP,4505) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0363: networkPort9300ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Elasticsearch' (TCP,9300) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0362: networkPort27017ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MongoDB' (TCP,27017) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0361: networkPort445ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure CIFSforfile/printer' (TCP,445) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0360: networkPort25ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SMTP' (TCP,25) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0359: networkPort23ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Telnet' (TCP,23) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0358: networkPort1521ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure OracleDatabaseServer' (TCP,521) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0357: networkPort2383ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SQLServerAnalysisServices' (TCP,2383) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0356: networkPort2382ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SQLServerAnalysisServicebrowser' (TCP,2382) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0355: networkPort161ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SNMP' (UDP,161) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0354: networkPort8140ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure PuppetMaster' (TCP,8140) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0353: networkPort3000ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Prevalentknowninternalport' (TCP,3000) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0352: networkPort5432ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure PostgresSQL' (UDP,5432) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0351: networkPort5432ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure PostgresSQL' (TCP,5432) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0350: networkPort2484ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure OracleDBSSL' (UDP,2484) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0349: networkPort2484ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure OracleDBSSL' (TCP,2484) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0348: networkPort139ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSSessionService' (UDP,139) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0347: networkPort139ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSSessionService' (TCP,139) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0346: networkPort138ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSDatagramService' (UDP,138) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0345: networkPort138ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSNameService' (UDP,137) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0344: networkPort137ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSNameService' (UDP,137) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0343: networkPort137ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure NetBIOSNameService' (TCP,137) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0342: networkPort27018ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure MongoWebPortal' (TCP,27018) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0341: networkPort636ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure LDAPSSL' (TCP,636) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0340: networkPort8000ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Knowninternalwebport' (TCP,8000) not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0339: networkPort9000ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure HadoopNameNode' (TCP,9000) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0338: networkPort7001ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Cassandra' (TCP,7001) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0337: networkPort3020ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure CIFS/SMB' (TCP,3020) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0336: networkPort3306ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MySQL (TCP,3306) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0335: networkPort11215ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MemcachedSSL (UDP,11215) is not exposed to  private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0334: networkPort11214ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MemcachedSSL (UDP,11214) is not exposed to  private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0333: networkPort11215ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MemcachedSSL (TCP,11215) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0332: networkPort11214ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MemcachedSSL (TCP,11214) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0331: networkPort1433ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MSSQLServer (TCP,1433) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0330: networkPort135ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MSSQLDebugger (TCP,135) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0329: networkPort1434ExposedToprivateU

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MSSQLBrowserService (UDP,1434) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0328: networkPort1434ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports MSSQLAdmin (TCP,1434) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0327: networkPort8080ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports Knowninternalwebport (TCP,8080) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0326: networkPort61621ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports CassandraOpsCenteragent (TCP,61621) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0325: networkPort4506ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports SaltStackMaster (TCP,4506) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0324: networkPort9200ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports Elasticsearch (TCP,9200) is not exposed to  private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0323: networkPort3389ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports remote desktop port (TCP,3389) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0322: networkPort443ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports https (TCP,443) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0321: networkPort80ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports http (TCP,80) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0320: networkPort22ExposedToprivate

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure Security Groups Unrestricted Specific Ports SSH (TCP,22) is not exposed to private hosts more than 32

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0319: port22AlbNetworkPortSecurityPublicScope

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Ensure SSH (TCP,22) is not accessible by a public CIDR block range

### What to Check
- Verify resource is not publicly accessible.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---

## AC_AWS_0229: port443OpenToInternet

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `aws_security_group`

### Description
Security Groups - Unrestricted Specific Ports - (HTTPS,443)

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "aws_security_group" "bad" {
  name = "allow-ssh-world"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### Good Example
```hcl
resource "aws_security_group" "good" {
  name = "allow-ssh-vpn"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

```

---
