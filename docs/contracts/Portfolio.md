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
via generic messaging using active bridge transports.

**Dev notes:** \
This contract contains shared logic for PortfolioMain and PortfolioSub.
It is perfectly sufficient for your trading application to interface with only the Dexalot Subnet
and use Dexalot frontend to perform deposit/withdraw operations manually for cross chain bridging.
If your trading application has a business need to deposit/withdraw more often, then your app
will need to integrate with the PortfolioMain contract in the mainnet as well to fully automate
your flow.
Exchange needs to have DEFAULT_ADMIN_ROLE on this contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| TENK | uint256 |
| allowDeposit | bool |
| bridgeParams | mapping(bytes32 &#x3D;&gt; struct IPortfolio.BridgeParams) |
| native | bytes32 |
| portfolioBridge | contract IPortfolioBridge |
| tokenDetailsMap | mapping(bytes32 &#x3D;&gt; struct IPortfolio.TokenDetails) |
| tokenDetailsMapById | mapping(bytes32 &#x3D;&gt; bytes32) |

### Internal

| Name | Type |
| --- | --- |
| chainId | uint32 |
| tokenList | struct EnumerableSetUpgradeable.Bytes32Set |

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

#### removeToken

Removes the given token from the portfolio

**Dev notes:** \
Only callable by admin and portfolio should be paused. Make sure there are no
in-flight deposit/withdraw messages.

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) public virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _srcChainId | uint32 | Source Chain id _srcChainId  Source Chain id is always the mainnet chainid for PortfolioMain |

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

#### setBridgeParam

Sets the bridge provider fee & gasSwapRatio per ALOT for the given token and usedForGasSwap flag

**Dev notes:** \
External function to be called by DEFAULT_ADMIN_ROLE or PORTFOLIO_BRIDGE_ROLE

```solidity:no-line-numbers
function setBridgeParam(bytes32 _symbol, uint256 _fee, uint256 _gasSwapRatio, bool _usedForGasSwap) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT. Always set it to equivalent of 1 ALOT. |
| _usedForGasSwap | bool | bool to control the list of tokens that can be used for gas swap. Mostly majors |

#### addToken

Adds the given token to the portfolio

**Dev notes:** \
Only callable by admin.
We don't allow tokens with the same symbols but different addresses.
Native symbol is also added by default with 0 address.

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |

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
| [0] | struct IPortfolio.TokenDetails | TokenDetails decimals : Identical both in the mainnet and the subnet tokenAddress : Token address at the mainnet , zeroaddress at the subnet symbolId : symbol + chainId native coin : it will always have zeroaddress both in the mainnet and the subnet |

#### getTokenDetailsById

Returns the token details.

```solidity:no-line-numbers
function getTokenDetailsById(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | symbolId of the token. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPortfolio.TokenDetails | TokenDetails  see getTokenDetails |

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

#### processXFerPayload

Processes the XFER message coming from the bridge

**Dev notes:** \
Overridden in the child contracts, as the logic differs.

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

#### depositNative

**Dev notes:** \
Overridden in the child contracts, as the logic differs.

```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address payable | Address of the depositor |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |

### Internal

#### setBridgeParamInternal

Sets the bridge provider fee & gasSwapRatio per ALOT for the given token

**Dev notes:** \
Called by Portfolio.initialize() addTokenInternal

```solidity:no-line-numbers
function setBridgeParamInternal(bytes32 _symbol, uint256 _fee, uint256 _gasSwapRatio, bool _usedForGasSwap) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT. Always set it to equivalent of 1 ALOT. |
| _usedForGasSwap | bool | bool to control the list of tokens that can be used for gas swap. Mostly majors |

#### addTokenInternal

Actual private function that implements the token addition

```solidity:no-line-numbers
function addTokenInternal(bytes32 _symbol, address _tokenAddress, uint32, uint8 _decimals, enum ITradePairs.AuctionMode _mode, uint256, uint256) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
|  | uint32 |  |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token  _fee  Bridge Fee (child implementation)  _gasSwapRatio  Amount of token to swap per ALOT (child implementation) |
|  | uint256 |  |
|  | uint256 |  |

