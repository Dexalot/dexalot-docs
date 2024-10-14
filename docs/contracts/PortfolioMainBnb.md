---
headerDepth: 4
---

# PortfolioMainBnb

**Mainnet Portfolio**

**Dev notes:** \
This contract prevalidates the PortfolioSub checks and allows deposits to be sent to the subnet.
ExchangeMain needs to have DEFAULT_ADMIN_ROLE on PortfolioMain.

## Variables

### Public

| Name | Type |
| --- | --- |
| tokenDecimalsConversionMap | mapping(bytes32 &#x3D;&gt; uint256) |

## Methods

### External

#### addTokenDecimalConverstion

Add Token Decimals conversion during deposit/withdraw specifically for BNB chain

**Dev notes:** \
USDC has 18 digits in BNB chain. We need to convert the decimals to 6 when depositing
and convert it back to 18 when withdrawing. Only ERC20 tokens can be converted

```solidity:no-line-numbers
function addTokenDecimalConverstion(bytes32 _symbol, uint256 _decimalsToConvert) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Token Symbol |
| _decimalsToConvert | uint256 | decimals to convert |

#### removeTokenDecimalConverstion

Remove Token Decimals conversion during deposit/withdraw

**Dev notes:** \
USDC has 18 digits in BNB chain. We need to convert the decimals to 6 when depositing
and convert it back to 18 when withdrawing

```solidity:no-line-numbers
function removeTokenDecimalConverstion(bytes32 _symbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Token Symbol |

### Private

#### addTokenDecimalConverstionPrivate

```solidity:no-line-numbers
function addTokenDecimalConverstionPrivate(bytes32 _symbol, uint256 _decimalsToConvert) private
```

