/**
 * QuickAPIs 全量重构 - 主脚本
 * 1. 砍掉所有国外不合规工具
 * 2. 保留国内合规软体工具 + 重映射分类
 * 3. 合并新增 AI 硬件
 * 4. 输出最终 tools.json
 */
const fs = require('fs');

// 读取 tools.json（处理 BOM）
let raw = fs.readFileSync('tools.json', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);
console.log('原始工具数:', data.tools.length);

// ========== 第一步：要删除的国外工具 ID ==========
const FOREIGN_REMOVE_IDS = new Set([
  // 聊天AI - 国外
  'chatgpt', 'claude', 'gemini', 'opencat', 'poe', 'characterai', 'chatgpt_mobile', 'poe_mobile',
  // 大模型API - 国外
  'groq', 'fireworks', 'together', 'cerebras', 'titanlabs', 'replicate', 'huggingface', 'openrouter',
  // 图像生成 - 国外
  'midjourney', 'stablediffusion', 'dalle', 'ideogram', 'leonardo',
  'flux', 'recraft', 'imagen3', 'firefly', 'bingimage', 'krea', 'playground',
  'midjourney_chinese', 'removebg', 'clipdrop', 'palette', 'photoroom',
  // 视频制作 - 国外
  'sora', 'runway', 'pika', 'veo', 'pixverse', 'haiper', 'luma',
  'heygen', 'd_id', 'synthesia', 'elai', 'colossyan', 'descript',
  // 音频工具 - 国外（全删）
  'elevenlabs', 'suno', 'udio', 'stableaudio', 'mubert', 'aiva', 'soundraw', 'boomy',
  'murf', 'resembleai', 'playht', 'wellsaid', 'krisp', 'speechify', 'descript_podcast', 'openai-voice-models',
  // 写作助手 - 国外
  'quillbot', 'jasper', 'copyai', 'writesonic', 'rytr', 'anyword', 'wordtune', 'inkeditor', 'grammarly',
  'sudowrite', 'prowritingaid', 'hemingway', 'novelai', 'jenni',
  // 代码助手 - 国外
  'copilot', 'cursor', 'codeium', 'windsurf', 'supermaven', 'tabnine', 'codepilot', 'replit',
  'cody', 'amazonq', 'zed', 'claudecode', 'openai_codex',
  // 3D建模 - 国外（全删）
  'meshy', 'tripo', 'rodin', 'lumai', 'spline', 'luma3d', 'lrstudio', 'blockadelabs', 'kaedim', 'point_e', 'hi3d',
  // 设计工具 - 国外
  'gamma', 'beautifulai', 'tome', 'slidesai', 'designsai',
  'figma_ai', 'uizard', 'looka', 'fontjoy', 'khroma',
  // 搜索研究 - 国外
  'perplexity', 'consensus', 'elicit', 'scispace',
  'phind', 'semantic_scholar', 'connected_papers', 'research_rabbit', 'scholarcy', 'perplexity_mobile',
  // 办公效率 - 国外
  'notionai', 'memai', 'reworkd', 'timely',
  'otter', 'deepl', 'monica', 'merlin', 'harpa', 'raycast', 'mem_ai', 'reflect',
  'taskade', 'reclaim', 'motion', 'tika', 'final_round', 'kickresume', 'teal',
  'lookscanned', 'tinywow', 'ilovepdf', 'chatpdf', 'humata', 'webpilot',
  // 开发者工具 - 国外
  'langchain', 'flowise', 'gptengineer',
  // AI平台/其他 - 国外
  'redhatai', 'namelix',
  // AI硬件 - 国外
  'ring-doorbell', 'irobot-create', 'clearpath-robot', 'kawasaki-robot', 'yaskawa-robot',
  'epson-robot', 'staubli-robot', 'universal-robots', 'softbank-pepper', 'cloudminds-robot',
  'dataa-robot', 'abb-industrial-arm', 'kuka-robot', 'fanuc-robot', 'siemens-cobots',
]);

// ========== 第二步：分类重映射 ==========
const CATEGORY_REMAP = {
  '聊天AI': '对话大模型',
  '大模型API': '大模型API',
  '图像生成': '图像生成',
  '视频制作': '视频制作',
  '音频工具': '音频工具',
  '办公效率': '办公效率',
  '写作助手': '写作助手',
  '搜索研究': '搜索研究',
  '代码助手': '开发者工具',
  '开发者工具': '开发者工具',
  '设计工具': '设计工具',
  '3D建模': null,        // 删掉（全国外）
  '教育学习': '教育学习',
  'AI医疗': null,        // 删掉
  'AI物联网硬件': null,   // 将被新硬件替代
  'AI平台': null,         // 删掉
  '其他': null,            // 删掉
};

// 过滤 + 重映射
const keptTools = data.tools
  .filter(t => !FOREIGN_REMOVE_IDS.has(t.id))
  .filter(t => CATEGORY_REMAP[t.category] !== null)
  .map(t => {
    const newCat = CATEGORY_REMAP[t.category];
    if (newCat) t.category = newCat;
    return t;
  });

console.log('\n保留国内软体工具:', keptTools.length, '个');
const softCats = {};
keptTools.forEach(t => { softCats[t.category] = (softCats[t.category] || 0) + 1; });
Object.keys(softCats).sort().forEach(k => console.log('  ' + k + ': ' + softCats[k]));

// ========== 第三步：加载新增 AI 硬件 ==========
const newHardware = require('./_hardware_data.js');
console.log('\n新增 AI 硬件:', newHardware.length, '个');
const hwCats = {};
newHardware.forEach(t => { hwCats[t.category] = (hwCats[t.category] || 0) + 1; });
Object.keys(hwCats).sort().forEach(k => console.log('  ' + k + ': ' + hwCats[k]));

// ========== 第四步：合并 ==========
// 检查 ID 冲突
const allIds = new Set();
let conflictCount = 0;
[...keptTools, ...newHardware].forEach(t => {
  if (allIds.has(t.id)) {
    console.log('⚠️ ID冲突:', t.id);
    conflictCount++;
  }
  allIds.add(t.id);
});
if (conflictCount === 0) console.log('\n✅ 无ID冲突');

const finalTools = [...keptTools, ...newHardware];
console.log('\n========== 最终统计 ==========');
console.log('总工具数:', finalTools.length);

const finalCats = {};
finalTools.forEach(t => { finalCats[t.category] = (finalCats[t.category] || 0) + 1; });

// 按软体/硬件分组展示
const softwareCats = ['对话大模型', '大模型API', '图像生成', '视频制作', '音频工具', '办公效率', '写作助手', '搜索研究', '开发者工具', '设计工具', '教育学习'];
const hardwareCats = ['智能家居', '人形机器人', '扫地机器人', 'AI眼镜', '智能音箱', 'AI学习机', '无人机', '翻译录音', '智能摄像', '服务机器人', '工业机器人', 'AI健康穿戴'];

console.log('\n🤖 AI软体工具集:');
softwareCats.forEach(k => {
  if (finalCats[k]) console.log('  ' + k + ': ' + finalCats[k]);
});
console.log('  小计:', softwareCats.reduce((s, k) => s + (finalCats[k] || 0), 0));

console.log('\n🔌 AI硬件万物物联:');
hardwareCats.forEach(k => {
  if (finalCats[k]) console.log('  ' + k + ': ' + finalCats[k]);
});
console.log('  小计:', hardwareCats.reduce((s, k) => s + (finalCats[k] || 0), 0));

// ========== 第五步：更新 data.categories ==========
data.categories = {
  software: softwareCats.filter(k => finalCats[k]),
  hardware: hardwareCats.filter(k => finalCats[k])
};

// ========== 第六步：写入 ==========
data.tools = finalTools;
const output = JSON.stringify(data, null, 2);
fs.writeFileSync('tools.json', output, 'utf8');
console.log('\n✅ 已写入 tools.json (' + finalTools.length + ' 个工具)');

// 也备份一下
fs.writeFileSync('tools-backup-pre-rebuild.json', raw, 'utf8');
console.log('✅ 已备份 tools-backup-pre-rebuild.json');
