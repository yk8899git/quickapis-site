/**
 * 抓取轮播图产品图片，下载到 images/slides/
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'images', 'slides');

// 各产品图片搜索策略：直接用已知的CDN URL
const TASKS = [
  // 宇树Go2 - 已有，跳过
  // 石头Saros Z70 - 从roborock中国站找
  { name: 'roborock-saros-z70', urls: [
    'https://cdn.shopify.com/s/files/1/0664/8836/9324/files/Saros_Z70_hero.jpg',
    'https://cdn.shopify.com/s/files/1/0664/8836/9324/files/prize1.png',
    'https://cdn.shopify.com/s/files/1/0664/8836/9324/files/prize2.png',
  ]},
  // 雷鸟V3
  { name: 'raybird-v3', urls: [
    'https://www.tcl.com/content/dam/tcl-product/v3/main.png',
    'https://www.tcl.com/content/dam/tcl-product/raybird-v3/product.png',
  ]},
  // 小鹏Iron
  { name: 'xiaopeng-iron', urls: [
    'https://xps01.xiaopeng.com/cms/material/pic/2026/03-25/pic_20260325174729_65244.png',
  ]},
  // 千问AI眼镜 - 没有独立官网，用阿里云CDN试
  { name: 'qwen-glasses', urls: [
    'https://img.alicdn.com/imgextra/i3/O1CN01/qwen-glasses.png',
  ]},
  // 大疆 Mini 4 Pro（备用替换）
  { name: 'dji-mini4pro', urls: [
    'https://www.dji.com/cms/uploads/content_image/mini4pro_product.png',
  ]},
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => {
        const size = fs.statSync(dest).size;
        if (size < 5000) {
          fs.unlinkSync(dest);
          reject(new Error('Too small: ' + size));
        } else {
          console.log('OK ' + dest + ' (' + size + ' bytes) from ' + url);
          resolve(size);
        }
      });
      ws.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  
  for (const task of TASKS) {
    let done = false;
    for (const url of task.urls) {
      const ext = url.match(/\.(png|jpg|jpeg|webp)/)?.[1] || 'jpg';
      const dest = path.join(DIR, task.name + '.' + ext);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
        console.log('SKIP ' + dest + ' (exists)');
        done = true;
        break;
      }
      try {
        await download(url, dest);
        done = true;
        break;
      } catch (e) {
        console.log('FAIL ' + task.name + ' from ' + url + ': ' + e.message);
      }
    }
    if (!done) console.log('ALL FAIL for ' + task.name);
  }
  
  // 列出结果
  console.log('\n=== Downloaded files ===');
  fs.readdirSync(DIR).forEach(f => {
    const s = fs.statSync(path.join(DIR, f));
    console.log(f + ': ' + s.size + ' bytes');
  });
}

main().catch(console.error);
