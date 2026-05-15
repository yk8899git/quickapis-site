const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
// Check onerror attribute
const lines = h.split('\n');
lines.forEach((line, i) => {
  if (line.includes('onerror')) {
    console.log('Line ' + (i+1) + ': ' + line.trim().substring(0, 200));
  }
});
// Check if renderSlides call exists
console.log('\nrenderSlides calls:', (h.match(/renderSlides\(\)/g) || []).length);
// Check for syntax errors
try {
  new Function(h.match(/<script>([\s\S]*?)<\/script>/)[1]);
  console.log('JS syntax: OK');
} catch(e) {
  console.log('JS syntax ERROR:', e.message);
}
