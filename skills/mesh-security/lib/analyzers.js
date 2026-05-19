/**
 * Service Mesh Security Analyzers
 *
 * Extracted from mesh-config-analyzer for standalone skill usage.
 * Supports Istio, Consul, and Linkerd service mesh configurations.
 */

// Base analyzer class with common functionality
class BaseSecurityAnalyzer {
  constructor() {
    this.findings = [];
    this.nistControls = this.getNISTControls();
  }

  reset() {
    this.findings = [];
  }

  addFinding(severity, category, message, recommendation, location = null, nistControls = [], nistGuidance = null) {
    const controlRefs = nistControls.map(controlId => {
      const control = this.nistControls[controlId] || { id: controlId, title: "Unknown Control", description: "" };
      return {
        id: controlId,
        title: control.title,
        description: control.description
      };
    });

    this.findings.push({
      severity,
      category,
      message,
      recommendation,
      location,
      nistControls: controlRefs,
      nistGuidance
    });
  }

  getNISTControls() {
    return {
      "AC-3": {
        id: "AC-3",
        title: "Access Enforcement",
        description: "The information system enforces approved authorizations for logical access to information and system resources in accordance with applicable access control policies."
      },
      "AC-4": {
        id: "AC-4",
        title: "Information Flow Enforcement",
        description: "The information system enforces approved authorizations for controlling the flow of information within the system and between connected systems based on applicable information flow control policies."
      },
      "AC-17": {
        id: "AC-17",
        title: "Remote Access",
        description: "The organization establishes and documents usage restrictions, configuration/connection requirements, and implementation guidance for each type of remote access allowed."
      },
      "AU-2": {
        id: "AU-2",
        title: "Audit Events",
        description: "The information system generates audit records containing information that establishes what type of event occurred, when the event occurred, where the event occurred, the source of the event, the outcome of the event, and the identity of any individuals or subjects associated with the event."
      },
      "AU-3": {
        id: "AU-3",
        title: "Content of Audit Records",
        description: "The information system generates audit records containing information that establishes what type of event occurred, when the event occurred, where the event occurred, the source of the event, the outcome of the event, and the identity of any individuals or subjects associated with the event."
      },
      "AU-12": {
        id: "AU-12",
        title: "Audit Generation",
        description: "The information system provides audit record generation capability for the auditable events defined in AU-2 a. at all information system components where audit capability is deployed."
      },
      "CA-3": {
        id: "CA-3",
        title: "System Interconnections",
        description: "The organization authorizes connections from the information system to other information systems through the use of Interconnection Security Agreements and monitors the system connections on an ongoing basis."
      },
      "CM-2": {
        id: "CM-2",
        title: "Baseline Configuration",
        description: "The organization develops, documents, and maintains under configuration control, a current baseline configuration of the information system."
      },
      "CM-6": {
        id: "CM-6",
        title: "Configuration Settings",
        description: "The organization establishes and documents configuration settings for information technology products employed within the information system that reflect the most restrictive mode consistent with operational requirements."
      },
      "CM-7": {
        id: "CM-7",
        title: "Least Functionality",
        description: "The organization configures the information system to provide only essential capabilities and specifically prohibits or restricts the use of functions, ports, protocols, and/or services as defined in the security plan."
      },
      "IA-2": {
        id: "IA-2",
        title: "Identification and Authentication",
        description: "The information system uniquely identifies and authenticates organizational users (or processes acting on behalf of organizational users)."
      },
      "IA-5": {
        id: "IA-5",
        title: "Authenticator Management",
        description: "The organization manages information system authenticators by establishing and implementing administrative procedures for initial authenticator distribution, for lost/compromised, or damaged authenticators, and for revoking authenticators."
      },
      "SC-7": {
        id: "SC-7",
        title: "Boundary Protection",
        description: "The information system monitors and controls communications at the external boundary of the system and at key internal boundaries within the system and implements subnetworks for publicly accessible system components that are physically or logically separated from internal organizational networks."
      },
      "SC-8": {
        id: "SC-8",
        title: "Transmission Confidentiality and Integrity",
        description: "The information system protects the confidentiality and integrity of transmitted information."
      },
      "SC-12": {
        id: "SC-12",
        title: "Cryptographic Key Establishment and Management",
        description: "The organization establishes and manages cryptographic keys for required cryptography employed within the information system in accordance with requirements for key generation, distribution, storage, access, and destruction."
      },
      "SC-13": {
        id: "SC-13",
        title: "Cryptographic Protection",
        description: "The information system implements cryptographic uses and type of cryptography required for each use in accordance with applicable laws, executive orders, directives, policies, regulations, and standards."
      },
      "SC-23": {
        id: "SC-23",
        title: "Session Authenticity",
        description: "The information system protects the authenticity of communications sessions."
      },
      "SI-4": {
        id: "SI-4",
        title: "Information System Monitoring",
        description: "The organization monitors the information system to detect attacks and indicators of potential attacks, unauthorized local, network, and remote connections."
      }
    };
  }
}

class IstioSecurityAnalyzer extends BaseSecurityAnalyzer {
  constructor() {
    super();
  }

  analyze(config) {
    this.reset();

    if (!config) {
      this.addFinding('Critical', 'File Format', 'Invalid or empty configuration file', 'Provide a valid Istio MeshConfig');
      return this.findings;
    }

    if (!config.kind || !config.apiVersion) {
      this.addFinding('Critical', 'Resource Type', 'File is not a valid Kubernetes resource', 'Ensure the file has apiVersion and kind fields');
      return this.findings;
    }

    if (config.kind !== 'MeshConfig') {
      this.addFinding('Critical', 'Resource Type', `Expected MeshConfig but found ${config.kind}`, 'Use a valid Istio MeshConfig resource');
      return this.findings;
    }

    this.checkMTLS(config);
    this.checkRootCertificates(config);
    this.checkPeerAuthentication(config);
    this.checkProxyConfig(config);
    this.checkSDS(config);
    this.checkTrustDomain(config);
    this.checkAuthorizationPolicies(config);
    this.checkTelemetry(config);
    this.checkRBAC(config);
    this.checkOutboundTrafficPolicy(config);

    return this.findings;
  }

