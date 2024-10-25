import { sidebar } from "vuepress-theme-hope";

export const esSidebarConfig = sidebar({
  "/es/": [
    {
      text: "Artículos",
      icon: "book-reader",
      collapsible: true,
      link: "/es/articles",
      prefix: "/es/articles/",
      children: [
        {
          text: "La Dexalot L1",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Guia L1 de Dexalot",
          icon: "book-open",
          link: "guide"
        },
        {
          text: "Incentivos de Dexalot",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot Incentivo Compromisos",
          icon: "book-open",
          link: "incentives"
        },
        {text: "Dexalot x LayerZero",
        icon: "book-open",
        link: "layerzero"
      },
      {
        text: "Asset Balance Snapshot",
        icon: "book-open",
        link: "abs"
      },
        {
          text: "Dexalot Discovery",
          icon: "book-open",
          link: "discovery"
        },
          {
            text: "Sample Bot de Dexalot",
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
      text: "Tutoriales",
      icon: "mortar-board",
      collapsible: true,
      link: "/es/tutorials",
      prefix: "/es/tutorials/",
      children: [
        {
          text: "Introducción a la Dexalot L1",
          icon: "play",
          link: "howtouse"
        },
        {
          text: "Testing de la Dexalot L1",
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
      link: "/es/legal",
      prefix: "/eslegal/",
      collapsible: true,
    },

    {
      text: "Contacto",
      icon: "envelope",
      link: "/es/Contact"
    },

    {
      text: "Sobre",
      icon: "circle-info",
      link: "/es/About"
    }
  ],
});
