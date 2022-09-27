# OrderBooks



> Central Limit Order Books

This contract implements Central Limit Order Books with price and time priority           interacting with the underlying Red-Black-Tree.

*For each trade pair two order books are added to orderBookMap: buyBook and sellBook.           The naming convention for the order books is as follows: TRADEPAIRNAME-BUYBOOK and TRADEPAIRNAME-SELLBOOK.           For trade pair AVAX/USDT the order books are AVAX/USDT-BUYBOOK amd AVAX/USDT-SELLBOOK.           TradePairs should have EXECUTOR_ROLE in OrderBooks.*

## Methods

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### EXECUTOR_ROLE

```solidity
function EXECUTOR_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

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
function addOrder(bytes32 _orderBookID, bytes32 _orderUid, uint256 _price) external nonpayable
```

Add order to order book

*Make SURE the Quantity Check ( order remaining quantity &gt; 0) is done before calling this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _orderUid | bytes32 | Order UID |
| _price | uint256 | Price |

### addToOrderbooks

```solidity
function addToOrderbooks(bytes32 _orderBookID, enum ITradePairs.Side _side) external nonpayable
```

Adds OrderBook with its side



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | . |
| _side | enum ITradePairs.Side | BuyBook or SellBook |

### bestPrice

```solidity
function bestPrice(bytes32 _orderBookID) external view returns (uint256 _price)
```

Returns the Best Bid or Best ASK depending on the OrderBook side



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |

#### Returns

| Name | Type | Description |
|---|---|---|
| _price | uint256 |  Best Bid or Best ASK |

### exists

```solidity
function exists(bytes32 _orderBookID, uint256 price) external view returns (bool _exists)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| _exists | bool |  True if price exists |

### getBookSize

```solidity
function getBookSize(bytes32 _orderBookID) external view returns (uint256)
```

Used for getting number of price levels on an order book



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  Number of price levels |

### getHead

```solidity
function getHead(bytes32 _orderBookID, uint256 price) external view returns (bytes32 head)
```

Used for getting head of the linked list of orders at a price

*( , bytes32 head) = orderBookMap[_orderBookID].orderList[price].getAdjacent(&#39;&#39;, false) will give the Same result as this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| head | bytes32 |  The id of the earliest order entered at the price level. |

### getNOrders

```solidity
function getNOrders(bytes32 _orderBookID, uint256 nPrice, uint256 nOrder, uint256 lastPrice, bytes32 lastOrder) external view returns (uint256[] prices, uint256[] quantities, uint256, bytes32)
```

Get all orders at N price levels



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| nPrice | uint256 | Number of price levels |
| nOrder | uint256 | Number of orders |
| lastPrice | uint256 | Last price |
| lastOrder | bytes32 | Last order |

#### Returns

| Name | Type | Description |
|---|---|---|
| prices | uint256[] |  Prices |
| quantities | uint256[] |  Quantities |
| _2 | uint256 | uint256  Last price |
| _3 | bytes32 | bytes32  Last order |

### getNOrdersOld

```solidity
function getNOrdersOld(bytes32 _orderBookID, uint256 n, uint256 _type) external view returns (uint256[], uint256[])
```



*Deprecated. Use getNOrders instead. This is implemented with an unbound loop. This function will run out of gas when retreiving big orderbook data*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| n | uint256 | Number |
| _type | uint256 | Type |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | uint256[]  Prices |
| _1 | uint256[] | uint256[]  Quantities |

### getNode

```solidity
function getNode(bytes32 _orderBookID, uint256 _price) external view returns (uint256 price, uint256 parent, uint256 left, uint256 right, bool red, bytes32 head, uint256 size)
```



*used for getting red-black-tree details in debugging*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| price | uint256 |  Price |
| parent | uint256 |  Parent price |
| left | uint256 |  Left price |
| right | uint256 |  Right price |
| red | bool |  True if red |
| head | bytes32 |  Head price |
| size | uint256 |  Size of the tree |

### getQuantitiesAtPrice

```solidity
function getQuantitiesAtPrice(bytes32 _orderBookID, uint256 _price) external view returns (uint256[])
```



*Used for getting the quantities in linked list of orders at a price*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | uint256[]  Quantities |

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

### getTradePairs

```solidity
function getTradePairs() external view returns (contract ITradePairs)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ITradePairs | ITradePairs  trade pairs contract |

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
function initialize() external nonpayable
```

Initializer for upgradeable contract.




### isNotCrossedBook

```solidity
function isNotCrossedBook(bytes32 _sellBookId, bytes32 _buyBookId) external view returns (bool)
```

Shows if any orders in the orderbook is crossed. Only relevant for auction orders

*Returns True if one of the orderbooks is empty*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _sellBookId | bytes32 | Sell Order book ID |
| _buyBookId | bytes32 | Buy Order book ID |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool True if orderbook is not crossed and clear |

### matchTrade

```solidity
function matchTrade(bytes32 _orderBookID, uint256 price, uint256 takerOrderRemainingQuantity, uint256 makerOrderRemainingQuantity) external nonpayable returns (uint256)
```

Match orders



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| price | uint256 | Price |
| takerOrderRemainingQuantity | uint256 | Remaining quantity of the taker order |
| makerOrderRemainingQuantity | uint256 | Remaining quantity of the maker order |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  Matched quantity |

### nextOrder

```solidity
function nextOrder(bytes32 _orderBookID, uint256 _price, bytes32 _orderId) external view returns (bytes32 nextId)
```

Get next order at a price from linked list of orders



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _price | uint256 | Price |
| _orderId | bytes32 | Order ID |

#### Returns

| Name | Type | Description |
|---|---|---|
| nextId | bytes32 |  Next order ID |

### nextPrice

```solidity
function nextPrice(bytes32 _orderBookID, enum ITradePairs.Side _side, uint256 _price) external view returns (uint256 price)
```

Next price from a tree of prices



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _side | enum ITradePairs.Side | Side |
| _price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| price | uint256 |  Next price |

### orderListExists

```solidity
function orderListExists(bytes32 _orderBookID, uint256 _price) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _price | uint256 | Price |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  True if exists |

### removeFirstOrder

```solidity
function removeFirstOrder(bytes32 _orderBookID, uint256 _price) external nonpayable
```

Removes the first order from the order book



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _price | uint256 | Price |

### removeOrder

```solidity
function removeOrder(bytes32 _orderBookID, bytes32 _orderUid, uint256 _price) external nonpayable
```

Removes order from order book



#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderBookID | bytes32 | Order book ID |
| _orderUid | bytes32 | Order UID |
| _price | uint256 | Price |

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

### setTradePairs

```solidity
function setTradePairs(address _tradePairs) external nonpayable
```

Sets trade pairs contract



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairs | address | address of the trade pairs contract |

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



## Events

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

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

### TradePairsSet

```solidity
event TradePairsSet(address _oldTradePairs, address _newTradePairs)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _oldTradePairs  | address | undefined |
| _newTradePairs  | address | undefined |



