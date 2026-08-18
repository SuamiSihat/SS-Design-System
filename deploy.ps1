# =============================================================================
# SuamiSihat™ Design System — Production Deploy Script
# Usage: .\deploy.ps1 [-Message "your commit message"]
#
# Configuration:
#   Set environment variables or create a local untracked 'deploy.config.ps1'
#   See 'deploy.config.ps1.example' for template.
# =============================================================================

param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Load local config if present (untracked in .gitignore)
$configFile = Join-Path $PSScriptRoot "deploy.config.ps1"
if (Test-Path $configFile) {
    . $configFile
}

# Resolve connection parameters from env or defaults
$NAS_HOST = if ($env:NAS_HOST) { $env:NAS_HOST } elseif ($global:DEPLOY_NAS_HOST) { $global:DEPLOY_NAS_HOST } else { "suamisihat.myds.me" }
$NAS_PORT = if ($env:NAS_PORT) { $env:NAS_PORT } elseif ($global:DEPLOY_NAS_PORT) { $global:DEPLOY_NAS_PORT } else { "2222" }
$NAS_USER = if ($env:NAS_USER) { $env:NAS_USER } elseif ($global:DEPLOY_NAS_USER) { $global:DEPLOY_NAS_USER } else { "harussani" }
$NAS_PATH = if ($env:NAS_PATH) { $env:NAS_PATH } elseif ($global:DEPLOY_NAS_PATH) { $global:DEPLOY_NAS_PATH } else { "/volume1/web/ss_assets" }

$env:PATH += ";C:\Program Files\Git\cmd"
$git = "C:\Program Files\Git\cmd\git.exe"

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  SuamiSihat™ Design System — Deploy to Production" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# -- Step 1: Commit if there are changes and a message was provided -----
$status = & $git status --short
if ($status -and $Message) {
    Write-Host "Staging and committing changes..." -ForegroundColor Yellow
    & $git add -A
    & $git commit -m $Message
    Write-Host "  Committed: $Message" -ForegroundColor Green
} elseif ($status -and !$Message) {
    Write-Host "Uncommitted changes detected. Pass -Message 'msg' to commit them." -ForegroundColor Yellow
    Write-Host "Proceeding with push of already-committed changes only." -ForegroundColor Yellow
}

# -- Step 2: Push to GitHub ------------------------------------------------
Write-Host ""
Write-Host "Pushing to GitHub (origin/main)..." -ForegroundColor Yellow
& $git push origin main
$commitMsg = & $git log --oneline -1
Write-Host "  Pushed: $commitMsg" -ForegroundColor Green

# -- Step 3: Sync Server ---------------------------------------------------
Write-Host ""
Write-Host "Updating Production Host ($NAS_HOST)..." -ForegroundColor Yellow
$sshTarget = "${NAS_USER}@${NAS_HOST}"
$sshCmd = "cd $NAS_PATH; git fetch origin main; git reset --hard origin/main; echo DEPLOY_OK"
$result = ssh -p $NAS_PORT -o ConnectTimeout=15 -o StrictHostKeyChecking=no $sshTarget $sshCmd

if ($result -match "DEPLOY_OK") {
    Write-Host "  Production host updated successfully!" -ForegroundColor Green
    $result | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "  Deploy output:" -ForegroundColor Yellow
    Write-Host $result
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Deploy complete -- https://assets.suamisihat.myds.me/" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
