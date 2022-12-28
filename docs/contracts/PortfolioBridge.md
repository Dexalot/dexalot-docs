---
headerDepth: 4
---

# PortfolioBridge

**PortfolioBridgeMain. Bridge aggregator and message relayer for mainnet using multiple different bridges**

The default bridge provider is LayerZero and it can&#x27;t be disabled. Additional bridge providers
will be added as needed. This contract encapsulates all bridge provider implementations that Portfolio
doesn&#x27;t need to know about. \
This contract does not hold any users funds. it is responsible for paying the bridge fees in form of
the chain’s gas token to 3rd party bridge providers whenever a new cross chain message is sent out by
the user. Hence the project deposit gas tokens to this contract. And the project can withdraw
the gas tokens from this contract whenever it finds it necessary.

**Dev notes:** \
The information flow for messages between PortfolioMain and PortfolioSub is as follows: \
PortfolioMain &#x3D;&gt; PortfolioBridgeMain &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; PortfolioSub \
PortfolioSub &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain &#x3D;&gt; PortfolioMain \
PortfolioBridgeMain also serves as a symbol mapper to support multichain symbol handling.
PortfolioBridgeMain always maps the symbol as SYMBOL + portolio.srcChainId and expects the same back,
i.e USDC43114 if USDC is from Avalanche Mainnet.
It makes use of the PortfolioMain&#x27;s tokenDetailsMap when mapping symbol to symbolId back
and forth as token details can not be different when in the mainnet.
Symbol mapping happens in packXferMessage on the way out. packXferMessage calls getTokenId that has
different implementations in PortfolioBridgeMain &amp; PortfolioBridgeSub. On the receival, the symbol mapping
will happen in different functions, either in processPayload or in getXFerMessage.
We need to raise the XChainXFerMessage before xfer.symbol is mapped in processPayload function so the
incoming and the outgoing xfer messages always contain the symbolId rather than symbol. \
getXFerMessage is called by lzDestroyAndRecoverFunds to handle a stuck message from the LZ bridge,
and to return the funds to the depositor/withdrawer. Hence, getXFerMessage maps the symbolId to symbol.
Use multiple inheritance to add additional bridge implementations in the future. Currently LzApp only.

## Variables

### Public

| Name | Type |
| --- | --- |
| BRIDGE_ADMIN_ROLE | bytes32 |
| PORTFOLIO_ROLE | bytes32 |
| bridgeEnabled | mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; bool) |

### Internal

| Name | Type |
| --- | --- |
| defaultBridgeProvider | enum IPortfolioBridge.BridgeProvider |
| portfolio | contract IPortfolio |

### Private

| Name | Type |
| --- | --- |
| XCHAIN_XFER_MESSAGE_VERSION | uint8 |

## Events

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

### GasForDestinationLzReceiveUpdated

```solidity:no-line-numbers
event GasForDestinationLzReceiveUpdated(uint256 gasForDestinationLzReceive)
```

### DefaultChainIdUpdated

```solidity:no-line-numbers
event DefaultChainIdUpdated(uint32 chainId)
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

#### setPortfolio

Set portfolio address to grant role

**Dev notes:** \
Only admin can set portfolio address.
There is a one to one relationship between Portfolio and PortfolioBridge.

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | Portfolio address |

#### getPortfolio

```solidity:no-line-numbers
function getPortfolio() external view returns (contract IPortfolio)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IPortfolio | IPortfolio  Portfolio contract |

#### setGasForDestinationLzReceive

Set max gas that can be used at the destination chain after message delivery

**Dev notes:** \
Only admin can set gas for destination chain

```solidity:no-line-numbers
function setGasForDestinationLzReceive(uint256 _gas) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gas | uint256 | Gas for destination chain |

#### getTokenList

List of the tokens in the portfolioBridge

```solidity:no-line-numbers
function getTokenList() external view virtual returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of symbols of the tokens |

#### getXFerMessage

Unpacks XFER message from the payload and replaces the symbol with the local symbol

**Dev notes:** \
It is called by lzDestroyAndRecoverFunds to handle a stuck message

```solidity:no-line-numbers
function getXFerMessage(bytes _payload) external view returns (address, bytes32, uint256)
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

#### sendXChainMessage

Wrapper function to send message to destination chain via bridge

**Dev notes:** \
Only PORTFOLIO_ROLE can call

```solidity:no-line-numbers
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |

