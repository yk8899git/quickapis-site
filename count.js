const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.qclaw\\workspace-agent-a39b23d9\\quickapis-site-temp\\tools.json', 'utf8'));
const cats = ['图像生成', '音频工具', '视频制作', '设计工具', '3D建模'];
const tools = data.tools.filter(t => cats.includes(t.category));
const needs = tools.filter(t => !(t.specs && t.pricing && t.features && t.pros && t.cons));
console.log('Total needing data: ' + needs.length);

// Group by category
const byCat = {};
needs.forEach(t => {
  if (!byCat[t.category]) byCat[t.category] = [];
  byCat[t.category].push(t.id + ' | ' + t.name);
});
for (const [cat, ids] of Object.entries(byCat)) {
  console.log('\n' + cat + ' (' + ids.length + '):');
  ids.forEach(id => console.log('  ' + id));
}
