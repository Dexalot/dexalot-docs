---
icon: link
prev: Websocket
editLink: true
---

# Simple Swap Integration

## What is Simple Swap

Dexalot provides the Simple Swap flow to make trading easier for our users. Using the Simple Swap feature a user can get Firm Quotes from Dexalot Simple Swap Service. A Firm Quote is a signed trade commitment provided by Dexalot given for a specific trader address for a limited amount of time.

Using this signature a user may chose to execute the trade by interacting with Dexalot MainnetRFQ contract deployed on Avalanche C-Chain whuch results in swapping the promised assets in a single contract invocation.

> **Warning**: Getting a Firm Quote will allocate the liquidity to you for a specific amount of time, so in order to provide fair use of the service we are tracking Firm Qutoe requests and may blacklist the requester if we see FirmQuote requests without any executions. Firm Quote endpoint should only be used when trader intends to execute on the trade.

## Integration Steps

1. Fetch available Simple Swap enabled pairs and related info
2. Fetch MainnetRFQ contract details
3. Request Simple Quote from Dexalot Quote Provider to have the approximate price
4. Request Firm Quote from Dexalot Quote Provider to get the committed amounts and signature
5. Execute the trade using Mainnet RFQ Contract

### 1. Fetch Trade Pairs
Details for api endpoint to call: [Fetch Pairs](../RestApi.hml#get-pairs "Get Pairs")

In the response please take a note of the following fields:

```json
{
    "pair": "AVAX/USDC",
    "allowswap": true,
    "baseaddress": null,
    "quoteaddress": "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54"
}
```

Quote provider will only give signed quotes for pairs marked as allowswap equals true.

Base asset and quote asset fields hold the ERC20 contract address for that specific token and since this is on Avalanche C-Chain null means the native token "AVAX".

### 2. Fetch MainnetRFQ Contract Details
Example Api Call:
```bash
curl --location 'https://api.dexalot.com/privapi/trading/deployment?returnabi=true&contracttype=MainnetRFQ'
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

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/pairprice?pair=AVAX/USDC&amount=120&side=1&isbase=1'
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

### 4. Request Firm Quote

> **Warning**: Frequently calling this endpoint with no executions may cause the trader to get banned.

Firm Quote endpoint will return a signature which contains trade details. This signature is only valid for the given trader address and will expire after a short period of time.

Endpoint (GET):
```
https://api.dexalot.com/api/rfq/firmQuote
```

| **Field Name**        | **Required** | **Sample Value**                      |
|---------------------- |--------------|------------------------------------   |
| pair                  | Y | \[AVAX/USDC, ALOT/USDC ...\] |
| amount                | Y | The amount from which the quote will be calculated from |
| isbase                | Y | 0/1 This parameter tells the quote provider what unit the amount has. For AVAX/USDC example where AVAX is base and USDC is the quote asset. If the trader wants to get price for 100 USDC worth trade, isbase parameter should be set to 0. System will calculate corresponding AVAX amount for 100 USDC to provide the quote.
| side                  | Y | 0/1 e.g. for AVAX/USDC pair side should be 0 to buy AVAX and 1 for selling AVAX |
| address               | Y | Trader address: 0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD |
| channel               | Y | Reach out to Dexalot team to register your channel (coupled with an api-key) |

Example Request:
```bash
curl --location 'https://api.dexalot.com/api/rfq/firmQuote?pair=AVAX%2FUSDC&amount=100&side=1&isbase=1&address=0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eD&channel=dexalot'
```

Sample success response:
```json
{
    "success": true,
    "quote": {
        "baseAmount": "100",
        "quoteAmount": "1021.95642",
        "expiry": 1693940508,
        "pair": "AVAX/USDC",
        "price": "10.2195642035",
        "side": 1,
        "usdAmount": "989.782",
        "wMid": "10.25",
        "baseAddress": "0x0000000000000000000000000000000000000000",
        "quoteAddress": "0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54",
        "nonceAndMeta": "0x05A1AAC00662ADda4Aa25E1FA658f4256ed881eDf5a6f2600000000000",
        "signature": "0x9faaa36269ab5329555f5df02afff357039f3d84db9ff6c8f74c096d1a0f1db75096ca6c3aa7d80688e3f3ea9df249171de5040a910c22537038e577b03592072c",
        "baseAmountBn": "100000000000000000000",
        "quoteAmountBn": "1021956420"
    }
}
```
Response fields:
* For  AVAX/USDC pair => [Base]/[Quote], AVAX = Base, USDC = Quote
* Base/Quote Amounts: Amounts for assets to be traded
* Expiry: How long this signature is valid for
* NonceAndMeta: This field will be needed to invoke contract to execute swap
* Signature: Signature which contains the trade details
* BaseAmountBn: BigNumber representation of Base Amount
* QuoteAmountBn: BigNumber representation of Quote Amount

Sample error response:
```json
{
    "success": false,
    "reason": "99094.7$ out of quote limits for this pair",
    "reasonCode": "FQ-003"
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
