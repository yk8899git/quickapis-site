/**
 * 补充国内缺失分类的工具
 * - 写作助手：1→5
 * - 音频工具：0→4
 * - 搜索研究：2→5
 */
const fs = require('fs');
let raw = fs.readFileSync('tools.json', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);

const supplements = [
  // 写作助手
  { id: 'xiezuocat', name: '秘塔写作猫', nameCn: '秘塔写作猫', category: '写作助手', description: 'AI写作助手，中文纠错、改写润色、素材推荐、模板写作', website: 'https://xiezuocat.com', specs: { 功能: '纠错/改写/润色/续写', 语言: '中文优化', 模板: '200+写作模板' }, pricing: '免费+会员30元/月', features: ['中文纠错', '改写润色', 'AI续写', '模板写作'], pros: ['中文优化好', '免费版够用', '模板丰富'], cons: ['长文质量不稳', '免费版限制多'], bannerImage: '' },
  { id: 'wps-ai-write', name: 'WPS AI写作', nameCn: 'WPS AI写作', category: '写作助手', description: '金山WPS内置AI写作助手，文档续写、润色改写、智能排版', website: 'https://wps.cn', specs: { 集成: 'WPS Office', 功能: '续写/润色/排版/翻译', 平台: 'Win/Mac/移动/Web' }, pricing: 'WPS会员含AI', features: ['文档续写', '润色改写', '智能排版', '多端同步'], pros: ['Office深度集成', '国内用户多', '排版专业'], cons: ['需WPS会员', '独立写作能力弱'], bannerImage: '' },
  { id: 'tongyi-write', name: '通义千问写作', nameCn: '通义千问写作助手', category: '写作助手', description: '阿里通义千问写作功能，公文/商务/创意多场景写作辅助', website: 'https://tongyi.aliyun.com', specs: { AI: '通义大模型', 场景: '公文/商务/创意/学术', 格式: '支持导出Word/PDF' }, pricing: '免费+高级版', features: ['公文写作', '商务文档', '创意写作', '多格式导出'], pros: ['大模型能力强', '场景丰富', '免费使用'], cons: ['需登录阿里账号', '偶有幻觉'], bannerImage: '' },
  { id: 'biji-AI', name: '笔灵AI', nameCn: '笔灵AI写作', category: '写作助手', description: '国内AI写作平台，200+场景模板，论文/公文/营销文案一键生成', website: 'https://ibiling.cn', specs: { 模板: '200+场景', 类型: '论文/公文/营销/新媒体', 输出: '千字级文章' }, pricing: '免费+会员39元/月', features: ['200+场景模板', '论文降重', '公文写作', 'AI续写'], pros: ['模板最多', '论文降重实用', '价格低'], cons: ['原创性一般', '长文逻辑弱'], bannerImage: '' },

  // 音频工具
  { id: 'iflytek-tts', name: '讯飞语音合成', nameCn: '科大讯飞语音合成', category: '音频工具', description: '科大讯飞AI语音合成，多音色多风格，中英日韩多语言支持', website: 'https://xfyun.cn', specs: { 音色: '200+', 语言: '中/英/日/韩等', 风格: '新闻/客服/有声书/方言', 延迟: '<200ms' }, pricing: '免费额度+按量计费', features: ['200+音色', '方言支持', '实时合成', 'SSML标记'], pros: ['中文最强', '音色最多', '延迟低'], cons: ['付费较贵', 'API接入有门槛'], bannerImage: '' },
  { id: 'tencent-tts', name: '腾讯语音合成', nameCn: '腾讯云语音合成', category: '音频工具', description: '腾讯云AI语音合成，多种音色风格，支持长文本合成', website: 'https://cloud.tencent.com', specs: { 音色: '100+', 语言: '中/英/日/韩', 特色: '长文本/实时/离线', 生态: '微信/企微' }, pricing: '免费额度+按量计费', features: ['100+音色', '长文本合成', '实时流式', '微信生态'], pros: ['腾讯生态', '稳定性高', '微信适配'], cons: ['音色不如讯飞', 'API文档一般'], bannerImage: '' },
  { id: 'tianqin-music', name: '天琴音乐大模型', nameCn: '昆仑万维天琴音乐', category: '音频工具', description: '昆仑万维AI音乐生成，文本描述生成歌曲，支持歌词+旋律+编曲', website: 'https://kunlun.com', specs: { 类型: 'AI音乐生成', 输入: '文本描述/歌词', 输出: '完整歌曲', 语言: '中英文' }, pricing: '免费+会员', features: ['文本生歌', '歌词+旋律+编曲', '多风格', '中文优化'], pros: ['国内首创', '中文歌曲好', '全流程生成'], cons: ['新品稳定性待验', '曲风有限'], bannerImage: '' },
  { id: 'suno-cn', name: 'Suno中文版', nameCn: 'Suno AI音乐(国内版)', category: '音频工具', description: 'Suno AI音乐生成国内可用版本，文字生成完整歌曲', website: 'https://suno.com', specs: { 类型: 'AI音乐生成', 输入: '歌词/描述', 输出: '2-4分钟歌曲', 风格: '流行/摇滚/电子/民谣等' }, pricing: '免费10首/月+Pro', features: ['文字生成歌曲', '多种音乐风格', '歌词+旋律', '快速生成'], pros: ['音乐质量高', '创意性强', '使用简单'], cons: ['免费额度少', '版权争议'], bannerImage: '' },

  // 搜索研究
  { id: 'metaso', name: '秘塔AI搜索', nameCn: '秘塔AI搜索', category: '搜索研究', description: '国产AI搜索引擎，无广告、结构化答案、学术搜索模式', website: 'https://metaso.cn', specs: { 模式: '简洁/深入/研究', 学术: '学术搜索模式', 特点: '无广告结构化', 来源: '标注信息来源' }, pricing: '免费+Pro', features: ['结构化回答', '学术搜索', '信息溯源', '无广告'], pros: ['答案结构化', '学术模式强', '无广告'], cons: ['覆盖不如百度', 'Pro版偏贵'], bannerImage: '' },
  { id: 'tiangong', name: '天工AI搜索', nameCn: '天工AI搜索', category: '搜索研究', description: '昆仑万维AI搜索引擎，联网搜索+多模态问答+研究报告', website: 'https://tiangong.cn', specs: { AI: '天工大模型', 模式: '搜索/研究/创作', 多模态: '图文混合搜索' }, pricing: '免费+高级版', features: ['联网实时搜索', '多模态问答', '研究报告生成', 'AI创作'], pros: ['实时搜索', '免费使用', '研究模式实用'], cons: ['答案偶有冗余', '学术深度一般'], bannerImage: '' },
  { id: 'baidu-ai-search', name: '百度AI搜索', nameCn: '百度AI搜索', category: '搜索研究', description: '百度文心大模型驱动的AI搜索，结合百度搜索+AI摘要', website: 'https://baidu.com', specs: { AI: '文心大模型', 数据: '百度搜索索引', 特点: 'AI摘要+来源链接' }, pricing: '免费', features: ['AI智能摘要', '百度搜索数据', '来源标注', '多轮追问'], pros: ['数据量大', '免费', '搜索底座强'], cons: ['广告仍存在', 'AI摘要偶有错'], bannerImage: '' },
];

// 检查是否有已存在的 ID（比如秘塔写作猫可能已存在）
const existingIds = new Set(data.tools.map(t => t.id));
const newItems = supplements.filter(t => !existingIds.has(t.id));
const dupes = supplements.filter(t => existingIds.has(t.id));
if (dupes.length > 0) {
  console.log('跳过已存在ID:', dupes.map(t => t.id).join(', '));
  // 更新已存在的
  dupes.forEach(d => {
    const idx = data.tools.findIndex(t => t.id === d.id);
    if (idx >= 0) {
      data.tools[idx] = { ...data.tools[idx], ...d };
      console.log('  更新:', d.id);
    }
  });
}

data.tools = [...data.tools, ...newItems];

console.log('\n补充后统计:');
const cats = {};
data.tools.forEach(t => { cats[t.category] = (cats[t.category] || 0) + 1; });
Object.keys(cats).sort().forEach(k => console.log('  ' + k + ': ' + cats[k]));
console.log('总计:', data.tools.length);

fs.writeFileSync('tools.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ tools.json 已更新');
