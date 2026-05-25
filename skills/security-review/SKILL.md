---
name: security-review
description: Perform a high-signal security code review of pending git/PR branch changes, focusing only on newly introduced HIGH/MEDIUM exploitable vulnerabilities and filtering false positives. Use when asked to security-review a branch, PR, diff, or pending changes.
allowed-tools: bash read grep find ls subagent
license: MIT
metadata:
  author: hackIDLE
  version: "0.0.1"
---

# Security Review

Conduct a focused security review of the pending changes on the current branch. This is not a general code review. Report only high-confidence security vulnerabilities newly introduced by the branch.

## Scope

Review the current branch diff against the default remote branch.

Use read-only git/context commands only:

```bash
git status
git diff --name-only origin/HEAD...
git log --no-decorate origin/HEAD...
git diff --merge-base origin/HEAD
```

If `origin/HEAD` is unavailable, determine the default remote branch with read-only git commands such as `git remote show origin` and use the appropriate merge base. Do not edit files. Do not write reports to disk unless the user explicitly asks for a file.

Ignore findings in:
- Documentation files such as Markdown.
- Files that are only unit tests or only used to run tests.
- Third-party dependency/version issues.

## Objective

Identify **HIGH-CONFIDENCE security vulnerabilities** with real exploitation potential. Focus only on security implications newly added by this PR/branch. Do not comment on existing security concerns unless the branch makes them newly exploitable.

Critical instructions:

1. **Minimize false positives**: Only flag issues where confidence is at least 8/10 or >80%.
2. **Avoid noise**: Skip theoretical issues, style concerns, best-practice gaps, or low-impact findings.
3. **Focus on impact**: Prioritize vulnerabilities that could lead to unauthorized access, data breaches, or system compromise.
4. **Do not report excluded issue classes**, even if they look security-adjacent.

## Hard Exclusions

Automatically exclude findings matching these patterns:

1. Denial of Service or resource exhaustion attacks.
2. Secrets or credentials stored on disk if otherwise secured or handled by other processes.
3. Rate limiting concerns or service overload scenarios.
4. Memory consumption or CPU exhaustion issues.
5. Lack of input validation on non-security-critical fields without proven security impact.
6. Input sanitization concerns for GitHub Actions unless clearly triggerable via untrusted input.
7. Lack of hardening measures or missing defense-in-depth controls.
8. Theoretical race conditions or timing attacks. Only report a race condition if concretely exploitable.
9. Outdated third-party libraries.
10. Memory safety issues in Rust or other memory-safe languages.
11. Files that are only unit tests or only used as part of running tests.
12. Log spoofing concerns. Unsanitized user input in logs is not a vulnerability by itself.
13. SSRF where only the path is attacker-controlled. SSRF matters only when attacker controls host or protocol.
14. User-controlled content included in AI system prompts.
15. Regex injection.
16. Regex DoS concerns.
17. Insecure documentation or findings in documentation files.
18. Lack of audit logs.

## Precedents

Use these precedents when filtering:

1. Logging high-value secrets in plaintext is a vulnerability. Logging URLs is assumed safe.
2. UUIDs can be assumed unguessable and do not need validation.
3. Environment variables and CLI flags are trusted values. Attacks requiring control of env vars or CLI flags are invalid unless the deployment explicitly gives attackers that control.
4. Resource management issues such as memory or file descriptor leaks are invalid.
5. Subtle or low-impact web issues such as tabnabbing, XS-Leaks, prototype pollution, and open redirects should not be reported unless extremely high confidence and meaningful impact.
6. React and Angular are generally secure against XSS. Do not report XSS in React, Angular, or TSX files unless unsafe APIs such as `dangerouslySetInnerHTML`, `bypassSecurityTrustHtml`, or equivalent are used.
7. Most GitHub Actions vulnerabilities are not exploitable in practice. Require a concrete, specific attack path.
8. Missing auth/authorization in client-side JS/TS is not a vulnerability. Client-side code is not trusted; backend validation is what matters.
9. Only include MEDIUM findings if they are obvious and concrete.
10. Most notebook vulnerabilities (`*.ipynb`) are not exploitable in practice. Require a concrete attack path where untrusted input triggers the issue.
11. Logging non-PII data is not a vulnerability. Only report logging vulnerabilities if secrets, passwords, or PII are exposed.
12. Command injection in shell scripts is generally not exploitable unless there is a concrete path from untrusted input.

## Security Categories to Examine

### Input Validation Vulnerabilities

- SQL injection via unsanitized user input.
- Command injection in system calls or subprocesses.
- XXE injection in XML parsing.
- Template injection in templating engines.
- NoSQL injection in database queries.
- Path traversal in file operations.

### Authentication & Authorization Issues

- Authentication bypass logic.
- Privilege escalation paths.
- Session management flaws.
- JWT token vulnerabilities.
- Authorization logic bypasses.

### Crypto & Secrets Management

- Hardcoded API keys, passwords, or tokens when newly introduced and exploitable.
- Weak cryptographic algorithms or implementations.
- Improper key storage or management.
- Cryptographic randomness issues.
- Certificate validation bypasses.