  checkMTLS(config) {
    if (!config.meshMTLS || !config.meshMTLS.enabled) {
      this.addFinding(
        'High', 'mTLS', 'Mesh-wide mTLS is not enabled',
        'Enable mesh-wide mTLS for service-to-service communication security',
        'meshMTLS.enabled',
        ['SC-8', 'SC-13', 'IA-5', 'SC-23'],
        'NIST SP 800-204B recommends implementing mutual TLS for service-to-service communications. Without mTLS, traffic between services may be intercepted or tampered with, leading to unauthorized access or data exfiltration. According to NIST, "implementations must ensure protection of data in transit through the use of encryption techniques" and "credentials used for service identity should be automatically rotated frequently."'
      );
    }

    if (config.meshMTLS && config.meshMTLS.mode !== 'STRICT') {
      this.addFinding(
        'Medium', 'mTLS', `mTLS mode is set to ${config.meshMTLS.mode || 'PERMISSIVE'} instead of STRICT`,
        'Use STRICT mode for mTLS to ensure all traffic is encrypted',
        'meshMTLS.mode',
        ['SC-8', 'CM-6', 'CM-7'],
        'NIST SP 800-204A states that permissive mode should only be used during transition periods. NIST recommends enforcing strict mTLS mode to ensure all service-to-service communication is encrypted and authenticated. Running in permissive mode allows unencrypted traffic to flow within the mesh, potentially exposing sensitive data and allowing for man-in-the-middle attacks.'
      );
    }
  }

  checkRootCertificates(config) {
    const ca = config.ca || {};

    if (!ca.provider || ca.provider === 'istiod') {
      this.addFinding(
        'Medium', 'Certificate Authority', 'Using default istiod CA instead of a custom CA',
        'Consider using a production-grade external CA for production environments',
        'ca.provider',
        ['SC-12', 'IA-5', 'SC-13'],
        'NIST SP 800-204B recommends using a robust certificate authority infrastructure for production environments. According to NIST SP 800-57, "cryptographic keys require protection throughout their lifecycle." The default istiod CA may lack the security controls and processes required for high-security environments, including regular key rotation, hardware security modules (HSMs), and formal certificate lifecycle management expected in production deployments.'
      );
    }

    if (!ca.certValidityDuration) {
      this.addFinding(
        'Low', 'Certificate Validity', 'Certificate validity duration not specified',
        'Set appropriate cert validity periods based on your security policies',
        'ca.certValidityDuration',
        ['IA-5', 'SC-12'],
        'NIST SP 800-57 ("Recommendation for Key Management") specifies that certificates should have appropriate validity periods that balance security with operational overhead. Not specifying certificate validity durations may result in default values that are either too short (causing operational disruptions) or too long (increasing the risk of compromise). NIST recommends explicitly defining certificate lifetimes as part of a comprehensive key management policy.'
      );
    } else if (parseInt(ca.certValidityDuration) > 8760) {
      this.addFinding(
        'Medium', 'Certificate Validity', 'Long certificate validity period detected',
        'Consider shorter certificate validity periods (e.g., 90 days) for better security',
        'ca.certValidityDuration',
        ['IA-5', 'SC-12'],
        'NIST SP 800-204B suggests frequent rotation of certificates for service mesh identities. According to NIST SP 800-57, "the longer a key is in use, the greater the potential for key compromise." Certificates with validity periods longer than one year provide attackers with an extended window of opportunity if keys are compromised. NIST recommends shorter validity periods with automatic rotation to minimize risk while maintaining operational continuity.'
      );
    }
  }

  checkPeerAuthentication(config) {
    if (!config.peerAuthentication || !config.peerAuthentication.mode) {
      this.addFinding(
        'High', 'Authentication', 'No default peer authentication policy defined',
        'Define a default peer authentication policy with strict mTLS',
        'peerAuthentication',
        ['IA-2', 'SC-8', 'SC-23', 'AC-17'],
        'NIST SP 800-204A emphasizes the importance of strong authentication between services. NIST SP 800-204B specifically states: "A service mesh should enforce authentication of peer microservices... to ensure that only legitimate services are communicating within the mesh." Without a default peer authentication policy, services may not properly authenticate each other, allowing potential impersonation attacks and unauthorized access to sensitive information.'
      );
    } else if (config.peerAuthentication.mode !== 'STRICT') {
      this.addFinding(
        'Medium', 'Authentication', `Peer authentication mode is set to ${config.peerAuthentication.mode} instead of STRICT`,
        'Use STRICT mode for peer authentication to ensure all traffic is authenticated',
        'peerAuthentication.mode',
        ['IA-2', 'SC-8', 'CM-6', 'AC-3'],
        'NIST SP 800-204A recommends using strict authentication policies in service mesh implementations. According to NIST, "all network communication should require mutually authenticated TLS." Non-strict modes allow for unauthenticated traffic, which creates security vulnerabilities and inconsistent policy enforcement across the mesh. NIST SP 800-204B specifically notes that permissive mode should only be used temporarily during migration periods.'
      );
    }
  }

  checkProxyConfig(config) {
    const proxyConfig = config.defaultConfig || {};

    if (proxyConfig.privileged === true) {
      this.addFinding(
        'High', 'Proxy Configuration', 'Proxies are running in privileged mode',
        'Avoid running proxies in privileged mode unless absolutely necessary',
        'defaultConfig.privileged'
      );
    }

    if (proxyConfig.image && proxyConfig.image.includes(':')) {
      const version = proxyConfig.image.split(':')[1];
      if (version === 'latest' || version === 'master') {
        this.addFinding(
          'Medium', 'Proxy Configuration', `Using non-specific proxy image version: ${version}`,
          'Use specific, pinned versions of proxy images',
          'defaultConfig.image'
        );
      }
    }

    if (proxyConfig.holdApplicationUntilProxyStarts !== true) {
      this.addFinding(
        'Medium', 'Proxy Configuration', 'Applications may start before proxy initialization is complete',
        'Set holdApplicationUntilProxyStarts to true to prevent traffic leaks',
        'defaultConfig.holdApplicationUntilProxyStarts',
        ['CM-7', 'SC-7', 'AC-4', 'SC-8'],
        'NIST SP 800-53 Rev. 5 (CM-7) requires implementing the principle of least functionality. According to NIST SP 800-204B, a service mesh must ensure that all traffic is intercepted by the proxy. When applications start before the proxy is ready, traffic can bypass the mesh controls, creating a potential security gap. This violates traffic flow enforcement (AC-4) and boundary protection (SC-7) requirements, as unencrypted traffic might leave the pod without proper controls or encryption.'
      );
    }
  }

