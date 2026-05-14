const fs = require('fs');
let content = fs.readFileSync('tools.json', 'utf8');

// Fix 1: ],]  ->  ],
content = content.replace(/,\]\r\n/g, ']\r\n');

// Fix 2: Also handle the case where we need comma before bannerImage
// Pattern: ]\r\n      "bannerImage"  ->  ],\r\n      "bannerImage"
content = content.replace(/(\]\r\n)(\s+\"bannerImage\")/g, '],$1$2');

fs.writeFileSync('tools.json', content, 'utf8');
console.log('Fixed');

try {
  JSON.parse(content);
  console.log('JSON is valid!');
} catch(e) {
  console.log('JSON still invalid:', e.message);
}
