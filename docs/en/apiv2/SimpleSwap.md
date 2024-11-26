---
icon: link
editLink: true
---

# Simple Swap Integration

## What is Simple Swap

Dexalot provides the Simple Swap flow to make trading easier for our users. Using the Simple Swap feature a user can get Firm Quotes from Dexalot Simple Swap Service. A Firm Quote is a signed trade commitment provided by Dexalot given for a specific trader address for a limited amount of time.

Using this signature a user may choose to execute the trade by interacting with Dexalot MainnetRFQ contract deployed on Avalanche C-Chain which results in swapping the promised assets in a single contract invocation.

> **Warning**: Getting a Firm Quote will allocate the liquidity to you for a specific amount of time, so in order to provide fair use of the service we are tracking Firm Quote requests and may blacklist the requester if there are too many FirmQuote requests without any executions. Firm Quote endpoint should only be used when trader intends to execute on the trade.

## Integration Steps

1. Fetch available Simple Swap enabled pairs and related info
2. Fetch MainnetRFQ contract details
3. Request Simple Quote from Dexalot Quote Provider to have the approximate price
4. Request Firm Quote from Dexalot Quote Provider to get the committed amounts and signature
5. Execute the trade using Mainnet RFQ Contract

### 1. Fetch Trade Pairs
Api (GET):
```
https://api.dexalot.com/api/rfq/pairs
```
| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| chainid               | Y | \[43114 ...\] |

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/pairs?chainid=43114' --header 'x-apikey: API_KEY'
```

In the response please take a note of the following fields:

```json
{
    "AVAX/USDC": {
        "base": "AVAX",
        "quote": "USDC",
        "liquidityUSD": 10000,
        "baseAddress": "0x0000000000000000000000000000000000000000",
        "quoteAddress": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        "baseDecimals": 18,
        "quoteDecimals": 6,
    },
    ...
}
```

Quote provider will only give signed quotes for pairs returned by this endpoint.

Base address and quote address fields hold the ERC20 contract address for that specific token whereby "0x0000000000000000000000000000000000000000" means the native token for the given chainid.

### 2. Fetch MainnetRFQ Contract Details (optional)
Api (GET):
```
https://api.dexalot.com/privapi/trading/deployment?returnabi=true&contracttype=MainnetRFQ
```

Example Response:
```json
    [{
        "parentenv": "production-multi",
        "env": "production-multi-mainnet",
        "env_type": "mainnet",
        "contract_name": "MainnetRFQ",
        "contract_type": "MainnetRFQ",
        "address": "0xEed3c159F3A96aB8d41c8B9cA49EE1e5071A7cdD",
        "impl_address": "0x386bd3aAbB04A5FD140B8e032b51E927E9bB9614",
        "version": "1.0.3",
        "owner": "0xbFD53904e0A0c02eFB7e76aad7FfB1F476320038",
        "status": "deployed",
        "action": null,
        "abi": {

        }
    }]
```

You may need the contract address and abi details when performing the contract call in the final step.

### 3a. Request Simple Quote (optional)

For standard price checks Simple Quote endpoint should be used.
This request should contain x-apikey header in order to receive special prices defined for your channel.

Endpoint (GET):
```
https://api.dexalot.com/api/rfq/pairprice
```

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| chainid               | Y | \[43114 ...\] |
| pair                  | Y | \[AVAX/USDC, ALOT/USDC ...\] |
| amount                | Y | The amount from which the quote will be calculated from |
| isbase                | Y | 0/1 This parameter tells the quote provider what unit the amount has. For AVAX/USDC example where AVAX is base and USDC is the quote asset. If the trader wants to get price for 100 USDC worth trade, isbase parameter should be set to 0. System will calculate corresponding AVAX amount for 100 USDC to provide the quote.
| side                  | Y | 0/1 e.g. for AVAX/USDC pair side should be 0 to buy AVAX and 1 for selling AVAX |
| channel               | N | Reach out to Dexalot team to register your channel (coupled with an api-key) |

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/pairprice?chainid=43114&pair=AVAX/USDC&amount=120&side=1&isbase=1' --header 'x-apikey: API_KEY'
```

Sample success response:
```json
{
    "success": true,
    "pair": "AVAX/USDC",
    "side": 1,
    "price": "10.215898650775",
    "baseAmount": "120",
    "quoteAmount": "1225.907838093"
}
```

Sample error response:
```json
{
    "success": false,
    "reasonCode": "SQ-003",
    "reason": "Not enough liquidity reserved to simpleswap for the given quantity"
}
```

