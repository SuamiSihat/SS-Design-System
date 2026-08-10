#!/usr/bin/env pwsh
# =============================================================================
# SuamiSihat Design System — Deploy Script
# Usage: .\deploy.ps1 [-Message "your commit message"]
# What it does:
#   1. Commits any staged/unstaged changes (optional)
#   2. Pushes to GitHub (origin/main)
#   3. SSHs into the NAS and runs git pull to update the live site
# =============================================================================

param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$env:PATH += ";C:\Program Files\Git\cmd"

$NAS_HOST  = "suamisihat.myds.me"
$NAS_PORT  = "2222"
$NAS_USER  = "harussani"
$NAS_PATH  = "/volume1/web/ss_assets"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  SuamiSihat Design System — Deploy to Production" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# -- Step 1: Commit if there are changes and a message was provided -----
$status = git status --short
if ($status -and $Message) {
    Write-Host "Staging and committing changes..." -ForegroundColor Yellow
    git add -A
    git commit -m $Message
    Write-Host "  Committed: $Message" -ForegroundColor Green
} elseif ($status -and !$Message) {
    Write-Host "Uncommitted changes detected. Pass -Message 'msg' to commit them." -ForegroundColor Yellow
    Write-Host "Proceeding with push of already-committed changes only." -ForegroundColor Yellow
}

# -- Step 2: Push to GitHub ------------------------------------------------
Write-Host ""
Write-Host "Pushing to GitHub (origin/main)..." -ForegroundColor Yellow
git push origin main
$commitMsg = git log --oneline -1
Write-Host "  Pushed: $commitMsg" -ForegroundColor Green

# -- Step 3: Pull on NAS ---------------------------------------------------
Write-Host ""
Write-Host "Updating NAS (${NAS_HOST}:${NAS_PORT})..." -ForegroundColor Yellow
$sshCmd = "cd $NAS_PATH && git fetch origin main && git reset --hard origin/main && echo DEPLOY_OK"
$result = ssh -p $NAS_PORT -o ConnectTimeout=15 -o StrictHostKeyChecking=no "${NAS_USER}@${NAS_HOST}" $sshCmd

if ($result -match "DEPLOY_OK") {
    $nasHead = ($result | Select-String "HEAD is now at (.+)").Matches.Groups[1].Value
    Write-Host "  NAS updated: $nasHead" -ForegroundColor Green
} else {
    Write-Host "  NAS deploy may have failed. Output:" -ForegroundColor Red
    Write-Host $result
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Deploy complete -- https://assets.suamisihat.myds.me/" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
