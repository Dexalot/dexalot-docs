# TradePairs



> Implements the data structures and functions for trade pairs



*For each trade pair an entry is added tradePairMap.          The naming convention for the trade pairs is as follows: BASEASSET/QUOTEASSET.          For base asset AVAX and quote asset USDT the trade pair name is AVAX/USDT.          ExchangeSub needs to have DEFAULT_ADMIN_ROLE on TradePairs.          TradePairs should have EXECUTOR_ROLE on OrderBooks.*

## Methods

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### ON_BEHALFOF_ROLE

```solidity
function ON_BEHALFOF_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### TENK

```solidity
function TENK() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### VERSION

```solidity
function VERSION() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### addOrder

```solidity
function addOrder(address _trader, bytes32 _clientOrderId, bytes32 _tradePairId, uint256 _price, uint256 _quantity, enum ITradePairs.Side _side, enum ITradePairs.Type1 _type1, enum ITradePairs.Type2 _type2) external nonpayable
```

Frontend Entry function to call to add an order

*Adds an order with the given fields. As a general rule of thumb msg.sender should be the _trader otherwise the tx will revert. Only certain privileged Dexalot smart contracts that has ON_BEHALFOF_ROLE can send orders on behalf of somebody else. &#39;OrderStatusChanged&#39; event will be emitted when an order is received and committed to the blockchain. You can get the contract generated orderid along with your clientorderid from this event. When the blockchain is extremely busy, the transactions are queued up in the mempool and prioritized based on their gas price. We have seen orders waiting for hours in the mempool in Avalanche C-Chain, before they are committed in extreme cases. This is a function of the blockchain and will typically happen when the current gas price is around 100 gwei (3-4 times of the minimum gas price) and your transaction maximum gas is set to be 50 gwei(normal level). Your transaction will wait in the mempool until the blockchain gas price goes back to normal levels.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | address of the trader. As a general rule of thumb msg.sender should be the _trader otherwise the tx will revert |
| _clientOrderId | bytes32 | clientorderid is provided by the owner of the order and it is returned in responses for reference. Note: must be unique per traderaddress |
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the limit order. 0 for market Orders (type1=0). Price increment (baseDisplayDecimals) &amp; evm decimals can be obtained by calling getDisplayDecimals &amp; getDecimals respectively |
| _quantity | uint256 | quantity increment(quoteDisplayDecimals) &amp; evm decimals can be obtained by calling getDisplayDecimals &amp; getDecimals respectively |
| _side | enum ITradePairs.Side | enum ITradePairs.Side  Side of the order 0 BUY, 1 SELL |
| _type1 | enum ITradePairs.Type1 | enum ITradePairs.Type1 Type of the order. 0 MARKET , 1 LIMIT (STOP &amp; STOPLIMIT NOT Supported) |
| _type2 | enum ITradePairs.Type2 | enum ITradePairs.Type2 SubType of the order. Default 0:GTC 0 GTC : Good Till Cancel 1 FOK : FIll or Kill (Will fill entirely or will revert with &quot;T-FOKF-01&quot;) 2 IOC : Immedidate or Cancel  (Will fill partially or fully, will get status=CANCELED if filled partially) 3 PO  : Post Only (Will either go in the orderbook or revert with &quot;T-T2PO-01&quot; if it has a potential match) |

### addOrderType

```solidity
function addOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external nonpayable
```

Adds a new order type to a tradePair

*Can only be called by DEFAULT_ADMIN. LIMIT order is added by default.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |

### addTradePair

```solidity
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDecimals, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDecimals, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Adds a new TradePair

*Only DEFAULT_ADMIN or ExchangeSub can call this function which has this role. ExhangeSub makes sure that the symbols are added to the portfolio with the correct addresses first.*

#### Parameters

| Name | Type | Description |
|---|---|---|
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

### cancelAllOrders

```solidity
function cancelAllOrders(bytes32[] _orderIds) external nonpayable
```

Cancels all the orders given the array of order ids supplied

*This function may run out of gas if a trader is trying to cancel too many orders Call with Maximum 20 orders at a time Will skip orders that are already canceled/filled and continue canceling the remaining ones in the list*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderIds | bytes32[] | array of order ids |

### cancelOrder

```solidity
function cancelOrder(bytes32 _orderId) external nonpayable
```

Cancels an order given the order id supplied

