---
icon: link
prev: Websocket
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
https://api.dexalot.com/privapi/trading/pairs
```

In the response please take a note of the following fields:

```json
{
    "pair": "AVAX/USDC",
    "allowswap": true,
    "baseaddress": null,
    "quoteaddress": "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54",
    "base_evmdecimals": 18,
    "quote_evmdecimals": 6
}
```

Quote provider will only give signed quotes for pairs marked as allowswap equals true.

Base asset and quote asset fields hold the ERC20 contract address for that specific token and since this is on Avalanche C-Chain null means the native token "AVAX".

### 2. Fetch MainnetRFQ Contract Details
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
        "address": "0xd62f9E53Be8884C21f5aa523B3c7D6F9a0050af5",
        "impl_address": "0xe07e60594653D03165402D3B491d30Fe2d2C0A6A",
        "version": "1.0.2",
        "owner": "0xbFD53904e0A0c02eFB7e76aad7FfB1F476320038",
        "status": "deployed",
        "action": null,
        "abi": {

        }
    }]
```

You will need the contract address and abi details when performing the contract call in the final step.

### 3. Request Simple Quote (optional)

For standard price checks Simple Quote endpoint should be used.
This request should contain x-apikey header in order to receive special prices defined for your channel.

Endpoint (GET):
```
https://api.dexalot.com/api/rfq/pairprice
```

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| pair                  | Y | \[AVAX/USDC, ALOT/USDC ...\] |
| amount                | Y | The amount from which the quote will be calculated from |
| isbase                | Y | 0/1 This parameter tells the quote provider what unit the amount has. For AVAX/USDC example where AVAX is base and USDC is the quote asset. If the trader wants to get price for 100 USDC worth trade, isbase parameter should be set to 0. System will calculate corresponding AVAX amount for 100 USDC to provide the quote.
| side                  | Y | 0/1 e.g. for AVAX/USDC pair side should be 0 to buy AVAX and 1 for selling AVAX |
| channel               | N | Reach out to Dexalot team to register your channel (coupled with an api-key) |

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/pairprice?pair=AVAX/USDC&amount=120&side=1&isbase=1' --header 'x-apikey: API_KEY'
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

### 4 Request Firm Quote
> **Warning**: Frequently calling this endpoint with no executions may cause the trader to get banned.

Firm Quote endpoint will return a signature which contains trade details. This signature is only valid for the given trader address and will expire after a short period of time.

This request should contain x-apikey header in order to receive special prices defined for your channel. Please reach out to Dexalot team if you are planning to integrate to our RFQ system.

For this endpoint Taker and Maker terms are defined as follows:
Dexalot RFQ contract is always the maker and the trader is always the taker.

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| takerAsset            | Y | The ERC20 address of the asset Taker (The trader) is providing to the trade |
| makerAsset            | Y | The ERC20 address of the asset Maker (Dexalot RFQ Contract) is providing to the trade |
| takerAmount           | Y | The amount of taker asset for the trade. Should be multiplied by evm_decimals of the taker asset. e.g. for USDC evm_decimals = 6, for a 100 USD trade this number should be 100000000 |
| userAddress               | Y | Trader address: 0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD |

Endpoint (POST):
```
https://api.dexalot.com/api/rfq/firm
```
Req Body:
```json
{
  "takerAsset": "0xTOKEN_ADDRESS_TAKER",
  "makerAsset": "0xTOKEN_ADDRESS_MAKER",
  "takerAmount": "200000000",
  "userAddress": "0xTRADER_ADDRESS"
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
        "maker": "0xd62f9E53Be8884C21f5aa523B3c7D6F9a0050af5",
        "taker": "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57",
        "makerAmount": "21483696748316475197",
        "takerAmount": "200000000",
        "signature": "0xbdcd5728194a953a01b2f9bf6d474b2014979e0768fc5b5b707c988a3be89ccf7bccbc61ea19b1ee49802bcb4dfbe7585e4d26236bb18aac11b9d92d3085c6d91c"
    }
}
```

### 5. Execute Swap

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
