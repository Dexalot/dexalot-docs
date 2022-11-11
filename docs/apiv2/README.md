---
title: Dexalot Trading API (v2)
icon: link
next: RestApi
editLink: true
---

## Version History

<table>
<colgroup>
<col style="width: 9%" />
<col style="width: 17%" />
<col style="width: 73%" />
</colgroup>
<tr>
<th><strong>Version</strong></th>
<th><strong>Date</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>v2.0</td>
<td>2022-08-11</td>
<td>initial doc</td>
</tr>
<tr>
<td>v2.1</td>
<td>2022-08-17</td>
<td>- Added websocket authorization via getwstoken endpoint<br />
- errorcodes endpoint for smart contract errors<br />
- PortfolioMain contract invocations<br />
- TradePairs CancelReplace Function<br />
- Changed REST and WS endpoints<br />
- Fixed a typo under get open orders REST endpoint from
TradePairs.getOrder(symbol) to TradePairs.getOrder(bytes32 _orderId)<br />
- LayerZero will be the only and default bridge when going live and
other bridges will be added as needed.<br />
</td>
</tr>
<tr>
<td>v2.2</td>
<td>2022-08-21</td>
<td>Sample getClientOrderId</td>
</tr>
<tr>
<td>v2.3</td>
<td>2022-09-02</td>
<td>Updated api links after app switch</td>
</tr>
<tr>
<td>v2.4</td>
<td>2022-09-25</td>
<td>getNBuyBook getNSellBook replaced with a single getNBook
function</td>
</tr>
<tr>
<td>v2.5</td>
<td>2022-11-07</td>
<td>Websocket orderbook message changes:
    <ul>
        <li>(Breaking Change) Renamed "totals" field to "baseCumulative"</li>
        <li>Added "quoteCumulative" which shows the cumulative quote amount</li>
        <li>Added "quoteTotal" which shows quote asset orderbook line total</li>
    </ul>
</td>
</tr>
</table>

## Architecture

Dexalot lives in a dual chain environment. Avalanche Mainnet
C-Chain(mainnet) and Avalanche supported Dexalot Subnet(subnet).
Dexalot’s contracts don’t bridge any coins or tokens between these 2
chains, but rather lock them in the Dexalot’s PortfolioMain contract in
the mainnet and then communicate the users’ holdings to its smart
contracts in the subnet for trading purposes. Dexalot is bridge
agnostic. You will be able to deposit with one bridge and withdraw with
another. Having said that, we are planning to have LayerZero as the sole
bridge provider when we go live and add on more bridges in the future.

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
contract in the mainnet as well to fully automate your flow.

WebSocket & REST API interfaces are optional and provided purely for
convenience. Instead of directly reading from the chain, you can rely on
the websocket interface for example, to get the order books. But the
information in the ws will have to go through Dexalot’s backend before
it reaches your app and may deliver the order books’ state a few
milliseconds slower. In other words, Dexalot’s backend does exactly what
your application would do on its own: Reading the order book from the
chain and publishing it over the websocket. Similarly, any information
received from the REST API is a drop-copy of a transaction that has
already been confirmed on the blockchain.

Needless to say, Dexalot does not require nor take custody of your
private keys. Hence deposit/withdrawal or any trade functions can only
be performed via its smart contracts. These functions are not supported
via the RESTAPI nor WS.

### Simple

![Simplified architecture before and after subnet](/images/api/simple.png)

###  Detailed

![Detailed dual-chain architecture](/images/api/detailed_dark1.png)

## Docs

* [Rest Api](/apiv2/RestApi.md)
* [Contracts](/apiv2/Contracts.md)
* [Websocket](/apiv2/Websocket.md)
