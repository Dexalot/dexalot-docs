---
headerDepth: 4
---

# ITradePairs

## Struct Types

### Order

```solidity
struct Order {
  bytes32 id;
  bytes32 clientOrderId;
  bytes32 tradePairId;
  uint256 price;
  uint256 totalAmount;
  uint256 quantity;
  uint256 quantityFilled;
  uint256 totalFee;
  address traderaddress;
  enum ITradePairs.Side side;
  enum ITradePairs.Type1 type1;
  enum ITradePairs.Type2 type2;
  enum ITradePairs.Status status;
}
```
### TradePair

```solidity
struct TradePair {
  bytes32 baseSymbol;
  bytes32 quoteSymbol;
  bytes32 buyBookId;
  bytes32 sellBookId;
  uint256 minTradeAmount;
  uint256 maxTradeAmount;
  uint256 auctionPrice;
  enum ITradePairs.AuctionMode auctionMode;
  uint8 makerRate;
  uint8 takerRate;
  uint8 baseDecimals;
  uint8 baseDisplayDecimals;
  uint8 quoteDecimals;
  uint8 quoteDisplayDecimals;
  uint8 allowedSlippagePercent;
  bool addOrderPaused;
  bool pairPaused;
  bool postOnly;
}
```

## Enum Types

### Side

```solidity
enum Side {
  BUY,
  SELL
}
```
### Type1

```solidity
enum Type1 {
  MARKET,
  LIMIT,
  STOP,
  STOPLIMIT
}
```
### Status

```solidity
enum Status {
  NEW,
  REJECTED,
  PARTIAL,
  FILLED,
  CANCELED,
  EXPIRED,
  KILLED,
  CANCEL_REJECT
}
```
### RateType

```solidity
enum RateType {
  MAKER,
  TAKER
}
```
### Type2

```solidity
enum Type2 {
  GTC,
  FOK,
  IOC,
  PO
}
```
### AuctionMode

```solidity
enum AuctionMode {
  OFF,
  LIVETRADING,
  OPEN,
  CLOSING,
  PAUSED,
  MATCHING,
  RESTRICTED
}
```

## Events

### NewTradePair

```solidity:no-line-numbers
event NewTradePair(uint8 version, bytes32 pair, uint8 basedisplaydecimals, uint8 quotedisplaydecimals, uint256 mintradeamount, uint256 maxtradeamount)
```

### OrderStatusChanged

Emits a given order's latest state

**Dev notes:** \
If there are multiple partial fills, the new partial fill `price * quantity`
is added to the current value in `totalamount`. Average execution price can be
quickly calculated by `totalamount / quantityfilled` regardless of the number of
partial fills at different prices \
`totalfee` is always in terms of received(incoming) currency. ie. if Buy ALOT/AVAX,
fee is paid in ALOT, if Sell ALOT/AVAX , fee is paid in AVAX \
**Note**: The execution price will always be equal or better than the Order price.

```solidity:no-line-numbers
event OrderStatusChanged(uint8 version, address traderaddress, bytes32 pair, bytes32 orderId, bytes32 clientOrderId, uint256 price, uint256 totalamount, uint256 quantity, enum ITradePairs.Side side, enum ITradePairs.Type1 type1, enum ITradePairs.Type2 type2, enum ITradePairs.Status status, uint256 quantityfilled, uint256 totalfee, bytes32 code)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| version | uint8 | event version |
| traderaddress | address | traders’s wallet (immutable) |
| pair | bytes32 | traded pair. ie. ALOT/AVAX in bytes32 (immutable) |
| orderId | bytes32 | unique order id assigned by the contract (immutable) |
| clientOrderId | bytes32 | client order id given by the sender of the order as a reference (immutable) |
| price | uint256 | price of the order entered by the trader. (0 if market order) (immutable) |
| totalamount | uint256 | cumulative amount in quote currency: `price * quantityfilled` |
| quantity | uint256 | order quantity (immutable) |
| side | enum ITradePairs.Side | Order Side  See #Side (immutable) |
| type1 | enum ITradePairs.Type1 | Order Type1  See #Type1 (immutable) |
| type2 | enum ITradePairs.Type2 | Order Type2  See #Type2 (immutable) |
| status | enum ITradePairs.Status | Order Status See #Status |
| quantityfilled | uint256 | cumulative quantity filled |
| totalfee | uint256 | cumulative fee paid for the order |
| code | bytes32 | reason when order has REJECT or CANCEL_REJECT status |
### Executed

Emits the Executed/Trade Event showing

**Dev notes:** \
The side of the taker order can be used to identify
the fee unit. If takerSide = 1, then the fee is paid by the maker in base
currency and the fee paid by the taker in quote currency. If takerSide = 0
then the fee is paid by the maker in quote currency and the fee is paid by
the taker in base currency

```solidity:no-line-numbers
event Executed(uint8 version, bytes32 pair, uint256 price, uint256 quantity, bytes32 makerOrder, bytes32 takerOrder, uint256 feeMaker, uint256 feeTaker, enum ITradePairs.Side takerSide, uint256 execId, address addressMaker, address addressTaker)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| version | uint8 | event version |
| pair | bytes32 | traded pair. ie. ALOT/AVAX in bytes32 |
| price | uint256 | executed price |
| quantity | uint256 | executed quantity |
| makerOrder | bytes32 | maker Order id |
| takerOrder | bytes32 | taker Order id |
| feeMaker | uint256 | fee paid by maker |
| feeTaker | uint256 | fee paid by taker |
| takerSide | enum ITradePairs.Side | Side of the taker order. 0 - BUY, 1- SELL |
| execId | uint256 | unique trade id (execution id) assigned by the contract |
| addressMaker | address | maker traderaddress |
| addressTaker | address | taker traderaddress |
### ParameterUpdated

