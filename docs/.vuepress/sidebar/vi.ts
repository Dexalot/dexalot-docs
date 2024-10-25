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
          text: "Dexalot L1",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Hướng dẫn Dexalot L1",
          icon: "book-open",
          link: "guide"
        },
        {
          text: "Chương trình khuyến khích Dexalot",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Cam kết khuyến khích của Dexalot",
          icon: "book-open",
          link: "incentives"
        },
        {
          text: "Dexalot x LayerZero",
          icon: "book-open",
          link: "layerzero"
        },
        {
          text: "Ảnh chụp số dư tài sản của Dexalot",
          icon: "book-open",
          link: "abs"
        },
        {
          text: "Khám phá Dexalot",
          icon: "book-open",
          link: "discovery"
        },
        {
          text: "Dexalot's Sample Bot",
          icon: "book-open",
          link: "samplebot"
        },
        {
          text: "Dexalot Trading Cup",
          icon: "book-open",
          link: "cup"
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
          text: "Mạng con Dexalot L1",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Thử nghiệm công khai Dexalot L1",
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
