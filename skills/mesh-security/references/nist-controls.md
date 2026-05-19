# NIST 800-53 Rev 5 Controls Reference

Quick reference for NIST controls relevant to service mesh security.

## Access Control (AC)

### AC-3: Access Enforcement
The system enforces approved authorizations for logical access to information and system resources.

**Service Mesh Implementation:**
- RBAC/ACL policies
- Authorization policies
- Service-to-service access rules

### AC-4: Information Flow Enforcement
The system enforces approved authorizations for controlling the flow of information.

**Service Mesh Implementation:**
- Outbound traffic policies
- Network policies
- Egress restrictions

### AC-17: Remote Access
Establish and document usage restrictions and configuration requirements for remote access.

**Service Mesh Implementation:**
- mTLS enforcement
- TLS configuration
- External access controls

## Audit and Accountability (AU)

### AU-2: Audit Events
Generate audit records for defined events.

**Service Mesh Implementation:**
- Access logging
- Telemetry collection
- Event monitoring

### AU-3: Content of Audit Records
Audit records contain information about event type, time, location, source, outcome, and identity.

**Service Mesh Implementation:**
- Structured logging
- Request/response logging
- Identity in logs

### AU-12: Audit Generation
Provide audit record generation capability.

**Service Mesh Implementation:**
- Metrics collection
- Distributed tracing
- Centralized logging

## Security Assessment (CA)

### CA-3: System Interconnections
Authorize connections between systems through security agreements.

**Service Mesh Implementation:**
- Trust domain configuration
- Peer authentication
- Cross-cluster trust

## Configuration Management (CM)

### CM-2: Baseline Configuration
Develop and maintain a current baseline configuration.

**Service Mesh Implementation:**
- Documented mesh configuration
- GitOps practices
- Configuration versioning

### CM-6: Configuration Settings
Establish and document configuration settings for information technology products.

**Service Mesh Implementation:**
- Security-hardened defaults
- Documented settings
- Configuration validation

### CM-7: Least Functionality
Configure systems to provide only essential capabilities.

**Service Mesh Implementation:**
- Disable privileged mode
- Restrict outbound traffic
- Minimal permissions

## Identification and Authentication (IA)

### IA-2: Identification and Authentication
Uniquely identify and authenticate organizational users or processes.

**Service Mesh Implementation:**
- Service identity (SPIFFE/SPIRE)
- Certificate-based authentication
- mTLS identity

### IA-5: Authenticator Management
Manage system authenticators through established procedures.

**Service Mesh Implementation:**
- Certificate management
- Secret Discovery Service (SDS)
- Key rotation

## System and Communications Protection (SC)

### SC-7: Boundary Protection
Monitor and control communications at system boundaries.

**Service Mesh Implementation:**
- Ingress/egress gateways
- Network segmentation
- Traffic policies

### SC-8: Transmission Confidentiality and Integrity
Protect the confidentiality and integrity of transmitted information.

**Service Mesh Implementation:**
- mTLS enforcement
- TLS encryption
- Data-in-transit protection

### SC-12: Cryptographic Key Establishment and Management
Establish and manage cryptographic keys according to requirements.

**Service Mesh Implementation:**
- Certificate validity periods
- CA configuration
- Key rotation policies

### SC-13: Cryptographic Protection
Implement required cryptography according to standards.

**Service Mesh Implementation:**
- TLS version requirements
- Cipher suite configuration
- FIPS compliance

### SC-23: Session Authenticity
Protect the authenticity of communications sessions.

**Service Mesh Implementation:**
- Peer authentication
- Session validation
- Trust chain verification

## System and Information Integrity (SI)

### SI-4: Information System Monitoring
Monitor the system to detect attacks and indicators of potential attacks.

**Service Mesh Implementation:**
- Telemetry and metrics
- Anomaly detection
- Security monitoring
