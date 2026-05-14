const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tools.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Detail data for each tool
const details = {
  midjourney: {
    specs: [
      { label: "开发商", value: "Midjourney Inc." },
      { label: "核心模型", value: "Midjourney V7" },
      { label: "输出分辨率", value: "最高4096×4096" },
      { label: "支持格式", value: "PNG, WebP" },
      { label: "免费额度", value: "无免费额度" },
      { label: "API可用", value: "无官方API" },
      { label: "使用方式", value: "Discord / Web编辑器" },
      { label: "角色一致性", value: "Character Reference 2.0" }
    ],
    pricing: {
      plans: [
        {
          name: "Basic",
          price: "$10",
          period: "月",
          features: ["约200张图/月", "3个并发任务", "Web编辑器基础功能"],
          recommended: false
        },
        {
          name: "Standard",
          price: "$30",
          period: "月",
          features: ["15小时快速模式/月", "3个并发任务", "无限制松弛模式", "Character Reference 2.0"],
          recommended: true
        },
        {
          name: "Pro",
          price: "$60",
          period: "月",
          features: ["30小时快速模式/月", "12个并发任务", "隐身模式", "无限松弛模式"],
          recommended: false
        },
        {
          name: "Mega",
          price: "$120",
          period: "月",
          features: ["60小时快速模式/月", "12个并发任务", "隐身模式", "无限松弛模式"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://www.midjourney.com/assets/images/hero-1.webp", caption: "Midjourney V7 生成的艺术风格图像" }
    ],
    features: [
      "V7模型画质达到照片级真实感，手部解剖错误率降至8%",
      "Character Reference 2.0实现跨场景角色一致性",
      "风格范围极广，从写实摄影到油画水彩",
      "Web编辑器支持局部重绘和图像扩展",
      "Style Reference风格参考功能",
      "支持变体生成和图像放大"
    ],
    pros: [
      "艺术画质和审美水平业界第一",
      "风格多样性极强，几乎涵盖所有艺术流派",
      "角色一致性功能实用，适合连续创作",
      "社区庞大，提示词和风格库丰富",
      "V7手部渲染大幅改善"
    ],
    cons: [
      "无免费额度，最低$10/月起",
      "核心功能仍依赖Discord，Web编辑器功能有限",
      "无官方API，开发者无法集成",
      "中国用户需海外支付方式，Discord使用门槛高",
      "中文提示词理解不如英文",
      "生成速度慢于FLUX.2等竞品"
    ],
    bannerImage: "https://www.midjourney.com/assets/images/hero-1.webp"
  },

  sora: {
    specs: [
      { label: "开发商", value: "OpenAI" },
      { label: "核心模型", value: "Sora" },
      { label: "输出分辨率", value: "最高1080p" },
      { label: "视频时长", value: "最长60秒" },
      { label: "支持格式", value: "MP4" },
      { label: "免费额度", value: "ChatGPT Plus用户50次/月" },
      { label: "API可用", value: "有（OpenAI API）" },
      { label: "使用方式", value: "ChatGPT / API" }
    ],
    pricing: {
      plans: [
        {
          name: "ChatGPT Plus",
          price: "$20",
          period: "月",
          features: ["50次Sora视频生成/月", "最高720p", "最长5秒", "480p优先"],
          recommended: false
        },
        {
          name: "ChatGPT Pro",
          price: "$200",
          period: "月",
          features: ["无限Sora生成", "最高1080p", "最长60秒", "同时生成5个视频", "无水印下载"],
          recommended: true
        },
        {
          name: "API按量计费",
          price: "$0.10/秒",
          period: "",
          features: ["720p $0.10/秒", "1080p $0.20/秒", "按视频时长计费", "批量生成"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://sora.openai.com/assets/images/sora-hero.webp", caption: "Sora生成的视频截图" }
    ],
    features: [
      "文生视频，支持最长60秒1080p视频",
      "图生视频，将静态图片转为动态视频",
      "视频扩展和混合，支持多视频融合",
      "精确的物理模拟，运动规律自然",
      "支持相机运动控制（推拉摇移）",
      "ChatGPT集成，自然语言对话式创作"
    ],
    pros: [
      "OpenAI生态深度集成，ChatGPT用户无缝使用",
      "视频物理模拟自然，运动规律合理",
      "支持长视频生成（最长60秒）",
      "API开放，开发者可集成",
      "ChatGPT Plus用户即可使用基础功能"
    ],
    cons: [
      "高质量长视频仅Pro用户可用，价格$200/月",
      "Plus用户限制严格（50次/月，720p，5秒）",
      "偶尔出现物理规律错误",
      "中文提示词效果不如英文",
      "生成速度较慢，长视频需等待数分钟",
      "API按视频时长计费，成本较高"
    ],
    bannerImage: "https://sora.openai.com/assets/images/sora-hero.webp"
  },

  suno: {
    specs: [
      { label: "开发商", value: "Suno Inc." },
      { label: "核心模型", value: "Suno V5.5" },
      { label: "歌曲时长", value: "最长9分钟" },
      { label: "支持格式", value: "MP3, WAV" },
      { label: "免费额度", value: "50积分/天（约10首歌）" },
      { label: "API可用", value: "有（第三方API）" },
      { label: "声音克隆", value: "支持" },
      { label: "个性化引擎", value: "支持" }
    ],
    pricing: {
      plans: [
        {
          name: "Basic（免费）",
          price: "$0",
          period: "",
          features: ["50积分/天", "非商业用途", "最长2分钟", "队列等待生成"],
          recommended: false
        },
        {
          name: "Pro",
          price: "$10",
          period: "月",
          features: ["2500积分/月", "商业用途授权", "最长4分钟", "优先生成", "声音克隆10个"],
          recommended: true
        },
        {
          name: "Premier",
          price: "$30",
          period: "月",
          features: ["10000积分/月", "商业用途授权", "最长9分钟", "最优先生成", "声音克隆无限", "个性化引擎"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://suno.ai/assets/images/suno-hero.webp", caption: "Suno音乐生成界面" }
    ],
    features: [
      "V5.5模型支持最长9分钟完整歌曲",
      "声音克隆技术，可复刻特定歌手音色",
      "个性化引擎，学习用户偏好推荐风格",
      "支持歌词自定义和AI自动生成歌词",
      "多语言歌曲生成，中文支持良好",
      "分轨导出（人声/伴奏分离）"
    ],
    pros: [
      "免费额度充足，每日50积分够日常体验",
      "中文歌曲生成质量业界领先",
      "音乐风格覆盖全面（流行、摇滚、古典、说唱等）",
      "人声自然度极高，接近专业录音水准",
      "声音克隆功能独特且实用",
      "操作极简，零音乐基础即可创作"
    ],
    cons: [
      "长歌曲（>4分钟）结构偶有混乱",
      "免费版音质较低，商业用途需付费",
      "歌词偶尔出现语法错误或无意义内容",
      "风格控制精度有限，复杂编曲容易走偏",
      "无官方API，第三方API稳定性不保证",
      "生成的音乐版权归属仍有争议"
    ],
    bannerImage: "https://suno.ai/assets/images/suno-hero.webp"
  },

  gamma: {
    specs: [
      { label: "开发商", value: "Gamma Inc." },
      { label: "核心模型", value: "GPT-4o + 自研排版引擎" },
      { label: "输出格式", value: "网页/PPT/PDF" },
      { label: "模板数量", value: "100+专业模板" },
      { label: "免费额度", value: "400积分（约40页）" },
      { label: "API可用", value: "无" },
      { label: "协作功能", value: "支持实时协作" },
      { label: "中文支持", value: "良好" }
    ],
    pricing: {
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "",
          features: ["400积分", "基础模板", "Gamma水印", "导出PDF/PPT"],
          recommended: false
        },
        {
          name: "Plus",
          price: "$10",
          period: "月",
          features: ["无限积分（合理使用）", "所有高级模板", "无水印", "AI图片生成", "自定义字体/品牌"],
          recommended: true
        },
        {
          name: "Pro",
          price: "$20",
          period: "月",
          features: ["Plus全部功能", "无限制AI图片", "优先生成速度", "高级分析", "自定义域名发布"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://gamma.app/assets/images/hero-screenshot.webp", caption: "Gamma AI生成PPT界面" }
    ],
    features: [
      "AI一键生成完整演示文稿，输入主题即可",
      "支持网页/幻灯片/文档三种展示模式",
      "100+专业模板，覆盖商务/教育/科技场景",
      "AI图片生成，自动配图",
      "实时协作编辑，支持评论和分享",
      "一键导出PPT/PDF，兼容Office格式"
    ],
    pros: [
      "操作极简，零设计基础也能做出精美PPT",
      "网页版演示效果好，响应式布局自适应",
      "AI生成速度快，30秒内完成初稿",
      "模板质量高，视觉设计专业",
      "协作和分享功能完善",
      "免费版即可体验核心功能"
    ],
    cons: [
      "导出PPT后排版偶有偏差，需微调",
      "自定义程度不如专业PPT软件",
      "AI生成内容偶尔偏泛泛，需人工精修",
      "免费版积分用完后功能受限",
      "中文排版偶有间距不均问题",
      "高级动画和转场效果有限"
    ],
    bannerImage: "https://gamma.app/assets/images/hero-screenshot.webp"
  },

  meshy: {
    specs: [
      { label: "开发商", value: "Meshy AI Inc." },
      { label: "核心模型", value: "Meshy-4" },
      { label: "输出格式", value: "GLB, FBX, OBJ, USDZ, STL" },
      { label: "纹理贴图", value: "PBR材质自动生成" },
      { label: "免费额度", value: "5次文生3D/月" },
      { label: "API可用", value: "有" },
      { label: "3D打印", value: "支持全链路" },
      { label: "面数优化", value: "自动减面+LOD" }
    ],
    pricing: {
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "",
          features: ["5次文生3D/月", "5次图生3D/月", "5次纹理生成/月", "基础导出格式"],
          recommended: false
        },
        {
          name: "Pro",
          price: "$20",
          period: "月",
          features: ["200次文生3D/月", "200次图生3D/月", "无限纹理生成", "所有导出格式", "API访问", "优先队列"],
          recommended: true
        },
        {
          name: "Max",
          price: "$60",
          period: "月",
          features: ["无限文生3D", "无限图生3D", "无限纹理生成", "最高面数模型", "API优先访问", "商业授权"],
          recommended: false
        },
        {
          name: "Enterprise",
          price: "定制",
          period: "",
          features: ["私有化部署", "定制模型训练", "无限API调用", "专属客户经理", "SLA保障"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://www.meshy.ai/assets/images/hero-3d.webp", caption: "Meshy AI生成的3D模型" }
    ],
    features: [
      "文生3D：自然语言描述生成3D模型",
      "图生3D：单张图片生成3D模型",
      "AI纹理生成：自动生成PBR材质贴图",
      "3D打印全链路：模型→切片→打印",
      "自动减面和LOD生成，适配不同平台",
      "支持游戏引擎直接导入（Unity/Unreal）"
    ],
    pros: [
      "文生3D操作门槛最低，零3D基础可用",
      "PBR材质自动生成质量高，省去手动贴图",
      "3D打印全链路支持，从创作到实体",
      "API可用，支持批量生产3D资产",
      "导出格式丰富，兼容主流3D软件和引擎",
      "免费版可体验核心功能"
    ],
    cons: [
      "高面数模型细节不如手工建模",
      "复杂有机体（如人物）生成质量一般",
      "免费额度较少，仅5次/月",
      "生成模型偶有拓扑问题需修复",
      "生成速度较慢，单模型约1-3分钟",
      "中文提示词支持不如英文"
    ],
    bannerImage: "https://www.meshy.ai/assets/images/hero-3d.webp"
  },

  cursor: {
    specs: [
      { label: "开发商", value: "Cursor Inc." },
      { label: "核心模型", value: "GPT-4o / Claude 3.5 Sonnet" },
      { label: "支持语言", value: "所有主流编程语言" },
      { label: "IDE基础", value: "基于VS Code" },
      { label: "免费额度", value: "2000次补全/月" },
      { label: "API可用", value: "无独立API" },
      { label: "项目感知", value: "全代码库上下文理解" },
      { label: "Agent模式", value: "支持" }
    ],
    pricing: {
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "",
          features: ["2000次补全/月", "50次高级模型请求/月", "基础代码补全", "单文件上下文"],
          recommended: false
        },
        {
          name: "Pro",
          price: "$20",
          period: "月",
          features: ["无限补全", "500次高级模型请求/月", "全项目上下文感知", "Agent模式", "多文件编辑", "Cursor Tab"],
          recommended: true
        },
        {
          name: "Business",
          price: "$40",
          period: "月/人",
          features: ["Pro全部功能", "管理后台", "隐私模式", "SSO/SAML", "团队使用统计", "优先支持"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://cursor.com/assets/images/hero-screenshot.webp", caption: "Cursor AI代码编辑器界面" }
    ],
    features: [
      "全项目代码库上下文感知，理解整个工程",
      "Agent模式可自主规划并执行多步编码任务",
      "多文件同时编辑，AI协调跨文件修改",
      "Cursor Tab智能补全，预测下一步编辑",
      "支持GPT-4o和Claude 3.5 Sonnet切换",
      "基于VS Code，无缝迁移插件和配置"
    ],
    pros: [
      "全项目上下文理解能力最强，改代码不遗漏",
      "Agent模式可自主完成复杂编码任务",
      "VS Code生态无缝兼容，迁移零成本",
      "多文件编辑体验流畅，AI协调精准",
      "Cursor Tab补全预测准确，编码效率提升明显",
      "模型可选（GPT-4o/Claude），灵活切换"
    ],
    cons: [
      "Pro版高级模型请求有限额（500次/月）",
      "Agent模式偶有理解偏差，需人工校验",
      "大型项目首次索引耗时长",
      "中国用户直连速度慢，需代理",
      "价格比GitHub Copilot略贵",
      "无独立API，无法在终端或其他IDE使用"
    ],
    bannerImage: "https://cursor.com/assets/images/hero-screenshot.webp"
  },

  copilot: {
    specs: [
      { label: "开发商", value: "GitHub (Microsoft)" },
      { label: "核心模型", value: "GPT-4o / Codex" },
      { label: "支持IDE", value: "VS Code, JetBrains, Neovim, Visual Studio等" },
      { label: "支持语言", value: "所有主流编程语言" },
      { label: "免费额度", value: "开源项目免费/学生免费" },
      { label: "API可用", value: "GitHub Models API" },
      { label: "Agent模式", value: "Copilot Agent" },
      { label: "企业版", value: "支持VLM/知识库" }
    ],
    pricing: {
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "",
          features: ["2000次补全/月", "50次聊天/月", "基础代码补全", "VS Code/JetBrains插件"],
          recommended: false
        },
        {
          name: "Pro",
          price: "$10",
          period: "月",
          features: ["无限补全", "无限聊天", "Agent模式", "多模型选择", "Copilot Edits", "代码审查"],
          recommended: true
        },
        {
          name: "Business",
          price: "$19",
          period: "月/人",
          features: ["Pro全部功能", "组织管理", "策略管理", "知识库集成", "IP indemnity", "SAML SSO"],
          recommended: false
        },
        {
          name: "Enterprise",
          price: "$39",
          period: "月/人",
          features: ["Business全部功能", "GitHub知识库搜索", "自定义模型微调", "高级安全合规", "专属支持"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://github.githubassets.com/assets/copilot-hero-screenshot.webp", caption: "GitHub Copilot在VS Code中的代码补全" }
    ],
    features: [
      "GPT-4o/Codex驱动，代码补全和生成质量高",
      "IDE集成最广，VS Code/JetBrains/Visual Studio等全覆盖",
      "Copilot Agent模式，自主执行编码任务",
      "Copilot Chat对话式编程，理解上下文提问",
      "开源贡献者和学生永久免费",
      "企业版支持知识库和私有代码索引"
    ],
    pros: [
      "IDE兼容性最广，几乎所有主流IDE支持",
      "价格$10/月，性价比极高",
      "开源贡献者和学生免费",
      "代码补全响应速度快，延迟低",
      "GitHub生态深度整合，PR/Issue直接AI辅助",
      "企业版合规和安全功能完善"
    ],
    cons: [
      "全项目上下文感知弱于Cursor",
      "Agent模式不如Cursor成熟",
      "免费版额度较少（2000次补全/月）",
      "偶尔生成不安全或有漏洞的代码",
      "对非GitHub项目的理解深度有限",
      "中文注释和文档生成质量一般"
    ],
    bannerImage: "https://github.githubassets.com/assets/copilot-hero-screenshot.webp"
  },

  perplexity: {
    specs: [
      { label: "开发商", value: "Perplexity AI Inc." },
      { label: "核心模型", value: "自研+GPT-4o/Claude 3.5/Gemini" },
      { label: "联网搜索", value: "实时联网" },
      { label: "引用来源", value: "每个答案附带引用链接" },
      { label: "免费额度", value: "5次Pro搜索/天" },
      { label: "API可用", value: "有（pplx-api）" },
      { label: "文件分析", value: "支持上传文档分析" },
      { label: "学术搜索", value: "支持学术文献搜索" }
    ],
    pricing: {
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "",
          features: ["无限基础搜索", "5次Pro搜索/天", "基础模型", "文件上传分析"],
          recommended: false
        },
        {
          name: "Pro",
          price: "$20",
          period: "月",
          features: ["600次Pro搜索/天", "GPT-4o/Claude 3.5/Gemini可选", "文件上传无限制", "图片生成", "API额度$5/月"],
          recommended: true
        },
        {
          name: "Enterprise",
          price: "$40",
          period: "月/人",
          features: ["Pro全部功能", "内部知识库搜索", "团队协作", "SSO/SAML", "API额度$50/月", "专属支持"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://www.perplexity.ai/assets/images/hero-screenshot.webp", caption: "Perplexity AI搜索结果界面" }
    ],
    features: [
      "实时联网搜索，答案基于最新网络信息",
      "每个回答附带引用来源链接，可验证",
      "多模型切换（GPT-4o/Claude/Gemini）",
      "文件上传分析，支持PDF/Word/代码等",
      "学术搜索模式，专注学术文献",
      "API可用，开发者可构建搜索应用"
    ],
    pros: [
      "引用来源透明，答案可追溯可验证",
      "搜索速度极快，3秒内返回结果",
      "多模型可选，根据需求切换",
      "免费版即可日常使用，基础搜索无限",
      "学术搜索模式实用，论文研究利器",
      "API设计优秀，开发者友好"
    ],
    cons: [
      "Pro搜索免费仅5次/天，深度研究受限",
      "中文搜索质量不如英文，国内信息源覆盖有限",
      "偶尔引用低质量来源，需自行判断",
      "复杂推理和多步分析能力不如纯对话模型",
      "中国用户直连速度慢",
      "Pro版$20/月，价格与ChatGPT Plus持平"
    ],
    bannerImage: "https://www.perplexity.ai/assets/images/hero-screenshot.webp"
  },

  qwen36: {
    specs: [
      { label: "开发商", value: "阿里巴巴" },
      { label: "核心模型", value: "Qwen3.6-Plus" },
      { label: "上下文窗口", value: "128K tokens" },
      { label: "编程能力", value: "HumanEval 86.5%+" },
      { label: "免费额度", value: "100万tokens/月（DashScope）" },
      { label: "API可用", value: "有（DashScope/百炼）" },
      { label: "Agent能力", value: "强（工具调用/多步规划）" },
      { label: "开源", value: "部分模型开源" }
    ],
    pricing: {
      plans: [
        {
          name: "免费试用",
          price: "¥0",
          period: "",
          features: ["100万tokens/月", "Qwen3.6-Plus基础版", "DashScope控制台", "API调用"],
          recommended: false
        },
        {
          name: "按量付费",
          price: "¥0.002/千tokens",
          period: "",
          features: ["Qwen3.6-Plus输入", "¥0.006/千tokens输出", "无限调用", "128K上下文", "Agent/工具调用"],
          recommended: true
        },
        {
          name: "资源包",
          price: "¥100起",
          period: "",
          features: ["预付费更优惠", "多模型可选", "有效期1年", "企业发票"],
          recommended: false
        },
        {
          name: "企业版",
          price: "定制",
          period: "",
          features: ["私有化部署", "模型微调", "VPC网络", "专属支持", "SLA保障"],
          recommended: false
        }
      ]
    },
    screenshots: [
      { url: "https://dashscope.console.aliyun.com/assets/images/qwen-hero.webp", caption: "通义千问DashScope控制台" }
    ],
    features: [
      "编程Coding能力业界领先，多项编程评测超越竞品",
      "Agent智能体能力强，支持工具调用和多步规划",
      "128K超长上下文，支持长文档理解",
      "API价格极低，性价比国产模型中最优",
      "阿里云生态深度集成，企业部署便捷",
      "多语言能力强，支持119种语言"
    ],
    pros: [
      "编程和Agent能力在国产模型中最强",
      "API价格极低，性价比碾压同能力模型",
      "免费额度充足，100万tokens/月够开发测试",
      "工具调用(Function Calling)稳定准确",
      "阿里云基础设施保障，API可用性99.9%",
      "中文编程注释和文档生成质量高"
    ],
    cons: [
      "长上下文128K以上效果有衰减",
      "英文推理能力略逊GPT-4o和Claude",
      "创意写作风格偏正式，不够灵活",
      "开源版本更新滞后于商业版",
      "DashScope文档和SDK偶有滞后",
      "模型微调门槛较高，需技术储备"
    ],
    bannerImage: "https://dashscope.console.aliyun.com/assets/images/qwen-hero.webp"
  }
};

// Update each tool in the JSON
let updatedCount = 0;
let notFoundIds = [];

for (const [toolId, detailData] of Object.entries(details)) {
  const tool = data.tools.find(t => t.id === toolId);
  if (tool) {
    // Add new fields without overwriting existing ones
    if (!tool.specs) tool.specs = detailData.specs;
    if (!tool.pricing) tool.pricing = detailData.pricing;
    if (!tool.screenshots) tool.screenshots = detailData.screenshots;
    if (!tool.features) tool.features = detailData.features;
    if (!tool.pros) tool.pros = detailData.pros;
    if (!tool.cons) tool.cons = detailData.cons;
    if (!tool.bannerImage) tool.bannerImage = detailData.bannerImage;
    updatedCount++;
    console.log(`✅ Updated: ${tool.name} (id: ${toolId})`);
  } else {
    notFoundIds.push(toolId);
    console.log(`❌ Not found: ${toolId}`);
  }
}

// Write back
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updatedCount} tools`);
console.log(`   Not found: ${notFoundIds.length > 0 ? notFoundIds.join(', ') : 'none'}`);
console.log(`   Output: ${filePath}`);
