import { sidebar } from "vuepress-theme-hope";

export const enSidebarConfig = sidebar({
  "/": [
    {
      text: "Articles",
      icon: "book-reader",
      collapsible: true,
      link: "articles",
      prefix: "articles/",
      children: [
        {
          text: "Dexalot Subnet",
          icon: "book-open",
          link: "subnet"
        },
        {
          text: "The Dexalot Subnet Guide",
          icon: "book-open",
          link: "guide"
        },
        {
          text: "Dexalot Incentive Program",
          icon: "book-open",
          link: "dip"
        },
        {
          text: "Dexalot Incentive Commitments",
          icon: "book-open",
          link: "incentives"
        },
        {
          text: "Dexalot x LayerZero",
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
          text: "Dexalot's Sample Bot",
          icon: "book-open",
          link: "samplebot"
        },
        {
          text: "Dexalot Trading Cup",
          icon: "book-open",
          link: "cup"
        },
        {
          text: "Litepaper",
          icon: "book-open",
          link: "litepaper"
        }
      ]
    },

    {
      text: "Tutorials",
      icon: "mortar-board",
      collapsible: true,
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
          link: "recovrmmtxn"
        }
      ]
    },
    {
      text: "Smart Contracts",
      icon: "code",
      collapsible: true,
      link: "contracts",
      prefix: "contracts/",
      children: [
        {
          text: "Main Contracts",
          icon: "file-code",
          collapsible: true,
          children: [
            "Exchange",
            "ExchangeMain",
            "ExchangeSub",
            "Portfolio",
            "PortfolioMain",
            "PortfolioSub",
            "PortfolioSubHelper",
            "OrderBooks",
            "TradePairs",
            "PortfolioBridgeMain",
            "PortfolioBridgeSub",
            "DelayedTransfers",
            "PortfolioMinter",
            "GasStation",
            "MainnetRFQ",
            "BannedAccounts"
          ],
        },

        {
          text: "Libraries",
          icon: "file-code",
          prefix: "library/",
          collapsible: true,
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
          collapsible: true,
          children: [
            "IPortfolio",
            "IPortfolioMain",
            "IPortfolioSub",
            "IPortfolioSubHelper",
            "ITradePairs",
            "IPortfolioBridge",
            "IPortfolioBridgeSub",
            "IDelayedTransfers",
            "IPortfolioMinter",
            "IGasStation",
            "IBannedAccounts",
            "INativeMinter",
            {
              text: "LayerZero",
              prefix: "layerZero/",
              collapsible: true,
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
          collapsible: true,
          children: [
            "LzApp"
          ],
        },

        {
          text: "Auxiliary Contracts",
          icon: "file-code",
          prefix: "token/",
          collapsible: true,
          children: [
            "Airdrop",
            "DexalotToken",
            "IncentiveDistributor",
            "MockToken",
            "TokenVestingCloneable",
            "TokenVestingCloneFactory"
          ],
        },

        {
          text: "Error Codes",
          icon: "file-code",
          link: "Errors"
        },

      ]  // children under Smart Contracts end
    },  // Smart Contracts end

    {
      text: "Trading API",
      icon: "link",
      prefix: "apiv2/",
      link: "apiv2",
      collapsible: true,
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
        {
          text: "SimpleSwap",
          link: "SimpleSwap"
        },
      ]
    },

    {
      text: "Legal",
      icon: "gavel",
      prefix: "legal/",
      collapsible: true,
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
