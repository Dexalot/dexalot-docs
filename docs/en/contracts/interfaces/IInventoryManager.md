---
headerDepth: 4
---

# IInventoryManager

## Methods

### External

#### remove

```solidity:no-line-numbers
function remove(bytes32 _symbol, bytes32 _symbolId) external returns (bool)
```

#### increment

```solidity:no-line-numbers
function increment(struct IPortfolioBridgeSub.XferShort _xferShort) external
```

#### decrement

```solidity:no-line-numbers
function decrement(struct IPortfolioBridgeSub.XferShort _xferShort) external
```

#### get

```solidity:no-line-numbers
function get(bytes32 _symbol, bytes32 _symbolId) external view returns (uint256)
```

#### calculateWithdrawalFee

```solidity:no-line-numbers
function calculateWithdrawalFee(struct IPortfolioBridgeSub.XferShort _xferShort) external view returns (uint256)
```

