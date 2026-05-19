# Service Mesh Security Best Practices

Security hardening guidelines for Istio, Consul, and Linkerd service meshes.

## Universal Best Practices

### mTLS Enforcement
- Enable mTLS between all services
- Use STRICT mode (not PERMISSIVE)
- Verify certificate chains

### Access Control
- Implement default deny policies
- Use RBAC/ACL for service authorization
- Minimize service permissions

### Certificate Management
- Use short-lived certificates (24-90 days)
- Configure automatic rotation
- Use dedicated CA for service mesh

### Monitoring
- Enable telemetry and metrics
- Configure access logging
- Implement distributed tracing

### Network Policies
- Restrict outbound traffic
- Use egress gateways for external access
- Implement network segmentation

---

## Istio-Specific Best Practices

### mTLS Configuration
```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```

### Authorization Policy
```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: istio-system
spec:
  {}  # Empty spec = deny all
```

### Outbound Traffic Policy
```yaml
meshConfig:
  outboundTrafficPolicy:
    mode: REGISTRY_ONLY
```

### Proxy Configuration
```yaml
defaultConfig:
  privileged: false
  holdApplicationUntilProxyStarts: true
```

### Trust Domain
```yaml
meshConfig:
  trustDomain: "your-organization.local"
```

---

## Consul-Specific Best Practices

### ACL Configuration
```json
{
  "acl": {
    "enabled": true,
    "default_policy": "deny",
    "enable_token_persistence": true
  }
}
```

### TLS Configuration
```json
{
  "tls": {
    "defaults": {
      "verify_incoming": true,
      "verify_outgoing": true,
      "verify_server_hostname": true,
      "tls_min_version": "TLSv1_2"
    }
  }
}
```

### Gossip Encryption
```json
{
  "encrypt": "YOUR_32_BYTE_BASE64_KEY",
  "encrypt_verify_incoming": true,
  "encrypt_verify_outgoing": true
}
```

### Connect Service Mesh
```json
{
  "connect": {
    "enabled": true
  }
}
```

### FedRAMP Cipher Suites
```json
{
  "tls": {
    "defaults": {
      "tls_cipher_suites": "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  }
}
```

---

## Linkerd-Specific Best Practices

### TLS Configuration
```yaml
tls:
  enabled: true
  enforced: true
  minVersion: "1.2"
  cipherSuites:
    - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
    - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
```

### Service Identity
```yaml
identity:
  enabled: true
  issuer:
    issuanceLifetime: 24h
    clockSkewAllowance: 20s
```

### Policy Configuration
```yaml
policy:
  enabled: true
  defaultPolicy: deny
```

### Proxy Configuration
```yaml
proxy:
  privileged: false
  resources:
    cpu:
      request: 100m
      limit: 500m
    memory:
      request: 64Mi
      limit: 256Mi
```

### Observability
```yaml
tracing:
  enabled: true
  samplingRate: 0.1

metrics:
  enabled: true
```

---

## Security Checklist

### Critical (Fix Immediately)
- [ ] mTLS/TLS enabled and enforced
- [ ] RBAC/ACL enabled with default deny
- [ ] Gossip encryption enabled (Consul)
- [ ] Privileged mode disabled

### High Priority
- [ ] Hostname verification enabled
- [ ] TLS 1.2+ minimum version
- [ ] Certificate validity < 90 days
- [ ] Access logging enabled

### Medium Priority
- [ ] Explicit trust domain configured
- [ ] Outbound traffic restricted
- [ ] Telemetry enabled
- [ ] Resource limits set

### Low Priority
- [ ] Image versions pinned
- [ ] Timeout configurations set
- [ ] Distributed tracing enabled
- [ ] Metrics collection configured
