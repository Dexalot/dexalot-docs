# TradePairs

**Implements the data structures and functions for trade pairs**

**Dev notes:** _For each trade pair an entry is added tradePairMap.
The naming convention for the trade pairs is as follows: BASEASSET/QUOTEASSET.
For base asset AVAX and quote asset USDT the trade pair name is AVAX/USDT.
ExchangeSub needs to have DEFAULT_ADMIN_ROLE on TradePairs.
TradePairs should have EXECUTOR_ROLE on OrderBooks._

## Variables

### VERSION

```solidity
bytes32 VERSION
```
### TENK

```solidity
uint256 TENK
```
### ON_BEHALFOF_ROLE

```solidity
bytes32 ON_BEHALFOF_ROLE
```

## Methods

### initialize

initializer function for Upgradeable TradePairs

_idCounter needs to be unique for each order and execution id.
                Both the orderbooks and the portolio should be deployed before tradepairs_

```solidity
function initialize(address _orderbooks, address _portfolio) public
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderbooks | address | orderbooks instance |
| _portfolio | address | portfolio instance |

### addTradePair

Adds a new TradePair

_Only DEFAULT_ADMIN or ExchangeSub can call this function which has this role.
                ExhangeSub makes sure that the symbols are added to the portfolio with the
                correct addresses first._

```solidity
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDecimals, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDecimals, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

#### parameters

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

### getTradePairs

Gets a list of the trade Pairs

_All pairs are returned. Even the delisted ones._

```solidity
function getTradePairs() external view returns (bytes32[])
```

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of trade Pairs . |
### getBookId

Returns the bookid given the tradePairId and side

```solidity
function getBookId(bytes32 _tradePairId, enum ITradePairs.Side _side) external view returns (bytes32)
```

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  BookId |
### pause

Pauses the contract

_Only callable by DEFAULT_ADMIN_

```solidity
function pause() external
```

### unpause

Unpauses the contract

_Only callable by DEFAULT_ADMIN_

```solidity
function unpause() external
```

### pauseTradePair

Pauses a specific Trade Pair

_Can only be called by DEFAULT_ADMIN.
                Public instead of external because it saves 0.184(KiB) in contract size_

```solidity
function pauseTradePair(bytes32 _tradePairId, bool _pause) public
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |

### pauseAddOrder

Pauses adding new orders to a specific Trade Pair

_Can only be called by DEFAULT_ADMIN._

```solidity
function pauseAddOrder(bytes32 _tradePairId, bool _pause) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |

### setAuctionMode

Sets the auction mode of a specific Trade Pair

_Can only be called by DEFAULT_ADMIN._

```solidity
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _mode | enum ITradePairs.AuctionMode | Auction Mode |

### setAuctionPrice

Sets the auction price

_Price is calculated by the backend (off chain) after the auction has closed.
                Auction price can be changed anytime. It is imperative that is not changed after the
                first order is matched untile the last order to be matched._

```solidity
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the auction |

### getAuctionData

Returns the auction mode and the auction price of a specific Trade Pair

```solidity
function getAuctionData(bytes32 _tradePairId) external view returns (uint8 mode, uint256 price)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| mode | uint8 | auction mode |
| price | uint256 | auction price |
### tradePairExists

Checks if TradePair already exists

```solidity
function tradePairExists(bytes32 _tradePairId) external view returns (bool)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  true if it exists |
### setMinTradeAmount

Sets the minimum trade amount allowed for a specific Trade Pair

_Can only be called by DEFAULT_ADMIN.
                getQuoteAmount(_price, _quantity, _tradePairId) >= _minTradeAmount_

```solidity
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount in terms of quote asset |

### getMinTradeAmount

Returns the minimum trade amount allowed for a specific Trade Pair

_getQuoteAmount(_price, _quantity, _tradePairId) >= _minTradeAmount_

```solidity
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  minimum trade amount in terms of quote asset |
### setMaxTradeAmount

Sets the maximum trade amount allowed for a specific Trade Pair

_Can only be called by DEFAULT_ADMIN.
                getQuoteAmount(_price, _quantity, _tradePairId) <= _maxTradeAmount_

```solidity
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount in terms of quote asset |

### getMaxTradeAmount

Returns the maximum trade amount allowed for a specific Trade Pair

_getQuoteAmount(_price, _quantity, _tradePairId) <= _maxTradeAmount_

```solidity
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  maximum trade amount in terms of quote asset |
### addOrderType

Adds a new order type to a tradePair

_Can only be called by DEFAULT_ADMIN. LIMIT order is added by default._

```solidity
function addOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |

### removeOrderType

Removes an order type that is previously allowed

_Can only be called by DEFAULT_ADMIN. LIMIT order type can't be removed_

```solidity
function removeOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |

### getAllowedOrderTypes

