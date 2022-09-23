# PortfolioMain

*&quot;DEXALOT TEAM&quot;*

> &quot;DEXALOT Mainnet Portfolio&quot;



*This contracts prevalidates the portfolioSub checks and allows deposits to be sent to the subnet&quot; ExchangeMain needs to have DEFAULT_ADMIN_ROLE on PortfolioMain*

## Methods

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### PORTFOLIO_BRIDGE_ROLE

```solidity
function PORTFOLIO_BRIDGE_ROLE() external view returns (bytes32)
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

### addExecution

```solidity
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _makerSide | enum ITradePairs.Side | undefined |
| _makerAddr | address | undefined |
| _takerAddr | address | undefined |
| _baseSymbol | bytes32 | undefined |
| _quoteSymbol | bytes32 | undefined |
| _baseAmount | uint256 | undefined |
| _quoteAmount | uint256 | undefined |
| _makerfeeCharged | uint256 | undefined |
| _takerfeeCharged | uint256 | undefined |

### addToken

```solidity
function addToken(bytes32 _symbol, address _tokenaddress, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Adds the given token to the portfolio

*Only callable by adminWe don&#39;t allow tokens with the same symbols but different addressesWe don&#39;t allow any tokens with the same symbol of native*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |
| _tokenaddress | address | Address of the token |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |

### addTrustedContract

```solidity
function addTrustedContract(address _contract, string _organization) external nonpayable
```

Adds the given contract to trusted contracts in order to provide excluded functionality

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | Address of the contract to be added |
| _organization | string | Organization of the contract to be added |

### adjustAvailable

```solidity
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _transaction | enum IPortfolio.Tx | undefined |
| _trader | address | undefined |
| _symbol | bytes32 | undefined |
| _amount | uint256 | undefined |

### allowDeposit

```solidity
function allowDeposit() external view returns (bool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### bridgeFee

```solidity
function bridgeFee(bytes32) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### bridgeFeeCollected

```solidity
function bridgeFeeCollected(bytes32) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### collectBridgeFees

```solidity
function collectBridgeFees(bytes32[] _symbols) external nonpayable
```

Allows the owner to withdraw the fees collected from the bridge

*Collect fees to pay for the bridge as native tokenOnly the owner can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbols | bytes32[] | Array of symbols of tokens to withdraw |

### collectNativeBridgeFees

```solidity
function collectNativeBridgeFees() external nonpayable
```

Allows the owner to withdraw the fees collected in AVAX from the bridge

*Collect fees to pay for the bridge as native tokenOnly the owner can call this function*


### depositNative

```solidity
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address payable | Address of the depositor |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |

### depositToken

```solidity
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to deposit |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |

### depositTokenFromContract

```solidity
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external nonpayable
```

Allows deposits from trusted contracts

*Used by Avalaunch for DD deposits &amp; Vesting Contracts. Keepig for backward compatibility instead of using ON_BEHALF_ROLE*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to deposit |

### enableBridgeProvider

```solidity
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool enable) external nonpayable
```

Enables or disables a bridge provider

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum value of the bridge provider |
| enable | bool | True to enable, false to disable |

### getBridgeSwapAmount

```solidity
function getBridgeSwapAmount(bytes32 _symbol) external view returns (uint256)
```

Returns the bridge swap amount for the given token



#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256  Bridge swap amount |

### getNative

```solidity
function getNative() external view returns (bytes32)
```

Returns the native token of the chain




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | bytes32  Symbol of the native token |

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

### getToken

```solidity
function getToken(bytes32 _symbol) external view returns (contract IERC20Upgradeable)
```

Frontend function to get the ERC20 token



#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | symbol of the token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | IERC20Upgradeable  ERC20 token |

### getTokenDetails

```solidity
function getTokenDetails(bytes32 _symbol) external view returns (address tokenAddress, uint8 decimals, enum ITradePairs.AuctionMode auctionMode)
```

Returns the token details based from the ERC20 contract at the given address

*Will always return actionMode.OFF as auctionMode in controlled in PortfolioSub*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | symbol of the token |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokenAddress | address |  address of the token |
| decimals | uint8 |  decimals of the token |
| auctionMode | enum ITradePairs.AuctionMode |  auctionMode of the token (always OFF) |

### getTokenList

```solidity
function getTokenList() external view returns (bytes32[])
```

Frontend function to get all the tokens in the portfolio




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32[] | bytes32[]  Array of symbols of the tokens |

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
function initialize(bytes32 _native) external nonpayable
```

initializer function for Upgradeable Portfolio

*Grants admin role to msg.sender*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _native | bytes32 | Native token of the network. AVAX in mainnet, ALOT in subnet. |

### isTrustedContract

