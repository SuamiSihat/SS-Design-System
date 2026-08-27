#!/usr/bin/env bash
# =============================================================================
# SuamiSihat™ Design System — Production Pull Script (Linux/NAS)
# Usage on Synology NAS: bash deploy.sh (or ./deploy.sh)
# =============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "================================================="
echo "  SuamiSihat™ Design System — Syncing to NAS"
echo "================================================="
echo ""

echo "Fetching latest changes from origin/main..."
git fetch origin main

echo "Resetting to latest origin/main..."
git reset --hard origin/main

echo ""
echo "================================================="
echo "  DEPLOY_OK — https://assets.suamisihat.myds.me/"
echo "================================================="
