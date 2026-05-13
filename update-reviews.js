// update-reviews.js v3 - 使用元宝搜索，带超时控制
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const QUERIES = [
  { keyword: 'ChatGPT 评测', tool: 'ChatGPT', icon: '🤖' },
  { keyword: 'DeepSeek 评测', tool: 'DeepSeek', icon: '🔍' },
  { keyword: 'Claude 评测', tool: 'Claude', icon: '🧠' },
  { keyword: 'Gemini 评测', tool: 'Gemini', icon: '✨' },
  { keyword: 'SiliconFlow 评测', tool: 'SiliconFlow', icon: '💧' },
  { keyword: 'OpenRouter 评测', tool: 'OpenRouter', icon: '🛤️' },
];

const PROSEARCH = 'C:\\Program Files\\QClaw\\resources\\openclaw\\config\\skills\\online-search\\scripts\\prosearch.cjs';

function searchOne(keyword) {
  try {
    const cmd = `node "${PROSEARCH}" --keyword="${keyword}" --freshness=7d`;
    const output = execSync(cmd, { encoding: 'utf8', timeout: 20000, maxBuffer: 1024 * 1024 });
    const json = JSON.parse(output);
    if (!json.success || !json.data || !json.data.docs) return [];
    return json.data.docs.slice(0, 2).map(d => ({
      title: (d.title || '').slice(0, 80),
      url: d.url,
      source: d.site || '互联网',
      time: d.date ? d.date.split(' ')[0] : new Date().toISOString().slice(0, 10)
    }));
  } catch (e) {
    console.log(`  ⚠️ "${keyword}" 失败: ${e.message.slice(0, 80)}`);
    return [];
  }
}

function main() {
  console.log('🔍 开始搜索最新AI评测...');
  const newReviews = [];

  for (const q of QUERIES) {
    console.log(`搜索: ${q.keyword}`);
    const results = searchOne(q.keyword);
    console.log(`  → 找到 ${results.length} 条`);
    for (const r of results) {
      newReviews.push({ ...r, tool: q.tool, toolIcon: q.icon });
    }
  }

  if (newReviews.length === 0) {
    console.log('⚠️ 没找到任何文章');
    return;
  }

  // 去重
  const seen = new Set();
  const unique = newReviews.filter(r => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });
  console.log(`\n✅ 共 ${unique.length} 条（去重后）`);

  // 1. 更新 tools.json
  const toolsPath = path.join(__dirname, 'tools.json');
  const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  const toolReviews = {};
  for (const r of unique) {
    if (!toolReviews[r.tool]) toolReviews[r.tool] = [];
    toolReviews[r.tool].push({ title: r.title, url: r.url, source: r.source, time: r.time });
  }
  for (const tool of toolsData.tools || []) {
    if (toolReviews[tool.name]) {
      const existing = new Set((tool.reviews || []).map(r => r.title));
      const newItems = toolReviews[tool.name].filter(r => !existing.has(r.title));
      tool.reviews = [...newItems, ...(tool.reviews || [])].slice(0, 20);
    }
  }
  fs.writeFileSync(toolsPath, JSON.stringify(toolsData, null, 2), 'utf8');
  console.log('✅ 已更新 tools.json');

  // 2. 更新 index.html 的 REVIEWS_DATA
  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const startTag = 'var REVIEWS_DATA = [';
  const endTag = '];';
  const sIdx = html.indexOf(startTag);
  const eIdx = html.indexOf(endTag, sIdx);
  if (sIdx === -1 || eIdx === -1) { console.log('❌ 找不到 REVIEWS_DATA'); return; }

  const dataLines = unique.slice(0, 25).map(r =>
    `      { tool: "${r.tool}", toolIcon: "${r.toolIcon}", title: "${r.title.replace(/"/g, '\\"')}", url: "${r.url}", source: "${r.source.replace(/"/g, '\\"')}", time: "${r.time}" },`
  ).join('\n');

  html = html.substring(0, sIdx + startTag.length) + '\n' + dataLines + html.substring(eIdx);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ 已更新 index.html');
  console.log('\n🎉 更新完成！');
}

main();
