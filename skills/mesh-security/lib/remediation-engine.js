#!/usr/bin/env node
/**
 * Mesh Security Remediation Engine
 *
 * Generates security fixes for mesh configuration issues identified by the analyzer.
 */

const fs = require('fs');
const path = require('path');
const { analyzeConfig, parseConfigFile } = require('./analyzer-wrapper');

/**
 * Remediation templates for common security issues
 */
const REMEDIATION_TEMPLATES = {
  istio: {
    'mTLS': {
      description: 'Enable strict mTLS mode',
      fix: (config) => ({
        path: 'spec.mtls.mode',
        oldValue: config?.spec?.mtls?.mode || 'PERMISSIVE',
        newValue: 'STRICT',
        snippet: `spec:
  mtls:
    mode: STRICT`
      })
    },
    'RBAC': {
      description: 'Enable RBAC enforcement',
      fix: (config) => ({
        path: 'spec.accessLogFile',
        newValue: '/dev/stdout',
        snippet: `spec:
  accessLogFile: /dev/stdout`
      })
    },
    'Trust Domain': {
      description: 'Configure explicit trust domain',
      fix: (config) => ({
        path: 'spec.trustDomain',
        oldValue: config?.spec?.trustDomain || 'cluster.local',
        newValue: 'your-organization.local',
        snippet: `spec:
  trustDomain: your-organization.local`
      })
    },
    'Proxy Configuration': {
      description: 'Disable privileged proxy mode',
      fix: (config) => ({
        path: 'spec.defaultConfig.privileged',
        oldValue: true,
        newValue: false,
        snippet: `spec:
  defaultConfig:
    privileged: false
    holdApplicationUntilProxyStarts: true`
      })
    },
    'Traffic Policy': {
      description: 'Restrict outbound traffic to registry only',
      fix: (config) => ({
        path: 'spec.outboundTrafficPolicy.mode',
        oldValue: 'ALLOW_ANY',
        newValue: 'REGISTRY_ONLY',
        snippet: `spec:
  outboundTrafficPolicy:
    mode: REGISTRY_ONLY`
      })
    },
    'Telemetry': {
      description: 'Enable telemetry and access logging',
      fix: (config) => ({
        path: 'spec.enableTracing',
        newValue: true,
        snippet: `spec:
  enableTracing: true
  accessLogFile: /dev/stdout`
      })
    }
  },

  consul: {
    'Access Control': {
      description: 'Enable ACL with default deny policy',
      fix: (config) => ({
        path: 'acl',
        snippet: `{
  "acl": {
    "enabled": true,
    "default_policy": "deny",
    "enable_token_persistence": true
  }
}`
      })
    },
    'TLS Security': {
      description: 'Enable TLS with verification',
      fix: (config) => ({
        path: 'tls',
        snippet: `{
  "tls": {
    "defaults": {
      "verify_incoming": true,
      "verify_outgoing": true,
      "verify_server_hostname": true,
      "tls_min_version": "TLSv1_2"
    }
  }
}`
      })
    },
    'Gossip Security': {
      description: 'Enable gossip encryption',
      fix: (config) => ({
        path: 'encrypt',
        snippet: `{
  "encrypt": "YOUR_32_BYTE_BASE64_KEY",
  "encrypt_verify_incoming": true,
  "encrypt_verify_outgoing": true
}`
      })
    },
    'Service Mesh': {
      description: 'Enable Connect service mesh',
      fix: (config) => ({
        path: 'connect.enabled',
        snippet: `{
  "connect": {
    "enabled": true
  }
}`
      })
    },
    'FedRAMP Compliance': {
      description: 'Configure for FedRAMP compliance',
      fix: (config) => ({
        path: 'tls.defaults',
        snippet: `{
  "tls": {
    "defaults": {
      "tls_min_version": "TLSv1_2",
      "tls_cipher_suites": "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
      "verify_incoming": true,
      "verify_outgoing": true,
      "verify_server_hostname": true
    }
  }
}`
      })
    }
  },

  linkerd: {
    'TLS Security': {
      description: 'Enable and enforce TLS',
      fix: (config) => ({
        path: 'tls',
        snippet: `tls:
  enabled: true
  enforced: true
  minVersion: "1.2"
  cipherSuites:
    - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
    - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
      })
    },
    'Service Identity': {
      description: 'Enable service identity with proper certificate settings',
      fix: (config) => ({
        path: 'identity',
        snippet: `identity:
  enabled: true
  issuer:
    issuanceLifetime: 24h
    clockSkewAllowance: 20s
  trustAnchors: |
    -----BEGIN CERTIFICATE-----
    # Your root CA certificate here
    -----END CERTIFICATE-----`
      })
    },
    'Authorization': {
      description: 'Enable policy enforcement with default deny',
      fix: (config) => ({
        path: 'policy',
        snippet: `policy:
  enabled: true
  defaultPolicy: deny
  rules:
    - name: "allow-health-checks"
      sources:
        - namespace: kube-system
      permissions:
        - path: /health
          methods: ["GET"]`
      })
    },
    'Proxy Security': {
      description: 'Configure secure proxy settings',
      fix: (config) => ({
        path: 'proxy',
        snippet: `proxy:
  privileged: false
  version: "stable-2.14.0"
  resources:
    cpu:
      request: 100m
      limit: 500m
    memory:
      request: 64Mi
      limit: 256Mi
  waitBeforeExitSeconds: 5`
      })
    },
    'Observability': {
      description: 'Enable tracing and metrics',
      fix: (config) => ({
        path: 'tracing',
        snippet: `tracing:
  enabled: true
  samplingRate: 0.1
  collector:
    address: jaeger.linkerd-viz:14268
metrics:
  enabled: true
  prometheusUrl: http://prometheus.linkerd-viz:9090`
      })
    }
  }
};

