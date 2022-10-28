import { sidebar } from "vuepress-theme-hope";

export const esSidebarConfig = sidebar({
  "/es/": [
    {
      text: "Artículos",
      icon: "book-reader",
      collapsable: true,
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
        }
      ]
    },

    {
      text: "Tutoriales",
      icon: "mortar-board",
      collapsable: true,
      link: "/es/tutorials",
      prefix: "/es/tutorials/",
      children: [
        {
          text: "La Dexalot-Subnet",
          icon: "play",
          link: "howtouse"
        },
      ]
    },

    {
      text: "Legal",
      icon: "gavel",
      link: "/es/legal",
      prefix: "/eslegal/",
      collapsable: true,
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
