# update-favicon-paths.ps1
# Update all favicon references to use local paths

$ErrorActionPreference = "Stop"

Write-Host "Updating index.html..." -ForegroundColor Cyan

# Read index.html as single string
$content = Get-Content "index.html" -Raw -Encoding UTF8

# Replace the favicon URL in index.html
$oldPattern = 'src="https://icons.duckduckgo.com/ip3/\${tool.domain}.ico" alt="\${tool.name}" onerror="this.onerror=null;this.src=''data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>''"'
$newText = 'src="favicons/${tool.domain}.ico" alt="${tool.name}" onerror="this.onerror=null;this.src=''favicons/default.svg''"'

$content = $content -replace [regex]::Escape('src="https://icons.duckduckgo.com/ip3/${tool.domain}.ico" alt="${tool.name}" onerror="this.onerror=null;this.src=''data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>''"'), 'src="favicons/${tool.domain}.ico" alt="${tool.name}" onerror="this.onerror=null;this.src=''favicons/default.svg''"'

Set-Content "index.html" -Value $content -Encoding UTF8
Write-Host "  [OK] index.html updated" -ForegroundColor Green

Write-Host "Updating tool-detail.html..." -ForegroundColor Cyan

# Read tool-detail.html
$content2 = Get-Content "tool-detail.html" -Raw -Encoding UTF8

# Replace first occurrence (main tool icon - line 67)
$content2 = $content2 -replace "src=""https://icons.duckduckgo.com/ip3/' \+ domain \+ '\.ico""", 'src="favicons/\' + domain + '\'.ico\""'

# Replace second occurrence (related tools - line 83)  
$content2 = $content2 -replace "src=""https://icons.duckduckgo.com/ip3/' \+ rd \+ '\.ico""", 'src="favicons/\' + rd + '\'.ico\""'

Set-Content "tool-detail.html" -Value $content2 -Encoding UTF8
Write-Host "  [OK] tool-detail.html updated" -ForegroundColor Green

Write-Host "`nAll favicon paths updated to use local favicons/ directory!" -ForegroundColor Cyan
Write-Host "Favicons will be loaded from: favicons/{domain}.ico" -ForegroundColor Gray
Write-Host "Fallback: favicons/default.svg" -ForegroundColor Gray
