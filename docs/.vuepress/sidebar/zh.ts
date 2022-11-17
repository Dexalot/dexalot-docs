import { sidebar } from "vuepress-theme-hope";

export const zhSidebarConfig = sidebar({
  "/zh/": [
    {
      text: "Artículos",
      icon: "book-reader",
      collapsible: true,
      link: "/zh/articles",
      prefix: "/zh/articles/",
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
      collapsible: true,
      link: "/zh/tutorials",
      prefix: "/zh/tutorials/",
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
      link: "/zh/legal",
      prefix: "/zhlegal/",
      collapsible: true,
    },

    {
      text: "Contacto",
      icon: "envelope",
      link: "/zh/Contact"
    },

    {
      text: "Sobre",
      icon: "circle-info",
      link: "/zh/About"
    }
  ],
});
