---
headerDepth: 4
---

# InventoryManager

**InventoryManager**

Manages the inventory of tokens on the subnet and calculates withdrawal fees

**Dev notes:** \
The inventory is stored by subnet symbol and symbolId. The inventory is
         updated by the PortfolioBridgeSub contract. The withdrawal fee is calculated
         using the InvariantMathLibrary which use the stableswap invariant to calculate
         the fee. The fee is based on the quantity requested, the current inventory in
         the requested chain and the total inventory across all chains.

## Variables

### Public

| Name | Type |
| --- | --- |
| A | uint256 |
| VERSION | bytes32 |
| futureA | uint256 |
| futureATime | uint256 |
| portfolioBridgeSub | contract IPortfolioBridgeSub |
| scalingFactor | mapping(bytes32 &#x3D;&gt; uint256) |

### Private

| Name | Type |
| --- | --- |
| MIN_A | uint256 |
| MAX_A | uint256 |
| MIN_A_UPDATE_TIME | uint256 |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| STARTING_A | uint256 |
| inventoryBySubnetSymbol | mapping(bytes32 &#x3D;&gt; struct EnumerableMap.Bytes32ToUintMap) |

## Events

### ScalingFactorUpdated

```solidity:no-line-numbers
event ScalingFactorUpdated(bytes32 symbolId, uint8 scalingFactor, uint256 timestamp)
```

### FutureAUpdated

```solidity:no-line-numbers
event FutureAUpdated(uint256 futureA, uint256 futureATime, uint256 timestamp)
```

### AUpdated

```solidity:no-line-numbers
event AUpdated(uint256 A, uint256 timestamp)
```

### PortfolioBridgeSubUpdated

```solidity:no-line-numbers
event PortfolioBridgeSubUpdated(address portfolioBridgeSub)
```

## Methods

### Public

#### get

Gets the inventory of a token

```solidity:no-line-numbers
function get(bytes32 _symbol, bytes32 _symbolId) public view returns (uint256 inventory)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| inventory | uint256 | Inventory of the token, 0 if not present |

### External

#### initialize

Initialize the upgradeable contract

```solidity:no-line-numbers
function initialize(address _portfolioBridgeSub) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeSub | address | Address of PortfolioBridgeSub contract |

#### getInventoryBySubnetSymbol

```solidity:no-line-numbers
function getInventoryBySubnetSymbol(bytes32 _symbol) external view returns (bytes32[], uint256[])
```

#### increment

Increments the inventory of a token

**Dev notes:** \
Only called by the PortfolioBridgeSub contract for processing a deposit

```solidity:no-line-numbers
function increment(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |
| _quantity | uint256 | Quantity to increment |

#### decrement

Decrements the inventory of a token

**Dev notes:** \
Only called by the PortfolioBridgeSub contract for processing a withdrawal

```solidity:no-line-numbers
function decrement(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |
| _quantity | uint256 | Quantity to decrement |

#### remove

Removes a token from the inventory

**Dev notes:** \
Only called by the PortfolioBridgeSub contract

```solidity:no-line-numbers
function remove(bytes32 _symbol, bytes32 _symbolId) external returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the token was removed and inventory 0, false if inventory remaining |

#### updatePortfolioBridgeSub

Updates the PortfolioBridgeSub contract address

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updatePortfolioBridgeSub(address _portfolioBridgeSub) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeSub | address | Address of PortfolioBridgeSub contract |

#### setScalingFactors

Updates the scaling factor for a number of tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setScalingFactors(bytes32[] _symbolIds, uint8[] _scalingFactors) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolIds | bytes32[] | SymbolIds of the token |
| _scalingFactors | uint8[] | New scaling factors to set |

#### removeScalingFactors

Removes multiple scaling factors for non-existent tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function removeScalingFactors(bytes32[] _symbolIds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolIds | bytes32[] | SymbolIds of the tokens to remove |

#### updateFutureA

Updates the Future A value for the invariant

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updateFutureA(uint256 _A, uint256 _timePeriod) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _A | uint256 | New A value for the invariant |
| _timePeriod | uint256 | Time period for the new A value to take effect |

#### updateA

Updates the A value for the invariant using futureA

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updateA() external
```

#### calculateWithdrawalFee

Calculates the withdrawal fee for a token

**Dev notes:** \
Uses the InvariantMathLibrary to provide exponential fees if
inventory is spread across multiple chains, unbalanced and quantity is large

```solidity:no-line-numbers
function calculateWithdrawalFee(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) external view returns (uint256 fee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |
| _quantity | uint256 | Quantity to withdraw |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint256 | Withdrawal fee |

### Private

#### scaleInventory

Scales the inventory of a token using its scaling factor

```solidity:no-line-numbers
function scaleInventory(bytes32 _symbolId, uint256 _inventory) private view returns (uint256, uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | SymbolId of the token |
| _inventory | uint256 | Inventory to scale |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | scaledInventory  Scaled inventory |
| [1] | uint256 | sf  Scaling factor |

