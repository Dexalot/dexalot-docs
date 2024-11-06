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
| EXCHANGE_ROLE | bytes32 |
| VERSION | bytes32 |
| maxNbrOfFills | uint256 |

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
| orderBooks | contract OrderBooks |
| portfolio | contract IPortfolioSub |
| tradePairsArray | bytes32[] |
| tradePairMap | mapping(bytes32 &#x3D;&gt; struct ITradePairs.TradePair) |

## Methods

### Public

#### pauseTradePair

Pauses a specific Trade Pair

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.
Public instead of external because it saves 0.184(KiB) in contract size

```solidity:no-line-numbers
function pauseTradePair(bytes32 _tradePairId, bool _tradePairPause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _tradePairPause | bool | true to pause, false to unpause |

### External

#### initialize

initializer function for Upgradeable TradePairs

**Dev notes:** \
idCounter needs to be unique for each order and execution id.
Both the orderbooks and the portolio should be deployed before tradepairs.

```solidity:no-line-numbers
function initialize(address _orderbooks, address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderbooks | address | orderbooks instance |
| _portfolio | address | portfolio instance |

#### addTradePair

Adds a new TradePair

**Dev notes:** \
Should only be called by ExchangeSub which has this DEFAULT_ADMIN role.

```solidity:no-line-numbers
function addTradePair(bytes32 _tradePairId, struct IPortfolio.TokenDetails _baseTokenDetails, uint8 _baseDisplayDecimals, struct IPortfolio.TokenDetails _quoteTokenDetails, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _baseTokenDetails | struct IPortfolio.TokenDetails | base asset details from PortfolioSub |
| _baseDisplayDecimals | uint8 | display decimals of the base Asset. Quantity increment |
| _quoteTokenDetails | struct IPortfolio.TokenDetails | quote asset details from PortfolioSub |
| _quoteDisplayDecimals | uint8 | display decimals of the quote Asset. Price increment |
| _minTradeAmount | uint256 | minimum trade amount |
| _maxTradeAmount | uint256 | maximum trade amount |
| _mode | enum ITradePairs.AuctionMode | Auction Mode of the auction token. Auction token is always the BASE asset. |

#### removeTradePair

Removes the trade pair

**Dev notes:** \
Orderbook needs to be empty to be able to remove the tradepair.
Will be used mostly if a tradepair is added by mistake and needs to be removed.

```solidity:no-line-numbers
function removeTradePair(bytes32 _tradePairId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

#### getTradePairs

Gets a list of the trade pairs

**Dev notes:** \
All pairs are returned. Even the delisted ones

```solidity:no-line-numbers
function getTradePairs() external view returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of trade pairs |

#### getTradePair

Returns the corresponding TradePair struct for the trade pair id.

```solidity:no-line-numbers
function getTradePair(bytes32 _tradePairId) external view returns (struct ITradePairs.TradePair)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.TradePair | TradePair  Trade pair data structure |

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
function pauseAddOrder(bytes32 _tradePairId, bool _addOrderPause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _addOrderPause | bool | true to pause, false to unpause |

#### postOnly

Sets the TradePair in test mode. Only Limit Post Only orders accepted. No matching.

**Dev notes:** \
Can only be called by DEFAULT_ADMIN.

```solidity:no-line-numbers
function postOnly(bytes32 _tradePairId, bool _postOnly) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _postOnly | bool | true to allow PostOnly orders, false to allow all types |

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

#### setMaxNbrOfFills

Maximum Number of Executions an order can have before it gets a cancel for the remainder

**Dev notes:** \
This is to protect the matchOrder loop from running out of gas during the normal
trading operations

```solidity:no-line-numbers
function setMaxNbrOfFills(uint256 _maxNbrOfFills) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _maxNbrOfFills | uint256 | Max number of executions an order can have in a single block |

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

#### getOrder

Returns order details given the order id

```solidity:no-line-numbers
function getOrder(bytes32 _orderId) external view returns (struct ITradePairs.Order)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id assigned by the contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | Order Struct |

#### getOrderRemainingQuantity

Returns order remaining quantity given the order id

```solidity:no-line-numbers
function getOrderRemainingQuantity(bytes32 _orderId) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id assigned by the contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | remaining quantity of the order |

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
| [0] | struct ITradePairs.Order | Order Struct |

#### addOrderList

To send multiple Orders of any type in a single transaction designed for Market Making operations

**Dev notes:** \
if a single order in the new list reverts, the entire transaction is reverted.
None of the orders will go through
See addNewOrder for REVERT conditions.
If any of the orders is rejected, it will continue to process the rest of the orders without any issues.
See addNewOrder & addOrderChecks for REJECT conditions.\
```
Sample typescript code:
const orders = [];
const order = { traderaddress: Ox
              , clientOrderId: Oxid3
              , tradePairId:
              , price:
              , quantity:
              , side: 0  // Buy
              , type1: 1 // Limit
              , type2: 3 // PO
              , stp: 0   // STP
         };
orders.push(order);
const tx = await tradePairs.addOrderList(orders);
orderLog = await tx.wait();
```

```solidity:no-line-numbers
function addOrderList(struct ITradePairs.NewOrder[] _orders) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orders | struct ITradePairs.NewOrder[] | array of newOrder struct. See ITradePairs.NewOrder |

#### addNewOrder

Function for adding a single order

**Dev notes:** \
Adds an order with the given order struct.
`clientOrderId` is user generated and it is returned in all the responses for reference. It must be unique
per traderaddress. \
`price` for MARKET orders (type1=0) is overridden to 0 internally. Valid price decimals and evm decimals
can be obtained by calling `getTradePair(..)` and accessing quoteDisplayDecimals and quoteDecimals respectively.
Any reference data is also available from the REST API. See Trading API \
`REVERT conditions:`
- `P-AFNE-01` or `P-AFNE-02` available funds not enough
- `T-OOCA-01` only msg.sender can add orders
- `T-FOKF-01` if type2=FOK and the order can't be fully filled. (Use type2=IOC instead for smother list orders)
- `T-PPAU-01` tradePair.pairPaused (Exchange Level admin function)
- `T-AOPA-01` tradePair.addOrderPaused (Exchange Level admin function)

`REJECT conditions:`

For the rest of the order level check failures, the order will be REJECTED, NOT REVERTED by emitting
OrderStatusChanged event with "status" = REJECTED and "code" = errorCode.
The OrderStatusChanged event always will return `id` (orderId) assigned from the blockchain along with
your clientorderid when trying to enter a new order regardless of the status of the order.
- `T-IVOT-01` : invalid order type / order type not enabled
- `T-TMDQ-01` : too many decimals in the quantity
- `T-TMDP-01` : too many decimals in the price
- `T-CLOI-01` : client order id has to be unique per trader
- `T-LTMT-01` : trade amount is less than minTradeAmount for the tradePair
- `T-LTMT-01` : trade amount is more than maxTradeAmount for the tradePair
- `T-T2PO-01` : Post Only order is not allowed to be a taker
- `T-POOA-01` : Only PO(PostOnly) Orders allowed for this pair
- `T-AUCT-04` : market orders not allowed in auction mode

When the blockchain is extremely busy, the transactions are queued up in the mempool and prioritized
based on their gas price.
Valid quantity decimals (baseDisplayDecimals) and evm decimals can be obtained by calling
`getTradePair(..)` and accessing baseDisplayDecimals and baseDecimals  respectively.
 Any reference data is also available from the REST API. See Trading API

`Type2` : \
0 = GTC : Good Till Cancel - default\
1 = FOK : FIll or Kill (Will entirely fill or revert with code = "T-FOKF-01") \
2 = IOC : Immediate or Cancel  (Will try to fill fully, if filled partially it will get status=CANCELED) \
3 = PO  : Post Only (Will either go in the orderbook or will get status=REJECTED with "T-T2PO-01"
if it has a potential match)

`STP`   : Self Trade Prevention Mode when both maker and taker orders are from the same traderaddress. \
0: CANCELTAKER   – Cancel taker Order. Let the resting maker order remain in the orderbook. \
1: CANCELMAKER   – Cancel maker Order. Continue to execute the newer taking order.\
2: CANCELBOTH    – Cancel both maker & taker orders immediately.\
3: NONE          – Do nothing. Self Trade allowed
```
Sample typescript code:
const order = { traderaddress: Ox    // address of the trader. If msg.sender != `traderaddress` the tx will revert.
              , clientOrderId: Oxid3 // unique id provided by the owner of an order bytes32
              , tradePairId:         // id of the trading pair in bytes32
              , price:               // price of the order
              , quantity:            // quantity of the order
              , side: 0              // enum ITradePairs.Side  Side of the order 0 BUY, 1 SELL
              , type1: 1             // enum ITradePairs.Type1 Type of the order. 0 MARKET, 1 LIMIT
              , type2: 3             // enum ITradePairs.Type2 SubType of the order
              , stp: 0               // enum ITradePairs.STP self trade prevention mode
         };
const tx = await tradePairs.addNewOrder(order);
orderLog = await tx.wait();
```

```solidity:no-line-numbers
function addNewOrder(struct ITradePairs.NewOrder _order) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct ITradePairs.NewOrder | newOrder struct to be sent out. See ITradePairs.NewOrder |

#### matchAuctionOrder

Function to match Auction orders

**Dev notes:** \
Requires `DEFAULT_ADMIN_ROLE`, also called by `ExchangeSub.matchAuctionOrders` that
requires `AUCTION_ADMIN_ROLE`.

```solidity:no-line-numbers
function matchAuctionOrder(struct ITradePairs.Order _takerOrder, uint256 _maxNbrOfFills) external returns (uint256 quantityRemaining)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _takerOrder | struct ITradePairs.Order | Taker Order |
| _maxNbrOfFills | uint256 | controls max number of fills an order can get at a time to avoid running out of gas |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| quantityRemaining | uint256 | Remaining quantity of the taker order |

#### unsolicitedCancel

Admin Function to cancel orders in the orderbook when delisting a trade pair

**Dev notes:** \
TradePair needs to be paused. No orders can be entered/canceled by users in this state
The admin can not pick and choose a particular order. He can only pick the number of orders to cancel and
the order book to cancel them from. It always start canceling/clearing the orderbook from the bottom of the
book where orders are way off-market. This way, this function's admin powers are much more limited,
as it will have to cancel a lot of orders before it reaches the orders that are financially viable to
manipulate and one side of the entire orderbook would be almost empty by then

```solidity:no-line-numbers
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint256 _maxCount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _isBuyBook | bool | true if buy Orderbook |
| _maxCount | uint256 | controls max number of orders to cancel at a time to avoid running out of gas |

#### cancelReplaceOrder

Cancels an order and immediately enters a similar order in the same direction.

**Dev notes:** \
Only the quantity and the price of the order can be changed. All the other order
fields are copied from the to-be canceled order to the new order.
The time priority of the original order is lost.
Canceled order's locked quantity is made available for the new order within this tx
This function will technically accept the same clientOrderId as the previous because previous clientOrderId
is made vailable when the previous order is cancelled as  it is removed from the mapping.
!!Not recommended! \
********Important: STP defaults to STP.CANCELMAKER ********

```solidity:no-line-numbers
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |
| _clientOrderId | bytes32 | client order id of the new order |
| _price | uint256 | price of the new order |
| _quantity | uint256 | quantity of the new order |

#### cancelOrder

Cancels an order given the order id supplied

**Dev notes:** \
FILLED & CANCELED orders are removed from the blockchain state.
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= "T-OAEX-01" for orders that are
already canceled/filled.
The remaining status are NEW & PARTIAL and they are ok to cancel
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= T-OOCC-02" if the order.traderaddress
of the order that is canceled is different than msg.sender
Will only revert if tradePair.pairPaused is set to true by admins

```solidity:no-line-numbers
function cancelOrder(bytes32 _orderId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |

#### cancelAddList

To Cancel and then Add multiple orders in a single transaction designed for Market Making operations

**Dev notes:** \
It calls cancelOrderList and then addOrderList functions
Cancels all the orders in the _orderIds list and then adds the orders in the _orders list immediately in the same block.
Cancel List is completely independent of the new list to be added. In other words, you can technically cancel 2 orders
from 2 different tradepairs and then add 5 new orders for a third tradePairId.
Canceled order's locked quantity is made available for the new order within this tx if they are for the same pair.
Call with Maximum ~15 orders at a time for a block size of 30M \
****** When processing cancellations list (_orderIdsToCancel) ****** \
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= "T-OAEX-01" for orders that are already canceled/filled \
In this case, because the closed orders are already removed from the blockchain, all the values in the OrderStatusChanged
event except "orderId", "traderaddress", "status" and "code" fields will be empty/default values. This includes the
indexed field "pair" which you may use as filters for your event listeners. Hence you should process the
transaction log rather than relying on your event listeners if you need to capture CANCEL_REJECT messages and
filtering your events using the "pair" field.
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= T-OOCC-02" if the traderaddress
of the order that is being canceled is different than msg.sender.
if any of the cancels are rejected, the rest of the cancel requests will still be processed.\
****** When processing the NEW Orders list(_orders) ****** \
if a single order in the new list REVERTS, the entire transaction is reverted. No orders nor cancels will go through.
See addNewOrder for REVERT conditions.
If any of the orders/cancels is rejected, it will continue to process the rest of the orders without any issues.
See addNewOrder & addOrderChecks for REJECT conditions. \
```
Sample typescript code:
const orderIdsToCancel =["id1","id2"];
const orders = [];
const order = { traderaddress: Ox
              , clientOrderId: Oxid3
              , tradePairId:
              , price:
              , quantity:
              , side: 0  // Buy
              , type1: 1 // Limit
              , type2: 3 // PO
              , stp : 0  // STP
         };
orders.push(order);
const tx = await tradePairs.cancelAddList(orderIdsToCancel, orders);
orderLog = await tx.wait();
```

```solidity:no-line-numbers
function cancelAddList(bytes32[] _orderIdsToCancel, struct ITradePairs.NewOrder[] _orders) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderIdsToCancel | bytes32[] | array of order ids to be canceled |
| _orders | struct ITradePairs.NewOrder[] | array of newOrder struct to be sent out. See ITradePairs.NewOrder |

#### cancelOrderList

Cancels all the orders in the array of order ids supplied

**Dev notes:** \
This function may run out of gas if a trader is trying to cancel too many orders
Call with Maximum ~50 orders at a time for a block size of 30M
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= "T-OAEX-01" for orders that are already
canceled/filled while continuing to cancel the remaining open orders in the list. \
Because the closed orders are already removed from the blockchain, all values in the OrderStatusChanged
event except "orderId", "traderaddress", "status" and "code" fields will be empty/default values. This includes the
indexed field "pair" which you may use as filters for your event listeners. Hence you should process the
transaction log rather than relying on your event listeners if you need to capture CANCEL_REJECT messages and
filtering your events using the "pair" field.

```solidity:no-line-numbers
function cancelOrderList(bytes32[] _orderIds) external
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
The details of the emitted event: \
`version`  event version \
`traderaddress`  traders’s wallet (immutable) \
`pair`  traded pair. ie. ALOT/AVAX in bytes32 (immutable) \
*ITradePairs.Order*: \
`id`  unique order id assigned by the contract (immutable) \
`clientOrderId`  client order id provided by the sender of the order as a reference (immutable) \
`tradePairId` duplicate. same as `pair` above (immutable) \
`price ` price of the order entered by the trader. (0 if market order) (immutable) \
`totalAmount`  cumulative amount in quote currency. ⇒ price * quantityFilled . If
multiple partial fills , the new partial fill amount= price * quantity is added to the
current value in the field. Average execution price can be quickly calculated by
totalAmount/quantityFilled regardless of the number of partial fills at different prices (mutable)\
`quantity`  order quantity (immutable) \
`quantityfilled`  cumulative quantity filled (mutable)\
`totalFee` cumulative fee paid for the order (total fee is always in terms of
received(incoming) currency. ie. if Buy ALOT/AVAX, fee is paid in ALOT, if Sell
ALOT/AVAX , fee is paid in AVAX (mutable) \
`traderaddress`  traders’s wallet (immutable) duplicate \
`side` Order side. See #addOrder (immutable)  See ITradePairs.Side \
`type1`  See #addOrder (immutable) See ITradePairs.Type1 \
`type2`  See #addOrder (immutable) See ITradePairs.Type2 \
`status`  latest status of the order. See ITradePairs.Status \
`updateBlock` the block number the order was created or last changed (mutable)\
`previousUpdateBlock` the previous block number the order was changed (mutable)\
`code`  reason when the order has REJECT, CANCEL_REJECT, CANCELED(due to STP) status
, empty otherwise (mutable)\
Note: The execution price will always be equal or better than the Taker Order price for
LIMIT Orders.

```solidity:no-line-numbers
function emitStatusUpdate(bytes32 _orderId, bytes32 _code) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id |
| _code | bytes32 | error code related to the order |

#### emitStatusUpdateMemory

```solidity:no-line-numbers
function emitStatusUpdateMemory(struct ITradePairs.Order _order, bytes32 _code) private
```

#### addExecution

Applies an execution to both maker and the taker orders and adjust holdings in portfolio

**Dev notes:** \
Emits Executed event showing the execution details. Note that an order's price
can be different than the execution price, but it should be identical to maker order's price.

```solidity:no-line-numbers
function addExecution(bytes32 _makerOrderId, struct ITradePairs.Order _takerOrder, uint256 _price, uint256 _quantity) private returns (struct ITradePairs.Order)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerOrderId | bytes32 | maker order id |
| _takerOrder | struct ITradePairs.Order | taker order |
| _price | uint256 | execution price |
| _quantity | uint256 | execution quantity |

#### emitExecuted

Emits the Executed Event showing \
`version`  event version \
`pair`  traded pair id from makerOrder, i.e. ALOT/AVAX in bytes32 \
`price`  executed price \
`quantity`  executed quantity \
`makerOrder`  makerOrder id \
`takerOrder`  takerOrder id \
`feeMaker`  fee paid by maker \
`feeTaker`  fee paid by taker \
`takerSide`  Side of the taker order. 0 - BUY, 1- SELL (Note: This can be used to identify
the fee UNITs. If takerSide = 1, then the fee is paid by the Maker in Base
Currency and the fee paid by the taker in Quote currency. If takerSide= 0
then the fee is paid by the Maker in Quote Currency and the fee is paid by
the taker in Base currency \
`execId`  Unique trade id (execution id) assigned by the contract \
`addressMaker`  maker traderaddress \
`addressTaker`  taker traderaddress \

```solidity:no-line-numbers
function emitExecuted(uint256 _price, uint256 _quantity, bytes32 _makerOrderId, struct ITradePairs.Order _takerOrder, uint256 _mlastFee, uint256 _tlastFee) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | executed price |
| _quantity | uint256 | executed quantity |
| _makerOrderId | bytes32 | Maker Order id |
| _takerOrder | struct ITradePairs.Order | Taker Order |
| _mlastFee | uint256 | fee paid by maker |
| _tlastFee | uint256 | fee paid by taker |

#### removeClosedOrder

Removes closed order from the mapping

**Dev notes:** \
Consumes gas but imperative to keep blockchain's active state lean.

```solidity:no-line-numbers
function removeClosedOrder(bytes32 _orderId) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to remove |

#### addOrderChecks

Checks if order can be entered without any issues

**Dev notes:** \
Checks if tradePair or addOrder is paused as well as
if decimals, order types and clientOrderId are supplied properly \
    clientorderid is sent by the owner of an order and it is returned in responses for
reference. It must be unique per traderaddress.

```solidity:no-line-numbers
function addOrderChecks(address _msSender, struct ITradePairs.NewOrder _order) private view returns (uint256, bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msSender | address | msg.Sender address |
| _order | struct ITradePairs.NewOrder | order details |

#### addOrderListPrivate

To send multiple Orders of any type in a single transaction designed for Market Making operations

**Dev notes:** \
See addOrderList

```solidity:no-line-numbers
function addOrderListPrivate(address _msSender, struct ITradePairs.NewOrder[] _orders) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msSender | address | msg.Sender's address |
| _orders | struct ITradePairs.NewOrder[] | array of newOrder struct. See ITradePairs.NewOrder |

#### addOrderPrivate

See addOrder

**Dev notes:** \
This function attempts to fill the Gas Tank if it is a single order or the very last order in a list. If we
apply fillGasTank to any order before the last one in a list, the balances of the token may change and error out
as subsequent orders for the same token may expect the balances before the tx has started. Total 20 Y
available. 2 orders entered. Ord1 Sell 12 Y and Ord2 Sell another 8 Y. if we fillGasTank on Ord1, Ord2 will
revert the entire tx with `P-AFNE`. In this case it will attempt to fillGasTank on Ord2 but it won't since
there will be no inventory available. If Ord1 Sell 12 Y and Ord2 Sell another 7 Y , then there is 1 Y
available that can be used for fillGasTank.

```solidity:no-line-numbers
function addOrderPrivate(address _msSender, struct ITradePairs.NewOrder _order, bool _fillGasTank) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msSender | address | address of the msg.Sender. If msg.sender is not the same as _order.traderaddress the tx will revert. |
| _order | struct ITradePairs.NewOrder | newOrder struct to be sent out. See ITradePairs.NewOrder |
| _fillGasTank | bool | fill GasTank if true and when the user's balance is below the treshold |

#### addTakerToOrderBook

Adds the remaining quantity of an unfilled taker order to the orderbook

**Dev notes:** \
memory taker order is cast to storage prospective maker order before being added
to the orderbook  (Including Auction Orders)

```solidity:no-line-numbers
function addTakerToOrderBook(bytes32 _tradePairId, uint256 _quantityRemaining, struct ITradePairs.Order _takerOrder) private
```

#### matchOrder

Matches a taker order with maker orders in the opposite Orderbook before
it is entered in its own orderbook.
Also handles matching auction orders.

**Dev notes:** \
IF BUY order, it will try to match with an order in the SELL OrderBook and vice versa
A taker order that is entered can match with multiple maker orders that are waiting in the orderbook.
This function may run out of gas not because of the single taker order but because of the number of
maker orders that are matching with it. This variable is ESSENTIAL for tradepairs in AUCTION_MODE== MATCHING
because we are guaranteed to run into such situations where a single large SELL order (quantity 1000)
is potentially matched with multiple small BUY orders (1000 orders with quantity 1) , creating 1000 matches
which will run out of gas.
STP logic is implemented here as well.

```solidity:no-line-numbers
function matchOrder(struct ITradePairs.Order _takerOrder, uint256 _maxNbrOfFills, enum ITradePairs.STP _stp) private returns (struct ITradePairs.Order, bytes32 code)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _takerOrder | struct ITradePairs.Order | Taker Order |
| _maxNbrOfFills | uint256 | Max number of fills an order can get at a time to avoid running out of gas (Default: 100) |
| _stp | enum ITradePairs.STP | Self Trade Prevention mode |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ITradePairs.Order | updated taker order (status,quantityFilled, totalAmount etc..) |
| code | bytes32 | reason for the cancel in the `code` field. Currently only due to STP |

#### cancelOrderPrivate

Cancels an order given the order id supplied

**Dev notes:** \
See cancelOrder

```solidity:no-line-numbers
function cancelOrderPrivate(address _msSender, bytes32 _orderId, bool _fillGasTank) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msSender | address | address of the msg.Sender |
| _orderId | bytes32 | order id to cancel |
| _fillGasTank | bool | fill GasTank if true and when the user's balance is below the treshold |

#### cancelOrderListPrivate

Cancels all the orders in the array of order ids supplied

**Dev notes:** \
See cancelOrderList

```solidity:no-line-numbers
function cancelOrderListPrivate(address _msSender, bytes32[] _orderIds, bool _fillGasTank) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msSender | address | array of order ids to be canceled |
| _orderIds | bytes32[] | array of order ids |
| _fillGasTank | bool | fill GasTank if true and only when processing the last cancel in the cancel list |

#### doOrderCancel

Cancels an order and makes the locked amount available in the portfolio

```solidity:no-line-numbers
function doOrderCancel(bytes32 _orderId, bool _fillGasTank, bytes32 _code) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | bytes32 | order id to cancel |
| _fillGasTank | bool | fill GasTank if true and when the user's balance is below the treshold |
| _code | bytes32 | additional explanation ( i.e unsolicited Cancel) |

