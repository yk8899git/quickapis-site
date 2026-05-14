const h = require('fs').readFileSync('index.html', 'utf8');
const checks = [
  ['toolsGridWrap', h.includes('toolsGridWrap')],
  ['slide-bg (CSS gradient)', h.includes('slide-bg')],
  ['nav flex-wrap', h.includes('flex-wrap')],
  ['error handling', h.includes('Load failed')],
  ['showToolsGrid fn', h.includes('showToolsGrid')],
  ['no unsplash', !h.includes('unsplash')],
  ['nav column layout', h.includes('flex-direction:column')],
  ['fetch with v=', h.includes("fetch('./tools.json?v=")],
];
checks.forEach(([k,v]) => console.log(v ? '✅' : '❌', k));
console.log('\nsize:', h.length, 'bytes');