  checkSDS(config) {
    const proxyConfig = config.defaultConfig || {};

    if (!proxyConfig.sds || !proxyConfig.sds.enabled) {
      this.addFinding(
        'Medium', 'Secret Discovery Service', 'SDS is not enabled for certificate management',
        'Enable SDS for secure certificate distribution and rotation',
        'defaultConfig.sds.enabled',
        ['SC-12', 'IA-5', 'SC-8', 'SC-13'],
        'NIST SP 800-53 Rev. 5 (SC-12) requires proper cryptographic key establishment and management. The Secret Discovery Service (SDS) is a critical component for secure certificate distribution in service meshes. Without SDS, certificate handling is less secure and requires manual management. NIST SP 800-57 specifies that cryptographic materials should be securely provisioned and rotated. SDS enables automatic certificate distribution and rotation, minimizing exposure of sensitive key material and simplifying compliance with authenticator management requirements (IA-5).'
      );
    }
  }

  checkTrustDomain(config) {
    if (!config.trustDomain) {
      this.addFinding(
        'Medium', 'Trust Domain', 'Trust domain not explicitly configured',
        'Set a specific trust domain for your mesh to isolate identities',
        'trustDomain',
        ['IA-2', 'IA-5', 'AC-3', 'SC-16'],
        'NIST SP 800-53 Rev. 5 (IA-2) requires proper identification of system users and processes. In service meshes, the trust domain is foundational for service identity and authentication. According to NIST SP 800-204B, service mesh implementations must establish trust boundaries. Without an explicitly configured trust domain, services may not be properly isolated, potentially allowing identity spoofing across different security contexts. NIST SP 800-204A emphasizes that service identities must be bound to specific security domains, which requires explicit trust domain configuration.'
      );
    } else if (config.trustDomain === 'cluster.local') {
      this.addFinding(
        'Low', 'Trust Domain', 'Using default trust domain (cluster.local)',
        'Consider setting a custom trust domain specific to your organization',
        'trustDomain',
        ['IA-2', 'IA-5', 'AC-16'],
        'NIST SP 800-53 Rev. 5 (AC-16) requires implementing security attributes for information and resources. Using the default trust domain (cluster.local) rather than a customized domain specific to your organization reduces the ability to uniquely identify and isolate your mesh. NIST SP 800-204B recommends using organization-specific trust domains to prevent potential identity conflicts when interacting with external meshes and to establish clear security boundaries between different organizational domains.'
      );
    }
  }

  checkAuthorizationPolicies(config) {
    if (!config.defaultAuthorizationPolicy || config.defaultAuthorizationPolicy.action !== 'DENY') {
      this.addFinding(
        'High', 'Authorization', 'No default deny policy is configured at mesh level',
        'Configure a default DENY policy and explicitly allow required traffic',
        'defaultAuthorizationPolicy'
      );
    }
  }

  checkTelemetry(config) {
    const telemetry = config.telemetry || {};

    if (!telemetry.enabled) {
      this.addFinding(
        'Medium', 'Telemetry', 'Telemetry collection is disabled',
        'Enable telemetry for security monitoring and incident detection',
        'telemetry.enabled',
        ['AU-2', 'AU-12', 'SI-4', 'IR-4', 'IR-5'],
        'NIST SP 800-53 Rev. 5 (SI-4) requires information system monitoring capabilities. According to NIST SP 800-204B, telemetry data is essential for detecting anomalies and security incidents within service meshes. Without telemetry collection, security teams lack visibility into service behavior, traffic patterns, and potential security violations. NIST SP 800-53 Rev. 5 (IR-4 and IR-5) emphasize the importance of incident monitoring and tracking, which relies on telemetry data to identify and respond to security incidents in complex microservices environments.'
      );
    }

    if (!telemetry.accessLogging || !telemetry.accessLogging.enabled) {
      this.addFinding(
        'Medium', 'Access Logging', 'Access logging is not enabled',
        'Enable access logging for security auditing and forensics',
        'telemetry.accessLogging.enabled',
        ['AU-3', 'AU-12', 'AU-14', 'SI-4'],
        'NIST SP 800-53 Rev. 5 (AU-3) requires the system to generate audit records containing specific information about events. Access logging in service meshes is critical for capturing details about all service-to-service communications, including source and destination identities, request paths, and response codes. NIST SP 800-204A recommends capturing detailed logs for all service interactions. Without access logging, organizations cannot perform effective security analysis, forensic investigations, or demonstrate compliance with regulatory requirements that mandate audit trails of system access and activity.'
      );
    }
  }

  checkRBAC(config) {
    if (!config.rbac || config.rbac.mode !== 'ON') {
      this.addFinding(
        'Critical', 'RBAC', 'RBAC enforcement is not enabled',
        'Enable RBAC to control service-to-service authorization',
        'rbac.mode',
        ['AC-3', 'AC-4', 'CM-7'],
        'NIST SP 800-204B explicitly recommends implementing authorization policies to control service-to-service communication. According to NIST, "authorization policies provide a more secure deployment by limiting which services can communicate with each other." Without RBAC, any authenticated service can access any other service in the mesh, violating the principle of least privilege. NIST SP 800-204A emphasizes that "authorization policies protect services against unauthorized access even from other services within the mesh."'
      );
    }
  }

  checkOutboundTrafficPolicy(config) {
    const outboundTrafficPolicy = config.outboundTrafficPolicy || {};

    if (outboundTrafficPolicy.mode !== 'REGISTRY_ONLY') {
      this.addFinding(
        'High', 'Traffic Policy', 'Outbound traffic to external services is allowed by default',
        'Set outboundTrafficPolicy.mode to REGISTRY_ONLY to restrict external access',
        'outboundTrafficPolicy.mode',
        ['AC-4', 'SC-7', 'CM-7', 'CA-3'],
        'NIST SP 800-204B emphasizes the importance of controlling traffic flow in and out of the service mesh. According to NIST SP 800-207 (Zero Trust Architecture), "all resource access should be determined by policy" and "access to resources is granted on a per-session basis." Allowing unrestricted outbound traffic creates potential data exfiltration pathways and expands the attack surface by permitting connections to unauthorized external endpoints. This violates the principle of least functionality outlined in NIST SP 800-53 Rev. 5.'
      );
    }
  }
}

class ConsulSecurityAnalyzer extends BaseSecurityAnalyzer {
  constructor() {
    super();
    this.fedRAMPMode = true;
  }

  analyze(config) {
    this.reset();

    if (!config) {
      this.addFinding('Critical', 'File Format', 'Invalid or empty configuration file', 'Provide a valid Consul configuration');
      return this.findings;
    }

    if (config.mesh_type !== 'consul') {
      this.addFinding('Critical', 'Resource Type', 'File is not a Consul service mesh configuration', 'Ensure the file has mesh_type field set to "consul"');
      return this.findings;
    }

    this.checkConnect(config);
    this.checkTLS(config);
    this.checkACL(config);
    this.checkTelemetry(config);
    this.checkAutoEncrypt(config);
    this.checkAutoConfig(config);
    this.checkGossipEncryption(config);

    if (this.fedRAMPMode) {
      this.checkFedRAMPCompliance(config);
    }

    return this.findings;
  }

