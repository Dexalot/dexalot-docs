---
headerDepth: 4
---

# Exchange

**Abstract contract to be inherited in ExchangeMain and ExchangeSub**

Exchange is an administrative wrapper contract that provides different access levels
using [OpenZeppelin](https://www.openzeppelin.com) AccessControl roles.
Currently it has DEFAULT_ADMIN_ROLE and AUCTION_ADMIN_ROLE.

**Dev notes:** \
Exchange is DEFAULT_ADMIN to all Portfolio implementation contracts and TradePairs contract.
Exchange is also the AuctionManager using AUCTION_ADMIN_ROLE.
Auction Admin Functions can only be invoked from the Exchange contracts.
All the functions pertaining to Auction can also be called directly in
TradePairs and Portfolio using DEFAULT_ADMIN_ROLE but not recommended because certain
actions require a synchronized update to both Portfolio and TradePairs contracts.

## Variables

### Public

| Name | Type |
| --- | --- |
| AUCTION_ADMIN_ROLE | bytes32 |

### Internal

| Name | Type |
| --- | --- |
| portfolio | contract IPortfolio |

## Events

### PortfolioSet

```solidity:no-line-numbers
event PortfolioSet(contract IPortfolio _oldPortfolio, contract IPortfolio _newPortfolio)
```

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

## Methods

### Public

#### pausePortfolio

(Un)pause portfolio operations

**Dev notes:** \
This also includes deposit/withdraw processes

```solidity:no-line-numbers
function pausePortfolio(bool _pause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### stringToBytes32

**Dev notes:** \
utility function to convert string to bytes32

```solidity:no-line-numbers
function stringToBytes32(string _string) public pure returns (bytes32 result)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _string | string | string to convert |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | bytes32 | bytes32 representation of the string |

#### bytes32ToString

**Dev notes:** \
utility function to convert bytes32 to string

```solidity:no-line-numbers
function bytes32ToString(bytes32 _bytes32) public pure returns (string)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bytes32 | bytes32 | bytes32 to convert |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | string  string representation of the bytes32 |

### External

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grants admin role to the deployer.

```solidity:no-line-numbers
function initialize() external virtual
```

#### addAdmin

Adds Default Admin role to the address

```solidity:no-line-numbers
function addAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to add role to |

#### removeAdmin

Removes Default Admin role from the address

```solidity:no-line-numbers
function removeAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to remove role from |

#### isAdmin

```solidity:no-line-numbers
function isAdmin(address _address) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool    true if address has Default Admin role |

#### addAuctionAdmin

Adds Auction Admin role to the address

```solidity:no-line-numbers
function addAuctionAdmin(address _address) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to add role to |

#### removeAuctionAdmin

Removes Auction Admin role from the address

```solidity:no-line-numbers
function removeAuctionAdmin(address _address) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to remove role from |

#### isAuctionAdmin

```solidity:no-line-numbers
function isAuctionAdmin(address _address) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  true if address has Auction Admin role |

#### setPortfolio

Set portfolio address

```solidity:no-line-numbers
function setPortfolio(contract IPortfolio _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | contract IPortfolio | address of portfolio contract |

#### getPortfolio

```solidity:no-line-numbers
function getPortfolio() external view returns (contract IPortfolio)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IPortfolio | IPortfolio  portfolio contract |

#### pauseForUpgrade

Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### fallback

```solidity:no-line-numbers
fallback() external
```

