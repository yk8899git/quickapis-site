# update-paths.ps1 - Simple string replacement for favicon paths

$ErrorActionPreference = "Stop"

Write-Host "Reading index.html..." -ForegroundColor Cyan
$index = Get-Content "index.html" -Raw -Encoding UTF8

# Replace in index.html
$old1 = 'src="https://icons.duckduckgo.com/ip3/${tool.domain}.ico" alt="${tool.name}" onerror="this.onerror=null;this.src=''data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>''"'
$new1 = 'src="favicons/${tool.domain}.ico" alt="${tool.name}" onerror="this.onerror=null;this.src=''favicons/default.svg''"'

if ($index.Contains($old1)) {
    $index = $index.Replace($old1, $new1)
    Set-Content "index.html" -Value $index -Encoding UTF8 -NoNewline
    Write-Host "  [OK] index.html updated" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Pattern not found in index.html" -ForegroundColor Yellow
}

Write-Host "Reading tool-detail.html..." -ForegroundColor Cyan
$detail = Get-Content "tool-detail.html" -Raw -Encoding UTF8

# Replace first occurrence in tool-detail.html (main tool icon)
$old2 = "src=""https://icons.duckduckgo.com/ip3/' + domain + '.ico"""
$new2 = "src=""favicons/' + domain + '.ico"""

if ($detail.Contains($old2)) {
    $detail = $detail.Replace($old2, $new2)
    Write-Host "  [OK] First occurrence replaced" -ForegroundColor Green
} else {
    Write-Host "  [WARN] First pattern not found in tool-detail.html" -ForegroundColor Yellow
}

# Replace second occurrence (related tools)
$old3 = "src=""https://icons.duckduckgo.com/ip3/' + rd + '.ico"""
$new3 = "src=""favicons/' + rd + '.ico"""

if ($detail.Contains($old3)) {
    $detail = $detail.Replace($old3, $new3)
    Write-Host "  [OK] Second occurrence replaced" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Second pattern not found in tool-detail.html" -ForegroundColor Yellow
}

Set-Content "tool-detail.html" -Value $detail -Encoding UTF8 -NoNewline
Write-Host "  [OK] tool-detail.html saved" -ForegroundColor Green

Write-Host "`nDone! All favicon paths updated to use local favicons/ directory." -ForegroundColor Cyan
