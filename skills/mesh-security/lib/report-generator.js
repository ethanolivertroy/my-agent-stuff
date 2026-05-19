#!/usr/bin/env node
/**
 * Mesh Security Compliance Report Generator
 *
 * Generates FedRAMP and NIST 800-53 compliance reports for mesh configurations.
 */

const fs = require('fs');
const path = require('path');
const { analyzeConfig } = require('./analyzer-wrapper');

/**
 * NIST 800-53 Rev 5 Control Families
 */
const NIST_CONTROL_FAMILIES = {
  'AC': 'Access Control',
  'AU': 'Audit and Accountability',
  'CA': 'Security Assessment and Authorization',
  'CM': 'Configuration Management',
  'IA': 'Identification and Authentication',
  'SC': 'System and Communications Protection',
  'SI': 'System and Information Integrity'
};

/**
 * FedRAMP Control Requirements for Service Mesh
 */
const FEDRAMP_REQUIREMENTS = {
  'SC-8': {
    title: 'Transmission Confidentiality and Integrity',
    requirement: 'All service-to-service communication must use mTLS with TLS 1.2 or higher',
    moderate: true,
    high: true
  },
  'SC-13': {
    title: 'Cryptographic Protection',
    requirement: 'Use FIPS 140-2 validated cryptographic modules',
    moderate: true,
    high: true
  },
  'AC-3': {
    title: 'Access Enforcement',
    requirement: 'Implement role-based access control for service authorization',
    moderate: true,
    high: true
  },
  'AC-4': {
    title: 'Information Flow Enforcement',
    requirement: 'Control information flow between services based on security policy',
    moderate: true,
    high: true
  },
  'AU-2': {
    title: 'Audit Events',
    requirement: 'Log all service mesh access events',
    moderate: true,
    high: true
  },
  'AU-12': {
    title: 'Audit Generation',
    requirement: 'Generate audit records for all service mesh operations',
    moderate: true,
    high: true
  },
  'CM-6': {
    title: 'Configuration Settings',
    requirement: 'Configure service mesh with security-focused settings',
    moderate: true,
    high: true
  },
  'CM-7': {
    title: 'Least Functionality',
    requirement: 'Restrict service mesh to essential capabilities only',
    moderate: true,
    high: true
  },
  'IA-2': {
    title: 'Identification and Authentication',
    requirement: 'Uniquely identify and authenticate all services',
    moderate: true,
    high: true
  },
  'SC-7': {
    title: 'Boundary Protection',
    requirement: 'Control service mesh network boundaries',
    moderate: true,
    high: true
  },
  'SC-12': {
    title: 'Cryptographic Key Management',
    requirement: 'Manage service mesh certificates according to policy',
    moderate: true,
    high: true
  }
};

/**
 * Analyze NIST control coverage from findings
 * @param {Array} findings - Findings from analysis
 * @returns {Object} - Control coverage analysis
 */
function analyzeControlCoverage(findings) {
  const controlsWithFindings = new Set();
  const controlDetails = {};

  for (const finding of findings) {
    for (const control of (finding.nistControls || [])) {
      controlsWithFindings.add(control.id);
      if (!controlDetails[control.id]) {
        controlDetails[control.id] = {
          id: control.id,
          title: control.title,
          findings: []
        };
      }
      controlDetails[control.id].findings.push({
        severity: finding.severity,
        category: finding.category,
        message: finding.message
      });
    }
  }

  // Group by family
  const byFamily = {};
  for (const [family, name] of Object.entries(NIST_CONTROL_FAMILIES)) {
    byFamily[family] = {
      name,
      controls: Object.values(controlDetails).filter(c => c.id.startsWith(family)),
      findingsCount: 0
    };
    byFamily[family].findingsCount = byFamily[family].controls.reduce(
      (sum, c) => sum + c.findings.length, 0
    );
  }

  return {
    totalControlsWithFindings: controlsWithFindings.size,
    controlDetails,
    byFamily
  };
}

/**
 * Generate FedRAMP compliance assessment
 * @param {Object} analysisResults - Results from analyzeConfig
 * @param {string} impactLevel - 'moderate' or 'high'
 * @returns {Object} - FedRAMP assessment
 */
