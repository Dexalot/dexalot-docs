---
headerDepth: 4
---

# ExchangeSub

**Subnet Exchange**

This contract is the subnet version of the Dexalot Exchange.
It has all the AUCTION_ADMIN functions that can be called.

**Dev notes:** \
ExchangeSub is DEFAULT_ADMIN on both PortfolioSub and TradePairs contracts.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Private

| Name | Type |
| --- | --- |
| orderBooks | contract OrderBooks |
| tradePairs | contract ITradePairs |

## Events

### TradePairsSet

```solidity:no-line-numbers
event TradePairsSet(contract ITradePairs _oldTradePairs, contract ITradePairs _newTradePairs)
```

### AuctionMatchFinished

```solidity:no-line-numbers
event AuctionMatchFinished(bytes32 pair)
```

## Methods

### Public

#### pauseTrading

Un(pause) trading functionality. Affects both addorder and cancelorder funcs.

```solidity:no-line-numbers
function pauseTrading(bool _tradingPause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradingPause | bool | true to pause trading, false to unpause |

### External

#### pauseForUpgrade

(Un)pauses portoflioSub and portfolioBridgeSub and TradePairs contracts for upgrade

```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### setOrderBooks

Set the address of the OrderBooks contract

**Dev notes:** \
Needed to initiate match auction orders

```solidity:no-line-numbers
function setOrderBooks(address _orderbooks) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderbooks | address | Address of the OrderBooks contract |

#### setTradePairs

Sets trade pairs contract

```solidity:no-line-numbers
function setTradePairs(contract ITradePairs _tradePairs) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairs | contract ITradePairs | address of the trade pairs contract |

#### getTradePairsAddr

```solidity:no-line-numbers
function getTradePairsAddr() external view returns (contract ITradePairs)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract ITradePairs | ITradePairs  trade pairs contract |

#### pauseTradePair

Un(pause) trading functionality for a trade pair. Affects both addorder and cancelorder funcs.

```solidity:no-line-numbers
function pauseTradePair(bytes32 _tradePairId, bool _tradePairPause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _tradePairPause | bool | true to pause trading, false to unpause |

#### updateAllRates

Update all commissions rates of all trading pairs all at once

```solidity:no-line-numbers
function updateAllRates(uint8 _makerRate, uint8 _takerRate) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |

#### addTradePair

Adds a new trading pair to the exchange.

**Dev notes:** \
Both the base and quote symbol must exist in the PortfolioSub otherwise it will revert.
Both `DEFAULT_ADMIN_ROLE` and `AUCTION_ADMIN_ROLE` can add a new trading pair.

```solidity:no-line-numbers
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the new trading pair |
| _baseSymbol | bytes32 | symbol of the base token |
| _baseDisplayDecimals | uint8 | display decimals of the base token |
| _quoteSymbol | bytes32 | symbol of the quote token |
| _quoteDisplayDecimals | uint8 | display decimals of the quote token |
| _minTradeAmount | uint256 | minimum trade amount |
| _maxTradeAmount | uint256 | maximum trade amount |
| _mode | enum ITradePairs.AuctionMode | auction mode |

#### setAuctionMode

Sets auction mode for a trading pair and its basetoken in the PortfolioSUb.

```solidity:no-line-numbers
function setAuctionMode(bytes32 _tradePairId, bytes32 _baseSymbol, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _baseSymbol | bytes32 | symbol of the base token |
| _mode | enum ITradePairs.AuctionMode | auction mode |

#### updateRate

Update maker and taker fee rates for execution

```solidity:no-line-numbers
function updateRate(bytes32 _tradePair, uint8 _rate, enum ITradePairs.RateType _rateType) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePair | bytes32 | id of the trading pair |
| _rate | uint8 | fee rate |
| _rateType | enum ITradePairs.RateType | rate type, maker or taker |

#### updateRates

Update maker and taker fee rates for execution

```solidity:no-line-numbers
function updateRates(bytes32 _tradePairId, uint8 _makerRate, uint8 _takerRate) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |

#### setAuctionPrice

Sets auction price

```solidity:no-line-numbers
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price |

#### setMinTradeAmount

Sets minimum trade amount for a trade pair

```solidity:no-line-numbers
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount |

#### getMinTradeAmount

```solidity:no-line-numbers
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  minimum trade amount |

#### setMaxTradeAmount

Sets maximum trade amount for a trade pair

```solidity:no-line-numbers
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount |

#### getMaxTradeAmount

```solidity:no-line-numbers
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  maximum trade amount |

#### matchAuctionOrders

Matches auction orders once the auction is closed and auction price is set

**Dev notes:** \
Takes the top of the book sell order, (bestAsk), and matches it with the buy orders sequantially.
An auction mode can safely be changed to AUCTIONMODE.OFF only when this function returns false.

```solidity:no-line-numbers
function matchAuctionOrders(bytes32 _tradePairId, uint8 _maxCount) external returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _maxCount | uint8 | controls max number of fills an order can get at a time to avoid running out of gas |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  true if more matches are possible. false if no more possible matches left in the orderbook. |

