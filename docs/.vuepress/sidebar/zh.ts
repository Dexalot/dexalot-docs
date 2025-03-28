import { sidebar } from "vuepress-theme-hope";

export const zhSidebarConfig = sidebar({
  "/zh/": [
    {
      text: "文章",
      icon: "book-reader",
      collapsible: true,
      link: "/zh/articles/",
      prefix: "/zh/articles/",
      children: [
        {
          text: "Dexalot子网",
          icon: "book-open",
          link: "subnet/"
        },
        {
          text: "Dexalot子网指南",
          icon: "book-open",
          link: "guide/"
        },
        {
          text: "Dexalot x LayerZero",
          icon: "book-open",
          link: "layerzero/"
        },
        {
          text: "资产余额快照",
          icon: "book-open",
          link: "abs/"
        },
        {
          text: "Dexalot 的Sample Bot说明示例",
          icon: "book-open",
          link: "samplebot/"
        },
        {
          text: "Dexalot交易杯大赛",
          icon: "book-open",
          link: "cup/"
        }
      ]
    },

    {
      text: "教程",
      icon: "mortar-board",
      collapsible: true,
      link: "/zh/tutorials/",
      prefix: "/zh/tutorials/",
      children: [
        {
          text: "Dexalot子网介绍",
          icon: "play",
          link: "howtouse/"
        },
        {
          text: "Dexalot子网测试",
          icon: "play",
          link: "howtotest/"
        },
      ]
    },

    {
      text: " 法律",
      icon: "gavel",
      link: "/zh/legal/",
      prefix: "/zhlegal/",
      collapsible: true,
    },

    {
      text: "联系我们",
      icon: "envelope",
      link: "/zh/Contact"
    },

    {
      text: "关于我们",
      icon: "circle-info",
      link: "/zh/About"
    }
  ],
});
