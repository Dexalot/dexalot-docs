# Dexalot Trading API (v2)

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
<td></td>
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

![Detailed dual-chain architecture](/images/api/detailed.png)

## Rest API

### Server Urls

**TestNet**:

[api.dexalot-test.com/api/](https://api.dexalot-test.com/api/)

**Mainnet**:

[api.dexalot.com/api/](https://api.dexalot-test.com/api/)
**(part of the functionality listed on this doc is not supported yet in
production and will only be available with the subnet deployment )**

**Dexalot Contracts**:

[github.com/Dexalot/contracts/tree/main/contracts](https://github.com/Dexalot/contracts/tree/main/contracts)

### Get Environments

GET /trading/environments

#### Description

Returns an array of current blockchain environments. There will always be
2 sub-environments of types mainnet and subnet returned. They are both tied
to a single parentenv.

#### Sample Request

https://api.dexalot-test.com/api/trading/environments

#### Sample Response

```json
[
    {
        "parentenv": "fuji-multi",
        "env": "fuji-multi-mainnet",
        "type": "mainnet",
        "chain_instance": "https://api.avax-test.network/ext/bc/C/rpc",
        "chain_id": 43113,
        "chain_name": "Avalanche Fuji C-Chain",
        "native_token_name": "Avalanche",
        "native_token_symbol": "AVAX",
        "lzchain_id": 10006,
        "explorer": "https://testnet.snowtrace.io/",
        "token_url": "https://testnet.snowtrace.io/address/"
    },

    {...}
]
```

### Get Tokens

GET /trading/tokens

#### Description

Returns an array of available tokens. This will always return the
mainnet token list as Dexalot subnet does not allow any ERC20
deployments.

#### Sample Request

https://api.dexalot-test.com/api/trading/tokens

#### Sample Response

```json
[
    {
        "env": "fuji-multi-mainnet",
        "symbol": "ALOT",
        "name": "Dexalot Token",
        "isnative": false,
        "address": "0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6",
        "evmdecimals": 18,
        "status": "deployed",
        "auctionmode": 0
    },
    {
        "env": "fuji-multi-mainnet",
        "symbol": "AVAX",
        "name": "AVAX",
        "isnative": true,
        "address": null,
        "evmdecimals": 18,
        "status": "deployed",
        "auctionmode": 0
    },
    {
        "env": "fuji-multi-mainnet",
        "symbol": "ETH",
        "name": "Mock ETH",
        "isnative": false,
        "address": "0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C",
        "evmdecimals": 18,
        "status": "deployed",
        "auctionmode": 0
    },
    {
        "env": "fuji-multi-mainnet",
        "symbol": "SER",
        "name": "GM SER",
        "isnative": false,
        "address": "0xf52602253474ddaF6111133ADc1F7C3d28A30ABd",
        "evmdecimals": 18,
        "status": "deployed",
        "auctionmode": 0
    },
    {
        "env": "fuji-multi-mainnet",
        "symbol": "USDC",
        "name": "Mock USDC",
        "isnative": false,
        "address": "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54",
        "evmdecimals": 6,
        "status": "deployed",
        "auctionmode": 0
    },
    {
        "env": "fuji-multi-mainnet",
        "symbol": "USDT.e",
        "name": "Mock USDT.e",
        "isnative": false,
        "address": "0x2B62a6c0C750250034e328547Aa38830bd768a18",
        "evmdecimals": 6,
        "status": "deployed",
        "auctionmode": 0
    }
]
```

### Get Pairs

GET /trading/pairs

#### Description

Returns an array of available markets (trade pairs). This will always
return the subnet pairs list as markets, as trade pairs and order books
can only exist in the Dexalot subnet. ( Note: Base & Quote address will
always show the mainnet token addresses for consistency)

#### Sample Request

https://api.dexalot-test.com/api/trading/pairs

#### Sample Response

```json
[
    {
        "env": "fuji-multi-subnet",
        "pair": "ALOT/AVAX",
        "base": "ALOT",
        "quote": "AVAX",
        "basedisplaydecimals": 1,
        "quotedisplaydecimals": 4,
        "baseaddress": "0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6",
        "quoteaddress": null,
        "mintrade_amnt": "0.300000000000000000",
        "maxtrade_amnt": "4000.000000000000000000",
        "base_evmdecimals": 18,
        "quote_evmdecimals": 18,
        "auctionmode": 0,
        "auctionendtime": null,
        "status": "deployed"
    },
    {
        "env": "...",
        "pair": "..."
    }
]
```

### Get Deployment (Contract Addresses and ABI)

GET /trading/deployment/params?contracttype=contract_type&returnAbi=true&env=sub-env

*Note: the previous trading/deploymentabi endpoint has been retired*

#### Description

Returns the deployment details of the Dexalot contracts including their abi

#### Query Parameters

| **Field Name**       | **Sample Value**                                 |
|----------------------|--------------------------------------------------|
| contractType         | \[Exchange, Portfolio, TradePairs, Orderbooks…\] |
| returnAbi (optional) | true/false                                       |
| env (optional)       | Filters by env (e.g. fuji-multi-subnet)          |

#### Sample Request

https://api.dexalot-test.com/api/trading/deployment/params?contracttype=Exchange&returnAbi=true&env=fuji-multi-subnet

#### Sample Response

```json
[
    {
        "parentenv": "fuji-multi",
        "env": "fuji-multi-subnet",
        "env_type": "subnet",
        "contract_name": "ExchangeSub",
        "contract_type": "Exchange",
        "address": "0x93c317288E89e515a5e708C0d24867ac3bfeCA76",
        "impl_address": "0x45c38C510a0caCC986E444c082AF1ce5248EE105",
        "version": "2.0.0",
        "owner": "0xbFD53904e0A0c02eFB7e76aad7FfB1F476320038",
        "status": "deployed",
        "action": null,
        "abi": null
    }
]
```

### Get Open Orders

GET /trading/openorders/params?traderaddress=' + wallet + '&pair=' + strPair

#### Description

Returns an array of all currently open orders for the given trade pair
and address. The open orders are retrieved from our postgres database
for speed. Hence there could be some delays between the order’s
blockchain state and Dexalot db state. Always check the latest status of
your orders with the tradePairs contract call
`TradePairs.getOrder(bytes32 _orderId)` below in the Contract Invocation
Section

#### Query Parameters

| **Field Name** | **Sample Value**                           |
|----------------|--------------------------------------------|
| traderaddress  | 0x55c66320CEB54Ad680ffae12e6A09603cbA0db70 |
| pair           | AVAX/USDC                                  |

#### Sample Request

https://api.dexalot-test.com/api/trading/openorders/params?traderaddress=0x55c66320CEB54Ad680ffae12e6A09603cbA0db70&pair=AVAX/USDC

#### Sample Response

```json
{
    "count": 1,
    "rows": [
        {
            "env": "fuji-multi-subnet",
            "id": "0x0000000000000000000000000000000000000000000000000000000062efccbb",
            "traderaddress": "0x55c66320ceb54ad680ffae12e6a09603cba0db70",
            "clientordid": "0xdf906c8a90da234e24c19275fdf512e91c3ad970c28820fd882e6ccf9da40608",
            "tx": "0x38c720ffd81157a269c564b37c322e2536ef8ab209028250586c27af62e50c3f",
            "pair": "AVAX/USDC",
            "type": 1,
            "type2": 0,
            "side": 0,
            "price": "25.000000000000000000",
            "quantity": "7.000000000000000000",
            "totalamount": "0.000000000000000000",
            "status": 0,
            "ts": "2022-08-10T18:57:50.000Z",
            "quantityfilled": "0.000000000000000000",
            "totalfee": "0.000000000000000000",
            "update_ts": "2022-08-10T18:57:50.000Z"
        }
    ]
}
```

###  Get Trader history

GET trading/traderhistory/params?traderaddress=&periodfrom=&periodto=&onlyfills

#### Description

Returns full trading history for the given address. If onlyfills is
used, returns only filled transactions (trades) . Maximum 90 days and/or
500 records returned.

#### Query Parameters

| **Field Name**                                   | **Sample Value**                                      |
|--------------------------------------------------|-------------------------------------------------------|
| traderaddress                                    | 101                                                   |
| periodfrom (optional, default : from 7 days ago) | 2022-03-02T00:00:00.000Z                              |
| periodto (optional, default : current_time)      | 2022-04-11T00:00:00.000Z                              |
| onlyfills (optional, default: all txs)           | do not include if you want all transactions returned. |

#### Sample Requests

https://api.dexalot-test.com/api/trading/traderhistory/params?traderaddress=0x55c66320CEB54Ad680ffae12e6A09603cbA0db70

https://api.dexalot-test.com/api/trading/traderhistory/params?traderaddress=0x55c66320CEB54Ad680ffae12e6A09603cbA0db70&onlyfills

https://api.dexalot-test.com/api/trading/traderhistory/params?traderaddress=0x55c66320CEB54Ad680ffae12e6A09603cbA0db70&periodfrom=2022-08-02T00:00:00.000Z&periodto=2022-08-11T00:00:00.000Z

#### Sample Response

```json
[
    {
        "traderaddress": "0x55c66320CEB54Ad680ffae12e6A09603cbA0db70",
        "id": "0x0000000000000000000000000000000000000000000000000000000062efccb5",
        "tx": "0x1ddcced430085902734bee4da8609c57e55203cdd3bffb088d07439394d8614c",
        "pair": "ETH/USDC",
        "side": 0,
        "type": "FILLED",
        "blocknumber": "122926",
        "gasused": 433461,
        "gasprice": "2.5",
        "gasinnative": "0.0010836525",
        "execid": 1659882678,
        "execquantity": "2",
        "execprice": "19",
        "fee": "0.004",
        "feetype": "T",
        "feeunit": "ETH",
        "ts": "2022-08-09T20:11:41.000Z"
    }
]
```

### Get Error Codes

GET /trading/errorcodes

#### Description

This endpoint will return all of the revert reason codes with descriptions

#### Sample Request

https://api.dexalot-test.com/api/trading/errorcodes

#### Sample Response

```json
{
    "version": 2,
    "reasons": {
        "A-CNET-01": "Airdrop: contract does not have enough tokens",
        "A-MPNV-01": "Airdrop: Merkle proof is not valid for claim",
        "A-MPNV-02": "Airdrop: Merkle proof is not valid for releasableAmount",
        "A-NTAD-01": "Airdrop: no tokens are due for claim",
        ...
    }
}
```

### Get Websocket Token

POST /auth/getwstoken

#### Description

Get Websocket Token endpoint will provide a temporary token which can be
used to open a websocket connection to our servers in order to listen or
query data. (See: Websocket Interface section for details)

#### Sample

```json
post data: {
    "api_key" : [api_key]
}
```

#### Sample response

```json
{
    "token": "5fd5e09c-f5c0-491b-91b3-4240d38901d3"
}
```

## Web Socket Interface (Draft)

### Server Urls

Testnet: [wss://api.dexalot-test.com>](https://api.dexalot-test.com/api/)

Mainnet: [wss://api.dexalot.com](https://api.dexalot-test.com/api/) (Behind CORS)

A token authorization will be required around Sep 2nd, 2022.

In order to create a web socket connection:

1.  A web socket connection token will be requested via auth/getws
endpoint (see Rest Api section for details). This endpoint
requires an API key and provides you a temporary token (valid for
60 seconds) . You can request the API key from Dexalot team.
2.  Next step would be to initiate a web socket connection against
    Dexalot backend using this token. \
    wss://api.dexalot-dev.com?wstoken=ff0d8450-3e86-49ff-91fb-37156615c6ee
3.  If your token expires you can request a new one using Step 1.

### Web Socket subscribe/unsubscribe

Note: Please always unsubscribe whenever it is architecturally sound in your app.

```ts
export enum SUBSCRIPTION {
    subscribe: "subscribe",
    unsubscribe: "unsubscribe",
    chartsubscribe: "chartsubscribe",
    chartunsubscribe: "chartunsubscribe",
    marketSnapshotSubscribe: "marketsnapshotsubscribe",
    marketSnapshotUnsubscribe: "marketsnapshotunsubscribe"
}
```

### Sample Code for subscribe/unsubscribe

```ts
subscribe() {
    const acct = store.state.activeAccount
    const decimal = store.getters.selectedOrderbookDecimal
    const msg: any = {
        data: this.name,
        pair: this.name,
        type: SUBSCRTIPTION.subscribe,
    }

    if (acct) {
        msg.traderaddress = acct
    }

    if (decimal !== null) {
        msg.decimal = decimal
    }

    socket.send(JSON.stringify(msg))
}
```

```ts
unsubscribe() {
    const acct = store.state.activeAccount
    const decimal = store.getters.selectedOrderbookDecimal
    const msg: any = {
        data: this.name,
        pair: this.name,
        type: SUBSCRTIPTION.unsubscribe,
    }

    if (acct) {
        msg.traderaddress = acct
    }

    if (decimal !== null) {
        msg.decimal = decimal
    }

    socket.send(JSON.stringify(msg))
}
```

```ts
chartSubscribe(charttype: string) {
    if (this.auctionMode) {
        return
    }

    const acct = store.state.activeAccount
    const msg: any = {
        data: this.name,
        pair: this.name,
        chart: charttype,
        type: SUBSCRTIPTION.chartsubscribe,
    }

    if (acct) {
        msg.traderaddress = acct
    }

    socket.send(JSON.stringify(msg))
}
```

```ts
chartUnsubscribe(charttype: string) {
    const acct = store.state.activeAccount
    const msg: any = {
        data: this.name,
        pair: this.name,
        chart: charttype,
        type: SUBSCRTIPTION.chartunsubscribe,
    }

    if (acct) {
        msg.traderaddress = acct
    }

    socket.send(JSON.stringify(msg))
}
```

### Message Types Published by the Server over WebSocket

```ts
export type SOCKET_DATA_TYPES =
    | 'orderBooks'
    | 'lastTrade'
    | 'marketSnapShot'
    | 'chartSnapShot'
    | 'Prices'
    | 'APP_VERSION'
    | 'auctionData'
```

#### ChartSnapShot

![Chart snaphot in JS console](/images/api/chart_snapshot.png)

```ts
export interface WsRawChartSnapshot {
    data: CandleDataRaw[] | CandleDataRaw
    type: string
    pair: string
}
```

```ts
export interface CandleDataRaw {
    open: string
    close: string
    high: string
    low: string
    change: string
    date: string
    volume: string
    }
```

#### OrderBooks

OrderBooks can also be accessed directly from the blockchain itself. And
orderbooks provided by the websocket interface will inherently have a
small delay compared to its blockchain state.

![OrderBooks in JS console](/images/api/orderbooks.png)

```ts
export interface WsRawOrderbookData {
    data: WsOrderbookData
    pair: string
    decimal: number
    type: string
}
```

```ts
export interface WsOrderbookData {
    buyBook: WsSinglebook[]
    sellBook: WsSinglebook[]
}
```

```ts
export interface WsSinglebook {
    prices: string
    quantities: string
    totals?: string
}
```

#### MarketSnapShot

![MarketSnapShots in JS console](/images/api/market_snapshots.png)

```ts
export interface MarketsSnapData {
    change: string
    close: string
    date: string
    high: string
    low: string
    open: string
    pair: string
    volume: string
}
```

#### Prices

![Prices in JS console](/images/api/prices.png)

```ts
export interface WsPricesData {
    base: string
    baseinUsd: string
    last: string
    pair: string
    quote: string
    quoteinUsd: string
}
```

#### APP VERSION

This is backend application version

![APP_VERSION in JS console](/images/api/app_version.png)

#### LastTrade

![LastTrade in JS console](/images/api/last_trade.png)

```ts
export interface WsRawTradeHistory {
    data: WsTradeHistoryData[]
    pair: string
    type: string
}
```

```ts
export interface WsTradeHistoryData {
    execId?: number
    price: string
    quantity: string
    takerside?: number
    ts: string
}
```

## Subnet Contract Invocations

1. Perform "Deposit to subnet" from the frontend for each token of
the tradepair you will be market making.

![Deposit to Subnet](/images/api/deposit_to_subnet.png)

This may take anywhere between 20 seconds to 2 minutes depending on the
bridge used. This action will automatically remove a set amount from the
token transferred and add an equivalent amount of ALOT into your subnet
wallet in case you don’t have enough ALOT in your subnet wallet.

2. Get a reference to TradePairs contract in the subnet using the
GetDeployment REST API EndPoint

`trading/deployment/params?contractType=TradePairs&returnAbi=true&env=fuji-multi-subnet`

You need this reference to add/cancel/check status of the orders , get
orderbook from the chain and listen to various events emitted from the
tradePairs.

3. get the reference to PortfolioSub Contract as well

`trading/deployment/params?contractType=Portfolio&returnAbi=true&env=fuji-multi-subnet`

You will need this to fill up your gas tank to be able to continue to
perform transactions in our subnet when you are running low. You can
choose to not automate this part either and just use Dexalot frontend
instead.

You also need this contract to check your balances of your holdings in
the subnet.

### Order Enum Type Reference

```ts
static OrderStatus: any = {
    "0": "NEW",
    "1": "REJECTED", // not used
    "2": "PARTIAL",
    "3": "FILLED",
    "4": "CANCELED",
    "5": "EXPIRED",  // not used
    "6": "KILLED"
}
```

```ts
static OrderSide: any = {
 "BUY": 0
 "SELL": 1 }
```

```ts
static OrderType1 = {
"0": "MARKET",
"1": "LIMIT",
"2": "STOP",     // not used
"3": "STOPLIMIT" // not used }
```

```ts
static OrderType2 = {
    "0": "GTC"   // Good Till Cancel,
    "1": "FOK"   // Fill or Kill - requires immediate full fill or reverts
    "2": "IOC"   // Immediate or Cancel - gets any fills & then canceled Remaining will not go in the orderbook
    "3": "PO"    // Post Only - Requires to go in the orderbook without any fills or reverts
 }
```

 ```ts
static BridgeProvider = {
    "0" - LayerZero,
    "1" - CELER --not used
}
 ```

### TradePairs Contract (Only in Subnet)

#### Events

##### OrderStatusChanged

```solidity
 event OrderStatusChanged(
    uint8 version,
    address indexed traderaddress,
    bytes32 indexed pair,
    bytes32 orderId,
    bytes32 clientOrderId,
    uint price,
    uint totalamount,
    uint quantity,
    Side side,
    Type1 type1,
    Type2 type2,
    Status status,
    uint quantityfilled,
    uint totalfee
);
 ```

<table>
<colgroup>
<col style="width: 16%" />
<col style="width: 12%" />
<col style="width: 70%" />
</colgroup>
<thead>
<tr>
<th><strong>Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>version</td>
<td>uint8</td>
<td>event version</td>
</tr>
<tr>
<td>traderaddress</td>
<td>address</td>
<td>traders’s C chain wallet</td>
</tr>
<tr>
<td>pair</td>
<td>bytes32</td>
<td>traded pair. ie. ALOT/AVAX in bytes32</td>
</tr>
<tr>
<td>orderId</td>
<td>bytes32</td>
<td>unique order id assigned by the contract</td>
</tr>
<tr>
<td>clientOrderId</td>
<td>bytes32</td>
<td>order id given by the owner of the order as a reference. Please make
sure that this is unique per traderid otherwise it will be
rejected.</td>
</tr>
<tr>
<td>price</td>
<td>uint</td>
<td>price of the order entered by the trader. (0 if market order)</td>
</tr>
<tr>
<td>totalamount</td>
<td>uint</td>
<td>cumulative amount in quote currency. ⇒ price* quantityfilled . If
multiple partial fills , the new partial fill price*quantity is added to
the current value in the field. Average execution price can be quickly
calculated by totalamount/quantityfilled regardless of the number of
partial fills at different prices.</td>
</tr>
<tr>
<td>quantity</td>
<td>uint</td>
<td>order quantity</td>
</tr>
<tr>
<td>side</td>
<td>Side</td>
<td>Order side (see Order reference Data)</td>
</tr>
<tr>
<td>type1</td>
<td>Type1</td>
<td>(see Order reference Data)</td>
</tr>
<tr>
<td>type2</td>
<td>Type2</td>
<td>(see Order reference Data)</td>
</tr>
<tr>
<td>status</td>
<td>Status</td>
<td>Order Status (see Order reference Data)</td>
</tr>
<tr>
<td>quantityfilled</td>
<td>uint</td>
<td>cumulative quantity filled</td>
</tr>
<tr>
<td>totalfee</td>
<td>uint</td>
<td>Cumulative fee paid for the order (total fee is always in terms
of received currency. ie. if Buy ALOT/AVAX, fee is paid in ALOT, if Sell
ALOT/AVAX, fee is paid in AVAX<br />
Note: Order price can be different than the execution price.</td>
</tr>
</thead>
<tbody>
</tbody>
</table>

#### Executed

```solidity
event Executed(
    uint8 version,
    bytes32 indexed pair,
    uint price,
    uint quantity,
    bytes32 makerOrder,
    bytes32 takerOrder,
    uint feeMaker,
    uint feeTaker,
    Side takerSide,
    uint execId,
    address indexed addressMaker,
    address indexed addressTaker
);
```

| **Field Name** | **Type**      | **Description**                                                                                                                                                                                                                                                                                                                         |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version        | uint8 version | event version                                                                                                                                                                                                                                                                                                                           |
| pair           | bytes32       | traded pair. ie. ALOT/AVAX in bytes32                                                                                                                                                                                                                                                                                                   |
| price          | uint          | executed price                                                                                                                                                                                                                                                                                                                          |
| quantity       | uint          | executed quantity                                                                                                                                                                                                                                                                                                                       |
| makerOrder     | bytes32       | Maker Order id                                                                                                                                                                                                                                                                                                                          |
| takerOrder     | bytes32       | Taker Order id                                                                                                                                                                                                                                                                                                                          |
| feeMaker       | uint          | fee paid by maker                                                                                                                                                                                                                                                                                                                       |
| feeTaker       | uint          | fee paid by taker                                                                                                                                                                                                                                                                                                                       |
| takerSide      | Side          | Side of the taker order. 0 - BUY, 1- SELL (Note: This can be used to identify the fee UNITs. If takerSide= 1, then the fee is paid by the Maker in Base Currency and the fee paid by the taker in Quote currency. If takerSide= 0 then the fee is paid by the Maker in Quote Currency and the fee is paid by the taker in Base currency |
| execId         | uint          | Unique trade id (execution id) assigned by the contract                                                                                                                                                                                                                                                                                 |
| addressMaker   | address       | maker traderaddress                                                                                                                                                                                                                                                                                                                     |
| addressTaker   | address       | taker traderaddress                                                                                                                                                                                                                                                                                                                     |

#### Functions

##### Get Order

```solidity
function getOrder(
    bytes32 _orderId
)
public
view
returns (
    struct ITradePairs.Order
)
```

###### Description

Returns the details of the order given

###### Inputs

| **Field Name** | **Type** | **Sample Value**                                                   |
|----------------|----------|--------------------------------------------------------------------|
| orderId        | bytes32  | 0x8f0bd43379dae5fc0000d81d4b4d2cf04f8b1c4145723c689f3dcb92dcdbf40c |

**Sample Contract Call**

tradePairsContract.getOrder("0x8f0bd43379dae5fc0000d81d4b4d2cf04f8b1c4145723c689f3dcb92dcdbf40c")

##### Get Order By Client Id

```solidity
function getOrderByClientOrderId(
    address _trader,
    bytes32 _clientOrderId
)
```

###### Description

Returns the details of the order with the given trader address and client order id

###### Inputs

| **Field Name** | **Type** | **Sample Value** |
|----------------|----------|------------------|
| trader         | address  |                  |
| clientOrderId  | bytes32  |                  |

##### Add Order

```solidity
function addOrder(
    address _trader,
    bytes32 _clientOrderId,
    bytes32 _tradePairId,
    uint256 _price,
    uint256 _quantity,
    enum ITradePairs.Side _side,
    enum ITradePairs.Type1 _type1,
    enum ITradePairs.Type2 _type2
)
```

###### Description

Adds an order with the given fields. As a general rule of thumb
msg.sender should be the `_trader` otherwise the tx will revert. Only
certain privileged Dexalot smart contracts can send orders on behalf of
somebody else. 'OrderStatusChanged' event will be emitted when an order
is received and committed to the blockchain. You can get the contract
generated orderid along with your clientorderid from this event.
When the blockchain is extremely busy, the transactions are queued up in
the mempool and prioritized based on their gas price. We have seen
orders waiting for hours in the mempool in Avalanche C-Chain , before
they are committed. This is a function of the blockchain and will
typically happen when the current gas price is 100 gwei (2 times the
usual gas price) and your transaction maximum gas is set to be 50
gwei(normal level). Your transaction will wait in the mempool until the
blockchain gas price goes back to normal levels.

###### Inputs

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 28%" />
<col style="width: 58%" />
</colgroup>
<tr>
<th><strong>Field Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>_trader</td>
<td>address</td>
<td>address of the trader</td>
</tr>
<tr>
<td>_clientOrderId</td>
<td>bytes32</td>
<td>clientorderid is provided by the owner of the order and it is
returned in responses for reference. Note: must be unique</td>
</tr>
<tr>
<td>_tradePairId</td>
<td>bytes32</td>
<td>pair</td>
</tr>
<tr>
<td>_price</td>
<td>uint256</td>
<td><p>price of the limit order. 0 for market Orders (type1=0).</p>
<p>Note: price increment(baseDisplayDecimals) &amp; evm decimals can be
obtained from the getPairs REST API.</p></td>
</tr>
<tr>
<td>_quantity</td>
<td>uint256</td>
<td>quantity increment(quoteDisplayDecimals) &amp; evm decimals can be
obtained from the getPairs REST API</td>
</tr>
<tr>
<td>_side</td>
<td>enum ITradePairs.Side</td>
<td>Side of the order ( see Order reference Data)</td>
</tr>
<tr>
<td>_type1</td>
<td>enum ITradePairs.Type1</td>
<td>Type of the order , LIMIT, MARKET … ( see Order reference Data)</td>
</tr>
<tr>
<td>_type2</td>
<td>enum ITradePairs.Type2</td>
<td>SubType of the order (see Order reference Data)<br />
Default 0:GTC</td>
</tr>
</table>

**Sample Contract Call**

```ts
const tx = await tradePairsContract.addOrder(
    traderaddress,
    clientorderid,
    tradePairByte32,
    utils.parseUnits(price.toFixed(this.quoteDisplayDecimals), this.quoteDecimals),
    utils.parseUnits(quantity.toFixed(this.baseDisplayDecimals), this.baseDecimals),
    side,
    type1,
    options
);

const orderLog = await tx.wait();

if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee
                    );
                }
            }
        }
    }
}
```

##### Cancel Order

```solidity
function cancelOrder(
    bytes32 _orderId
)
```

###### Description

Cancels the specified order

###### Inputs

| **Field Name** | **Type** | **Description**         |
|----------------|----------|-------------------------|
| _orderId      | bytes32  | order id to be canceled |

**Sample Contract Call**

```ts
const tx = await this.tradePair.cancelOrder(order.id, options);
const orderLog = await tx.wait();
if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee
                    );
                }
            }
        }
    }
}
```

##### Cancel All Orders

```solidity
function cancelAllOrders(
    bytes32[] _orderIds
)
```

###### Description

Cancels all orders contained in the given array of order ids

###### Inputs

<table>
<colgroup>
<col style="width: 24%" />
<col style="width: 23%" />
<col style="width: 52%" />
</colgroup>
<tr>
<th><strong>Field Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>_orderId</td>
<td>Array of orderIds</td>
<td>order ids to be canceled as an array.<br />
Note: It is not advised to send an array more than 15-20 ids to avoid
running out of gas</td>
</tr>
</table>

**Sample Contract Call:**

```ts
const tx = await this.tradePair.cancelAllOrders(orderIds.slice(1,
Math.min(20,orderIds.length-1)), options);

const orderLog = await tx.wait();
if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee
                    );
                }
            }
        }
    }
}
```

##### Get Order Book From Chain

```solidity
function getNBook(
    bytes32 _tradePairId,
    Side _side,
    uint256 _nPrice,
    uint256 _nOrder,
    uint256 _lastPrice,
    bytes32 _lastOrder
)
public
view
returns (
    uint256[],
    uint256[],
    uint256, bytes32
);
```

###### Description

Returns orderbook (buy or sell) for the given tradepair

Note: Although this is a view function, it will run out of gas in case
you try to get the entire order book with a lot of orders. That's why it
has nPrice and nOrder parameters for pagination, i.e.

`this.tradePair.getNBook(this.tradePairByte32,0, 2, 50, 0, utils.fromUtf8(''))`

will get the best 2 buy price point (top of
the buy book and the next best price and it will aggregate up to 50
orders at a time when generating the orderbook).

###### Inputs

| **Field Name** | **Type** | **Description**                                                                                                     |
|----------------|----------|---------------------------------------------------------------------------------------------------------------------|
| _tradePairId   | bytes32  | pair in bytes32                                                                                                     |
| _side          | Side     | 0 for BuyBook, 1 for SellBook                                                                                       |
| _nPrice        | uint256  | depth requested. If 1, top of the book, if 2 best 2 prices etc…                                                     |
| _nOrder        | uint256  | number of orders to be retrieved at the price point                                                                 |
| _lastPrice     | uint256  | the price point to start at in case a loop is used to get the entire order book. Use 0 for small requests           |
| _lastOrder     | bytes32  | the orderid used in case a loop is used to get the entire order book. Use empty string in bytes32 for small request |

**Sample Contract Call:**

```ts
async getBookfromChain() {
    try {
        var borders = await this.tradePair.getNBook(this.tradePairByte32, 0, 2, 50, 0, utils.fromUtf8(''));
        var sorders = await this.tradePair.getNBook(this.tradePairByte32, 1, 2, 50, 0, utils.fromUtf8(''));
        var buyOrderArray = [];
        var sellOrderArray = [];
        sellOrderArray.push(sorders[0].toString(),sorders[1].toString());
        buyOrderArray.push(borders[0].toString(),borders[1].toString());
        return {buyBook: buyOrderArray, sellBook: sellOrderArray};
    } catch (error) {
        this.logger.error (`${this.instanceName} Error during getBookfromChain`, error);
    }
}
```

##### Cancel and Replace Order

```solidity
function cancelReplaceOrder(
    bytes32 _orderId,
    bytes32 _clientOrderId,
    uint _price,
    uint _quantity
)
```

###### Description

Cancels the given order and replaces it with one for the same pair with
the given price and quantity. You can’t change the type1 or type2 of the
original order entered. This function cancels and removes the original
order from the orderbook and enters a new one. Hence the original
order’s time priority will be lost.

###### Inputs

| **Field Name**  | **Type** | **Description**            |
|-----------------|----------|----------------------------|
| _orderId        | bytes32  | Id of the order to cancel  |
| _clientOrderId  | bytes32  |                            |
| _price          | uint     | Price of the new order     |
| _quantity       | uint     | Quantity for the new order |

**Sample Contract Call:**

### PortfolioMain (Only in Mainnet)

Your PorfolioSub can only be funded by PortfolioMain. Having said that,
you don’t have to interface with PortfolioMain and can easily perform
the initial deposits functions using Dexalot’s frontend to fund your
Subnet portfolio. If your subnet wallet doesn’t have any ALOT balance ,
this process will automatically remove a small amount of token
transferred from your balance and deposit an equivalent amount of ALOT
to your subnet wallet (Gas Tank). The ALOT amount deposited to your Gas
Tank should be able to give you 3 to 5 transactions and you’ll need to
buy more ALOT and fill up your Gas Tank to continue your trading.

#### Deposit Native

```solidity
function depositNative(
    address payable _from,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to deposit your tokens/coins from your mainnet wallet.
The amount will be locked in the PortfolioMain and then communicated to
PortfolioSub via the selected bridge for trading purposes.

Inputs

| **Field Name** | **Type**                  | **Description**                                                    |
|----------------|---------------------------|--------------------------------------------------------------------|
| _from          | address payable           | wallet address                                                     |
| _bridge        | IPortfolio.BridgeProvider | bridge provider (see [reference data](#order-enum-type-reference)) |

##### Example Code

```ts
await portfolio.depositNative(owner.address, {value: Utils.toWei(deposit_amount)}, 0);
```

#### Deposit Token

```solidity
function depositToken(
    address _from,
    bytes32 _symbol,
    uint _quantity,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to deposit your ERC20 from your mainnet wallet. The
amount will be locked in the PortfolioMain and then communicated to
PortfolioSub via the selected bridge for trading purposes.

##### Inputs

| **Field Name** | **Type**                  | **Description**                                                    |
|----------------|---------------------------|--------------------------------------------------------------------|
| _from          | address payable           | wallet address                                                     |
| _symbol        | bytes32                   | token symbol to deposit                                            |
| _quantity      | uint                      | amount of tokens to deposit                                        |
| _bridge        | IPortfolio.BridgeProvider | bridge provider (see [reference data](#order-enum-type-reference)) |

##### Example Code

```ts
await portfolioMain.depositToken(owner.address, USDT, Utils.toWei(deposit_amount), 0);
```

#### getTokenDetails

```solidity
function getTokenDetails(bytes32 _symbol)
```

##### Description

Inputs

| Field Name | Type    | Description  |
|------------|---------|--------------|
| _symbol    | bytes32 | token symbol |

##### Example Code

```ts
await portfolio.getTokenDetails(Utils.fromUtf8(td.symbol));
```

### PortfolioSub Contract (Only in Subnet)

#### Get Portfolio Balance

```solidity
function getBalance(
    address _owner,
    bytes32 _symbol
)
```

##### Description

Returns the total and available balance for the given token (symbol)
within the given portfolio (address). Any open orders will reduce your
available balance to ensure the settlement in case there is a trade.

##### Inputs

| **Field Name** | **Type** | **Description**                              |
|----------------|----------|----------------------------------------------|
| _owner         | bytes32  | wallet address                               |
| _symbol        | bytes32  | symbol in bytes32 (AVAX or any token symbol) |

##### Example Code

```ts
bal = await this.portfolio.getBalance(this.account, this.baseByte32);
balanceTotal = utils.formatUnits(bal.total, this.baseDecimals);
balanceAvail = utils.formatUnits(bal.available, this.baseDecimals);
```

#### Deposit Native (Add gas to tank)

```solidity
function depositNative(
    address payable _from,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to transfer ALOT from your Portfolio to your subnet
wallet. You need to do this to fill up gas tank to continue to perform
transactions.

##### Inputs

| **Field Name** | **Type**                  | **Description** |
|----------------|---------------------------|-----------------|
| _from          | address payable           | wallet address  |
| 2nd Parameter  | IPortfolio.BridgeProvider | not used        |

##### Example Code

```ts
await portfolio.depositNative(owner.address, {value:
Utils.toWei(deposit_amount)});
```

#### Withdraw Native (Remove excess gas from your tank)

```solidity
function withdrawNative(
    address payable _to,
    uint _quantity
)
```

##### Description

Use this function to transfer ALOT from your subnet wallet to your
Portfolio in case you are holding too much ALOT.

##### Inputs

| **Field Name** | **Type**        | **Description**            |
|----------------|-----------------|----------------------------|
| _to            | address payable | wallet address             |
| _quantity      | uint            | amount of ALOT to transfer |

##### Example Code

```ts
await portfolio.withdrawNative(owner.address, Utils.toWei("5"));
```

#### Withdraw Token

```solidity
function withdrawToken(
    address _to,
    bytes32 _symbol,
    uint _quantity,
    BridgeProvider _bridge
)
```

##### Description

Use this function to transfer any tokens or natives (including ALOT &
AVAX) from your subnet Portfolio to your mainnet wallet

##### Inputs

| **Field Name** | **Type**       | **Description**                              |
|----------------|----------------|----------------------------------------------|
| _to            | address        | wallet address                               |
| _symbol        | bytes32        | symbol in bytes32 (AVAX or any token symbol) |
| _bridge        | BridgeProvider | 0 - LayerZero                                |

##### Example Code

```ts
await portfolio.withdrawToken(owner.address, USDT, Utils.toWei(withdrawal_amount));
```

#### Transfer Token

```solidity
function transferToken(
    address _to,
    bytes32 _symbol,
    uint256 _quantity
)
```
##### Description

Inputs

| Field Name | Type    | Description                                  |
|------------|---------|----------------------------------------------|
| _to        | address | trader address                               |
| _symbol    | bytes32 | symbol in bytes32 (AVAX or any token symbol) |
| _quantity  | uint256 | amount of token to transfer                  |

##### Example Code

```ts
await portfolio.transferToken(trader1.address, AVAX, Utils.toWei(transfer_amount)));
```

### Utility Functions

Please refer to docs of ethers.js for more details at [docs.ethers.io/v5/api/utils/display-logic>](https://docs.ethers.io/v5/api/utils/display-logic/)

#### String to Bytes32 Conversion

```ts
static fromUtf8 = (txt: string): string => {
    return ethers.utils.formatBytes32String(txt);
}
```

#### Bytes32 to String Conversion

```ts
static toUtf8 = (txt: ethers.utils.BytesLike): string => {
    return ethers.utils.parseBytes32String(txt);
};
```

#### Unit Conversion

```ts
static parseUnits = (txt: string, decimals: ethers.BigNumberish): ethers.BigNumber => {
    return ethers.utils.parseUnits(txt, decimals);
};
```

```ts
static formatUnits = (
    wei: ethers.BigNumberish,
    decimals: ethers.BigNumberish | undefined
): string => {
    return ethers.utils.formatUnits(wei, decimals);
};
```

#### Get Revert Reason

##### Description

Use this function to get the revert reason of a particular action.

```ts
async getRevertReason(error: any) {
    let reason;
    if (!error.transaction) {
        this.logger.warn(
            `${this.instanceName} getRevertReason: error.transaction is undefined`
        );
    } else {
        //https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a
        let code = await provider.call(
            error.transaction, error.blockNumber
            || error.receipt.blockNumber
        );
        reason = ethers.utils.toUtf8String("0x" + code.substr(138));
        var i = reason.indexOf("0"); // delete all null characters after the
        string
        if (i>-1) {
            return reason.substring(0, i);
        }
    }
    return reason;
}
```

#### Get Client OrderId

##### Description

Use this function to create a unique client orrder id for an order to send to Dexalot.

```ts
async getClientOrderId(): Promise<string> {
    const blocknumber: number =
        await this.contracts["SubNetProvider"].getBlockNumber() || 0;
    const timestamp = new Date().toISOString();
    if (this.account) {
        const id = ethers.utils.toUtf8Bytes(`${this.account}${blocknumber}${timestamp}`);
        return ethers.utils.keccak256(id);
}
return "";
}
```
