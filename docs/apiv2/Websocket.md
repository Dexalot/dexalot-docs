---
icon: link
prev: Contracts
next: SimpleSwap
editLink: true
---

## Web Socket Interface (Draft)

### Server Urls

Testnet: [wss://api.dexalot-test.com](wss://api.dexalot-test.com)

Mainnet: [wss://api.dexalot.com](wss://api.dexalot.com)

You may create up to 10 simultaneous websocket connections from the same IP address anonymously. (You do not need to follow next steps)

If you need more simultaneous connections, token authorization is required to establish the websocket connections.

In order to create a web socket connection with your api-key:

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
    marketSnapshotUnsubscribe: "marketsnapshotunsubscribe",
    traderEventSubscribe: "tradereventsubscribe",
    traderEventUnsubscribe: "tradereventunsubscribe"
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
        decimal: 3,
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

Example pair subscribe message:
```json
{"data":"ALOT/USDC","pair":"ALOT/USDC","type":"subscribe","decimal":3}
```

Example trader event subscribe message :
```json
{"type":"tradereventsubscribe", "signature":"0xXXXXXXXXXXXXXXXXXX:0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
```
To generate signature you can use the sample code provided in RestApi Signed Endpoints.
* [Rest Api](/apiv2/RestApi.md)

Sample code unsubscribe:
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
Example Chart Subscribe Message:
```json
{"data":"ALOT/USDC","pair":"ALOT/USDC","chart":"D1","type":"chartsubscribe"}
```

Possible "chart" values are as follows:
```
 "M5", "M15",  "M30",  "H1"  "H4",  "D1"
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
    | 'orderStatusUpdatEvent'
    | 'transactionEvent'
    | 'executionEvent'
    | 'xChainFinalizedEvent'
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
    baseCumulative?: string
    quoteCumulative?: string
    quoteTotal?: string
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

#### OrderStatusUpdateEvent (Trader Event)

After subscribing to the traderEvents this is the captured order status update event based on the trader address provided in the signature.

```ts
export interface OrderStatusUpdateEvent {
  version: number;
  traderaddress: string;
  pair: string;
  orderId: string;
  clientOrderId: string;
  price: string;
  totalamount: string;
  quantity: string;
  side: string;
  sideId: number;
  type1: string;
  type1Id: number;
  type2: string;
  type2Id: number;
  status: string;
  statusId: number;
  quantityfilled: string;
  totalfee: string;
  code: string;
  blockTimestamp: number;
  transactionHash: string;
  blockNumber: number;
  blockHash: string;
}
```

Possible "side" values are as follows:
```
 "BUY", "SELL"
```

Possible "type1" values are as follows:
```
 "MARKET", "LIMIT", "STOP", "STOPLIMIT"
```

Possible "type2" values are as follows:
```
 "GTC", "FOK", "IOC", "PO"
```

Possible "status" values are as follows:
```
 "NEW", "REJECTED", "PARTIAL",  "FILLED", "CANCELED",  "EXPIRED", "KILLED"
```

Sample Message:
```json
{
    "data": {
        "version": 2,
        "traderaddress": "0xe05451d9832dCc72B81c78B7FD54fbcFbE0188d2",
        "pair": "ALOT/USDC",
        "orderId": "0x0000000000000000000000000000000000000000000000000000000062c14ea5",
        "clientOrderId": "0xa58c4cda60b24090351735047828ff51f50207414d4251fda901875f673dff9f",
        "price": "0.1678",
        "totalamount": "5.2018",
        "quantity": "31.0",
        "side": "BUY",
        "sideId": 0,
        "type1": "LIMIT",
        "type1Id": 1,
        "type2": "GTC",
        "type2Id": 0,
        "status": "CANCELED",
        "statusId": 4,
        "quantityfilled": "31.0",
        "totalfee": "0.06",
        "code": "",
        "blockTimestamp": 1686331589,
        "transactionHash": "0xfae4f026245cae47da7a9c12a9043f5ac94d2b8a230d2fc21c3547149b21c494",
        "blockNumber": 920114,
        "blockHash": "0x1c812b9fa7138525f682c430c22d431637f8ebb09694b65e34a4bdec9583adc9"
    },
    "type": "orderStatusUpdateEvent"
}
```

#### TransactionEvent (Trader Event)

After subscribing to the traderEvents this is the captured transaction event based on the trader address provided in the signature.

```ts
export interface TransactionEvent {
  contract: string;
  address: string;
  available: string;
  feeCharged: string;
  quantity: string;
  symbol: string;
  total: string;
  transaction: string;
  transactionId: number;
  blockTimestamp: number;
  transactionHash: string;
  blockNumber: number;
  blockHash: string;
  chainId: number;
  env: string;
}
```

Sample Message:
```json
{
  "data": {
    "contract": "0xe4afb5deta47602fa1e6e641a645147c4ff06205",
    "address": "0xe0545559a82xCc72B81cY8B7FD543bcFbE0518d2",
    "available": "2199.49",
    "feeCharged": "0.0",
    "quantity": "1.0",
    "symbol": "ALOT",
    "total": "2199.49",
    "transaction": "IXFERSENT",
    "transactionId": 5,
    "blockNumber": 1400304,
    "blockTimestamp": 1716480179,
    "blockHash": "0x40669bf4f60d543caf28ee99204d0c31181019eebe6c73b9729eca9e2ae523a8",
    "transactionHash": "0x209ab1617deedbaa6e0e67042aff9a193218bc90e8c98d0b69dabf7afe81813f",
    "chainId": 432201,
    "env": "fuji-multi-subnet"
  },
  "type": "transactionEvent"
}
```

#### ExecutionEvent (Trader Event)

After subscribing to the traderEvents this is the captured execution event based on the trader address provided in the signature.

```ts
export interface ExecutionEvent {
  version: number;
  pair: string;
  price: string;
  quantity: string;
  makerOrder: string;
  takerOrder: string;
  feeMaker: string;
  feeTaker: string;
  takerSide: string;
  takerSideId: number;
  execId: number;
  addressMaker: string;
  addressTaker: string;
  blockTimestamp: number;
  transactionHash: string;
  blockNumber: number;
  blockHash: string;
}
```

Sample Message:
```json
{
    "data": {
        "version": 1,
        "pair": "ALOT/USDC",
        "price": "0.1678",
        "quantity": "31.0",
        "makerOrder": "0x0000000000000000000000000000000000000000000000000000000063c14e1d",
        "takerOrder": "0x0000000000000000000000000000000000000000000000000000000063c14ea5",
        "feeMaker": "0.0052",
        "feeTaker": "0.06",
        "takerSide": "BUY",
        "takerSideId": 0,
        "execId": 1673612966,
        "addressMaker": "0x051A4F1EBFb2d57D3655581c64979FBe5dDF5C71",
        "addressTaker": "0xe05451d9882kCc72B81c78B7FD54fbcFbE0583d2",
        "blockNumber": 1400301,
        "blockTimestamp": 1716479835,
        "blockHash": "0x324ce93563f7aeffdfd0b6e3a3e8def19874ea68c500aa4ce2f4276b2a5e5e21",
        "transactionHash": "0x27d8365afd38d6521fce5b584b30bf5740094462430f543d549441a535a5f13g"
    },
    "type": "executionEvent"
}
```

#### XChainFinalizedEvent (Trader Event)

After subscribing to the traderEvents this is the captured execution event based on the trader address provided in the signature.
This event is generated when a crosschain swap is finalized.

```ts
export interface XChainFinalizedEvent {
    nonceAndMeta: string;
    trader: string;
    symbol: string;
    amount: string;
    timestamp: number;
    blockNumber: number;
    blockTimestamp: number;
    blockHash: string;
    transactionHash: string;
    takerSideId: number;
    env: string;
    chainId: number;
}
```

Sample Message:
```json
{
    "data": {
        "nonceAndMeta": "0xeb19e67e69d659e386647eade5657ab9611d45295cdeb6570830e00000000000",
        "trader": "0xEB19E67E69d659e386647EAde5657aB9611d4529",
        "symbol": "USDC",
        "amount": "1999600",
        "timestamp": 1716481538,
        "blockNumber": 33298587,
        "blockTimestamp": 1716481538,
        "blockHash": "0x905bd758cdee6582552f2389060a7bbeaa30fb3a19d0a57b9ea3453991d640f5",
        "transactionHash": "0x33c3469d275881dcb8f7589abfce1e919e3d92f379057ab6ffa342e920651368",
        "env": "fuji-multi-avax",
        "chainId": 43113
    },
    "type": "xChainFinalizedEvent"
}
```
