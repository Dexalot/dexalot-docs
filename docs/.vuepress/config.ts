import { defineUserConfig } from "vuepress"
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import theme from "./theme";

export default defineUserConfig({
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
      lang: "vi-VI",
      title: "Dexalot | Docs",
      description: "Trang chủ cho nội dung kỹ thuật"
    },
  },

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/es/': {
          placeholder: 'Buscar',
        },
        '/vi/': {
          placeholder: 'Tìm kiếm',
        },
      }
    }),
    commentPlugin({
      provider: "Giscus",
      comment: true,
      repo: "Dexalot/dexalot-docs",
      repoId: "R_kgDOIDg0jA",
      category: "General",
      categoryId: "DIC_kwDOIDg0jM4CRxR9",
      mapping: "url",
      strict: true,
      reactionsEnabled: true,
      inputPosition: "bottom"
    })
  ],

  markdown: {
    headers: {
      level: [1, 2, 3, 4],
    },
  },

  theme,

  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules",
  ],
});
