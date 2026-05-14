/**
 * QuickAPIs 导航站重构脚本
 * Step 1: 过滤国外不合规工具 + 整理国内合规工具
 * Step 2: 扩充 AI 硬件产品到 80+
 */

const fs = require('fs');

// 读取 tools.json（处理 BOM）
let raw = fs.readFileSync('tools.json', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);
console.log('原始工具数:', data.tools.length);

// ==========  Part 1: 标记需要删除的国外不合规工具 ==========
// 这些工具的 id 或 name 明显是国外的，需要删除
const REMOVE_IDS = [
  // 聊天AI - 国外
  'chatgpt', 'claude', 'gemini', 'opencat', 'poe', 'characterai',
  'chatgpt_mobile', 'poe_mobile',
  // 大模型API - 国外
  'groq', 'fireworks', 'together', 'cerebras', 'titanlabs',
  'replicate', 'huggingface', 'openrouter',
  // 图像生成 - 国外（保留国内可访问的）
  'midjourney', 'stablediffusion', 'dalle', 'ideogram', 'leonardo',
  'runway', 'pika', 'lumaai', 'gen2', 'sora', 'haiper', 'kling',
  // 视频制作 - 国外
  'heygen', 'd_id', 'synthesia', 'elai', 'colossyan',
  // 音频工具 - 国外
  'elevenlabs', 'suno', 'udio', 'stableaudio', 'mubert', 'aiva',
  'soundraw', 'boomy',
  // 写作助手 - 国外
  'quillbot', 'jasper', 'copyai', 'writesonic', 'rytr', 'anyword',
  'wordtune', 'inkeditor', 'grammarly',
  // 代码助手 - 国外
  'copilot', 'cursor', 'codeium', 'windsurf', 'supermaven', 'tabnine',
  'codepilot', 'replit', 'v0', 'bolt',
  // 3D建模 - 国外
  'meshy', 'tripo', 'rodin', 'lumai', 'spline',
  // 设计工具 - 国外
  'gamma', 'beautifulai', 'tome', 'slidesai', 'designsai',
  // 搜索研究 - 国外
  'perplexity', 'consensus', 'elicit', 'scispace',
  // 办公效率 - 国外
  'notionai', 'memai', 'reworkd', 'timely',
  // 开发者工具 - 国外
  'v0', 'bolt',
  // AI医疗 - 不确定，先保留国内的
  // AI平台 - 红帽是国外的
  'redhatai',
];

// 国外工业机器人（保留国产）
const REMOVE_HARDWARE_IDS = [
  'ring-doorbell',      // Ring（国外）
  'irobot-create',      // iRobot（国外）
  'clearpath-robot',    // Clearpath（国外）
  'kawasaki-robot',    // 川崎（国外）
  'yaskawa-robot',     // 安川（国外）
  'epson-robot',       // 爱普生（国外）
  'staubli-robot',     // 史陶比尔（国外）
  'universal-robots',  // UR（丹麦，国外）
  'softbank-pepper',    // 软银（国外）
  'cloudminds-robot',  // CloudMinds（国外）
  'dataa-robot',       // 达闼（国外注册）
];

const allRemoveIds = new Set([...REMOVE_IDS, ...REMOVE_HARDWARE_IDS]);

// 过滤
const kept = data.tools.filter(t => !allRemoveIds.has(t.id));
const removed = data.tools.filter(t => allRemoveIds.has(t.id));

console.log('\n=== 将要删除的工具 (' + removed.length + ') ===');
removed.forEach(t => console.log('  [删除]', t.id, '|', t.nameCn || t.name, '|', t.category));

console.log('\n=== 保留的工具 (' + kept.length + ') ===');
const keptByCat = {};
kept.forEach(t => {
  if (!keptByCat[t.category]) keptByCat[t.category] = 0;
  keptByCat[t.category]++;
});
Object.keys(keptByCat).sort().forEach(k => {
  console.log('  ' + k + ': ' + keptByCat[k] + '个');
});

// 写出过滤后的文件（供下一步使用）
data.tools = kept;
fs.writeFileSync('tools-filtered.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\n已写入 tools-filtered.json (' + kept.length + ' 个工具)');
