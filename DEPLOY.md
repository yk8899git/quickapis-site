# AI 工具导航站 - GitHub Pages 部署指南

本指南将帮助你将 AI 工具导航站部署到 GitHub Pages，并配置自定义域名 `quickapis.top`。

---

## 目录

1. [创建 GitHub 仓库](#第一步创建-github-仓库)
2. [上传文件到仓库](#第二步上传文件到仓库)
3. [启用 GitHub Pages](#第三步启用-github-pages)
4. [配置自定义域名](#第四步配置自定义域名)
5. [本地预览](#第五步本地预览)
6. [DNS 配置说明](#dns-配置说明)
7. [故障排查](#故障排查)

---

## 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com) → 点击右上角 **+** → **New repository**
2. 填写仓库信息：
   - **Repository name**: `quickapis-site`（或 `ai-tools-nav`）
   - **Description**: AI 工具导航站 - 收录优质 AI 工具的聚合站点
   - **Visibility**: **Public**（GitHub Pages 需要 Public 仓库）
   - ❌ **不要勾选** "Add a README file"（我们会手动创建）
3. 点击 **Create repository**

---

## 第二步：上传文件到仓库

打开终端，在本地 `quickapis-site` 目录执行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "Initial commit: AI工具导航站"

# 重命名分支为 main
git branch -M main

# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/quickapis-site.git

# 推送到 GitHub
git push -u origin main
```

> **提示**：首次推送可能需要登录 GitHub，推荐使用 GitHub CLI 或配置 SSH key。

---

## 第三步：启用 GitHub Pages

1. 进入仓库页面 → 点击 **Settings** 标签
2. 左侧菜单找到 **Pages**
3. 在 **Build and deployment** 部分：
   - **Source**: 选择 **Deploy from a branch**
   - **Branch**: 选择 `main` → 目录选择 `/ (root)`
4. 点击 **Save**
5. 等待约 1-2 分钟，页面会显示你的部署地址：`https://YOUR_USERNAME.github.io/quickapis-site/`

---

## 第四步：配置自定义域名

### 前提条件
- `quickapis.top` 的 DNS 服务商需切换到 Cloudflare
- 等待 **3 天锁定期** 过后才能修改 NS 记录

### 配置步骤

1. 在仓库 **Settings → Pages** 页面
2. **Custom domain** 输入框填入：`quickapis.top`
3. 勾选 **Enforce HTTPS**（可选，等待证书自动签发后生效）
4. 点击 **Save**

### 重要提示
- 证书签发需要 **24-48 小时**，在此期间 HTTPS 可能不可用
- 确保你的域名服务商已正确配置 CNAME 记录指向 `YOUR_USERNAME.github.io`

---

## 第五步：本地预览

### 方法一：直接打开
直接双击 `index.html` 文件，用浏览器打开即可预览。

### 方法二：使用 Live Server（推荐）
1. 如果你使用 VS Code，安装 **Live Server** 插件
2. 右键 `index.html` → **Open with Live Server**
3. 访问 `http://localhost:5500` 即可实时预览

---

## DNS 配置说明

### 为什么要等 DNS 生效？

当你修改域名的 NS（Name Server）记录后，全球 DNS 服务器需要时间同步这个变更。这个过程称为 **DNS 传播**，通常需要：

- **即时生效**：部分 DNS 服务器（缓存已过期）
- **几分钟到几小时**：大多数 DNS 服务器
- **最长 48-72 小时**：极端情况下的完全同步

由于你提到 `quickapis.top` 的 NS 在腾讯云/Cloudflare 之间切换，需要等待 **3 天锁定期** 过后才能修改，这是域名注册商的安全机制。

### 如何检查 DNS 是否生效？

#### 方法一：ping 命令
```bash
ping quickapis.top
```
如果返回 IP 地址（如 `185.199.108.153`），说明 DNS 已生效。

#### 方法二：在线 DNS 查询工具
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://www.cloudflare.com/che-sheets/dns-lookup/

输入 `quickapis.top`，检查全球各地的 DNS 解析结果是否一致指向 GitHub Pages IP。

#### 方法三：nslookup 命令
```bash
nslookup quickapis.top
```
查看返回的 A 记录或 CNAME 记录是否正确。

---

## 故障排查

### 常见问题及解决方案

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| **404 错误** | GitHub Pages source 未正确配置 | 进入 Settings → Pages，确认 Source 设为 "Deploy from a branch"，Branch 为 "main"，目录为 "/ (root)" |
| **无法 HTTPS** | 证书尚未签发 | 等待 24-48 小时，证书由 GitHub 自动签发 |
| **自定义域名不生效** | CNAME 文件或 DNS 记录问题 | 确认域名 DNS 已添加 CNAME 记录，指向 `YOUR_USERNAME.github.io` |
| **页面样式丢失** | 静态资源路径问题 | 检查 CSS/JS 路径是否使用相对路径 |
| **提交后未更新** | 缓存问题 | 强制刷新浏览器（Ctrl+Shift+R），或等待几分钟 |

### 检查清单

- [ ] 仓库是 Public（不是 Private）
- [ ] GitHub Pages 已启用
- [ ] Branch 选择正确（main）
- [ ] Custom domain 已填写
- [ ] DNS 记录已正确配置
- [ ] 等待足够时间让证书生效

---

## 快速命令参考

```bash
# 推送更新
git add .
git commit -m "Update: 你的更新说明"
git push

# 查看 Git 状态
git status

# 回退到上一个版本（谨慎使用）
git reset --hard HEAD~1
```

---

**祝你部署顺利！** 🚀

如有问题，欢迎提交 Issue 或联系维护者。
