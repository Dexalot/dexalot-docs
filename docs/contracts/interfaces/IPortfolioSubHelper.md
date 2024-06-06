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
### Rebates

```solidity
struct Rebates {
  uint8 maker;
  uint8 taker;
}
```

## Methods

### External

#### getRates

```solidity:no-line-numbers
function getRates(address _makerAddr, address _takerAddr, bytes32 _tradePairId, uint256 _makerRate, uint256 _takerRate) external view returns (uint256 maker, uint256 taker)
```

#### isAdminAccountForRates

```solidity:no-line-numbers
function isAdminAccountForRates(address _account) external view returns (bool)
```

