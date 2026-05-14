const fs = require('fs');
const path = 'C:\\Users\\Administrator\\.qclaw\\workspace-agent-a39b23d9\\quickapis-site-temp\\tools.json';

// Read the JSON file
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Helper function to find tool by id
function findTool(id) {
  return data.tools.find(t => t.id === id);
}

// Batch 1: 8 tools
// 1. doubao (豆包) - 聊天AI
const doubao = findTool('doubao');
if (doubao && !doubao.specs) {
  doubao.specs = [
    { label: "开发商", value: "字节跳动" },
    { label: "最新模型", value: "豆包2.0 (2026年4月)" },
    { label: "参数规模", value: "未知（估计千亿级）" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "多模态能力", value: "文本、图像生成" },
    { label: "API可用", value: "是 (输入¥0.004/千tokens)" },
    { label: "推理速度", value: "首token延迟180ms" },
    { label: "支持语言", value: "中文优先，多语言" }
  ];
  doubao.pricing = {
    "plans": [
      {
        "name": "免费版",
        "price": "免费",
        "period": null,
        "features": [
          "豆包App/Web免费使用",
          "基础对话能力",
          "有限额度"
        ],
        "recommended": false
      },
      {
        "name": "豆包API",
        "price": "¥0.004/千tokens（输入）",
        "period": null,
        "features": [
          "性价比极高",
          "中文场景优化",
          "与抖音生态整合",
          "支持流式输出"
        ],
        "recommended": true
      }
    ]
  };
  doubao.features = [
    "中文日常对话和创意写作表现优秀",
    "与抖音、飞书生态深度整合",
    "API价格极低，千token仅0.4分钱",
    "首token延迟仅180ms，响应速度极快",
    "多端体验一致（App/Web/API）",
    "批量NLP任务成本极低",
    "支持流式输出和function calling"
  ];
  doubao.pros = [
    "API价格极致性价比，为GPT-5.5的1/50",
    "中文日常对话和创意写作优秀",
    "响应速度极快（首token延迟180ms）",
    "与字节系产品生态整合无缝",
    "批量NLP任务成本极低"
  ];
  doubao.cons = [
    "复杂逻辑推理和数学能力偏弱",
    "长上下文处理稳定性不如Kimi",
    "英文输出质量不稳定",
    "深度推理任务准确率不足"
  ];
  console.log('✓ Added data for doubao');
}

// 2. siliconflow (硅基流动) - 大模型API
const siliconflow = findTool('siliconflow');
if (siliconflow && !siliconflow.specs) {
  siliconflow.specs = [
    { label: "平台类型", value: "AI API聚合平台" },
    { label: "支持模型", value: "Qwen、DeepSeek、GLM、ChatGLM等" },
    { label: "部署方式", value: "云端API" },
    { label: "上下文长度", value: "取决于模型（最高128K）" },
    { label: "API可用", value: "是（聚合多模型API）" },
    { label: "价格优势", value: "低价策略，比官方低30-50%" },
    { label: "支持语言", value: "多语言" }
  ];
  siliconflow.pricing = {
    "plans": [
      {
        "name": "按量付费",
        "price": "低价（比官方低30-50%）",
        "period": null,
        "features": [
          "无月费",
          "按token计费",
          "多模型可选",
          "国内访问稳定"
        ],
        "recommended": true
      }
    ]
  };
  siliconflow.features = [
    "聚合多个国产大模型API",
    "价格比官方渠道低30-50%",
    "国内访问稳定，无需VPN",
    "统一API接口，易于切换模型",
    "支持Qwen、DeepSeek、GLM等热门模型",
    "简单易用的API文档"
  ];
  siliconflow.pros = [
    "价格优势明显，降低成本",
    "国内访问稳定",
    "多模型聚合，灵活切换",
    "适合国内开发者"
  ];
  siliconflow.cons = [
    "平台稳定性依赖第三方",
    "技术支持可能不如官方",
    "模型更新可能滞后于官方"
  ];
  console.log('✓ Added data for siliconflow');
}