#### lzRetryPayload

Retries the stuck message in the bridge, if any

**Dev notes:** \
Only BRIDGE_ADMIN_ROLE can call this function
Reverts if there is no storedPayload in the bridge or the supplied payload doesn't match the storedPayload

```solidity:no-line-numbers
function lzRetryPayload(bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload to retry |

#### lzDestroyAndRecoverFunds

This is a destructive, secondary option. Always try lzRetryPayload first.
if this function still fails call LzApp.forceResumeReceive directly with DEFAULT_ADMIN_ROLE as the last resort
Destroys the message that is blocking the bridge and calls portfolio.processXFerPayload
Effectively completing the message trajectory from originating chain to the target chain.
if successful, the funds are processed at the target chain. If not no funds are recovered and
the bridge is still in blocked status and additional messages are queued behind.

**Dev notes:** \
Only recover/process message if forceResumeReceive() successfully completes.
Only the BRIDGE_ADMIN_ROLE can call this function.
If there is no storedpayload (stuck message), this function will revert, _payload parameter will be ignored and
will not be processed. If this function keeps failing due to an error condition after the forceResumeReceive call
then forceResumeReceive(uint16 _srcChainId, bytes calldata _srcAddress) has to be called directly with
DEFAULT_ADMIN_ROLE and the funds will have to be recovered manually

```solidity:no-line-numbers
function lzDestroyAndRecoverFunds(bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload of the message |

#### lzReceive

Receive message from source chain via LayerZero

**Dev notes:** \
Only trusted LZ endpoint can call

```solidity:no-line-numbers
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64, bytes _payload) external
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

#### refundTokens

Refunds the ERC20 balance inside contract

**Dev notes:** \
Only admin can call

```solidity:no-line-numbers
function refundTokens(address[] _tokens) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | address[] | Array of ERC20 tokens to refund |

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

```solidity:no-line-numbers
function getTokenId(bytes32 _symbol) internal view virtual returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
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

```solidity:no-line-numbers
function packXferMessage(struct IPortfolio.XFER _xfer) internal view returns (bytes message)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message to encode |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | bytes | Encoded XFER message |

#### sendXChainMessageInternal

Actual internal function that implements the message sending.

```solidity:no-line-numbers
function sendXChainMessageInternal(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |

#### checkTresholds

Overridden by PortfolioBridgeSub

**Dev notes:** \
Tresholds are not checked in the Mainnet neither for Incoming nor outgoing messages.
But they are checked in the subnet for both.

```solidity:no-line-numbers
function checkTresholds(struct IPortfolio.XFER) internal virtual returns (bool)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True |

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
function incrementOutNonce(enum IPortfolioBridge.BridgeProvider _bridge) private view returns (uint64 nonce)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to increment nonce for. Placeholder for multiple bridge implementation |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| nonce | uint64 | New nonce |

#### lzSend

Send message to destination chain via LayerZero

**Dev notes:** \
Only called by sendXChainMessageInternal that can be called by Portfolio

```solidity:no-line-numbers
function lzSend(bytes _payload) private returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload to send |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Message Fee |

#### unpackMessage

Decodes XChainMsgType from the message

```solidity:no-line-numbers
function unpackMessage(bytes _data) private pure returns (enum IPortfolioBridge.XChainMsgType _xchainMsgType, bytes msgdata)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _data | bytes | Encoded message that has the msg type + msg |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xchainMsgType | enum IPortfolioBridge.XChainMsgType | XChainMsgType. Currently only XChainMsgType.XFER possible |
| msgdata | bytes | Still encoded message data. XFER in our case. Other message types not supported yet. |

#### unpackXFerMessage

Decodes XFER message & updates the receival timestamp

```solidity:no-line-numbers
function unpackXFerMessage(bytes _data) private view returns (struct IPortfolio.XFER xfer)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _data | bytes | XFER message |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| xfer | struct IPortfolio.XFER | Unpacked XFER message |

#### processPayload

Processes message received from source chain via bridge

**Dev notes:** \
if bridge is disabled or PAUSED and there are messages in flight, we still need to
                process them when received at the destination

```solidity:no-line-numbers
function processPayload(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _srcChainId, bytes _payload) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to receive message from |
| _srcChainId | uint32 | Source chain ID |
| _payload | bytes | Payload received |

