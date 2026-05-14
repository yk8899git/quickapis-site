const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

// Find the card template area
const startIdx = lines.findIndex(l => l.includes("toolsGrid.innerHTML = filtered.map"));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes("`).join('');"));

// Rebuild the entire card template section
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

// Replace lines from startIdx to endIdx
const before = lines.slice(0, startIdx);
const after = lines.slice(endIdx + 1);
const newLines = [...before, newTemplate, ...after];

html = newLines.join('\n');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Card template rebuilt successfully');
