---
icon: link
editLink: true
---

# Rest API

Dexalot REST Api serves:
*  **Common Endpoints**: Provides data related to the exchange, such as environemnts, tokens, deployment details etc.
*  **Signed Endpoints**: Signed endpoints provides trader specific data such as orders, balances, transfers of a specific address. These endpoints will require you to prove that you are the owner of the queried address by sending a signature in your requests.
*  **Authorized Endpoints**: Authorized endpoints require an api key to perform any queries. Currently only used for establishing websocket connections.


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
2 sub-environments with one subnet and multiple mainnets and subnet. They are all tied
to a single parentenv.

#### Sample Request

https://api.dexalot-test.com/privapi/trading/environments


```bash
curl --location 'https://api.dexalot-test.com/privapi/trading/environments'
```

#### Sample Response

```json
[
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-arb",
		"type": "mainnet",
		"chain_instance": "https://sepolia-rollup.arbitrum.io/rpc",
		"chain_id": 421614,
		"chain_name": "Arbitrum Sepolia",
		"chain_display_name": "Arbitrum Sepolia",
		"native_token_name": "Ethereum",
		"native_token_symbol": "ETH",
		"min_native_balance": "1",
		"lzchain_id": 10231,
		"lzscanner_url": "https://testnet.layerzero-scan.com",
		"chain_wss": "wss://sepolia-rollup.arbitrum.io/ws",
		"explorer": "https://sepolia-explorer.arbitrum.io/tx/",
		"token_url": "https://sepolia-explorer.arbitrum.io/address/"
	},
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-subnet",
		"type": "subnet",
		"chain_instance": "https://subnets.avax.network/dexalot/testnet/rpc",
		"chain_id": 432201,
		"chain_name": "Dexalot Fuji Subnet",
		"chain_display_name": "Dexalot-Subnet",
		"native_token_name": "Dexalot Token",
		"native_token_symbol": "ALOT",
		"min_native_balance": "1",
		"lzchain_id": 10118,
		"lzscanner_url": "https://testnet.layerzero-scan.com",
		"chain_wss": "wss://subnets.avax.network/dexalot/testnet/ws",
		"explorer": "https://testnet.snowtrace.io/tx/",
		"token_url": "https://testnet.snowtrace.io/address/"
	},
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-avax",
		"type": "mainnet",
		"chain_instance": "https://api.avax-test.network/ext/bc/C/rpc",
		"chain_id": 43113,
		"chain_name": "Avalanche Fuji C-Chain",
		"chain_display_name": "Fuji",
		"native_token_name": "Avalanche",
		"native_token_symbol": "AVAX",
		"min_native_balance": "1",
		"lzchain_id": 10106,
		"lzscanner_url": "https://testnet.layerzero-scan.com",
		"chain_wss": "wss://api.avax-test.network/ext/bc/C/ws",
		"explorer": "https://testnet.snowtrace.io/tx/",
		"token_url": "https://testnet.snowtrace.io/address/"
	},
    { ... }
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

```bash
curl --location 'https://api.dexalot-test.com/privapi/trading/tokens'
```

#### Sample Response

```json
[
	{
		"env": "fuji-multi-arb",
		"symbol": "ARB",
		"subnet_symbol": "ARB",
		"name": "Mock ARB",
		"isnative": false,
		"address": "0x196F92E9A0d9a79925BFab0E901bf76F547F699E",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 421614,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.475"
	},
	{
		"env": "fuji-multi-arb",
		"symbol": "ETH",
		"subnet_symbol": "ETH",
		"name": "ETH",
		"isnative": true,
		"address": "0x0000000000000000000000000000000000000000",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 421614,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.000209"
	},
	{
		"env": "fuji-multi-arb",
		"symbol": "USDC",
		"subnet_symbol": "USDC",
		"name": "Mock USDC",
		"isnative": false,
		"address": "0xcEA6375208Ca81BCE5Fc33B289e8c4b9DDf74523",
		"evmdecimals": 6,
		"isvirtual": false,
		"chain_id": 421614,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.3362316"
	},
	{
		"env": "fuji-multi-arb",
		"symbol": "USDT",
		"subnet_symbol": "USDT",
		"name": "Mock USDT",
		"isnative": false,
		"address": "0x6f5aE8d697e4032B331101af7ACF6F59B5FDb430",
		"evmdecimals": 6,
		"isvirtual": false,
		"chain_id": 421614,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.95"
	},
	{
		"env": "fuji-multi-arb",
		"symbol": "WBTC",
		"subnet_symbol": "BTC",
		"name": "Mock WBTC",
		"isnative": false,
		"address": "0xd81550dE9CC08AD7770860695a929b0759e71295",
		"evmdecimals": 8,
		"isvirtual": false,
		"chain_id": 421614,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.000011305"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "ALOT",
		"subnet_symbol": "ALOT",
		"name": "ALOT",
		"isnative": false,
		"address": "0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "1.9"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "AVAX",
		"subnet_symbol": "AVAX",
		"name": "AVAX",
		"isnative": true,
		"address": "0x0000000000000000000000000000000000000000",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.0189804969014084495"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "BTC.b",
		"subnet_symbol": "BTC",
		"name": "BTC.b",
		"isnative": false,
		"address": "0x5AAD791Bafde4fC3f2B60195b8C51820087Ff6FF",
		"evmdecimals": 8,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": "BTC.b",
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.000011305"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "DEG",
		"subnet_symbol": "DEG",
		"name": "DEG",
		"isnative": false,
		"address": "0xcd08B4612FB270B94c3cae7098d2DEba98156DF4",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 2,
		"auctionendtime": "2022-12-12T16:05:11.395Z",
		"min_depositamnt": "1.9"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "USDC",
		"subnet_symbol": "USDC",
		"name": "USDC",
		"isnative": false,
		"address": "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54",
		"evmdecimals": 6,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": null,
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.3362316"
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "USDt",
		"subnet_symbol": "USDT",
		"name": "USDt",
		"isnative": false,
		"address": "0x24236E8319504A663431EF23F810b6Fa723859c4",
		"evmdecimals": 6,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": "USDt",
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.3362316",
	},
	{
		"env": "fuji-multi-avax",
		"symbol": "WETH.e",
		"subnet_symbol": "ETH",
		"name": "WETH.e",
		"isnative": false,
		"address": "0xc42E4b495020b87a2f2F7b4fb817F79fcF7043E2",
		"evmdecimals": 18,
		"isvirtual": false,
		"chain_id": 43113,
		"status": "deployed",
		"old_symbol": "ETH",
		"auctionmode": 0,
		"auctionendtime": null,
		"min_depositamnt": "0.0001743231124265263",
	},
    { ... }
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

```bash
curl --location 'https://api.dexalot-test.com/privapi/trading/pairs'
```
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
        "allowswap": true,
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

GET /trading/deployment?contracttype=contract_type&returnabi=true&env=sub-env

#### Description

Returns the deployment details of the Dexalot contracts including their abi

#### Query Parameters

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| contracttype          | Y | \[Exchange, Portfolio, TradePairs, Orderbooks…\] |
| returnabi             | N | true/false                                       |
| env                   | N | Filters by env (e.g. fuji-multi-subnet)          |

#### Sample Request

https://api.dexalot-test.com/privapi/trading/deployment?returnabi=true&contracttype=Portfolio

```bash
curl --location 'https://api.dexalot-test.com/privapi/trading/deployment?returnabi=true&contracttype=Portfolio'
```

#### Sample Response

```json
[
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-arb",
		"env_type": "mainnet",
		"contract_name": "PortfolioMain",
		"contract_type": "Portfolio",
		"address": "0xe1b3ECF856794ff799Eb831272bcd10d03CeA861",
		"impl_address": "0xca04B6Ca4509032F54d6f22D28aca2b075918b26",
		"version": "2.5.2",
		"blocknumber": "24542746",
		"owner": "0xbFD53904e0A0c02eFB7e76aad7FfB1F476320038",
		"status": "deployed",
		"action": null,
		"abi": { ... }
	},
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-avax",
		"env_type": "mainnet",
		"contract_name": "PortfolioMain",
		"contract_type": "Portfolio",
		"address": "0x6F5051526005987A21EF245668361342C6F1F7fa",
		"impl_address": "0xf2FE7a2646A3AFE7aF195f053a505Ff2db0b8134",
		"version": "2.5.2",
		"blocknumber": "31015641",
		"owner": "0x14248FFd6b2c57EF3De352E0DA86Fda6B8f0bbaD",
		"status": "deployed",
		"action": null,
		"abi": { ... }
	},
	{
		"parentenv": "fuji-multi",
		"env": "fuji-multi-subnet",
		"env_type": "subnet",
		"contract_name": "PortfolioSub",
		"contract_type": "Portfolio",
		"address": "0xb54859290619630212D4BBAba47066BEE9654076",
		"impl_address": "0x6672e6dD3b434c7d41d6C51aD182c4F093FE97A5",
		"version": "2.5.2",
		"blocknumber": "1342695",
		"owner": "0xbFD53904e0A0c02eFB7e76aad7FfB1F476320038",
		"status": "deployed",
		"action": null,
		"abi": { ... }
	}
]
```

### Get Error Codes

GET /trading/errorcodes

#### Description

This endpoint will return all of the revert reason codes with descriptions

#### Sample Request

https://api.dexalot-test.com/privapi/trading/errorcodes

```bash
curl --location 'https://api.dexalot-test.com/privapi/trading/errorcodes'
```

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

## Authorized Endpoints:

Requests to the authorized endpoints should contain the "x-apikey" header. Please reach out to Dexalot Team for your api key. Currently only used for getting a temp token before establishing a websocket connection.

### Get Websocket Token

GET /auth/getwstoken

#### Description

Get Websocket Token endpoint will provide a temporary token which can be
used to open a websocket connection to our servers in order to listen or
query data. This token will expire in 60 seconds. (See: Websocket Interface section for details)

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

***Typescript/Javascript Example:*** Generating the signature using [ethers](https://docs.ethers.org/v5/api/signer/#Signer) library:

```typescript
    const wallet = new ethers.Wallet(PRIV_KEY);
    const signature = await wallet.signMessage("dexalot");

    // Set your request header like below
    // e.g. 0xAf67D600efb58d189d6129BC17AEc6319Ff5af8f:YOURSIGNATURE
    req.headers["x-signature"] = `${PUBLIC_KEY}:${signature}`

    // Verify your signature (might be needed when testing)
    const publicKey = ethers.utils.verifyMessage("dexalot", signature);
```

***Python Example:***

```python
    account = Account.from_key(private_key=PRIVATE_KEY)
    message = encode_defunct(text="dexalot")
    signed_message = account.sign_message(signable_message=message)
    headers = {"x-signature": f"{account.address}:{signed_message.signature.hex()}}
    resp = await client.get(request_url, headers=headers)
```
You may also use https://etherscan.io/verifiedSignatures to generate the signature and provide it to your bots as a configuration.

After generating the signature a typical signed endpoint request would look like:
```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/portfoliobalance' \
--header 'x-signature: {0xTraderAddress}:{SignatureHash}'
```
***Note:*** Please keep in mind that the orders are retrieved from our database
for speed. Hence there could be some delays between the order’s
blockchain state and Dexalot db state. Always check the latest status of
your orders with the tradePairs contract call
`TradePairs.getOrder(bytes32 _orderId)` in the Contract Invocation
Section

### Get Order Details

GET /signed/orders/{ORDER_ID}

#### Description

Returns details for the given order id

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| OrderId         | Y | The Order Id returned from the blockchain when your order is created. |   0x0000000000000000000000000000000000000000000000000000000063c14ca3 |

#### Sample Request

https://api.dexalot-test.com/privapi/signed/orders/0x0000000000000000000000000000000000000000000000000000000063c14ca3

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/orders/0x00000000000000000000000000000000000000000000000000000000639a2994' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```

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

All orders belonging to the trader signature can be fetched using this endpoint. If period parameters are not provided this endpoint will default to last 30 days.

#### Query Parameters

| **Field Name**    | **Required**  | **Description** | **Sample Value**  |
|-------------------|-------------- |-----------------|--|
| pair | N | Trading Pair code | AVAX/USDC |
| category | N | Order Category 0: Open, 1: Closed (with fills), 2: Closed (no fills), 3: All Orders | 3 |
| periodfrom | N | If provided limits where the time period starts | 2023-02-22T18:20:02.000Z |
| periodto | N | If provided limits where the time period ends | 2023-02-22T18:40:02.000Z |
| itemsperpage | N | Max number of records to return in the response | 50 |
| pageno | N | Requested page number (paged by "itemsperpage" records) | 1 |

#### Sample Requests
To get open orders:
```
https://api.dexalot-test.com/privapi/signed/orders?pair=AVAX/USDC&category=0
```
To get all of your orders with paging support:
```
https://api.dexalot-test.com/privapi/signed/orders?pair=ALOT/USDC&category=3&itemsperpage=100&pageno=1
```
More complex example:
```
https://api.dexalot-test.com/privapi/signed/orders?periodfrom=2023-02-22T18:20:02.000Z&periodto=2023-02-22T18:40:02.000Z&itemsperpage=1000&pageno=1&pair=ALOT/USDC&category=0
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

###  Get Trader history

GET signed/traderhistory (This endpoint has been deprecated please see order endpoints)

### Get Order Execution Details

GET /signed/executions

#### Description

Returns execution details for the given order id

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| orderid         | Y | The Order Id returned from the blockchain when your order is created. |   0x0000000000000000000000000000000000000000000000000000000063c14ca3 |

#### Sample Request
```
https://api.dexalot-test.com/privapi/signed/executions?orderid=0x0000000000000000000000000000000000000000000000000000000063c14ca3
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/executions?orderid=0x00000000000000000000000000000000000000000000000000000000639a2994' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```
#### Sample Response

```json
[
    {
        "env": "dev-fuji-subnet",
        "execid": 1673612524,
        "type": "T",
        "orderid": "0x0000000000000000000000000000000000000000000000000000000063c14ceb",
        "traderaddress": "0xce96e120420dc73394491ab941d3bc6168d6c93e",
        "tx": "0x32502abc0280f69e1b90fff684f5fc6b79a6be00a674b94bc50165e74b260a1b",
        "pair": "ALOT/USDC",
        "side": 1,
        "quantity": "20.000000000000000000",
        "price": "2.905800000000000000",
        "fee": "0.116200000000000000",
        "feeunit": "USDC",
        "ts": "2023-02-24T07:54:09.000Z"
    }
]
```

### Get Transfers

GET /signed/transfers

#### Description

Returns transfer details of the trader. If period parameters are not provided defaults to last 7 days.

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| symbol         | N | Symbol to query for transfers | ALOT |
| periodfrom | N | 2022-03-02T00:00:00.000Z |
| periodto | N | 2022-04-11T00:00:00.000Z |
| itemsperpage | N | Max number of records to return in the response | 50 |
| pageno | N | Requested page number | 1 |


#### Sample Request
```
https://api.dexalot-test.com/privapi/signed/transfers?symbol=ALOT
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/transfers?symbol=ALOT' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```

#### Sample Response

```json
{
    "count": 1,
    "rows": [
        {
            "env": "subnet",
            "bridge": -1,
            "action_type": 9,
            "nonce": -1,
            "tx": "0x1bdedaa4b071670859a320cf22704311b6ef083f90676ff5a96f6b1325d8cc22",
            "traderaddress": "0xce96e120420dc73394491ab941d3bc6168d6c93e",
            "type": 9,
            "symbol": "ALOT",
            "quantity": "990",
            "fee": "0",
            "gasused": 120920,
            "gasprice": "6.5",
            "ts": "2023-02-24T07:53:11.000Z"
        }
    ]
}
```

### Get Portfolio Balance

GET /signed/portfoliobalance

#### Description

Retrieves portfolio balances.
Please DO NOT use this endpoint for trading purposes and get the most recent portfolio information from our contracts instead.

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| symbol         | N | Symbol to query for balance check | ALOT |


#### Sample Request

```
https://api.dexalot-test.com/privapi/signed/portfoliobalance?symbol=ALOT
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/portfoliobalance?symbol=ALOT' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```
#### Sample Response

```json
[
    {
        "traderaddress": "0xce96e120420dc73394491ab941d3bc6168d6c93e",
        "symbol": "ALOT",
        "trades": "-20",
        "xfers": "990",
        "fee": "0",
        "currentbal": "970"
    }
]
```

### Get Order Transactions

GET /signed/transactions

#### Description

Retrieves transactions related to the given order id

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| orderid         | Y | Order id | 0x0000000000000000000000000000000000000000000000000000000063c14ceb |


#### Sample Request

```
https://api.dexalot-test.com/privapi/signed/transactions?orderid=0x0000000000000000000000000000000000000000000000000000000063c14ceb
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/transactions?orderid=0x00000000000000000000000000000000000000000000000000000000639a2994' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```
#### Sample Response

```json
[
    {
        "tx": "0x32502abc0280f69e1b90fff684f5fc6b79a6be00a674b94bc50165e74b260a1b",
        "type": "FILLED",
        "blocknumber": "909334",
        "gasused": 592205,
        "gasprice": "6.500000000",
        "execid": 1673612524,
        "execquantity": "20",
        "execprice": "2.9058",
        "fee": "0.1162",
        "feetype": "T",
        "feeunit": "USDC",
        "ts": "2023-02-24T07:54:09.000Z"
    }
]
```

### Get Transaction Details

GET /signed/transactions/{TRANSACTION_ID}

#### Description

Retrieves transaction details for a given transaction id

#### Parameters

| **Field Name**  | **Required** | **Description** |  **Sample Value** |
|-----------------|--------------|-----------------|-------------------|
| {TRANSACTION_ID} | Y | Transaction id | 0x32502abc0280f69e1b90fff684f5fc6b79a6be00a674b94bc50165e74b260a1b |


#### Sample Request

```
https://api.dexalot-test.com/privapi/signed/transactions/0x32502abc0280f69e1b90fff684f5fc6b79a6be00a674b94bc50165e74b260a1b
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/transactions/0xc1a611644f431fec8c41b083c02cdcbb0803ee8848804c27acbb47fc9ef2ad82' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```
#### Sample Response

```json
[
    {
        "env": "dev-fuji-subnet",
        "tx": "0x32502abc0280f69e1b90fff684f5fc6b79a6be00a674b94bc50165e74b260a1b",
        "parentid": "0x0000000000000000000000000000000000000000000000000000000063c14ceb",
        "type": "FILLED",
        "blockhash": "0x3c898dd891bab6692863ec487aca53235893c906000f293c8b77718f69adc6e8",
        "blocknumber": "909334",
        "fromaddress": "0xce96e120420dc73394491ab941d3bc6168d6c93e",
        "toaddress": "0x4dda0c0c6bf330911ae5dd53d24b8f319e6f6a76",
        "gasused": 592205,
        "gasprice": "6.500000000",
        "cumulativegasused": 592205,
        "status": true,
        "ts": "2023-02-24T07:54:09.000Z"
    }
]
```

###  Get Trader fills

GET signed/trader-fills

#### Description

Returns only filled transactions (trades) for the given address.
Maximum 100 records returned.

#### Query Parameters

| **Field Name**| **Required** | **Sample Value**   |
|---------------|-----------------------------------|-------------------------------------------------------|
| periodfrom | Y | 2022-03-02T00:00:00.000Z |
| periodto (default : current_time)| N | 2022-04-11T00:00:00.000Z                               |
| itemsperpage (can not be greater than 100) | N | 50 |
| pageno | N | 1 |

**Warning**: If "itemsperpage" is included in the query, pageno should be included as well.

#### Sample Requests

```
https://api.dexalot-test.com/privapi/signed/trader-fills
```

```
https://api.dexalot-test.com/privapi/signed/trader-fills?periodFrom=2023-01-01T00:00:00.000Z&periodTo=2023-07-28T00:00:00.000Z&itemsPerPage=100&pageNo=1
```

```bash
curl --location 'https://api.dexalot-test.com/privapi/signed/trader-fills?periodFrom=2023-01-01T00%3A00%3A00.000Z&periodTo=2023-07-28T00%3A00%3A00.000Z&itemsPerPage=100&pageNo=1' \
--header 'x-signature: [ADDRESS:SIGNATURE]'
```
#### Sample Response

```json
[
    {
        "traderaddress": "0x720b7b64f5228a73aac1419d7b4f6b8ced62db41",
        "orderid": "0x000000000000000000000000000000000000000000000000000000006c314119",
        "tx": "0x02a193be60e7b0480ca70d0c3cb8efe1240c6f0b5ba7ba803a9486cdb3e439ba",
        "pair": "ALOT/USDC",
        "side": 0,
        "type": "T",
        "execid": 1643211314,
        "execquantity": "5",
        "execprice": "1.1276",
        "fee": "0.01",
        "feeunit": "ALOT",
        "ts": "2023-01-28T10:03:14.000Z"
    }
]
```

#### Response Enumerations

| **Field Name**  | **Values** |
|-----------------|--------------|
| side         | 0: BUY 1: SELL |
| type         | T: TAKER, M: MAKER |
