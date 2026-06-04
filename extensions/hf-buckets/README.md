# hf-buckets Pi Extension

Safe Hugging Face Bucket backups for Pi.

This extension wraps the official `hf` CLI with guardrails for backing up local folders to private Hugging Face Buckets:

- Creates buckets as private by default.
- Uses secret-safe exclude globs for `.git`, `.env`, cookies, tokens, VPN profiles, and common caches.
- Runs uploads as detached jobs with logs and JSON job metadata under `~/.pi/hf-backups/jobs/`.
- Verifies bucket privacy and nonzero remote size/file count before allowing quarantine.
- Moves verified local sources to a quarantine folder instead of deleting them.

> Security note: Pi extensions run with your local user permissions. Review this extension before installing. It can upload local files to Hugging Face and move local folders into quarantine when requested.

## Requirements

Install and authenticate the Hugging Face CLI:

```bash
hf auth login
hf auth whoami
```

The official Hugging Face CLI skill is recommended:

```bash
hf skills add --global
```

## Commands

```bash
/hf-backup <path> --bucket <bucket-name> [--namespace <user-or-org>] [--dry-run]
/hf-status [job-id]
/hf-quarantine <job-id>
```

If `--namespace` is omitted, the extension uses `hf auth whoami`. You can also set `HF_NAMESPACE` or `HF_USER`.

## Model tools

The extension registers these tools for the agent:

- `hf_safe_bucket_backup`
- `hf_backup_status`
- `hf_quarantine_uploaded`

## Default safe excludes

```text
**/.git/**
**/.DS_Store
**/__pycache__/**
**/.pytest_cache/**
**/.venv/**
**/venv/**
**/.env
**/.env.*
**/*cookie*
**/*Cookie*
**/*token*
**/*Token*
**/*secret*
**/*Secret*
**/*.ovpn
**/auth_session.json
```

## Quarantine behavior

Default quarantine root:

```text
~/.trash/hf-uploaded-training-folders/
```

The extension refuses to quarantine unless:

- the job is marked done,
- the target bucket is private,
- the target bucket has nonzero remote files and size.