  checkConnect(config) {
    const connect = config.connect || {};

    if (!connect.enabled) {
      this.addFinding('Critical', 'Service Mesh', 'Consul service mesh is not enabled',
        'Enable connect.enabled for service-to-service communication security', 'connect.enabled');
    }

    const proxy = connect.proxy || {};
    if (proxy.allow_privileged === true) {
      this.addFinding('High', 'Proxy Security', 'Proxies are allowed to run in privileged mode',
        'Disable connect.proxy.allow_privileged to prevent proxies from running with elevated privileges',
        'connect.proxy.allow_privileged');
    }

    const caConfig = connect.ca_config || {};

    if (connect.ca_provider === 'consul') {
      this.addFinding('Medium', 'Certificate Authority', 'Using built-in Consul CA instead of an external CA',
        'Consider using a production-grade external CA for production environments', 'connect.ca_provider');
    }

    if (caConfig.root_cert_ttl && caConfig.root_cert_ttl.includes('h')) {
      const hours = parseInt(caConfig.root_cert_ttl);
      if (hours > 8760) {
        this.addFinding('Medium', 'Certificate Security', 'Root certificate has a very long TTL',
          'Consider shorter certificate validity periods for better security', 'connect.ca_config.root_cert_ttl');
      }
    }

    if (!caConfig.leaf_cert_ttl) {
      this.addFinding('Medium', 'Certificate Security', 'Leaf certificate TTL not explicitly configured',
        'Set appropriate leaf_cert_ttl value based on your security policies', 'connect.ca_config.leaf_cert_ttl');
    }
  }

  checkTLS(config) {
    const tls = config.tls || {};
    const defaults = tls.defaults || {};
    const internalRpc = tls.internal_rpc || {};

    if (defaults.verify_incoming !== true) {
      this.addFinding('High', 'TLS Security', 'TLS verify_incoming is not enabled',
        'Enable tls.defaults.verify_incoming to validate client certificates',
        'tls.defaults.verify_incoming',
        ['SC-8', 'SC-13', 'IA-2', 'IA-5'],
        'NIST SP 800-52 Rev. 2 ("Guidelines for TLS Implementations") emphasizes the importance of certificate validation. Without incoming certificate verification, the system cannot verify the authenticity of client connections, potentially allowing unauthorized clients to establish connections. NIST states that "certificates presented to a relying party shall be validated to ensure that they are legitimate, and have not been revoked or compromised." Disabling this setting bypasses this essential security control.');
    }

    if (defaults.verify_outgoing !== true) {
      this.addFinding('High', 'TLS Security', 'TLS verify_outgoing is not enabled',
        'Enable tls.defaults.verify_outgoing to validate server certificates',
        'tls.defaults.verify_outgoing',
        ['SC-8', 'SC-13', 'SC-23'],
        'NIST SP 800-52 Rev. 2 requires TLS implementations to validate server certificates. Without outgoing certificate verification, clients cannot verify server identities, making them vulnerable to man-in-the-middle attacks. According to NIST, "a client that receives a certificate shall validate the TLS server\'s certificate in accordance with the certification path validation rules specified in Section 6 of RFC 5280." Disabling outgoing verification exposes the system to potential impersonation and credential theft.');
    }

    if (internalRpc.verify_server_hostname !== true) {
      this.addFinding('High', 'TLS Security', 'Server hostname verification is not enabled for internal RPC',
        'Enable tls.internal_rpc.verify_server_hostname to prevent MITM attacks',
        'tls.internal_rpc.verify_server_hostname',
        ['SC-8', 'SC-23', 'IA-5'],
        'NIST SP 800-52 Rev. 2 specifically requires hostname verification as part of certificate validation. According to NIST, "the client shall verify the server identity, as described in Section 6 of RFC 6125." Without hostname verification, an attacker with a valid certificate for one hostname could impersonate a server with a different hostname, allowing for lateral movement within the service mesh. This is particularly critical for internal RPC communications, which often involve privileged operations.');
    }
  }

  checkACL(config) {
    const acl = config.acl || {};

    if (acl.enabled !== true) {
      this.addFinding('Critical', 'Access Control', 'ACL system is not enabled',
        'Enable acl.enabled to control access to Consul resources',
        'acl.enabled',
        ['AC-3', 'AC-4', 'AC-17', 'CM-7'],
        'NIST SP 800-204B recommends implementing access control for all service mesh components. Without ACLs, there is no mechanism to restrict which entities can access Consul resources and APIs. NIST SP 800-53 Rev. 5 (AC-3) requires that "the system enforces approved authorizations for logical access to information and system resources." Disabled ACLs allow unrestricted access to service registrations, key-value store, and other sensitive resources within the Consul deployment.');
    }

    if (acl.default_policy === 'allow') {
      this.addFinding('High', 'Access Control', 'ACL default policy is set to "allow"',
        'Set acl.default_policy to "deny" and explicitly allow required operations',
        'acl.default_policy',
        ['AC-3', 'CM-7', 'CM-6'],
        'NIST SP 800-204B advocates for deny-by-default access control policies in line with zero trust principles. According to NIST SP 800-53 Rev. 5 (CM-7), systems should be configured using least functionality, "providing only essential capabilities." A default policy of "allow" contradicts this principle by permitting all actions unless explicitly denied, potentially allowing unauthorized access and violating the principle of least privilege.');
    }

    const tokens = acl.tokens || {};
    if (!tokens.agent || tokens.agent === '') {
      this.addFinding('High', 'Access Control', 'Agent token is not configured',
        'Set a specific agent token with appropriate permissions',
        'acl.tokens.agent',
        ['IA-2', 'IA-5', 'AC-3'],
        'NIST SP 800-204A emphasizes the importance of properly configured service identity. Per NIST SP 800-53 Rev. 5 (IA-5), systems must "create, implement, and maintain specific procedures and configurations for organization-defined authenticators." Without a configured agent token, Consul agents may use the anonymous token or other default credentials, reducing accountability and increasing the risk of unauthorized access to the Consul cluster.');
    }

    if (!tokens.default || tokens.default === '') {
      this.addFinding('Medium', 'Access Control', 'Default token is not configured',
        'Set a specific default token with minimal permissions',
        'acl.tokens.default',
        ['IA-5', 'AC-3', 'CM-6'],
        'NIST SP 800-204B recommends restricting default access. According to NIST SP 800-53 Rev. 5 (CM-6), organizations should "establish and document configuration settings" that are consistent with least functionality principles. An unconfigured default token may fall back to using anonymous access or default permissions that are too permissive, potentially allowing unauthorized operations within the Consul cluster.');
    }
  }

