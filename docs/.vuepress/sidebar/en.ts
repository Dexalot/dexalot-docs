import { sidebar } from "vuepress-theme-hope";

export const enSidebarConfig = sidebar({
  "/": [
    {
      text: "Articles",
      icon: "book-reader",
      collapsible: true,
      link: "/en/articles/",
      prefix: "/en/articles",
      children: [
        {
          text: "Dexalot L1 Intro",
          icon: "book-open",
          link: "subnet/"
        },
        {
          text: "Dexalot L1 Guide",
          icon: "book-open",
          link: "guide/"
        },
        {
          text: "Dexalot x LayerZero",
          icon: "book-open",
          link: "layerzero/"
        },
                {
          text: "Asset Balance Snapshot",
          icon: "book-open",
          link: "abs/"
        },
        {
          text: "Dexalot Discovery",
          icon: "book-open",
          link: "discovery/"
        },
        {
          text: "Dexalot's Sample Bot",
          icon: "book-open",
          link: "samplebot/"
        },
        {
          text: "Dexalot Trading Cup",
          icon: "book-open",
          link: "cup/"
        },
        {
          text: "Litepaper",
          icon: "book-open",
          link: "litepaper/"
        },
        {
          text: "Token Conversion",
          icon: "book-open",
          link: "tokenconversion/"
        }
      ]
    },

    {
      text: "Tutorials",
      icon: "mortar-board",
      collapsible: true,
      link: "/en/tutorials/",
      prefix: "/en/tutorials/",
      children: [
        {
          text: "Dexalot L1 Intro",
          icon: "play",
          link: "howtouse/"
        },
        {
          text: "Dexalot L1 Testing",
          icon: "play",
          link: "howtotest/"
        },
        {
          text: "Run a Dexalot L1 Node",
          icon: "book-open",
          link: "runanode/"
        },
        {
          text: "Metamask Install",
          icon: "play",
          link: "metamaskuse/"
        },
        {
          text: "Pending Transaction Help",
          icon: "play",
          link: "recovrmmtxn/"
        }
      ]
    },

    {
      text: "Incentives",
      icon: "trophy",
      link: "/en/DIP",
    },

    {
      text: "Annual Percentage Yield",
      icon: "percentage",
      link: "/en/APY",
    },

    {
      text: "Trading Fees & Discounts",
      icon: "dollar",
      link: "/en/TradingFeeDiscounts",
    },

    {
      text: "Smart Contracts",
      icon: "code",
      collapsible: true,
      link: "/en/contracts/",
      prefix: "/en/contracts/",
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
            "InventoryManager",
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
            "InvariantMathLibrary",
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
            "IInventoryManager",
            "IDelayedTransfers",
            "IPortfolioMinter",
            "IGasStation",
            "IBannedAccounts",
            "INativeMinter",
          ],
        },

        {
          text: "Bridge Apps",
          icon: "file-code",
          prefix: "bridgeApps/",
          collapsible: true,
          children: [
            "DefaultBridgeApp",
            "ICMApp",
            "LzV2App"
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
      prefix: "/en/apiv2/",
      link: "/en/apiv2/",
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
      link: "/en/legal/",
      prefix: "/en/legal/",
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
      link: "/en/Contact"
    },

    {
      text: "About",
      icon: "circle-info",
      link: "/en/About"
    }
  ],
});
