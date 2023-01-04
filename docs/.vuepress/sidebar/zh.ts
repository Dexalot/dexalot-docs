import { sidebar } from "vuepress-theme-hope";

export const zhSidebarConfig = sidebar({
  "/zh/": [
    {
      text: "文章",
      icon: "book-reader",
      collapsible: true,
      link: "/zh/articles",
      prefix: "/zh/articles/",
      children: [
        {
          text: "Dexalot交易杯大赛",
          icon: "book-open",
          link: "cup"
        },
        {
          text: "Dexalot 奖励计划",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot子网",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Dexalot子网质押奖励计划开启",
          icon: "book-open",
          link: "incentives"
        },
        {
          text: "Dexalot 的Sample Bot说明示例",
          icon: "book-open",
          link: "samplebot"
        }
      ]
    },

    {
      text: "教程",
      icon: "mortar-board",
      collapsible: true,
      link: "/zh/tutorials",
      prefix: "/zh/tutorials/",
      children: [
        {
          text: "Dexalot子网介绍",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Dexalot子网测试",
          icon: "play",
          link: "howtotest"
        },
      ]
    },

    {
      text: " 法律",
      icon: "gavel",
      link: "/zh/legal",
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
