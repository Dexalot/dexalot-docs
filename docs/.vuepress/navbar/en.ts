import { navbar } from "vuepress-theme-hope";
import { commonNavbarEntries } from "./common"

export const enNavbarConfig = navbar(
  [
    {
      text: "Exchange",
      link: "https://app.dexalot.com/",
      icon: "exchange"
    },
    ...commonNavbarEntries
  ]
);
