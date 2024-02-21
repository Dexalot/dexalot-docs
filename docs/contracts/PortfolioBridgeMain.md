---
headerDepth: 4
---

# PortfolioBridgeMain

**PortfolioBridgeMain. Bridge aggregator and message relayer for mainnet using multiple different bridges**

The default bridge provider is LayerZero and it can&#x27;t be disabled. Additional bridge providers
will be added as needed. This contract encapsulates all bridge provider implementations that Portfolio
doesn&#x27;t need to know about. \
This contract does not hold any users funds. it is responsible for paying the bridge fees in form of
the chain’s gas token to 3rd party bridge providers whenever a new cross chain message is sent out by
the user. Hence the project deposit gas tokens to this contract. And the project can withdraw
the gas tokens from this contract whenever it finds it necessary.

**Dev notes:** \
PortfolioBridgeSub &amp; PortfolioSub are Dexalot Subnet contracts and they can&#x27;t be deployed anywhere else.
Contracts with *Main* in their name can be deployed to any evm compatible blockchain.
Here are the potential flows:
DEPOSITS: \
PortfolioMain(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; PortfolioSub \
PortfolioMain(Arb) &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; PortfolioSub \
PortfolioMain(Gun) &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; PortfolioSub \
WITHDRAWALS (reverse flows): \
PortfolioSub &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; PortfolioMain(Avax) \
PortfolioSub &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; PortfolioMain(Arb) \
PortfolioSub &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; PortfolioMain(Gun) \

In addition, to be able to support cross chain trades for subnets like Gunzilla that only has their gas token
and no ERC20 available, we introduced a new flow where you provide the counter token in an L1 and receive your GUN
in Gunzilla network. Similarly you can sell your GUN in Gunzilla network and receive your counter token in the L1.
MainnetRFQ(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; MainnetRFQ(Gun) \
Buy GUN from Avalanche with counter token USDC. USDC is kept in MainnetRFQ(Avax) and GUN is deposited to the buyer&#x27;s
wallet via MainnetRFQ(Gun)
MainnetRFQ(Gun) &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain(Avax)  &#x3D;&gt; MainnetRFQ(Avax) \
Sell GUN from Gunzilla with counter token USDC. GUN is kept in MainnetRFQ(Gun) and USDC is deposited to the buyer&#x27;s
wallet via MainnetRFQ(Avax)
The same flow can be replicated with any other L1 like Arb as well. \

PortfolioBridgeMain also serves as a symbol mapper to support multichain symbol handling.
PortfolioBridgeMain always maps the symbol as SYMBOL + portolio.srcChainId and expects the same back,
i.e USDC43114 if USDC is from Avalanche Mainnet.
It makes use of the PortfolioMain&#x27;s tokenDetailsMap when mapping symbol to symbolId back
and forth as token details can not be different when in the mainnet.
Symbol mapping happens in packXferMessage on the way out. packXferMessage calls getTokenId that has
different implementations in PortfolioBridgeMain &amp; PortfolioBridgeSub. On the receival, the symbol
mapping will happen in processPayload. getSymbolForId is called by getXFerMessage and it returns the
Xfer Message as is but also returns the reverse mapped local symbol. \
We need to raise the XChainXFerMessage &amp; update the inventory with the symbolId so the
incoming and the outgoing xfer messages always contain the symbolId rather than symbol and then processPayload
can use the local symbol when calling portfolio methods \
getXFerMessage is also called by lzDestroyAndRecoverFunds to handle a stuck message from the LZ bridge,
and to return the funds to the depositor/withdrawer.
Use multiple inheritance to add additional bridge implementations in the future. Currently LzApp only.

## Variables

### Public

| Name | Type |
| --- | --- |
| BRIDGE_USER_ROLE | bytes32 |
| BRIDGE_ADMIN_ROLE | bytes32 |
| bridgeEnabled | mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; bool) |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[50] |
| defaultBridgeProvider | enum IPortfolioBridge.BridgeProvider |
| lzDestinationMap | mapping(uint32 &#x3D;&gt; uint16) |
| mainnetRfq | contract IMainnetRFQ |
| portfolio | contract IPortfolio |

### Private

| Name | Type |
| --- | --- |
| DEFAULT_PAYLOAD | bytes |
| XCHAIN_XFER_MESSAGE_VERSION | uint8 |

## Events

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

### DefaultChainIdUpdated

```solidity:no-line-numbers
event DefaultChainIdUpdated(enum IPortfolioBridge.BridgeProvider bridge, uint32 destinationLzChainId)
```

### GasForDestinationLzReceiveUpdated

```solidity:no-line-numbers
event GasForDestinationLzReceiveUpdated(enum IPortfolioBridge.BridgeProvider bridge, uint32 destinationChainId, uint256 gasForDestination)
```

### UserPaysFeeForDestinationUpdated

```solidity:no-line-numbers
event UserPaysFeeForDestinationUpdated(enum IPortfolioBridge.BridgeProvider bridge, uint32 destinationChainId, bool userPaysFee)
```

## Methods

### Public

#### VERSION

```solidity:no-line-numbers
function VERSION() public pure virtual returns (bytes32)
```

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grant admin, pauser and msg_sender role to the sender. Set gas for lz. Set endpoint and enable bridge

```solidity:no-line-numbers
function initialize(address _endpoint) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _endpoint | address | Endpoint of the LZ bridge |

#### revokeRole

Wrapper for revoking roles

**Dev notes:** \
Only admin can revoke role. BRIDGE_ADMIN_ROLE will remove additional roles to the parent contract(s)
Currently LZ_BRIDGE_ADMIN_ROLE is removed from the LzApp

```solidity:no-line-numbers
function revokeRole(bytes32 _role, address _address) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _role | bytes32 | Role to revoke |
| _address | address | Address to revoke role from |

### External

#### pause

Pauses bridge operations

**Dev notes:** \
Only pauser can pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

Unpauses bridge operations

**Dev notes:** \
Only pauser can unpause

```solidity:no-line-numbers
function unpause() external
```

#### enableBridgeProvider

Enables/disables given bridge. Default bridge's state can't be modified

**Dev notes:** \
Only admin can enable/disable bridge

```solidity:no-line-numbers
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool _enable) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to enable/disable |
| _enable | bool | True to enable, false to disable |

#### isBridgeProviderEnabled

```solidity:no-line-numbers
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if bridge is enabled, false otherwise |

#### getDefaultBridgeProvider

Returns default bridge Provider

```solidity:no-line-numbers
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IPortfolioBridge.BridgeProvider | BridgeProvider |

#### setDefaultBridgeProvider

Sets the default bridge Provider

```solidity:no-line-numbers
function setDefaultBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |

#### getDefaultDestinationChain

Returns Default Lz Destination chain

```solidity:no-line-numbers
function getDefaultDestinationChain() external view returns (uint32 chainListOrgChainId)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainListOrgChainId | uint32 | Default Destination Chainlist.org Chain Id |

#### setTrustedRemoteAddress

Sets trusted remote address for the cross-chain communication. It also sets the defaultLzDestination
if it is not setup yet.

**Dev notes:** \
Allow DEFAULT_ADMIN to set it multiple times.

```solidity:no-line-numbers
function setTrustedRemoteAddress(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainIdBridgeAssigned, bytes _remoteAddress, uint32 _chainListOrgChainId, uint256 _gasForDestination, bool _userPaysFee) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _dstChainIdBridgeAssigned | uint32 | Remote chain id |
| _remoteAddress | bytes | Remote contract address |
| _chainListOrgChainId | uint32 | Remote Chainlist.org chainid |
| _gasForDestination | uint256 | max gas that can be used at the destination chain after message delivery |
| _userPaysFee | bool |  |

#### setDefaultDestinationChain

Sets default destination (remote) address for the cross-chain communication

**Dev notes:** \
Allow DEFAULT_ADMIN to set it multiple times. For PortfolioBridgeSub it is avalanche C-Chain
For other blockchains it is Dexalot Subnet

```solidity:no-line-numbers
function setDefaultDestinationChain(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainIdBridgeAssigned) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _dstChainIdBridgeAssigned | uint32 | Remote chain id assigned by the Bridge (lz) |

#### setGasForDestination

Set max gas that can be used at the destination chain after message delivery

**Dev notes:** \
Only admin can set gas for destination chain

```solidity:no-line-numbers
function setGasForDestination(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainIdBridgeAssigned, uint256 _gas) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _dstChainIdBridgeAssigned | uint32 | Remote chain id assigned by the Bridge (lz) |
| _gas | uint256 | Gas for destination chain |

#### setUserPaysFeeForDestination

Set whether a user must pay the brigde fee for message delivery at the destination chain

**Dev notes:** \
Only admin can set user pays fee for destination chain

```solidity:no-line-numbers
function setUserPaysFeeForDestination(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainIdBridgeAssigned, bool _userPaysFee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _dstChainIdBridgeAssigned | uint32 | Remote chain id assigned by the Bridge (lz) |
| _userPaysFee | bool | True if user must pay the bridge fee, false otherwise |

#### setPortfolio

Set portfolio address to grant role

**Dev notes:** \
Only admin can set portfolio address.
There is a one to one relationship between Portfolio and PortfolioBridgeMain.

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | Portfolio address |

#### setMainnetRFQ

Set MainnetRFQ address and grant role

**Dev notes:** \
Only admin can set MainnetRFQ address.
There is a one to one relationship between MainnetRFQ and PortfolioBridgeMain.

```solidity:no-line-numbers
function setMainnetRFQ(address payable _mainnetRfq) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mainnetRfq | address payable | MainnetRFQ address |

#### setBridgeParam

Sets the bridge provider fee & gasSwapRatio per ALOT for the given token and usedForGasSwap flag

**Dev notes:** \
External function to be called by BRIDGE_ADMIN_ROLE

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

#### getPortfolio

```solidity:no-line-numbers
function getPortfolio() external view returns (contract IPortfolio)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IPortfolio | IPortfolio  Portfolio contract |

#### getMainnetRfq

```solidity:no-line-numbers
function getMainnetRfq() external view returns (contract IMainnetRFQ)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IMainnetRFQ | IMainnetRFQ  MainnetRFQ contract |

#### getTokenList

List of the tokens in the PortfolioBridgeMain

```solidity:no-line-numbers
function getTokenList() external view virtual returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of symbols of the tokens |

#### getBridgeFee

Returns the bridgeFee charged by the bridge for the targetChainId.

**Dev notes:** \
The fee is in terms of current chain's gas token.
LZ charges based on the payload size and gas px at

```solidity:no-line-numbers
function getBridgeFee(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes32, uint256) external view virtual returns (uint256 bridgeFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _dstChainListOrgChainId | uint32 | destination chain id           _symbol  symbol of the token, not relevant in for this function           _quantity quantity of the token, not relevant in for this function |
|  | bytes32 |  |
|  | uint256 |  |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgeFee | uint256 | bridge fee for the destination |

#### getXFerMessage

Unpacks XChainMsgType & XFER message from the payload and returns the local symbol using symbolId

**Dev notes:** \
It is called by lzDestroyAndRecoverFunds to handle a stuck message & by processPaylod
Currently only XChainMsgType.XFER possible. For more details on payload packing see packXferMessage

```solidity:no-line-numbers
function getXFerMessage(bytes _payload) external view returns (struct IPortfolio.XFER, bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload passed from the bridge |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPortfolio.XFER | IPortfolio.XFER  Xfer Message |
| [1] | bytes32 | bytes32  Local Symbol of the token |

#### sendXChainMessage

Wrapper function to send message to destination chain via bridge

**Dev notes:** \
Only BRIDGE_USER_ROLE can call (PortfolioMain or MainnetRFQ)

```solidity:no-line-numbers
function sendXChainMessage(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) external payable virtual returns (uint256 messageFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address | Address of the user who pays the bridge fee |

#### lzRetryPayload

Retries the stuck message in the bridge, if any

**Dev notes:** \
Only BRIDGE_ADMIN_ROLE can call this function
Reverts if there is no storedPayload in the bridge or the supplied payload doesn't match the storedPayload

```solidity:no-line-numbers
function lzRetryPayload(uint16 _srcChainId, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _payload | bytes | Payload to retry |

#### lzDestroyAndRecoverFunds

This is a destructive, secondary option. Always try lzRetryPayload first.
if this function still fails call LzApp.forceResumeReceive directly with DEFAULT_ADMIN_ROLE as the last resort
Destroys the message that is blocking the bridge and calls processPayload
Effectively completing the message trajectory from originating chain to the target chain.
if successful, the funds are processed at the target chain. If not, no funds are recovered and
the bridge is still in blocked status and additional messages are queued behind.

**Dev notes:** \
Only recover/process message if forceResumeReceive() successfully completes.
Only the BRIDGE_ADMIN_ROLE can call this function.
If there is no storedpayload (stuck message), this function will revert, _payload parameter will be ignored and
will not be processed. If this function keeps failing due to an error condition after the forceResumeReceive call
then forceResumeReceive(uint16 _srcChainId, bytes calldata _srcAddress) has to be called directly with
DEFAULT_ADMIN_ROLE and the funds will have to be recovered manually

```solidity:no-line-numbers
function lzDestroyAndRecoverFunds(uint16 _srcChainId, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _payload | bytes | Payload of the message |

#### lzReceive

Receive message from source chain via LayerZero

**Dev notes:** \
Only trusted LZ endpoint can call

```solidity:no-line-numbers
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64, bytes _payload) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain ID |
| _srcAddress | bytes | Source address |
|  | uint64 |  |
| _payload | bytes | Payload received |

#### refundNative

Refunds the native balance inside contract

**Dev notes:** \
Only admin can call

```solidity:no-line-numbers
function refundNative() external
```

#### receive

```solidity:no-line-numbers
receive() external payable
```

#### fallback

```solidity:no-line-numbers
fallback() external payable
```

### Internal

#### getTokenId

Returns the symbolId used in the mainnet given the srcChainId

**Dev notes:** \
It uses PortfolioMain's token list to get the symbolId,
On the other hand, PortfolioBridgeSub uses its internal list & the defaultTargetChain
When sending from Mainnet to Subnet we send out the symbolId of the sourceChain. USDC => USDC1337
When receiving messages back it expects the same symbolId if USDC1337 sent, USDC1337 to receive
Because the subnet needs to know about different ids from different mainnets.
param   _dstChainListOrgChainId lz destination chain id only relevant in the overriding function PortfolioBridgeSub

```solidity:no-line-numbers
function getTokenId(uint32, bytes32 _symbol) internal view virtual returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|  | uint32 |  |
| _symbol | bytes32 | symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId |

#### getSymbolForId

Returns the locally used symbol given the symbolId

**Dev notes:** \
Mainnet receives the messages in the same format that it sent out, by symbolId

```solidity:no-line-numbers
function getSymbolForId(bytes32 _symbolId) internal view virtual returns (bytes32)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId |

#### packXferMessage

Maps symbol to symbolId and encodes XFER message

**Dev notes:** \
It is packed as follows:
slot0: trader(20), nonce(8), transaction(2), XChainMsgType(2)
slot1: symbol(32)
slot2: quantity(32)
slot3: customdata(28), timestamp(4)

```solidity:no-line-numbers
function packXferMessage(uint32 _dstChainListOrgChainId, struct IPortfolio.XFER _xfer) internal view returns (bytes message)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _xfer | struct IPortfolio.XFER | XFER message to encode |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | bytes | Encoded XFER message |

#### sendXChainMessageInternal

Actual internal function that implements the message sending.

```solidity:no-line-numbers
function sendXChainMessageInternal(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) internal returns (uint256 messageFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address | Address of the user who pays the bridge fee, zero address for PortfolioBridge |

#### updateInventoryBySource

Overridden by PortfolioBridgeSub

**Dev notes:** \
Update the inventory by each chain only in the Subnet.
Inventory in the host chains are already known and don't need to be calculated

```solidity:no-line-numbers
function updateInventoryBySource(struct IPortfolio.XFER) internal virtual
```

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() internal virtual
```

### Private

#### incrementOutNonce

Increments bridge nonce

**Dev notes:** \
Only portfolio can call

```solidity:no-line-numbers
function incrementOutNonce(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainIdBridgeAssigned) private view returns (uint64 nonce)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to increment nonce for. Placeholder for multiple bridge implementation |
| _dstChainIdBridgeAssigned | uint32 | the destination chain identifier |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| nonce | uint64 | New nonce |

#### _lzSend

Send message to destination chain via LayerZero

**Dev notes:** \
Only called by sendXChainMessageInternal that can be called by Portfolio

```solidity:no-line-numbers
function _lzSend(uint16 _dstLzChainId, bytes _payload, address _userFeePayer) private returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstLzChainId | uint16 | Lz destination chain identifier |
| _payload | bytes | Payload to send |
| _userFeePayer | address | Address of the user who pays the bridge fee, zero address for PortfolioBridge |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Message Fee |

#### processPayload

Processes message received from source chain via bridge

**Dev notes:** \
if bridge is disabled or PAUSED and there are messages in flight, we still need to
                process them when received at the destination. This also updates the receival timestamp

```solidity:no-line-numbers
function processPayload(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _srcChainListOrgChainId, bytes _payload) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to receive message from |
| _srcChainListOrgChainId | uint32 | Source chain ID |
| _payload | bytes | Payload received |

