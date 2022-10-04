---
headerDepth: 4
---

# Portfolio

**Abstract contract to be inherited in PortfolioMain and PortfolioSub**

Dexalot lives in a dual chain environment. Avalanche Mainnet C-Chain (mainnet) and Avalanche
supported Dexalot Subnet (subnet). Dexalot’s contracts don’t bridge any coins or tokens
between these two chains, but rather lock them in the PortfolioMain contract in the
mainnet and then communicate the users’ holdings to its smart contracts in the subnet for
trading purposes. Dexalot is bridge agnostic. You will be able to deposit with one bridge and
withdraw with another. Having said that, LayerZero is the sole bridge provider at the start.
More bridges can be added in the future as needed.
Because of this novel architecture, a subnet wallet can only house ALOT token and nothing
else. That&#x27;s why the subnet wallet is referred to as the “Gas Tank”. All assets will be
handled inside the PortfolioSub smart contract in the subnet.
PortfolioBridge and PortfolioBridgeSub are bridge aggregators in charge of sending/receiving messages
via generic messaging using ative bridge transports.

**Dev notes:** \
This contract contains shared logic for PortfolioMain and PortfolioSub.
It is perfectly sufficient for your trading application to interface with only the Dexalot Subnet
and use Dexalot frontend to perform deposit/withdraw operations manually for cross chain bridging.
If your trading application has a business need to deposit/withdraw more often, then your app
will need to integrate with the PortfolioMain contract in the mainnet as well to fully automate
your flow.
ExchangeSub needs to have DEFAULT_ADMIN_ROLE on this contract.



## Variables

### Public

