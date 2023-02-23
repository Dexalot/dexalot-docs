---
icon: link
prev: /apiv2
next: Contracts
editLink: true
---

# Rest API

All api requests should contain the "x-apikey" header. Please reach out to Dexalot Team for your api key

An example request would look like:
```bash
curl --location --request GET 'https://api.dexalot.com/privapi/trading/tokens' \
--header 'x-apikey: [yourkey]'
```

## Server Urls

**TestNet**:

[api.dexalot-test.com/privapi/](https://api.dexalot-test.com/privapi/)

**Mainnet**:

[api.dexalot.com/privapi/](https://api.dexalot.com/privapi/)

**Dexalot Contracts**:

[github.com/Dexalot/contracts/tree/main/contracts](https://github.com/Dexalot/contracts/tree/main/contracts)

## Common Endpoints

### Get Environments

GET /trading/environments

#### Description

Returns an array of current blockchain environments. There will always be
2 sub-environments of types mainnet and subnet returned. They are both tied
to a single parentenv.

#### Sample Request

https://api.dexalot-test.com/privapi/trading/environments

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
        "chain_wss": "wss://api.avax-test.network/ext/bc/C/rpc",
        "native_token_name": "Avalanche",
        "native_token_symbol": "AVAX",
        "lzchain_id": 10006,
        "lzscanner_url": "https://testnet.layerzero-scan.com",
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

https://api.dexalot-test.com/privapi/trading/tokens

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

https://api.dexalot-test.com/privapi/trading/pairs

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

GET /trading/deployment/params?contracttype=contract_type&returnabi=true&env=sub-env

#### Description

Returns the deployment details of the Dexalot contracts including their abi

#### Query Parameters

| **Field Name**       | **Sample Value**                                 |
|----------------------|--------------------------------------------------|
| contracttype         | \[Exchange, Portfolio, TradePairs, Orderbooks…\] |
| returnabi (optional) | true/false                                       |
| env (optional)       | Filters by env (e.g. fuji-multi-subnet)          |

#### Sample Request

https://api.dexalot-test.com/privapi/trading/deployment/params?contracttype=Exchange&returnabi=true&env=fuji-multi-subnet

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

### Get Error Codes

GET /trading/errorcodes

#### Description

This endpoint will return all of the revert reason codes with descriptions

#### Sample Request

https://api.dexalot-test.com/privapi/trading/errorcodes

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

GET /auth/getwstoken

#### Description

Get Websocket Token endpoint will provide a temporary token which can be
used to open a websocket connection to our servers in order to listen or
query data. (See: Websocket Interface section for details)

#### Sample

```bash
curl --location --request GET 'https://api.dexalot.com/privapi/auth/getwstoken' \
--header 'x-apikey: [yourkey]'
```

#### Sample response

```json
{
    "token": "5fd5e09c-f5c0-491b-91b3-4240d38901d3"
}
```

## Signed Endpoints

The following endpoints are used to fetch data for a specific trading address. Such as getting orders or balances of an address. In order to perform these requests you will have to provide a signature to prove you own the address being queried.

You have to sign "dexalot" message and provide the signature in x-signature header along with your Signed Endpoint requests.

***Example:*** Generating the signature using [ethers](https://docs.ethers.org/v5/api/signer/#Signer) library:

```typescript
    const wallet = new ethers.Wallet(PRIV_KEY);
    const signature = await wallet.signMessage("dexalot");

    // Set your request header like below
    // e.g. 0xAf67D600efb58d189d6129BC17AEc6319Ff5af8f:YOURSIGNATURE
    req.headers["x-signature"] = `${PUBLIC_KEY}:${signature}`

    // Verify your signature (might be needed when testing)
    const publicKey = ethers.utils.verifyMessage("dexalot", signature);
```

***Note:*** Please keep in mind that the orders are retrieved from our database
for speed. Hence there could be some delays between the order’s
blockchain state and Dexalot db state. Always check the latest status of
your orders with the tradePairs contract call
`TradePairs.getOrder(bytes32 _orderId)` in the Contract Invocation
Section

### Get Order Details

GET /signed/order/{ORDER_ID}

#### Description

Returns details for the given order id

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| OrderId         | Y | The Order Id returned from the blockchain when your order is created. |   0x0000000000000000000000000000000000000000000000000000000063c14ca3 |

#### Sample Request

https://api.dexalot-test.com/privapi/signed/order/0x0000000000000000000000000000000000000000000000000000000063c14ca3

#### Sample Response

```json
{
    "id": "0x0000000000000000000000000000000000000000000000000000000063c14ca3",
    "tx": "0x4fb0d865c73258ab365cda2252b5e6f3a23612c66659338a04a8b58d9a03e442",
    "tradePair": "AVAX/USDC",
    "type1": "LIMIT",
    "type2": "GTC",
    "side": "BUY",
    "price": "20.000000000000000000",
    "quantity": "1.000000000000000000",
    "totalAmount": "20.000000000000000000",
    "status": "FILLED",
    "quantityFilled": "1.000000000000000000",
    "totalFee": "0.001000000000000000",
    "timestamp": "2023-02-19T14:14:00.000Z",
    "updateTs": "2023-02-21T19:45:49.000Z"
}
```

### Get Orders

GET /signed/orders

#### Description

All orders belonging to the trader signature can be fetched using this endpoint

#### Query Parameters

| **Field Name**    | **Required**  | **Description** | **Sample Value**  |
|-------------------|-------------- |-----------------|--|
| pair | N | Trading Pair code | AVAX/USDC |
| category | N | Order Category 0: Open, 1: Closed (with fills), 2: Closed (no fills), 3: All Orders | 3 |
| periodfrom | N | If provided limits where the time period starts | 2023-02-22T18:20:02.000Z |
| periodto | N | If provided limits where the time period ends | 2023-02-22T18:40:02.000Z |
| itemsperpage | N | Max number of records to return in the response | 50 |
| pageno | N | Requested page number (paged by "itemsperpage" records) | 1 |

#### Sample Request

```
https://api.dexalot-dev.com/privapi/signed/orders?pair=ALOT/USDC&category=3
```
```
https://api.dexalot-dev.com/privapi/signed/orders?periodfrom=2023-02-22T18%3A20%3A02.000Z&periodto=2023-02-22T18%3A40%3A02.000Z&itemsperpage=1000&pageno=1&pair=ALOT/USDC&category=0
```

#### Sample Response

```json
{
    "count": 1,
    "rows": [
        {
            "env": "dev-fuji-subnet",
            "id": "0x0000000000000000000000000000000000000000000000000000000063c14cb7",
            "traderaddress": "0xbe1d1d12f676080f6d2e739b01f242f2145c00b0",
            "clientordid": "0x4a04a533471a445e67894073fcb4342d07ee2b2170156ca745b111da641f121b",
            "tx": "0x878ee1f5f20252886e83412f55e37169f5935e4f607a5e7cf5cd17c7c9d39332",
            "pair": "ALOT/USDC",
            "type": 1,
            "type2": 0,
            "side": 0,
            "price": "0.990000000000000000",
            "quantity": "100.000000000000000000",
            "totalamount": "0.000000000000000000",
            "status": 0,
            "ts": "2023-02-22T18:29:02.000Z",
            "quantityfilled": "0.000000000000000000",
            "totalfee": "0.000000000000000000",
            "update_ts": "2023-02-22T18:29:02.000Z"
        }
    ]
}
```

### Get Open Orders

GET /signed/openorders

#### Description

This endpoint returns an array of all currently open orders for the given trade pair
for signers trader address.

#### Query Parameters

| **Field Name**    | **Required**  | **Sample Value**  |
|-------------------|-------------- |-------------------|
| pair              | N             |   AVAX/USDC       |
| itemsperpage      | N             |   100             |
| pageno            | N             |   1               |

#### Sample Request

https://api.dexalot-test.com/privapi/signed/openorders?pair=AVAX/USDC&itemsperpage=100&pageno=1

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
