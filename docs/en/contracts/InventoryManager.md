---
headerDepth: 4
---

# InventoryManager

**InventoryManager**

Manages the inventory of tokens on the subnet and calculates withdrawal fees

**Dev notes:** \
The inventory is stored by subnet symbol and symbolId. The inventory is
         updated by the PortfolioBridgeSub contract. The withdrawal fee is calculated
         using the InventoryFeeCalculatorLibrary which uses the quantity requested,
         the current inventory in the requested chain and the total inventory across all chains.

## Variables

### Public

| Name | Type |
| --- | --- |
| K | uint256 |
| VERSION | bytes32 |
| futureK | uint256 |
| futureKTime | uint256 |
| portfolioBridgeSub | contract IPortfolioBridgeSub |
| scalingFactor | mapping(bytes32 &#x3D;&gt; uint256) |
| userProvidedLiquidity | mapping(bytes32 &#x3D;&gt; mapping(address &#x3D;&gt; uint256)) |

### Private

| Name | Type |
| --- | --- |
| MIN_K | uint256 |
| MAX_K | uint256 |
| MIN_K_UPDATE_TIME | uint256 |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| STARTING_K | uint256 |
| inventoryBySubnetSymbol | mapping(bytes32 &#x3D;&gt; struct EnumerableMap.Bytes32ToUintMap) |

## Events

### ScalingFactorUpdated

```solidity:no-line-numbers
event ScalingFactorUpdated(bytes32 symbolId, uint16 scalingFactor, uint256 timestamp)
```

### FutureKUpdated

```solidity:no-line-numbers
event FutureKUpdated(uint256 futureK, uint256 futureKTime, uint256 timestamp)
```

### KUpdated

```solidity:no-line-numbers
event KUpdated(uint256 K, uint256 timestamp)
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

Increments the inventory of a token and the liquidity provided by the users from each chain

**Dev notes:** \
Only called by the PortfolioBridgeSub contract for processing a deposit

```solidity:no-line-numbers
function increment(struct IPortfolioBridgeSub.XferShort _deposit) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _deposit | struct IPortfolioBridgeSub.XferShort | Deposit struct |

#### decrement

Decrements the inventory of a token and the liquidity provided by the users from each chain

**Dev notes:** \
Only called by the PortfolioBridgeSub contract for processing a withdrawal.

```solidity:no-line-numbers
function decrement(struct IPortfolioBridgeSub.XferShort _withdrawal) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _withdrawal | struct IPortfolioBridgeSub.XferShort | Withdrawal transaction |

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

#### calculateWithdrawalFee

Calculates the withdrawal fee for a token

**Dev notes:** \
The fee is calculated using the InventoryFeeCalculatorLibrary which uses the quantity requested,
         the current inventory in the requested chain and the total inventory across all chains.

```solidity:no-line-numbers
function calculateWithdrawalFee(struct IPortfolioBridgeSub.XferShort _withdrawal) external view returns (uint256 fee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _withdrawal | struct IPortfolioBridgeSub.XferShort | Withdrawal transaction |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint256 | Withdrawal fee, 0 if no fee |

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
function setScalingFactors(bytes32[] _symbolIds, uint16[] _scalingFactors) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolIds | bytes32[] | SymbolIds of the token |
| _scalingFactors | uint16[] | New scaling factors to set |

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

#### updateFutureK

Updates the Future K value for the invariant

**Dev notes:** \
Only admin can call this function, K must be between 8 and 32 and a multiple of 4

```solidity:no-line-numbers
function updateFutureK(uint256 _K, uint256 _timePeriod) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _K | uint256 | New K value for the invariant |
| _timePeriod | uint256 | Time period for the new K value to take effect |

#### updateK

Updates the K value for the invariant using futureK

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updateK() external
```

