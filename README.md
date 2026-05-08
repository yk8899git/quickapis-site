# ⚡ QuickAPIs - AI工具导航

> 发现全球优质AI工具，收录精选AI应用

[![Deploy to GitHub Pages](https://github.com/your-username/quickapis-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/quickapis-site/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🔍 **收录100+工具** — 覆盖聊天AI、图像生成、代码助手、视频制作、音频工具、办公效率等全品类
- 🏷️ **分类浏览** — 支持按类别筛选，快速定位目标工具
- ⚡ **实时搜索** — 输入关键词即时过滤，无需刷新页面
- 💯 **完全免费** — 无需注册登录，开箱即用

## 🚀 快速开始

### 本地预览

直接双击 `index.html` 在浏览器中打开即可，无需任何构建步骤。

> 如果想用本地服务器（避免浏览器跨域限制，推荐）：
> ```bash
> # Python 3
> python -m http.server 8000
> # 然后访问 http://localhost:8000
> ```

### 部署到 GitHub Pages

1. **Fork 本仓库** 或创建新仓库
2. 进入仓库 **Settings → Pages**
3. Source 选择 `Deploy from a branch`，Branch 选择 `main / (root)`
4. 等待 1-2 分钟，站点自动上线

## 🌐 自定义域名配置

本项目配置域名为 `quickapis.top`。

### 步骤 1：域名 DNS 配置

在你的域名服务商（阿里云/腾讯云/Cloudflare 等）添加以下 DNS 记录：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| CNAME | `www` | `你的用户名.github.io` |
| CNAME | `@` | `你的用户名.github.io` |

> ⚠️ 如果你的用户名仓库（`your-username.github.io`）已用作个人主页，`@` 记录需要用 A 记录：
> ```
> A  @  185.199.108.153
> A  @  185.199.109.153
> A  @  185.199.110.153
> A  @  185.199.111.153
> ```

### 步骤 2：提交 CNAME 文件

本仓库根目录已包含 `CNAME` 文件，内容为：
```
quickapis.top
```

**重要**：每次部署后 GitHub Pages 会重置自定义域名设置。如果使用自定义域名：
- 建议在仓库 Settings → Pages 中勾选 **Enforce HTTPS**（自动申请免费 SSL 证书）
- 确保 CNAME 文件不被删除（已加入 `.gitignore` 的例外规则）

### 验证

部署完成后，访问 `https://quickapis.top` 确认生效。

## 🤝 贡献新工具

欢迎提交新的 AI 工具！

### 方法一：提交 Pull Request

编辑 `tools.json` 文件，在 `tools` 数组中添加新条目：

```json
{
  "id": "your-tool-id",
  "name": "Tool Name",
  "nameCn": "工具中文名",
  "category": "所属分类",
  "description": "工具简介，50字以内",
  "url": "https://example.com",
  "tags": ["标签1", "标签2"],
  "icon": "🔧",
  "featured": false
}
```

### 方法二：提交 Issue

在 GitHub Issues 中使用 [工具提交模板](https://github.com/your-username/quickapis-site/issues/new?template=add-tool.md)，填写工具信息，我们会定期处理。

### 分类参考

| 分类 | 说明 |
|------|------|
| 聊天AI | 对话、问答、写作辅助 |
| 图像生成 | AI绘图、图片生成 |
| 代码助手 | 代码补全、调试、审查 |
| 视频制作 | 视频生成、剪辑 |
| 音频工具 | 语音合成、音乐生成 |
| 办公效率 | 幻灯片、笔记、文档处理 |
| 其他 | 不属于以上分类的工具 |

## 📂 项目结构

```
quickapis-site/
├── index.html      # 主页面
├── tools.json      # 工具数据（从这里加载所有工具信息）
├── CNAME           # 自定义域名配置
├── .nojekyll       # GitHub Pages 配置文件
├── README.md       # 本文件
└── styles.css      # 样式文件（如有）
```

## ⚙️ 技术栈

- **前端**：原生 HTML + CSS + JavaScript（零依赖，即开即用）
- **数据**：JSON 格式，便于维护和自动化更新
- **部署**：GitHub Pages + 自定义域名
- **SSL**：GitHub Pages 免费 Let's Encrypt 证书

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源，你可以自由使用、修改和分发。

---

Made with ⚡ by the community
