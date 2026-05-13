// 包装脚本：运行 update-reviews.js 并处理结果
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 开始执行评测更新...');

try {
  // 执行 update-reviews.js
  const output = execSync('node update-reviews.js', {
    cwd: __dirname,
    encoding: 'utf8',
    timeout: 120000, // 2分钟超时
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  console.log(output);
  
  // 检查 index.html 是否被修改
  const htmlPath = path.join(__dirname, 'index.html');
  const stats = fs.statSync(htmlPath);
  console.log(`✅ index.html 已更新，文件大小: ${stats.size} 字节`);
  
  // Git 操作
  console.log('📤 执行 git 操作...');
  execSync('git add index.html', { cwd: __dirname, stdio: 'inherit' });
  execSync('git commit -m "Auto: update reviews data"', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('🚀 推送到 GitHub...');
  try {
    execSync('git push', { cwd: __dirname, stdio: 'inherit', timeout: 30000 });
    console.log('✅ 成功推送到 GitHub');
  } catch (pushError) {
    console.log('⚠️ 首次 push 失败，重试一次...');
    setTimeout(() => {
      try {
        execSync('git push', { cwd: __dirname, stdio: 'inherit', timeout: 30000 });
        console.log('✅ 重试成功');
      } catch (retryError) {
        console.error('❌ 重试失败:', retryError.message);
      }
    }, 3000);
  }
  
} catch (error) {
  console.error('❌ 执行失败:', error.message);
  if (error.stdout) console.error('stdout:', error.stdout.toString());
  if (error.stderr) console.error('stderr:', error.stderr.toString());
  process.exit(1);
}
