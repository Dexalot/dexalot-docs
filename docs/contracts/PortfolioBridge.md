---
headerDepth: 4
---

# PortfolioBridge

**Bridge aggregator and message relayer for multiple different bridges**

The default bridge provider is LayerZero and it can&#x27;t be disabled. Additional bridge providers
will be added as needed. This contract encapsulates all bridge provider implementations that Portfolio
doesn&#x27;t need to know about.

**Dev notes:** \
The information flow for messages between PortfolioMain and PortfolioSub is as follows: \
PortfolioMain &#x3D;&gt; PortfolioBridgeMain &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; PortfolioSub \
PortfolioSub &#x3D;&gt; PortfolioBridgeSub &#x3D;&gt; BridgeProviderA/B/n &#x3D;&gt; PortfolioBridgeMain &#x3D;&gt; PortfolioMain \
PortfolioBridge also serves as a symbol mapper to support multichain symbol handling. \
PortfolioBridgeMain always maps the symbol as SYMBOL + portolio.srcChainId and expects the same back,
i.e USDC43114 if USDC is from Avalanche Mainnet. USDC1 if it is from Etherum.
PortfolioBridgeSub always maps the symbol that it receives into a common symbol on receipt,
i.e USDC43114 is mapped to USDC.
When sending back to the target chain, it maps it back to the expected symbol by the target chain,
i.e USDC to USDC1 if sent back to Etherum, USDC43114 if sent to Avalache.
Symbol mapping happens in packXferMessage on the way out. packXferMessage calls getTokenId that has
different implementations in PortfolioBridgeMain &amp; PortfolioBridgeSub. On the receival, the symbol mapping
will happen in different functions, either in processPayload or in getXFerMessage.
We need to raise the XChainXFerMessage before xfer.symbol is mapped in processPayload function so the
incoming and the outgoing xfer messages always contain the symbolId rather than symbol.
getXFerMessage is called by the portfolio to recover a stucked message from the LZ bridge, and to return
the funds to the depositor/withdrawer. Hence, getXFerMessage maps the symbolId to symbol.

## Variables

### Public

| Name | Type |
| --- | --- |
| PORTFOLIO_ROLE | bytes32 |
| bridgeEnabled | mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; bool) |
| defaultTargetChainId | uint32 |
| tokenDetailsMapById | mapping(bytes32 &#x3D;&gt; struct IPortfolio.TokenDetails) |
| tokenDetailsMapBySymbol | mapping(bytes32 &#x3D;&gt; mapping(uint32 &#x3D;&gt; bytes32)) |

### Internal

| Name | Type |
| --- | --- |
| defaultBridgeProvider | enum IPortfolioBridge.BridgeProvider |
| portfolio | contract IPortfolio |
| tokenList | struct EnumerableSetUpgradeable.Bytes32Set |

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
Only admin can revoke role

```solidity:no-line-numbers
function revokeRole(bytes32 _role, address _address) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _role | bytes32 | Role to revoke |
| _address | address | Address to revoke role from |

#### unpackMessage

Decodes XChainMsgType from the message

```solidity:no-line-numbers
function unpackMessage(bytes _data) public pure returns (enum IPortfolioBridge.XChainMsgType _xchainMsgType, bytes msgdata)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _data | bytes | Encoded message that has the msg type + msg |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xchainMsgType | enum IPortfolioBridge.XChainMsgType | XChainMsgType |
| msgdata | bytes | Still encoded message data. XFER in our case. Other message type not supported yet. |

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

#### addToken

Adds the given token to the portfolioBridge. PortfolioBrigeSub the list will be bigger as they could
be from different mainnet chains

**Dev notes:** \
`addToken` is only callable by admin or from Portfolio when a new common symbol is added for the
first time. The same common symbol but different symbolId are required when adding a token to
PortfolioBrigeSub. \
Native symbol is also added as a token with 0 address

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Mainnet token address the symbol or zero address for AVAX |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
|  | enum ITradePairs.AuctionMode |  |

#### removeToken

Remove the token from the tokenDetailsMapById and tokenDetailsMapBySymbol

**Dev notes:** \
Make sure that there are no in-flight messages

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _srcChainId | uint32 | Source Chain id |

#### getTokenDetails

Returns the token details.

**Dev notes:** \
Will always return here as actionMode.OFF as auctionMode is controlled in PortfolioSub.
Subnet does not have any ERC20s, hence the tokenAddress is token's mainnet address.
See the TokenDetails struct in IPortfolio for the full type information of the return variable.

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | SymbolId of the token. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPortfolio.TokenDetails | TokenDetails decimals (Identical to mainnet), tokenAddress (Token address at the mainnet) |

#### setDefaultTargetChain

Sets the default target chain id. To be extended with multichain implementation

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDefaultTargetChain(uint32 _chainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainId | uint32 | Default Chainid to use |

#### getTokenList

Frontend function to get all the tokens in the portfolio

```solidity:no-line-numbers
function getTokenList() external view returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of symbols of the tokens |

#### getXFerMessage

Unpacks XFER message and replaces the symbol with the local symbol

```solidity:no-line-numbers
function getXFerMessage(bytes _data) external view returns (struct IPortfolio.XFER xfer)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _data | bytes | XFER message |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| xfer | struct IPortfolio.XFER | Unpacked XFER message |

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

#### executeDelayedTransfer

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function executeDelayedTransfer(bytes32 _id) external virtual
```

#### setDelayThresholds

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external virtual
```

#### setDelayPeriod

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function setDelayPeriod(uint256 _period) external virtual
```

#### setEpochLength

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function setEpochLength(uint256 _length) external virtual
```

#### setEpochVolumeCaps

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external virtual
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
PortfolioBridgeSub uses the defaultTargetChain instead of portfolio.getChainId()
When sending from Mainnet to Subnet we send out the symbolId of the sourceChain. USDC => USDC1337
When receiving messages back it expects the same symbolId if USDC1337 sent, USDC1337 to recieve
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
function getSymbolForId(bytes32 _id) internal view returns (bytes32)
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

#### checkTreshholds

Overriden by PortfolioBridgeSub

**Dev notes:** \
Tresholds not checked in the Mainnet. Neither for Incoming nor outgoing.
But both are checked in the subnet.

```solidity:no-line-numbers
function checkTreshholds(struct IPortfolio.XFER) internal virtual returns (bool)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True |

### Private

#### incrementOutNonce

Increments bridge nonce

**Dev notes:** \
Only portfolio can call

```solidity:no-line-numbers
function incrementOutNonce(enum IPortfolioBridge.BridgeProvider _bridge) private returns (uint64 nonce)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to increment nonce for. For future use for multiple bridge use |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| nonce | uint64 | New nonce |

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() private
```

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

