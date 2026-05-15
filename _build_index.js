/**
 * 重建 index.html - 双Tab导航 + 新分类 + AI硬件轮播（含真实产品图）
 */
const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QuickAPIs - AI工具与智能硬件导航 | 发现国内优质AI产品</title>
  <meta name="description" content="QuickAPIs收录国内合规AI软体工具与AIoT智能硬件，覆盖DeepSeek、Kimi、宇树、大疆、科沃斯等品牌。">
  <link rel="canonical" href="https://quickapis.top/">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="shortcut icon" href="favicon.svg">
  <style>
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    :root{
      --accent:#f97316;--accent2:#f43f5e;--bg:#faf9f7;
      --card:#fff;--border:rgba(0,0,0,0.07);--text:#1c1917;--muted:#78716c;
      --hw-accent:#10b981;--hw-accent2:#06b6d4;
    }
    html{scroll-behavior:smooth}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans SC',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration:none}
    button{font-family:inherit;cursor:pointer;border:none;background:none}
    input{font-family:inherit}

    /* 导航栏 */
    .navbar{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
    .nav-inner{max-width:1400px;margin:0 auto;padding:8px 24px;display:flex;flex-direction:column;align-items:stretch;gap:6px;min-height:auto}
    .nav-top{display:flex;align-items:center;gap:16px}
    .nav-logo{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:800;
      background:linear-gradient(135deg,#f97316,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;white-space:nowrap;flex-shrink:0}
    .nav-logo svg{width:24px;height:24px}
    .nav-search{flex:1;max-width:320px;position:relative}
    .nav-search input{width:100%;padding:7px 12px 7px 32px;border:1px solid var(--border);border-radius:100px;font-size:13px;background:rgba(0,0,0,.03);outline:none;transition:border .2s}
    .nav-search input:focus{border-color:var(--accent)}
    .nav-search span{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;opacity:.5}
    .nav-count{font-size:12px;color:var(--muted);white-space:nowrap}

    /* Tab切换 */
    .tab-bar{display:flex;gap:0;border-bottom:1px solid var(--border);margin:0 -24px;padding:0 24px}
    .tab-btn{padding:10px 20px;font-size:14px;font-weight:700;color:var(--muted);border-bottom:2px solid transparent;transition:all .2s;cursor:pointer;position:relative}
    .tab-btn:hover{color:var(--text)}
    .tab-btn.active-sw{color:var(--accent);border-bottom-color:var(--accent)}
    .tab-btn.active-hw{color:var(--hw-accent);border-bottom-color:var(--hw-accent)}
    .tab-btn .tab-emoji{margin-right:4px}

    /* 子导航 */
    .sub-nav{display:flex;gap:6px;padding:8px 0;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
    .sub-nav::-webkit-scrollbar{display:none}
    .sub-btn{padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;color:var(--muted);border:1px solid var(--border);white-space:nowrap;transition:all .2s;cursor:pointer}
    .sub-btn:hover{border-color:var(--accent);color:var(--accent)}
    .sub-btn.active{background:var(--accent);color:#fff;border-color:var(--accent)}
    .sub-btn.active.hw{background:var(--hw-accent);color:#fff;border-color:var(--hw-accent)}

    /* 主内容区 */
    .main-wrap{max-width:1400px;margin:0 auto;padding:20px 24px}
    .split{display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start}
    @media(max-width:900px){.split{grid-template-columns:1fr}}

    /* 轮播图 */
    .slider-wrap{position:relative;border-radius:20px;overflow:hidden;background:#1a1a2e;aspect-ratio:16/9;max-height:480px}
    .slider-track{display:flex;height:100%;transition:transform .5s cubic-bezier(.4,0,.2,1)}
    .slide{min-width:100%;height:100%;position:relative;display:flex;align-items:flex-end}
    .slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .slide-bg{position:absolute;inset:0;width:100%;height:100%;background-size:cover;background-position:center}
    .slide-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 40%,rgba(0,0,0,0) 70%)}
    .slide-content{position:relative;z-index:2;padding:36px 32px;color:#fff;width:100%}
    .slide-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,.85);padding:5px 14px;border-radius:100px;font-size:12px;font-weight:700;margin-bottom:14px;backdrop-filter:blur(8px)}
    .slide-title{font-size:clamp(18px,2.5vw,26px);font-weight:800;line-height:1.3;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .slide-meta{display:flex;align-items:center;gap:12px;font-size:12px;color:rgba(255,255,255,.7)}
    .slide-dot{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,.5)}
    .slide-link-btn{display:inline-flex;align-items:center;gap:4px;margin-top:14px;padding:8px 18px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:100px;font-size:13px;font-weight:600;color:#fff;backdrop-filter:blur(8px);transition:all .2s;cursor:pointer}
    .slide-link-btn:hover{background:rgba(16,185,129,.85);border-color:rgba(16,185,129,.5);transform:translateX(3px)}
    .s-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px);transition:all .2s}
    .s-arrow:hover{background:rgba(16,185,129,.8);border-color:transparent}
    .s-arrow.prev{left:14px}.s-arrow.next{right:14px}
    .slider-dots{position:absolute;bottom:14px;right:20px;display:flex;gap:6px;z-index:10}
    .s-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:all .3s}
    .s-dot.active{background:#fff;width:18px;border-radius:3px}

    /* 右侧推荐面板 */
    .right-panel{display:flex;flex-direction:column;gap:6px}
    .rp-title{font-size:12px;font-weight:700;color:var(--muted);padding:0 2px 6px;letter-spacing:.5px;text-transform:uppercase}
    .mini-card{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:var(--card);border:1px solid var(--border);cursor:pointer;transition:all .2s;position:relative}
    .mini-card:hover{background:#fffbf5;border-color:rgba(249,115,22,.25);transform:translateX(3px);box-shadow:0 4px 16px rgba(249,115,22,.08)}
    .mini-card.hw-card:hover{background:#f0fdf4;border-color:rgba(16,185,129,.25);box-shadow:0 4px 16px rgba(16,185,129,.08)}
    .mini-icon{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#f97316,#f43f5e);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;overflow:hidden}
    .mini-icon.hw{background:linear-gradient(135deg,#10b981,#06b6d4)}
    .mini-icon img{width:24px;height:24px;object-fit:contain}
    .mini-info{flex:1;min-width:0}
    .mini-name{font-size:13px;font-weight:700;color:var(--text);margin-bottom:2px}
    .mini-cat{font-size:11px;color:var(--muted)}
    .mini-arrow{font-size:14px;color:var(--muted);flex-shrink:0;transition:transform .2s}
    .mini-card:hover .mini-arrow{transform:translateX(3px);color:var(--accent)}
    .mini-card.hw-card:hover .mini-arrow{color:var(--hw-accent)}
    .mini-tip{display:none;position:absolute;left:0;right:0;bottom:100%;background:rgba(15,15,15,.92);color:#fff;padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5;z-index:20;margin-bottom:4px;backdrop-filter:blur(12px);box-shadow:0 4px 20px rgba(0,0,0,.2)}
    .mini-tip::after{content:'';position:absolute;top:100%;left:18px;border:6px solid transparent;border-top-color:rgba(15,15,15,.92)}

    /* 工具网格 */
    .tools-grid-wrap{display:none;margin-top:20px}
    .grid-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    .grid-title{font-size:20px;font-weight:800}
    .grid-count{font-size:13px;color:var(--muted)}
    .tools-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
    .grid-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;cursor:pointer;transition:all .2s}
    .grid-card:hover{border-color:rgba(249,115,22,.25);box-shadow:0 4px 16px rgba(249,115,22,.08);transform:translateY(-2px)}
    .grid-card.hw-card:hover{border-color:rgba(16,185,129,.25);box-shadow:0 4px 16px rgba(16,185,129,.08)}
    .grid-card-img{width:100%;height:80px;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#f0eeed}
    .grid-card-img img{width:100%;height:100%;object-fit:cover}
    .grid-card-body{display:flex;align-items:center;gap:8px}
    .grid-card-desc{margin-top:6px;font-size:11px;color:var(--muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

    /* 页脚 */
    .footer{border-top:1px solid var(--border);padding:32px 0;margin-top:32px}
    .footer-inner{max-width:1400px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
    .footer-logo{font-size:15px;font-weight:800;background:linear-gradient(135deg,#f97316,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .footer-links{display:flex;align-items:center;gap:16px}
    .footer-link{font-size:13px;color:var(--muted);transition:color .15s}
    .footer-link:hover{color:var(--accent)}
    .footer-copy{font-size:12px;color:var(--muted);text-align:center;margin-top:16px;padding-top:16px;border-top:1px solid var(--border)}
    @media(max-width:768px){.nav-search{display:none}.sub-nav::-webkit-scrollbar{display:none}}
  </style>
</head>
<body>

<nav class="navbar">
  <div class="nav-inner">
    <div class="nav-top">
      <a href="#" class="nav-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9H22L16 13.5L18 21L12 16.5L6 21L8 13.5L2 9H9.5L12 2Z" fill="url(#sg)"/><defs><linearGradient id="sg" x1="2" y1="2" x2="22" y2="22"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#f43f5e"/></linearGradient></defs></svg>
        QuickAPIs
      </a>
      <div class="nav-search">
        <span>🔍</span>
        <input type="text" id="navSearch" placeholder="搜索工具或硬件...">
      </div>
      <div class="nav-count">📡 <span id="toolNum">0</span> 收录产品</div>
    </div>
    <div class="tab-bar">
      <button class="tab-btn active-sw" data-tab="software"><span class="tab-emoji">🤖</span> AI软体工具集</button>
      <button class="tab-btn" data-tab="hardware"><span class="tab-emoji">🔌</span> AI硬件万物物联</button>
    </div>
    <div class="sub-nav" id="subNav"></div>
  </div>
</nav>

<main class="main-wrap">
  <div class="split" id="splitView">
    <div class="slider-wrap" id="sliderWrap">
      <div class="slider-track" id="sTrack"></div>
      <button class="s-arrow prev" id="sPrev">‹</button>
      <button class="s-arrow next" id="sNext">›</button>
      <div class="slider-dots" id="sDots"></div>
    </div>
    <div class="right-panel" id="rPanel">
      <div class="rp-title">🔥 推荐产品</div>
    </div>
  </div>
  <div class="tools-grid-wrap" id="toolsGridWrap">
    <div class="grid-header">
      <div class="grid-title" id="gridTitle">全部</div>
      <div class="grid-count" id="gridCount"></div>
    </div>
    <div class="tools-grid" id="toolsGrid"></div>
  </div>
</main>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">QuickAPIs</div>
    <div class="footer-links">
      <a href="submit.html" class="footer-link">📝 提交产品</a>
      <a href="about.html" class="footer-link">关于</a>
    </div>
  </div>
  <div class="footer-inner" style="justify-content:center">
    <div class="footer-copy">© 2026 QuickAPIs.top · 国内合规AI产品导航</div>
  </div>
</footer>

<script>
/* ===== 分类定义 ===== */
const SOFTWARE_CATS = [
  {key:'对话大模型', emoji:'💬', label:'对话大模型'},
  {key:'大模型API', emoji:'🔌', label:'大模型API'},
  {key:'图像生成', emoji:'🎨', label:'图像生成'},
  {key:'视频制作', emoji:'🎬', label:'视频制作'},
  {key:'音频工具', emoji:'🎵', label:'音频工具'},
  {key:'办公效率', emoji:'💼', label:'办公效率'},
  {key:'写作助手', emoji:'✍️', label:'写作助手'},
  {key:'搜索研究', emoji:'🔍', label:'搜索研究'},
  {key:'开发者工具', emoji:'🛠️', label:'开发者工具'},
  {key:'设计工具', emoji:'📐', label:'设计工具'},
  {key:'教育学习', emoji:'📚', label:'教育学习'},
];
const HARDWARE_CATS = [
  {key:'智能家居', emoji:'🏠', label:'智能家居'},
  {key:'人形机器人', emoji:'🤖', label:'人形机器人'},
  {key:'扫地机器人', emoji:'🧹', label:'扫地机器人'},
  {key:'AI眼镜', emoji:'👓', label:'AI眼镜'},
  {key:'智能音箱', emoji:'🔊', label:'智能音箱'},
  {key:'AI学习机', emoji:'📚', label:'AI学习机'},
  {key:'无人机', emoji:'🛩️', label:'无人机'},
  {key:'翻译录音', emoji:'🗣️', label:'翻译录音'},
  {key:'智能摄像', emoji:'📷', label:'智能摄像'},
  {key:'服务机器人', emoji:'🍽️', label:'服务机器人'},
  {key:'工业机器人', emoji:'🏭', label:'工业机器人'},
  {key:'AI健康穿戴', emoji:'🏥', label:'AI健康穿戴'},
];
const HW_CAT_SET = new Set(HARDWARE_CATS.map(c=>c.key));

/* ===== 轮播图 - 官方产品图 ===== */
const SLIDES = [
  {tool:'unitree-go2', img:'images/slides/slide-unitree-go2.png', bg:'linear-gradient(135deg,#0c0c1d 0%,#1a1a3e 50%,#2d1b69 100%)', tag:'🤖 宇树Go2', title:'宇树四足机器人Go2：AI大模型+超感知，工业巡检到家庭陪伴', source:'宇树科技', time:'2026'},
  {tool:'roborock-saros-z70', img:'images/slides/slide-roborock-saros-z70.png', bg:'linear-gradient(135deg,#1a2a1a 0%,#0d3b2e 50%,#064e3b 100%)', tag:'🧹 石头Saros Z70', title:'石头Saros Z70：仿生机械手扫地机器人，CES2025爆款', source:'石头科技', time:'2025'},
  {tool:'raybird-v3', img:'images/slides/slide-raybird-v3.png', bg:'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4338ca 100%)', tag:'👓 雷鸟V3', title:'雷鸟V3 AI眼镜：通义大模型加持，15小时续航，1600万拍摄', source:'雷鸟创新', time:'2026'},
  {tool:'xiaopeng-iron', img:'images/slides/slide-xiaopeng-iron.png', bg:'linear-gradient(135deg,#1c1917 0%,#292524 50%,#44403c 100%)', tag:'🤖 小鹏Iron', title:'小鹏Iron人形机器人：62自由度+AI鹰眼视觉，2026年量产', source:'小鹏鹏行', time:'2026'},
  {tool:'ecovacs-x9', img:'images/slides/slide-ecovacs-x9.jpg', bg:'linear-gradient(135deg,#172554 0%,#1e3a5f 50%,#1e40af 100%)', tag:'🧹 科沃斯X9', title:'科沃斯X9：AIVI 3D避障+双滚刷，8800Pa旗舰扫地机器人', source:'科沃斯', time:'2026'},
  {tool:'dji-mini4pro', img:'images/slides/slide-dji-mini4pro.jpg', bg:'linear-gradient(135deg,#0c4a6e 0%,#075985 50%,#0369a1 100%)', tag:'🛩️ 大疆Mini 4 Pro', title:'大疆Mini 4 Pro：4K HDR航拍+全向避障，249g轻型无人机', source:'大疆创新', time:'2026'},
];

let sIdx=0, si;
function goSlide(n){
  sIdx=(n+SLIDES.length)%SLIDES.length;
  document.getElementById('sTrack').style.transform='translateX(-'+(sIdx*100)+'%)';
  document.querySelectorAll('.s-dot').forEach((d,i)=>d.classList.toggle('active',i===sIdx));
  clearInterval(si);si=setInterval(()=>goSlide(sIdx+1),4000);
}
function renderSlides(){
  const track=document.getElementById('sTrack'), dots=document.getElementById('sDots');
  SLIDES.forEach((s,i)=>{
    const d=document.createElement('div'); d.className='slide';
    // 渲染图片，加载失败则显示渐变背景（使用字符串拼接避免Node.js模板字符串冲突）
    let bgHtml = '';
    if(s.img){
      bgHtml = '<img src="' + s.img + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><div class="slide-bg" style="display:none;background:' + s.bg + '"></div>';
    } else {
      bgHtml = '<div class="slide-bg" style="background:' + s.bg + '"></div>';
    }
    d.innerHTML=bgHtml+'<div class="slide-overlay"></div><div class="slide-content"><div class="slide-tag">'+s.tag+'</div><div class="slide-title">'+s.title+'</div><div class="slide-meta"><span>📰 '+s.source+'</span><span class="slide-dot"></span><span>'+s.time+'</span></div><button class="slide-link-btn" onclick="location.href=\\'tool-detail.html?id='+s.tool+'\\'">查看详情 →</button></div>';
    track.appendChild(d);
    const dot=document.createElement('div'); dot.className='s-dot'+(i===0?' active':'');
    dot.onclick=()=>goSlide(i); dots.appendChild(dot);
  });
}
document.getElementById('sPrev').onclick=()=>goSlide(sIdx-1);
document.getElementById('sNext').onclick=()=>goSlide(sIdx+1);
renderSlides(); si=setInterval(()=>goSlide(sIdx+1),4000);

/* ===== 数据加载 ===== */
let tools=[], curTab='software', curCat='all', q='';

async function load(){
  try{
    const r=await fetch('./tools.json?v='+Date.now());
    if(!r.ok) throw new Error('HTTP '+r.status);
    let raw=await r.text();
    if(raw.charCodeAt(0)===0xFEFF) raw=raw.slice(1);
    const d=JSON.parse(raw);
    tools=d.tools||[];
    document.getElementById('toolNum').textContent=tools.length;
    renderSubNav();
    applyFilter();
    console.log('Loaded '+tools.length+' tools');
  }catch(e){
    console.error('Load failed:',e);
  }
}

/* ===== Tab 切换 ===== */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', function(){
    curTab = this.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b=>{
      b.classList.remove('active-sw','active-hw');
      if(b===this) b.classList.add(curTab==='software'?'active-sw':'active-hw');
    });
    curCat='all';
    renderSubNav();
    applyFilter();
  });
});

/* ===== 子导航 ===== */
function renderSubNav(){
  const nav=document.getElementById('subNav');
  const cats=curTab==='software'?SOFTWARE_CATS:HARDWARE_CATS;
  nav.innerHTML='<button class="sub-btn '+(curCat==='all'?(curTab==='software'?'active':'active hw'):'')+'" data-cat="all">全部</button>'+
    cats.map(c=>'<button class="sub-btn '+(curCat===c.key?(curTab==='software'?'active':'active hw'):'')+'" data-cat="'+c.key+'">'+c.emoji+' '+c.label+'</button>').join('');
  nav.querySelectorAll('.sub-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
      curCat=this.dataset.cat;
      nav.querySelectorAll('.sub-btn').forEach(b=>{
        b.classList.remove('active');
        if(b===this){
          b.classList.add(curTab==='software'?'active':'active hw');
        }
      });
      applyFilter();
    });
  });
}

document.getElementById('navSearch').addEventListener('input', function(e){ q=e.target.value.trim().toLowerCase(); applyFilter(); });

/* ===== 过滤+渲染 ===== */
function applyFilter(){
  let f=tools.filter(t=>{
    const isHW=HW_CAT_SET.has(t.category);
    return curTab==='software'?!isHW:isHW;
  });
  if(curCat!=='all') f=f.filter(t=>t.category===curCat);
  if(q) f=f.filter(t=>(t.name+t.nameCn+t.description+t.category).toLowerCase().indexOf(q)!==-1);

  if(curCat==='all' && !q){
    document.querySelector('.split').style.display='grid';
    document.getElementById('toolsGridWrap').style.display='none';
    renderRightPanel(f.slice(0,20));
  }else{
    document.querySelector('.split').style.display='none';
    document.getElementById('toolsGridWrap').style.display='block';
    renderGrid(f);
  }
}

function renderRightPanel(ts){
  var panel=document.getElementById('rPanel');
  if(!panel) return;
  const isHW=curTab==='hardware';
  panel.innerHTML='<div class="rp-title">'+(isHW?'🔌 热门硬件':'🔥 推荐工具')+'</div>';
  ts.forEach(t=>{
    var c=document.createElement('div');
    c.className='mini-card'+(isHW?' hw-card':'');
    c.onclick=function(){location.href='tool-detail.html?id='+t.id};
    c.innerHTML='<div class="mini-icon'+(isHW?' hw':'')+'">'+(t.icon||'◈')+'</div><div class="mini-info"><div class="mini-name">'+(t.nameCn||t.name)+'</div><div class="mini-cat">'+t.category+'</div></div><div class="mini-arrow">→</div><div class="mini-tip">'+escHtml((t.description||'').substring(0,80))+'</div>';
    panel.appendChild(c);
  });
}

function renderGrid(ts){
  var grid=document.getElementById('toolsGrid');
  var isHW=curTab==='hardware';
  var catName=curCat==='all'?(isHW?'全部硬件':'全部工具'):curCat;
  document.getElementById('gridTitle').textContent=catName;
  document.getElementById('gridCount').textContent='共 '+ts.length+' 个';
  grid.innerHTML='';
  ts.forEach(t=>{
    var card=document.createElement('div');
    card.className='grid-card'+(isHW?' hw-card':'');
    card.onclick=function(){location.href='tool-detail.html?id='+t.id};
    var bannerHtml=t.bannerImage?'<div class="grid-card-img"><img src="'+t.bannerImage+'" onerror="this.parentElement.style.display=\\'none\\'"></div>':'';
    card.innerHTML=bannerHtml+
      '<div class="grid-card-body"><div class="mini-icon'+(isHW?' hw':'')+'" style="width:32px;height:32px;border-radius:7px;font-size:14px">'+(t.icon||'◈')+'</div><div class="mini-info"><div class="mini-name">'+(t.nameCn||t.name)+'</div><div class="mini-cat">'+t.category+'</div></div></div>'+
      '<div class="grid-card-desc">'+escHtml((t.description||'').substring(0,80))+'</div>';
    grid.appendChild(card);
  });
}

function escHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

load();
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ index.html 已重写 (' + html.length + ' bytes)');