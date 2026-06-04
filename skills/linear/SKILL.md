---
name: linear
description: Use when managing Linear issues, projects, cycles, or team workflows. Triggers on creating, updating, triaging, or querying Linear tickets.
---

# Linear

Structured workflow for managing issues, projects, and team workflows in Linear via the Linear MCP server (OAuth-based, remote).

## Prerequisites

- Linear MCP server connected via your MCP integration (OAuth)
- If any Linear MCP tool call fails, the user may need to reconnect their Linear integration.

## Workflow

**Follow these steps in order.**

### Step 1: Clarify Scope

Confirm the user's goal: issue creation, triage, sprint planning, status update, documentation, workload review, etc. Identify team, project, priority, labels, cycle, and due dates as needed.

### Step 2: Read First

Always query before mutating. Build context with read operations:

| Goal | Tool |
|------|------|
| Find issues | `list_issues` (filter by team, assignee, state, label, project, priority) |
| My open work | `list_issues` with `assignee: "me"` |
| Issue details | `get_issue` with issue identifier (e.g., `CON-435`) |
| Team lookup | `list_teams` |
| Project lookup | `list_projects`, `get_project` |
| Available states | `list_issue_statuses` (requires `team`) |
| Available labels | `list_issue_labels` (optional `team` filter) |
| Cycles | `list_cycles` |
| Documents | `list_documents`, `get_document`, `search_documentation` |
| Comments | `list_comments` (requires `issueId`) |
| Users | `list_users`, `get_user` |
| Initiatives | `list_initiatives`, `get_initiative` |
| Milestones | `list_milestones` (requires `project`) |
| Status updates | `get_status_updates` |

### Step 3: Create or Update

Use `save_issue` for both creating and updating:

**Creating:** `title` and `team` are required. Omit `id`.
```
save_issue(title: "...", team: "Content", description: "...", priority: 3, labels: ["Bug"])
```

**Updating:** Pass `id` with the issue identifier.
```
save_issue(id: "CON-435", state: "In Progress", assignee: "me")
```

Other mutation tools:
- `save_comment` - add comments to issues
- `save_project`, `save_initiative`, `save_milestone` - project management
- `save_status_update` - post status updates
- `create_issue_label` - create new labels
- `create_document`, `update_document` - Linear docs
- `create_attachment` - attach files to issues

### Step 4: Summarize

After mutations, report what changed. Call out remaining gaps, blockers, or suggested next actions.

## Priority Values

| Value | Meaning |
|-------|---------|
| 0 | None |
| 1 | Urgent |
| 2 | High |
| 3 | Normal |
| 4 | Low |

## Practical Workflows

- **Sprint planning:** List open issues for a team, pick top items by priority, assign to a cycle
- **Bug triage:** List critical/high-priority bugs, rank by impact, move top items to In Progress
- **Team workload:** Group active issues by assignee, flag overloaded members, suggest redistributions
- **Release planning:** Create a project with milestones, generate issues with estimates
- **Status updates:** Find issues with stale updates, add status comments based on current state
- **Smart labeling:** Analyze unlabeled issues, suggest/apply labels, create missing categories
- **Cross-project dependencies:** Find blocked issues, identify blockers, create linked issues if missing

## Tips

- Use `assignee: "me"` for personal issue queries
- Batch related operations logically; don't create 20 issues one at a time without confirmation
- Use `query` parameter for text search across issue titles and descriptions
- `list_issues` with `state: "In Progress"` finds active work
- Duration filters use ISO-8601: `createdAt: "-P7D"` for last 7 days
- Link attachments to issues with the `links` field on `save_issue`: `[{url, title}]`
- Relations (`blocks`, `blockedBy`, `relatedTo`) are append-only on `save_issue`
