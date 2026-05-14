const fs = require('fs');

let content = fs.readFileSync('tools.json', 'utf8');
const lines = content.split('\n');
let result = [];
let i = 0;
let conflicts = 0;

while (i < lines.length) {
  const line = lines[i];
  if (line.includes('<<<<<<<')) {
    conflicts++;
    i++; // skip <<<<<<<
    
    let upLines = [];
    while (i < lines.length && !lines[i].includes('=======')) {
      upLines.push(lines[i]);
      i++;
    }
    i++; // skip =======
    
    let localLines = [];
    while (i < lines.length && !lines[i].includes('>>>>>>>')) {
      localLines.push(lines[i]);
      i++;
    }
    i++; // skip >>>>>>>
    
    // Extract property names from both sides
    const upText = upLines.join('\n').trim();
    const localText = localLines.join('\n').trim();
    const upProp = upText.match(/^"(\w+)"/)?.[1] || '';
    const localProp = localText.match(/^"(\w+)"/)?.[1] || '';
    
    if (upProp === localProp && upProp) {
      // Same property name: keep local (stashed) version - it has better data
      result.push(...localLines);
    } else {
      // Different properties: keep both, add comma if needed
      const upLast = upLines[upLines.length - 1].trim();
      const localFirst = localLines[localLines[0].trimStart() ? 0 : 1 >= localLines.length ? localLines.length-1 : 0];
      
      // Simple check: does upstream end with ] or } ?
      const endsWithBracket = (upLast === ']' || upLast === '}');
      
      result.push(...upLines);
      if (endsWithBracket && localText.startsWith('"')) {
        result.push(',');
      }
      result.push(...localLines);
    }
  } else {
    result.push(line);
    i++;
  }
}

fs.writeFileSync('tools.json', result.join('\n'), 'utf8');
console.log(`Resolved ${conflicts} conflicts`);

// Validate
try {
  JSON.parse(fs.readFileSync('tools.json', 'utf8'));
  console.log('JSON is valid!');
} catch(e) {
  console.log('JSON invalid:', e.message);
  const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || '0');
  const c = fs.readFileSync('tools.json', 'utf8');
  console.log('Context:', JSON.stringify(c.substring(Math.max(0,pos-60), pos+60)));
}