  checkTelemetry(config) {
    const telemetry = config.telemetry || {};

    if (telemetry.enable_service_metrics !== true) {
      this.addFinding('Medium', 'Monitoring', 'Service metrics are not enabled',
        'Enable telemetry.enable_service_metrics for security monitoring and incident detection',
        'telemetry.enable_service_metrics');
    }
  }

  checkAutoEncrypt(config) {
    const autoEncrypt = config.auto_encrypt || {};

    if (autoEncrypt.tls !== true) {
      this.addFinding('Medium', 'Encryption', 'Auto-encrypt feature is not enabled for TLS',
        'Enable auto_encrypt.tls for automatic TLS certificate distribution', 'auto_encrypt.tls');
    }
  }

  checkAutoConfig(config) {
    const autoConfig = config.auto_config || {};

    if (autoConfig.enabled !== true) {
      this.addFinding('Low', 'Configuration Management', 'Auto-config feature is not enabled',
        'Consider enabling auto_config.enabled for secure configuration management', 'auto_config.enabled');
    }

    if (autoConfig.authorization && autoConfig.authorization.enabled !== true) {
      this.addFinding('Medium', 'Authorization', 'Auto-config authorization is not enabled',
        'Enable auto_config.authorization.enabled for secure auto-config', 'auto_config.authorization.enabled');
    }
  }

  checkGossipEncryption(config) {
    const gossip = config.gossip || {};

    if (!gossip.encryption || !gossip.encryption.key) {
      this.addFinding('Critical', 'Gossip Security', 'Gossip encryption key is not configured',
        'Configure gossip.encryption.key to encrypt Consul gossip protocol communications',
        'gossip.encryption.key',
        ['SC-8', 'SC-12', 'SC-13'],
        'NIST SP 800-53 Rev. 5 requires the protection of transmitted information (SC-8). According to NIST SP 800-204B, inter-node communications like gossip protocols must be encrypted to prevent eavesdropping and tampering. Without gossip encryption, cluster state information, including service addresses and health data, is transmitted in plaintext, potentially allowing attackers to gather intelligence about the service mesh infrastructure or inject false information into the gossip stream.');
    } else if (gossip.encryption.key.length < 32) {
      this.addFinding('High', 'Gossip Security', 'Gossip encryption key may be too short',
        'Use a strong encryption key of at least 32 characters for gossip encryption',
        'gossip.encryption.key',
        ['SC-12', 'SC-13', 'IA-5'],
        'NIST SP 800-57 ("Recommendation for Key Management") provides guidelines for cryptographic key length based on the required security strength. According to NIST, keys must have sufficient length to provide the required cryptographic strength. Short encryption keys can be vulnerable to brute force attacks. NIST recommends symmetric keys of at least 128 bits (which corresponds to 32 hexadecimal characters) for adequate security protection through 2030.');
    }

    if (gossip.verify_incoming !== true || gossip.verify_outgoing !== true) {
      this.addFinding('High', 'Gossip Security', 'Gossip message verification is not fully enabled',
        'Enable both gossip.verify_incoming and gossip.verify_outgoing for secure cluster communication',
        'gossip.verify_incoming/outgoing',
        ['SC-8', 'SC-23', 'IA-2'],
        'NIST SP 800-53 Rev. 5 (SC-8) requires the protection of transmission integrity. NIST SP 800-204B emphasizes the importance of authenticating all inter-service and inter-node communications. Without message verification, an attacker could potentially inject malicious gossip messages into the cluster, causing denial of service or routing to malicious nodes. Enabling both incoming and outgoing verification ensures that nodes only process legitimate gossip messages from authenticated sources.');
    }
  }

  checkFedRAMPCompliance(config) {
    const connect = config.connect || {};
    const caConfig = connect.ca_config || {};
    const tls = config.tls || {};

    if (!tls.cipher_suites || tls.cipher_suites.length === 0) {
      this.addFinding('High', 'FedRAMP Compliance', 'No explicit TLS cipher suites configured',
        'Explicitly configure FIPS-compliant cipher suites in tls.cipher_suites for FedRAMP compliance',
        'tls.cipher_suites',
        ['SC-8', 'SC-13', 'CM-6'],
        'NIST SP 800-52 Rev. 2 requires the use of specific cipher suites that provide adequate security. According to NIST, "servers that support government-only applications shall be configured to use cipher suites that are composed entirely of FIPS-approved algorithms." FedRAMP builds on this requirement by mandating FIPS 140-2 validated cryptographic modules. Without explicit cipher suite configuration, the system may use weak or non-compliant ciphers that do not meet federal security requirements.');
    }

    if (!tls.min_version || tls.min_version < "TLSv1.2") {
      this.addFinding('Critical', 'FedRAMP Compliance', 'TLS minimum version not set to TLS 1.2 or higher',
        'Configure tls.min_version to "TLSv1.2" or higher for FedRAMP compliance',
        'tls.min_version',
        ['SC-8', 'SC-13', 'CM-6'],
        'NIST SP 800-52 Rev. 2 explicitly requires the use of TLS 1.2 or higher for all federal systems. Earlier versions of TLS (1.0 and 1.1) have known vulnerabilities that cannot be mitigated. NIST states: "Servers that support government-only applications shall be configured to use TLS 1.2, and should be configured to use TLS 1.3 as well." FedRAMP compliance requires adherence to this standard to protect the confidentiality and integrity of data in transit.');
    }

    if (!config.secure_bootstrap || config.secure_bootstrap !== true) {
      this.addFinding('High', 'FedRAMP Compliance', 'Secure bootstrapping is not enabled',
        'Enable secure_bootstrap for ensuring secure cluster initialization',
        'secure_bootstrap',
        ['CM-2', 'CM-6', 'SC-7', 'SC-8'],
        'NIST SP 800-53 Rev. 5 emphasizes the importance of secure system initialization. According to NIST SP 800-124, "organizations should implement and test a secure configuration prior to deployment." Secure bootstrapping ensures that Consul clusters initialize with proper authentication and encryption, preventing unauthorized access during the critical startup phase. Without secure bootstrapping, the cluster may be vulnerable to tampering or compromise during initialization.');
    }

    if (!caConfig.rotation_period || !caConfig.rotate_cert_ttl) {
      this.addFinding('Medium', 'FedRAMP Compliance', 'Certificate rotation settings not fully configured',
        'Configure connect.ca_config.rotation_period and rotate_cert_ttl for regular certificate rotation',
        'connect.ca_config.rotation_period',
        ['SC-12', 'IA-5', 'SC-13'],
        'NIST SP 800-57 ("Recommendation for Key Management") mandates that cryptographic keys and certificates be rotated regularly to minimize the impact of potential compromises. According to NIST, "a compromise of the system or storage media on which keys are stored may result in the unauthorized disclosure of those keys." FedRAMP builds on this by requiring documented key rotation processes. Without proper rotation settings, certificates may remain valid for extended periods, increasing the risk window if compromised.');
    }

    if (!config.audit || config.audit.enabled !== true) {
      this.addFinding('Critical', 'FedRAMP Compliance', 'Audit logging is not enabled',
        'Enable audit.enabled for capturing security events required by FedRAMP',
        'audit.enabled',
        ['AU-2', 'AU-3', 'AU-12', 'SI-4'],
        'NIST SP 800-53 Rev. 5 requires comprehensive audit logging for security-relevant events. According to NIST, "organizations must identify the subset of events that are relevant to security concerns and focus logging efforts accordingly." FedRAMP specifically mandates audit logging for all authentication and authorization decisions. Without audit logging enabled, the system cannot track access attempts, configuration changes, or other security-critical events, severely limiting incident response capabilities.');
    }

    if (config.services) {
      const services = Array.isArray(config.services) ? config.services : [config.services];

      services.forEach((service, index) => {
        if (service.connect && !service.connect.sidecar_service) {
          this.addFinding('Medium', 'FedRAMP Compliance',
            `Service "${service.name || index}" registered without sidecar proxy configuration`,
            'Configure connect.sidecar_service for all services to enforce mTLS',
            `services[${index}].connect.sidecar_service`);
        }

        if (service.connect && service.connect.sidecar_service && service.connect.sidecar_service.proxy) {
          const proxy = service.connect.sidecar_service.proxy;

          if (proxy.local_service_address !== "127.0.0.1" && proxy.local_service_address !== "localhost") {
            this.addFinding('High', 'FedRAMP Compliance',
              `Service "${service.name || index}" proxy configured to non-localhost address`,
              'Set connect.sidecar_service.proxy.local_service_address to "127.0.0.1" for security',
              `services[${index}].connect.sidecar_service.proxy.local_service_address`);
          }
        }
      });
    }

    const acl = config.acl || {};
    if (acl.default_policy !== "deny") {
      this.addFinding('Critical', 'FedRAMP Compliance', 'ACL default policy is not set to "deny"',
        'Set acl.default_policy to "deny" for FedRAMP compliance (zero-trust model)', 'acl.default_policy');
    }
  }
}

