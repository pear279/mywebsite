# pear279 个人展示网站

这是一个基于 Next.js 构建的个人展示网站，用于集中展示 **pear279** 的个人资料、简历信息与收藏链接，整体采用深色科技风视觉。

## 网站内容概览

网站当前包含 4 个核心页面：

- **首页 (`/`)**
  - 简短欢迎介绍
  - 快速跳转到个人资料、简历、收藏链接

- **个人资料页 (`/profile`)**
  - 展示姓名（pear279）、所在城市、联系方式、GitHub 链接
  - 展示个人简介与能力方向

- **简历页 (`/resume`)**
  - 网页版简历摘要（核心信息、教育经历、项目与实习节选）
  - 提供 PDF 简历下载入口（`/resume.pdf`）

- **收藏链接页 (`/bookmarks`)**
  - 按分类展示常用学习与工具链接
  - 支持新窗口打开外部链接

## 目录结构

```text
app/
  page.tsx                 # 首页
  layout.tsx               # 全局布局与导航注入
  profile/page.tsx         # 个人资料页
  resume/page.tsx          # 简历页
  bookmarks/page.tsx       # 收藏链接页
  globals.css              # 全局样式（深色科技风）
components/
  SiteNav.tsx              # 顶部导航组件
data/
  profile.ts               # pear279 个人资料数据
  bookmarks.ts             # 收藏链接分类数据
```

## 本地运行

```bash
npm install
npm run dev
```

默认访问地址：`http://localhost:3000`

## 资源替换说明

- 头像文件：放置到 `public/avatar.jpg`
- 简历 PDF：放置到 `public/resume.pdf`

> 当前站点中的姓名、昵称统一使用：**pear279**
