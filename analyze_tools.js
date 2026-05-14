const fs = require('fs');
const path = 'C:\\Users\\Administrator\\.qclaw\\workspace-agent-a39b23d9\\quickapis-site-temp\\tools.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('Total tools:', data.tools.length);

const categories = ['代码助手', '开发者工具', '大模型API', '写作助手', '教育学习', '聊天AI'];
const skipIds = ['chatgpt', 'claude', 'gemini', 'kimi', 'deepseek', 'copilot', 'cursor', 'perplexity'];

const targetTools = data.tools.filter(t => categories.includes(t.category) && !skipIds.includes(t.id));

console.log('\nTools in target categories (excluding skip list):', targetTools.length);

console.log('\n--- All tools with status ---');
targetTools.forEach(t => {
  const hasData = t.specs && t.pricing && t.features;
  const status = hasData ? 'HAS DATA' : 'NEEDS DATA';
  console.log(`- ${t.id} (${t.nameCn || t.name}) [${t.category}] ${status}`);
});

console.log('\n--- Tools needing data (no specs/pricing/features) ---');
const needsData = targetTools.filter(t => !t.specs || !t.pricing || !t.features);
needsData.forEach(t => {
  console.log(`- ${t.id} (${t.nameCn || t.name}) [${t.category}]`);
});

console.log('\nTotal tools needing data:', needsData.length);