*Will revert with &quot;T-OAEX-01&quot; if order is already filled or canceled*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | order id to cancel |

### cancelReplaceOrder

```solidity
function cancelReplaceOrder(bytes32 _orderId, bytes32 _clientOrderId, uint256 _price, uint256 _quantity) external nonpayable
```

Cancels an order and immediatly enters a similar order in the same direction.

*Only the quantity and the price of the order can be changed. All the other order fields are copied from the canceled order to the new order. The time priority of the original order is lost. Canceled order&#39;s locked quantity is made available for the new order within this tx*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | order id to cancel |
| _clientOrderId | bytes32 | clinent order id of the new order |
| _price | uint256 | price of the new order |
| _quantity | uint256 | quantity of the new order |

### getAllowedOrderTypes

```solidity
function getAllowedOrderTypes(bytes32 _tradePairId) external view returns (uint256[])
```

Returns the allowed order types.

*LIMIT is always available by default. Market order type is allowed once there is enough liquidity on a pair*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | uint256[]  Array of allowed order types |

### getAllowedSlippagePercent

```solidity
function getAllowedSlippagePercent(bytes32 _tradePairId) external view returns (uint8)
```

Allowed slippage percent for market orders, before the market order gets an unsolicited cancel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | uint8  slippage percent |

### getAuctionData

```solidity
function getAuctionData(bytes32 _tradePairId) external view returns (uint8 mode, uint256 price)
```

Returns the auction mode &amp; the auction price of a specific Trade Pair



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| mode | uint8 |  auction mode |
| price | uint256 |  auction price |

### getBookId

```solidity
function getBookId(bytes32 _tradePairId, enum ITradePairs.Side _side) external view returns (bytes32)
```

Returns the bookid given the tradePairId and side



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | undefined |
| _side | enum ITradePairs.Side | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | bytes32  BookId |

### getDecimals

```solidity
function getDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

Returns the evm decimals of the base or the quote symbol in a tradePair



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | uint8  evm decimal. This is identical to decimals value from ERC20 contract of the symbol 18 for ALOT and AVAX |

### getDisplayDecimals

```solidity
function getDisplayDecimals(bytes32 _tradePairId, bool _isBase) external view returns (uint8)
```

Returns the display decimals of the base or the quote asset in a tradePair



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | uint8  display decimal. Also referred as &quot;Quantity Increment if _isBase==true&quot;, &quot;PriceIncrement if _isBase==false&quot; |

### getMakerRate

```solidity
function getMakerRate(bytes32 _tradePairId) external view returns (uint8)
```

Returns Maker Rate (Commission)



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | uint8  maker Rate |

### getMaxTradeAmount

```solidity
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

Returns the maximum trade amount allowed for a specific Trade Pair

*getQuoteAmount(_price, _quantity, _tradePairId) &lt;= _maxTradeAmount*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  maximum trade amount in terms of quote asset |

### getMinTradeAmount

