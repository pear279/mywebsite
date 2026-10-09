# pear 279 · 李慧珍

AI 产品与创意实践个人作品集。原创手绘空心字标、滚动固定标识、产品案例、实习经历、校园与市场实践，以及可互动的考拉小伙伴。

## 开发与验证

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Next.js 14 / TypeScript / GSAP。站点静态导出到 `out/`；图片已预处理为本地 WebP，减少带宽，不依赖远程图片服务。支持手机、键盘导航及减少动态效果设置。

## 发布

GitHub Pages: https://pear279.github.io/mywebsite/

推送到 `main` 后，`.github/workflows/deploy-pages.yml` 自动检查、构建并发布。Pages 构建设置 `NEXT_PUBLIC_BASE_PATH=/mywebsite`；本地与根域名部署不设置此变量。Vercel 可直接使用 Next.js 框架构建。

## 内容维护

- 产品案例：`data/projects.ts`、`app/projects/[slug]/page.tsx`
- 首页：`app/page.tsx`
- 视觉样式：`app/globals.css`
- 字标：`components/Brand.tsx`
- 发布素材：`public/media/`，简历：`public/resume.pdf`
- 当前设计与内容口径：`docs/design-direction.md`

素材源于作者的项目、简历与作品集。IEG 魔方文档为求职研究，并非该工作室实习经历。SoundLens 封面为网站创建的声音示意动效，并非产品截图。原始述职与大型材料保持在本地，不纳入本次发布。
