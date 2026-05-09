
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', "G-EK2Q1VQM16");
  </script>
</head>
<body>

  <!-- ==================== NAVBAR ==================== -->
  <nav class="navbar" id="navbar">
    <div class="container">
      <div class="navbar-inner">
        <a href="#" class="logo">
          <span class="logo-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9H22L16 13.5L18 21L12 16.5L6 21L8 13.5L2 9H9.5L12 2Z" fill="url(#starGrad)" stroke="#3b82f6" stroke-width="1"/><defs><linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs></svg></span>
          <div class="logo-text">
            <span class="logo-name">QuickAPIs</span>
            <span class="logo-tagline">AI工具导航</span>
          </div>
        </a>

        <div class="nav-links" id="navLinks">
          <button class="nav-link active" data-category="all">全部</button>
          <button class="nav-link" data-category="chat">聊天AI</button>
          <button class="nav-link" data-category="image">图像生成</button>
          <button class="nav-link" data-category="code">代码助手</button>
          <button class="nav-link" data-category="video">视频制作</button>
          <button class="nav-link" data-category="audio">音频工具</button>
          <button class="nav-link" data-category="office">办公效率</button>
          <button class="nav-link" data-category="search">搜索研究</button>
          <button class="nav-link" data-category="3d">3D建模</button>
          <button class="nav-link" data-category="design">设计工具</button>
          <button class="nav-link" data-category="writing">写作助手</button>
          <button class="nav-link" data-category="api">大模型API</button>
          <button class="nav-link" data-category="dev">开发者工具</button>
          <button class="nav-link" data-category="education">教育学习</button>
          <button class="nav-link" data-category="other">其他</button>
          <span class="footer-sep">|</span>
          <a href="stats.html" class="nav-link" style="text-decoration:none;cursor:pointer;">流量统计</a>
        </div>

        <div class="nav-search">
          <span class="nav-search-icon">🔍</span>
          <input type="text" id="navSearchInput" placeholder="搜索工具..." aria-label="搜索工具">
        </div>

        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="菜单">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- ==================== HERO ==================== -->
  <section class="hero">
    <div class="container">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        持续更新中 · 发现最新AI工具
      </div>
      <h1 class="hero-title">
        <span class="hero-title-main">发现全球优质</span>
        <span class="hero-title-accent">AI 工具</span>
      </h1>
      <p class="hero-subtitle">
        收录 <span class="highlight">181</span> 精选AI应用，覆盖
        <span class="highlight">ChatGPT</span>、<span class="highlight">Midjourney</span>、
        <span class="highlight">Claude</span>、<span class="highlight">Gemini</span> 等主流工具
      </p>

      <div class="hero-search">
        <div class="hero-search-wrapper">
          <span class="hero-search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
          <input
            type="text"
            id="heroSearchInput"
            placeholder="搜索 AI 工具..."
            aria-label="搜索AI工具"
            autocomplete="off"
          >
          <button class="hero-search-btn" id="heroSearchBtn">搜索</button>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-value" id="statTools">181</div>
          <div class="stat-label">收录工具</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">15</div>
          <div class="stat-label">精选分类</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">每日</div>
          <div class="stat-label">持续更新</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== CATEGORY TABS ==================== -->
  <section class="category-section">
    <div class="container">
      <div class="category-tabs" id="categoryTabs">
        <button class="category-tab active" data-category="all">
          <span class="category-tab-icon">◈</span>
          全部
          <span class="category-count" id="count-all">0</span>
        </button>
        <button class="category-tab" data-category="chat">
          <span class="category-tab-icon">◈</span>
          聊天AI
          <span class="category-count" id="count-chat">0</span>
        </button>
        <button class="category-tab" data-category="image">
          <span class="category-tab-icon">◈</span>
          图像生成
          <span class="category-count" id="count-image">0</span>
        </button>
        <button class="category-tab" data-category="code">
          <span class="category-tab-icon">◈</span>
          代码助手
          <span class="category-count" id="count-code">0</span>
        </button>
        <button class="category-tab" data-category="video">
          <span class="category-tab-icon">◈</span>
          视频制作
          <span class="category-count" id="count-video">0</span>
        </button>
        <button class="category-tab" data-category="audio">
          <span class="category-tab-icon">◈</span>
          音频工具
          <span class="category-count" id="count-audio">0</span>
        </button>
        <button class="category-tab" data-category="office">
          <span class="category-tab-icon">◈</span>
          办公效率
          <span class="category-count" id="count-office">0</span>
        </button>
        <button class="category-tab" data-category="search">
          <span class="category-tab-icon">◈</span>
          搜索研究
          <span class="category-count" id="count-search">0</span>
        </button>
        <button class="category-tab" data-category="3d">
          <span class="category-tab-icon">◈</span>
          3D建模
          <span class="category-count" id="count-3d">0</span>
        </button>
        <button class="category-tab" data-category="design">
          <span class="category-tab-icon">◈</span>
          设计工具
          <span class="category-count" id="count-design">0</span>
        </button>
        <button class="category-tab" data-category="writing">
          <span class="category-tab-icon">◈</span>
          写作助手
          <span class="category-count" id="count-writing">0</span>
        </button>
        <button class="category-tab" data-category="api">
          <span class="category-tab-icon">◈</span>
          大模型API
          <span class="category-count" id="count-api">0</span>
        </button>
        <button class="category-tab" data-category="dev">
          <span class="category-tab-icon">◈</span>
          开发者工具
          <span class="category-count" id="count-dev">0</span>
        </button>
        <button class="category-tab" data-category="education">
          <span class="category-tab-icon">◈</span>
          教育学习
          <span class="category-count" id="count-education">0</span>
        </button>
        <button class="category-tab" data-category="other">
          <span class="category-tab-icon">◈</span>
          其他
          <span class="category-count" id="count-other">0</span>
        </button>
      </div>
    </div>
  </section>

  <!-- ==================== TOOLS GRID ==================== -->
  <section class="tools-section">
    <div class="container">
      <div class="tools-header">
        <div class="tools-count-text">
          共 <span id="visibleCount">24</span> 个工具
        </div>
      </div>

      <div class="tools-grid" id="toolsGrid"></div>

      <div class="empty-state" id="emptyState">
        <div class="empty-state-icon">&#8709;</div>
        <div class="empty-state-title">未找到相关工具</div>
        <div class="empty-state-desc">换个关键词试试，或浏览其他分类</div>
      </div>
    </div>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-left">
          <div class="footer-logo">QuickAPIs</div>
          <p class="footer-disclaimer">
            本网站仅提供工具导航服务，不参与任何工具的运营与开发。所有工具版权归其各自所有者所有。
          </p>
        </div>
        <div class="footer-right">
          <div class="footer-links">
            <a href="mailto:submit@quickapis.top" class="footer-link">
              <span class="footer-link-icon">✉</span>
              提交工具
            </a>
            <div class="footer-divider"></div>
            <a href="https://github.com/quickapis" class="footer-link" target="_blank" rel="noopener">
              <span class="footer-link-icon">◎</span>
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        (c) 2026 QuickAPIs.top · 仅供导航学习，请合理使用AI工具
      </div>
    </div>
          <a href="about.html" class="footer-link">关于我们</a>
        <span class="footer-sep">|</span>
        <a href="stats.html" class="footer-link">流量统计</a>
        <span class="footer-sep">|</span>
        <a href="privacy.html" class="footer-link">隐私政策</a>
        <span class="footer-sep">|</span>
