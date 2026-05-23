# Tower Battle Intel v4.11a8 Dashboard Concept 5 Desktop Rebuild Patch
# Put this file, desktop-dashboard-concept5-rebuild.css, and desktop-dashboard-concept5-rebuild.js
# in the same folder as desktop.css and index.html, then run:
#   powershell -ExecutionPolicy Bypass -File .\apply-dashboard-concept5-rebuild.ps1

$ErrorActionPreference = "Stop"

$ProjectRoot = Get-Location
$DesktopCss = Join-Path $ProjectRoot "desktop.css"
$IndexHtml = Join-Path $ProjectRoot "index.html"
$PatchCss = Join-Path $PSScriptRoot "desktop-dashboard-concept5-rebuild.css"
$PatchJs = Join-Path $PSScriptRoot "desktop-dashboard-concept5-rebuild.js"
$OutputJs = Join-Path $ProjectRoot "desktop-dashboard-concept5-rebuild.js"
$Marker = "TBI v4.11a8 Dashboard Concept 5 Desktop Rebuild START"
$ScriptMarker = "desktop-dashboard-concept5-rebuild.js"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"

if (!(Test-Path $DesktopCss)) {
    throw "desktop.css was not found in: $ProjectRoot`nRun this from the Tower Battle Intel project folder that contains desktop.css."
}

if (!(Test-Path $IndexHtml)) {
    throw "index.html was not found in: $ProjectRoot`nRun this from the Tower Battle Intel project folder that contains index.html."
}

if (!(Test-Path $PatchCss)) {
    throw "Patch CSS file missing: $PatchCss"
}

if (!(Test-Path $PatchJs)) {
    throw "Patch JS file missing: $PatchJs"
}

$DesktopContent = Get-Content $DesktopCss -Raw
$IndexContent = Get-Content $IndexHtml -Raw

$DesktopBackup = "$DesktopCss.backup-v4.11a8-$Stamp"
$IndexBackup = "$IndexHtml.backup-v4.11a8-$Stamp"
Copy-Item $DesktopCss $DesktopBackup
Copy-Item $IndexHtml $IndexBackup

if ($DesktopContent -notlike "*$Marker*") {
    $PatchContent = Get-Content $PatchCss -Raw
    Add-Content -Path $DesktopCss -Value "`r`n`r`n$PatchContent`r`n"
    Write-Host "Applied Dashboard Concept 5 rebuild CSS." -ForegroundColor Green
} else {
    Write-Host "Dashboard Concept 5 rebuild CSS is already applied. CSS unchanged." -ForegroundColor Yellow
}

Copy-Item $PatchJs $OutputJs -Force
Write-Host "Copied desktop-dashboard-concept5-rebuild.js." -ForegroundColor Green

$IndexContent = Get-Content $IndexHtml -Raw
if ($IndexContent -notlike "*$ScriptMarker*") {
    if ($IndexContent -match "</body>") {
        $ScriptTag = "`r`n        <script src=`"./desktop-dashboard-concept5-rebuild.js`"></script>`r`n"
        $IndexContent = $IndexContent -replace "</body>", "$ScriptTag</body>"
        Set-Content -Path $IndexHtml -Value $IndexContent -Encoding UTF8
        Write-Host "Inserted desktop Concept 5 helper script into index.html." -ForegroundColor Green
    } else {
        throw "Could not find </body> in index.html, so the helper script was not inserted."
    }
} else {
    Write-Host "Helper script is already referenced in index.html. HTML unchanged." -ForegroundColor Yellow
}

Write-Host "Backups created:" -ForegroundColor Cyan
Write-Host "  $DesktopBackup" -ForegroundColor Cyan
Write-Host "  $IndexBackup" -ForegroundColor Cyan
Write-Host "Now hard refresh Chrome with Ctrl+F5. Test Dashboard at maximised and 1280x720 browser size." -ForegroundColor Cyan