// 3. zhipuai (智谱AI) - 大模型API
const zhipuai = findTool('zhipuai');
if (zhipuai && !zhipuai.specs) {
  zhipuai.specs = [
    { label: "开发商", value: "清华智谱AI" },
    { label: "最新模型", value: "GLM-4系列 (2026年)" },
    { label: "参数规模", value: "GLM-4-Plus/Pro/Flash" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "多模态能力", value: "文本、图像理解（CogView）" },
    { label: "API可用", value: "是 (输入¥0.05/千tokens起)" },
    { label: "All-Tools能力", value: "工具调用准确率91.3%" },
    { label: "支持语言", value: "中文优秀，多语言" }
  ];
  zhipuai.pricing = {
    "plans": [
      {
        "name": "免费试用",
        "price": "免费额度",
        "period": null,
        "features": [
          "新用户免费额度",
          "体验GLM-4基础能力"
        ],
        "recommended": false
      },
      {
        "name": "按量付费",
        "price": "¥0.05/千tokens（GLM-4-Flash）",
        "period": null,
        "features": [
          "GLM-4全系列模型",
          "All-Tools工具调用",
          "智谱清言App集成",
          "企业级SLA"
        ],
        "recommended": true
      }
    ]
  };
  zhipuai.features = [
    "All-Tools工具调用准确率91.3%业界最高",
    "多步推理+工具调用体验流畅",
    "智谱清言App用户体验优秀",
    "中文理解自然，不像翻译腔",
    "与清华KEG实验室技术同源",
    "支持function calling和并行工具调用"
  ];
  zhipuai.pros = [
    "All-Tools工具调用能力顶尖",
    "中文理解自然流畅",
    "智谱清言App体验完整",
    "清华背景，技术实力强"
  ];
  zhipuai.cons = [
    "纯文本推理能力与头部模型有差距",
    "开源版本更新滞后于商业版",
    "API并发限制较严格",
    "高并发场景API稳定性不足"
  ];
  console.log('✓ Added data for zhipuai');
}

// 4. tongyi (通义千问) - 聊天AI
const tongyi = findTool('tongyi');
if (tongyi && !tongyi.specs) {
  tongyi.specs = [
    { label: "开发商", value: "阿里巴巴达摩院" },
    { label: "最新模型", value: "Qwen3系列 (2026年4月)" },
    { label: "参数规模", value: "0.6B到235B（MoE 235B/22B激活）" },
    { label: "上下文长度", value: "128K tokens（Qwen3-235B）" },
    { label: "多模态能力", value: "文本、图像（Qwen3-VL独立模型）" },
    { label: "API可用", value: "是 (输入$0.15/M tokens起)" },
    { label: "多语言能力", value: "119种语言" },
    { label: "开源协议", value: "开源可商用" }
  ];
  tongyi.pricing = {
    "plans": [
      {
        "name": "免费试用",
        "price": "免费额度",
        "period": null,
        "features": [
          "通义千问App/Web免费使用",
          "有限额度"
        ],
        "recommended": false
      },
      {
        "name": "阿里云API",
        "price": "$0.15/M tokens（Qwen3-72B）",
        "period": null,
        "features": [
          "Qwen3全系列模型",
          "119种语言支持",
          "阿里云生态整合",
          "企业级部署支持"
        ],
        "recommended": true
      }
    ]
  };
  tongyi.features = [
    "Qwen3-235B开源模型MMLU 86.7%超越GPT-4o",
    "MoE版本推理效率极高，单卡A100可运行",
    "模型尺寸覆盖全面，从0.6B到235B",
    "多语言能力突出，支持119种语言",
    "开源生态完善，HuggingFace下载量第一",
    "中文理解能力在开源模型中最强"
  ];
  tongyi.pros = [
    "开源标杆，性能超越GPT-4o",
    "模型尺寸选择丰富，性价比高",
    "多语言支持最广（119种）",
    "阿里云生态整合，企业部署便捷"
  ];
  tongyi.cons = [
    "多模态能力需依赖独立VL模型",
    "中文创意写作风格偏正式",
    "128K以上长上下文效果衰减明显",
    "API定价策略不如豆包激进"
  ];
  console.log('✓ Added data for tongyi');
}

// 5. qwen36 (通义千问3.6) - 大模型API
const qwen36 = findTool('qwen36');
if (qwen36 && !qwen36.specs) {
  qwen36.specs = [
    { label: "开发商", value: "阿里巴巴达摩院" },
    { label: "最新模型", value: "Qwen3.6-Plus (2026年5月)" },
    { label: "参数规模", value: "未知（估计千亿级）" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "核心能力", value: "智能体Agent/编程Coding/工具调用" },
    { label: "API可用", value: "是 (阿里云DashScope)" },
    { label: "编程能力", value: "多项编程评测超越竞品" },
    { label: "支持语言", value: "多语言" }
  ];
  qwen36.pricing = {
    "plans": [
      {
        "name": "按量付费",
        "price": "估计$0.20/M tokens起",
        "period": null,
        "features": [
          "Qwen3.6-Plus旗舰模型",
          "Agent/编程/Coding强化",
          "工具调用优化",
          "阿里云生态整合"
        ],
        "recommended": true
      }
    ]
  };
  qwen36.features = [
    "智能体Agent能力强化",
    "编程Coding能力多项评测超越竞品",
    "工具调用优化",
    "与阿里云生态深度整合",
    "企业级API稳定性"
  ];
  qwen36.pros = [
    "编程能力突出",
    "Agent设计优化",
    "阿里云生态整合"
  ];
  qwen36.cons = [
    "价格可能偏高",
    "具体性能数据待更多评测",
    "新模型，生态待完善"
  ];
  console.log('✓ Added data for qwen36');
}

// 6. wenxin (百度文心大模型5.1) - 聊天AI
const wenxin = findTool('wenxin');
if (wenxin && !wenxin.specs) {
  wenxin.specs = [
    { label: "开发商", value: "百度" },
    { label: "最新模型", value: "文心大模型5.1 (2026年)" },
    { label: "参数规模", value: "未知（千亿级）" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "多模态能力", value: "文本、图像（文心一格）" },
    { label: "API可用", value: "是 (输入¥0.08/千tokens起)" },
    { label: "中文能力", value: "C-Eval 92.1%国产最高" },
    { label: "支持语言", value: "中文优先" }
  ];
  wenxin.pricing = {
    "plans": [
      {
        "name": "免费试用",
        "price": "免费额度",
        "period": null,
        "features": [
          "文心一言App/Web免费使用",
          "有限额度"
        ],
        "recommended": false
      },
      {
        "name": "按量付费",
        "price": "¥0.08/千tokens（输入）",
        "period": null,
        "features": [
          "文心大模型5.1",
          "中文语义理解顶尖",
          "百度搜索生态整合",
          "企业级合规"
        ],
        "recommended": true
      }
    ]
  };
  wenxin.features = [
    "C-Eval 92.1%国产最高，中文语义理解顶尖",
    "中文成语、古诗词、法律等专业场景优秀",
    "与百度搜索、文库生态深度整合",
    "企业级合规性，适合国内企业",
    "中文文化理解深度无人能及"
  ];
  wenxin.pros = [
    "中文语义理解顶尖，C-Eval得分最高",
    "百度搜索整合带来实时信息优势",
    "企业客户服务成熟，合规性强",
    "中文文化理解深度无人能及"
  ];
  wenxin.cons = [
    "代码和数学能力明显落后竞品",
    "多模态生成质量不如文心一格独立模型",
    "API价格偏高，性价比不如豆包",
    "长上下文能力弱，128K以上衰减严重"
  ];
  console.log('✓ Added data for wenxin');
}

// 7. spark (讯飞星火) - 聊天AI
const spark = findTool('spark');
if (spark && !spark.specs) {
  spark.specs = [
    { label: "开发商", value: "科大讯飞" },
    { label: "最新模型", value: "讯飞星火V4.0 (2026年)" },
    { label: "参数规模", value: "未知（千亿级）" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "核心优势", value: "语音交互能力强" },
    { label: "API可用", value: "是 (输入¥0.06/千tokens起)" },
    { label: "语音能力", value: "语音延迟300ms，MOS 4.2/5" },
    { label: "支持语言", value: "中文优先，多语言" }
  ];
  spark.pricing = {
    "plans": [
      {
        "name": "免费试用",
        "price": "免费额度",
        "period": null,
        "features": [
          "讯飞星火App/Web免费使用",
          "有限额度"
        ],
        "recommended": false
      },
      {
        "name": "按量付费",
        "price": "¥0.06/千tokens（输入）",
        "period": null,
        "features": [
          "星火V4.0文本模型",
          "语音识别+合成API",
          "教育场景优化",
          "硬件生态整合"
        ],
        "recommended": true
      }
    ]
  };
  spark.features = [
    "语音交互延迟仅300ms，体验接近真人对话",
    "中文语音合成自然度MOS 4.2，国产最高",
    "教育场景（口语练习、作文批改）专有优化",
    "与讯飞硬件生态（录音笔、翻译机）无缝对接",
    "K12教育场景口语练习体验无可替代",
    "会议转写+摘要一体化解决方案成熟"
  ];
  spark.pros = [
    "语音交互能力独树一帜，延迟低自然度高",
    "教育场景专有优化，K12口语练习体验好",
    "与讯飞硬件生态整合无缝",
    "离线语音能力适合隐私敏感场景"
  ];
  spark.cons = [
    "纯文本推理能力在国产模型中偏弱",
    "多模态图像理解能力落后",
    "API生态和开发者社区较小",
    "通用推理能力偏弱，MMLU仅76.8%"
  ];
  console.log('✓ Added data for spark');
}

// 8. hunyuan (腾讯混元) - 大模型API
const hunyuan = findTool('hunyuan');
if (hunyuan && !hunyuan.specs) {
  hunyuan.specs = [
    { label: "开发商", value: "腾讯" },
    { label: "最新模型", value: "腾讯混元大模型 (2026年)" },
    { label: "参数规模", value: "未知（千亿级）" },
    { label: "上下文长度", value: "128K tokens" },
    { label: "多模态能力", value: "文本、图像、视频理解" },
    { label: "API可用", value: "是 (腾讯云API)" },
    { label: "核心优势", value: "腾讯生态整合" },
    { label: "支持语言", value: "中文优秀，多语言" }
  ];
  hunyuan.pricing = {
    "plans": [
      {
        "name": "免费试用",
        "price": "免费额度",
        "period": null,
        "features": [
          "腾讯混元App/Web免费使用",
          "有限额度"
        ],
        "recommended": false
      },
      {
        "name": "腾讯云API",
        "price": "估计¥0.10/千tokens（输入）",
        "period": null,
        "features": [
          "混元大模型",
          "腾讯云生态整合",
          "企业微信集成",
          "游戏AI优化"
        ],
        "recommended": true
      }
    ]
  };
  hunyuan.features = [
    "腾讯生态深度整合（微信、QQ、企业微信）",
    "游戏AI优化，适合游戏NPC对话",
    "多模态理解能力（文本、图像、视频）",
    "腾讯云企业级部署支持",
    "中文理解能力优秀"
  ];
  hunyuan.pros = [
    "腾讯生态整合无缝",
    "游戏AI场景优化",
    "企业微信集成，适合企业应用",
    "腾讯云稳定性保障"
  ];
  hunyuan.cons = [
    "公开信息较少，评测数据不足",
    "相比竞品知名度较低",
    "API价格可能偏高",
    "开发者社区规模较小"
  ];
  console.log('✓ Added data for hunyuan');
}

// Write the updated JSON back to file
fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ Batch 1 complete! Updated tools.json with data for 8 tools.');
