import { hopeTheme } from "vuepress-theme-hope";
import {
  enNavbarConfig,
  esNavbarConfig,
  viNavbarConfig,
  trNavbarConfig,
  zhNavbarConfig,
} from "./navbar/index.js";
import {
  enSidebarConfig,
  esSidebarConfig,
  viSidebarConfig,
  trSidebarConfig,
  zhSidebarConfig,
} from "./sidebar/index.js";

export default hopeTheme({
  logo: "/logos/dexalot_logo.png",
  footer: "Last updated 11/22/2024",
  copyright: "BUSL 1.1 Licensed | Copyright © 2024 Dexalot",
  displayFooter: true,
  headerDepth: 4,
  repo: "https://github.com/Dexalot",
  docsRepo: "https://github.com/Dexalot/dexalot-docs",
  docsBranch: "dev",
  docsDir: "docs",
  editLink: false,
  iconAssets: "fontawesome",
  fullscreen: true,
  contributors: false,
  lastUpdated: true,

  locales: {
    "/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,
    },

    "/es/": {
      navbar: esNavbarConfig,
      sidebar: esSidebarConfig
    },

    "/vi/": {
      navbar: viNavbarConfig,
      sidebar: viSidebarConfig,
    },

    "/tr/": {
      navbar: trNavbarConfig,
      sidebar: trSidebarConfig,
    },

    "/zh/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,
    },
  },

  plugins: {
    components: {
      components: ['VidStack']
    },

    searchPro: {
      indexContent: true,
      autoSuggestions: true,
    },

    comment: {
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
    },

    markdownMath: true,

    mdEnhance: {
    },
  },
});
