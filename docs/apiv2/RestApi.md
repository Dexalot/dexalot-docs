---
icon: link
prev: /apiv2
next: Contracts
editLink: true
---

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

GET /trading/deployment/params?contracttype=contract_type&returnabi=true&env=sub-env

*Note: the previous trading/deploymentabi endpoint has been retired*

#### Description

Returns the deployment details of the Dexalot contracts including their abi

#### Query Parameters

| **Field Name**       | **Sample Value**                                 |
|----------------------|--------------------------------------------------|
| contracttype         | \[Exchange, Portfolio, TradePairs, Orderbooks…\] |
| returnabi (optional) | true/false                                       |
| env (optional)       | Filters by env (e.g. fuji-multi-subnet)          |

#### Sample Request

https://api.dexalot-test.com/api/trading/deployment/params?contracttype=Exchange&returnabi=true&env=fuji-multi-subnet

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