</footer>

  <!-- ==================== SCROLL TO TOP ==================== -->
  <button class="scroll-top" id="scrollTopBtn" aria-label="回到顶部">↑</button>

  <!-- ==================== JAVASCRIPT ==================== -->
  <script>
    // =============================================
    // DEEP SPACE STARFIELD - Drifting Through the Cosmos
    // =============================================
    (function() {
      /**
       * Architecture:
       * - Offscreen canvas (1.8x 脳 1.5x viewport): Rendered once with Milky Way, nebulae, stars
       * - Display canvas (viewport): Draws offscreen with sin/cos offset 鈫?slow drift
       * - Dynamic canvas (viewport): Twinkling + shooting stars, animated per frame
       * The sin/cos drift creates an organic "floating through space" feel.
       */

      // DISABLED - white theme
      // const offscreen = document.createElement('canvas');
      // const display = document.createElement('canvas');
      // const dynamic = document.createElement('canvas');
      // [display, dynamic].forEach(c => {
      //   c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
      // });
      // document.body.prepend(dynamic);
      // document.body.prepend(display);

      // oCtx, dCtx, dyCtx — DISABLED (canvas removed for white theme)
      // const oCtx = offscreen.getContext('2d');
      // const dCtx = display.getContext('2d');
      // const dyCtx = dynamic.getContext('2d');

      let vw, vh, ow, oh;
      let twinkleStars = [];
      let shootingStars = [];

      /* Stellar spectral colors 鈥?realistic temperature-based palette */
      const STAR_COLORS = [
        { r: 155, g: 175, b: 255 },   // O 鈥?hot blue
        { r: 170, g: 195, b: 255 },   // B 鈥?blue-white
        { r: 205, g: 218, b: 255 },   // A 鈥?white-blue
        { r: 245, g: 242, b: 255 },   // F 鈥?white
        { r: 255, g: 248, b: 230 },   // G 鈥?sun-like yellow-white
        { r: 255, g: 222, b: 170 },   // K 鈥?orange
        { r: 255, g: 190, b: 140 },   // M 鈥?red-orange
      ];

      function pickColor(bias) {
        // bias: 'warm' | 'cool' | 'any'
        let weights;
        if (bias === 'warm') weights = [0.03, 0.05, 0.10, 0.20, 0.25, 0.20, 0.17];
        else if (bias === 'cool') weights = [0.25, 0.30, 0.25, 0.12, 0.05, 0.02, 0.01];
        else weights = [0.08, 0.14, 0.22, 0.24, 0.16, 0.10, 0.06];
        let r = Math.random(), sum = 0;
        for (let i = 0; i < weights.length; i++) {
          sum += weights[i];
          if (r < sum) return STAR_COLORS[i];
        }
        return STAR_COLORS[3];
      }

      /* ============================================
         RENDER OFFSCREEN 鈥?the full space scene
         ============================================ */
      function renderSpace() {
        ow = Math.max(vw * 1.8, 2800);
        oh = Math.max(vh * 1.5, 1600);
        offscreen.width = ow;
        offscreen.height = oh;

        // Deep black void
        oCtx.fillStyle = '#020208';
        oCtx.fillRect(0, 0, ow, oh);

        // ---- MILKY WAY BAND ----
        // A bright, warm-core galactic band curving across the canvas
        // Band center path: diagonal arc from upper-left to lower-right
        const bandY = (x) => {
          const t = x / ow;
          return oh * (0.20 + t * 0.35 + Math.sin(t * Math.PI * 0.7) * 0.06);
        };
        const bandH = oh * 0.28;

        // Step 1: Wide diffuse glow 鈥?the galactic light
        oCtx.save();
        oCtx.globalCompositeOperation = 'screen';
        for (let x = 0; x < ow; x += 3) {
          const cy = bandY(x);
          const grad = oCtx.createLinearGradient(x, cy - bandH, x, cy + bandH);
          grad.addColorStop(0,    'rgba(0,0,0,0)');
          grad.addColorStop(0.15, 'rgba(60,30,120,0.08)');
          grad.addColorStop(0.30, 'rgba(100,50,180,0.15)');
          grad.addColorStop(0.40, 'rgba(150,80,200,0.25)');
          grad.addColorStop(0.48, 'rgba(200,120,180,0.35)');  // warm purple core
          grad.addColorStop(0.52, 'rgba(220,150,120,0.38)');    // warm rose-amber core
          grad.addColorStop(0.60, 'rgba(150,80,200,0.25)');
          grad.addColorStop(0.70, 'rgba(100,50,180,0.15)');
          grad.addColorStop(0.85, 'rgba(60,30,120,0.08)');
          grad.addColorStop(1,    'rgba(0,0,0,0)');
          oCtx.fillStyle = grad;
          oCtx.fillRect(x, cy - bandH, 3, bandH * 2);
        }
        oCtx.restore();

        // Step 2: Bright galactic core - warm amber glow at the densest point
        oCtx.save();
        oCtx.globalCompositeOperation = 'screen';
        const coreX = ow * 0.42, coreY = bandY(ow * 0.42);
        const coreGrad = oCtx.createRadialGradient(coreX, coreY, 0, coreX, coreY, bandH * 1.2);
        coreGrad.addColorStop(0,   'rgba(255,200,120,0.25)');
        coreGrad.addColorStop(0.2, 'rgba(220,160,80,0.18)');
        coreGrad.addColorStop(0.5, 'rgba(180,100,60,0.10)');
        coreGrad.addColorStop(1,   'rgba(0,0,0,0)');
        oCtx.fillStyle = coreGrad;
        oCtx.beginPath();
        oCtx.ellipse(coreX, coreY, bandH * 1.2, bandH * 0.7, 0, 0, Math.PI * 2);
        oCtx.fill();
        oCtx.restore();

        // Step 3: Dust lanes 鈥?dark semi-transparent strips within the band
        oCtx.save();
        for (let i = 0; i < 5; i++) {
          const dustX = ow * (0.15 + Math.random() * 0.7);
          const cy = bandY(dustX);
          const dustW = Math.random() * 300 + 100;
          const dustH = Math.random() * 6 + 2;
          const dustAngle = (Math.random() - 0.5) * 0.3;
          oCtx.translate(dustX, cy + (Math.random() - 0.5) * bandH * 0.4);
          oCtx.rotate(dustAngle);
          oCtx.fillStyle = `rgba(2,2,8,${Math.random() * 0.15 + 0.08})`;
          oCtx.fillRect(-dustW / 2, -dustH / 2, dustW, dustH);
          oCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
        oCtx.restore();

        // ---- NEBULAE 鈥?colorful gas clouds ----
        oCtx.save();
        oCtx.globalCompositeOperation = 'screen';
        const nebulae = [
          // In the Milky Way band - VIBRANT COLORS
          { x: ow * 0.28, y: bandY(ow * 0.28) - oh * 0.02, rx: 280, ry: 180, c: [220, 50, 120],  a: 0.15 },   // Hot pink
          { x: ow * 0.38, y: bandY(ow * 0.38) + oh * 0.01, rx: 350, ry: 220, c: [255, 140, 40],  a: 0.18 },   // Orange fire
          { x: ow * 0.52, y: bandY(ow * 0.52),              rx: 300, ry: 190, c: [100, 80, 220],   a: 0.16 },   // Electric purple
          { x: ow * 0.65, y: bandY(ow * 0.65) - oh * 0.03, rx: 250, ry: 160, c: [40, 180, 220],  a: 0.14 },   // Cyan burst
          // Scattered around the sky
          { x: ow * 0.12, y: oh * 0.55,                     rx: 200, ry: 130, c: [200, 60, 180],  a: 0.12 },   // Magenta
          { x: ow * 0.85, y: oh * 0.25,                     rx: 220, ry: 140, c: [60, 120, 255],  a: 0.13 },   // Royal blue
          { x: ow * 0.72, y: oh * 0.70,                     rx: 180, ry: 110, c: [255, 160, 50],  a: 0.11 },   // Gold
          { x: ow * 0.90, y: oh * 0.65,                     rx: 160, ry: 100, c: [50, 200, 180],  a: 0.10 },   // Teal
        ];
        for (const n of nebulae) {
          const maxR = Math.max(n.rx, n.ry);
          const ng = oCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, maxR);
          ng.addColorStop(0,   `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${n.a})`);
          ng.addColorStop(0.3, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${n.a * 0.5})`);
          ng.addColorStop(0.7, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${n.a * 0.15})`);
          ng.addColorStop(1,   'rgba(0,0,0,0)');
          oCtx.fillStyle = ng;
          oCtx.beginPath();
          oCtx.ellipse(n.x, n.y, n.rx, n.ry, 0, 0, Math.PI * 2);
          oCtx.fill();
        }
        oCtx.restore();

        // ---- STARS — 5 layers from faint to brilliant ----// ---- STARS 鈥?5 layers from faint to brilliant ----

        // Layer 1: Ultra-faint background dust (thousands of pinpoints)
        const l1 = Math.floor(ow * oh / 600);
        for (let i = 0; i < l1; i++) {
          const x = Math.random() * ow, y = Math.random() * oh;
          const c = pickColor('cool');
          oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${Math.random() * 0.3 + 0.05})`;
          oCtx.beginPath();
          oCtx.arc(x, y, Math.random() * 0.5 + 0.06, 0, Math.PI * 2);
          oCtx.fill();
        }

        // Layer 2: Milky Way concentration (Gaussian distribution in the band)
        const l2 = Math.floor(ow * oh / 200);
        for (let i = 0; i < l2; i++) {
          const x = Math.random() * ow;
          const cy = bandY(x);
          const spread = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
          const y = cy + spread * bandH * 0.8;
          const dist = Math.abs(y - cy) / bandH;
          if (Math.random() > Math.exp(-dist * dist * 2) * 0.8 + 0.2) continue;
          // More warm stars in the Milky Way core
          const c = pickColor(dist < 0.3 ? 'warm' : 'any');
          const a = (Math.random() * 0.5 + 0.15) * (1 - dist * 0.4);
          oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
          oCtx.beginPath();
          oCtx.arc(x, y, Math.random() * 0.8 + 0.1, 0, Math.PI * 2);
          oCtx.fill();
        }

        // Layer 3: Scattered medium stars with halos
        const l3 = Math.floor(ow * oh / 5000);
        for (let i = 0; i < l3; i++) {
          const x = Math.random() * ow, y = Math.random() * oh;
          const r = Math.random() * 1.3 + 0.5;
          const a = Math.random() * 0.5 + 0.4;
          const c = pickColor('any');
          oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
          oCtx.beginPath();
          oCtx.arc(x, y, r, 0, Math.PI * 2);
          oCtx.fill();
          // Halo
          const hg = oCtx.createRadialGradient(x, y, r * 0.3, x, y, r * 4);
          hg.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${a * 0.18})`);
          hg.addColorStop(1, 'rgba(0,0,0,0)');
          oCtx.fillStyle = hg;
          oCtx.beginPath();
          oCtx.arc(x, y, r * 4, 0, Math.PI * 2);
          oCtx.fill();
        }

        // Layer 4: Bright stars with wide glow
        const l4 = Math.max(4, Math.floor(ow * oh / 20000));
        for (let i = 0; i < l4; i++) {
          const x = Math.random() * ow, y = Math.random() * oh;
          const r = Math.random() * 1.5 + 1.2;
          const a = Math.random() * 0.3 + 0.7;
          const c = pickColor('any');
          // Core
          oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
          oCtx.beginPath();
          oCtx.arc(x, y, r, 0, Math.PI * 2);
          oCtx.fill();
          // Wide glow
          const gg = oCtx.createRadialGradient(x, y, r, x, y, r * 12);
          gg.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${a * 0.2})`);
          gg.addColorStop(0.3, `rgba(${c.r},${c.g},${c.b},${a * 0.05})`);
          gg.addColorStop(1, 'rgba(0,0,0,0)');
          oCtx.fillStyle = gg;
          oCtx.beginPath();
          oCtx.arc(x, y, r * 12, 0, Math.PI * 2);
          oCtx.fill();
        }

        // Layer 5: Brilliant stars 鈥?8-point diffraction spikes (Hubble/James Webb style)
        const l5 = Math.max(3, Math.floor(ow * oh / 50000));
        for (let i = 0; i < l5; i++) {
          const x = Math.random() * ow, y = Math.random() * oh;
          const r = Math.random() * 2 + 1.5;
          const a = Math.random() * 0.2 + 0.8;
          const c = pickColor('cool'); // Brightest stars tend blue

          // Core
          oCtx.fillStyle = `rgba(255,255,255,${a * 0.9})`;
          oCtx.beginPath();
          oCtx.arc(x, y, r * 0.6, 0, Math.PI * 2);
          oCtx.fill();

          // Color core
          oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
          oCtx.beginPath();
          oCtx.arc(x, y, r, 0, Math.PI * 2);
          oCtx.fill();

          // Wide glow
          const sg = oCtx.createRadialGradient(x, y, r, x, y, r * 18);
          sg.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${a * 0.15})`);
          sg.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},${a * 0.03})`);
          sg.addColorStop(1, 'rgba(0,0,0,0)');
          oCtx.fillStyle = sg;
          oCtx.beginPath();
          oCtx.arc(x, y, r * 18, 0, Math.PI * 2);
          oCtx.fill();

          // Diffraction spikes 鈥?main cross
          const sLen = r * 22;
          oCtx.save();
          oCtx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${a * 0.15})`;
          oCtx.lineWidth = 0.8;
          oCtx.beginPath();
          oCtx.moveTo(x - sLen, y); oCtx.lineTo(x + sLen, y);
          oCtx.moveTo(x, y - sLen); oCtx.lineTo(x, y + sLen);
          oCtx.stroke();

          // 45掳 secondary spikes
          const dLen = sLen * 0.45;
          oCtx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${a * 0.07})`;
          oCtx.lineWidth = 0.5;
          oCtx.beginPath();
          oCtx.moveTo(x - dLen * 0.707, y - dLen * 0.707);
          oCtx.lineTo(x + dLen * 0.707, y + dLen * 0.707);
          oCtx.moveTo(x + dLen * 0.707, y - dLen * 0.707);
          oCtx.lineTo(x - dLen * 0.707, y + dLen * 0.707);
          oCtx.stroke();
          oCtx.restore();
        }

        // ---- STAR CLUSTERS 鈥?dense groups of tiny stars ----
        oCtx.save();
        oCtx.globalCompositeOperation = 'screen';
        const clusters = [
          { x: ow * 0.35, y: bandY(ow * 0.35) - oh * 0.03 },
          { x: ow * 0.55, y: bandY(ow * 0.55) + oh * 0.02 },
          { x: ow * 0.48, y: bandY(ow * 0.48) },
          { x: ow * 0.70, y: bandY(ow * 0.70) - oh * 0.01 },
        ];
        for (const cl of clusters) {
          const cSize = Math.random() * 40 + 25;
          const cCount = Math.floor(Math.random() * 30 + 20);
          const cg = oCtx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cSize);
          cg.addColorStop(0, 'rgba(180,170,220,0.06)');
          cg.addColorStop(1, 'rgba(0,0,0,0)');
          oCtx.fillStyle = cg;
          oCtx.beginPath();
          oCtx.arc(cl.x, cl.y, cSize, 0, Math.PI * 2);
          oCtx.fill();
          for (let j = 0; j < cCount; j++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * cSize * 0.8;
            const sx = cl.x + Math.cos(angle) * dist;
            const sy = cl.y + Math.sin(angle) * dist;
            const c = pickColor('warm');
            oCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${Math.random() * 0.6 + 0.3})`;
            oCtx.beginPath();
            oCtx.arc(sx, sy, Math.random() * 0.6 + 0.15, 0, Math.PI * 2);
            oCtx.fill();
          }
        }
        oCtx.restore();
      }

      /* ============================================
         DYNAMIC LAYER 鈥?twinkling + shooting stars
         ============================================ */
      function initDynamic() {
        dynamic.width = vw;
        dynamic.height = vh;

        twinkleStars = [];
        const count = Math.floor(vw * vh / 10000);
        for (let i = 0; i < count; i++) {
          twinkleStars.push({
            x: Math.random() * vw,
            y: Math.random() * vh,
            r: Math.random() * 1.2 + 0.3,
            baseA: Math.random() * 0.35 + 0.4,
            speed: Math.random() * 2.5 + 0.6,
            phase: Math.random() * Math.PI * 2,
            c: pickColor('any')
          });
        }
        shootingStars = [];
      }

      function animate(t) {
        // ---- DRIFT the display canvas ----
        // Slow, organic sin/cos movement + gentle rotation
        const driftX = Math.sin(t * 0.000013) * vw * 0.25 + Math.sin(t * 0.000007) * vw * 0.08;
        const driftY = Math.cos(t * 0.000010) * vh * 0.12 + Math.cos(t * 0.000005) * vh * 0.05;

        dCtx.clearRect(0, 0, vw, vh);
        dCtx.drawImage(offscreen, -driftX, -driftY);

        // ---- DYNAMIC: twinkle ----
        dyCtx.clearRect(0, 0, vw, vh);
        for (const s of twinkleStars) {
          const flicker = Math.sin(t * 0.001 * s.speed + s.phase) * 0.4 + 0.6;
          const a = s.baseA * flicker;
          dyCtx.fillStyle = `rgba(${s.c.r},${s.c.g},${s.c.b},${a})`;
          dyCtx.beginPath();
          dyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          dyCtx.fill();
          if (s.r > 0.9) {
            const tg = dyCtx.createRadialGradient(s.x, s.y, s.r * 0.2, s.x, s.y, s.r * 4);
            tg.addColorStop(0, `rgba(${s.c.r},${s.c.g},${s.c.b},${a * 0.15})`);
            tg.addColorStop(1, 'rgba(0,0,0,0)');
            dyCtx.fillStyle = tg;
            dyCtx.beginPath();
            dyCtx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            dyCtx.fill();
          }
        }

        // ---- DYNAMIC: shooting stars ----
        if (Math.random() < 0.012) {
          shootingStars.push({
            x: Math.random() * vw * 0.6 + vw * 0.15,
            y: Math.random() * vh * 0.25,
            len: Math.random() * 150 + 60,
            speed: Math.random() * 10 + 5,
            angle: Math.PI / 4.5 + (Math.random() - 0.5) * 0.4,
            alpha: 1,
            decay: Math.random() * 0.01 + 0.005,
            w: Math.random() * 1.5 + 0.8,
            headR: Math.random() * 2.5 + 1.5
          });
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          const dx = Math.cos(ss.angle) * ss.len;
          const dy = Math.sin(ss.angle) * ss.len;

          const tg = dyCtx.createLinearGradient(ss.x, ss.y, ss.x - dx, ss.y - dy);
          tg.addColorStop(0, `rgba(240,245,255,${ss.alpha})`);
          tg.addColorStop(0.25, `rgba(190,210,255,${ss.alpha * 0.5})`);
          tg.addColorStop(1, 'rgba(160,185,255,0)');
          dyCtx.strokeStyle = tg;
          dyCtx.lineWidth = ss.w;
          dyCtx.lineCap = 'round';
          dyCtx.beginPath();
          dyCtx.moveTo(ss.x, ss.y);
          dyCtx.lineTo(ss.x - dx, ss.y - dy);
          dyCtx.stroke();

          // Head glow
          const hg = dyCtx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, ss.headR * 6);
          hg.addColorStop(0, `rgba(255,255,255,${ss.alpha * 0.85})`);
          hg.addColorStop(0.25, `rgba(210,225,255,${ss.alpha * 0.3})`);
          hg.addColorStop(1, 'rgba(180,200,255,0)');
          dyCtx.fillStyle = hg;
          dyCtx.beginPath();
          dyCtx.arc(ss.x, ss.y, ss.headR * 6, 0, Math.PI * 2);
          dyCtx.fill();

          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.alpha -= ss.decay;
          if (ss.alpha <= 0 || ss.x > vw + 60 || ss.y > vh + 60) {
            shootingStars.splice(i, 1);
          }
        }

        requestAnimationFrame(animate);
      }

      /* ============================================
         INIT & RESIZE
         ============================================ */
      function init() {
        vw = window.innerWidth;
        vh = window.innerHeight;
        // display.width = vw; // DISABLED - white theme
        // display.height = vh; // DISABLED - white theme
        // renderSpace(); // DISABLED - white theme
        // initDynamic(); // DISABLED - white theme
        // requestAnimationFrame(animate); // DISABLED - white theme
      }

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          vw = window.innerWidth;
          vh = window.innerHeight;
          // display.width = vw; // DISABLED - white theme
          // display.height = vh; // DISABLED - white theme
          // renderSpace(); // DISABLED - white theme
          // initDynamic(); // DISABLED - white theme
        }, 300);
      });

      init();
    })();

    // =============================================
    // TOOLS DATA
    // =============================================
    // =============================================
    // TOOLS DATA
    // =============================================
    let toolsData = [];
    
    const CATEGORY_MAP = {
      '全部': { key: 'all', label: '全部' },
      '聊天AI': { key: 'chat', label: '聊天AI' },
      '图像生成': { key: 'image', label: '图像生成' },
      '代码助手': { key: 'code', label: '代码助手' },
      '视频制作': { key: 'video', label: '视频制作' },
      '音频工具': { key: 'audio', label: '音频工具' },
      '办公效率': { key: 'office', label: '办公效率' },
      '搜索研究': { key: 'search', label: '搜索研究' },
      '3D建模': { key: '3d', label: '3D建模' },
      '设计工具': { key: 'design', label: '设计工具' },
      '写作助手': { key: 'writing', label: '写作助手' },
      '大模型API': { key: 'api', label: '大模型API' },
      '开发者工具': { key: 'dev', label: '开发者工具' },
      '教育学习': { key: 'education', label: '教育学习' },
      '其他': { key: 'other', label: '其他' },
    };
    
    async function loadToolsData() {
      try {
        const res = await fetch('tools.json');
        const data = await res.json();
        
        // Transform tools.json format to the format expected by renderTools
        toolsData = data.tools.map(t => {
          const catInfo = CATEGORY_MAP[t.category] || { key: 'other', label: t.category };
          const domain = new URL(t.url).hostname;
          return {
            id: t.id,
            name: t.name,
            nameCn: t.nameCn,
            icon: t.icon,
            category: catInfo.key,
            categoryLabel: catInfo.label,
            description: t.description,
            domain: domain,
            url: t.url,
            rating: 4.5,
            tags: t.tags,
            featured: t.featured || false,
            reviews: t.reviews || null
          };
        });
        
        updateCategoryCounts();
        renderTools();
      } catch (err) {
        console.error('Failed to load tools:', err);
        document.getElementById('toolsGrid').innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">加载工具数据失败，请刷新重试</p>';
      }
    }


    let currentCategory = 'all';
    let currentSearch = '';
    let isMobileMenuOpen = false;

    // =============================================
    // DOM ELEMENTS
    // =============================================
    const toolsGrid = document.getElementById('toolsGrid');
    const emptyState = document.getElementById('emptyState');
    const heroSearchInput = document.getElementById('heroSearchInput');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const navSearchInput = document.getElementById('navSearchInput');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const navLinks = document.querySelectorAll('.nav-link');
    const visibleCount = document.getElementById('visibleCount');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    // =============================================
    // RENDER CARDS
    // =============================================
    function renderTools() {
      let filtered = toolsData;

      if (currentCategory !== 'all') {
        filtered = filtered.filter(t => t.category === currentCategory);
      }

      if (currentSearch.trim() !== '') {
        const q = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q)) ||
          t.domain.toLowerCase().includes(q)
        );
      }

      visibleCount.textContent = filtered.length;

      if (filtered.length === 0) {
        toolsGrid.innerHTML = '';
        emptyState.classList.add('visible');
        return;
      }

      emptyState.classList.remove('visible');

      toolsGrid.innerHTML = filtered.map((tool, index) => {
        const _reviews = tool.reviews && tool.reviews.length > 0;
        const _revHTML = _reviews ? '<div class=\"tool-reviews\"><p class=\"extra-label\">📡 最新评测</p>' + tool.reviews.slice(0,3).map(function(r){return '<div class=\"review-item\"><a href=\"'+r.url+'\" target=\"_blank\" class=\"review-link\"><span class=\"review-title\">'+r.title+'</span><span class=\"review-meta\">'+r.source+' · '+r.time+'</span></a></div>';}).join('') + '</div>' : '';
        return `<div class="tool-card card-enter" style="animation-delay: ${index * 40}ms" data-id="${tool.id}">
          <div class="tool-card-top">
            <div class="tool-icon"><img class="tool-favicon" src="https://favicon.im/${tool.domain}?size=64" alt="${tool.name}" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=font-size:28px>'+tool.icon+'</span>'"></div>
            <span class="tool-tag tool-tag-${tool.category}">${tool.categoryLabel}</span>
          </div>
          <div class="tool-info">
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-desc">${tool.description}</p>
            <div class="tool-domain">
              <span class="tool-domain-dot"></span>
              ${tool.domain}
            </div>
          </div>
          <div class="tool-card-extra">
            <p class="extra-label">标签</p>
            <p>${tool.tags.join(' · ')}</p>
          </div>
          ${_revHTML}
          <div class="tool-footer">
            <div class="tool-rating">
              <span class="tool-rating-icon">★</span>
              <span>${tool.rating}</span>
              <span style="margin-left: 4px; opacity: 0.6;">(${Math.floor(Math.random() * 500 + 50)} 条评价)</span>
            </div>
            <a href="${tool.url}" target="_blank" rel="noopener" class="tool-visit-btn" onclick="event.stopPropagation()">
              访问 <span>→</span>
            </a>
          </div>
        </div>
      `).join('');
    }

    // =============================================
    // CATEGORY FILTER
    // =============================================
    function setCategory(cat) {
      currentCategory = cat;

      categoryTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === cat);
      });

      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.category === cat);
      });

      renderTools();
    }

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => setCategory(tab.dataset.category));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setCategory(link.dataset.category);
        navLinksContainer.classList.remove('active');
        isMobileMenuOpen = false;
      });
    });

    // =============================================
    // SEARCH
    // =============================================
    heroSearchInput.addEventListener('input', () => {
      currentSearch = heroSearchInput.value.trim();
      navSearchInput.value = currentSearch;
      renderTools();
    });

    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        navSearchInput.value = heroSearchInput.value.trim();
      }
    });

    heroSearchBtn.addEventListener('click', () => {
      navSearchInput.value = heroSearchInput.value.trim();
    });

    navSearchInput.addEventListener('input', () => {
      currentSearch = navSearchInput.value.trim();
      heroSearchInput.value = currentSearch;
      renderTools();
    });

    navSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        heroSearchInput.value = navSearchInput.value.trim();
      }
    });

    // =============================================
    // MOBILE MENU
    // =============================================
    mobileMenuBtn.addEventListener('click', () => {
      isMobileMenuOpen = !isMobileMenuOpen;
      navLinksContainer.classList.toggle('active', isMobileMenuOpen);
    });

    // =============================================
    // SCROLL HANDLERS
    // =============================================
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 10);
      scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =============================================
    // UPDATE CATEGORY COUNTS
    // =============================================
    function updateCategoryCounts() {
      const counts = { all: toolsData.length };
      toolsData.forEach(t => {
        counts[t.category] = (counts[t.category] || 0) + 1;
      });
      Object.keys(counts).forEach(cat => {
        const el = document.getElementById('count-' + cat);
        if (el) el.textContent = counts[cat];
      });
      document.getElementById('statTools').textContent = counts.all;
    }

    // =============================================
    // INIT
    // =============================================
    loadToolsData();
  