function generateFedRAMPAssessment(analysisResults, impactLevel = 'moderate') {
  const { findings } = analysisResults;
  const assessment = {
    impactLevel,
    controlAssessments: {},
    summary: {
      satisfied: 0,
      findings: 0,
      notApplicable: 0
    }
  };

  // Check each FedRAMP requirement
  for (const [controlId, req] of Object.entries(FEDRAMP_REQUIREMENTS)) {
    if (!req[impactLevel]) {
      assessment.controlAssessments[controlId] = {
        status: 'N/A',
        title: req.title,
        requirement: req.requirement
      };
      assessment.summary.notApplicable++;
      continue;
    }

    // Find findings related to this control
    const relatedFindings = findings.filter(f =>
      f.nistControls?.some(c => c.id === controlId)
    );

    if (relatedFindings.length === 0) {
      assessment.controlAssessments[controlId] = {
        status: 'Satisfied',
        title: req.title,
        requirement: req.requirement,
        determination: `The service mesh configuration satisfies ${controlId} requirements.`
      };
      assessment.summary.satisfied++;
    } else {
      assessment.controlAssessments[controlId] = {
        status: 'Other Than Satisfied',
        title: req.title,
        requirement: req.requirement,
        findings: relatedFindings.map(f => ({
          severity: f.severity,
          issue: f.message,
          recommendation: f.recommendation
        })),
        determination: `Findings identified for ${controlId}. See POA&M entries.`
      };
      assessment.summary.findings++;
    }
  }

  return assessment;
}

/**
 * Generate POA&M entries from findings
 * @param {Array} findings - Findings from analysis
 * @param {string} systemName - Name of the system
 * @returns {Array} - POA&M entries
 */
function generatePOAMEntries(findings, systemName = 'Service Mesh') {
  const year = new Date().getFullYear();
  const entries = [];

  const criticalAndHigh = findings.filter(f =>
    f.severity === 'Critical' || f.severity === 'High'
  );

  for (let i = 0; i < criticalAndHigh.length; i++) {
    const f = criticalAndHigh[i];
    const controlId = f.nistControls?.[0]?.id || 'CM-6';

    entries.push({
      poamId: `${year}-${controlId}-${String(i + 1).padStart(3, '0')}`,
      controlId,
      weakness: f.message,
      severity: f.severity,
      source: 'Service Mesh Security Assessment',
      system: systemName,
      responsibleParty: 'System Administrator',
      milestoneDates: {
        identified: new Date().toISOString().split('T')[0],
        plannedCompletion: getPlannedCompletionDate(f.severity)
      },
      status: 'Open',
      recommendation: f.recommendation
    });
  }

  return entries;
}

/**
 * Get planned completion date based on severity
 */
function getPlannedCompletionDate(severity) {
  const date = new Date();
  switch (severity) {
    case 'Critical':
      date.setDate(date.getDate() + 30);
      break;
    case 'High':
      date.setDate(date.getDate() + 90);
      break;
    default:
      date.setDate(date.getDate() + 180);
  }
  return date.toISOString().split('T')[0];
}

/**
 * Format a full compliance report as markdown
 * @param {Object} analysisResults - Results from analyzeConfig
 * @param {Object} options - Report options
 * @returns {string} - Markdown report
 */
