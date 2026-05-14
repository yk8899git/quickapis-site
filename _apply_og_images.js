// Step 1: Write OG images to tools.json as bannerImage
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('tools.json', 'utf8'));
const images = JSON.parse(fs.readFileSync('tool-images.json', 'utf8'));

// Build lookup
const imgMap = {};
images.forEach(r => { if (r.ogImage) imgMap[r.id] = r.ogImage; });

let updated = 0;
data.tools.forEach(t => {
  if (imgMap[t.id]) {
    t.bannerImage = imgMap[t.id];
    updated++;
  }
});

fs.writeFileSync('tools.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${updated} tools with bannerImage from OG images`);
