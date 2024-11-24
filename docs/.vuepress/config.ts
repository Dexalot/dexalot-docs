import { viteBundler } from "@vuepress/bundler-vite"
import { defineUserConfig } from "vuepress"
import theme from "./theme.js"

export default defineUserConfig({
  base: "/",

  dest: "docs/.vuepress/dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Dexalot | Docs",
      description: "The home for technical content"
    },
    "/es/": {
      lang: "es-ES",
      title: "Dexalot | Docs",
      description: "El hogar del contenido técnico"
    },
    "/vi/": {
      lang: "vi-VN",
      title: "Dexalot | Docs",
      description: "Trang chủ cho nội dung kỹ thuật"
    },
    "/tr/": {
      lang: "tr-TR",
      title: "Dexalot | Docs",
      description: "Geliştiriciler için bir merkez"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Dexalot | Docs",
      description: "The home for technical content"
    },
  },

  plugins: [
  ],

  markdown: {
    headers: {
      level: [1, 2, 3, 4],
    },
  },

  bundler: viteBundler(),

  theme,

  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules",
  ],
});
