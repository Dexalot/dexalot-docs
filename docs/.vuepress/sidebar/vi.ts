import { sidebar } from "vuepress-theme-hope";

export const viSidebarConfig = sidebar({
  "/vi/": [
    {
      text: "Artículos",
      icon: "book-reader",
      collapsable: true,
      link: "/vi/articles",
      prefix: "/vi/articles/",
      children: [
        {
          text: "Incentivos de Dexalot",
          icon: "book-open",
          link: "dip"
        },
      ]
    },

    {
      text: "Tutoriales",
      icon: "mortar-board",
      collapsable: true,
      link: "/vi/tutorials",
      prefix: "/vi/tutorials/",
      children: [
        {
          text: "Introducción a la Dexalot Subnet",
          icon: "play",
          link: "howtouse"
        },
      ]
    },

    {
      text: "Legal",
      icon: "gavel",
      link: "/vi/legal",
      prefix: "/vilegal/",
      collapsable: true,
    },

    {
      text: "Contacto",
      icon: "envelope",
      link: "/vi/Contact"
    },

    {
      text: "Sobre",
      icon: "circle-info",
      link: "/vi/About"
    }
  ],
});
