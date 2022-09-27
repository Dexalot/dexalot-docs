# ExchangeSub



> Subnet Exchange

This contract is the subnet version of the Dexalot Exchange.           It has all the AUCTION_ADMIN functions that can be called.

*ExchangeSub is DEFAULT_ADMIN on both PortfolioSub &amp; TradePairs contracts.*

## Methods

### AUCTION_ADMIN_ROLE

```solidity
function AUCTION_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
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

### addAdmin

```solidity
function addAdmin(address _address) external nonpayable
```

Adds Default Admin role to the address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to add role to |

### addAuctionAdmin

```solidity
function addAuctionAdmin(address _address) external nonpayable
```

Adds Auction Admin role to the address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to add role to |

### addToken

```solidity
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Add new token to portfolio

*Needs to be called after the portfolio&#39;s ownership has passed to exchange*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | symbol of the token |
| _tokenaddress | address | address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | decimals of the token |
| _mode | enum ITradePairs.AuctionMode | starting auction mode |

### addTradePair

```solidity
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Adds a new trading pair to the exchange.

*Both the base and quote symbol must exist in the PortfolioSub otherwise it will revert*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the new trading pair |
| _baseSymbol | bytes32 | symbol of the base token |
| _baseDisplayDecimals | uint8 | display decimals of the base token |
| _quoteSymbol | bytes32 | symbol of the quote token |
| _quoteDisplayDecimals | uint8 | display decimals of the quote token |
| _minTradeAmount | uint256 | minimum trade amount |
| _maxTradeAmount | uint256 | maximum trade amount |
| _mode | enum ITradePairs.AuctionMode | auction mode |

### addTrustedContract

```solidity
function addTrustedContract(address _contract, string _name) external nonpayable
```

Adds trusted contract to portfolio



#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | address of trusted contract |
| _name | string | name of trusted contract |

### bytes32ToString

```solidity
function bytes32ToString(bytes32 _bytes32) external pure returns (string)
```



*utility function to convert bytes32 to string*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _bytes32 | bytes32 | bytes32 to convert |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | string  string representation of the bytes32 |

### getMaxTradeAmount

```solidity
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  maximum trade amount |

### getMinTradeAmount

```solidity
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  minimum trade amount |

### getPortfolio

```solidity
function getPortfolio() external view returns (contract IPortfolio)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPortfolio | IPortfolio  portfolio contract |

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

### getTradePairsAddr

```solidity
function getTradePairsAddr() external view returns (contract ITradePairs)
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

*Grants admin role to the deployer.*


### isAdmin

```solidity
function isAdmin(address _address) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool    true if address has Default Admin role |

### isAuctionAdmin

```solidity
function isAuctionAdmin(address _address) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  true if address has Auction Admin role |

### isTrustedContract

```solidity
function isTrustedContract(address _contract) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  true if contract is trusted |

### matchAuctionOrders

```solidity
function matchAuctionOrders(bytes32 _tradePairId, uint8 _maxCount) external nonpayable returns (bool)
```

Matches auction orders once the auction is closed and auction price is set

*Takes the top of the book sell order, (bestAsk) and matches it with the buy orders sequantially*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _maxCount | uint8 | controls max number of fills an order can get at a time to avoid running out of gas |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  true if more matches are possible. false if no more possible matches left in the orderbook. That also means auction mode can safely be changed to AUCTIONMODE.OFF |

### pauseForUpgrade

```solidity
function pauseForUpgrade(bool _pause) external nonpayable
```

(Un)pauses portoflioSub &amp; portfolioBridgeSub &amp; TradePairs contracts for upgrade



#### Parameters

| Name | Type | Description |
|---|---|---|
| _pause | bool | true to pause, false to unpause |

### pausePortfolio

```solidity
function pausePortfolio(bool _pause) external nonpayable
```

(Un)pause portfolio operations

*This also includes deposit/withdraw processes*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _pause | bool | true to pause, false to unpause |

### pauseTradePair

```solidity
function pauseTradePair(bytes32 _tradePairId, bool _tradePairPause) external nonpayable
```

Un(pause) trading functionality for a trade pair. Affects both addorder and cancelorder funcs.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _tradePairPause | bool | true to pause trading, false to unpause |

