# Deploy all three Aurelia design variants to Vercel.
#
#   .\deploy.ps1                -> production deploy of all three
#   .\deploy.ps1 -Variant lumen -> just one
#
# Requires: vercel CLI installed and logged in (vercel whoami).

param(
  [ValidateSet("lumen", "noir", "terra", "all")]
  [string]$Variant = "all"
)

$ErrorActionPreference = "Continue"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$targets = @(
  @{ dir = "variant-01-lumen"; name = "aurelia-01-lumen" },
  @{ dir = "variant-02-noir";  name = "aurelia-02-noir" },
  @{ dir = "variant-03-terra"; name = "aurelia-03-terra" }
)

if ($Variant -ne "all") {
  $key = $Variant
  $targets = $targets | Where-Object { $_.dir -like "*$key*" }
}

$urls = @()

foreach ($t in $targets) {
  $path = Join-Path $root $t.dir
  if (-not (Test-Path $path)) {
    Write-Output "SKIP $($t.dir) - not found"
    continue
  }

  Write-Output ""
  Write-Output "=== Deploying $($t.dir) as $($t.name) ==="

  Push-Location $path
  vercel --prod --yes --name $t.name
  if ($LASTEXITCODE -ne 0) {
    Write-Output "FAILED $($t.dir) (exit $LASTEXITCODE)"
  } else {
    $url = (vercel ls $t.name 2>$null | Select-String "https://" | Select-Object -First 1)
    $urls += [pscustomobject]@{ Variant = $t.name; Output = $url }
  }
  Pop-Location
}

Write-Output ""
Write-Output "================ DEPLOYED ================"
foreach ($u in $urls) {
  Write-Output "$($u.Variant)".PadRight(16)
  Write-Output ($u.Output -replace '^\s+', '')
}
Write-Output "=========================================="