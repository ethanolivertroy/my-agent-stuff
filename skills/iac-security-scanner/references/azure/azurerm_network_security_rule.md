# azurerm_network_security_rule

## AC_AZURE_0535: networkPort53ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure DNS (Udp:53) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0532: networkPort9000ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Hadoop Name Node (Tcp:9000) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0529: networkPort8000ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8000) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0526: networkPort8080ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8080) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0523: networkPort636ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure LDAP SSL (Tcp:636) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0520: networkPort1434ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Admin (Tcp:1434) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0517: networkPort1434ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Browser (Udp:1434) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0514: networkPort135ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Debugger (Tcp:135) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0511: networkPort1433ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Server (Tcp:1433) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0508: networkPort11214ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11214) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0505: networkPort11215ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11215) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0502: networkPort11214ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11214) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0499: networkPort11215ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11215) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0496: networkPort445ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Microsoft-DS (Tcp:445) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0493: networkPort27018ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Mongo Web Portal (Tcp:27018) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0490: networkPort3306ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MySQL (Tcp:3306) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0487: networkPort137ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Tcp:137) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0484: networkPort137ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Udp:137) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0481: networkPort138ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Tcp:138) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0478: networkPort138ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Udp:138) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0475: networkPort139ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Tcp:139) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0472: networkPort139ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Udp:139) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0469: networkPort2484ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Tcp:2484) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0466: networkPort2484ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Udp:2484) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0463: networkPort110ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure POP3 (Tcp:110) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0460: networkPort5432ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Tcp:5432) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0457: networkPort5432ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Udp:5432) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0454: networkPort3000ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Prevalent known internal port (Tcp:3000) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0451: networkPort8140ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Puppet Master (Tcp:8140) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0448: networkPort25ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SMTP (Tcp:25) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0445: networkPort161ExposedToInternetUAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SNMP (Udp:161) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0442: networkPort2382ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2382) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0439: networkPort2383ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2383) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0436: networkPort4505ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4505) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0433: networkPort4506ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4506) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0430: networkPort23ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Telnet (Tcp:23) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0427: networkPort5500ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Listener (Tcp:5500) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0424: networkPort5900ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Server (Tcp:5900) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0357: networkPortAllExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure that request initiated from all ports (*) for all destination ports (*) is restricted from the internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0342: networkPort3389ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure that RDP access is restricted from the internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0285: networkPort22ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SSH (Tcp:22) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0276: networkPort61621ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra OpsCenter (Tcp:61621) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0273: networkPort7001ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra (Tcp:7001) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0270: networkPort3020ExposedToInternetAz

- **Severity**: 🔴 HIGH
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure CIFS / SMB (Tcp:3020) is not exposed to entire internet for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0537: networkPort61621ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra OpsCenter (Tcp:61621) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0534: networkPort53ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure DNS (Udp:53) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0531: networkPort9000ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Hadoop Name Node (Tcp:9000) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0528: networkPort8000ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8000) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0525: networkPort8080ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8080) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0522: networkPort636ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure LDAP SSL (Tcp:636) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0519: networkPort1434ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Admin (Tcp:1434) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0516: networkPort1434ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Browser (Udp:1434) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0513: networkPort135ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Debugger (Tcp:135) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0510: networkPort1433ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Server (Tcp:1433) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0507: networkPort11214ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11214) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0504: networkPort11215ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11215) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0501: networkPort11214ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11214) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0498: networkPort11215ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11215) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0495: networkPort445ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Microsoft-DS (Tcp:445) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0492: networkPort27018ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Mongo Web Portal (Tcp:27018) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0489: networkPort3306ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MySQL (Tcp:3306) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0486: networkPort137ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Tcp:137) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0483: networkPort137ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Udp:137) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0480: networkPort138ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Tcp:138) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0477: networkPort138ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Udp:138) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0474: networkPort139ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Tcp:139) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0471: networkPort139ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Udp:139) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0468: networkPort2484ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Tcp:2484) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0465: networkPort2484ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Udp:2484) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0462: networkPort110ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure POP3 (Tcp:110) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0459: networkPort5432ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Tcp:5432) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0456: networkPort5432ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Udp:5432) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0453: networkPort3000ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Prevalent known internal port (Tcp:3000) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0450: networkPort8140ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Puppet Master (Tcp:8140) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0447: networkPort25ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SMTP (Tcp:25) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0444: networkPort161ExposedToPublicUAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SNMP (Udp:161) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0441: networkPort2382ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2382) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0438: networkPort2383ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2383) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0435: networkPort4505ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4505) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0432: networkPort4506ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4506) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0429: networkPort23ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Telnet (Tcp:23) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0426: networkPort5500ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Listener (Tcp:5500) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0423: networkPort5900ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Server (Tcp:5900) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0286: networkPort22ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SSH (Tcp:22) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0274: networkPort7001ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra (Tcp:7001) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0271: networkPort3020ExposedToPublicAz

