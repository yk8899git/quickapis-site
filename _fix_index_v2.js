const fs = require('fs');
const path = 'C:/Users/Administrator/.qclaw/workspace-agent-a39b23d9/quickapis-site-temp/index.html';

let html = fs.readFileSync(path, 'utf8');

// ============================================================
// FIX 1: 导航栏改为两行布局
// ============================================================
html = html.replace(
  '.nav-cats{display:flex;align-items:center;gap:4px;flex:1;overflow-x:auto;scrollbar-width:none;padding:4px 0}',
  '.nav-cats{display:flex;flex-wrap:wrap;align-items:center;gap:3px;flex:1;max-height:none;padding:6px 0}'
);
html = html.replace(
  '.nav-cat{padding:6px 14px;border-radius:100px;font-size:13px',
  '.nav-cat{padding:4px 10px;border-radius:100px;font-size:12px'
);
html = html.replace(
  '.nav-inner{max-width:1400px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:12px;min-height:64px}',
  '.nav-inner{max-width:1400px;margin:0 auto;padding:8px 24px;display:flex;flex-direction:column;align-items:stretch;gap:6px;min-height:auto}'
);

// ============================================================
// FIX 2: 轮播图换源 - 用 CSS 渐变背景替代 Unsplash（国内可访问）
// ============================================================
html = html.replace(
  /const SLIDES=\[[\s\S]*?\];/,
  `const SLIDES=[
  {tool:"ChatGPT",img:"",bg:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",tag:"🤖 ChatGPT",title:"ChatGPT全面测评：GPT-4o能力边界实测，编程写作双杀Claude",source:"CSDN",time:"2026-05-11"},
  {tool:"Claude",img:"",bg:"linear-gradient(135deg,#2d1b69 0%,#11998e 100%)",tag:"🧠 Claude",title:"Claude Opus 4.7深度评测：代码工程能力跃升64%，与GPT-5全面对标",source:"CSDN",time:"2026-05-11"},
  {tool:"Gemini",img:"",bg:"linear-gradient(135deg,#134e5e 0%,#71b280 100%)",tag:"✨ Gemini",title:"被忽视的Gemini：2026最被低估的全能AI神器，多模态能力实测",source:"CSDN",time:"2026-05-12"},
  {tool:"DeepSeek",img:"",bg:"linear-gradient(135deg,#200122 0%,#6f0000 100%)",tag:"🔍 DeepSeek",title:"DeepSeek-V4深度评测：参数解析与实战边界，国产大模型黑马",source:"CSDN",time:"2026-05-09"},
  {tool:"Kimi",img:"",bg:"linear-gradient(135deg,#0c0032 0%,#500072 50%,#8e2de2 100%)",tag:"🌙 Kimi",title:"Kimi K2.6长上下文实测：200万字文档一次性吃透，RAG该退休了",source:"知乎",time:"2026-05-10"},
];`
);

// ============================================================
// FIX 3: renderSlides 用 bg 替代 img
// ============================================================
html = html.replace(
  "d.innerHTML='<img src=\"'+s.img+'\" alt=\"'+s.tool+'\" onerror=\"this.src='https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'\"><div class=\"slide-overlay\"></div>",
  "d.innerHTML='<div class=\"slide-bg\" style=\"background:'+s.bg+';\"></div><div class=\"slide-overlay\"></div>"
);

// 在 slider-track 后面加 slide-bg 样式
html = html.replace(
  '.slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
  '.slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n    .slide-bg{position:absolute;inset:0;width:100%;height:100%;background-size:cover;background-position:center}'
);

// ============================================================
// FIX 4: tools.json 加载 + 错误处理 + 点击分类显示工具列表
// ============================================================

// 添加工具网格区域 HTML（在 split div 内）
html = html.replace(
  '<main class="main-wrap">\n  <div class="split">',
  `<main class="main-wrap">
  <!-- 工具网格区域：点击分类时显示 -->
  <div id="toolsGridWrap" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h2 id="gridTitle" style="font-size:20px;font-weight:800">全部工具</h2>
      <span id="gridCount" style="font-size:13px;color:var(--muted)"></span>
    </div>
    <div id="toolsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px"></div>
    <button onclick="document.getElementById('toolsGridWrap').style.display='none';document.querySelector('.split').style.display='grid'" style="margin-top:16px;padding:8px 20px;border-radius:100px;background:#f5f3f0;border:1px solid var(--border);font-size:13px;color:var(--muted);cursor:pointer">← 返回首页</button>
  </div>
  <div class="split">`
);