class LinkerdSecurityAnalyzer extends BaseSecurityAnalyzer {
  constructor() {
    super();
  }

  analyze(config) {
    this.reset();

    if (!config) {
      this.addFinding('Critical', 'File Format', 'Invalid or empty configuration file', 'Provide a valid Linkerd configuration');
      return this.findings;
    }

    if (config.mesh_type !== 'linkerd') {
      this.addFinding('Critical', 'Resource Type', 'File is not a Linkerd service mesh configuration', 'Ensure the file has mesh_type field set to "linkerd"');
      return this.findings;
    }

    this.checkTLS(config);
    this.checkIdentity(config);
    this.checkProxyConfig(config);
    this.checkPolicy(config);
    this.checkAuthenticationPolicy(config);
    this.checkTracing(config);
    this.checkMetrics(config);
    this.checkDestinationRules(config);

    return this.findings;
  }

  checkTLS(config) {
    const tls = config.tls || {};

    if (!tls.enabled) {
      this.addFinding('Critical', 'TLS Security', 'TLS is not enabled for the mesh',
        'Enable TLS for secure service-to-service communication',
        'tls.enabled',
        ['SC-8', 'SC-13', 'IA-5', 'SC-23'],
        'NIST SP 800-204B recommends implementing Transport Layer Security for service-to-service communications. Without TLS, traffic between services is transmitted in plaintext and may be intercepted or tampered with, leading to unauthorized access or data breaches.');
    }

    if (tls.enabled && !tls.enforced) {
      this.addFinding('High', 'TLS Security', 'TLS is enabled but not enforced (PERMISSIVE mode)',
        'Enable TLS enforcement to ensure all traffic is encrypted',
        'tls.enforced',
        ['SC-8', 'CM-6', 'CM-7'],
        'NIST SP 800-204A recommends enforcing TLS for all service communications. Permissive mode allows unencrypted traffic to flow within the mesh, potentially exposing sensitive data to interception.');
    }

    if (tls.cipherSuites) {
      const weakCiphers = tls.cipherSuites.filter(cipher =>
        cipher.includes('NULL') || cipher.includes('EXPORT') || cipher.includes('DES') ||
        cipher.includes('RC4') || cipher.includes('MD5')
      );

      if (weakCiphers.length > 0) {
        this.addFinding('Critical', 'TLS Security', 'Weak TLS cipher suites configured: ' + weakCiphers.join(', '),
          'Remove weak cipher suites and use only strong, modern ciphers',
          'tls.cipherSuites',
          ['SC-8', 'SC-13', 'CM-6'],
          'NIST SP 800-52 Rev. 2 explicitly prohibits the use of known weak cipher suites. These deprecated algorithms have known vulnerabilities and can be exploited to decrypt traffic, potentially leading to data exposure.');
      }
    }

    if (!tls.minimumVersion || tls.minimumVersion < 'TLSv1.2') {
      this.addFinding('High', 'TLS Security', 'TLS minimum version is set below TLS 1.2',
        'Configure minimum TLS version to 1.2 or higher',
        'tls.minimumVersion',
        ['SC-8', 'SC-13', 'CM-6'],
        'NIST SP 800-52 Rev. 2 requires the use of TLS 1.2 or higher for all government systems. Earlier versions of TLS have known vulnerabilities that cannot be mitigated through configuration.');
    }
  }

