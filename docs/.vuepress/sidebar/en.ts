import { sidebar } from "vuepress-theme-hope";

export const enSidebarConfig = sidebar({
  "/": [
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
          text: "The Dexalot Subnet",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "Dexalot Incentive Program",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot Validation Program",
          icon: "book-open",
          link: "validation"
        },
        {
          text: "Dexalot Discovery",
          icon: "book-open",
          link: "discovery"
        },
        {
          text: "Dexalot Trading Cup",
          icon: "book-open",
          link: "cup"
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
        {
          text: "Dexalot Subnet Testing",
          icon: "play",
          link: "howtotest"
        },
        {
          text: "Metamask Install",
          icon: "play",
          link: "metamaskuse"
        },
        {
          text: "Pending Transaction Help",
          icon: "play",
          link: "recovermmtxn"
        }
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
  ],
});
