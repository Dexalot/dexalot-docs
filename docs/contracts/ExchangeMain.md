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




## Events

### CoinFlipped



```solidity:no-line-numbers
event CoinFlipped(uint80 roundid, int256 price, bool outcome)
```




## Methods

### Public

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Sets Chainlink price feed address.

```solidity:no-line-numbers
function initialize() public
```


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

(Un)pauses portoflioMain and portfolioBridgeMain for upgrade


```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |


#### setPriceFeed

Sets Chainlink price feed address.


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

#### flipCoin

emits coin flip results based on the latest AVAX/USD price


```solidity:no-line-numbers
function flipCoin() external
```




