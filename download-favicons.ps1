# download-favicons.ps1
# Download favicons for all domains and save to favicons/ folder

$ErrorActionPreference = "SilentlyContinue"
$ProgressPreference = "SilentlyContinue"

$domains = Get-Content "favicon-domains.txt" -Encoding UTF8 | Where-Object { $_.Trim() -ne "" }
$outDir = "favicons"
$defaultIcon = Join-Path $outDir "default.svg"
$successCount = 0
$failCount = 0
$successList = @()
$failList = @()

Write-Host "Starting favicon download for $($domains.Count) domains..." -ForegroundColor Cyan

foreach ($domain in $domains) {
    $domain = $domain.Trim()
    if ($domain -eq "") { continue }
    
    # Sanitize domain for filename (replace invalid chars)
    $safeName = $domain -replace "[:/\\*?|<>]", "_"
    $outFileIco = Join-Path $outDir "$safeName.ico"
    $outFilePng = Join-Path $outDir "$safeName.png"
    $outFileSvg = Join-Path $outDir "$safeName.svg"
    
    # Skip if already downloaded
    if ((Test-Path $outFileIco) -or (Test-Path $outFilePng) -or (Test-Path $outFileSvg)) {
        Write-Host "  [SKIP] $domain - already exists" -ForegroundColor Gray
        $successCount++
        $successList += $domain
        continue
    }
    
    $downloaded = $false
    
    # Method 1: Try /favicon.ico directly
    try {
        $url = "https://$domain/favicon.ico"
        $response = Invoke-WebRequest -Uri $url -OutFile $outFileIco -TimeoutSec 5 -UseBasicParsing -PassThru -ErrorAction Stop
        if ((Test-Path $outFileIco) -and (Get-Item $outFileIco).Length -gt 100) {
            Write-Host "  [OK] $domain - downloaded ico" -ForegroundColor Green
            $downloaded = $true
            $successCount++
            $successList += $domain
        }
    } catch {
        # Try method 2: Use Google's favicon service as fallback (may be blocked)
        # Try method 2: Query common paths
        $commonPaths = @("/favicon.ico", "/icon.ico", "/apple-touch-icon.png", "/favicon.png")
        foreach ($path in $commonPaths) {
            if ($downloaded) { break }
            try {
                $url = "https://$domain$path"
                $ext = [System.IO.Path]::GetExtension($path)
                $outFile = Join-Path $outDir "$safeName$ext"
                $response = Invoke-WebRequest -Uri $url -OutFile $outFile -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
                if ((Test-Path $outFile) -and (Get-Item $outFile).Length -gt 100) {
                    Write-Host "  [OK] $domain - downloaded $path" -ForegroundColor Green
                    $downloaded = $true
                    $successCount++
                    $successList += $domain
                    break
                }
            } catch {}
        }
    }
    
    if (-not $downloaded) {
        # Use default SVG as fallback
        Copy-Item $defaultIcon $outFileSvg -Force
        Write-Host "  [FAIL] $domain - using default" -ForegroundColor Yellow
        $failCount++
        $failList += $domain
    }
    
    # Rate limiting - small delay
    Start-Sleep -Milliseconds 200
}

Write-Host "`n===== Summary =====" -ForegroundColor Cyan
Write-Host "Total domains: $($domains.Count)" -ForegroundColor White
Write-Host "Successfully downloaded: $successCount" -ForegroundColor Green
Write-Host "Using default icon: $failCount" -ForegroundColor Yellow

# Save results
$successList | Out-File "favicon-success.txt" -Encoding UTF8
$failList | Out-File "favicon-fail.txt" -Encoding UTF8

Write-Host "`nSuccess list saved to favicon-success.txt" -ForegroundColor Gray
Write-Host "Fail list saved to favicon-fail.txt" -ForegroundColor Gray
