---
headerDepth: 4
---

# IMainnetRFQ

**Interface of MainnetRFQ**

## Methods

### External

#### processXFerPayload

```solidity:no-line-numbers
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction, bytes28 _customdata) external
```

#### pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

```solidity:no-line-numbers
function unpause() external
```

#### receive

```solidity:no-line-numbers
receive() external payable
```

