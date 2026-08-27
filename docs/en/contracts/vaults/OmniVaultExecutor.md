---
headerDepth: 4
---

# OmniVaultExecutor

**OmniVaultExecutor**

The OmniVaultExecutor acts as an executor for OmniVaults by allowing an EOA trading bot to interact with trusted
        contracts via whitelisted function calls. Used on Dexalot L1 to place orders on TradePairs, withdraw funds
        via PortfolioSub &amp; claim rewards from IncentiveDistributor. Used on Mainnets to deposit funds via
        PortfolioMain, rebalance liquidity on DexalotRFQ &amp; manage assets from OmniVaults. Supports sending native
        currency and approving ERC20 tokens to trusted contracts based on their access levels.

## Variables

### Public

| Name | Type |
| --- | --- |
| OMNITRADER_ROLE | bytes32 |
| gasTopupAmount | uint256 |
| portfolio | address |
| prevGasTopupTs | uint256 |
| trustedContracts | mapping(address &#x3D;&gt; enum IOmniVaultExecutor.ContractAccess) |
| whitelistedFunctions | mapping(bytes4 &#x3D;&gt; address) |

### Private

| Name | Type |
| --- | --- |
| __gap | bytes32[50] |

## Methods

### Public

#### initialize

Initializes the OmniVaultExecutor contract

```solidity:no-line-numbers
function initialize(address _admin, address _omniTrader) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | The address to be granted the default admin role |
| _omniTrader | address | The EOA address to be granted the OMNITRADER_ROLE |

### External

#### receive

Allows the contract to receive native currency

```solidity:no-line-numbers
receive() external payable
```

#### fallback

Fallback function to delegate calls to whitelisted contracts based on function signatures

**Dev notes:** \
Only callable by addresses with the OMNITRADER_ROLE

```solidity:no-line-numbers
fallback() external payable
```

#### topupGas

Tops up gas for the trading bot on a weekly basis

**Dev notes:** \
Only callable by addresses with the OMNITRADER_ROLE

```solidity:no-line-numbers
function topupGas(bytes _swap) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swap | bytes | The encoded swap data containing the RFQ order and signature for swapping to native currency on mainnet, if empty will top up with native currency directly from Executor balance |

#### sendNative

Sends native token to a trusted contract

**Dev notes:** \
Only transferrable to contracts with NATIVE or NATIVE_AND_ERC20 access

```solidity:no-line-numbers
function sendNative(address payable _to, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address payable | The address of the trusted contract |
| _amount | uint256 | The amount of native to send |

#### approveToken

Approves an ERC20 token for a trusted contract

**Dev notes:** \
Only approvable to contracts with ERC20 or NATIVE_AND_ERC20 access

```solidity:no-line-numbers
function approveToken(address _token, address _spender, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the ERC20 token |
| _spender | address | The address of the trusted contract |
| _amount | uint256 | The amount of tokens to approve |

#### setWhitelistedFunctions

Sets multiple whitelisted functions and their corresponding target contracts

```solidity:no-line-numbers
function setWhitelistedFunctions(bytes4[] _funcSignatures, address[] _contracts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignatures | bytes4[] | An array of function signatures to whitelist |
| _contracts | address[] | An array of target contract addresses corresponding to the function signatures |

#### setWhitelistedFunction

Sets a single whitelisted function and its corresponding target contract

```solidity:no-line-numbers
function setWhitelistedFunction(bytes4 _funcSignature, address _contract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignature | bytes4 | The function signature to whitelist |
| _contract | address | The target contract address corresponding to the function signature |

#### removeWhitelistedFunction

Removes a whitelisted function

```solidity:no-line-numbers
function removeWhitelistedFunction(bytes4 _funcSignature) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignature | bytes4 | The function signature to remove from the whitelist |

#### setTrustedContract

Sets the access level for a trusted contract

```solidity:no-line-numbers
function setTrustedContract(address _contract, enum IOmniVaultExecutor.ContractAccess _access) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | The address of the trusted contract |
| _access | enum IOmniVaultExecutor.ContractAccess | The access level to assign to the trusted contract |

#### setPortfolio

Sets the portfolio contract address

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | The address of the portfolio contract |

#### setGasTopupAmount

Sets the weekly gas topup amount for the trading bot

```solidity:no-line-numbers
function setGasTopupAmount(uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | The amount of gas to top up weekly |

#### VERSION

```solidity:no-line-numbers
function VERSION() external pure virtual returns (bytes32)
```

### Internal

#### _setWhitelistedFunction

Internal function to set a whitelisted function and its target contract

**Dev notes:** \
Target contract must be a trusted contract, function signature can only be whitelisted
to one contract to avoid conflicts

```solidity:no-line-numbers
function _setWhitelistedFunction(bytes4 _funcSignature, address _contract) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _funcSignature | bytes4 | The function signature to whitelist |
| _contract | address | The target contract address corresponding to the function signature |

#### _topupGas

Internal function to top up gas for the trading bot by performing a swap on DexalotRFQ

```solidity:no-line-numbers
function _topupGas(uint256 _amount, bytes _swap) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | The amount of native currency to swap on mainnet |
| _swap | bytes | The encoded swap data containing the RFQ order and signature |

#### _withdrawNativeToBot

Internal function to withdraw native currency from Executor and send it to the trading bot

```solidity:no-line-numbers
function _withdrawNativeToBot(uint256 _amount) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | The amount of native currency to withdraw and send |

#### _returnData

Internal function to handle returning data or reverting based on call success

```solidity:no-line-numbers
function _returnData(bool _success) internal pure
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _success | bool | A boolean indicating whether the call was successful |

