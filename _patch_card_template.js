const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the card template - add cover image + body wrapper
const oldTemplate = `      toolsGrid.innerHTML = filtered.map((tool, index) => \`
        <div class="tool-card card-enter" style="animation-delay: \${index * 40}ms;cursor:pointer" data-id="\${tool.id}" onclick="location.href='tool-detail.html?id=\${tool.id}'">
          <div class="tool-card-top">
            <div class="tool-icon"><img class="tool-favicon" src="icons/\${tool.id}.png" alt="\${tool.name}" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=font-size:28px>\${tool.icon || '◈'}</span>'"></div>
            <span class="tool-tag tool-tag-\${tool.category}">\${tool.categoryLabel}</span>
            \${tool.subCategory ? \`<span class="tool-tag sub-tag-\${tool.subCategory === '消费级' ? 'consumer' : 'industrial'}">\${tool.subCategory}</span>\` : ''}
          </div>
          <div class="tool-info">
            <h3 class="tool-name">\${tool.name}</h3>
            <p class="tool-desc">\${tool.description}</p>
            <div class="tool-domain">
              <span class="tool-domain-dot"></span>
              \${tool.domain}
            </div>
          </div>
          <div class="tool-card-extra">
            <p class="extra-label">标签</p>
            <p>\${tool.tags.join(' · ')}</p>
          </div>
          \${tool.reviews && tool.reviews.length > 0 ? \`<div class="tool-reviews"><p class="extra-label">📡 最新评测</p>\` + tool.reviews.slice(0,3).map(r => \`<div class="review-item"><a href="\${r.url}" target="_blank" class="review-link"><span class="review-title">\${r.title}</span><span class="review-meta">\${r.source} · \${r.time}</span></a></div>\`).join('') + '</div>' : ''}
          <div class="tool-footer">
            <div class="tool-rating">
              <span class="tool-rating-icon">★</span>
              <span>\${tool.rating}</span>
              <span style="margin-left: 4px; opacity: 0.6;">(\${Math.floor(Math.random() * 500 + 50)} 条评价)</span>
            </div>
            <a href="\${tool.url}" target="_blank" rel="noopener" class="tool-visit-btn" onclick="event.stopPropagation()">
              访问 <span>→</span>
            </a>
          </div>
        </div>
      \`).join('');`;

const newTemplate = `      toolsGrid.innerHTML = filtered.map((tool, index) => \`
        <div class="tool-card card-enter" style="animation-delay: \${index * 40}ms;cursor:pointer" data-id="\${tool.id}" onclick="location.href='tool-detail.html?id=\${tool.id}'">
          <div class="tool-card-cover">
            <img src="\${tool.bannerImage || ''}" alt="\${tool.name}" onerror="this.style.display='none'">
            <div class="tool-card-cover-gradient"></div>
          </div>
          <div class="tool-card-body">
            <div class="tool-card-top">
              <div class="tool-icon"><img class="tool-favicon" src="icons/\${tool.id}.png" alt="\${tool.name}" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=font-size:28px>\${tool.icon || '◈'}</span>'"></div>
              <span class="tool-tag tool-tag-\${tool.category}">\${tool.categoryLabel}</span>
              \${tool.subCategory ? \`<span class="tool-tag sub-tag-\${tool.subCategory === '消费级' ? 'consumer' : 'industrial'}">\${tool.subCategory}</span>\` : ''}
            </div>
            <div class="tool-info">
              <h3 class="tool-name">\${tool.name}</h3>
              <p class="tool-desc">\${tool.description}</p>
              <div class="tool-domain">
                <span class="tool-domain-dot"></span>
                \${tool.domain}
              </div>
            </div>
            <div class="tool-card-extra">
              <p class="extra-label">标签</p>
              <p>\${tool.tags.join(' · ')}</p>
            </div>
            \${tool.reviews && tool.reviews.length > 0 ? \`<div class="tool-reviews"><p class="extra-label">📡 最新评测</p>\` + tool.reviews.slice(0,3).map(r => \`<div class="review-item"><a href="\${r.url}" target="_blank" class="review-link"><span class="review-title">\${r.title}</span><span class="review-meta">\${r.source} · \${r.time}</span></a></div>\`).join('') + '</div>' : ''}
            <div class="tool-footer">
              <div class="tool-rating">
                <span class="tool-rating-icon">★</span>
                <span>\${tool.rating}</span>
                <span style="margin-left: 4px; opacity: 0.6;">(\${Math.floor(Math.random() * 500 + 50)} 条评价)</span>
              </div>
              <a href="\${tool.url}" target="_blank" rel="noopener" class="tool-visit-btn" onclick="event.stopPropagation()">
                访问 <span>→</span>
              </a>
            </div>
          </div>
        </div>
      \`).join('');`;

if (html.includes(oldTemplate)) {
  html = html.replace(oldTemplate, newTemplate);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('SUCCESS: Card template updated with cover image');
} else {
  console.log('ERROR: Old template not found. Trying line-by-line approach...');
  // Try to find just the key lines
  const lines = html.split('\n');
  const startIdx = lines.findIndex(l => l.includes('<div class="tool-card card-enter'));
  const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('`).join('));
  console.log(`Found card template at lines ${startIdx+1} to ${endIdx+1}`);
  
  // Replace key lines
  if (startIdx > 0) {
    // Insert cover image div after card div opening
    const insertAfter = startIdx;
    const coverDiv = `          <div class="tool-card-cover">\r\n            <img src="\${tool.bannerImage || ''}" alt="\${tool.name}" onerror="this.style.display='none'">\r\n            <div class="tool-card-cover-gradient"></div>\r\n          </div>`;
    
    // Wrap content in tool-card-body
    // Find the line with tool-card-top and add body div before it
    const bodyStartLine = lines.findIndex((l, i) => i > startIdx && l.includes('tool-card-top'));
    
    lines[bodyStartLine] = '          <div class="tool-card-body">\r\n' + lines[bodyStartLine];
    
    // Find closing </div> of the card (the one right before `).join)
    const cardEndLine = lines.findIndex((l, i) => i > bodyStartLine && l.trim() === '</div>' && i < endIdx);
    // Find the last </div> before the template literal end
    let lastDivIdx = -1;
    for (let i = endIdx - 1; i > startIdx; i--) {
      if (lines[i].trim() === '</div>') {
        lastDivIdx = i;
        break;
      }
    }
    if (lastDivIdx > 0) {
      lines[lastDivIdx] = lines[lastDivIdx] + '\r\n          </div>';
    }
    
    // Insert cover after card opening
    lines.splice(insertAfter + 1, 0, coverDiv);
    
    html = lines.join('\n');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('SUCCESS: Card template patched with cover image (line-by-line)');
  }
}
