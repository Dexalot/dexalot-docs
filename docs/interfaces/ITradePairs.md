# ITradePairs

*&quot;DEXALOT TEAM&quot;*

> &quot;ITradePairs: interface of TradePairs&quot;





## Methods

### addOrder

```solidity
function addOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type1 _type1, enum ITradePairs.Type2 _type2) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | undefined |
| _clientOrderId | bytes32 | undefined |
| _tradePairId | bytes32 | undefined |
| _price | uint256 | undefined |
| _quantity | uint256 | undefined |
| _side | enum ITradePairs.Side | undefined |
| _type1 | enum ITradePairs.Type1 | undefined |
| _type2 | enum ITradePairs.Type2 | undefined |

### addOrderType

```solidity
function addOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _type | enum ITradePairs.Type1 | undefined |

### addTradePair

```solidity
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDecimals, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDecimals, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _baseSymbol | bytes32 | undefined |
| _baseDecimals | uint8 | undefined |
| _baseDisplayDecimals | uint8 | undefined |
| _quoteSymbol | bytes32 | undefined |
| _quoteDecimals | uint8 | undefined |
| _quoteDisplayDecimals | uint8 | undefined |
| _minTradeAmount | uint256 | undefined |
| _maxTradeAmount | uint256 | undefined |
| _mode | enum ITradePairs.AuctionMode | undefined |

### cancelAllOrders

```solidity
function cancelAllOrders(bytes32[] _orderIds) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderIds | bytes32[] | undefined |

### cancelOrder

```solidity
function cancelOrder(bytes32 _orderId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | undefined |

### cancelReplaceOrder

```solidity
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | undefined |
| _clientOrderId | bytes32 | undefined |
| _price | uint256 | undefined |
| _quantity | uint256 | undefined |

### getAllowedSlippagePercent

