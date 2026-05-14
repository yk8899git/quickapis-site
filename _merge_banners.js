const fs = require('fs');

// Get local version with bannerImage (from our commit)
const { execSync } = require('child_process');
const localJson = execSync('git show 5ae6a32:tools.json', { encoding: 'utf8' });
const localData = JSON.parse(localJson);

// Current remote version
const currentData = JSON.parse(fs.readFileSync('tools.json', 'utf8'));

// Build id -> bannerImage map from local
const bannerMap = {};
for (const tool of localData.tools) {
  if (tool.bannerImage) {
    bannerMap[tool.id] = tool.bannerImage;
  }
}
console.log(`Local bannerImage map: ${Object.keys(bannerMap).length} entries`);

// Apply to current tools
let applied = 0;
for (const tool of currentData.tools) {
  if (bannerMap[tool.id] && !tool.bannerImage) {
    tool.bannerImage = bannerMap[tool.id];
    applied++;
  } else if (bannerMap[tool.id] && tool.bannerImage) {
    // Keep local (better quality) over remote
    if (tool.bannerImage === '' || tool.bannerImage.includes('favicon')) {
      tool.bannerImage = bannerMap[tool.id];
      applied++;
    }
  }
}

fs.writeFileSync('tools.json', JSON.stringify(currentData, null, 2), 'utf8');
console.log(`Applied ${applied} bannerImages. Total tools: ${currentData.tools.length}`);

// Validate
try {
  JSON.parse(fs.readFileSync('tools.json', 'utf8'));
  console.log('JSON valid!');
} catch(e) {
  console.log('INVALID:', e.message);
}
