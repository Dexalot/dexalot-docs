# PortfolioSub



> Subnet Portfolio

Receives messages from mainnet for deposits and sends withdraw requests to mainnet.  It also transfers tokens between traders as their orders gets matched.

*Allows one to withdraw and deposit native token from/to the subnet wallet. Any other token has be be           deposited via PortfolioBridge using processXFerPayload function. It can only be invoked by a bridge           provider&#39;s message receive event.           Any other token token including ALOT (native) can be withdrawn to mainnet using withdrawToken that will           send the holdings back to the user&#39;s wallet in the mainnet.           TradePairs needs to have EXECUTOR_ROLE on PortfolioSub contract.           If a trader deposits a token and has 0 ALOT in his subnet wallet, this contract will make a call           to GasStation to deposit a small amount of ALOT to the user&#39;s wallet to be used for gas.           In return, It will deduct a tiny amount of the token transferred.*

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

### PBRIDGE_ROLE

```solidity
function PBRIDGE_ROLE() external view returns (bytes32)
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

Function for TradePairs to transfer tokens between addresses as a result of an execution

*WHEN Increasing in addExectuion the amount is applied to both Total &amp; Available (so SafeIncrease can be used) as opposed to WHEN Decreasing in addExectuion the amount is only applied to Total. (SafeDecrease can NOT be used, so we have safeDecreaseTotal instead) i.e. (USDT 100 Total, 50 Available after we send a BUY order of 10 avax at 5$. Partial Exec 5 at $5. Total goes down to 75. Available stays at 50)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _makerSide | enum ITradePairs.Side | Side of the maker |
| _makerAddr | address | Address of the maker |
| _takerAddr | address | Address of the taker |
| _baseSymbol | bytes32 | Symbol of the base token |
| _quoteSymbol | bytes32 | Symbol of the quote token |
| _baseAmount | uint256 | Amount of the base token |
| _quoteAmount | uint256 | Amount of the quote token |
| _makerfeeCharged | uint256 | Fee charged to the maker |
| _takerfeeCharged | uint256 | Fee charged to the taker |

### addToken

```solidity
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external nonpayable
```

Adds the given token to the portfolioSub with 0 address in the subnet.

*Only callable by adminWe don&#39;t allow tokens with the same symbols.Native symbol is also added as a token with 0 addressPortfolioSub keeps track of total deposited tokens in tokenTotals for sanity checks against mainnet          It has no ERC20 Contracts hence, it overwtires the addresses with address(0).          But PortfolioBridgeSub keeps all the symbols added from all different mainnet chains separately with          their original details including the addresses          except AVAX which passed with address(0).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id, overwritten by srcChain of Portolio.           it will only be used by PortfolioBridgeSub |
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

Function for TradePairs to adjust total &amp; available as a result of an order update



#### Parameters

| Name | Type | Description |
|---|---|---|
| _transaction | enum IPortfolio.Tx | Transaction type |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |

### allowDeposit

```solidity
function allowDeposit() external view returns (bool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### assets

```solidity
function assets(address, bytes32) external view returns (uint256 total, uint256 available)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| total | uint256 | undefined |
| available | uint256 | undefined |

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

### depositFeeRate

```solidity
function depositFeeRate() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### depositNative

```solidity
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider) external payable
```

This function is only used to deposit native ALOT from the subnet wallet



#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address payable | Address of the depositor |
| _1 | enum IPortfolioBridge.BridgeProvider | undefined |

### depositToken

```solidity
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider) external nonpayable
```



*Only valid for the mainnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |
| _3 | enum IPortfolioBridge.BridgeProvider | undefined |

### depositTokenFromContract

```solidity
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external nonpayable
```



*Only valid for the mainnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |

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

### feeAddress

```solidity
function feeAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getBalance

```solidity
function getBalance(address _owner, bytes32 _symbol) external view returns (uint256 total, uint256 available, enum PortfolioSub.AssetType assetType)
```

Frontend function to show traders total and available balance for a token



#### Parameters

| Name | Type | Description |
|---|---|---|
| _owner | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |

#### Returns

| Name | Type | Description |
|---|---|---|
| total | uint256 |  Total balance of the trader |
| available | uint256 |  Available balance of the trader |
| assetType | enum PortfolioSub.AssetType |  Type of the token |

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

### getChainId

```solidity
function getChainId() external view returns (uint32)
```

Returns the native token of the chain




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | bytes32  Symbol of the native token |

### getGasStation

```solidity
function getGasStation() external view returns (contract IGasStation)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IGasStation | IGasStation  Gas station contract |

### getNative

```solidity
function getNative() external view returns (bytes32)
```

Returns the native token of the chain




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | bytes32  Symbol of the native token |

### getPortfolioMinter

```solidity
function getPortfolioMinter() external view returns (contract IPortfolioMinter)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPortfolioMinter | IPortfolioMinter  Portfolio minter contract |

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



*Only valid for the mainnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### getTokenDetails

```solidity
function getTokenDetails(bytes32 _symbol) external view returns (struct IPortfolio.TokenDetails)
```

Returns the token details.

*Will always return actionMode.OFF as auctionMode in controlled in PortfolioSub*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token. Identical to mainnet |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IPortfolio.TokenDetails | TokenDetails decimals (Identical to mainnet), tokenAddress (Token address at the mainnet) Subnet does not have any ERC20s hence this tokenAddress is address(0) Auction mode of the token , Source Chain id, symbol and symbolId |

### getTokenList

```solidity
function getTokenList() external view returns (bytes32[])
```

Frontend function to get all the tokens in the portfolio




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32[] | bytes32[]  Array of symbols of the tokens |

### getTreasury

```solidity
function getTreasury() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | address  Address of the treasury wallet |

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
function initialize(bytes32 _native, uint32 _chainId) external nonpayable
```

Initializer for upgradeable Portfolio Sub

*Initializes with the native deposit threshold, users can deposit ALOT if they at least have 0.05 ALOT.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _native | bytes32 | Native token of the chain |
| _chainId | uint32 | undefined |

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

*Only call this just before calling force resume receive function for the LZ bridge          Only the DEFAULT_ADMIN can call this function*

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

Pauses the portfolioBridge AND the contract

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

*DEPOSIT messages are the only message that can be sent to the portfolio sub for the moment Even when the contract is paused, this method is allowed for the messages that are in flight to complete properly. CAUTION: if Paused for upgrade, wait to make sure no messages are in fligh then upgrade.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _transaction | enum IPortfolio.Tx | Transaction type |

### removeToken

```solidity
function removeToken(bytes32 _symbol) external nonpayable
```

Remove IERC20 token from the tokenMap

*tokenTotals for the symbol should be 0 before it can be removed Make sure that there are no in-flight deposit messages*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | symbol of the token |

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

Set auction mode for a token

*Only callable by the default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | Symbol of the token |
| _mode | enum ITradePairs.AuctionMode | New auction mode |

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

### setFeeAddress

```solidity
function setFeeAddress(address _feeAddress) external nonpayable
```



*Only callable by the owner*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _feeAddress | address | Address to collect trading fees |

### setGasStation

```solidity
function setGasStation(contract IGasStation _gasStation) external nonpayable
```

Sets the gas station contract

*Only admin can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _gasStation | contract IGasStation | Gas station contract to be set |

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

### setPortfolioMinter

```solidity
function setPortfolioMinter(contract IPortfolioMinter _portfolioMinter) external nonpayable
```

Sets the portfolio minter contract

*Only admin can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _portfolioMinter | contract IPortfolioMinter | Portfolio minter contract to be set |

### setTreasury

```solidity
function setTreasury(address _treasury) external nonpayable
```

Sets the treasury wallet

*Only admin can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _treasury | address | Address of the treasury wallet |

### setWalletBalanceDepositThreshold

```solidity
function setWalletBalanceDepositThreshold(uint256 _amount) external nonpayable
```

Sets wallet balance deposit thresholds

*This threshold checks the users remaining native balance while depositing native from subnet wallet.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _amount | uint256 | Amount of native token to be set as threshold |

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

### tokenDetailsMap

```solidity
function tokenDetailsMap(bytes32) external view returns (uint8 decimals, address tokenAddress, enum ITradePairs.AuctionMode auctionMode, uint32 srcChainId, bytes32 symbol, bytes32 symbolId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| decimals | uint8 | undefined |
| tokenAddress | address | undefined |
| auctionMode | enum ITradePairs.AuctionMode | undefined |
| srcChainId | uint32 | undefined |
| symbol | bytes32 | undefined |
| symbolId | bytes32 | undefined |

### tokenTotals

```solidity
function tokenTotals(bytes32) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalNativeBurned

```solidity
function totalNativeBurned() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferToken

```solidity
function transferToken(address _to, bytes32 _symbol, uint256 _quantity) external nonpayable
```

Transfers token from the sender&#39;s portfolio to _to&#39;s portfolio

*This is not a ERC20 transfer, this is a balance transfer between portfolios*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address | Address of the receiver |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |

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

Unpauses portfolioBridge AND the contract

*Only callable by admin*


### updateTransferFeeRate

```solidity
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external nonpayable
```

Updates the transfer fee rate for the given Tx type

*Only admin can call this function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _rate | uint256 | Transfer fee rate to be set |
| _rateType | enum IPortfolio.Tx | Tx type for which the transfer fee rate is to be set |

### walletBalanceDepositThreshold

```solidity
function walletBalanceDepositThreshold() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### withdrawFeeRate

```solidity
function withdrawFeeRate() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### withdrawFees

```solidity
function withdrawFees() external nonpayable
```

Withdraws collected fees to the mainnet

*Only admin can call this function*


### withdrawNative

```solidity
function withdrawNative(address payable _to, uint256 _quantity) external nonpayable
```

This function is used to withdraw only native ALOT to the subnet wallet

*This function decreases ALOT balance of the user and calls the PortfolioMinter to mint the native ALOT*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address payable | Address of the withdrawer |
| _quantity | uint256 | Amount of the native ALOT to withdraw |

### withdrawToken

```solidity
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external nonpayable
```

Withdraws the token to the mainnet



#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address | Address of the withdrawer |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum bridge type |



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



