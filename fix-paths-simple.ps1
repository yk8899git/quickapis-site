# Simple fix - just replace the URL prefix

$ErrorActionPreference = "Stop"

# Fix index.html
Write-Host "Fixing index.html..." -ForegroundColor Cyan
$content = Get-Content "index.html" -Raw -Encoding UTF8
$count = 0
if ($content.Contains("https://icons.duckduckgo.com/ip3/")) {
    $content = $content.Replace("https://icons.duckduckgo.com/ip3/", "favicons/")
    $count++
}
if ($content.Contains("this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>'")) {
    $content = $content.Replace("this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>'", "this.src='favicons/default.svg'")
}
Set-Content "index.html" -Value $content -Encoding UTF8 -NoNewline
Write-Host "  [OK] index.html fixed ($count replacements)" -ForegroundColor Green

# Fix tool-detail.html
Write-Host "Fixing tool-detail.html..." -ForegroundColor Cyan
$content2 = Get-Content "tool-detail.html" -Raw -Encoding UTF8
$count2 = 0
if ($content2.Contains("https://icons.duckduckgo.com/ip3/")) {
    $content2 = $content2.Replace("https://icons.duckduckgo.com/ip3/", "favicons/")
    $count2++
}
Set-Content "tool-detail.html" -Value $content2 -Encoding UTF8 -NoNewline
Write-Host "  [OK] tool-detail.html fixed ($count2 replacements)" -ForegroundColor Green

Write-Host "`nDone! All favicon URLs now point to local favicons/ directory." -ForegroundColor Cyan
