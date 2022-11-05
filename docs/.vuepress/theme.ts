import { hopeTheme } from "vuepress-theme-hope";
import {
  enNavbarConfig,
  esNavbarConfig,
  viNavbarConfig,
  trNavbarConfig,
} from "./navbar/index";
import {
  enSidebarConfig,
  esSidebarConfig,
  viSidebarConfig,
} from "./sidebar/index";

export default hopeTheme({
  logo: "/logos/dexalot_logo.png",
  footer: "Last updated 09/22/2022",
  copyright: "BUSL 1.1 Licensed | Copyright © 2022 Dexalot",
  displayFooter: true,
  headerDepth: 4,
  repo: "https://github.com/Dexalot",
  docsRepo: "https://github.com/Dexalot/dexalot-docs",
  docsBranch: "dev",
  docsDir: "docs",
  editLink: false,
  iconAssets: "fontawesome",
  fullscreen: true,
  backToTop: true,
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
      sidebar: viSidebarConfig,
    },

  },

  plugins: {
    components: ["YouTube"],
    mdEnhance: {
      imageMark: true,
      imageSize: true
    }
  },

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
});
