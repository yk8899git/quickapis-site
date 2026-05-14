const fs = require('fs');
const d = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.qclaw\\workspace-agent-a39b23d9\\quickapis-site-temp\\tools.json', 'utf8'));
const ids = ['notionai','feishu','dingtalk','tingwu','otter','lookscanned','tinywow','ilovepdf','deepl','immersive','chatpdf','humata','monica','merlin','harpa','raycast','mem_ai','reflect','taskade','reclaim','motion','tika','final_round','kickresume','teal','perplexity','consensus','metaso','tiangong','phind','elicit','scispace','semantic_scholar','connected_papers','research_rabbit','scholarcy','webpilot','perplexity_mobile'];
const tools = d.tools.filter(t => ids.includes(t.id));
tools.forEach(t => {
  const hasSpecs = !!t.specs;
  const hasPricing = !!t.pricing;
  const hasFeatures = !!t.features;
  const hasPros = !!t.pros;
  const hasCons = !!t.cons;
  console.log(t.id + ' | specs:' + hasSpecs + ' pricing:' + hasPricing + ' features:' + hasFeatures + ' pros:' + hasPros + ' cons:' + hasCons);
});
