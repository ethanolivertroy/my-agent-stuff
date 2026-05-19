# NIST 800-53 Control Mapping

## Access Control (AC)

### AC-3: Access Enforcement
- S3 bucket policies restricting public access
- IAM policies with least privilege
- Security group ingress and egress rules

### AC-6: Least Privilege
- IAM policies without wildcards
- Role-based access controls
- Service account restrictions

## Audit and Accountability (AU)

### AU-2: Audit Events
- CloudTrail enabled
- VPC Flow Logs enabled
- S3 access logging

### AU-3: Content of Audit Records
- Log format requirements
- Timestamp requirements

## Configuration Management (CM)

### CM-2: Baseline Configuration
- Approved AMI usage
- Container image sources
- Terraform module versions

### CM-6: Configuration Settings
- Encryption at rest enabled
- TLS 1.2+ required
- Secure defaults enforced

## System and Communications Protection (SC)

### SC-8: Transmission Confidentiality
- HTTPS or TLS enforcement
- Encryption in transit
- Certificate validation

### SC-13: Cryptographic Protection
- KMS key usage
- Encryption algorithms
- Key rotation policies

### SC-28: Protection of Information at Rest
- EBS encryption
- S3 encryption
- RDS encryption
