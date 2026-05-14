// update-reviews.js
// 自动搜索最新AI评测文章，更新 index.html 中的 REVIEWS_DATA
// 搜索源：Bing 国际版（国内可访问，无需 API Key）
// 带超时控制

const https = require('https');
const fs = require('fs');
const path = require('path');

const QUERIES = [
  'ChatGPT \u8BC4\u6D4B \u6D4B\u8BC4 2026',
  'DeepSeek \u8BC4\u6D4B \u6D4B\u8BC4 2026',
  'Claude \u8BC4\u6D4B \u6D4B\u8BC4 2026',
  'Gemini \u8BC4\u6D4B \u6D4B\u8BC4 2026',
  '\u5927\u6A21\u578BAPI \u8BC4\u6D4B \u6D4B\u8BC4 2026',
  'SiliconFlow \u8BC4\u6D4B 2026',
  'OpenRouter \u8BC4\u6D4B 2026',
];

const TOOL_ICON = {
  'chatgpt': '\u{1F916}', 'deepseek': '\u{1F50D}', 'claude': '\u{1F9E0}',
  'gemini': '\u2728', 'siliconflow': '\u{1F4A7}', 'openrouter': '\u{1F6E4}\uFE0F',
  'groq': '\u26A1', 'zhipuai': '\u{1F9E0}', 'tongyi': '\u2601',
};

const FETCH_TIMEOUT = 12000;

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { try { req.destroy(); } catch(e){} reject(new Error('TIMEOUT')); }, FETCH_TIMEOUT);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        clearTimeout(timer);
        resolve(fetchURL(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { clearTimeout(timer); resolve({ status: res.statusCode, data }); });
    });
    req.on('error', (e) => { clearTimeout(timer); reject(e); });
    req.setTimeout(FETCH_TIMEOUT, () => { try { req.destroy(); } catch(e){} clearTimeout(timer); reject(new Error('TIMEOUT')); });
  });
}

// Bing search - extract results from HTML
async function searchBing(query) {
  try {
    const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&count=5`;
    const res = await fetchURL(url);
    if (!res.data || res.data.length < 100 || res.status !== 200) return [];

    const results = [];
    // Bing result pattern: <a class="tilk" ... href="URL" aria-label="SITE"> ... <p class="b_lineclamp2">TITLE TEXT</p>
    // Title is in b_tpcn area or nearby
    // Pattern 1: b_algo > b_tpcn > a[href] with caption text following
    const algoRe = new RegExp('<li class="b_algo"[^>]*>[\\s\\S]*?<a[^>]*href="(https?://[^"]+)"[^>]*>([\\s\\S]*?)<\/a>', 'g');
    let m;
    while ((m = algoRe.exec(res.data)) !== null) {
      const url = m[1];
      // Extract title from the link content or surrounding context
      const block = m[0];
      // Try to find text content as title
      const titleMatch = block.match(/aria-label="([^"]+)"/);
      let title = titleMatch ? titleMatch[1] : '';
      // Also check for b_lineclamp2 nearby
      if (!title || title.length < 3) {
        const capMatch = block.match(/<p class="b_lineclamp2"[^>]*>([^<]+(?:<[^>]+>[^<]*)*)<\/p>/);
        if (capMatch) title = capMatch[1].replace(/<[^>]+>/g, '').trim();
      }
      if (!title) title = m[2].replace(/<[^>]+>/g, '').trim();
      if (title.length > 5 && url.startsWith('http')) {
        results.push({ title: title.slice(0, 80), url: url });
      }
    }

    // Pattern 2: if pattern 1 failed, try broader match for any links in results
    if (results.length === 0) {
      const broadRe = new RegExp('<a[^>]*href="(https?://(?:www\\.)?(?:zhihu|csdn|juejin|sspai|36kr|ithome|cnblogs|jianshu|bilibili|toutiao|weixin)\\.[^"]+)"[^>]*>(.*?)<\/a>', 'gis');
      while ((m = broadRe.exec(res.data)) !== null) {
        const t = m[2].replace(/<[^>]+>/g, '').trim();
        if (t.length > 5) results.push({ title: t.slice(0, 80), url: m[1] });
      }
    }

    return results.slice(0, 3);
  } catch (e) {
    console.log(`  \u26A0\uFE0F Bing search error: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('\uD83D\uDD0D Searching latest AI reviews via Bing...');
  const today = new Date().toISOString().slice(0, 10);
  const allReviews = [];

  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    process.stdout.write(`  [${i + 1}/${QUERIES.length}] ${q.slice(0, 30)}... `);
    try {
      const results = await searchBing(q);
      console.log(`${results.length} found`);
      for (const r of results) {
        let toolId = 'chatgpt';
        let toolIcon = TOOL_ICON['chatgpt'];
        for (const [id, icon] of Object.entries(TOOL_ICON)) {
          if (q.toLowerCase().includes(id)) { toolId = id; toolIcon = icon; break; }
        }
        allReviews.push({
          tool: toolId.charAt(0).toUpperCase() + toolId.slice(1),
          toolIcon,
          title: r.title,
          url: r.url,
          source: 'Bing',
          time: today,
        });
      }
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
    }
  }

  if (allReviews.length === 0) {
    console.log('\u26A0\uFE0F No new articles found, keeping existing data.');
    return;
  }

  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  const startTag = 'var REVIEWS_DATA = [';
  const endTag = '];';
  const sIdx = html.indexOf(startTag);
  if (sIdx === -1) { console.log('\u274C REVIEWS_DATA not found'); return; }
  const eIdx = html.indexOf(endTag, sIdx + startTag.length);
  if (eIdx === -1) { console.log('\u274C REVIEWS_DATA end not found'); return; }

  const existingBlock = html.substring(sIdx + startTag.length, eIdx);
  const existingTitles = new Set();
  const titleRe = /title:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = titleRe.exec(existingBlock)) !== null) existingTitles.add(m[1]);

  const newItems = allReviews.filter(r => !existingTitles.has(r.title));
  if (newItems.length === 0) {
    console.log('\u26A0\uFE0F All results already exist, no update needed.');
    return;
  }

  const newLines = newItems.map(r =>
    `    { tool: "${r.tool}", toolIcon: "${r.toolIcon}", title: "${r.title.replace(/"/g, '\\\"')}", url: "${r.url}", source: "${r.source}", time: "${r.time}" },`
  );

  const newBlock = '\n' + newLines.join('\n') + '\n    ' + existingBlock.trimEnd();
  const newHtml = html.substring(0, sIdx + startTag.length) + newBlock + html.substring(eIdx);

  fs.writeFileSync(htmlPath, newHtml, 'utf8');
  console.log(`\u2705 Updated ${newLines.length} new reviews (${allReviews.length} total found)`);

  // Git commit and push
  const { execSync } = require('child_process');
  try {
    execSync('git add index.html && git commit -m "Auto: update reviews data" && git push', {
      cwd: __dirname,
      stdio: 'pipe',
      timeout: 30000
    });
    console.log('\u2705 Git push successful!');
  } catch (e) {
    // If connection reset, retry once
    console.log('\u26A0\uFE0F Git push failed, retrying...');
    try {
      execSync('git add index.html && git commit -m "Auto: update reviews data" --allow-empty && git push', {
        cwd: __dirname,
        stdio: 'pipe',
        timeout: 30000
      });
      console.log('\u2705 Git push retry successful!');
    } catch (e2) {
      console.log('\u274C Git push failed:', e2.message.slice(0, 200));
    }
  }
}

main().catch(e => {
  console.error('\u274C Fatal error:', e.message);
  process.exit(1);
});
