const fs = require('fs');
let r = fs.readFileSync('tools.json', 'utf8');
if (r.charCodeAt(0) === 0xFEFF) r = r.slice(1);
const d = JSON.parse(r);
const cats = {};
d.tools.forEach(function(t) {
  if (!cats[t.category]) cats[t.category] = [];
  cats[t.category].push({id: t.id, name: t.name, nameCn: t.nameCn || t.name});
});
Object.keys(cats).sort().forEach(function(k) {
  const names = cats[k].slice(0, 4).map(t => t.nameCn).join(', ');
  const extra = cats[k].length > 4 ? ' 等' + cats[k].length + '个' : '';
  console.log(k + ' (' + cats[k].length + '): ' + names + extra);
});
console.log('\nTotal:', d.tools.length);

// Show which tools are clearly foreign
console.log('\n=== 聊天AI 详情 ===');
cats['聊天AI'].forEach(t => console.log('  ' + t.id + ' | ' + t.nameCn));
console.log('\n=== 大模型API 详情 ===');
cats['大模型API'].forEach(t => console.log('  ' + t.id + ' | ' + t.nameCn));
