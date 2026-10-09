# pear 279 · 李慧珍

李慧珍的个人网站，以 AI 产品为主要方向，连接市场、运营与数据实践。

**公网访问：[pear279.github.io/mywebsite](https://pear279.github.io/mywebsite/)**

这是正式的 GitHub Pages 地址，无需登录，不依赖临时预览链接。推送到 `main` 后自动构建并更新。

## 网站内容

- **首页**：彩色剪纸字标「PEAR 279」、纯白背景与鼠标渐变涟漪。
- **我**：基本信息、目标岗位、ENFJ-A 与生活照。
- **作品**：China Stroll、MoodSeed、Koala Pet、SoundLens；横向拖动浏览，点击进入项目详情。
- **经历**：实习与实践，可展开查看工作过程。
- **联系**：邮箱、电话、GitHub。
- **简历**：在线查看与下载 PDF。

「探索我的日常」包含技能、校园、在读、在玩四个互动文件夹。校园以活动照片为主；在读展示真实阅读快照；在玩介绍六款休闲益智游戏。考拉会随章节切换动作。

## 本地开发与验证

需要 Node.js 20 与 npm。

```sh
npm ci
npm run dev
```

本地地址为 `http://localhost:3000/`。使用 Next.js 14、React、TypeScript 与 GSAP，采用静态导出。手机支持触摸浏览，交互兼顾键盘操作与减少动态效果设置。

按正式发布路径验证：

```sh
npm run typecheck
NEXT_PUBLIC_BASE_PATH=/mywebsite npm run build
NEXT_PUBLIC_BASE_PATH=/mywebsite npm run check:export
```

构建产物位于 `out/`；导出检查验证本地资源与链接。

## 自动部署

配置位于 `.github/workflows/deploy-pages.yml`。每次推送到 `main`，GitHub Actions 会安装依赖、执行类型检查、构建、检查静态导出，再发布到 GitHub Pages。也可在 Actions 中手动运行「Publish portfolio」。

GitHub Pages 构建使用 `NEXT_PUBLIC_BASE_PATH=/mywebsite`；部署到根域名时不设置此变量。公开访问使用上面的正式地址，无需添加版本参数。

## 内容维护

| 内容 | 位置 |
| --- | --- |
| 首页、导航与个人信息 | `app/page.tsx` |
| 全站样式 | `app/globals.css` |
| 字标、涟漪与考拉 | `components/Brand.tsx`、`components/CursorRipple.tsx`、`components/Koala.tsx` |
| 作品与案例详情 | `data/projects.ts`、`data/case-depth.ts`、`app/projects/[slug]/page.tsx` |
| 文件夹与探索详情 | `components/ExploreFolders.tsx`、`data/explore.ts`、`app/explore/[slug]/page.tsx` |
| 校园照片浏览 | `components/CampusGallery.tsx`、`public/media/` |
| 阅读书目与进度 | `data/reading.ts`、`components/BookShelf.tsx` |
| 公开简历 | `public/resume.pdf` |

阅读信息为 **2026-10-10 的静态快照**，不会在访问网站时自动查询个人账户。更新书目时同步修改数据与快照日期；书籍封面使用微信读书提供的远程图片，其余主要图片存放在本地公开资源目录。

IEG 魔方材料用于求职研究与校园活动资料整理，不代表在该工作室实习。SoundLens 的声音示意视觉不代表产品截图。更新内容时保留这些事实边界。
