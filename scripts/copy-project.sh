#!/usr/bin/env bash

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <destination>"
  exit 1
fi

DEST_DIR="$1"

mkdir -p "$DEST_DIR"

rsync -av \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  "$SOURCE_DIR/" "$DEST_DIR/"

echo "Done. Copied to: $DEST_DIR"