```solidity:no-line-numbers
event ParameterUpdated(uint8 version, bytes32 pair, string param, uint256 oldValue, uint256 newValue)
```

## Methods

### External

#### pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

```solidity:no-line-numbers
function unpause() external
```

#### pauseTradePair

```solidity:no-line-numbers
function pauseTradePair(bytes32 _tradePairId, bool _tradePairPause) external
```

#### pauseAddOrder

```solidity:no-line-numbers
function pauseAddOrder(bytes32 _tradePairId, bool _addOrderPause) external
```

#### postOnly

```solidity:no-line-numbers
function postOnly(bytes32 _tradePairId, bool _postOnly) external
```

#### addTradePair

```solidity:no-line-numbers
function addTradePair(bytes32 _tradePairId, struct IPortfolio.TokenDetails _baseTokenDetails, uint8 _baseDisplayDecimals, struct IPortfolio.TokenDetails _quoteTokenDetails, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

#### removeTradePair

```solidity:no-line-numbers
function removeTradePair(bytes32 _tradePairId) external
```

#### getTradePairs

```solidity:no-line-numbers
function getTradePairs() external view returns (bytes32[])
```

#### setMinTradeAmount

```solidity:no-line-numbers
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external
```

#### setMaxTradeAmount

```solidity:no-line-numbers
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external
```

#### addOrderType

```solidity:no-line-numbers
function addOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

#### removeOrderType

```solidity:no-line-numbers
function removeOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external
```

#### setDisplayDecimals

```solidity:no-line-numbers
function setDisplayDecimals(bytes32 _tradePairId, uint8 _displayDecimals, bool _isBase) external
```

#### getTradePair

```solidity:no-line-numbers
function getTradePair(bytes32 _tradePairId) external view returns (struct ITradePairs.TradePair)
```

#### updateRate

```solidity:no-line-numbers
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external
```

#### setAllowedSlippagePercent

```solidity:no-line-numbers
function setAllowedSlippagePercent(bytes32 _tradePairId, uint8 _allowedSlippagePercent) external
```

#### getNBook

```solidity:no-line-numbers
function getNBook(bytes32 _tradePairId, enum ITradePairs.Side _side, uint256 _nPrice, uint256 _nOrder, uint256 _lastPrice, bytes32 _lastOrder) external view returns (uint256[], uint256[], uint256, bytes32)
```

#### getOrder

```solidity:no-line-numbers
function getOrder(bytes32 _orderId) external view returns (struct ITradePairs.Order)
```

#### getOrderByClientOrderId

```solidity:no-line-numbers
function getOrderByClientOrderId(address _trader, bytes32 _clientOrderId) external view returns (struct ITradePairs.Order)
```

#### addOrder

```solidity:no-line-numbers
function addOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type1 _type1, enum ITradePairs.Type2 _type2) external
```

#### cancelOrder

```solidity:no-line-numbers
function cancelOrder(bytes32 _orderId) external
```

#### cancelOrderList

```solidity:no-line-numbers
function cancelOrderList(bytes32[] _orderIds) external
```

#### cancelReplaceOrder

```solidity:no-line-numbers
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external
```

#### setAuctionMode

```solidity:no-line-numbers
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external
```

#### setAuctionPrice

```solidity:no-line-numbers
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external
```

#### unsolicitedCancel

```solidity:no-line-numbers
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint256 _maxCount) external
```

#### getBookId

```solidity:no-line-numbers
function getBookId(bytes32 _tradePairId, enum ITradePairs.Side _side) external view returns (bytes32)
```

#### matchAuctionOrder

```solidity:no-line-numbers
function matchAuctionOrder(bytes32 _takerOrderId, uint256 _maxNbrOfFills) external returns (uint256)
```

#### getOrderRemainingQuantity

```solidity:no-line-numbers
function getOrderRemainingQuantity(bytes32 _orderId) external view returns (uint256)
```