  checkIdentity(config) {
    const identity = config.identity || {};

    if (!identity.enabled) {
      this.addFinding('Critical', 'Service Identity', 'Service identity feature is not enabled',
        'Enable the identity feature to allow secure service-to-service authentication',
        'identity.enabled',
        ['IA-2', 'IA-5', 'SC-8'],
        'NIST SP 800-204B emphasizes the importance of strong identity for components within service mesh architectures. Without service identity, the mesh cannot securely authenticate services to each other, potentially allowing unauthorized services to connect.');
    }

    if (identity.issuer === 'self-signed') {
      this.addFinding('Medium', 'Certificate Authority', 'Using self-signed certificates for service identity',
        'Consider using an external certificate authority for production environments',
        'identity.issuer',
        ['SC-12', 'IA-5'],
        'NIST SP 800-57 provides guidelines for cryptographic key management and recommends using proper certificate authorities in production environments. Self-signed certificates lack the security controls and processes required for high-security environments.');
    }

    if (identity.certValidityPeriod && identity.certValidityPeriod > 8760) {
      this.addFinding('Medium', 'Certificate Security', 'Certificate validity period is set to a long duration',
        'Reduce certificate validity period for better security',
        'identity.certValidityPeriod',
        ['IA-5', 'SC-12'],
        'NIST SP 800-57 recommends shorter certificate validity periods with automatic rotation to minimize risk while maintaining operational continuity. The longer a certificate is valid, the greater the window of opportunity for attackers if keys are compromised.');
    }

    if (!identity.trustAnchorsPEM || identity.trustAnchorsPEM.length === 0) {
      this.addFinding('High', 'Trust Chain', 'No trust anchors configured for the identity system',
        'Configure proper trust anchors to validate service identities',
        'identity.trustAnchorsPEM',
        ['IA-5', 'SC-12'],
        'NIST SP 800-57 requires proper trust anchors for certificate validation. Without configured trust anchors, the system cannot verify the authenticity of service identities, potentially allowing unauthorized services to join the mesh.');
    }
  }

  checkProxyConfig(config) {
    const proxy = config.proxy || {};

    if (proxy.privileged === true) {
      this.addFinding('High', 'Proxy Security', 'Proxies are configured to run in privileged mode',
        'Avoid running proxies with privileged access unless absolutely necessary',
        'proxy.privileged',
        ['CM-7', 'AC-3', 'AC-6'],
        'NIST SP 800-53 Rev. 5 emphasizes the principle of least privilege. Running proxies in privileged mode grants them unnecessary permissions that could be exploited if the proxy is compromised, potentially leading to escalation of privileges within the host system.');
    }

    if (proxy.image && proxy.image.includes(':latest')) {
      this.addFinding('Medium', 'Image Security', 'Using :latest tag for proxy image instead of a specific version',
        'Pin to specific proxy image versions for stability and security',
        'proxy.image',
        ['CM-2', 'CM-6'],
        'NIST SP 800-53 Rev. 5 requires establishing baseline configurations. Using the :latest tag can result in unexpected proxy updates that may introduce bugs or compatibility issues. Pinning to specific versions ensures consistent and tested behavior.');
    }

    if (!proxy.outboundConnectTimeout) {
      this.addFinding('Low', 'Proxy Configuration', 'No outbound connection timeout configured',
        'Set reasonable timeout values to limit the impact of connectivity issues',
        'proxy.outboundConnectTimeout',
        ['SI-4', 'SC-5', 'SC-6'],
        'NIST SP 800-53 Rev. 5 recommends configurations that limit the impact of potential denial of service conditions. Without connection timeouts, proxies may maintain connection attempts indefinitely, potentially exhausting connection resources.');
    }

    if (!proxy.resources || !proxy.resources.cpu || !proxy.resources.memory) {
      this.addFinding('Medium', 'Resource Management', 'Resource limits not fully configured for proxies',
        'Set appropriate CPU and memory limits for all proxies',
        'proxy.resources',
        ['SC-6', 'CM-2', 'CM-6'],
        'NIST SP 800-53 Rev. 5 (SC-6) requires resource availability protection to ensure availability of resources for critical capabilities. Without defined resource limits, proxies may consume excessive resources during traffic spikes or when compromised, potentially affecting the availability of other services on the same hosts.');
    }
  }

  checkPolicy(config) {
    const policy = config.policy || {};

    if (!policy.enabled) {
      this.addFinding('High', 'Authorization', 'Policy enforcement is not enabled',
        'Enable policy enforcement to control service-to-service communication',
        'policy.enabled',
        ['AC-3', 'AC-4', 'CM-7'],
        'NIST SP 800-204B recommends implementing authorization policies to control service-to-service communication. Without policy enforcement, any authenticated service can access any other service, violating the principle of least privilege.');
    }

    if (policy.enabled && !policy.defaultDeny) {
      this.addFinding('Medium', 'Authorization', 'Default allow policy is in effect',
        'Configure a default deny policy and explicitly allow required traffic',
        'policy.defaultDeny',
        ['AC-3', 'CM-7', 'AC-4'],
        'NIST SP 800-204A recommends a deny-by-default approach aligned with zero trust architecture principles. A default allow policy permits all traffic unless explicitly denied, contradicting the principle of least privilege and potentially allowing unauthorized access between services.');
    }

    if (policy.enabled && policy.serverPolicies && policy.serverPolicies.length === 0) {
      this.addFinding('Medium', 'Authorization', 'No server policies defined despite policy enforcement being enabled',
        'Define specific server policies to control which clients can access each service',
        'policy.serverPolicies',
        ['AC-3', 'AC-4', 'AC-5', 'CM-7'],
        'NIST SP 800-53 Rev. 5 requires implementing access controls that restrict which resources can be accessed by authenticated entities. Without defined server policies, the authorization system lacks the rules needed to make proper access decisions.');
    }

    if (policy.enabled && policy.serverPolicies && policy.serverPolicies.length > 0) {
      const permissivePolicies = policy.serverPolicies.filter(p =>
        p.clients && p.clients.some(c => !c.namespace || c.namespace === '*')
      );

      if (permissivePolicies.length > 0) {
        this.addFinding('Medium', 'Authorization', 'Overly permissive server policies detected',
          'Avoid wildcard namespace selectors in policy definitions',
          'policy.serverPolicies[].clients[].namespace',
          ['AC-3', 'AC-6', 'CM-7'],
          'NIST SP 800-53 Rev. 5 (AC-6) requires implementing the principle of least privilege. Policies with wildcard namespace selectors allow access from any namespace, violating this principle and potentially allowing unexpected cross-namespace access that increases the attack surface.');
      }
    }
  }

  checkAuthenticationPolicy(config) {
    const authn = config.authentication || {};

    if (!authn.enabled) {
      this.addFinding('Critical', 'Authentication', 'Authentication policy enforcement is not enabled',
        'Enable authentication to verify service identities',
        'authentication.enabled',
        ['IA-2', 'IA-5', 'SC-8'],
        'NIST SP 800-204A emphasizes the importance of strong authentication between services. Without authentication enforcement, services cannot verify the identity of calling services, potentially allowing impersonation attacks.');
    }

    if (authn.enabled && authn.mode !== 'strict') {
      this.addFinding('High', 'Authentication', 'Authentication mode is not set to strict',
        'Use strict authentication mode to require authentication for all traffic',
        'authentication.mode',
        ['IA-2', 'SC-8', 'CM-6'],
        'NIST SP 800-204B emphasizes that authentication policies should be strictly enforced. Non-strict modes allow unauthenticated traffic, creating security vulnerabilities and inconsistent policy enforcement across the mesh.');
    }
  }

