const fs = require('fs');
let raw = fs.readFileSync('tools.json', 'utf8');
// Remove BOM if present
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const d = JSON.parse(raw);

const cats = {};
d.tools.forEach(function(t) {
  cats[t.category] = (cats[t.category] || 0) + 1;
});
console.log('=== 分类统计 ===');
Object.keys(cats).sort().forEach(function(k) {
  console.log(k + ': ' + cats[k]);
});
console.log('\nTotal tools:', d.tools.length);

console.log('\n\n=== AI物联网硬件 ===');
d.tools.filter(t => t.category === 'AI物联网硬件').forEach(function(t) {
  console.log(t.id, '|', t.name, '|', t.nameCn || t.name);
});

console.log('\n\n=== 国内合规AI模型(聊天/大模型API) ===');
var domestic = ['chatgpt','claude','gemini','deepseek','kimi','doubao','tongyi','wenxin','baichuan','zhipu','moonshot','spark','sensechat','hunyuan','ernie'];
d.tools.filter(t => t.category === '聊天AI' || t.category === '大模型API').forEach(function(t) {
  console.log(t.id, '|', t.name, '|', t.category);
});

// Save BOM-free version
fs.writeFileSync('tools.json', JSON.stringify(d, null, 2), 'utf8');
console.log('\nSaved BOM-free version');