/**
 * Generate remediation recommendations for findings
 * @param {Object} analysisResults - Results from analyzeConfig
 * @returns {Array} - Array of remediation objects
 */
function generateRemediations(analysisResults) {
  const { meshType, findings, config } = analysisResults;
  const templates = REMEDIATION_TEMPLATES[meshType] || {};
  const remediations = [];

  for (const finding of findings) {
    const template = templates[finding.category];

    const remediation = {
      findingId: remediations.length + 1,
      severity: finding.severity,
      category: finding.category,
      issue: finding.message,
      recommendation: finding.recommendation,
      nistControls: finding.nistControls?.map(c => c.id) || []
    };

    if (template) {
      const fix = template.fix(config);
      remediation.fixAvailable = true;
      remediation.fixDescription = template.description;
      remediation.configPath = fix.path;
      remediation.snippet = fix.snippet;
      if (fix.oldValue !== undefined) {
        remediation.oldValue = fix.oldValue;
      }
      if (fix.newValue !== undefined) {
        remediation.newValue = fix.newValue;
      }
    } else {
      remediation.fixAvailable = false;
      remediation.fixDescription = 'Manual remediation required';
    }

    remediations.push(remediation);
  }

  return remediations;
}

/**
 * Format remediations as markdown
 * @param {Array} remediations - Array of remediation objects
 * @param {string} meshType - The mesh type
 * @returns {string} - Formatted markdown
 */
function formatRemediations(remediations, meshType) {
  let output = `## Remediation Plan for ${meshType.charAt(0).toUpperCase() + meshType.slice(1)} Configuration\n\n`;
  output += `**Total Issues:** ${remediations.length}\n\n`;

  const withFixes = remediations.filter(r => r.fixAvailable);
  const withoutFixes = remediations.filter(r => !r.fixAvailable);

  output += `**Automated Fixes Available:** ${withFixes.length}\n`;
  output += `**Manual Remediation Required:** ${withoutFixes.length}\n\n`;

  // Group by severity
  const bySeverity = { Critical: [], High: [], Medium: [], Low: [] };
  for (const r of remediations) {
    if (bySeverity[r.severity]) {
      bySeverity[r.severity].push(r);
    }
  }

  for (const [severity, items] of Object.entries(bySeverity)) {
    if (items.length === 0) continue;

    output += `---\n\n### ${severity} Priority\n\n`;

    for (const r of items) {
      output += `#### Fix ${r.findingId}: ${r.category}\n\n`;
      output += `**Issue:** ${r.issue}\n\n`;
      output += `**Recommendation:** ${r.recommendation}\n\n`;

      if (r.nistControls.length > 0) {
        output += `**NIST Controls:** ${r.nistControls.join(', ')}\n\n`;
      }

      if (r.fixAvailable) {
        output += `**Fix Available:** Yes\n\n`;
        output += `**Description:** ${r.fixDescription}\n\n`;
        output += `**Configuration Path:** \`${r.configPath}\`\n\n`;
        output += `**Suggested Configuration:**\n\n\`\`\`${meshType === 'consul' ? 'json' : 'yaml'}\n${r.snippet}\n\`\`\`\n\n`;
      } else {
        output += `**Fix Available:** No (manual remediation required)\n\n`;
      }
    }
  }

  return output;
}