```solidity
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

Returns the minimum trade amount allowed for a specific Trade Pair

*getQuoteAmount(_price, _quantity, _tradePairId) &gt;= _minTradeAmount*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  minimum trade amount in terms of quote asset |

### getNBook

```solidity
function getNBook(bytes32 _tradePairId, enum ITradePairs.Side _side, uint256 _nPrice, uint256 _nOrder, uint256 _lastPrice, bytes32 _lastOrder) external view returns (uint256[], uint256[], uint256, bytes32)
```

Returns Buy or Sell orderbook for the given tradepair &amp; side

*Although this is a view function, it may run out of gas in case you try to get the entire order book with a lot of orders. That&#39;s why it has nPrice and nOrder parameters. getNBook(tradePair, 0, 2, 50, 0, bytes32(&#39;&#39;)) : This will get the best 2 buy price point (top of the buy book and the next best price and it will aggregate the quantities of up to 50 orders at a time when generating the orderbook).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _side | enum ITradePairs.Side | 0- BUY for BuyBook, 1- SELL for SellBook |
| _nPrice | uint256 | depth requested. If 1, top of the book, if 2 best 2 prices etc |
| _nOrder | uint256 | number of orders to be retrieved at a time at the price point |
| _lastPrice | uint256 | the price point to start at in case a loop is used to get the entire order book. Use 0 for small requests. If looping use the Last Price returned from this function call |
| _lastOrder | bytes32 | the orderid used in case a loop is used to get the entire order book. Use empty string in bytes32 for small request If looping use the Last Orderid returned from this function call |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | uint256[]  prices array |
| _1 | uint256[] | uint256[]  quantities array |
| _2 | uint256 | uint256  Last Price processed. 0 if no more price point left |
| _3 | bytes32 | bytes32  Last Order id processed. &quot;&quot; if no more orders left |

### getOrder

```solidity
function getOrder(bytes32 _orderId) external view returns (struct ITradePairs.Order)
```

Returns order details given the order id



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | bytes32 | order id assigned by the contract |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITradePairs.Order | Order  Order Struct |

### getOrderByClientOrderId

```solidity
function getOrderByClientOrderId(address _trader, bytes32 _clientOrderId) external view returns (struct ITradePairs.Order)
```

Returns order details given the trader &amp; the clientOrderId



#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | user&#39;s address |
| _clientOrderId | bytes32 | client Order id assigned by the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITradePairs.Order | Order  Order Struct |

### getQuoteAmount

```solidity
function getQuoteAmount(bytes32 _tradePairId, uint256 _price, uint256 _quantity) external view returns (uint256)
```

Returns the quote amount for a given price and quantity



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price |
| _quantity | uint256 | quantity |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  quote amount |

### getRoleAdmin

```solidity
function getRoleAdmin(bytes32 role) external view returns (bytes32)
```



*Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role&#39;s admin, use {_setRoleAdmin}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getRoleMember

```solidity
function getRoleMember(bytes32 role, uint256 index) external view returns (address)
```



*Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| index | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getRoleMemberCount

```solidity
function getRoleMemberCount(bytes32 role) external view returns (uint256)
```



*Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getSymbol

```solidity
function getSymbol(bytes32 _tradePairId, bool _isBase) external view returns (bytes32)
```

Returns the base or quote symbol



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _isBase | bool | true/false |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | bytes32  symbol in bytes32 |

### getTakerRate

```solidity
function getTakerRate(bytes32 _tradePairId) external view returns (uint8)
```

Returns Taker Rate (Commission)



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | uint8  taker Rate |

### getTradePairs

```solidity
function getTradePairs() external view returns (bytes32[])
```

Gets a list of the trade Pairs

*All pairs are returned. Even the delisted ones.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32[] | bytes32[]  Array of trade Pairs . |

### grantRole

```solidity
function grantRole(bytes32 role, address account) external nonpayable
```



*Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``&#39;s admin role. May emit a {RoleGranted} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

### hasRole

```solidity
function hasRole(bytes32 role, address account) external view returns (bool)
```



*Returns `true` if `account` has been granted `role`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### initialize

```solidity
function initialize(address _orderbooks, address _portfolio) external nonpayable
```

initializer function for Upgradeable TradePairs

*idCounter needs to be unique for each order &amp; execution id. Both the orderbooks and the portolio should be deployed before tradepairs*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderbooks | address | orderbooks instance |
| _portfolio | address | portfolio instance |

### matchAuctionOrder

```solidity
function matchAuctionOrder(bytes32 _takerOrderId, uint8 _maxCount) external nonpayable returns (uint256)
```

Function to match Auction orders

*Requires DEFAULT_ADMIN_ROLE, called by ExchangeSub.matchAuctionOrders that requires AUCTION_ADMIN_ROLE*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _takerOrderId | bytes32 | Taker Order id |
| _maxCount | uint8 | controls max number of fills an order can get at a time to avoid running out of gas |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  Remaining quantity of the taker order |

### pause

```solidity
function pause() external nonpayable
```

Pauses the contract

*Only callable by DEFAULT_ADMIN*


### pauseAddOrder

```solidity
function pauseAddOrder(bytes32 _tradePairId, bool _pause) external nonpayable
```

Pauses adding new orders to a specific Trade Pair

*Can only be called by DEFAULT_ADMIN.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |

### pauseTradePair

```solidity
function pauseTradePair(bytes32 _tradePairId, bool _pause) external nonpayable
```

Pauses a specific Trade Pair

*Can only be called by DEFAULT_ADMIN. Public instead of external because it saves 0.184(KiB) in contract size*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _pause | bool | true to pause, false to unpause |

### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### removeOrderType

```solidity
function removeOrderType(bytes32 _tradePairId, enum ITradePairs.Type1 _type) external nonpayable
```

Removes an order type that is previously allowed

*Can only be called by DEFAULT_ADMIN. LIMIT order type can&#39;t be removed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _type | enum ITradePairs.Type1 | Order Type |

### renounceRole

```solidity
function renounceRole(bytes32 role, address account) external nonpayable
```



*Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function&#39;s purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`. May emit a {RoleRevoked} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

