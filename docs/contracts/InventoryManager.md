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
| portfolioBridgeSub | contract IPortfolioBridgeSub |

### Private

| Name | Type |
| --- | --- |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| inventoryBySubnetSymbol | mapping(bytes32 &#x3D;&gt; struct EnumerableMap.Bytes32ToUintMap) |

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
function initialize(address _portfolioBridgeSub, uint256 _A) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeSub | address | Address of PortfolioBridgeSub contract |
| _A | uint256 | A value for the invariant |

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

#### updateA

Updates the A value for the invariant

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updateA(uint256 _A) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _A | uint256 | A value for the invariant |

#### setInventoryBySymbolId

Sets host chains inventories for each token

**Dev notes:** \
Only admin can call this function. After the March 2024 we need to equal
inventoryBySymbolId portfolioSub.tokenTotals as the C-Chain will still be the only
destination from the subnet right after the upgrade. This function can be removed
after the upgrade

```solidity:no-line-numbers
function setInventoryBySymbolId(bytes32[] _tokens, uint256[] _quantities) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens in the from of SYMBOL + srcChainId |
| _quantities | uint256[] | Array of quantities |

#### convertSymbol

Converts the inventory of a token from one subnet symbol to another

**Dev notes:** \
Only portfolio bridge can call this function

```solidity:no-line-numbers
function convertSymbol(bytes32 _symbolId, bytes32 _fromSymbol, bytes32 _toSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | SymbolId of the token |
| _fromSymbol | bytes32 | Subnet symbol of the token to convert from |
| _toSymbol | bytes32 | Subnet symbol of the token to convert to |

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

#### set

Sets a new inventory for a token

**Dev notes:** \
Only used once for the initial setup of the inventory

```solidity:no-line-numbers
function set(bytes32 _symbol, bytes32 _symbolId, uint256 _quantity) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Subnet symbol of the token |
| _symbolId | bytes32 | SymbolId of the token |
| _quantity | uint256 | Quantity of the token |

