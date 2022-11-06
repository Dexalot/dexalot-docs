import { sidebar } from "vuepress-theme-hope";

export const trSidebarConfig = sidebar({
  "/tr/": [
    {
      text: "Makaleleri",
      icon: "book-reader",
      collapsable: true,
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
        }
      ]
    },

    {
      text: "Içerikler",
      icon: "mortar-board",
      collapsable: true,
      link: "/tr/tutorials",
      prefix: "/tr/tutorials/",
      children: [
        {
          text: "Subnet’e giriş-",
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
      text: "Hukuki",
      icon: "gavel",
      link: "/tr/legal",
      prefix: "/trlegal/",
      collapsable: true,
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