- **Severity**: 🟡 MEDIUM
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure CIFS / SMB (Tcp:3020) is not exposed to public for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0536: networkPort61621ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra OpsCenter (Tcp:61621) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0533: networkPort53ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure DNS (Udp:53) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0530: networkPort9000ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Hadoop Name Node (Tcp:9000) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0527: networkPort8000ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8000) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0524: networkPort8080ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Known internal web port (Tcp:8080) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0521: networkPort636ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure LDAP SSL (Tcp:636) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0518: networkPort1434ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Admin (Tcp:1434) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0515: networkPort1434ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Browser (Udp:1434) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0512: networkPort135ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Debugger (Tcp:135) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0509: networkPort1433ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MSSQL Server (Tcp:1433) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0506: networkPort11214ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11214) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0503: networkPort11215ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Tcp:11215) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0500: networkPort11214ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11214) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0497: networkPort11215ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Memcached SSL (Udp:11215) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0494: networkPort445ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Microsoft-DS (Tcp:445) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0491: networkPort27018ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Mongo Web Portal (Tcp:27018) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0488: networkPort3306ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure MySQL (Tcp:3306) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0485: networkPort137ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Tcp:137) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0482: networkPort137ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Name Service (Udp:137) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0479: networkPort138ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Tcp:138) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0476: networkPort138ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Datagram Service (Udp:138) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0473: networkPort139ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Tcp:139) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0470: networkPort139ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure NetBIOS Session Service (Udp:139) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0467: networkPort2484ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Tcp:2484) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0464: networkPort2484ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Oracle DB SSL (Udp:2484) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0461: networkPort110ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure POP3 (Tcp:110) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0458: networkPort5432ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Tcp:5432) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0455: networkPort5432ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure PostgreSQL (Udp:5432) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0452: networkPort3000ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Prevalent known internal port (Tcp:3000) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0449: networkPort8140ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Puppet Master (Tcp:8140) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0446: networkPort25ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SMTP (Tcp:25) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0443: networkPort161ExposedToPrivateUAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SNMP (Udp:161) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0440: networkPort2382ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2382) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0437: networkPort2383ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SQL Server Analysis (Tcp:2383) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0434: networkPort4505ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4505) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0431: networkPort4506ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SaltStack Master (Tcp:4506) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0428: networkPort23ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Telnet (Tcp:23) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0425: networkPort5500ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Listener (Tcp:5500) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0422: networkPort5900ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure VNC Server (Tcp:5900) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0421: tooOpenPrivateIPs

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure server is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  # security_rule = ... (not set)
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  security_rule = true
}

```

---

## AC_AZURE_0287: networkPort22ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure SSH (Tcp:22) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0275: networkPort7001ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure Cassandra (Tcp:7001) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---

## AC_AZURE_0272: networkPort3020ExposedToPrivateAz

- **Severity**: 🟢 LOW
- **Category**: Infrastructure Security
- **Resource**: `azurerm_network_security_rule`

### Description
Ensure CIFS / SMB (Tcp:3020) is not exposed to private hosts more than 32 for Azure Network Security Rule

### What to Check
- Review resource configuration against security best practices.

### Bad Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["0.0.0.0/0"]
}

```

### Good Example
```hcl
resource "azurerm_network_security_rule" "example" {
  source_address_prefix = ["10.0.0.0/16"]
}

```

---
