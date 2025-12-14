# 微信小程序点餐系统 (Ordering System)

本项目为《校内综合实训》课程作业，基于微信小程序 + Node.js + MySQL 开发。

## 👥 团队分工

| 成员姓名 | 学号 | 角色 | 负责模块 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **你的名字** | 你的学号 | 组长/后端 | 数据库设计、Node.js 接口开发、Git 仓库管理 | 统筹项目进度 |
| **队友名字** | 队友学号 | 前端开发 | 小程序界面编写、接口联调、交互逻辑 | |

## 🛠️ 技术栈
- **前端**: 微信小程序 (WXML, WXSS, JS)
- **后端**: Node.js (Express)
- **数据库**: MySQL 8.0
- **工具**: VS Code, 微信开发者工具, Navicat, Git

## 🚀 快速开始

### 1. 后端启动
1. 进入 `backend` 目录: `cd backend`
2. 安装依赖: `npm install`
3. 配置数据库: 复制 `db.config.example.js` 为 `db.config.js`，填入 MySQL 密码。
4. 导入数据: 在 MySQL 中运行 `db.sql` 脚本。
5. 启动服务: `npm run dev`

### 2. 前端启动
1. 打开微信开发者工具，导入 `miniprogram` 目录。
2. 勾选 "不校验合法域名"。
3. 编译运行。

---

## 📝 关键改进记录 (Key Improvements)
> *记录开发过程中对系统的优化点，用于报告书素材*

- **[2025-12-15] 数据库配置抽离**: 将数据库连接信息抽离为 `db.config.js` 并加入 `.gitignore`，解决了多人协作时数据库密码冲突的问题。
- **[待完成] 登录态管理**: 计划使用 JWT (JSON Web Token) 实现用户无感登录。
- **[待完成] 购物车本地缓存**: 计划利用 `wx.setStorage` 优化购物车体验，防止退出页面后数据丢失。

---

## 🔧 问题排查过程 (Troubleshooting)
> *记录遇到的 Bug 及解决方案，用于实训报告“问题解决”章节*

### 问题 1: Git 推送 403 权限错误
- **现象**: `git push` 时提示 `Permission to ... denied to user ...`。
- **原因**: 本地 Windows 凭据管理器中缓存了旧的 GitHub 账号信息。
- **解决**: 删除 Windows 凭据中的 git 记录，并重新生成 SSH Key 配置到 GitHub，切换为 SSH 协议推送。

### 问题 2: 数据库连接失败 `ER_ACCESS_DENIED_ERROR`
- **现象**: 后端启动报错，提示密码错误。
- **解决**: 检查 `db.config.js`，发现默认密码为空，修改为本地真实 MySQL 密码后解决。

### 问题 3: 小程序请求失败
- **现象**: 前端控制台报错 `request:fail url not in domain list`。
- **解决**: 在微信开发者工具中勾选“不校验合法域名”，因为本地开发环境使用的是 `localhost`。

---

## 📅 实训进度与提交日志
请查看 [GitHub Commit History](https://github.com/K1taharaSetsuna/ordering-system/commits/main) 获取详细的每日代码提交记录。
