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
function increment(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external
```

#### decrement

```solidity:no-line-numbers
function decrement(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external
```

#### get

```solidity:no-line-numbers
function get(bytes32 _symbol, bytes32 _symbolId) external view returns (uint256)
```

#### convertSymbol

```solidity:no-line-numbers
function convertSymbol(bytes32 _symbolId, bytes32 _fromSymbol, bytes32 _toSymbol) external
```

#### calculateWithdrawalFee

```solidity:no-line-numbers
function calculateWithdrawalFee(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external view returns (uint256)
```

