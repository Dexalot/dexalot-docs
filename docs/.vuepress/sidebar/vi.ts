import { sidebar } from "vuepress-theme-hope";

export const viSidebarConfig = sidebar({
  "/vi/": [
    {
      text: "Bài viết",
      icon: "book-reader",
      collapsible: true,
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
        {
          text: "Dexalot khởi chạy chương trình khuyến khích Subnet Staking",
          icon: "book-open",
          link: "incentives"
        },
        {
          text: "Dexalot's Sample Bot",
          icon: "book-open",
          link: "samplebot"
        }
      ]
    },

    {
      text: "Hướng dẫn",
      icon: "mortar-board",
      collapsible: true,
      link: "/vi/tutorials",
      prefix: "/vi/tutorials/",
      children: [
        {
          text: "Mạng con Dexalot",
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
      collapsible: true,
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