Returns the allowed order types.

_LIMIT is always available by default. Market order type is allowed once there is
                enough liquidity on a pair_

```solidity
function getAllowedOrderTypes(bytes32 _tradePairId) external view returns (uint256[])
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | uint256[]  Array of allowed order types |
### setDisplayDecimals

Sets the display decimals of the base or the quote asset in a tradePair

_Can only be called by DEFAULT_ADMIN_

```solidity
function setDisplayDecimals(bytes32 _tradePairId, uint8 _displayDecimals, bool _isBase) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _displayDecimals | uint8 | display decimal. Also referred as "Quantity Increment if _isBase==true",                  "PriceIncrement if _isBase==false" |
| _isBase | bool | true/false |

### getDisplayDecimals

Returns the display decimals of the base or the quote asset in a tradePair

```solidity
function getDisplayDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  display decimal. Also referred as "Quantity Increment if _isBase==true",                 "PriceIncrement if _isBase==false" |
### getDecimals

Returns the evm decimals of the base or the quote symbol in a tradePair

```solidity
function getDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  evm decimal. This is identical to decimals value from ERC20 contract of the symbol                 18 for ALOT and AVAX |
### getSymbol

Returns the base or quote symbol

```solidity
function getSymbol(bytes32 _tradePairId, bool _isBase) external view returns (bytes32)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbol in bytes32 |
### updateRate

Sets the Maker or the Taker Rate

_Can only be called by DEFAULT_ADMIN_

```solidity
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _rate | uint8 | Percent Rate (_rate/100)% = _rate/10000: _rate=10 => 0.10% |
| _rateType | enum ITradePairs.RateType | Rate Type, 0 maker or 1 taker |

### getMakerRate

Returns Maker Rate (Commission)

```solidity
function getMakerRate(bytes32 _tradePairId) external view returns (uint8)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  maker Rate |
### getTakerRate

Returns Taker Rate (Commission)

```solidity
function getTakerRate(bytes32 _tradePairId) external view returns (uint8)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  taker Rate |
### setAllowedSlippagePercent

sets the slippage percent for market orders, before it gets unsolicited cancel

_Can only be called by DEFAULT_ADMIN. Market Orders will be filled up to allowedSlippagePercent
                from the marketPrice(bestbid or bestask) to protect the trader. The remaining quantity gets
                unsolicited cancel_

```solidity
function setAllowedSlippagePercent(bytes32 _tradePairId, uint8 _allowedSlippagePercent) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _allowedSlippagePercent | uint8 | Default 20, allowedSlippagePercent=20 (20% = 20/100) |

### getAllowedSlippagePercent

Allowed slippage percent for market orders, before the market order gets an unsolicited cancel.

```solidity
function getAllowedSlippagePercent(bytes32 _tradePairId) external view returns (uint8)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | uint8  slippage percent |
### getNBook

Returns Buy or Sell orderbook for the given tradepair and side

_Although this is a view function, it may run out of gas in case you try to get the entire order book
                with a lot of orders. That's why it has nPrice and nOrder parameters.
                getNBook(tradePair, 0, 2, 50, 0, bytes32('')) : This will get the best 2 buy
                price point (top of the buy book and the next best price and it will aggregate the quantities
                of up to 50 orders at a time when generating the orderbook)._

```solidity
function getNBook(bytes32 _tradePairId, enum ITradePairs.Side _side, uint256 _nPrice, uint256 _nOrder, uint256 _lastPrice, bytes32 _lastOrder) external view returns (uint256[], uint256[], uint256, bytes32)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _side | enum ITradePairs.Side | 0- BUY for BuyBook, 1- SELL for SellBook |
| _nPrice | uint256 | depth requested. If 1, top of the book, if 2 best 2 prices etc |
| _nOrder | uint256 | number of orders to be retrieved at a time at the price point |
| _lastPrice | uint256 | the price point to start at in case a loop is used to get the entire                 order book. Use 0 for small requests. If looping use the Last Price returned from this function call |
| _lastOrder | bytes32 | the orderid used in case a loop is used to get the entire order                 book. Use empty string in bytes32 for small request                 If looping use the Last Orderid returned from this function call |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | uint256[]  prices array |
| [1] | uint256[] | uint256[]  quantities array |
| [2] | uint256 | uint256  Last Price processed. 0 if no more price point left |
| [3] | bytes32 | bytes32  Last Order id processed. "" if no more orders left |
### getOrder

Returns order details given the order id

```solidity
function getOrder(bytes32 _orderId) public view returns (struct ITradePairs.Order)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id assigned by the contract |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | Order  Order Struct |
### getOrderByClientOrderId

Returns order details given the trader and the clientOrderId