### 3b. Request Batched Quotes (optional)

For aggregators that require rate fetched prices, Prices endpoint should be used.
This request should contain x-apikey header in order to receive special prices defined for your channel.

Endpoint (GET):
```
https://api.dexalot.com/api/rfq/prices
```

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| chainid               | Y | \[43114 ...\] |
| channel               | N | Reach out to Dexalot team to register your channel (coupled with an api-key) |

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/prices?chainid=43114' --header 'x-apikey: API_KEY'
```

Response Types:
```js
{
    prices: {
        [pairName]: {
            bids: [
                [basePrice: string, quoteAmount: string],
                ...,
            ],
            asks: [
                [basePrice: string, quoteAmount: string],
                ...,
            ]
        },
        ...
    }
}
```

Response Types:
```json
{
    "prices": {
        "AVAX/USDC": {
            "bids": [
                ["9.778706198423064067", "1.000000"],
                ["9.778705050924842728", "9.778705"],
                ["9.778694723440850672", "97.786947"],
            ],
            "asks": [
                ["9.782618067277720067", "1.000000"],
                ["9.782619214775941407", "9.782619"],
                ["9.782629542259933463", "97.826295"],
            ]
      },
    }
}
```

This endpoint returns a set of quotes ordered by `quoteAmount` with the first entry being the minimum and the last entry the maximum valid amount for quotes. For example in the above response quotes are only valid for AVAX amounts between 1 to 97.786947 inclusive.

To get the price of an input amount `a`, binary search through the quotes to find the two quotes at which `a` sits between. Using these quotes a weighted price can be calculated for `a`, once multiplied will result in the output amount. If `a` exceeds all quotes then return the last `quoteAmount` and `price`. This logic is illustrated for an array of amounts in the below snippet:

```js
calculateOrderPrice(
  amounts: bigint[],
  orderbook: string[][],
  baseToken: Token,
  quoteToken: Token,
  isInputQuote: boolean,
) {
  let result = [];

  for (let i = 0; i < amounts.length; i++) {
    let amt = amounts[i];
    if (amt === 0n) {
      result.push(amt);
      continue;
    }

    let left = 0,
      right = orderbook.length;
    let qty = BigInt(0);

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      qty = BigInt(
        ethers.utils
          .parseUnits(orderbook[mid][1], quoteToken.decimals)
          .toString(),
      );
      if (isInputQuote) {
        const price = BigInt(
          ethers.utils
            .parseUnits(orderbook[mid][0], baseToken.decimals)
            .toString(),
        );
        qty =
          (qty * BigInt(10 ** (baseToken.decimals * 2))) /
          (price * BigInt(10 ** quoteToken.decimals));
      }
      if (qty <= amt) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    let price = BigInt(0),
      amount = BigInt(0);
    if (amounts[i] === qty) {
      price = BigInt(
        ethers.utils
          .parseUnits(orderbook[left][0], baseToken.decimals)
          .toString(),
      );
      amount = amounts[i];
    } else if (left === 0) {
      price = 0n;
    } else if (left < orderbook.length) {
      const lPrice = BigInt(
        ethers.utils
          .parseUnits(orderbook[left - 1][0], baseToken.decimals)
          .toString(),
      );
      const rPrice = BigInt(
        ethers.utils
          .parseUnits(orderbook[left][0], baseToken.decimals)
          .toString(),
      );
      let lQty = BigInt(
        ethers.utils
          .parseUnits(orderbook[left - 1][1], quoteToken.decimals)
          .toString(),
      );
      let rQty = BigInt(
        ethers.utils
          .parseUnits(orderbook[left][1], quoteToken.decimals)
          .toString(),
      );
      if (isInputQuote) {
        lQty = (lQty * BigInt(10 ** (baseToken.decimals * 2))) /
          (lPrice * BigInt(10 ** quoteToken.decimals));
        rQty =
          (rQty * BigInt(10 ** (baseToken.decimals * 2))) /
          (rPrice * BigInt(10 ** quoteToken.decimals));
      }
      price = lPrice + ((rPrice - lPrice) * (amt - lQty)) / (rQty - lQty);
      amount = amounts[i];
    }

    if (isInputQuote) {
      result.push(
        (price * amount * BigInt(10 ** quoteToken.decimals)) /
          BigInt(10 ** (baseToken.decimals * 2)),
      );
    } else {
      result.push(
        price !== 0n // To avoid division by zero error
          ? (amount * BigInt(10 ** (baseToken.decimals * 2))) /
            (price * BigInt(10 ** quoteToken.decimals))
          : 0n,
      );
    }
  }
  return result;
}