```solidity
function getAllowedSlippagePercent(bytes32 _tradePairId) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getAuctionData

```solidity
function getAuctionData(bytes32 _tradePairId) external view returns (uint8, uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |
| _1 | uint256 | undefined |

### getBookId

```solidity
function getBookId(bytes32 _tradePairId, enum ITradePairs.Side _side) external view returns (bytes32)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _side | enum ITradePairs.Side | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getDecimals

```solidity
function getDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _isBase | bool | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getDisplayDecimals

```solidity
function getDisplayDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _isBase | bool | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getMakerRate

```solidity
function getMakerRate(bytes32 _tradePairId) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getMaxTradeAmount

```solidity
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getMinTradeAmount

```solidity
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getNBook

```solidity
function getNBook(bytes32 _tradePairId, enum ITradePairs.Side _side, uint256 _nPrice, uint256 _nOrder, uint256 _lastPrice, bytes32 _lastOrder) external view returns (uint256[], uint256[], uint256, bytes32)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _side | enum ITradePairs.Side | undefined |
| _nPrice | uint256 | undefined |
| _nOrder | uint256 | undefined |
| _lastPrice | uint256 | undefined |
| _lastOrder | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |
| _1 | uint256[] | undefined |
| _2 | uint256 | undefined |
| _3 | bytes32 | undefined |

### getOrder

```solidity
function getOrder(bytes32 _orderId) external view returns (struct ITradePairs.Order)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITradePairs.Order | undefined |

### getOrderByClientOrderId

```solidity
function getOrderByClientOrderId(address _trader, bytes32 _clientOrderId) external view returns (struct ITradePairs.Order)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | undefined |
| _clientOrderId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITradePairs.Order | undefined |

### getQuoteAmount

```solidity
function getQuoteAmount(bytes32 _tradePairId, uint256 _price, uint256 _quantity) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _price | uint256 | undefined |
| _quantity | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getSymbol

```solidity
function getSymbol(bytes32 _tradePairId, bool _isBase) external view returns (bytes32)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _isBase | bool | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getTakerRate

```solidity
function getTakerRate(bytes32 _tradePairId) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getTradePairs

```solidity
function getTradePairs() external view returns (bytes32[])
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32[] | undefined |

### matchAuctionOrder

```solidity
function matchAuctionOrder(bytes32 _takerOrderId, uint8 _maxCount) external nonpayable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _takerOrderId | bytes32 | undefined |
| _maxCount | uint8 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### pause

```solidity
function pause() external nonpayable
```






### pauseAddOrder

```solidity
function pauseAddOrder(bytes32 _tradePairId, bool _allowAddOrder) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _allowAddOrder | bool | undefined |

### pauseTradePair

```solidity
function pauseTradePair(bytes32 _tradePairId, bool _pairPause) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _pairPause | bool | undefined |

### removeOrderType

```solidity
function removeOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _type | enum ITradePairs.Type1 | undefined |

### setAllowedSlippagePercent

```solidity
function setAllowedSlippagePercent(bytes32 _tradePairId, uint8 _allowedSlippagePercent) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _allowedSlippagePercent | uint8 | undefined |

### setAuctionMode

```solidity
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _mode | enum ITradePairs.AuctionMode | undefined |

### setAuctionPrice

```solidity
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _price | uint256 | undefined |

### setDisplayDecimals

```solidity
function setDisplayDecimals(bytes32 _tradePairId, uint8 _displayDecimals, bool _isBase) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _displayDecimals | uint8 | undefined |
| _isBase | bool | undefined |

### setMaxTradeAmount

```solidity
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _maxTradeAmount | uint256 | undefined |

### setMinTradeAmount

```solidity
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _minTradeAmount | uint256 | undefined |

### unpause

```solidity
function unpause() external nonpayable
```






### unsolicitedCancel

```solidity
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint8 _maxCount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _isBuyBook | bool | undefined |
| _maxCount | uint8 | undefined |

### updateRate

```solidity
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _rate | uint8 | undefined |
| _rateType | enum ITradePairs.RateType | undefined |



## Events

### Executed

```solidity
event Executed(uint8 version, bytes32 indexed pair, uint256 price, uint256 quantity, bytes32 makerOrder, bytes32 takerOrder, uint256 feeMaker, uint256 feeTaker, enum ITradePairs.Side takerSide, uint256 execId, address indexed addressMaker, address indexed addressTaker)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| pair `indexed` | bytes32 | undefined |
| price  | uint256 | undefined |
| quantity  | uint256 | undefined |
| makerOrder  | bytes32 | undefined |
| takerOrder  | bytes32 | undefined |
| feeMaker  | uint256 | undefined |
| feeTaker  | uint256 | undefined |
| takerSide  | enum ITradePairs.Side | undefined |
| execId  | uint256 | undefined |
| addressMaker `indexed` | address | undefined |
| addressTaker `indexed` | address | undefined |

### NewTradePair

```solidity
event NewTradePair(uint8 version, bytes32 pair, uint8 basedisplaydecimals, uint8 quotedisplaydecimals, uint256 mintradeamount, uint256 maxtradeamount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| pair  | bytes32 | undefined |
| basedisplaydecimals  | uint8 | undefined |
| quotedisplaydecimals  | uint8 | undefined |
| mintradeamount  | uint256 | undefined |
| maxtradeamount  | uint256 | undefined |

### OrderStatusChanged

```solidity
event OrderStatusChanged(uint8 version, address indexed traderaddress, bytes32 indexed pair, bytes32 orderId, bytes32 clientOrderId, uint256 price, uint256 totalamount, uint256 quantity, enum ITradePairs.Side side, enum ITradePairs.Type1 type1, enum ITradePairs.Type2 type2, enum ITradePairs.Status status, uint256 quantityfilled, uint256 totalfee)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| traderaddress `indexed` | address | undefined |
| pair `indexed` | bytes32 | undefined |
| orderId  | bytes32 | undefined |
| clientOrderId  | bytes32 | undefined |
| price  | uint256 | undefined |
| totalamount  | uint256 | undefined |
| quantity  | uint256 | undefined |
| side  | enum ITradePairs.Side | undefined |
| type1  | enum ITradePairs.Type1 | undefined |
| type2  | enum ITradePairs.Type2 | undefined |
| status  | enum ITradePairs.Status | undefined |
| quantityfilled  | uint256 | undefined |
| totalfee  | uint256 | undefined |

### ParameterUpdated

```solidity
event ParameterUpdated(uint8 version, bytes32 indexed pair, string param, uint256 oldValue, uint256 newValue)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| pair `indexed` | bytes32 | undefined |
| param  | string | undefined |
| oldValue  | uint256 | undefined |
| newValue  | uint256 | undefined |



