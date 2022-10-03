import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig } from "vuepress"
import { hopeTheme } from "vuepress-theme-hope";

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
    docsBranch: "main",
    docsDir: "docs",
    editLink: false,
    iconAssets: "iconfont",
    fullscreen: true,
    backToTop: true,
    contributors: false,
    lastUpdated: true,

    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },

    navbar: [
      { text: "Tutorials & Articles",
        link: "https://medium.com/dexalot",
        icon: "read"
      },

      { text: "Landing",
        link: "https://dexalot.com/",
        icon: "launch"
      },

      { text: "App",
        link: "https://app.dexalot.com/",
        icon: "launch"
      },
    ],

    sidebar: [
      "/" /* / */,

      {
        text: "Articles",
        icon: "overflow",
        collapsable: true,
        prefix: "articles/",
        children: [
          {
            text: "Litepaper",
            icon: "read",
            link: "litepaper"
          }
        ]
      },

      {
        text: "Smart Contracts",
        icon: "note",
        collapsable: true,
        link: "contracts/",
        prefix: "contracts/",
        children: [
          {
            text: "Main Contracts",
            icon: "proposal",
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
            ],
          },

          {
            text: "Libraries",
            icon: "api",
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
            icon: "api",
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
            icon: "link",
            prefix: "bridgeApps/",
            collapsable: true,
            children: [
              "LzApp"
            ],
          },

          {
            text: "Auxiliary Contracts",
            icon: "proposal",
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
        text: "Legal",
        icon: "note",
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
        text: "Trading API",
        icon: "api",
        link: "apiv2"
      },

      {
        text: "Contact",
        icon: "call",
        link: "Contact"
      },

      {
        text: "About",
        icon: "info",
        link: "About"
      }
    ],  // sidebar end
  }),
})
