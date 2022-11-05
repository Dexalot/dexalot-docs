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
          text: "Chương trình khuyến khích Dexalot",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "The Dexalot Subnet",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Khám phá Dexalot",
          icon: "book-open",
          link: "discovery"
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
          text: "Mạng con Dexalot Intro",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Thử nghiệm công khai Dexalot-Subnet",
          icon: "play",
          link: "howtotest"
        },
        {
          text: "Cách cài đặt Metamask",
          icon: "play",
          link: "metamaskuse"
        },
        {
          text: "Khắc phục các giao dịch Metamask đang chờ xử lý",
          icon: "play",
          link: "recovrmmtxn"
        },
      ]
    },

    {
      text: "Pháp lý",
      icon: "gavel",
      link: "/vi/legal",
      prefix: "/vilegal/",
      collapsable: true,
    },

    {
      text: "Tiếp xúc",
      icon: "envelope",
      link: "/vi/Contact"
    },

    {
      text: "Về",
      icon: "circle-info",
      link: "/vi/About"
    }
  ],
});