### revokeRole

```solidity
function revokeRole(bytes32 role, address account) external nonpayable
```



*Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``&#39;s admin role. May emit a {RoleRevoked} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

### setAllowedSlippagePercent

```solidity
function setAllowedSlippagePercent(bytes32 _tradePairId, uint8 _allowedSlippagePercent) external nonpayable
```

sets the slippage percent for market orders, before it gets unsolicited cancel

*Can only be called by DEFAULT_ADMIN. Market Orders will be filled up to allowedSlippagePercent from the marketPrice(bestbid or bestask) to protect the trader. The remaining quantity gets unsolicited cancel*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _allowedSlippagePercent | uint8 | Default 20, allowedSlippagePercent=20 (20% = 20/100) |

### setAuctionMode

```solidity
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Sets the auction mode of a specific Trade Pair

*Can only be called by DEFAULT_ADMIN.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _mode | enum ITradePairs.AuctionMode | Auction Mode |

### setAuctionPrice

```solidity
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external nonpayable
```

Sets the auction price

*Price is calculated by the backend (off chain) after the auction has closed. Auction price can be changed anytime. It is imperative that is not changed after the first order is matched untile the last order to be matched.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price of the auction |

### setDisplayDecimals

```solidity
function setDisplayDecimals(bytes32 _tradePairId, uint8 _displayDecimals, bool _isBase) external nonpayable
```

Sets the display decimals of the base or the quote asset in a tradePair

*Can only be called by DEFAULT_ADMIN*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _displayDecimals | uint8 | display decimal. Also referred as &quot;Quantity Increment if _isBase==true&quot;, &quot;PriceIncrement if _isBase==false&quot; |
| _isBase | bool | true/false |

### setMaxTradeAmount

```solidity
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external nonpayable
```

Sets the maximum trade amount allowed for a specific Trade Pair

*Can only be called by DEFAULT_ADMIN. getQuoteAmount(_price, _quantity, _tradePairId) &lt;= _maxTradeAmount*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount in terms of quote asset |

### setMinTradeAmount

```solidity
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external nonpayable
```

Sets the minimum trade amount allowed for a specific Trade Pair

*Can only be called by DEFAULT_ADMIN. getQuoteAmount(_price, _quantity, _tradePairId) &gt;= _minTradeAmount*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount in terms of quote asset |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```



*See {IERC165-supportsInterface}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### tradePairExists

```solidity
function tradePairExists(bytes32 _tradePairId) external view returns (bool)
```

Checks if TradePair already exists



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  true if it exists |

### unpause

```solidity
function unpause() external nonpayable
```

Unpauses the contract

*Only callable by DEFAULT_ADMIN*


### unsolicitedCancel

```solidity
function unsolicitedCancel(bytes32 _tradePairId, bool _isBuyBook, uint8 _maxCount) external nonpayable
```

Admin Function to cancel orders in the orderbook when delisting a trade pair

*Will cancel orders even when TradePair is paused*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _isBuyBook | bool | true if buy Orderbook |
| _maxCount | uint8 | controls max number of orders to cancel at a time to avoid running out of gas |

### updateRate

```solidity
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external nonpayable
```

Sets the Maker or the Taker Rate

*Can only be called by DEFAULT_ADMIN*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _rate | uint8 | Percent Rate (_rate/100)% = _rate/10000: _rate=10 =&gt; 0.10% |
| _rateType | enum ITradePairs.RateType | Rate Type, 0 maker or 1 taker |



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

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

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

### Paused

```solidity
event Paused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

### RoleAdminChanged

```solidity
event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| previousAdminRole `indexed` | bytes32 | undefined |
| newAdminRole `indexed` | bytes32 | undefined |

### RoleGranted

```solidity
event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| account `indexed` | address | undefined |
| sender `indexed` | address | undefined |

### RoleRevoked

```solidity
event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| account `indexed` | address | undefined |
| sender `indexed` | address | undefined |

### Unpaused

```solidity
event Unpaused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |



