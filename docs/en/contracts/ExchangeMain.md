---
headerDepth: 4
---

# ExchangeMain

**Mainnet Exchange**

This contract is the mainnet version of the Dexalot Exchange.

**Dev notes:** \
ExchangeMain is DEFAULT_ADMIN to PortfolioMain contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Internal

| Name | Type |
| --- | --- |
| mainnetRfq | contract IMainnetRFQ |
| priceFeed | address |

## Methods

### Public

#### pauseMainnetRfq

(Un)pause pauseMainnetRfq operations

```solidity:no-line-numbers
function pauseMainnetRfq(bool _pause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

### External

#### pauseForUpgrade

(Un)pauses portfolioMain, portfolioBridgeMain & MainnetRFQ for upgrade

```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### setMainnetRFQ

Set MainnetRFQ address

**Dev notes:** \
Only admin can set MainnetRFQ address.
There is a one to one relationship between MainnetRFQ and ExchangeMain.

```solidity:no-line-numbers
function setMainnetRFQ(address payable _mainnetRfq) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mainnetRfq | address payable | MainnetRFQ address |

#### getMainnetRfq

```solidity:no-line-numbers
function getMainnetRfq() external view returns (contract IMainnetRFQ)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IMainnetRFQ | IMainnetRFQ  MainnetRFQ contract |

#### addToken

Add new token to portfolio

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint8 _decimals, uint8 _l1Decimals, uint256 _fee, uint256 _gasSwapRatio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _tokenaddress | address | address of the token |
| _decimals | uint8 | decimals of the token |
| _l1Decimals | uint8 | decimals of the token on Dexalot L1 |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |

#### addTrustedContract

Adds trusted contract to portfolio

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function addTrustedContract(address _contract, string _name) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | address of trusted contract |
| _name | string | name of trusted contract |

#### isTrustedContract

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  true if contract is trusted |

#### removeTrustedContract

Removes trusted contract from portfolio

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | address of trusted contract |

