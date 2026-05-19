#!/usr/bin/env node
/**
 * Mesh Security Analyzer Wrapper
 *
 * Wraps the existing mesh-config-analyzer classes for use in agent skills.
 * Supports Istio, Consul, and Linkerd service mesh configurations.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Import analyzers from local module
const { IstioSecurityAnalyzer, ConsulSecurityAnalyzer, LinkerdSecurityAnalyzer } = require('./analyzers');

/**
 * Detect the mesh type from a configuration object
 * @param {Object} config - Parsed configuration object
 * @returns {string|null} - 'istio', 'consul', 'linkerd', or null if unknown
 */
function detectMeshType(config) {
  // Explicit mesh_type field
  if (config.mesh_type) {
    return config.mesh_type.toLowerCase();
  }

  // Istio: MeshConfig kind with istio.io apiVersion
  if (config.kind === 'MeshConfig' && config.apiVersion?.includes('istio.io')) {
    return 'istio';
  }

  // Consul patterns
  if (config.connect && (config.tls || config.acl)) {
    return 'consul';
  }

  // Istio patterns
  if (config.meshMTLS || config.defaultConfig || config.peerAuthentication) {
    return 'istio';
  }

  // Linkerd patterns
  if (config.identity && config.proxy) {
    return 'linkerd';
  }

  return null;
}

/**
 * Parse a configuration file (YAML or JSON)
 * @param {string} filePath - Path to the configuration file
 * @returns {Object} - Parsed configuration object
 */
function parseConfigFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.json') {
    return JSON.parse(content);
  } else if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(content);
  } else if (ext === '.hcl') {
    throw new Error('HCL format is not yet supported. Please convert to JSON or YAML.');
  }

  // Try YAML first, then JSON
  try {
    return yaml.load(content);
  } catch {
    return JSON.parse(content);
  }
}

/**
 * Analyze a mesh configuration file
 * @param {string} filePath - Path to the configuration file
 * @param {string} [meshType] - Optional mesh type override ('istio', 'consul', 'linkerd')
 * @returns {Object} - Analysis results with findings
 */
function analyzeConfig(filePath, meshType = null) {
  const config = parseConfigFile(filePath);
  let detectedType = meshType || detectMeshType(config);

  if (!detectedType) {
    throw new Error('Could not detect mesh type. Please specify mesh_type in config or use --mesh-type flag.');
  }

  // Auto-add required fields for auto-detected types
  if (detectedType === 'consul' && !config.mesh_type) {
    config.mesh_type = 'consul';
  } else if (detectedType === 'linkerd' && !config.mesh_type) {
    config.mesh_type = 'linkerd';
  } else if (detectedType === 'istio' && !config.kind) {
    config.kind = 'MeshConfig';
    config.apiVersion = 'networking.istio.io/v1alpha1';
  }

  const analyzers = {
    istio: IstioSecurityAnalyzer,
    consul: ConsulSecurityAnalyzer,
    linkerd: LinkerdSecurityAnalyzer
  };

  const AnalyzerClass = analyzers[detectedType];
  if (!AnalyzerClass) {
    throw new Error(`Unknown mesh type: ${detectedType}. Supported: istio, consul, linkerd`);
  }

  const analyzer = new AnalyzerClass();
  const findings = analyzer.analyze(config);

  return {
    success: true,
    meshType: detectedType,
    filePath: filePath,
    findings: findings,
    summary: summarizeFindings(findings),
    config: config
  };
}

/**
 * Summarize findings by severity
 * @param {Array} findings - Array of finding objects
 * @returns {Object} - Summary counts
 */
function summarizeFindings(findings) {
  const summary = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: findings.length
  };

  for (const finding of findings) {
    const severity = finding.severity.toLowerCase();
    if (summary.hasOwnProperty(severity)) {
      summary[severity]++;
    }
  }

  return summary;
}

/**
 * Format findings for console output
 * @param {Object} results - Analysis results from analyzeConfig
 * @returns {string} - Formatted markdown string
 */
function formatFindings(results) {
  const { meshType, filePath, findings, summary } = results;

  let output = `## Security Analysis Results\n\n`;
  output += `**Mesh Type:** ${meshType.charAt(0).toUpperCase() + meshType.slice(1)}\n`;
  output += `**File:** ${filePath}\n`;
  output += `**Total Findings:** ${summary.total}\n\n`;

  output += `| Severity | Count |\n`;
  output += `|----------|-------|\n`;
  output += `| Critical | ${summary.critical} |\n`;
  output += `| High | ${summary.high} |\n`;
  output += `| Medium | ${summary.medium} |\n`;
  output += `| Low | ${summary.low} |\n\n`;

  if (findings.length === 0) {
    output += `No security findings detected.\n`;
    return output;
  }

  // Group findings by severity
  const bySeverity = { Critical: [], High: [], Medium: [], Low: [] };
  for (const finding of findings) {
    if (bySeverity[finding.severity]) {
      bySeverity[finding.severity].push(finding);
    }
  }

  for (const [severity, severityFindings] of Object.entries(bySeverity)) {
    if (severityFindings.length === 0) continue;

    output += `### ${severity} Findings\n\n`;

    for (let i = 0; i < severityFindings.length; i++) {
      const f = severityFindings[i];
      output += `#### ${i + 1}. ${f.category}\n\n`;
      output += `**Issue:** ${f.message}\n\n`;
      if (f.location) {
        output += `**Location:** \`${f.location}\`\n\n`;
      }
      output += `**Recommendation:** ${f.recommendation}\n\n`;

      if (f.nistControls && f.nistControls.length > 0) {
        output += `**NIST Controls:** ${f.nistControls.map(c => c.id).join(', ')}\n\n`;
      }

      if (f.nistGuidance) {
        output += `**NIST Guidance:** ${f.nistGuidance}\n\n`;
      }
    }
  }

  return output;
}

// CLI support
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Mesh Security Analyzer

Usage: node analyzer-wrapper.js <config-file> [options]

Options:
  --mesh-type <type>  Specify mesh type (istio, consul, linkerd)
  --json              Output as JSON instead of markdown
  --help, -h          Show this help message

Examples:
  node analyzer-wrapper.js ./istio-meshconfig.yaml
  node analyzer-wrapper.js ./consul-config.json --mesh-type consul
  node analyzer-wrapper.js ./config.yaml --json
`);
    process.exit(0);
  }

  const filePath = args[0];
  const meshTypeIdx = args.indexOf('--mesh-type');
  const meshType = meshTypeIdx !== -1 ? args[meshTypeIdx + 1] : null;
  const jsonOutput = args.includes('--json');

  try {
    const results = analyzeConfig(filePath, meshType);

    if (jsonOutput) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(formatFindings(results));
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  detectMeshType,
  parseConfigFile,
  analyzeConfig,
  summarizeFindings,
  formatFindings,
  IstioSecurityAnalyzer,
  ConsulSecurityAnalyzer,
  LinkerdSecurityAnalyzer
};
