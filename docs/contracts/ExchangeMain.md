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
| priceFeed | contract AggregatorV3Interface |

## Events

### CoinFlipped

```solidity:no-line-numbers
event CoinFlipped(uint80 roundid, int256 price, bool outcome)
```

## Methods

### Public

#### isHead

returns true/false = head/tail based on the latest AVAX/USD price

```solidity:no-line-numbers
function isHead() public view returns (uint80 r, int256 p, bool o)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| r | uint80 | the round id parameter from Chainlink price feed |
| p | int256 | price of AVAX for this round id |
| o | bool | outcome of the coin flip |

### External

#### pauseForUpgrade

(Un)pauses portfolioMain and portfolioBridgeMain for upgrade

```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### setPriceFeed

sets Chainlink price feed contract address

**Dev notes:** \
refer to Chainlink documentation at https://docs.chain.link/data-feeds/price-feeds/addresses

```solidity:no-line-numbers
function setPriceFeed(address _address) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address of the price feed contract |

#### getPriceFeed

```solidity:no-line-numbers
function getPriceFeed() external view returns (contract AggregatorV3Interface)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract AggregatorV3Interface | AggregatorV3Interface  price feed contract |

#### addToken

Add new token to portfolio

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, uint256 _fee, uint256 _gasSwapRatio, bool _isVirtual) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _tokenaddress | address | address of the token |
| _srcChainId | uint32 | Source Chain Symbol of the virtual token only. Otherwise it is overridden by the current chainid |
| _decimals | uint8 | decimals of the token |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |
| _isVirtual | bool | Token to facilitate for Cross Chain Trades |

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

#### flipCoin

emits coin flip results based on the latest AVAX/USD price

**Dev notes:** \
Randomized Auction Closing Sequence uses this function to randomly decide when to close an ongoing
auction after the specified auction end time is reached. It is to protect the auction participants against
gaming during the auction process. For example entering/canceling big orders seconds before a predetermined
auction end time may significantly impact the auction price. So we introduced randomness after the predetermined
auction end time. Our off-chain application first randomly picks the number of heads (2-n) that it requires
before closing the auction. Then it calls this function at random intervals (3-10 min) until it reaches
its target. Nobody, including us to some extent, has control over the effective auction close time.
We chose 6th-7th digits of the Oracle provided average AVAX/USD price to avoid manipulation.

```solidity:no-line-numbers
function flipCoin() external
```

