## 简介
一个基于 Astro 的静态博客，从 WordPress REST API 拉取内容并在构建时 SSG 预渲染。样式参考 Paper（简洁、单列、纯文字链接）。

## 后端项目

https://github.com/jkjoy/cfblog

## 功能
- 首页文章列表与分页（每页 9 篇）[src/pages/index.astro](src/pages/index.astro)、[src/pages/page/[page].astro](src/pages/page/%5Bpage%5D.astro)
- 文章详情 SSG（基于 slug），支持 Markdown 解析与常见排版 [src/pages/post/[slug].astro](src/pages/post/%5Bslug%5D.astro)、[src/lib/markdown.ts](src/lib/markdown.ts)
- 动态站点信息（标题/描述）来自 WordPress API 根 [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro)、[src/lib/wp.ts](src/lib/wp.ts)
- 归档页面（按年份分组）[src/pages/archive.astro](src/pages/archive.astro)
- 分类/标签聚合页与动态路由分页：
  - [src/pages/categories.astro](src/pages/categories.astro)、[src/pages/tags.astro](src/pages/tags.astro)
  - [src/pages/category/[slug].astro](src/pages/category/%5Bslug%5D.astro)、[src/pages/category/[slug]/page/[page].astro](src/pages/category/%5Bslug%5D/page/%5Bpage%5D.astro)
  - [src/pages/tag/[slug].astro](src/pages/tag/%5Bslug%5D.astro)、[src/pages/tag/[slug]/page/[page].astro](src/pages/tag/%5Bslug%5D/page/%5Bpage%5D.astro)
- 在文章详情页展示所属分类与标签并可跳转
- 链接页：优先从 WordPress pages 的 `links` 页面拉取，缺省时使用静态占位列表 [src/pages/links.astro](src/pages/links.astro)、[src/lib/wp.ts](src/lib/wp.ts)
- 纯静态输出，适配 Cloudflare Pages

## 环境变量配置
`CFBLOG_API` 以覆盖默认 API 根(部署cfblog之后的地址)
`SITE_URL` 以覆盖默认网站地址(RSS订阅需要)

## 路由与页面
- `/`、`/page/[n]`：文章列表与分页
- `/post/[slug]`：文章详情（Markdown 渲染）
- `/archive`：归档（全部文章汇总按年分组）
- `/categories`：所有分类列表
- `/category/[slug]`、`/category/[slug]/page/[n]`：分类聚合与分页
- `/tags`：所有标签列表
- `/tag/[slug]`、`/tag/[slug]/page/[n]`：标签聚合与分页
- `/links`：链接页（WordPress pages：`links`；无则静态列表）

## Links 页面接入
- 在 WordPress 中创建页面，固定链接为 `links`（slug）
- 页面内容支持 Markdown/HTML；构建时会优先拉取并渲染该页面
- 若未创建，则展示静态占位列表（可在 [src/pages/links.astro](src/pages/links.astro) 修改）

## 样式与主题
- Paper 风格（浅灰分隔线、单列、标题+日期、纯文字链接）
- 全局样式与排版见 [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro)

## 本地开发
```sh
npm install
npm run dev
```
- 访问 http://localhost:4321/

## 生产构建与预览
```sh
npm run build
npm run preview
```
- 构建产物输出到 `dist/`

## Cloudflare Pages 部署
1. 推送到 Git 仓库（GitHub/GitLab）
2. 在 Cloudflare Pages 创建项目并选择该仓库
3. 构建设置：
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`
4. 可选环境变量： `CFBLOG_API` 以覆盖默认 API 根，`SITE_URL` 以覆盖默认网站地址(RSS订阅需要)
5. 部署完成后访问站点域名

## 许可证
MIT
