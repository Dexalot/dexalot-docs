---
title: Dexalot Trading API (v2)
icon: link
editLink: true
---

## Version History

 Version | <div style="width:95px">Date</div> | Description |
|---|---|---|
| v2.0 | 2022-08-11 | initial doc |
| v2.1 | 2022-08-17 | - Added websocket authorization via getwstoken endpoint<br>errorcodes endpoint for smart contract errors<br>- PortfolioMain contract invocations<br>TradePairs CancelReplace Function<br>- Changed REST and WS endpoints<br>Fixed a typo under get open orders REST endpoint from<br>- TradePairs.getOrder(symbol) to TradePairs.getOrder(bytes32 _orderId)<br>- LayerZero will be the only and default bridge when going live and other bridges will be added as needed.|
| v2.2 | 2022-08-21 | Sample getClientOrderId |
| v2.3 | 2022-09-02 | Updated api links after app switch |
| v2.4 | 2022-09-25 | getNBuyBook getNSellBook replaced with a single getNBook function |
| v2.5 | 2022-11-07 | Websocket orderbook message changes:<br><br>- (Breaking Change) Renamed "totals" field to "baseCumulative"<br>- Added "quoteCumulative" which shows the cumulative quote amount<br>- Added "quoteTotal" which shows quote asset orderbook line total.|
| v2.6 | 2023-02-22 |- Addition of signed endpoints: orders, traderhistory, executions, transfers, portfoliobalance, transactions<br>- Removed onlyfills parameter from signed traderhistory endpoint|
| v2.7 | 2023-03-06 |- Remove api-key restrictions from all endpoints except auth/getwstoken (temp ws token)<br>- Added curl examples for requests, added Python example for signing.|
| v2.8 | 2024-03-22 |Added additional entries for new chains, affecting the following endpoints:<br>- [Get Environments](/en/apiv2/RestApi.md#get-environments)<br>- [Get Tokens](/en/apiv2/RestApi.md#get-tokens)<br>- [Get Deployment](/en/apiv2/RestApi.md#get-deployment-contract-addresses-and-abi)<br><br>Added executor address for [RFQ firm quote](/en/apiv2/SimpleSwap.md#_4-request-firm-quote).<br><br>Updated contract events for multichain, affecting the following events:<br>- [PortfolioUpdated](/en/contracts/interfaces/IPortfolio.html#portfolioupdated)<br>- [XChainXferMessage](/en/contracts/interfaces/IPortfolioBridge.html#xchainxfermessage) with new [Xfer](/en/contracts/interfaces/IPortfolio.html#xfer)<br>- [SwapExecuted](/en/contracts/MainnetRFQ.html#swapexecuted)|

## Architecture

Dexalot is a non-custodial omni-chain CLOB Dex that spans over the Dexalot L1 (previously referred as Subnet) and multiple host-chains (Mainnets). The Avalanche C-Chain has been the first host-chain that went live on Feb 1st, 2023 along with our Dexalot L1. With the March 2024 upgrade, we started onboarding other blockchains such as Arbitrum, Base and even other L1s such as Gunzilla as host-chains. Dexalot's patent pending novel architecture allows depositing any token from any host-chain and trade them in the Dexalot L1 without traditional bridging.

Dexalot is bridge agnostic and currently supports ICM and LayerZero. Additional bridge providers will be added as needed. The default bridge provider is ICM (Avalanche's Interchain Messaging) within Avalanche echosystem & LayerZero for any other chains. The default bridge can't be disabled.
You can technically deposit with Avalanche's ICM and withdraw with LayerZero. This approach is allowing Dexalot to further reduce risk from single point of failure and for assets in chains other than Avalanche to be tradeable on the Dexalot L1.

It is perfectly sufficient for your trading application to interface with only the Dexalot L1 and use Dexalot frontend to perform deposit/withdraw operations manually whenever it is necessary.

Because of this novel architecture, your Dexalot L1 wallet can only house ALOT token and nothing else. That's why the Dexalot L1 wallet is referred to as the "Gas Tank". All of your holdings will be handled inside the PortfolioSub smart contract in the Dexalot L1.

Integration with the TradePairs & PorfolioSub in the Dexalot L1 will give you all the necessary tools/functions to trade including getting the order books, last trade, order status updates messages etc directly from the smart contracts.

If your trading application has a business need to deposit/withdraw more often, then your app will need to integrate with the PortfolioMain contracts in the host-chains as well to fully automate your flow.

WebSocket & REST API interfaces are optional and provided purely for convenience. Instead of directly reading from the chain, you can rely on the websocket interface for example, to get the order books. But the information in the ws will have to go through Dexalot’s backend before it reaches your app and may deliver the order books’ state a few milliseconds slower. In other words, Dexalot’s backend does exactly what your application would do on its own: Reading the order book from the chain and publishing it over the websocket. Similarly, any information received from the REST API is a drop-copy of a transaction that has already been confirmed on the blockchain.  Please refer to contracts documentation [here](/en/contracts) for interacting with the blockchain directly.

Needless to say, Dexalot does not require nor take custody of your private keys. Hence deposit/withdrawal or any trade functions can only be performed via its smart contracts. These functions are not supported via the RESTAPI nor WS.

### Simple

![Simplified architecture before and after Dexalot L1](/images/api/simple.png)

###  Detailed Dual-Chain (Feb-2023)

![Detailed dual-chain architecture](/images/api/detailed_dark1.png)

###  Omni-Chain (Apr 2024)

![Host-Chains & Dexalot L1 communication](/images/api/contracts_architecture_oct24.png)

## Docs

* [Rest Api](/en/apiv2/RestApi.md)
* [Contracts](/en/apiv2/Contracts.md)
* [Websocket](/en/apiv2/Websocket.md)
* [SimpleSwap](/en/apiv2/SimpleSwap.md)