| Name | Type |
| --- | --- |
| PBRIDGE_ROLE | bytes32 |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| TENK | uint256 |
| allowDeposit | bool |
| bridgeFee | mapping(bytes32 &#x3D;&gt; uint256) |
| native | bytes32 |
| portfolioBridge | IPortfolioBridge |
| trustedContracts | mapping(address &#x3D;&gt; bool) |
| trustedContractToIntegrator | mapping(address &#x3D;&gt; string) |
| tokenDetailsMap | mapping(bytes32 &#x3D;&gt; struct IPortfolio.TokenDetails) |




## Events

### ParameterUpdated



```solidity:no-line-numbers
event ParameterUpdated(bytes32 pair, string _param, uint256 _oldValue, uint256 _newValue)
```

### AddressSet



```solidity:no-line-numbers
event AddressSet(string name, string actionName, address oldAddress, address newAddress)
```

### RoleUpdated



```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```




## Methods

### Public

#### initialize

initializer function for Upgradeable Portfolio

**Dev notes:** \
Grants admin role to msg.sender

```solidity:no-line-numbers
function initialize(bytes32 _native, uint32 _chainId) public virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _native | bytes32 | Native token of the network. AVAX in mainnet, ALOT in subnet. |
| _chainId | uint32 |  |


#### revokeRole

Revoke access control role wrapper

**Dev notes:** \
Only callable by admin. Can't revoke itself's role, can't remove the only admin.

```solidity:no-line-numbers
function revokeRole(bytes32 _role, address _address) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _role | bytes32 | Role to be revoked |
| _address | address | Address to be revoked |


#### addToken

Adds the given token to the portfolio

**Dev notes:** \
Only callable by admin.
We don't allow tokens with the same symbols but different addresses.
Native symbol is also added by default with 0 address.

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) public virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |


#### removeToken

Removes the given token from the portfolio

**Dev notes:** \
Only callable by admin and portfolio should be paused. Makes sure there are no
in-flight deposit/withdraw messages

```solidity:no-line-numbers
function removeToken(bytes32 _symbol) public virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |



### External

#### setPortfolioBridge

Sets the portfolio bridge contract address

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function setPortfolioBridge(address _portfolioBridge) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridge | address | New portfolio bridge contract address |


#### enableBridgeProvider

Enables or disables a bridge provider

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool _enable) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum value of the bridge provider |
| _enable | bool | True to enable, false to disable |


#### lzForceResumeReceive

Clears the blocking message in the LZ bridge, if any

**Dev notes:** \
Force resume receive action is destructive
should be used only when the bridge is stuck and message is already recovered
   Only callable by admin

```solidity:no-line-numbers
function lzForceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | LZ Chain ID of the source chain |
| _srcAddress | bytes | Address of the source contract |


#### lzRetryPayload

Retries the stuck message in the LZ bridge, if any

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function lzRetryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | LZ Chain ID of the source chain |
| _srcAddress | bytes | Address of the source contract |
| _payload | bytes | Payload of the stucked message |


#### lzRecoverPayload

Recovers the stuck message in the LZ bridge, if any

**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function lzRecoverPayload(bytes _payload) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload of the stucked message |


#### processXFerPayload

Processes the XFER message coming from the bridge

**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _transaction | enum IPortfolio.Tx | Transaction type Enum |


#### getNative

Returns the native token of the chain


```solidity:no-line-numbers
function getNative() external view returns (bytes32)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  Symbol of the native token |

#### getChainId

Returns the native token of the chain


```solidity:no-line-numbers
function getChainId() external view returns (uint32)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | bytes32  Symbol of the native token |

#### pause

Pauses the portfolioBridge AND the contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function pause() external
```


#### unpause

Unpauses portfolioBridge AND the contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function unpause() external
```


#### pauseDeposit

(Dis)allows the deposit functionality only

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function pauseDeposit(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | True to allow, false to disallow |


#### setBridgeFee

Sets the bridge provider fee for the given token


```solidity:no-line-numbers
function setBridgeFee(bytes32 _symbol, uint256 _fee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |


#### addTrustedContract

Adds the given contract to trusted contracts in order to provide excluded functionality

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function addTrustedContract(address _contract, string _organization) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be added |
| _organization | string | Organization of the contract to be added |


#### isTrustedContract



```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the contract is trusted |

#### removeTrustedContract

Removes the given contract from trusted contracts

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be removed |


#### getBridgeSwapAmount

Returns the bridge swap amount for the given token


```solidity:no-line-numbers
function getBridgeSwapAmount(bytes32 _symbol) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Bridge swap amount |

#### setBridgeSwapAmount

Sets the bridge swap amount for the given token

**Dev notes:** \
Always set it to equivalent of 1 ALOT. Only callable by admin.

```solidity:no-line-numbers
function setBridgeSwapAmount(bytes32 _symbol, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of token to be set |


#### getToken

Frontend function to get the IERC20 token


```solidity:no-line-numbers
function getToken(bytes32 _symbol) external view virtual returns (contract IERC20Upgradeable)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IERC20Upgradeable | IERC20Upgradeable  IERC20 token |

#### getTokenList

Frontend function to get all the tokens in the portfolio


```solidity:no-line-numbers
function getTokenList() external view returns (bytes32[])
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of symbols of the tokens |

#### getTokenDetails

Returns the token details.

**Dev notes:** \
Subnet does not have any ERC20s, hence the tokenAddress is token's mainnet address.
See the TokenDetails struct in IPortfolio for the full type information of the return variable.

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbol) external view returns (struct IPortfolio.TokenDetails)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token. Identical to mainnet |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPortfolio.TokenDetails | TokenDetails decimals (Identical to mainnet), tokenAddress (Token address at the mainnet) |

#### fallback


**Dev notes:** \
we revert transaction if a non-existing function is called

```solidity:no-line-numbers
fallback() external payable
```


#### receive

Receive function for direct send of native tokens
 @dev we process it as a deposit with the default bridge


```solidity:no-line-numbers
receive() external payable
```


#### updateTransferFeeRate

Updates the transfer fee rate


```solidity:no-line-numbers
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rate | uint256 | New transfer fee rate |
| _rateType | enum IPortfolio.Tx | Enum for transfer type |


#### setAuctionMode

Sets the auction mode for the token

**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _mode | enum ITradePairs.AuctionMode | New auction mode to be set |


#### depositNative


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address payable | Address of the depositor |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |


#### withdrawNative


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function withdrawNative(address payable _to, uint256 _quantity) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address payable | Address of the withdrawer |
| _quantity | uint256 | Amount to be withdrawn |


#### depositToken


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount to be deposited |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |


#### depositTokenFromContract


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount to be deposited |


#### withdrawToken


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the withdrawer |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount to be withdrawn |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |


#### adjustAvailable


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transaction | enum IPortfolio.Tx | Enum for transaction type |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount to be adjusted |


#### addExecution


**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerSide | enum ITradePairs.Side | Side of the maker |
| _makerAddr | address | Address of the maker |
| _takerAddr | address | Address of the taker |
| _baseSymbol | bytes32 | Symbol of the base token |
| _quoteSymbol | bytes32 | Symbol of the quote token |
| _baseAmount | uint256 | Amount of base token |
| _quoteAmount | uint256 | Amount of quote token |
| _makerfeeCharged | uint256 | Fee charged to the maker |
| _takerfeeCharged | uint256 | Fee charged to the taker |



### Internal

#### getXFer

Parses XFER message coming from the bridge


```solidity:no-line-numbers
function getXFer(bytes _payload) internal view returns (address, bytes32, uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload passed from the bridge |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address  Address of the trader |
| [1] | bytes32 | bytes32  Symbol of the token |
| [2] | uint256 | uint256  Amount of the token |

#### addIERC20

Function to add IERC20 token to the portfolio

**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function addIERC20(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenaddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain Id |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |


#### removeIERC20

Function to remove IERC20 token from the portfolio

**Dev notes:** \
Implemented in the child contract, as the logic differs.

```solidity:no-line-numbers
function removeIERC20(bytes32 _symbol) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |


#### getIdForToken



```solidity:no-line-numbers
function getIdForToken(bytes32 _symbol) internal view returns (bytes32 symbolId)
```


#### depositTokenChecks

Checks if the deposit is valid


```solidity:no-line-numbers
function depositTokenChecks(uint256 _quantity) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _quantity | uint256 | Amount to be deposited |



### Private

#### addTokenInternal

Actual private function that implements the token addition


```solidity:no-line-numbers
function addTokenInternal(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |


