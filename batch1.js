const fs = require('fs');
const filePath = 'C:\\Users\\Administrator\\.qclaw\\workspace-agent-a39b23d9\\quickapis-site-temp\\tools.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updates = {
  "notionai": {
    "specs": [
      {"label": "开发商", "value": "Notion Labs"},
      {"label": "核心功能", "value": "AI写作、摘要、翻译、头脑风暴、知识库问答"},
      {"label": "支持平台", "value": "Web、macOS、Windows、iOS、Android"},
      {"label": "AI能力", "value": "基于GPT模型，文档内AI辅助写作与编辑"},
      {"label": "文件格式", "value": "Markdown、PDF、CSV、HTML等"},
      {"label": "免费额度", "value": "基础版免费，AI功能需订阅"},
      {"label": "语言支持", "value": "多语言（中文支持良好）"}
    ],
    "pricing": {
      "plans": [
        {"name": "Free", "price": "免费", "period": null, "features": ["基础笔记和页面", "协作编辑", "有限AI问答"], "recommended": false},
        {"name": "Plus", "price": "$10", "period": "月", "features": ["无限文件", "30天页面历史", "Notion AI附加$10/月"], "recommended": true},
        {"name": "Business", "price": "$18", "period": "月", "features": ["Plus全部功能", "SAML SSO", "90天页面历史", "高级权限管理"], "recommended": false},
        {"name": "Notion AI", "price": "$10", "period": "月", "features": ["AI写作与编辑", "文档摘要与翻译", "头脑风暴", "知识库问答"], "recommended": false}
      ]
    },
    "features": [
      "AI辅助写作与自动补全",
      "文档智能摘要与翻译",
      "知识库问答（基于工作区内容）",
      "头脑风暴与大纲生成",
      "表格自动填充与数据提取",
      "多语言实时翻译",
      "与Notion工作流深度集成"
    ],
    "pros": [
      "与Notion生态无缝集成，无需切换工具",
      "知识库问答功能实用，可检索工作区内容",
      "AI写作辅助自然流畅，支持中文",
      "协作体验优秀，团队共享方便"
    ],
    "cons": [
      "AI功能需额外付费$10/月",
      "AI回答质量依赖上下文，长文档效果有限",
      "不支持图像生成",
      "离线功能受限"
    ]
  },
  "feishu": {
    "specs": [
      {"label": "开发商", "value": "字节跳动"},
      {"label": "核心功能", "value": "企业协作、即时通讯、文档协作、视频会议、AI助手"},
      {"label": "支持平台", "value": "Web、macOS、Windows、iOS、Android"},
      {"label": "AI能力", "value": "飞书智能助手（My AI）、会议纪要自动生成、文档AI"},
      {"label": "文件格式", "value": "飞书文档、Excel、Word、PDF等"},
      {"label": "免费额度", "value": "免费版支持50人以下团队"},
      {"label": "语言支持", "value": "中文为主，多语言支持"}
    ],
    "pricing": {
      "plans": [
        {"name": "免费版", "price": "免费", "period": null, "features": ["50人以下团队", "基础IM和文档", "10GB云空间", "有限AI功能"], "recommended": false},
        {"name": "标准版", "price": "¥36", "period": "月/人", "features": ["无限人数", "100GB云空间", "会议AI纪要", "高级权限"], "recommended": true},
        {"name": "企业版", "price": "¥60", "period": "月/人", "features": ["标准版全部功能", "无限云空间", "高级安全合规", "专属客户经理"], "recommended": false},
        {"name": "旗舰版", "price": "定制", "period": null, "features": ["企业版全部功能", "专属部署", "深度定制", "7x24支持"], "recommended": false}
      ]
    },
    "features": [
      "飞书智能助手My AI对话",
      "会议实时转写与智能纪要",
      "文档AI写作与润色",
      "多维表格智能分析",
      "审批流程自动化",
      "OKR管理与智能提醒",
      "深度集成字节生态"
    ],
    "pros": [
      "AI功能深度融入协作场景，实用性强",
      "会议纪要自动生成准确率高",
      "免费版对小团队友好",
      "中文体验优秀，国内访问稳定"
    ],
    "cons": [
      "AI功能在免费版中受限",
      "海外用户访问速度一般",
      "与钉钉/企业微信生态不互通",
      "部分高级AI功能需企业版"
    ]
  },
  "dingtalk": {
    "specs": [
      {"label": "开发商", "value": "阿里巴巴"},
      {"label": "核心功能", "value": "企业通讯、OA审批、项目管理、智能人事、AI助手"},
      {"label": "支持平台", "value": "Web、macOS、Windows、iOS、Android"},
      {"label": "AI能力", "value": "钉钉AI助理、通义千问集成、智能摘要、AI生成应用"},
      {"label": "文件格式", "value": "钉钉文档、Excel、Word、PDF等"},
      {"label": "免费额度", "value": "免费版功能较完整"},
      {"label": "语言支持", "value": "中文为主，多语言支持"}
    ],
    "pricing": {
      "plans": [
        {"name": "免费版", "price": "免费", "period": null, "features": ["基础IM和OA", "基础AI对话", "100GB云空间", "视频会议"], "recommended": false},
        {"name": "专业版", "price": "¥980", "period": "年", "features": ["免费版全部功能", "高级AI功能", "1TB云空间", "数据报表"], "recommended": true},
        {"name": "专属版", "price": "¥9,800", "period": "年", "features": ["专业版全部功能", "专属部署", "数据大屏", "高级安全"], "recommended": false},
        {"name": "专有版", "price": "定制", "period": null, "features": ["私有化部署", "完全定制", "专属服务团队"], "recommended": false}
      ]
    },
    "features": [
      "钉钉AI助理对话与创作",
      "通义千问深度集成",
      "AI生成低代码应用",
      "智能审批与流程自动化",
      "会议纪要自动生成",
      "智能人事与考勤管理",
      "钉钉文档AI辅助写作"
    ],
    "pros": [
      "国内企业用户基数最大，生态成熟",
      "免费版功能较完整，中小企业友好",
      "AI生成低代码应用门槛低",
      "与阿里云生态深度整合"
    ],
    "cons": [
      "AI体验不如专注型AI产品",
      "界面功能多但略显臃肿",
      "部分AI功能需专业版以上",
      "海外用户支持较弱"
    ]
  },
  "tingwu": {
    "specs": [
      {"label": "开发商", "value": "阿里巴巴（通义实验室）"},
      {"label": "核心功能", "value": "音视频转写、实时翻译、会议纪要、AI问答"},
      {"label": "支持平台", "value": "Web、Chrome插件、钉钉集成"},
      {"label": "AI能力", "value": "通义千问语音模型、多语言识别、智能摘要"},
      {"label": "文件格式", "value": "MP3、WAV、MP4、M4A等音视频格式"},
      {"label": "免费额度", "value": "每日2小时免费转写"},
      {"label": "语言支持", "value": "中文、英文、日文等15+语言"}
    ],
    "pricing": {
      "plans": [
        {"name": "免费版", "price": "免费", "period": null, "features": ["每日2小时转写", "基础AI问答", "Chrome插件"], "recommended": false},
        {"name": "专业版", "price": "¥39", "period": "月", "features": ["每日10小时转写", "智能纪要", "多语言翻译", "说话人区分"], "recommended": true},
        {"name": "企业版", "price": "定制", "period": null, "features": ["无限转写", "API接口", "私有化部署", "专属模型定制"], "recommended": false}
      ]
    },
    "features": [
      "实时音视频转写，准确率超98%",
      "多语言实时翻译",
      "AI智能纪要与问答",
      "说话人自动识别与区分",
      "Chrome插件网页实时字幕",
      "钉钉/飞书会议集成",
      "播客与课程笔记生成"
    ],
    "pros": [
      "中文语音识别准确率业界领先",
      "免费额度充足，轻度用户够用",
      "实时转写+翻译一体化体验好",
      "与阿里生态集成方便"
    ],
    "cons": [
      "英文识别准确率不如Otter",
      "仅支持Web端，无原生桌面客户端",
      "专业版功能提升有限",
      "API调用需企业版"
    ]
  },
  "otter": {
    "specs": [
      {"label": "开发商", "value": "Otter.ai"},
      {"label": "核心功能", "value": "会议转写、实时字幕、会议纪要、AI对话摘要"},
      {"label": "支持平台", "value": "Web、macOS、Windows、iOS、Android"},
      {"label": "AI能力", "value": "OtterPilot AI会议助手、智能摘要、行动项提取"},
      {"label": "文件格式", "value": "MP3、WAV、MP4等音视频格式"},
      {"label": "免费额度", "value": "每月300分钟免费转写"},
      {"label": "语言支持", "value": "英文为主，有限中文支持"}
    ],
    "pricing": {
      "plans": [
        {"name": "Basic", "price": "免费", "period": null, "features": ["每月300分钟转写", "每次30分钟上限", "3个对话导入"], "recommended": false},
        {"name": "Pro", "price": "$16.99", "period": "月", "features": ["每月1200分钟转写", "每次90分钟上限", "OtterPilot自动参会", "AI摘要与行动项"], "recommended": true},
        {"name": "Business", "price": "$30", "period": "月/用户", "features": ["Pro全部功能", "无限转写", "团队协作", "高级安全与管理"], "recommended": false},
        {"name": "Enterprise", "price": "定制", "period": null, "features": ["Business全部功能", "SSO/SCIM", "专属部署", "API访问"], "recommended": false}
      ]
    },
    "features": [
      "OtterPilot自动参加Zoom/Teams/Meet会议",
      "实时转写与字幕显示",
      "AI智能摘要与关键点提取",
      "行动项自动识别与分配",
      "说话人自动识别标注",
      "与Zoom/Teams/Meet深度集成",
      "会议内容AI问答"
    ],
    "pros": [
      "英文会议转写准确率极高",
      "OtterPilot自动参会功能省心",
      "与主流会议平台集成完善",
      "行动项提取功能实用"
    ],
    "cons": [
      "中文支持差，几乎不可用",
      "免费版限制严格（300分钟/月）",
      "价格相对较高",
      "国内访问速度一般"
    ]
  },
  "lookscanned": {
    "specs": [
      {"label": "开发商", "value": "Look Scanned"},
      {"label": "核心功能", "value": "PDF扫描效果模拟、文档扫描化处理"},
      {"label": "支持平台", "value": "Web浏览器"},
      {"label": "AI能力", "value": "无AI功能，纯图像处理"},
      {"label": "文件格式", "value": "PDF输入输出"},
      {"label": "免费额度", "value": "完全免费"},
      {"label": "语言支持", "value": "界面多语言"}
    ],
    "pricing": {
      "plans": [
        {"name": "免费版", "price": "免费", "period": null, "features": ["全部功能", "无水印", "无需注册", "无需上传服务器"], "recommended": true}
      ]
    },
    "features": [
      "PDF扫描效果模拟",
      "完全本地处理，隐私安全",
      "无需注册即用",
      "可调节扫描效果参数",
      "支持批量处理",
      "无水印输出"
    ],
    "pros": [
      "完全免费，无隐藏收费",
      "本地处理，文档不上传服务器",
      "使用简单，无需注册",
      "扫描效果逼真"
    ],
    "cons": [
      "功能单一，仅做扫描效果模拟",
      "无AI智能处理能力",
      "仅支持PDF格式",
      "无批量API接口"
    ]
  },
  "tinywow": {
    "specs": [
      {"label": "开发商", "value": "TinyWow"},
      {"label": "核心功能", "value": "PDF转换、图像处理、视频转换、文件格式互转"},
      {"label": "支持平台", "value": "Web浏览器"},
      {"label": "AI能力", "value": "无AI功能，纯文件处理工具"},
      {"label": "文件格式", "value": "PDF、JPG、PNG、MP4、DOCX等50+格式"},
      {"label": "免费额度", "value": "完全免费"},
      {"label": "语言支持", "value": "英文界面"}
    ],
    "pricing": {
      "plans": [
        {"name": "免费版", "price": "免费", "period": null, "features": ["所有转换工具", "无文件大小限制", "无需注册", "1小时后自动删除文件"], "recommended": true}
      ]
    },
    "features": [
      "PDF与Office格式互转",
      "图像压缩、裁剪、格式转换",
      "视频格式转换与压缩",
      "二维码生成与解析",
      "OCR文字识别",
      "文件合并与拆分",
      "50+在线工具集合"
    ],
    "pros": [
      "完全免费，无广告无水印",
      "工具种类丰富，一站式处理",
      "无需注册，即用即走",
      "1小时自动删除文件，隐私友好"
    ],
    "cons": [
      "无AI功能",
      "界面英文，中文用户不便",
      "大文件处理速度一般",
      "无批量API接口"
    ]
  }
};

data.tools.forEach(tool => {
  if (updates[tool.id]) {
    Object.assign(tool, updates[tool.id]);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1 completed: ' + Object.keys(updates).join(', '));
