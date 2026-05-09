// update-reviews.js
// 自动搜索最新AI评测文章，更新 index.html 中的 REVIEWS_DATA

const https = require('https');
const fs = require('fs');
const path = require('path');

// 搜索关键词（按工具）
const QUERIES = [
  'ChatGPT 评测 OR 测评 2026',
  'DeepSeek 评测 OR 测评 2026',
  'Claude 评测 OR 测评 2026',
  'Gemini 评测 OR 测评 2026',
  '大模型API 评测 OR 测评 2026',
  'SiliconFlow 评测 2026',
  'OpenRouter 评测 2026',
];

// 工具 icon 映射
const TOOL_ICON = {
  'chatgpt': '🤖', 'deepseek': '🔍', 'claude': '🧠',
  'gemini': '✨', 'siliconflow': '💧', 'openrouter': '🛤️',
  'groq': '⚡', 'zhipuai': '🧩', 'tongyi': '☁',
};

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

// 使用 DuckDuckGo Instant Answer API（无需密钥）
async function searchNews(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
    const res = await fetchURL(url);
    const json = JSON.parse(res.data);
    const results = [];
    if (json.RelatedTopics) {
      json.RelatedTopics.slice(0, 2).forEach(t => {
        const m = t.Text.match(/^([^<]+)/);
        if (m) results.push({ title: m[1].trim(), url: t.FirstURL || '' });
      });
    }
    return results;
  } catch (e) {
    return [];
  }
}

async function main() {
  console.log('🔍 开始搜索最新AI评测文章...');
  const newReviews = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const q of QUERIES) {
    const results = await searchNews(q);
    for (const r of results) {
      // 识别工具 id
      let toolId = 'chatgpt';
      let toolIcon = '🤖';
      for (const [id, icon] of Object.entries(TOOL_ICON)) {
        if (q.toLowerCase().includes(id)) { toolId = id; toolIcon = icon; break; }
      }
      newReviews.push({
        tool: toolId.charAt(0).toUpperCase() + toolId.slice(1),
        toolIcon,
        title: r.title.slice(0, 60),
        url: r.url,
        source: 'DuckDuckGo',
        time: today,
      });
    }
  }

  if (newReviews.length === 0) {
    console.log('⚠️ 没有找到新文章，保持原数据不变');
    return;
  }

  // 读取当前 REVIEWS_DATA
  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // 找到 REVIEWS_DATA 数组并替换
  const startTag = 'var REVIEWS_DATA = [';
  const endTag = '];';
  const sIdx = html.indexOf(startTag);
  if (sIdx === -1) { console.log('❌ 找不到 REVIEWS_DATA'); return; }
  const eIdx = html.indexOf(endTag, sIdx + startTag.length);
  if (eIdx === -1) { console.log('❌ 找不到 REVIEWS_DATA 结束'); return; }

  // 保留原有数据，追加新数据（去重）
  const existingData = html.substring(sIdx + startTag.length, eIdx);
  let merged = [...newReviews];
  // 简单去重：不加入 title 相同的
  const existingTitles = new Set();
  const block = html.substring(sIdx + startTag.length, eIdx).trim();
  const titleRe = /title:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = titleRe.exec(block)) !== null) existingTitles.add(m[1]);

  // 解析原有数据行
  const lines = block.split('\n').filter(l => l.trim().startsWith('{'));
  for (const line of lines) {
    const tMatch = line.match(/title:\s*['"]([^'"]+)['"]/);
    if (tMatch && !existingTitles.has(tMatch[1])) {
      existingTitles.add(tMatch[1]);
    }
  }

  const mergedLines = newReviews.filter(r => !existingTitles.has(r.title)).map(r =>
    `    { tool: "${r.tool}", toolIcon: "${r.toolIcon}", title: "${r.title.replace(/"/g, '\\"')}", url: "${r.url}", source: "${r.source}", time: "${r.time}" },`
  );

  const newBlock = '\n' + mergedLines.join('\n') + '\n    ' + existingData.trimEnd();
  const newHtml = html.substring(0, sIdx + startTag.length) + newBlock + html.substring(eIdx);

  fs.writeFileSync(htmlPath, newHtml, 'utf8');
  console.log(`✅ 更新了 ${mergedLines.length} 条新评测`);
}

main().catch(console.error);