// SELL AVAX USDC (set AVAX amt)
const outputAmounts = calculateOrderPrice(inputAmounts, resp.prices["AVAX/USDC"].asks, baseToken, quoteToken, false)
// SELL USDC AVAX (set USDC amt)
const outputAmounts = calculateOrderPrice(inputAmounts, resp.prices["AVAX/USDC"].bids, baseToken, quoteToken, true)
// BUY AVAX USDC (set USDC amt)
const outputAmounts = calculateOrderPrice(inputAmounts, resp.prices["AVAX/USDC"].asks, baseToken, quoteToken, true)
// BUY USDC AVAX (set AVAX amt)
const outputAmounts = calculateOrderPrice(inputAmounts, resp.prices["AVAX/USDC"].bids, baseToken, quoteToken, false)
```

### 4 Request Firm Quote
> **Warning**: Frequently calling this endpoint with no executions may cause the trader to get banned.

Firm Quote endpoint will return a signature which contains trade details. This signature is only valid for the given trader address and will expire after a short period of time.

This request should contain x-apikey header in order to receive special prices defined for your channel. Please reach out to Dexalot team if you are planning to integrate to our RFQ system. If you are an aggregator please also provide your executor contract address so it can be whitelisted.

For this endpoint Taker and Maker terms are defined as follows:
Dexalot RFQ contract is always the maker and the trader is always the taker.
For a valid quote either takerAmount (for a sell swap) or makerAmount (for a buy swap) must be provided.

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| chainid               | Y | \[43114 ...\] |
| takerAsset            | Y | The ERC20 address of the asset Taker (The trader) is providing to the trade (source token) |
| makerAsset            | Y | The ERC20 address of the asset Maker (Dexalot RFQ Contract) is providing to the trade (destination token) |
| takerAmount           | N | The amount of taker asset for the trade, provided for a sell swap. Should be multiplied by evm_decimals of the taker asset. e.g. for USDC evm_decimals = 6, for a 100 USD trade this number should be 100000000 |
| makerAmount           | N | The amount of maker asset for the trade, provided for a buy swap. Should be multiplied by evm_decimals of the maker asset. e.g. for AVAX evm_decimals = 18, for a 100 AVAX trade this number should be 100000000000000000000 |
| userAddress           | Y | The originating user performing the swap (not the executor contract), e.g. trader address: 0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD |
| executor              | N | The executor contract address which calls the mainnet rfq contract (if not provided userAddress is used as the executor)
| slippage              | N | The slippage of the aggregator swap in bps, e.g. '100' for 1% |
| partner               | N | If applicable, a string identifier for the partner executing the swap on your platform |
| txType                | N | EVM transaction type i.e. 1 for EIP-2930 or 2 for EIP-1559, if provided returns full transaction object |


Endpoint (POST):
```
https://api.dexalot.com/api/rfq/firm
```
Req Body:
```json
{
    "chainid": 43114,
    "takerAsset": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "makerAsset": "0x0000000000000000000000000000000000000000",
    "takerAmount": "200000000",
    "userAddress": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
    "executor": "0xdef171fe48cf0115b1d80b88dc8eab59176fee57"
}
```

Response:
```json
{
    "order": {
        "nonceAndMeta": "0x05182E579FDfCf69E4390c3411D8FeA1fb6467cfc6f28e56b0daf00000000000",
        "expiry": 1694534360,
        "makerAsset": "0x0000000000000000000000000000000000000000",
        "takerAsset": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        "maker": "0xEed3c159F3A96aB8d41c8B9cA49EE1e5071A7cdD",
        "taker": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
        "makerAmount": "21483696748316475197",
        "takerAmount": "200000000",
    },
    "signature": "0xbdcd5728194a953a01b2f9bf6d474b2014979e0768fc5b5b707c988a3be89ccf7bccbc61ea19b1ee49802bcb4dfbe7585e4d26236bb18aac11b9d92d3085c6d91c",
    "tx": {
        "to": "0xEed3c159F3A96aB8d41c8B9cA49EE1e5071A7cdD",
        "data": "0x6c75d6f5a6f548c01714e590c52d74f64d0d07ee795e65e512b0109d26c260000000000000000000000000000000000000000000000000000000000000000000651157e700000000000000000000000068b773b8c10f2ace8ac51980a1548b6b48a2ec54000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002071a83909798fc2a5a2f2781b0892a46d9cd1c000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000001d1a94a20000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000004109b33c1c66e114c9ce92ffd1cfd2ba6661d1a3697011a5aeb2417c86c58b93da743b0afa869492132e0eafffdb2b070d05e644711c052ee3cd80d2847d7387ee1b00000000000000000000000000000000000000000000000000000000000000",
        "gasLimit": 120000,
    },
}
```

To return a full transaction object please include `txType` as follows:

Req Body:
```json
{
    "chainid": 43114,
    "takerAsset": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "makerAsset": "0x0000000000000000000000000000000000000000",
    "takerAmount": "200000000",
    "userAddress": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
    "txType": 2,
}
```

Response:
```json
{
    "order": {
        "nonceAndMeta": "0x05182E579FDfCf69E4390c3411D8FeA1fb6467cfc6f28e56b0daf00000000000",
        "expiry": 1694534360,
        "makerAsset": "0x0000000000000000000000000000000000000000",
        "takerAsset": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        "maker": "0xEed3c159F3A96aB8d41c8B9cA49EE1e5071A7cdD",
        "taker": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
        "makerAmount": "21483696748316475197",
        "takerAmount": "200000000",
    },
    "signature": "0xbdcd5728194a953a01b2f9bf6d474b2014979e0768fc5b5b707c988a3be89ccf7bccbc61ea19b1ee49802bcb4dfbe7585e4d26236bb18aac11b9d92d3085c6d91c",
    "tx": {
        "data": "0x6c75d6f5a6f548c01714e590c52d74f64d0d07ee795e65e512b0109d26c260000000000000000000000000000000000000000000000000000000000000000000651157e700000000000000000000000068b773b8c10f2ace8ac51980a1548b6b48a2ec54000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002071a83909798fc2a5a2f2781b0892a46d9cd1c000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000001d1a94a20000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000004109b33c1c66e114c9ce92ffd1cfd2ba6661d1a3697011a5aeb2417c86c58b93da743b0afa869492132e0eafffdb2b070d05e644711c052ee3cd80d2847d7387ee1b00000000000000000000000000000000000000000000000000000000000000",
        "to": "0xEed3c159F3A96aB8d41c8B9cA49EE1e5071A7cdD",
        "from": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
        "type": 2,
        "maxFeePerGas": "50000000000",
        "nonce": 25,
        "gasLimit": "120000",
        "chainId": 43114
    },
}
```
### 5a. Execute Swap using Tx

If trader is an Externally Owned Account they can sign the tx object returned by step 4 to execute a swap.

For example using ethers5:
```javascript
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const tx = await wallet.sendTransaction(firmResponse.tx);
    await tx.wait();