  checkTracing(config) {
    const tracing = config.tracing || {};

    if (!tracing.enabled) {
      this.addFinding('Medium', 'Observability', 'Distributed tracing is not enabled',
        'Enable tracing for better security monitoring and incident response',
        'tracing.enabled',
        ['AU-2', 'AU-3', 'SI-4'],
        'NIST SP 800-53 Rev. 5 requires monitoring information systems to detect and analyze attacks. Distributed tracing provides valuable data for security monitoring, incident investigation, and forensic analysis by tracking request flows through the service mesh.');
    }

    if (tracing.enabled && !tracing.sampling) {
      this.addFinding('Low', 'Observability', 'Tracing sampling rate not configured',
        'Configure sampling rate to balance observability with performance',
        'tracing.sampling',
        ['AU-2', 'CM-6', 'AU-12'],
        'NIST SP 800-53 Rev. 5 recommends configuring auditing to capture sufficient data while minimizing operational impact. Without a configured sampling rate, the system may default to sampling all requests, potentially impacting performance, or too few requests, reducing security visibility.');
    }

    if (tracing.enabled && (!tracing.collector || !tracing.collector.service)) {
      this.addFinding('Medium', 'Observability', 'Tracing collector service not configured',
        'Configure a tracing collector service to capture distributed traces',
        'tracing.collector.service',
        ['AU-3', 'AU-12', 'SI-4'],
        'NIST SP 800-53 Rev. 5 (AU-3) requires that audit records contain information to establish what events occurred. Without a properly configured tracing collector, trace data will not be captured and stored, preventing effective monitoring and incident investigation. Distributed tracing is essential for understanding service-to-service communication patterns and identifying potential security issues in microservices environments.');
    }
  }

  checkMetrics(config) {
    const metrics = config.metrics || {};

    if (!metrics.enabled) {
      this.addFinding('Medium', 'Observability', 'Metrics collection is not enabled',
        'Enable metrics for monitoring and detecting security anomalies',
        'metrics.enabled',
        ['SI-4', 'AU-2', 'AU-12'],
        'NIST SP 800-53 Rev. 5 requires monitoring information systems to detect attacks and indicators of potential attacks. Metrics provide critical data for detecting anomalies, potential security incidents, and performance issues within the service mesh.');
    }

    if (metrics.enabled && (!metrics.prometheus || !metrics.prometheus.enabled)) {
      this.addFinding('Low', 'Observability', 'Prometheus metrics endpoint not enabled',
        'Enable Prometheus metrics for integration with security monitoring systems',
        'metrics.prometheus.enabled',
        ['SI-4', 'AU-2', 'AU-6'],
        'NIST SP 800-53 Rev. 5 recommends monitoring capabilities that can integrate with enterprise security monitoring. Prometheus has become a standard for metrics collection and enables integration with various security monitoring and alerting tools.');
    }

    if (metrics.enabled && (!metrics.retention || parseInt(metrics.retention) < 4)) {
      const retentionTime = metrics.retention ? metrics.retention : 'not configured';
      this.addFinding('Low', 'Observability', `Metrics retention period (${retentionTime}) may be insufficient for security analysis`,
        'Configure metrics retention period of at least 24h for security analysis purposes',
        'metrics.retention',
        ['AU-4', 'AU-11', 'SI-4'],
        'NIST SP 800-53 Rev. 5 (AU-11) requires organizations to retain audit records for a specific period to provide support for after-the-fact investigations of security incidents. Short retention periods or unconfigured defaults limit the ability to perform historical analysis and investigate potential security incidents that may have occurred in the past.');
    }
  }

  checkDestinationRules(config) {
    const destinationRules = config.destinationRules || [];

    const rulesWithoutTLS = destinationRules.filter(rule => !rule.tls || !rule.tls.mode);
    if (rulesWithoutTLS.length > 0) {
      this.addFinding('Medium', 'Traffic Security', `${rulesWithoutTLS.length} destination rules found without TLS configuration`,
        'Configure TLS settings for all destination rules',
        'destinationRules[].tls',
        ['SC-8', 'CM-6', 'SC-13'],
        'NIST SP 800-204B emphasizes the importance of protecting data in transit. Destination rules without TLS settings may allow unencrypted traffic, potentially exposing sensitive data. All destination rules should have explicit TLS settings to ensure consistent security posture.');
    }

    const plaintextRules = destinationRules.filter(rule => rule.tls && rule.tls.mode === 'DISABLE');
    if (plaintextRules.length > 0) {
      this.addFinding('High', 'Traffic Security', `${plaintextRules.length} destination rules explicitly disable TLS`,
        'Avoid disabling TLS in destination rules',
        'destinationRules[].tls.mode',
        ['SC-8', 'SC-13', 'CM-7', 'SC-23'],
        'NIST SP 800-53 Rev. 5 (SC-8) requires the protection of transmission confidentiality and integrity. Explicitly disabling TLS in destination rules creates gaps in the security posture, allowing plaintext traffic that could be intercepted or modified by attackers.');
    }

    const systemNamespaceRules = destinationRules.filter(rule =>
      rule.host && (
        rule.host.includes("kube-system") || rule.host.includes("istio-system") ||
        rule.host.includes("linkerd-") || rule.host.includes("consul-")
      ) && (!rule.tls || rule.tls.mode === 'DISABLE')
    );

    if (systemNamespaceRules.length > 0) {
      this.addFinding('Critical', 'System Security', `${systemNamespaceRules.length} destination rules disable or omit TLS for system namespaces`,
        'Always enforce TLS for system namespaces to protect critical control plane services',
        'destinationRules[].host',
        ['SC-8', 'AC-3', 'SC-23', 'CM-7'],
        'NIST SP 800-53 Rev. 5 (AC-3) requires the enforcement of approved authorizations for access to system services. System namespaces contain critical control plane components that manage the security of the entire mesh. Disabling TLS for these namespaces could allow attackers who have compromised a workload to intercept or manipulate control plane traffic, potentially leading to complete mesh compromise.');
    }
  }
}

module.exports = {
  BaseSecurityAnalyzer,
  IstioSecurityAnalyzer,
  ConsulSecurityAnalyzer,
  LinkerdSecurityAnalyzer
};