```solidity
function isTrustedContract(address _contract) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | Address of the contract |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  True if the contract is trusted |

### lzForceResumeReceive

```solidity
function lzForceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external nonpayable
```

Clears the blocking message in the LZ bridge, if any

*Force resume receive action is destructive should be used only when the bridge is stuck and message is already recoveredOnly callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | LZ Chain ID of the source chain |
| _srcAddress | bytes | Address of the source contract |

### lzRecoverPayload

```solidity
function lzRecoverPayload(bytes _payload) external nonpayable
```

Recovers the stucked message from the LZ bridge, returns the funds to the depositor/withdrawer

*Only call this just before calling force resume receive function for the LZ bridgeOnly the owner can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _payload | bytes | Payload of the message |

### lzRetryPayload

```solidity
function lzRetryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external nonpayable
```

Retries the stuck message in the LZ bridge, if any

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | LZ Chain ID of the source chain |
| _srcAddress | bytes | Address of the source contract |
| _payload | bytes | Payload of the stucked message |

### native

```solidity
function native() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### pause

```solidity
function pause() external nonpayable
```

Pauses the contract

*Only callable by admin*


### pauseDeposit

```solidity
function pauseDeposit(bool _pause) external nonpayable
```

(Dis)allows the deposit functionality only

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _pause | bool | True to allow, false to disallow |

### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### portfolioBridge

```solidity
function portfolioBridge() external view returns (contract IPortfolioBridge)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPortfolioBridge | undefined |

### processXFerPayload

```solidity
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external nonpayable
```

Processes the message coming from the bridge

*Only process WITHDRAW messages as it is the only message that can be sent to the portfolio main Even when the contract is paused, this method is allowed for the messages that are in flight to complete properly. Pause for upgrade, then wait to make sure no messages are in fligh then upgrade*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to be withdrawn |
| _transaction | enum IPortfolio.Tx | Transaction type |

### removeToken

```solidity
function removeToken(bytes32 _symbol) external nonpayable
```

Removes the given token from the portfolio

*Only callable by admin and portfolio should be paused. Makes sure there are no in-flight deposit/withdraw messages*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |

### removeTrustedContract

```solidity
function removeTrustedContract(address _contract) external nonpayable
```

Removes the given contract from trusted contracts

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | Address of the contract to be removed |

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
function revokeRole(bytes32 _role, address _address) external nonpayable
```

Revoke access control role wrapper

*Only callable by admin. Can&#39;t revoke itself&#39;s role, can&#39;t remove the only admin.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _role | bytes32 | Role to be revoked |
| _address | address | Address to be revoked |

### setAuctionMode

```solidity
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |
| _mode | enum ITradePairs.AuctionMode | undefined |

### setBridgeFee

```solidity
function setBridgeFee(bytes32 _symbol, uint256 _fee) external nonpayable
```

Sets the bridge provider fee for the given token



#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |

### setBridgeSwapAmount

```solidity
function setBridgeSwapAmount(bytes32 _symbol, uint256 _amount) external nonpayable
```

Sets the bridge swap amount for the given token

*Always set it to equivalent of 1 ALOT. Only callable by admin.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of token to be set |

### setPortfolioBridge

```solidity
function setPortfolioBridge(address _portfolioBridge) external nonpayable
```

Sets the portfolio bridge contract address

*Only callable by admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _portfolioBridge | address | New portfolio bridge contract address |

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

### tokenMap

```solidity
function tokenMap(bytes32) external view returns (contract IERC20Upgradeable)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### trustedContractToIntegrator

```solidity
function trustedContractToIntegrator(address) external view returns (string)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### trustedContracts

```solidity
function trustedContracts(address) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### unpause

```solidity
function unpause() external nonpayable
```

Unpauses the contract

*Only callable by admin*


### updateTransferFeeRate

```solidity
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _rate | uint256 | undefined |
| _rateType | enum IPortfolio.Tx | undefined |

### withdrawNative

```solidity
function withdrawNative(address payable _to, uint256 _quantity) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address payable | undefined |
| _quantity | uint256 | undefined |

### withdrawToken

```solidity
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |
| _3 | enum IPortfolioBridge.BridgeProvider | undefined |



## Events

### AddressSet

```solidity
event AddressSet(string indexed name, string actionName, address oldAddress, address newAddress)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| name `indexed` | string | undefined |
| actionName  | string | undefined |
| oldAddress  | address | undefined |
| newAddress  | address | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### ParameterUpdated

```solidity
event ParameterUpdated(bytes32 indexed pair, string _param, uint256 _oldValue, uint256 _newValue)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| pair `indexed` | bytes32 | undefined |
| _param  | string | undefined |
| _oldValue  | uint256 | undefined |
| _newValue  | uint256 | undefined |

### Paused

```solidity
event Paused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

### PortfolioUpdated

```solidity
event PortfolioUpdated(enum IPortfolio.Tx indexed transaction, address indexed wallet, bytes32 indexed symbol, uint256 quantity, uint256 feeCharged, uint256 total, uint256 available)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| transaction `indexed` | enum IPortfolio.Tx | undefined |
| wallet `indexed` | address | undefined |
| symbol `indexed` | bytes32 | undefined |
| quantity  | uint256 | undefined |
| feeCharged  | uint256 | undefined |
| total  | uint256 | undefined |
| available  | uint256 | undefined |

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

### Unpaused

```solidity
event Unpaused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |


