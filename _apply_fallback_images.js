// Step 3: Use alternative URLs for the remaining 47 missing tools
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('tools.json', 'utf8'));

// For these tools, use known product image CDN URLs or fallbacks
const fallbackImages = {
  'chuanshou': 'https://www.chuanshou.com/favicon.ico',
  'liblib': 'https://liblib.art/favicon.ico',
  'imagen3': 'https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png',
  'amazonq': 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico',
  'veo': 'https://www.gstatic.com/images/branding/product/2x/googleg_64dp.png',
  'haikei': 'https://haiper.ai/favicon.ico',
  'vidu': 'https://www.vidu.studio/favicon.ico',
  'aiva': 'https://www.aiva.ai/favicon.ico',
  'resembleai': 'https://www.resemble.ai/favicon.ico',
  'playht': 'https://play.ht/favicon.ico',
  'wellsaid': 'https://wellsaidlabs.com/favicon.ico',
  'phind': 'https://www.phind.com/favicon.ico',
  'elicit': 'https://elicit.com/favicon.ico',
  'scispace': 'https://typeset.io/favicon.ico',
  'tome': 'https://tome.app/favicon.ico',
  'hi3d': 'https://hi3d.ai/favicon.ico',
  'lrstudio': 'https://lrstudio.ai/favicon.ico',
  'quillbot': 'https://quillbot.com/favicon.ico',
  'rytr': 'https://rytr.me/favicon.ico',
  'bingimage': 'https://www.bing.com/favicon.ico',
  'playground': 'https://playground.com/favicon.ico',
  'khanacademyai': 'https://www.khanacademy.org/favicon.ico',
  'opencat': 'https://opencat.app/favicon.ico',
  'midjourney_chinese': 'https://midjourney.cn/favicon.ico',
  'cogview': 'https://open.bigmodel.cn/favicon.ico',
  'lookscanned': 'https://lookscanned.io/favicon.ico',
  'tinywow': 'https://tinywow.com/favicon.ico',
  'eraser': 'https://www.eraser.io/favicon.ico',
  'uizard': 'https://uizard.io/favicon.ico',
  'immersive': 'https://immersivetranslate.com/favicon.ico',
  'boomy': 'https://boomy.com/favicon.ico',
  'descript_podcast': 'https://descript.com/favicon.ico',
  'point_e': 'https://github.com/favicon.ico',
  'research_rabbit': 'https://www.researchrabbit.ai/favicon.ico',
  'scholarcy': 'https://scholarcy.com/favicon.ico',
  'namelix': 'https://namelix.com/favicon.ico',
  'designs_ai': 'https://designs.ai/favicon.ico',
  'fontjoy': 'https://fontjoy.com/favicon.ico',
  'tika': 'https://tika.apache.org/favicon.ico',
  'poe_mobile': 'https://poe.com/favicon.ico',
  'perplexity_mobile': 'https://www.perplexity.ai/favicon.ico',
  'dianxiaomi': 'https://www.taobao.com/favicon.ico',
  'cmcc-ai-esim': 'https://10086.cn/favicon.ico',
  'xiaodu-speaker': 'https://xiaodu.com/favicon.ico',
  'tmall-genie': 'https://www.tmallgenie.com/favicon.ico',
  'iflytek-learning-machine': 'https://www.iflytek.com/favicon.ico',
  ' elite-robot': 'https://www.eliterobotics.com/favicon.ico',
};

let count = 0;
data.tools.forEach(t => {
  if (!t.bannerImage && fallbackImages[t.id]) {
    t.bannerImage = fallbackImages[t.id];
    count++;
  }
});

const stillMissing = data.tools.filter(t => !t.bannerImage);
fs.writeFileSync('tools.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Added ${count} fallback bannerImage URLs`);
console.log(`Still missing: ${stillMissing.length}`);
if (stillMissing.length > 0) stillMissing.forEach(t => console.log('  ' + t.id));
