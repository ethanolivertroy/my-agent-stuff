#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"
CONFIG="$ROOT/.gitleaks.toml"
GITLEAKS_BIN="${GITLEAKS_BIN:-gitleaks}"

usage() {
  cat <<'EOF'
Usage: scripts/secret-scan.sh [--all|--working-tree|--staged|--pre-push]

Modes:
  --all           Scan the full git history.
  --working-tree  Scan the current working tree.
  --staged        Scan staged changes, intended for pre-commit.
  --pre-push      Scan commits being pushed, reading refs from git pre-push stdin.

Set SKIP_SECRET_SCAN=1 to bypass in an emergency.
EOF
}

if [[ "${SKIP_SECRET_SCAN:-}" == "1" || "${SKIP_SECRET_SCAN:-}" == "true" ]]; then
  echo "secret-scan: skipped because SKIP_SECRET_SCAN=${SKIP_SECRET_SCAN}" >&2
  exit 0
fi

if ! command -v "$GITLEAKS_BIN" >/dev/null 2>&1; then
  cat >&2 <<'EOF'
secret-scan: gitleaks is required and was not found on PATH.
Install it before pushing this public repo, for example:
  brew install gitleaks
Or set GITLEAKS_BIN=/path/to/gitleaks.
EOF
  exit 127
fi

common_args=(--config "$CONFIG" --redact --no-banner)

run_gitleaks_git() {
  "$GITLEAKS_BIN" git . "${common_args[@]}" "$@"
}

run_gitleaks_dir() {
  "$GITLEAKS_BIN" dir . "${common_args[@]}" "$@"
}

mode="${1:---working-tree}"
case "$mode" in
  --help|-h)
    usage
    ;;
  --all)
    echo "secret-scan: scanning full git history with gitleaks" >&2
    run_gitleaks_git
    ;;
  --working-tree)
    echo "secret-scan: scanning working tree with gitleaks" >&2
    run_gitleaks_dir
    ;;
  --staged)
    echo "secret-scan: scanning staged changes with gitleaks" >&2
    run_gitleaks_git --staged
    ;;
  --pre-push)
    echo "secret-scan: scanning commits being pushed with gitleaks" >&2
    scanned=0
    zero_sha="0000000000000000000000000000000000000000"
    while read -r local_ref local_sha remote_ref remote_sha; do
      [[ -n "${local_ref:-}" ]] || continue
      # Deleted refs do not send new content.
      [[ "$local_sha" != "$zero_sha" ]] || continue

      if [[ "$remote_sha" == "$zero_sha" ]]; then
        # New remote branch/tag. Prefer scanning only commits not reachable from the
        # remote default branch; fall back to the target commit if there is no base.
        default_remote="$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null || true)"
        default_remote="${default_remote:-origin/main}"
        if git rev-parse --verify --quiet "$default_remote" >/dev/null; then
          base="$(git merge-base "$default_remote" "$local_sha" 2>/dev/null || true)"
        else
          base=""
        fi
        if [[ -n "$base" ]]; then
          log_opts="$base..$local_sha"
        else
          log_opts="$local_sha"
        fi
      else
        log_opts="$remote_sha..$local_sha"
      fi

      echo "secret-scan: $local_ref -> $remote_ref ($log_opts)" >&2
      run_gitleaks_git --log-opts="$log_opts"
      scanned=$((scanned + 1))
    done

    if [[ "$scanned" -eq 0 ]]; then
      echo "secret-scan: no new refs to scan" >&2
    fi
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac
