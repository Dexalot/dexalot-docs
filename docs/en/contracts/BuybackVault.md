---
headerDepth: 4
---

# BuybackVault

**Holds the buyback share of protocol fees and converts it to ALOT**

Receives whatever the FeeCollector does not route to the treasury. A bot converts the basket
into ALOT on TradePairs at its own pace, so unsold inventory is simply buyback inventory not yet
converted and there is no separate reserve.

**Dev notes:** \
Conversion uses the same whitelisted function dispatch as the OmniVaults so the existing bot
tooling works unchanged. The dispatcher authorises a selector, never its arguments, so any selector
that can move value out must never be whitelisted. Value is intended to leave only via burnAlot and
sendRewards.burnAlot is a fixed withdrawal to the AlotBurner on the destination chain, where the ALOT
is destroyed. sendRewards is a fixed transfer to the IncentiveDistributor contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| CONVERTER_ROLE | bytes32 |
| TREASURER_ROLE | bytes32 |
| VERSION | bytes32 |
| burner | address |
| burnChainId | uint32 |
| incentiveDistributor | address |
| portfolio | contract IPortfolioSub |
| trustedContracts | mapping(address &#x3D;&gt; bool) |
| whitelistedFunctions | mapping(bytes4 &#x3D;&gt; address) |

### Private

| Name | Type |
| --- | --- |
| ALOT | bytes32 |
| BURN_BRIDGE | enum IPortfolioBridge.BridgeProvider |

## Events

### WhitelistedFunctionUpdate

```solidity:no-line-numbers
event WhitelistedFunctionUpdate(bytes4 funcSignature, address target)
```

### TrustedContractUpdate

```solidity:no-line-numbers
event TrustedContractUpdate(address target, bool trusted)
```

### AddressSet

```solidity:no-line-numbers
event AddressSet(string name, string actionName, address oldAddress, address newAddress)
```

### BurnCommitted

Emitted when ALOT is sent to the burner

**Dev notes:** \
Burned on the destination chain c-chain

```solidity:no-line-numbers
event BurnCommitted(uint256 amount)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | ALOT sent |
### RewardsPaid

Emitted when the rewards leg is paid

```solidity:no-line-numbers
event RewardsPaid(bytes32 symbol, uint256 amount)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| symbol | bytes32 | Symbol paid out |
| amount | uint256 | Amount sent |

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(address _burner, uint32 _burnChainId) public
```

### External

#### initialize

Initializer

```solidity:no-line-numbers
function initialize(address _portfolio, address _incentiveDistributor, address _admin) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | PortfolioSub address |
| _incentiveDistributor | address | Address receiving the rewards leg |
| _admin | address | Address with admin privileges |

#### receive

Accepts native ALOT

**Dev notes:** \
Required. PortfolioSub pushes native ALOT to any holder of an ALOT balance via autoGas,
and PortfolioBridgeMain refunds the fee payer with a zero value call during withdrawals, so
without this burnAlot reverts with PB-UFPR-01.

```solidity:no-line-numbers
receive() external payable
```

#### fallback

Forwards a whitelisted call to its trusted target with this contract as msg.sender

**Dev notes:** \
Used by the converter bot to place and cancel orders on TradePairs. Authorises the
selector only, never its arguments.

```solidity:no-line-numbers
fallback() external payable
```

#### burnAlot

Sends ALOT to the burner on the destination chain, where it is destroyed

**Dev notes:** \
One way. The route is fixed at deployment, see burner and burnChainId. The amount that
arrives is lower than `_amount` because bridge fees are deducted in transit, so AlotBurner reads
its own balance rather than trusting a messaged figure.

```solidity:no-line-numbers
function burnAlot(uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | ALOT to send |

#### sendRewards

Pays the rewards leg to the incentive distributor

**Dev notes:** \
Symbol is a parameter so rewards can be paid in stablecoins rather than in the ALOT the
buyback just acquired, which would create sell pressure with tokens bought to reduce supply.

```solidity:no-line-numbers
function sendRewards(bytes32 _symbol, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol to pay out |
| _amount | uint256 | Amount to send |

#### setPortfolio

Sets the PortfolioSub address

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | New PortfolioSub address |

#### setIncentiveDistributor

Sets the rewards distributor address

```solidity:no-line-numbers
function setIncentiveDistributor(address _incentiveDistributor) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _incentiveDistributor | address | New rewards distributor address |

#### setTrustedContract

Marks a contract as a valid dispatch target

```solidity:no-line-numbers
function setTrustedContract(address _target, bool _trusted) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _target | address | Contract address |
| _trusted | bool | True to trust, false to remove |

#### setWhitelistedFunctions

Whitelists a batch of function signatures against their targets

```solidity:no-line-numbers
function setWhitelistedFunctions(bytes4[] _funcSignatures, address[] _targets) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignatures | bytes4[] | Selectors to whitelist |
| _targets | address[] | Corresponding target contracts |

#### removeWhitelistedFunction

Removes a whitelisted function

```solidity:no-line-numbers
function removeWhitelistedFunction(bytes4 _funcSignature) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignature | bytes4 | Selector to remove |

### Private

#### _setWhitelistedFunction

Whitelists one selector against a trusted target

**Dev notes:** \
A selector can only map to one target. Never whitelist transferToken, bulkTransferTokens,
withdrawToken or withdrawNative: the dispatcher cannot constrain arguments, so any of those would
let the converter bot move the vault's balance anywhere.

```solidity:no-line-numbers
function _setWhitelistedFunction(bytes4 _funcSignature, address _target) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignature | bytes4 | Selector to whitelist |
| _target | address | Trusted target contract |

#### _returnData

Bubbles the target's return data or revert reason

```solidity:no-line-numbers
function _returnData(bool _success) private pure
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _success | bool | Whether the forwarded call succeeded |

