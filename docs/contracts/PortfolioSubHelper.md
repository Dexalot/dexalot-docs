---
headerDepth: 4
---

# PortfolioSubHelper

**PortfolioSubHelper Contract to support PortfolioSub&#x27;s additional functions**

This contract is used to manage a list of rebate accounts. A rebate account
can have a preferential rate.
It also keeps a mapping for token convertion after the March 2024 upgrade to support
multichain

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| adminAccountsForRates | mapping(address &#x3D;&gt; bool) |
| organizations | mapping(address &#x3D;&gt; string) |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[50] |

### Private

| Name | Type |
| --- | --- |
| convertableTokens | mapping(bytes32 &#x3D;&gt; bytes32) |
| rateOverrides | mapping(address &#x3D;&gt; mapping(bytes32 &#x3D;&gt; struct IPortfolioSubHelper.Rates)) |

## Events

### AddressSet

```solidity:no-line-numbers
event AddressSet(string name, string actionName, address addressAdded, bytes32 customData)
```

## Methods

### External

#### initialize

Initialize the upgradeable contract

```solidity:no-line-numbers
function initialize() external
```

#### addAdminAccountForRates

Adds the given address to adminAccountsForRates

**Dev notes:** \
Only callable by admin. Admin accounts like treasury pays no fees for any trades
on any pairs

```solidity:no-line-numbers
function addAdminAccountForRates(address _account, string _organization) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address of admin account |
| _organization | string | Organization of the contract to be added |

#### removeAdminAccountForRates

Removes the given address from adminAccountsForRates

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeAdminAccountForRates(address _account) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address of the admin account |

#### isAdminAccountForRates

Checks if an address is in adminAccountsForRates

```solidity:no-line-numbers
function isAdminAccountForRates(address _account) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address of the admin account |

#### addRebateAccountForRates

Adds the given set of tradepair ids for a given address to rebateAccountsForRates

**Dev notes:** \
Only callable by admin. Rebates are set for each tradepair for a given address

```solidity:no-line-numbers
function addRebateAccountForRates(address _rebateAddress, string _organization, bytes32[] _tradePairIds, uint8[] _makerRates, uint8[] _takerRates) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rebateAddress | address | Address of rebate account |
| _organization | string | Organization / reason |
| _tradePairIds | bytes32[] | Array of TradePairIds |
| _makerRates | uint8[] | Array of maker rates |
| _takerRates | uint8[] | Array of taker rates |

#### removeTradePairsFromRebateAccount

Removes the a list of tradepairs of an address from rebateAccountsForRates

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeTradePairsFromRebateAccount(address _rebateAddress, bytes32[] _tradePairIds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rebateAddress | address | Address of the admin account |
| _tradePairIds | bytes32[] | Array of TradePairIds to remove |

#### getRates

Gets the preferential rates of maker and the taker if any

```solidity:no-line-numbers
function getRates(address _makerAddr, address _takerAddr, bytes32 _tradePairId, uint8 _makerRate, uint8 _takerRate) external view returns (uint256 makerRate, uint256 takerRate)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerAddr | address | Maker address of the trade |
| _takerAddr | address | Taker address of the trade |
| _tradePairId | bytes32 | TradePair Id |
| _makerRate | uint8 | tradepair's default maker rate |
| _takerRate | uint8 | tradepair's default taker rate |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| makerRate | uint256 | tradepair's default maker rate or preferential maker rate if any |
| takerRate | uint256 | tradepair's default taker rate or preferential taker rate if any |

#### addConvertibleToken

Adds a symbol to the convertible symbol mapping

**Dev notes:** \
Only admin can call this function. After the March 2024 upgrade we need to rename
3 current subnet symbols BTC.b, WETH.e and USDt to BTC, ETH, USDT to support multichain trading.
Tokens to convert to is controlled by the PortfolioSubHelper
All 3 following functions can technically be removed after the March 24 upgrade.

```solidity:no-line-numbers
function addConvertibleToken(bytes32 _fromSymbol, bytes32 _toSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _fromSymbol | bytes32 | Token to be converted from. |
| _toSymbol | bytes32 | trader address |

#### removeConvertibleToken

Removes a symbol to the convertible symbol mapping

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeConvertibleToken(bytes32 _fromSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _fromSymbol | bytes32 | Symbol to remove |

#### getSymbolToConvert

Gets  a symbol to the convertible symbol mapping

```solidity:no-line-numbers
function getSymbolToConvert(bytes32 _fromSymbol) external view returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _fromSymbol | bytes32 | From Symbol to be converted |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | _toSymbol To Symbol |