```

For example using web3.js:
```javascript
    const web3 = new Web3(provider)
    const account = web3.eth.accounts.wallet.add(PRIVATE_KEY).get(0);
    await web3.eth.sendTransaction({ from: account?.address, ...firmResponse.tx });
```

For example using web3.py:
```python
    w3 = Web3(provider)
    account = w3.eth.account.from_key(PRIVATE_KEY);
    tx_hash = w3.eth.send_transaction({
        "from": account,
        "to": firmResponse["tx"]["to"],
        "value": firmResponse["tx"]["value"]
    })
```

Alternatively if the trader is a smart contract the MainnetRFQ contract can be called by the smart contract using `tx.to` as the caller, `tx.value` as the value to send and `tx.data` as the calldata.

### 5b. Execute Swap Manually

Trader needs to invoke the "simpleSwap" function from the MainnetRFQ contract by passing Order and Signature data (Please check step 2 for contract details).

```solidity
    function simpleSwap(Order calldata _order, bytes calldata _signature)
```

**Order** Struct:
```solidity
    // firm order data structure sent to user from RFQ API
    struct Order {
        uint256 nonceAndMeta;
        uint128 expiry;
        address makerAsset;
        address takerAsset;
        address maker;
        address taker;
        uint256 makerAmount;
        uint256 takerAmount;
    }
```
Example Order Struct with descriptions:
```typescript
const order = {
    nonceAndMeta: "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eDf5a6f2600000000000",
    expiry: 1693940508,
    // destination token (USDC)
    makerAsset: "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54",
    // source token (AVAX)
    takerAsset: "0x0000000000000000000000000000000000000000",
    // mainnetRFQ contract address
    maker: "0x4C72Cd84BB81beD576B162A323f7842c863ab711",
    // address of contract/trader invoking swap
    taker: "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD",
    // destination amount (USDC)
    makerAmount: "1021956420",
    // source amount (AVAX)
    takerAmount: "100000000000000000000"
};
```
