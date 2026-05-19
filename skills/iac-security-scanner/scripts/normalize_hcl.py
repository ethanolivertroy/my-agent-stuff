#!/usr/bin/env python3
"""
Normalize Terraform HCL to JSON for simpler policy checks.

Usage:
  python normalize_hcl.py /path/to/main.tf /path/to/output.json

Notes:
  - Uses python-hcl2 by default (no external binaries).
  - If python-hcl2 is not installed, the script exits with instructions.
"""

import json
import sys
from pathlib import Path


def main(hcl_path: str, output_path: str) -> None:
    input_path = Path(hcl_path)
    output_file = Path(output_path)

    if not input_path.exists():
        print(f"Error: {input_path} does not exist", file=sys.stderr)
        sys.exit(1)

    try:
        import hcl2
    except ImportError:
        print(
            "python-hcl2 is required. Install with: pip install python-hcl2",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        with input_path.open() as f:
            parsed = hcl2.load(f)
    except Exception as exc:
        print(f"Error parsing HCL: {exc}", file=sys.stderr)
        sys.exit(1)

    output_file.write_text(json.dumps(parsed, indent=2, sort_keys=True))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python normalize_hcl.py <input.tf> <output.json>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
