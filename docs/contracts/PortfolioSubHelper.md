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
| minTakerRate | uint256 |
| organizations | mapping(address &#x3D;&gt; string) |
| rateOverrides | mapping(address &#x3D;&gt; mapping(bytes32 &#x3D;&gt; struct IPortfolioSubHelper.Rates)) |
| rebates | mapping(address &#x3D;&gt; struct IPortfolioSubHelper.Rebates) |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[48] |

### Private

| Name | Type |
| --- | --- |
| convertableTokens | mapping(bytes32 &#x3D;&gt; bytes32) |

## Events

### RateChanged

```solidity:no-line-numbers
event RateChanged(string name, string actionName, address addressAdded, bytes32 customData, uint8 maker, uint8 taker)
```

## Methods

### External

#### initialize

Initialize the upgradeable contract

```solidity:no-line-numbers
function initialize() external
```

#### setMinTakerRate

Sets the minimum Taker rate that is possible after the volume rebates

**Dev notes:** \
Only callable by admin.

```solidity:no-line-numbers
function setMinTakerRate(uint256 _rate) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rate | uint256 | Minimum Taker rate after volume rebates |

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

#### addVolumeBasedRebates

Adds the given address to rebates mapping that keeps track of volume based rebates.

**Dev notes:** \
Only callable by admin. Rebates are set for each address. An offchain application
checks the 30 days rolling volume and calculates the discount the address is eligible for.
Pass 0 & 0 maker taker rebates to delete the rebate address from the mapping.

```solidity:no-line-numbers
function addVolumeBasedRebates(address[] _rebateAddress, uint8[] _makerRebates, uint8[] _takerRebates) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rebateAddress | address[] | Array of rebate accounts |
| _makerRebates | uint8[] | Array of maker rebates |
| _takerRebates | uint8[] | Array of taker rebates |

#### addToRateOverrides

Adds the given set of tradepairs for a given address to rateOverrides. Usually used
for contracted market makers. (0.20% = 20 bps = 20/10000)
Use 255 for logical deletion of one leg and keep the other leg. If both need to be deleted,
use removeTradePairsFromRateOverrides function

**Dev notes:** \
Only callable by admin. Overrides are set for each tradepair for a given address.
if you pass the max uint8 value 255 to either maker or taker rate, it will use the default maker/taker
this is for situations where you want to have a preferential rate on the maker and also wanting to make
use of volume rebates on the taker side or visa versa

```solidity:no-line-numbers
function addToRateOverrides(address _account, string _organization, bytes32[] _tradePairIds, uint8[] _makerRates, uint8[] _takerRates) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address for the override to be applied |
| _organization | string | Organization / reason |
| _tradePairIds | bytes32[] | Array of TradePairIds |
| _makerRates | uint8[] | Array of maker rates |
| _takerRates | uint8[] | Array of taker rates |

#### removeTradePairsFromRateOverrides

Removes the a list of tradepairs of an address from rateOverrides

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeTradePairsFromRateOverrides(address _account, bytes32[] _tradePairIds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address of the admin account |
| _tradePairIds | bytes32[] | Array of TradePairIds to remove |

#### getRates

Gets the preferential rates of maker and the taker if any

**Dev notes:** \
255 is used for logical deletion of one leg of preferential rates pair.
Priority 1- check admin rates, 2- preferential rates, 3- Volume Rebates 4- Default rate
Default rates are multiplied by 10 for an additional precision when dealing with default rates
of 1 or 2 bps. Without this, we can't have any rates in between 1 and 2 bps. But with it, we can
have 10(1 bps)-11(1.1 bps)... 19-20(2 bps)
Portfolio.TENK denominator has been multipled by 10 and was changed to 100000 to level the increase.

```solidity:no-line-numbers
function getRates(address _makerAddr, address _takerAddr, bytes32 _tradePairId, uint256 _makerRate, uint256 _takerRate) external view returns (uint256 maker, uint256 taker)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerAddr | address | Maker address of the trade |
| _takerAddr | address | Taker address of the trade |
| _tradePairId | bytes32 | TradePair Id |
| _makerRate | uint256 | tradepair's default maker rate uint8 and < 100 |
| _takerRate | uint256 | tradepair's default taker rate uint8 and < 100 |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| maker | uint256 | tradepair's default maker rate or discounted rate if any |
| taker | uint256 | tradepair's default taker rate or discounted rate if any |

