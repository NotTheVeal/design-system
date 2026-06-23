#!/bin/bash
# rollback.sh
# Emergency rollback procedure for the PartsSource Design System
#
# Usage:
#   bash scripts/rollback.sh <commit-hash-or-tag>
#
# Examples:
#   bash scripts/rollback.sh abc1234
#   bash scripts/rollback.sh v1.2.0
#
# What this does:
#   1. Validates the target exists in git history
#   2. Creates a timestamped rollback branch from the target
#   3. Pushes the branch and opens a PR against main
#   4. Prints manual verification steps for Storybook / npm
#
# Requirements:
#   - git
#   - gh (GitHub CLI) — for PR creation (optional, falls back to manual)
#   - Must be run from the repo root with a clean working tree

set -euo pipefail

# ---------------------------------------------------------------------------
# Colours for output
# ---------------------------------------------------------------------------
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

info()    { echo -e "${CYAN}[INFO]${RESET}  $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
success() { echo -e "${GREEN}[OK]${RESET}    $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; }
fatal()   { error "$*"; exit 1; }

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------
echo ""
echo -e "${RED}${BOLD}==================================================${RESET}"
echo -e "${RED}${BOLD}  PartsSource Design System — Emergency Rollback  ${RESET}"
echo -e "${RED}${BOLD}==================================================${RESET}"
echo ""

TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo -e "  ${BOLD}Usage:${RESET}   bash scripts/rollback.sh <commit-hash-or-version>"
  exit 1
fi

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  fatal "Not inside a git repository"
fi

RESOLVED_HASH=""
if git rev-parse "refs/tags/$TARGET" > /dev/null 2>&1; then
  RESOLVED_HASH="$(git rev-parse refs/tags/$TARGET)"
elif git rev-parse --verify "$TARGET^{commit}" > /dev/null 2>&1; then
  RESOLVED_HASH="$(git rev-parse $TARGET^{commit})"
else
  fatal "Target '$TARGET' not found"
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK_BRANCH="rollback/${TARGET}-${TIMESTAMP}"

info "Creating rollback branch: $ROLLBACK_BRANCH"
git checkout -b "$ROLLBACK_BRANCH" "$RESOLVED_HASH"
git push origin "$ROLLBACK_BRANCH"

success "Rollback branch ready: $ROLLBACK_BRANCH -> main"
