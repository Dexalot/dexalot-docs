import { sidebar } from "vuepress-theme-hope";

export const viSidebarConfig = sidebar({
  "/vi/": [
    {
      text: "Bài viết",
      icon: "book-reader",
      collapsable: true,
      link: "/vi/articles",
      prefix: "/vi/articles/",
      children: [
        {
          text: "Dexalot Trading Cup",
          icon: "book-open",
          link: "cup"
        },
        {
          text: "Incentivos de Dexalot",
          icon: "book-open",
          link: "dip"
        },
      ]
    },

    {
      text: "Hướng dẫn",
      icon: "mortar-board",
      collapsable: true,
      link: "/vi/tutorials",
      prefix: "/vi/tutorials/",
      children: [
        {
          text: "Introducción a la Dexalot Subnet",
          icon: "play",
          link: "howtouse"
        },
      ]
    },

    {
      text: "Pháp l",
      icon: "gavel",
      link: "/vi/legal",
      prefix: "/vilegal/",
      collapsable: true,
    },

    {
      text: "Contact",
      icon: "envelope",
      link: "/vi/Contact"
    },

    {
      text: "Hỗ trợ",
      icon: "circle-info",
      link: "/vi/About"
    }
  ],
});
