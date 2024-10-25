import { sidebar } from "vuepress-theme-hope";

export const trSidebarConfig = sidebar({
  "/tr/": [
    {
      text: "Makaleler",
      icon: "book-reader",
      collapsible: true,
      link: "/tr/articles",
      prefix: "/tr/articles/",
      children: [
        {
          text: "Dexalot L1",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Dexalot L1 Rehberi",
          icon: "book-open",
          link: "guide"
        },
        {
          text: "Dexalot Teşvik Programı",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot Subnet Teşvik Lansmanı",
          icon: "book-open",
          link: "incentives"
        },
        {text: "Dexalot x LayerZero",
        icon: "book-open",
        link: "layerzero"
        },
        {
        text: "Dexalot’un Asset Balance Snapshot’ı",
        icon: "book-open",
        link: "abs"
        },
        {
          text: "Dexalot Discovery",
          icon: "book-open",
          link: "discovery"
        },
        {
          text: "Dexalot’un Örnek Botu",
          icon: "book-open",
          link: "samplebot"
        },
        {
          text: "Dexalot Ticaret Kupası",
          icon: "book-open",
          link: "cup"
        }
      ]
    },

    {
      text: "Öğretici Içerikler",
      icon: "mortar-board",
      collapsible: true,
      link: "/tr/tutorials",
      prefix: "/tr/tutorials/",
      children: [
        {
          text: "L1'e giriş",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Dexalot L1 Testi",
          icon: "play",
          link: "howtotest"
        },
        {
          text: "MetaMask nasıl kurulur",
          icon: "play",
          link: "metamaskuse"
        },
      ]
    },

    {
      text: "Yasal Bilgiler",
      icon: "gavel",
      link: "/tr/legal",
      prefix: "/trlegal/",
      collapsible: true,
    },

    {
      text: "İletişim",
      icon: "envelope",
      link: "/tr/Contact"
    },

    {
      text: "Hakkında",
      icon: "circle-info",
      link: "/tr/About"
    }
  ],
});
