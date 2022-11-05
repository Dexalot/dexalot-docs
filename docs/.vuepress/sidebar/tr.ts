import { sidebar } from "vuepress-theme-hope";

export const trSidebarConfig = sidebar({
  "/tr/": [
    {
      text: "Artículos",
      icon: "book-reader",
      collapsable: true,
      link: "/tr/articles",
      prefix: "/tr/articles/",
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
        {
          text: "La Dexalot Subnet",
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
      text: "Tutoriales",
      icon: "mortar-board",
      collapsable: true,
      link: "/tr/tutorials",
      prefix: "/tr/tutorials/",
      children: [
        {
          text: "Introducción a la Dexalot Subnet",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Testing de la Dexalot-Subnet",
          icon: "play",
          link: "howtotest"
        },
        {
          text: "Instalación de MetaMask",
          icon: "play",
          link: "metamaskuse"
        },
      ]
    },

    {
      text: "Legal",
      icon: "gavel",
      link: "/tr/legal",
      prefix: "/trlegal/",
      collapsable: true,
    },

    {
      text: "Contacto",
      icon: "envelope",
      link: "/tr/Contact"
    },

    {
      text: "Sobre",
      icon: "circle-info",
      link: "/tr/About"
    }
  ],
});
