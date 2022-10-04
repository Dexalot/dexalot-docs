---
editLink: true
---

## Web Socket Interface (Draft)

### Server Urls

Testnet: [wss://api.dexalot-test.com](https://api.dexalot-test.com/api/)

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
