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
          text: "Dexalot Ticaret Kupası",
          icon: "book-open",
          link: "cup"
        },
        {
          text: "Dexalot Teşvik Programı",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot Subnet",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Dexalot Discovery",
          icon: "book-open",
          link: "discovery"
        },
        {
          text: "Dexalot Subnet Staking Teşvik Lansmanı",
          icon: "book-open",
          link: "incentives"
        },
        {
          text: "Dexalot’un Örnek Botu",
          icon: "book-open",
          link: "samplebot"
        },
        {text: "Dexalot x LayerZero",
          icon: "book-open",
          link: "layerzero"
        },
        {
          text: "Dexalot’un Asset Balance Snapshot’ı",
          icon: "book-open",
          link: "abs"
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
          text: "Subnet’e giriş",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Dexalot-Subnet Testi",
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