// 替换 load 函数 - 增加错误处理和工具网格渲染
html = html.replace(
  `async function load(){
  try{
    const r=await fetch('tools.json');
    const d=await r.json();
    tools=d.tools.map(t=>{const m=CM[t.category]||{key:'other'};return{id:t.id,name:t.name,nameCn:t.nameCn||t.name,icon:t.icon||'◈',cat:m.key||'other',catLabel:t.category||'其他',desc:t.description||'',url:t.url||'#'}});
    document.getElementById('toolNum').textContent=tools.length;
    renderCards(tools.slice(0,20));
  }catch(e){console.error(e)}
}`,
  `async function load(){
  try{
    const r=await fetch('./tools.json?v='+Date.now());
    if(!r.ok) throw new Error('HTTP '+r.status);
    const d=await r.json();
    tools=(d.tools||[]).map(t=>{
      const m=CM[t.category]||{key:'other'};
      return{id:t.id,name:t.name,nameCn:t.nameCn||t.name,icon:t.icon||'◈',cat:m.key||'other',catLabel:t.category||'其他',desc:t.description||'',url:t.url||'#',bannerImage:t.bannerImage||''}
    });
    document.getElementById('toolNum').textContent=tools.length;
    renderCards(tools.slice(0,20));
    console.log('Loaded '+tools.length+' tools');
  }catch(e){
    console.error('Load failed:',e);
    document.getElementById('rPanel').innerHTML='<div class="rp-title">🔥 推荐工具</div><div style="padding:24px;text-align:center;color:#999;font-size:13px">⚠ 工具数据加载失败<br><small>请检查网络或刷新重试</small></div>';
  }
}`
);

// 替换 applyF 函数 - 点击分类显示工具网格
html = html.replace(
  `function applyF(){
  let f=tools;
  if(q){f=tools.filter(t=>t.name.toLowerCase().includes(q)||t.nameCn.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.catLabel.toLowerCase().includes(q))}
  else if(curCat!=='all'){f=tools.filter(t=>t.cat===curCat)}
  renderCards(f.slice(0,20));
}`,
  `function applyF(){
  let f=tools;
  if(q){
    f=tools.filter(t=>t.name.toLowerCase().includes(q)||t.nameCn.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.catLabel.toLowerCase().includes(q));
  }else if(curCat!=='all'){
    f=tools.filter(t=>t.cat===curCat);
  }else{
    f=tools;
  }

  // 如果有搜索词或选了特定分类 → 显示完整工具网格
  if(q || curCat!=='all'){
    showToolsGrid(f, curCat==='all'?'搜索结果':(Object.keys(CM).find(k=>CM[k]===curCat)||curCat));
  }else{
    // 默认状态：右侧显示推荐卡片
    document.getElementById('toolsGridWrap').style.display='none';
    document.querySelector('.split').style.display='grid';
    renderCards(f.slice(0,20));
  }
}

function showToolsGrid(ts, title){
  document.querySelector('.split').style.display='none';
  const wrap=document.getElementById('toolsGridWrap');
  const grid=document.getElementById('toolsGrid');
  document.getElementById('gridTitle').textContent=title+' ('+ts.length+')';
  document.getElementById('gridCount').textContent='共 '+ts.length+' 个工具';
  grid.innerHTML='';
  ts.forEach(t=>{
    const card=document.createElement('div');
    card.className='mini-card';
    card.style.cursor='pointer';
    card.onclick=()=>location.href='tool-detail.html?id='+t.id;
    var bannerHtml='';
    if(t.bannerImage){
      bannerHtml='<div style="width:100%;height:80px;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#f0eeed"><img src="'+t.bannerImage+'" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.style.display=\'none\'"></div>';
    }
    card.innerHTML=bannerHtml+
      '<div style="display:flex;align-items:center;gap:8px">'+
      '<div class="mini-icon"><img src="icons/'+t.id+'.png" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\''+t.icon+'\'"></div>'+
      '<div class="mini-info"><div class="mini-name">'+t.nameCn+'</div><div class="mini-cat">'+t.catLabel+'</div></div>'+
      '</div>'+
      '<div style="margin-top:6px;font-size:11px;color:var(--muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+
      t.desc.substring(0,60)+(t.desc.length>60?'...':'')+'</div>';
    grid.appendChild(card);
  });
  wrap.style.display='block';
}`
);

fs.writeFileSync(path, html, 'utf8');
console.log('Fixed! Size:', html.length, 'bytes');