function formatComplianceReport(analysisResults, options = {}) {
  const { meshType, filePath, findings, summary } = analysisResults;
  const impactLevel = options.impactLevel || 'moderate';
  const systemName = options.systemName || 'Service Mesh';

  const controlCoverage = analyzeControlCoverage(findings);
  const fedRAMPAssessment = generateFedRAMPAssessment(analysisResults, impactLevel);
  const poamEntries = generatePOAMEntries(findings, systemName);

  let report = `# Service Mesh Security Compliance Report\n\n`;
  report += `## System Information\n\n`;
  report += `| Property | Value |\n`;
  report += `|----------|-------|\n`;
  report += `| **System Name** | ${systemName} |\n`;
  report += `| **Mesh Type** | ${meshType.charAt(0).toUpperCase() + meshType.slice(1)} |\n`;
  report += `| **Impact Level** | FedRAMP ${impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} |\n`;
  report += `| **Assessment Date** | ${new Date().toISOString().split('T')[0]} |\n`;
  report += `| **Configuration File** | ${filePath} |\n\n`;

  report += `## Executive Summary\n\n`;

  const compliancePercent = Math.round(
    (fedRAMPAssessment.summary.satisfied /
      (fedRAMPAssessment.summary.satisfied + fedRAMPAssessment.summary.findings)) * 100
  ) || 0;

  report += `The ${meshType} service mesh configuration has been analyzed against `;
  report += `FedRAMP ${impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} baseline requirements.\n\n`;

  report += `### Compliance Status\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| **Controls Satisfied** | ${fedRAMPAssessment.summary.satisfied} |\n`;
  report += `| **Controls with Findings** | ${fedRAMPAssessment.summary.findings} |\n`;
  report += `| **Compliance Rate** | ${compliancePercent}% |\n\n`;

  report += `### Risk Summary\n\n`;
  report += `| Severity | Count |\n`;
  report += `|----------|-------|\n`;
  report += `| Critical | ${summary.critical} |\n`;
  report += `| High | ${summary.high} |\n`;
  report += `| Medium | ${summary.medium} |\n`;
  report += `| Low | ${summary.low} |\n`;
  report += `| **Total** | ${summary.total} |\n\n`;

  report += `## NIST 800-53 Control Coverage\n\n`;
  report += `### By Control Family\n\n`;
  report += `| Family | Name | Findings |\n`;
  report += `|--------|------|----------|\n`;

  for (const [family, data] of Object.entries(controlCoverage.byFamily)) {
    report += `| ${family} | ${data.name} | ${data.findingsCount} |\n`;
  }
  report += `\n`;

  report += `## FedRAMP Control Assessment\n\n`;

  for (const [controlId, assessment] of Object.entries(fedRAMPAssessment.controlAssessments)) {
    report += `### ${controlId} - ${assessment.title}\n\n`;
    report += `**Status:** ${assessment.status}\n\n`;
    report += `**Requirement:** ${assessment.requirement}\n\n`;

    if (assessment.determination) {
      report += `**Determination:** ${assessment.determination}\n\n`;
    }

    if (assessment.findings && assessment.findings.length > 0) {
      report += `**Findings:**\n\n`;
      for (const f of assessment.findings) {
        report += `- [${f.severity}] ${f.issue}\n`;
      }
      report += `\n`;
    }
  }

  if (poamEntries.length > 0) {
    report += `## POA&M Entries\n\n`;
    report += `The following Plan of Action and Milestones entries have been generated:\n\n`;

    for (const entry of poamEntries) {
      report += `### ${entry.poamId}\n\n`;
      report += `| Field | Value |\n`;
      report += `|-------|-------|\n`;
      report += `| **Control** | ${entry.controlId} |\n`;
      report += `| **Severity** | ${entry.severity} |\n`;
      report += `| **Status** | ${entry.status} |\n`;
      report += `| **Identified** | ${entry.milestoneDates.identified} |\n`;
      report += `| **Planned Completion** | ${entry.milestoneDates.plannedCompletion} |\n\n`;
      report += `**Weakness:** ${entry.weakness}\n\n`;
      report += `**Recommendation:** ${entry.recommendation}\n\n`;
    }
  }

  report += `## Appendix: Assessment Methodology\n\n`;
  report += `This assessment was performed using automated security analysis of the service mesh configuration. `;
  report += `The analyzer checked for compliance with:\n\n`;
  report += `- NIST 800-53 Rev 5 security controls\n`;
  report += `- FedRAMP ${impactLevel} baseline requirements\n`;
  report += `- Service mesh security best practices\n\n`;
  report += `---\n\n`;
  report += `*Report generated by Mesh Security Analyzer*\n`;

  return report;
}

// CLI support
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Mesh Security Compliance Report Generator

Usage: node report-generator.js <config-file> [options]

Options:
  --fedramp           Generate FedRAMP compliance report
  --impact <level>    FedRAMP impact level (moderate or high, default: moderate)
  --system <name>     System name for the report
  --json              Output as JSON
  --help, -h          Show this help message

Examples:
  node report-generator.js ./istio-config.yaml --fedramp
  node report-generator.js ./consul-config.json --fedramp --impact high
  node report-generator.js ./config.yaml --system "Production Mesh" --json
`);
    process.exit(0);
  }

  const filePath = args[0];
  const impactIdx = args.indexOf('--impact');
  const impactLevel = impactIdx !== -1 ? args[impactIdx + 1] : 'moderate';
  const systemIdx = args.indexOf('--system');
  const systemName = systemIdx !== -1 ? args[systemIdx + 1] : 'Service Mesh';
  const jsonOutput = args.includes('--json');

  try {
    const analysisResults = analyzeConfig(filePath);

    if (jsonOutput) {
      const fedRAMPAssessment = generateFedRAMPAssessment(analysisResults, impactLevel);
      const poamEntries = generatePOAMEntries(analysisResults.findings, systemName);

      console.log(JSON.stringify({
        meshType: analysisResults.meshType,
        summary: analysisResults.summary,
        fedRAMPAssessment,
        poamEntries
      }, null, 2));
    } else {
      console.log(formatComplianceReport(analysisResults, { impactLevel, systemName }));
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  NIST_CONTROL_FAMILIES,
  FEDRAMP_REQUIREMENTS,
  analyzeControlCoverage,
  generateFedRAMPAssessment,
  generatePOAMEntries,
  formatComplianceReport
};
