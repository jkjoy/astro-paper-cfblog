/**
 * Astro 配置：静态构建（SSG），适配 Cloudflare Pages 静态托管
 */
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 生成纯静态站点
  output: 'static',
  // 简洁 URL：不带结尾斜杠
  trailingSlash: 'never',
});
