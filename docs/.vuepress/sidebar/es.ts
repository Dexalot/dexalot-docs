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
        },
          {
            text: "Lanzamiento del Programa de Incentivo de Staking en la Dexalot Subnet",
            icon: "book-open",
            link: "incentives"
          },
          {
            text: "Sample Bot de Dexalot",
            icon: "book-open",
            link: "samplebot"
          },
          {text: "Dexalot x LayerZero",
          icon: "book-open",
          link: "layerzero"
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
