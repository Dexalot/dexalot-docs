---
icon: link
prev: Contracts
editLink: true
---

## Web Socket Interface (Draft)

### Server Urls

Testnet: [wss://api.dexalot-test.com](https://api.dexalot-test.com/api/)

Mainnet: [wss://api.dexalot.com](https://api.dexalot-test.com/api/) (Behind CORS)

A token authorization is required to establish a websocket connection.

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

This is the captured order status update event based on the trader address provided in the signature.

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
  type1: string;
  type2: string;
  status: string;
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
        "type1": "LIMIT",
        "type2": "GTC",
        "status": "FILLED",
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

This is the captured transaction event based on the trader address provided in the signature.

```ts
export interface TransactionEvent {
  transactionHash: string;
  txType: string;
  fromAddress: string;
  toAddress: string;
  tx: tx;
  blockTimestamp: number;
  symbol: string;
  txFrQuantity: string;
  txFrFee: string;
  blockNumber: number;
  blockHash: string;
}

export interface tx {
  gasUsed: string;
  effectiveGasPrice: string;
  cumulativeGasUsed: string;
}
```

Sample Message:
```json
{
    "data": {
        "transactionHash": "0xbac1b0aff641a71528d6aa6ec156f103141e63031007d900e3a622603852d07c",
        "txType": "REMOVEGAS",
        "fromAddress": "0xe05451a9882dCc72B81c78B7FD54fycFbE0188d2",
        "toAddress": "0xE4DfB5dE6a4b606FA2E6e641a645147C4kF0720t",
        "tx": {
            "gasUsed": "86720",
            "effectiveGasPrice": "11.5",
            "cumulativeGasUsed": "86720"
        },
        "blockTimestamp": 1686757299,
        "symbol": "ALOT",
        "txFrQuantity": "1.0",
        "txFrFee": "0.0",
        "blockNumber": 920114,
        "blockHash": "0x1c812b9fa7131525a682c430c22d4y1637f8ebb09694b65e34a4bdec9583adc9"
    },
    "type": "transactionEvent"
}
```

#### ExecutionEvent (Trader Event)

This is the captured execution event based on the trader address provided in the signature.

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
  execId: number;
  addressMaker: string;
  addressTaker: string;
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
        "execId": 1673612966,
        "addressMaker": "0x051A4F1EBFb2d57D3655581c64979FBe5dDF5C71",
        "addressTaker": "0xe05451d9882kCc72B81c78B7FD54fbcFbE0583d2",
        "blockNumber": 920114,
        "blockHash": "0x1c812b9fa7138525f682c430c22d441637f8ebb0b694b65e39a4bdec9583adc9"
    },
    "type": "executionEvent"
}
```