### Injection & Code Execution

- Remote code execution via deserialization.
- Pickle injection in Python.
- YAML deserialization vulnerabilities.
- Eval injection in dynamic code execution.
- XSS vulnerabilities in web applications: reflected, stored, or DOM-based.

### Data Exposure

- Sensitive data logging or storage.
- PII handling violations.
- API endpoint data leakage.
- Debug information exposure with meaningful security impact.

Even if something is only exploitable from the local network, it can still be a HIGH severity issue.

## Analysis Methodology

### Phase 1: Repository Context Research

Use file search/read tools to understand:

- Existing security frameworks and libraries in use.
- Established sanitization and validation patterns.
- Existing authorization/authentication patterns.
- Project security model and threat model.
- How similar code paths handled the same operation before this change.

### Phase 2: Comparative Analysis

Compare new code against existing patterns:

- Identify deviations from secure codebase conventions.
- Look for inconsistent security implementations.
- Identify newly introduced attack surfaces.
- Confirm whether apparent issues are already mitigated elsewhere.

### Phase 3: Vulnerability Assessment

For each modified file:

- Trace data flow from user input to sensitive operations.
- Check privilege boundaries.
- Identify injection points and unsafe deserialization.
- Validate exploitability and impact.
- Discard anything below confidence 8/10.

## Required Subtask Workflow

Use subagents when the `subagent` tool is available. Before executing, inspect available agents with `subagent({ action: "list" })` and use executable, non-disabled agents only.

### Step 1: Vulnerability Identification Subtask

Launch one review-only subtask, preferably a fresh-context `reviewer`, to identify candidate vulnerabilities. The subtask must inspect the repo and diff directly. It must not edit files.

Include this complete skill content or a faithful summary of every section above in the subtask prompt, especially the objective, security categories, methodology, hard exclusions, precedents, output format, and confidence rules.

Ask the subtask to return candidate findings in this shape:

```markdown
## Candidate: <short title>
- File: <path:line>
- Severity: High|Medium
- Category: <category_slug>
- Confidence: <1-10>
- Description: <why this is vulnerable>
- Exploit Scenario: <concrete attack path>
- Recommendation: <fix>
- Evidence: <diff/code references>
```

### Step 2: Parallel False-Positive Filtering Subtasks

For each candidate vulnerability from Step 1, launch a separate parallel false-positive filtering subtask. These subtasks are review-only and must not write files. They should not use bash except, if absolutely necessary, read-only file inspection through the available read/search tools. Prefer direct code reading over commands.

Each false-positive filter prompt must include the full **Hard Exclusions**, **Precedents**, and **Signal Quality Criteria** sections from this skill.

Ask each filter subtask to decide whether the candidate survives and to return:

```markdown
## FP Filter Result
- Candidate: <title>
- Survives: yes|no
- Confidence: <1-10>
- Reasoning: <short explanation>
- Required Conditions: <what must be true for exploitability>
- False Positive Concerns: <if any>
```

### Step 3: Final Filtering

Discard any candidate where the false-positive subtask confidence is less than 8/10 or `Survives: no`.

If subagents are unavailable, perform all three steps locally: candidate identification, adversarial false-positive filtering, and final confidence filtering. Still apply the same standards.

## Signal Quality Criteria

For every remaining finding, answer:

1. Is there a concrete, exploitable vulnerability with a clear attack path?
2. Does this represent a real security risk rather than a theoretical best-practice gap?
3. Are there specific code locations and reproduction or exploitation steps?
4. Would a security team confidently raise this in PR review?

Confidence scale:

- **1-3**: Low confidence; likely false positive or noise.
- **4-6**: Medium confidence; needs investigation.
- **7**: Suspicious but do not report.
- **8-10**: High confidence; report only these.

## Required Output Format

The final response must be markdown and contain the security report only. Do not include process commentary, tool summaries, or subtask transcripts.

For each finding, include file, line number, severity, category, description, exploit scenario, confidence, and fix recommendation.

Use this format:

```markdown
# Vuln 1: <Category>: `<file>:<line>`

* Severity: High|Medium
* Category: `<category_slug>`
* Confidence: <8-10>/10
* Description: <concise vulnerability description>
* Exploit Scenario: <concrete attack path and impact>
* Recommendation: <specific fix>
```

If no findings survive filtering, output:

```markdown
# Security Review Findings

No high-confidence security vulnerabilities were identified in the pending changes.
```

## Severity Guidelines

- **HIGH**: Directly exploitable vulnerabilities leading to RCE, data breach, credential/PII exposure, privilege escalation, or authentication/authorization bypass.
- **MEDIUM**: Obvious, concrete vulnerabilities requiring specific conditions but with significant security impact.
- **LOW**: Defense-in-depth issues or lower-impact vulnerabilities. Do not report LOW findings.

Final reminder: better to miss theoretical issues than flood the report with false positives. Each reported finding should be something a senior security engineer would confidently raise in a PR review.
