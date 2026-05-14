const fs = require('fs');
const path = 'C:/Users/Administrator/.qclaw/workspace-agent-a39b23d9/quickapis-site-temp/index.html';
let html = fs.readFileSync(path, 'utf8');

// Split at <script> to replace everything after it
const scriptStart = html.indexOf('<script>');
const beforeScript = html.substring(0, scriptStart);
const afterScript = html.substring(scriptStart);

// Replace entire script block
const newScript = `<script>
const SLIDES=[
  {tool:"ChatGPT",img:"",bg:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",tag:"🤖 ChatGPT",title:"ChatGPT全面测评：GPT-4o能力边界实测，编程写作双杀Claude",source:"CSDN",time:"2026-05-11"},
  {tool:"Claude",img:"",bg:"linear-gradient(135deg,#2d1b69 0%,#11998e 100%)",tag:"🧠 Claude",title:"Claude Opus 4.7深度评测：代码工程能力跃升64%，与GPT-5全面对标",source:"CSDN",time:"2026-05-11"},
  {tool:"Gemini",img:"",bg:"linear-gradient(135deg,#134e5e 0%,#71b280 100%)",tag:"✨ Gemini",title:"被忽视的Gemini：2026最被低估的全能AI神器，多模态能力实测",source:"CSDN",time:"2026-05-12"},
  {tool:"DeepSeek",img:"",bg:"linear-gradient(135deg,#200122 0%,#6f0000 100%)",tag:"🔍 DeepSeek",title:"DeepSeek-V4深度评测：参数解析与实战边界，国产大模型黑马",source:"CSDN",time:"2026-05-09"},
  {tool:"Kimi",img:"",bg:"linear-gradient(135deg,#0c0032 0%,#500072 50%,#8e2de2 100%)",tag:"🌙 Kimi",title:"Kimi K2.6长上下文实测：200万字文档一次性吃透，RAG该退休了",source:"知乎",time:"2026-05-10"},
];
let sIdx=0,si;
function goSlide(n){
  sIdx=(n+SLIDES.length)%SLIDES.length;
  document.getElementById('sTrack').style.transform='translateX(-'+(sIdx*100)+'%)';
  document.querySelectorAll('.s-dot').forEach((d,i)=>d.classList.toggle('active',i===sIdx));
  clearInterval(si);si=setInterval(()=>goSlide(sIdx+1),3000);
}
function renderSlides(){
  const track=document.getElementById('sTrack'),dots=document.getElementById('sDots');
  SLIDES.forEach((s,i)=>{
    const d=document.createElement('div');d.className='slide';
    d.innerHTML='<div class="slide-bg" style="background:'+s.bg+'"></div><div class="slide-overlay"></div><div class="slide-content"><div class="slide-tag">'+s.tag+'</div><div class="slide-title">'+s.title+'</div><div class="slide-meta"><span>📰 '+s.source+'</span><span class="slide-dot"></span><span>'+s.time+'</span></div><button class="slide-link-btn">阅读评测 →</button></div>';
    track.appendChild(d);
    const dot=document.createElement('div');dot.className='s-dot'+(i===0?' active':'');
    dot.onclick=()=>goSlide(i);dots.appendChild(dot);
  });
}
document.getElementById('sPrev').onclick=()=>goSlide(sIdx-1);
document.getElementById('sNext').onclick=()=>goSlide(sIdx+1);
renderSlides();si=setInterval(()=>goSlide(sIdx+1),3000);

let tools=[],curCat='all',q='';
const CM={'全部':'all','聊天AI':'chat','图像生成':'image','代码助手':'code','视频制作':'video','音频工具':'audio','办公效率':'office','搜索研究':'search','3D建模':'3d','设计工具':'design','写作助手':'writing','大模型API':'api','开发者工具':'dev','教育学习':'education','AI物联网硬件':'aiiot','其他':'other'};

async function load(){
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
    var rp=document.getElementById('rPanel');
    if(rp) rp.innerHTML='<div class="rp-title">🔥 推荐工具</div><div style="padding:24px;text-align:center;color:#999;font-size:13px">⚠ 工具数据加载失败<br><small style="color:#bbb">请检查网络或刷新页面重试</small></div>';
  }
}

function renderCards(ts){
  var panel=document.getElementById('rPanel');
  if(!panel) return;
  panel.innerHTML='<div class="rp-title">🔥 推荐工具</div>';
  ts.forEach(t=>{
    var c=document.createElement('div');c.className='mini-card';
    c.onclick=function(){location.href='tool-detail.html?id='+t.id};
    var iconHtml='<img src="icons/'+t.id+'.png" onerror="this.style.display=\\'none\\';this.parentElement.innerHTML=\\''+t.icon+'\\'" style="width:24px;height:24px;object-fit:contain">';
    c.innerHTML='<div class="mini-icon">'+iconHtml+'</div><div class="mini-info"><div class="mini-name">'+t.nameCn+'</div><div class="mini-cat">'+t.catLabel+'</div></div><div class="mini-arrow">→</div><div class="mini-tip">'+escHtml(t.desc).substring(0,80)+(t.desc.length>80?'...':'')+'</div>';
    panel.appendChild(c);
  });
}

function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

document.getElementById('navCats').addEventListener('click',function(e){
  if(!e.target.classList.contains('nav-cat')) return;
  curCat=e.target.dataset.cat;
  document.querySelectorAll('.nav-cat').forEach(function(b){b.classList.toggle('active',b===e.target)});
  applyF();
});
document.getElementById('navSearch').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();applyF()});

function applyF(){
  var f=tools;
  if(q){
    f=tools.filter(function(t){return t.name.toLowerCase().indexOf(q)!==-1||t.nameCn.toLowerCase().indexOf(q)!==-1||t.desc.toLowerCase().indexOf(q)!==-1||t.catLabel.toLowerCase().indexOf(q)!==-1});
  }else if(curCat!=='all'){
    f=tools.filter(function(t){return t.cat===curCat});
  }else{
    f=tools;
  }
  if(q || curCat!=='all'){
    showToolsGrid(f, curCat==='all'?'搜索结果':getCatName(curCat));
  }else{
    var gw=document.getElementById('toolsGridWrap');
    if(gw) gw.style.display='none';
    var sp=document.querySelector('.split');
    if(sp) sp.style.display='grid';
    renderCards(f.slice(0,20));
  }
}

function getCatName(key){
  for(var k in CM){if(CM[k]===key) return k}
  return key;
}

function showToolsGrid(ts, title){
  var sp=document.querySelector('.split');
  if(sp) sp.style.display='none';
  var wrap=document.getElementById('toolsGridWrap');
  var grid=document.getElementById('toolsGrid');
  if(!wrap || !grid) return;
  var gt=document.getElementById('gridTitle');
  if(gt) gt.textContent=title+' ('+ts.length+')';
  var gc=document.getElementById('gridCount');
  if(gc) gc.textContent='共 '+ts.length+' 个工具';
  grid.innerHTML='';
  ts.forEach(function(t){
    var card=document.createElement('div');
    card.className='mini-card';
    card.style.cursor='pointer';
    card.onclick=function(){location.href='tool-detail.html?id='+t.id};
    var bannerHtml='';
    if(t.bannerImage){
      bannerHtml='<div style="width:100%;height:80px;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#f0eeed"><img src="'+t.bannerImage+'" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.style.display=\\'none\\'"></div>';
    }
    var iconImg='<img src="icons/'+t.id+'.png" onerror="this.style.display=\\'none\\';this.parentElement.innerHTML=\\''+t.icon+'\\'" style="width:20px;height:20px;object-fit:contain">';
    card.innerHTML=bannerHtml+
      '<div style="display:flex;align-items:center;gap:8px">'+
      '<div class="mini-icon">'+iconImg+'</div>'+
      '<div class="mini-info"><div class="mini-name">'+t.nameCn+'</div><div class="mini-cat">'+t.catLabel+'</div></div>'+
      '</div>'+
      '<div style="margin-top:6px;font-size:11px;color:var(--muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+
      escHtml(t.desc).substring(0,60)+(t.desc.length>60?'...':'')+'</div>';
    grid.appendChild(card);
  });
  wrap.style.display='block';
}

load();
</script>`;

html = beforeScript + newScript;

// Also add the toolsGridWrap HTML section
html = html.replace(
  '<main class="main-wrap">\n  <div class="split">',
  `<main class="main-wrap">
  <div id="toolsGridWrap" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h2 id="gridTitle" style="font-size:20px;font-weight:800">全部工具</h2>
      <span id="gridCount" style="font-size:13px;color:var(--muted)"></span>
    </div>
    <div id="toolsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px"></div>
    <button onclick="document.getElementById('toolsGridWrap').style.display='none';var s=document.querySelector('.split');if(s)s.style.display='grid'" style="margin-top:16px;padding:8px 20px;border-radius:100px;background:#f5f3f0;border:1px solid rgba(0,0,0,0.07);font-size:13px;color:#78716c;cursor:pointer">← 返回首页</button>
  </div>
  <div class="split">`
);

fs.writeFileSync(path, html, 'utf8');
console.log('Done! Size:', html.length, 'bytes');
