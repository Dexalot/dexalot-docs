import { defineUserConfig } from "vuepress"
import { hopeTheme } from "vuepress-theme-hope";
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import { componentsPlugin } from "vuepress-plugin-components";

export default defineUserConfig({
  lang: "en-US",
  title: "Dexalot",
  description: "The home for technical content.",
  plugins: [
    searchPlugin({
      maxSuggestions: 10,
      locales: {
        '/': {  // English
          placeholder: 'Search',
        }
      }
    }),
    commentPlugin({
      provider: "Giscus",
      comment: true,
      repo: "Dexalot/dexalot-docs",
      repoId: "R_kgDOIDg0jA",
      category: "General",
      categoryId: "DIC_kwDOIDg0jM4CRxR9",
      mapping: "url",
      strict: true,
      reactionsEnabled: true,
      inputPosition: "bottom"
    })
  ],
  markdown: {
    headers: {
      level: [1, 2, 3, 4],
    },
  },
  theme: hopeTheme({
    logo: "/logos/dexalot_logo.png",
    footer: "Last updated 09/22/2022",
    copyright: "BUSL 1.1 Licensed | Copyright © 2022 Dexalot",
    displayFooter: true,
    headerDepth: 4,
    repo: "https://github.com/Dexalot",
    docsRepo: "https://github.com/Dexalot/dexalot-docs",
    docsBranch: "dev",
    docsDir: "docs",
    editLink: false,
    iconAssets: "fontawesome",
    fullscreen: true,
    backToTop: true,
    contributors: false,
    lastUpdated: true,

    plugins: {
      components: ["YouTube"],
      mdEnhance: {
        imageMark: true,
        imageSize: true
      },
    },

    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },

    navbar: [
      {
        text: "Exchange",
        link: "https://app.dexalot.com/",
        icon: "exchange"
      },
      {
        text: "Medium",
        link: "https://medium.com/dexalot",
        icon: "book-reader"
      },
      {
        text: "Discord",
        link: "https://discord.com/invite/S4NP9w7Xwn",
        icon: "comments"
      },
      {
        text: "Telegram",
        link: "https://t.me/dexalot",
        icon: "comments"
      },
    ],

    sidebar: [
      "/" /* / */,

      {
        text: "Articles",
        icon: "book-reader",
        collapsable: true,
        link: "articles",
        prefix: "articles/",
        children: [
          {
            text: "Litepaper",
            icon: "book-open",
            link: "litepaper"
          },
          {
            text: "Dexalot Incentive Program",
            icon: "book-open",
            link: "dip"
          }
        ]
      },
      {
        text: "Tutorials",
        icon: "mortar-board",
        collapsable: true,
        link: "tutorials",
        prefix: "tutorials/",
        children: [
          {
            text: "Dexalot Subnet Intro",
            icon: "play",
            link: "howtouse"
          },
        ]
      },
      {
        text: "Smart Contracts",
        icon: "code",
        collapsable: true,
        link: "contracts",
        prefix: "contracts/",
        children: [
          {
            text: "Main Contracts",
            icon: "file-code",
            collapsable: true,
            children: [
              "Exchange",
              "ExchangeMain",
              "ExchangeSub",
              "Portfolio",
              "PortfolioMain",
              "PortfolioSub",
              "OrderBooks",
              "TradePairs",
              "PortfolioBridge",
              "PortfolioBridgeSub",
              "PortfolioMinter",
              "GasStation",
              "DexalotSubnetBalances"
            ],
          },

          {
            text: "Libraries",
            icon: "file-code",
            prefix: "library/",
            collapsable: true,
            children: [
              "Bytes32LinkedListLibrary",
              "RBTLibrary",
              "UtilsLibrary"
            ],
          },

          {
            text: "Interfaces",
            icon: "file-code",
            prefix: "interfaces/",
            collapsable: true,
            children: [
              "IGasStation",
              "IPortfolio",
              "IPortfolioBridge",
              "IPortfolioMinter",
              "ITradePairs",
              "NativeMinterInterface",
              {
                text: "LayerZero",
                prefix: "layerZero/",
                collapsable: true,
                children: [
                  "ILayerZeroEndpoint",
                  "ILayerZeroReceiver",
                  "ILayerZeroUserApplicationConfig"
                ]
              },
            ],
          },

          {
            text: "Bridge Apps",
            icon: "file-code",
            prefix: "bridgeApps/",
            collapsable: true,
            children: [
              "LzApp"
            ],
          },

          {
            text: "Auxiliary Contracts",
            icon: "file-code",
            prefix: "token/",
            collapsable: true,
            children: [
              "Airdrop",
              "DexalotToken",
              "IncentiveDistributor",
              "MockToken",
              "Staking",
              "TokenVestingCloneable",
              "TokenVestingCloneFactory"
            ],
          }
        ]  // children under Smart Contracts end
      },  // Smart Contracts end

      {
        text: "Trading API",
        icon: "link",
        prefix: "apiv2/",
        link: "apiv2",
        collapsable: true,
        children: [
          {
            text: "RestApi",
            link: "RestApi"
          },
          {
            text: "Contracts",
            link: "Contracts"
          },
          {
            text: "Websocket",
            link: "Websocket"
          },
        ]
      },

      {
        text: "Legal",
        icon: "gavel",
        prefix: "legal/",
        collapsable: true,
        children: [
          {
            text: "License",
            icon: "file",
            link: "License"
          },
          {
            text: "Privacy Policy",
            icon: "file",
            link: "PrivacyPolicy"
          },
          {
            text: "Terms and Conditions",
            icon: "file",
            link: "TermsAndConditions"
          }
        ],  // children under Legal end
      },  // Legal end

      {
        text: "Contact",
        icon: "envelope",
        link: "Contact"
      },

      {
        text: "About",
        icon: "circle-info",
        link: "About"
      }
    ],  // sidebar end
  }),
})
