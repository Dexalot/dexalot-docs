---
headerDepth: 4
---

# IPortfolioSubHelper

**Interface of RebateAccounts**

## Struct Types

### Rates

```solidity
struct Rates {
  bytes32 tradePairId;
  uint8 makerRate;
  uint8 takerRate;
}
```

## Methods

### External

#### getRates

```solidity:no-line-numbers
function getRates(address _makerAddr, address _takerAddr, bytes32 _tradePairId, uint8 _makerRate, uint8 _takerRate) external view returns (uint256 makerRate, uint256 takerRate)
```

#### isAdminAccountForRates

```solidity:no-line-numbers
function isAdminAccountForRates(address _account) external view returns (bool)
```

#### getSymbolToConvert

```solidity:no-line-numbers
function getSymbolToConvert(bytes32 _fromSymbol) external view returns (bytes32)
```