/**
 * Generate a remediation playbook
 * @param {Object} analysisResults - Results from analyzeConfig
 * @returns {string} - Playbook markdown
 */
function generatePlaybook(analysisResults) {
  const { meshType, filePath } = analysisResults;
  const remediations = generateRemediations(analysisResults);

  let playbook = `# Remediation Playbook\n\n`;
  playbook += `**Target:** ${filePath}\n`;
  playbook += `**Mesh Type:** ${meshType}\n`;
  playbook += `**Generated:** ${new Date().toISOString()}\n\n`;

  playbook += `## Pre-Requisites\n\n`;
  playbook += `1. Backup the current configuration\n`;
  playbook += `2. Ensure you have access to modify the mesh configuration\n`;
  playbook += `3. Plan a maintenance window if changes affect production\n\n`;

  playbook += `## Remediation Steps\n\n`;

  const criticalAndHigh = remediations.filter(r =>
    r.severity === 'Critical' || r.severity === 'High'
  );

  for (let i = 0; i < criticalAndHigh.length; i++) {
    const r = criticalAndHigh[i];
    playbook += `### Step ${i + 1}: Fix ${r.category} (${r.severity})\n\n`;
    playbook += `**Issue:** ${r.issue}\n\n`;

    if (r.fixAvailable) {
      playbook += `**Action:** Apply the following configuration change:\n\n`;
      playbook += `\`\`\`${meshType === 'consul' ? 'json' : 'yaml'}\n${r.snippet}\n\`\`\`\n\n`;
    } else {
      playbook += `**Action:** ${r.recommendation}\n\n`;
    }

    playbook += `**Verification:** Re-run the security analyzer to confirm the issue is resolved.\n\n`;
  }

  playbook += `## Post-Remediation\n\n`;
  playbook += `1. Run the security analyzer again to verify all issues are resolved\n`;
  playbook += `2. Test mesh functionality in a non-production environment\n`;
  playbook += `3. Document changes for audit purposes\n`;
  playbook += `4. Update configuration management/GitOps repository\n\n`;

  return playbook;
}

// CLI support
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Mesh Security Remediation Engine

Usage: node remediation-engine.js <config-file> [options]

Options:
  --playbook    Generate a remediation playbook
  --json        Output as JSON
  --help, -h    Show this help message

Examples:
  node remediation-engine.js ./istio-config.yaml
  node remediation-engine.js ./consul-config.json --playbook
  node remediation-engine.js ./config.yaml --json
`);
    process.exit(0);
  }

  const filePath = args[0];
  const playbookMode = args.includes('--playbook');
  const jsonOutput = args.includes('--json');

  try {
    const analysisResults = analyzeConfig(filePath);
    const remediations = generateRemediations(analysisResults);

    if (jsonOutput) {
      console.log(JSON.stringify({
        meshType: analysisResults.meshType,
        remediations
      }, null, 2));
    } else if (playbookMode) {
      console.log(generatePlaybook(analysisResults));
    } else {
      console.log(formatRemediations(remediations, analysisResults.meshType));
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  REMEDIATION_TEMPLATES,
  generateRemediations,
  formatRemediations,
  generatePlaybook
};
