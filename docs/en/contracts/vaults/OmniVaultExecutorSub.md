---
headerDepth: 4
---

# OmniVaultExecutorSub

**OmniVaultExecutorSub**

The OmniVaultExecutorSub extends the OmniVaultExecutor to provide additional functionalities specific to
        OmniVault operations. It allows the OmniVaultManager to dispatch assets, collects swap fees from mainnet
        swaps, and manages gas top-ups for the trading bot. This contract interacts with the PortfolioSub contract
        to facilitate asset transfers and fee management.

## Variables

### Public

| Name | Type |
| --- | --- |
| ADMIN_BE_ROLE | bytes32 |
| feeManager | address |
| omniVaultManager | address |

### Private

| Name | Type |
| --- | --- |
| __gap | bytes32[50] |

## Methods

### External

#### dispatchAssets

Dispatches assets from the OmniVaultExecutor to a specified recipient

**Dev notes:** \
Only callable by the OmniVaultManager contract

```solidity:no-line-numbers
function dispatchAssets(address recipient, bytes32[] tokens, uint256[] amounts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient | address | The address to receive the assets |
| tokens | bytes32[] | An array of token symbols to be dispatched |
| amounts | uint256[] | An array of amounts corresponding to each token symbol |

#### collectSwapFees

Collects swap fees from mainnet swaps and transfers them to the fee manager

**Dev notes:** \
Only callable by addresses with the ADMIN_BE_ROLE

```solidity:no-line-numbers
function collectSwapFees(bytes32 feeSymbol, uint256[] swapIds, uint256[] fees) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| feeSymbol | bytes32 | The symbol of the fee token |
| swapIds | uint256[] | An array of swap IDs for which fees are being collected |
| fees | uint256[] | An array of fee amounts corresponding to each swap ID |

#### setOmniVaultManager

Sets the OmniVaultManager contract address

```solidity:no-line-numbers
function setOmniVaultManager(address _omniVaultManager) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _omniVaultManager | address | The address of the OmniVaultManager contract |

#### setFeeManager

Sets the fee manager address

```solidity:no-line-numbers
function setFeeManager() external
```

#### VERSION

```solidity:no-line-numbers
function VERSION() external pure virtual returns (bytes32)
```

### Internal

#### _topupGas

Top-ups the trading bot's gas by withdrawing ALOT from PortfolioSub
and sending it to the bot EOA address. Can only be called once per week.

**Dev notes:** \
Only callable by addresses with the OMNITRADER_ROLE

```solidity:no-line-numbers
function _topupGas(uint256 _amount, bytes) internal
```

