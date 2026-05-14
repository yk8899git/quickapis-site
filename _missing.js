const d=JSON.parse(require('fs').readFileSync('tools.json','utf8'));
const m=d.tools.filter(t=>!t.bannerImage);
console.log('Still missing:',m.length);
m.forEach(t=>console.log(t.id));
