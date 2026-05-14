const fs = require('fs');
let raw = fs.readFileSync('tools-filtered.json', 'utf8');
const data = JSON.parse(raw);

const CHECK_CATS = ['图像生成', '视频制作', '音频工具', '设计工具', '3D建模', '写作助手', '办公效率', '搜索研究', '代码助手', '开发者工具'];

CHECK_CATS.forEach(cat => {
  const items = data.tools.filter(t => t.category === cat);
  if (items.length > 0) {
    console.log('\n=== ' + cat + ' (' + items.length + ') ===');
    items.forEach(t => {
      const suspicious = /midjourney|runway|pika|sora|elevenlabs|suno|udio|quillbot|jasper|gamma|meshy|tripo/i.test(t.name + '|' + (t.nameCn||''));
      const flag = suspicious ? '⚠️ 疑似国外' : '  ';
      console.log('  ' + flag + ' ' + t.id + ' | ' + (t.nameCn||t.name) + ' | ' + (t.description ? t.description.slice(0,40) : ''));
    });
  }
});

// 也看下聊天AI and 大模型API 里保留了哪些
console.log('\n=== 聊天AI 保留 ===');
data.tools.filter(t=>t.category==='聊天AI').forEach(t=>console.log('  '+t.id+' | '+(t.nameCn||t.name)));
console.log('\n=== 大模型API 保留 ===');
data.tools.filter(t=>t.category==='大模型API').forEach(t=>console.log('  '+t.id+' | '+(t.nameCn||t.name)));
console.log('\n=== AI物联网硬件 保留 ===');
data.tools.filter(t=>t.category==='AI物联网硬件').forEach(t=>console.log('  '+t.id+' | '+(t.nameCn||t.name)));
