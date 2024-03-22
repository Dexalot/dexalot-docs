---
title: Dexalot Trading API (v2)
icon: link
next: RestApi
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
| v2.8 | 2024-03-22 |Added additional entries for new chains, affecting the following endpoints:<br>- [Get Environments](/apiv2/RestApi.md#get-environments)<br>- [Get Tokens](/apiv2/RestApi.md#get-tokens)<br>- [Get Deployment](/apiv2/RestApi.md#get-deployment-contract-addresses-and-abi)<br><br>Added executor address for [RFQ firm quote](/apiv2/SimpleSwap.md#_4-request-firm-quote).<br><br>Updated contract events for multichain, affecting the following events:<br>- [PortfolioUpdated](/contracts/interfaces/IPortfolio.html#portfolioupdated)<br>- [XChainXferMessage](/contracts/interfaces/IPortfolioBridge.html#xchainxfermessage) with new [Xfer](/contracts/interfaces/IPortfolio.html#xfer)<br>- [SwapExecuted](/contracts/MainnetRFQ.html#swapexecuted)|

## Architecture

Dexalot is a non-custodial multi-chain CLOB Dex that spans over the
Avalanche supported Dexalot Subnet(Subnet) and multiple host-chains (Mainnets).
Dexalot’s contracts don’t bridge any coins or tokens between chains,
but rather lock them in the Dexalot’s PortfolioMain contract in
the host-chain and then communicate the users’ holdings to its smart
contracts in the subnet for trading purposes. Dexalot is bridge
agnostic. You will be able to deposit with one bridge and withdraw with
another. Having said that, LayerZero has been the sole bridge provider
since we went live on Feb 1st, 2023 and we plan to add more bridges such
as AWM in the future.

It is perfectly sufficient for your trading application to interface
with only the Dexalot Subnet and use Dexalot frontend to perform
deposit/withdraw operations manually whenever it is necessary.

Because of this novel architecture, your subnet wallet can only house
ALOT token and nothing else. That's why the subnet wallet is referred to
as the "Gas Tank". All of your holdings will be handled inside the
PortfolioSub smart contract in the subnet.

Integration with the TradePairs & PorfolioSub in the subnet will give
you all the necessary tools/functions to trade including getting the
order books, last trade, order status updates messages etc directly from
the smart contracts.

If your trading application has a business need to deposit/withdraw more
often, then your app will need to integrate with the PortfolioMain
contracts in the host-chains as well to fully automate your flow.

WebSocket & REST API interfaces are optional and provided purely for
convenience. Instead of directly reading from the chain, you can rely on
the websocket interface for example, to get the order books. But the
information in the ws will have to go through Dexalot’s backend before
it reaches your app and may deliver the order books’ state a few
milliseconds slower. In other words, Dexalot’s backend does exactly what
your application would do on its own: Reading the order book from the
chain and publishing it over the websocket. Similarly, any information
received from the REST API is a drop-copy of a transaction that has
already been confirmed on the blockchain.  Please refer to contracts
documentation [here](/contracts) for interacting with the blockchain
directly.

Needless to say, Dexalot does not require nor take custody of your
private keys. Hence deposit/withdrawal or any trade functions can only
be performed via its smart contracts. These functions are not supported
via the RESTAPI nor WS.

### Simple

![Simplified architecture before and after subnet](/images/api/simple.png)

###  Detailed Dual-Chain

![Detailed dual-chain architecture](/images/api/detailed_dark1.png)

###  Multi-Chain

![Host-Chains & Subnet communication](/images/api/contracts_architecture.png)

## Docs

* [Rest Api](/apiv2/RestApi.md)
* [Contracts](/apiv2/Contracts.md)
* [Websocket](/apiv2/Websocket.md)
* [SimpleSwap](/apiv2/SimpleSwap.md)