```solidity
function getOrderByClientOrderId(address _trader, bytes32 _clientOrderId) external view returns (struct ITradePairs.Order)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | user's address |
| _clientOrderId | bytes32 | client Order id assigned by the user |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | Order  Order Struct |
### getQuoteAmount

Returns the quote amount for a given price and quantity

```solidity
function getQuoteAmount(bytes32 _tradePairId, uint256 _price, uint256 _quantity) public view returns (uint256)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price |
| _quantity | uint256 | quantity |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  quote amount |
### addOrder

Frontend Entry function to call to add an order

_Adds an order with the given fields. As a general rule of thumb msg.sender should be the _trader
                otherwise the tx will revert. Only certain privileged Dexalot smart contracts that has ON_BEHALFOF_ROLE
                can send orders on behalf of somebody else. 'OrderStatusChanged' event will be emitted
                when an order is received and committed to the blockchain. You can get the contract
                generated orderid along with your clientorderid from this event. When the blockchain is extremely busy,
                the transactions are queued up in the mempool and prioritized based on their gas price.
                We have seen orders waiting for hours in the mempool in Avalanche C-Chain, before they are committed
                in extreme cases. This is a function of the blockchain and will typically happen when the current gas
                price is around 100 gwei (3-4 times of the minimum gas price) and your transaction maximum gas is set
                to be 50 gwei(normal level). Your transaction will wait in the mempool until the blockchain gas price
                goes back to normal levels._

```solidity
function addOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type1 _type1, enum ITradePairs.Type2 _type2) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | address of the trader. As a general rule of thumb msg.sender should be the _trader                 otherwise the tx will revert |
| _clientOrderId | bytes32 | clientorderid is provided by the owner of the order and it is returned in responses for                 reference. Note: must be unique per traderaddress |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the limit order. 0 for market Orders (type1=0). Price increment (baseDisplayDecimals)                  & evm decimals can be obtained by calling getDisplayDecimals & getDecimals respectively |
| _quantity | uint256 | quantity increment(quoteDisplayDecimals) and evm decimals can be obtained by calling                 getDisplayDecimals & getDecimals respectively |
| _side | enum ITradePairs.Side | enum ITradePairs.Side  Side of the order 0 BUY, 1 SELL |
| _type1 | enum ITradePairs.Type1 | enum ITradePairs.Type1 Type of the order. 0 MARKET , 1 LIMIT (STOP and STOPLIMIT NOT Supported) |
| _type2 | enum ITradePairs.Type2 | enum ITradePairs.Type2 SubType of the order. Default 0:GTC                 0 GTC : Good Till Cancel                 1 FOK : FIll or Kill (Will fill entirely or will revert with "T-FOKF-01")                 2 IOC : Immedidate or Cancel  (Will fill partially or fully, will get status=CANCELED                 if filled partially)                 3 PO  : Post Only (Will either go in the orderbook or revert with "T-T2PO-01"                 if it has a potential match) |

### matchAuctionOrder

Function to match Auction orders

_Requires DEFAULT_ADMIN_ROLE, called by ExchangeSub.matchAuctionOrders that requires AUCTION_ADMIN_ROLE_

```solidity
function matchAuctionOrder(bytes32 _takerOrderId, uint8 _maxCount) external returns (uint256)
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _takerOrderId | bytes32 | Taker Order id |
| _maxCount | uint8 | controls max number of fills an order can get at a time to avoid running out of gas |

#### returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Remaining quantity of the taker order |
### unsolicitedCancel

Admin Function to cancel orders in the orderbook when delisting a trade pair

_Will cancel orders even when TradePair is paused_

```solidity
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint8 _maxCount) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBuyBook | bool | true if buy Orderbook |
| _maxCount | uint8 | controls max number of orders to cancel at a time to avoid running out of gas |

### cancelReplaceOrder

Cancels an order and immediatly enters a similar order in the same direction.

_Only the quantity and the price of the order can be changed. All the other order
                fields are copied from the canceled order to the new order.
                The time priority of the original order is lost.
                Canceled order's locked quantity is made available for the new order within this tx_

```solidity
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |
| _clientOrderId | bytes32 | clinent order id of the new order |
| _price | uint256 | price of the new order |
| _quantity | uint256 | quantity of the new order |

### cancelOrder

Cancels an order given the order id supplied

_Will revert with "T-OAEX-01" if order is already filled or canceled_

```solidity
function cancelOrder(bytes32 _orderId) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |

### cancelAllOrders

Cancels all the orders given the array of order ids supplied

_This function may run out of gas if a trader is trying to cancel too many orders
                Call with Maximum 20 orders at a time
                Will skip orders that are already canceled/filled and continue canceling the remaining ones in the list_

```solidity
function cancelAllOrders(bytes32[] _orderIds) external
```

#### parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderIds | bytes32[] | array of order ids |

### fallback

```solidity
fallback() external
```