### pauseTrading

```solidity
function pauseTrading(bool _tradingPause) external nonpayable
```

Un(pause) trading functionality. Affects both addorder and cancelorder funcs.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradingPause | bool | true to pause trading, false to unpause |

### removeAdmin

```solidity
function removeAdmin(address _address) external nonpayable
```

Removes Default Admin role from the address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to remove role from |

### removeAuctionAdmin

```solidity
function removeAuctionAdmin(address _address) external nonpayable
```

Removes Auction Admin role from the address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | address to remove role from |

### removeTrustedContract

```solidity
function removeTrustedContract(address _contract) external nonpayable
```

Removes trusted contract from portfolio



#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | address of trusted contract |

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

### setAuctionMode

```solidity
function setAuctionMode(bytes32 _tradePairId, bytes32 _baseSymbol, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Sets auction mode for a trading pair  &amp; its basetoken in the PortfolioSUb.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _baseSymbol | bytes32 | symbol of the base token |
| _mode | enum ITradePairs.AuctionMode | auction mode |

### setAuctionPrice

```solidity
function setAuctionPrice(bytes32 _tradePairId, uint256 _price) external nonpayable
```

Sets auction price



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _price | uint256 | price |

### setMaxTradeAmount

```solidity
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external nonpayable
```

Sets maximum trade amount for a trade pair



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount |

### setMinTradeAmount

```solidity
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external nonpayable
```

Sets minimum trade amount for a trade pair



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount |

### setOrderBooks

```solidity
function setOrderBooks(address _orderbooks) external nonpayable
```

Set the address of the OrderBooks contract

*Needed to initiate match auction orders*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderbooks | address | Address of the OrderBooks contract |

### setPortfolio

```solidity
function setPortfolio(contract IPortfolio _portfolio) external nonpayable
```

Set portfolio address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _portfolio | contract IPortfolio | address of portfolio contract |

### setTradePairs

```solidity
function setTradePairs(contract ITradePairs _tradePairs) external nonpayable
```

Sets trade pairs contract



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePairs | contract ITradePairs | address of the trade pairs contract |

### stringToBytes32

```solidity
function stringToBytes32(string _string) external pure returns (bytes32 result)
```



*utility function to convert string to bytes32*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _string | string | string to convert |

#### Returns

| Name | Type | Description |
|---|---|---|
| result | bytes32 |  bytes32 representation of the string |

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

### updateAllRates

```solidity
function updateAllRates(uint8 _makerRate, uint8 _takerRate) external nonpayable
```

Update all commissions rates of all trading pairs all at once



#### Parameters

| Name | Type | Description |
|---|---|---|
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |

### updateRate

```solidity
function updateRate(bytes32 _tradePair, uint8 _rate, enum ITradePairs.RateType _rateType) external nonpayable
```

Update maker and taker fee rates for execution



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePair | bytes32 | id of the trading pair |
| _rate | uint8 | fee rate |
| _rateType | enum ITradePairs.RateType | rate type, maker or taker |

### updateRates

```solidity
function updateRates(bytes32 _tradePair, uint8 _makerRate, uint8 _takerRate) external nonpayable
```

Update maker and taker fee rates for execution



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tradePair | bytes32 | id of the trading pair |
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |



## Events

### AuctionMatchFinished

```solidity
event AuctionMatchFinished(bytes32 indexed pair)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| pair `indexed` | bytes32 | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### PortfolioSet

```solidity
event PortfolioSet(contract IPortfolio _oldPortfolio, contract IPortfolio _newPortfolio)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _oldPortfolio  | contract IPortfolio | undefined |
| _newPortfolio  | contract IPortfolio | undefined |

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

### RoleUpdated

```solidity
event RoleUpdated(string indexed name, string actionName, bytes32 updatedRole, address updatedAddress)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| name `indexed` | string | undefined |
| actionName  | string | undefined |
| updatedRole  | bytes32 | undefined |
| updatedAddress  | address | undefined |

### TradePairsSet

```solidity
event TradePairsSet(contract ITradePairs _oldTradePairs, contract ITradePairs _newTradePairs)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _oldTradePairs  | contract ITradePairs | undefined |
| _newTradePairs  | contract ITradePairs | undefined |



