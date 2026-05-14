const h = require('fs').readFileSync('index.html', 'utf8');
// Check what the actual strings look like
console.log('--- fetch line ---');
const fetchIdx = h.indexOf('fetch(');
if(fetchIdx > -1) console.log(h.substring(fetchIdx, fetchIdx+60));

console.log('\n--- load function start ---');
const loadIdx = h.indexOf('async function load()');
if(loadIdx > -1) console.log(h.substring(loadIdx, loadIdx+120));

console.log('\n--- applyF start ---');
const applyIdx = h.indexOf('function applyF()');
if(applyIdx > -1) console.log(h.substring(applyIdx, applyIdx+200));
