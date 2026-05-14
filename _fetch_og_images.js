// 批量获取每个AI工具官网的OG Image和截图URL
// 输出: tool-images.json [{id, name, url, ogImage, screenshotUrls}]
const fs = require('fs');
const https = require('https');
const http = require('http');

const data = JSON.parse(fs.readFileSync('tools.json', 'utf8'));
const tools = data.tools;

const results = [];
let completed = 0;
const total = tools.length;

function fetchUrl(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) { reject('invalid url'); return; }
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location, timeout).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { reject('status ' + res.statusCode); return; }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject('timeout'); });
  });
}

function extractOgImage(html) {
  // Try og:image first, then twitter:image
  const ogMatch = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i) 
    || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i);
  if (ogMatch) return ogMatch[1];
  const twMatch = html.match(/<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i);
  if (twMatch) return twMatch[1];
  return null;
}

function extractOgDescription(html) {
  const match = html.match(/<meta\s+(?:property|name)=["']og:description["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:description["']/i);
  return match ? match[1] : null;
}

async function processTool(tool) {
  const result = { id: tool.id, name: tool.name, url: tool.url, ogImage: null, ogDesc: null };
  try {
    const html = await fetchUrl(tool.url, 8000);
    result.ogImage = extractOgImage(html);
    result.ogDesc = extractOgDescription(html);
  } catch (e) {
    result.error = String(e);
  }
  completed++;
  if (completed % 20 === 0) {
    console.log(`Progress: ${completed}/${total} (found OG: ${results.filter(r => r.ogImage).length})`);
  }
  return result;
}

// Process in batches of 10 to avoid overwhelming
async function run() {
  const batchSize = 10;
  for (let i = 0; i < tools.length; i += batchSize) {
    const batch = tools.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(t => processTool(t)));
    results.push(...batchResults);
  }
  
  const found = results.filter(r => r.ogImage).length;
  console.log(`\nDone! Found OG images for ${found}/${total} tools`);
  
  fs.writeFileSync('tool-images.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved to tool-images.json');
  
  // Also output tools missing OG image
  const missing = results.filter(r => !r.ogImage);
  console.log(`\nMissing OG image (${missing.length}):`);
  missing.forEach(r => console.log(`  ${r.id} | ${r.url} | ${r.error || 'no og:image found'}`));
}

run().catch(console.error);
