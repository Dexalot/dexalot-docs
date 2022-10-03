---
headerDepth: 4
---

# TradePairs

**Implements the data structures and functions for trade pairs**


**Dev notes:** \
For each trade pair an entry is added tradePairMap.
The naming convention for the trade pairs is as follows: BASEASSET/QUOTEASSET.
For base asset AVAX and quote asset USDT the trade pair name is AVAX/USDT.
ExchangeSub needs to have DEFAULT_ADMIN_ROLE on TradePairs.
TradePairs should have EXECUTOR_ROLE on OrderBooks.



## Variables

### Public

| Name | Type |
| --- | --- |
| ON_BEHALFOF_ROLE | bytes32 |
| TENK | uint256 |
| VERSION | bytes32 |



### Private

| Name | Type |
| --- | --- |
| EXECUTED_VERSION | uint8 |
| NEW_TRADE_PAIR_VERSION | uint8 |
| ORDER_STATUS_CHANGED_VERSION | uint8 |
| PARAMETER_UPDATED_VERSION | uint8 |
| allowedOrderTypes | mapping(bytes32 &#x3D;&gt; struct EnumerableSetUpgradeable.UintSet) |
| clientOrderIDMap | mapping(address &#x3D;&gt; mapping(bytes32 &#x3D;&gt; bytes32)) |
| idCounter | uint256 |
| orderMap | mapping(bytes32 &#x3D;&gt; struct ITradePairs.Order) |
| orderBooks | OrderBooks |
| portfolio | IPortfolio |
| tradePairsArray | bytes32[] |
| tradePairMap | mapping(bytes32 &#x3D;&gt; struct ITradePairs.TradePair) |




## Methods

### Public

#### initialize

initializer function for Upgradeable TradePairs

**Dev notes:** \
idCounter needs to be unique for each order and execution id.
Both the orderbooks and the portolio should be deployed before tradepairs.

```solidity:no-line-numbers
function initialize(address _orderbooks, address _portfolio) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderbooks | address | orderbooks instance |
| _portfolio | address | portfolio instance |


#### pauseTradePair

Pauses a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.
Public instead of external because it saves 0.184(KiB) in contract size

```solidity:no-line-numbers
function pauseTradePair(bytes32 _tradePairId, bool _pause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |


#### getOrder

Returns order details given the order id


```solidity:no-line-numbers
function getOrder(bytes32 _orderId) public view returns (struct ITradePairs.Order)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id assigned by the contract |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | Order  Order Struct |

#### getQuoteAmount

Returns the quote amount for a given price and quantity


```solidity:no-line-numbers
function getQuoteAmount(bytes32 _tradePairId, uint256 _price, uint256 _quantity) public view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price |
| _quantity | uint256 | quantity |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  quote amount |


### External

#### addTradePair

Adds a new TradePair

**Dev notes:** \
Only DEFAULT_ADMIN or ExchangeSub can call this function which has this role.
ExhangeSub makes sure that the symbols are added to the portfolio with the
correct addresses first.

```solidity:no-line-numbers
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDecimals, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDecimals, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _baseSymbol | bytes32 | symbol of the base asset |
| _baseDecimals | uint8 | evm decimals of the base asset |
| _baseDisplayDecimals | uint8 | display decimals of the base Asset. Quantity increment |
| _quoteSymbol | bytes32 | symbol of the quote asset |
| _quoteDecimals | uint8 | evm decimals of the quote asset |
| _quoteDisplayDecimals | uint8 | display decimals of the quote Asset. Price increment |
| _minTradeAmount | uint256 | minimum trade amount |
| _maxTradeAmount | uint256 | maximum trade amount |
| _mode | enum ITradePairs.AuctionMode | Auction Mode of the auction token. Auction token is always the BASE asset. |


#### getTradePairs

Gets a list of the trade Pairs

**Dev notes:** \
All pairs are returned. Even the delisted ones.

```solidity:no-line-numbers
function getTradePairs() external view returns (bytes32[])
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of trade Pairs . |

#### getBookId

Returns the bookid given the tradePairId and side


```solidity:no-line-numbers
function getBookId(bytes32 _tradePairId, enum ITradePairs.Side _side) external view returns (bytes32)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  BookId |

#### pause

Pauses the contract

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.

```solidity:no-line-numbers
function pause() external
```


#### unpause

Unpauses the contract

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.

```solidity:no-line-numbers
function unpause() external
```


#### pauseAddOrder

Pauses adding new orders to a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.

```solidity:no-line-numbers
function pauseAddOrder(bytes32 _tradePairId, bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |


#### setAuctionMode

Sets the auction mode of a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.

```solidity:no-line-numbers
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _mode | enum ITradePairs.AuctionMode | Auction Mode |


#### setAuctionPrice

Sets the auction price

**Dev notes:** \
Price is calculated by the backend (off chain) after the auction has closed.
Auction price can be changed anytime. It is imperative that is not changed after the
first order is matched until the last order to be matched.

```solidity:no-line-numbers
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the auction |


#### getAuctionData

Returns the auction mode and the auction price of a specific Trade Pair


```solidity:no-line-numbers
function getAuctionData(bytes32 _tradePairId) external view returns (uint8 mode, uint256 price)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| mode | uint8 | auction mode |
| price | uint256 | auction price |

#### tradePairExists

Checks if TradePair already exists


```solidity:no-line-numbers
function tradePairExists(bytes32 _tradePairId) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  true if it exists |

#### setMinTradeAmount

Sets the minimum trade amount allowed for a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. The min trade amount needs to satisfy
`getQuoteAmount(_price, _quantity, _tradePairId) >= _minTradeAmount`

```solidity:no-line-numbers
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount in terms of quote asset |


#### getMinTradeAmount

Returns the minimum trade amount allowed for a specific Trade Pair

**Dev notes:** \
The min trade amount needs to satisfy
`getQuoteAmount(_price, _quantity, _tradePairId) >= _minTradeAmount`

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
| [0] | uint256 | uint256  minimum trade amount in terms of quote asset |

#### setMaxTradeAmount

Sets the maximum trade amount allowed for a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. The max trade amount needs to satisfy
`getQuoteAmount(_price, _quantity, _tradePairId) <= _maxTradeAmount`

```solidity:no-line-numbers
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount in terms of quote asset |


#### getMaxTradeAmount

Returns the maximum trade amount allowed for a specific Trade Pair

**Dev notes:** \
The max trade amount needs to satisfy
`getQuoteAmount(_price, _quantity, _tradePairId) <= _maxTradeAmount`

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
| [0] | uint256 | uint256  maximum trade amount in terms of quote asset |

#### addOrderType

Adds a new order type to a tradePair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. LIMIT order is added by default.

```solidity:no-line-numbers
function addOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |


#### removeOrderType

Removes an order type that is previously allowed

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. LIMIT order type can't be removed.

```solidity:no-line-numbers
function removeOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |


#### getAllowedOrderTypes

Returns the allowed order types.

**Dev notes:** \
LIMIT is always available by default. Market order type may be allowed once there is
enough liquidity on a pair.

```solidity:no-line-numbers
function getAllowedOrderTypes(bytes32 _tradePairId) external view returns (uint256[])
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | uint256[]  Array of allowed order types |

#### setDisplayDecimals

Sets the display decimals of the base or the quote asset in a tradePair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. Display decimals can also be referred as
`Quantity Increment if _isBase==true` or `PriceIncrement if _isBase==false`

```solidity:no-line-numbers
function setDisplayDecimals(bytes32 _tradePairId, uint8 _displayDecimals, bool _isBase) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _displayDecimals | uint8 | display decimal |
| _isBase | bool | true/false |


#### getDisplayDecimals

Returns the display decimals of the base or the quote asset in a tradePair

**Dev notes:** \
Display decimals can also be referred as
`Quantity Increment if _isBase==true` or `PriceIncrement if _isBase==false`

```solidity:no-line-numbers
function getDisplayDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  display decimal |

#### getDecimals

Returns the evm decimals of the base or the quote symbol in a tradePair

**Dev notes:** \
The decimals is identical to decimals value from ERC20 contract of the symbol.
It is 18 for ALOT and AVAX.

```solidity:no-line-numbers
function getDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  evm decimal |

#### getSymbol

Returns the base or quote symbol


```solidity:no-line-numbers
function getSymbol(bytes32 _tradePairId, bool _isBase) external view returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbol in bytes32 |

#### updateRate

Sets the Maker or the Taker Rate

**Dev notes:** \
Can only be called by DEFAULT_ADMIN

```solidity:no-line-numbers
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _rate | uint8 | Percent Rate `(_rate/100)% = _rate/10000: _rate=10 => 0.10%` |
| _rateType | enum ITradePairs.RateType | Rate Type, 0 maker or 1 taker |


#### getMakerRate

Returns Maker Rate (Commission)


```solidity:no-line-numbers
function getMakerRate(bytes32 _tradePairId) external view returns (uint8)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  maker Rate |

#### getTakerRate

Returns Taker Rate (Commission)


```solidity:no-line-numbers
function getTakerRate(bytes32 _tradePairId) external view returns (uint8)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  taker Rate |

#### setAllowedSlippagePercent

sets the slippage percent for market orders, before it gets unsolicited cancel

**Dev notes:** \
Can only be called by DEFAULT_ADMIN. Market Orders will be filled up to allowedSlippagePercent
from the marketPrice(bestbid or bestask) to protect the trader. The remaining quantity gets
unsolicited cancel

```solidity:no-line-numbers
function setAllowedSlippagePercent(bytes32 _tradePairId, uint8 _allowedSlippagePercent) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _allowedSlippagePercent | uint8 | allowed slippage percent=20 (Default = 20 : 20% = 20/100) |


#### getAllowedSlippagePercent

Allowed slippage percent for market orders, before the market order gets an unsolicited cancel.


```solidity:no-line-numbers
function getAllowedSlippagePercent(bytes32 _tradePairId) external view returns (uint8)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  slippage percent |

#### getNBook

Returns Buy or Sell orderbook for the given tradepair and side

**Dev notes:** \
Although this is a view function, it may run out of gas in case you try to get the entire order book
with a lot of orders. That's why it has nPrice and nOrder parameters.
Example: `getNBook(tradePair, 0, 2, 50, 0, bytes32(''))` : This will get the best 2 buy
price points (top of the buy book and the next best price and it will aggregate the quantities
of up to 50 orders at a time when generating the orderbook).
    If the order book is large and has many orders at a price point one needs to paginate through the order
book using `getNBook`.  Use 0 for `_lastPrice` and an empty string in bytes32 for `_lastOrder`.  If looping use
the last `_lastPrice` and `_lastOrder` returned from this function call.

```solidity:no-line-numbers
function getNBook(bytes32 _tradePairId, enum ITradePairs.Side _side, uint256 _nPrice, uint256 _nOrder, uint256 _lastPrice, bytes32 _lastOrder) external view returns (uint256[], uint256[], uint256, bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _side | enum ITradePairs.Side | 0- BUY for BuyBook, 1- SELL for SellBook |
| _nPrice | uint256 | Depth requested. If 1, top of the book, if 2 best 2 prices etc |
| _nOrder | uint256 | The number of orders to be retrieved at a time at the price point |
| _lastPrice | uint256 | The price point to start at |
| _lastOrder | bytes32 | the orderid to start at |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | uint256[]  Prices array |
| [1] | uint256[] | uint256[]  Quantities array |
| [2] | uint256 | uint256  Last Price processed. 0 if no more price point left |
| [3] | bytes32 | bytes32  Last Order id processed. "" if no more orders left |

#### getOrderByClientOrderId

Returns order details given the trader and the clientOrderId


```solidity:no-line-numbers
function getOrderByClientOrderId(address _trader, bytes32 _clientOrderId) external view returns (struct ITradePairs.Order)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | user's address |
| _clientOrderId | bytes32 | client Order id assigned by the user |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | Order  Order Struct |

#### addOrder

Frontend Entry function to call to add an order

**Dev notes:** \
Adds an order with the given fields. As a general rule of thumb msg.sender should be the `_trader`
otherwise the tx will revert. 'OrderStatusChanged' event will be emitted
when an order is received and committed to the blockchain. You can get the contract
generated orderid along with your clientorderid from this event. When the blockchain is extremely busy,
the transactions are queued up in the mempool and prioritized based on their gas price.
We have seen orders waiting for hours in the mempool in Avalanche C-Chain, before they are committed
in extreme cases. This is a function of the blockchain and will typically happen when the current gas
price is around 100 gwei (3-4 times of the minimum gas price) and your transaction maximum gas is set
to be 50 gwei(normal level). Your transaction will wait in the mempool until the blockchain gas price
goes back to normal levels. \
    `_clientoOderId` is sent by the owner of an order and it is returned in responses for
reference. It must be unique per traderaddress. \
    Price for market Orders are set to 0 internally (type1=0). Valid price decimals (baseDisplayDecimals)
and evm decimals can be obtained by calling `getDisplayDecimals` and `getDecimals`, respectively. \
    Valid quantity decimals (quoteDisplayDecimals) and evm decimals can be obtained by calling
`getDisplayDecimals` and `getDecimals`, respectively. \
    The default for type2 (Order SubType) is 0 equivalent to GTC. \
Here are the other SubTypes: \
0 = GTC : Good Till Cancel \
1 = FOK : FIll or Kill (Will fill entirely or will revert with "T-FOKF-01") \
2 = IOC : Immedidate or Cancel  (Will fill partially or fully, will get status=CANCELED if filled partially) \
3 = PO : Post Only (Will either go in the orderbook or revert with "T-T2PO-01" if it has a potential match)

```solidity:no-line-numbers
function addOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type1 _type1, enum ITradePairs.Type2 _type2) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | address of the trader. If msg.sender is not the `_trader` the tx will revert. |
| _clientOrderId | bytes32 | unique id provided by the owner of an order |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the order |
| _quantity | uint256 | quantity of the order |
| _side | enum ITradePairs.Side | enum ITradePairs.Side  Side of the order 0 BUY, 1 SELL |
| _type1 | enum ITradePairs.Type1 | enum ITradePairs.Type1 Type of the order. 0 MARKET , 1 LIMIT (STOP and STOPLIMIT NOT Supported) |
| _type2 | enum ITradePairs.Type2 | enum ITradePairs.Type2 SubType of the order |


#### matchAuctionOrder

Function to match Auction orders

**Dev notes:** \
Requires `DEFAULT_ADMIN_ROLE`, also called by `ExchangeSub.matchAuctionOrders` that
requires `AUCTION_ADMIN_ROLE`.

```solidity:no-line-numbers
function matchAuctionOrder(bytes32 _takerOrderId, uint8 _maxCount) external returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _takerOrderId | bytes32 | Taker Order id |
| _maxCount | uint8 | controls max number of fills an order can get at a time to avoid running out of gas |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Remaining quantity of the taker order |

#### unsolicitedCancel

Admin Function to cancel orders in the orderbook when delisting a trade pair

**Dev notes:** \
Will cancel orders even when TradePair is paused

```solidity:no-line-numbers
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint8 _maxCount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBuyBook | bool | true if buy Orderbook |
| _maxCount | uint8 | controls max number of orders to cancel at a time to avoid running out of gas |


#### cancelReplaceOrder

Cancels an order and immediatly enters a similar order in the same direction.

**Dev notes:** \
Only the quantity and the price of the order can be changed. All the other order
fields are copied from the canceled order to the new order.
The time priority of the original order is lost.
Canceled order's locked quantity is made available for the new order within this tx

```solidity:no-line-numbers
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |
| _clientOrderId | bytes32 | clinent order id of the new order |
| _price | uint256 | price of the new order |
| _quantity | uint256 | quantity of the new order |


#### cancelOrder

Cancels an order given the order id supplied

**Dev notes:** \
Will revert with "T-OAEX-01" if order is already filled or canceled

```solidity:no-line-numbers
function cancelOrder(bytes32 _orderId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |


#### cancelAllOrders

Cancels all the orders given the array of order ids supplied

**Dev notes:** \
This function may run out of gas if a trader is trying to cancel too many orders
Call with Maximum 20 orders at a time
Will skip orders that are already canceled/filled and continue canceling the remaining ones in the list

```solidity:no-line-numbers
function cancelAllOrders(bytes32[] _orderIds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderIds | bytes32[] | array of order ids |


#### fallback



```solidity:no-line-numbers
fallback() external
```




### Private

#### setAuctionModePrivate

Sets the auction mode of a specific Trade Pair

**Dev notes:** \
Need to be able to call it internally from the constructor

```solidity:no-line-numbers
function setAuctionModePrivate(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _mode | enum ITradePairs.AuctionMode | Auction Mode |


#### getNextOrderId

Returns the next Id to be used as order id


```solidity:no-line-numbers
function getNextOrderId() private returns (bytes32)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  id |

#### getNextId

increments the id counter to be used as order id or as an execution id


```solidity:no-line-numbers
function getNextId() private returns (uint256)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  id |

#### emitStatusUpdate

Emits a given order's latest state

**Dev notes:** \
The details of the emitted event is as follows: \
*version*  event version \
*traderaddress*  traders’s wallet (immutable) \
*pair*  traded pair. ie. ALOT/AVAX in bytes32 (immutable) \
*orderId*  unique order id assigned by the contract (immutable) \
*clientOrderId*  client order id given by the sender of the order as a reference (immutable) \
*price * price of the order entered by the trader. (0 if market order) (immutable) \
*totalamount*   cumulative amount in quote currency. ⇒ price* quantityfilled . If
multiple partial fills , the new partial fill price*quantity is added to the
current value in the field. Average execution price can be quickly
calculated by totalamount/quantityfilled regardless of the number of
partial fills at different prices \
*quantity*  order quantity (immutable) \
*side* Order side. See #addOrder (immutable) \
*type1*  See #addOrder (immutable) \
*type2*  See #addOrder (immutable) \
```solidity
status  Order Status  {
         NEW,
         REJECTED, -- not used
         PARTIAL,
         FILLED,
         CANCELED,
         EXPIRED, -- not used
         KILLED -- not used
      }
```
*quantityfilled*  cumulative quantity filled \
*totalfee* cumulative fee paid for the order (total fee is always in terms of
received(incoming) currency. ie. if Buy ALOT/AVAX, fee is paid in ALOT, if Sell
ALOT/AVAX , fee is paid in AVAX \
Note: Order price can be different than the execution price.

```solidity:no-line-numbers
function emitStatusUpdate(bytes32 _orderId) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id |


#### handleExecution

Calculates the commission and updates the oder state after an execution

**Dev notes:** \
Updates the `totalAmount`, `quantityFilled`, `totalFee` and the status of the order.
Commissions are rounded down based on evm and display decimals to avoid DUST

```solidity:no-line-numbers
function handleExecution(bytes32 _orderId, uint256 _price, uint256 _quantity, uint8 _rate) private returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to update |
| _price | uint256 | execution price ( Can be different than order price) |
| _quantity | uint256 | execution quantity |
| _rate | uint8 | maker or taker rate |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  last fee charged |

#### addExecution

Applies an execution to both maker and the taker orders and adjust holdings in portfolio

**Dev notes:** \
Emits Executed event showing the execution details. Note that an order's price
can be different than a taker order price, but it should be identical to maker order's price.

```solidity:no-line-numbers
function addExecution(bytes32 _makerOrderId, bytes32 _takerOrderId, uint256 _price, uint256 _quantity) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerOrderId | bytes32 | maker order id |
| _takerOrderId | bytes32 | maker order id |
| _price | uint256 | execution price |
| _quantity | uint256 | execution quantity |


#### emitExecuted

Emits the Executed Event showing \
`ersion`  event version \
`pair`  traded pair. ie. ALOT/AVAX in bytes32 \
`_price`  see below \
`_quantity`  see below \
`_makerOrderId`  see below \
`_takerOrderId`  see below \
`_mlastFee`  see below \
`_tlastFee`  see below \
`takerSide`  Side of the taker order. 0 - BUY, 1- SELL (Note: This can be used to identify
the fee UNITs. If takerSide = 1, then the fee is paid by the Maker in Base
Currency and the fee paid by the taker in Quote currency. If takerSide= 0
then the fee is paid by the Maker in Quote Currency and the fee is paid by
the taker in Base currency \
`execId`  Unique trade id (execution id) assigned by the contract \
`addressMaker`  maker traderaddress \
`addressTaker`  taker traderaddress \


```solidity:no-line-numbers
function emitExecuted(uint256 _price, uint256 _quantity, bytes32 _makerOrderId, bytes32 _takerOrderId, uint256 _mlastFee, uint256 _tlastFee) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | executed price |
| _quantity | uint256 | executed quantity |
| _makerOrderId | bytes32 | Maker Order id |
| _takerOrderId | bytes32 | Taker Order id |
| _mlastFee | uint256 | fee paid by maker |
| _tlastFee | uint256 | fee paid by taker |


#### addOrderChecks

Checks if order can be entered without any issues

**Dev notes:** \
Checks if tradePair or addOrder is paused as well as
if decimals, order types and clientOrderId are supplied properly \
    clientorderid is sent by the owner of an order and it is returned in responses for
reference. It must be unique per traderaddress.

```solidity:no-line-numbers
function addOrderChecks(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _quantity, enum ITradePairs.Type1 _type1) private view
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | trader address |
| _clientOrderId | bytes32 | unique id provided by the owner of an order |
| _tradePairId | bytes32 | id of the trading pair |
| _quantity | uint256 | quantity |
| _type1 | enum ITradePairs.Type1 | Type1 : MARKET,LIMIT etc |


#### addLimitOrder

Private function. Adds a LIMIT Order. See #addOrder.


```solidity:no-line-numbers
function addLimitOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type2 _type2) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | See #addOrder |
| _clientOrderId | bytes32 | See #addOrder |
| _tradePairId | bytes32 | See #addOrder |
| _price | uint256 | See #addOrder |
| _quantity | uint256 | See #addOrder |
| _side | enum ITradePairs.Side | See #addOrder |
| _type2 | enum ITradePairs.Type2 | See #addOrder |


#### addMarketOrder

Private function. Adds a MARKET Order. See #addOrder.


```solidity:no-line-numbers
function addMarketOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _quantity, enum ITradePairs.Side _side) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | See #addOrder |
| _clientOrderId | bytes32 | See #addOrder |
| _tradePairId | bytes32 | See #addOrder |
| _quantity | uint256 | See #addOrder |
| _side | enum ITradePairs.Side | See #addOrder |


#### matchOrder

Matches a taker order with maker orders in the opposite Orderbook before
it is entered in its own orderbook.
Also handles matching auction orders.

**Dev notes:** \
IF BUY order, it will try to match with an order in the SELL OrderBook and vice versa

```solidity:no-line-numbers
function matchOrder(bytes32 _takerOrderId, uint8 _maxCount) private returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _takerOrderId | bytes32 | Taker Order id |
| _maxCount | uint8 | Max number of fills an order can get at a time to avoid running out of gas (Defaults 255). |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Remaining quantity of the taker order |

#### doOrderCancel

Cancels an order and makes the locked amount available in the porftolio


```solidity:no-line-numbers
function doOrderCancel(bytes32 _orderId) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |


