---
headerDepth: 4
---

# PortfolioBridgeMain

**PortfolioBridgeMain. Bridge aggregator and message relayer for mainnet using multiple different bridges.
Dexalot is bridge agnostic and currently supports ICM and LayerZero. Additional bridge providers will be added
as needed.**

The default bridge provider is ICM (Avalanche&#x27;s Interchain Messaging) within Avalanche echosystem &amp;
LayerZero for any other chains. The default bridge can&#x27;t be disabled.
You can deposit with Avalanche&#x27;s ICM and withdraw with LayerZero.
This contract does not hold any users funds. it is responsible for paying the bridge fees in form of
the chain’s gas token to 3rd party bridge providers whenever a new cross chain message is sent out by
the user. Hence the project deposit gas tokens to this contract. And the project can withdraw
the gas tokens from this contract whenever it finds it necessary.

**Dev notes:** \
PortfolioBridgeSub &amp; PortfolioSub are Dexalot L1 contracts and they can&#x27;t be deployed anywhere else.
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
In addition, we introduced a new cross chain swap flow(originally referred to as GUN Flow) where
any user can buy GUN token from any network with a single click. This is particularly
beneficial for Avalanche L1s that have certain token restrictions. For example Gunzilla prohibits ERC20s just
like Dexalat L1 and they don&#x27;t allow their gas token in any network but in Gunzilla.
When Buying GUN from Avalanche(or Arb,...) with counter token USDC, USDC is kept in MainnetRFQ(Avax)
and GUN is deposited to the buyer&#x27;s wallet via MainnetRFQ(Gun). The flow is : \
MainnetRFQ(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; ICM &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; MainnetRFQ(Gun) \
When Selling GUN from Gunzilla with counter token USDC. GUN is kept in MainnetRFQ(Gun) and USDC is deposited
to the buyer&#x27;s wallet via MainnetRFQ(Avax) The flow is : \
MainnetRFQ(Gun) &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; ICM &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; MainnetRFQ(Avax) \
Similarly a Cross Chain Swaps Betwen Avalanche &amp; Arb would work as follows exchanging AVAX &amp; ETH
MainnetRFQ(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; LayerZero &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; MainnetRFQ(Arb) \
MainnetRFQ(Arb) &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; LayerZero &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; MainnetRFQ(Avax) \
PortfolioBridgeMain always sends the ERC20 Symbol from its own network and expects the same back
i.e USDt sent &amp; received in Avalanche Mainnet whereas USDT is sent &amp; received in Arbitrum.

## Variables

### Public

| Name | Type |
| --- | --- |
| BRIDGE_USER_ROLE | bytes32 |
| BRIDGE_ADMIN_ROLE | bytes32 |
| enabledBridges | mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; contract IBridgeProvider) |
| outNonce | uint64 |
| userPaysFee | mapping(uint32 &#x3D;&gt; mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; bool)) |
| xChainAllowedDestinations | mapping(bytes32 &#x3D;&gt; mapping(uint32 &#x3D;&gt; bool)) |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[46] |
| defaultBridgeProvider | enum IPortfolioBridge.BridgeProvider |
| defaultChainId | uint32 |
| mainnetRfq | contract IMainnetRFQ |
| portfolio | contract IPortfolio |
| supportedChains | struct EnumerableMapUpgradeable.UintToUintMap |

### Private

| Name | Type |
| --- | --- |
| XCHAIN_XFER_MESSAGE_VERSION | uint8 |

## Events

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

### DefaultChainIdUpdated

```solidity:no-line-numbers
event DefaultChainIdUpdated(uint32 destinationChainId)
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

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grant admin, pauser and msg_sender role to the sender. Enable lz bridge contract as default.

```solidity:no-line-numbers
function initialize(address _lzBridgeProvider, address _owner) external
```

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
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, address _bridgeProvider) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to enable/disable |
| _bridgeProvider | address | Address of bridge provider contract, 0 address if not exists |

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
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge Provider type |

#### getDefaultDestinationChain

Returns Default Lz Destination chain

```solidity:no-line-numbers
function getDefaultDestinationChain() external view returns (uint32 chainListOrgChainId)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainListOrgChainId | uint32 | Default Destination Chainlist.org Chain Id |

#### enableXChainSwapDestination

Enables/disables a symbol for a given destination for cross chain swaps

**Dev notes:** \
Only admin can enable/disable

```solidity:no-line-numbers
function enableXChainSwapDestination(bytes32 _symbol, uint32 _chainListOrgChainId, bool _enable) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _chainListOrgChainId | uint32 | Remote Chainlist.org chainid |
| _enable | bool | True to enable, false to disable |

#### setTrustedRemoteAddress

Sets trusted remote address for the cross-chain communication. I

**Dev notes:** \
Allow DEFAULT_ADMIN to set it multiple times.

```solidity:no-line-numbers
function setTrustedRemoteAddress(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _chainListOrgChainId, bytes32 _dstChainIdBridgeAssigned, bytes32 _remoteAddress, bool _userPaysFee) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _chainListOrgChainId | uint32 | Remote Chainlist.org chainid |
| _dstChainIdBridgeAssigned | bytes32 | Bytes32 chain id assigned by the bridge provider |
| _remoteAddress | bytes32 | Remote contract address on the destination chain |
| _userPaysFee | bool | True if user must pay the bridge fee, false otherwise |

#### setDefaultDestinationChain

Sets default destination chain id for the cross-chain communication

**Dev notes:** \
Allow DEFAULT_ADMIN to set it multiple times. For PortfolioBridgeSub it is avalanche C-Chain
For other blockchains it is Dexalot L1

```solidity:no-line-numbers
function setDefaultDestinationChain(uint32 _chainListOrgChainId) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainListOrgChainId | uint32 | Default Destination Chainlist.org chainid |

#### setUserPaysFeeForDestination

Set whether a user must pay the bridge fee for message delivery at the destination chain

**Dev notes:** \
Only admin can set user pays fee for destination chain

```solidity:no-line-numbers
function setUserPaysFeeForDestination(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _chainListOrgChainId, bool _userPaysFee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge |
| _chainListOrgChainId | uint32 | Destination Chainlist.org chainid |
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

#### getSupportedChainIds

Returns an array of chainIds that are supported by the selected bridge

```solidity:no-line-numbers
function getSupportedChainIds(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (uint32[] chainIds)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainIds | uint32[] | Array of chainIds |

#### unpackXFerMessage

Unpacks XChainMsgType & XFER message from the payload and returns the local symbol and symbolId

**Dev notes:** \
Currently only XChainMsgType.XFER possible. For more details on payload packing see packXferMessage

```solidity:no-line-numbers
function unpackXFerMessage(bytes _payload) external pure returns (struct IPortfolio.XFER xfer)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload passed from the bridge |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| xfer | struct IPortfolio.XFER | IPortfolio.XFER  Xfer Message |

#### sendXChainMessage

Wrapper function to send message to destination chain via bridge

**Dev notes:** \
Only BRIDGE_USER_ROLE can call (PortfolioMain or MainnetRFQ)

```solidity:no-line-numbers
function sendXChainMessage(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) external payable virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address | Address of the user who pays the bridge fee |

#### processPayload

Processes message received from source chain via bridge in the host chain.

**Dev notes:** \
If bridge is disabled or PAUSED and there are messages in flight, we still need to
                process them when received at the destination. Only callable by the bridge implementation contracts.
                Overrides in the subnet

```solidity:no-line-numbers
function processPayload(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _srcChainListOrgChainId, bytes _payload) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to receive message from |
| _srcChainListOrgChainId | uint32 | Source chain ID |
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

#### sendXChainMessageInternal

Actual internal function that implements the message sending.

**Dev notes:** \
Handles the fee payment and message sending to the bridge contract implementation

```solidity:no-line-numbers
function sendXChainMessageInternal(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address | Address of the user who pays the bridge fee, zero address for PortfolioBridge |

#### processPayloadShared

Processes message received from source chain via bridge

**Dev notes:** \
Unpacks the message and updates the receival timestamp

```solidity:no-line-numbers
function processPayloadShared(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _srcChainListOrgChainId, bytes _payload) internal returns (struct IPortfolio.XFER xfer)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to receive message from |
| _srcChainListOrgChainId | uint32 | Source chain ID |
| _payload | bytes | Payload received |

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() internal virtual
```

### Private

#### packXferMessage

Maps symbol to symbolId and encodes XFER message

**Dev notes:** \
It is packed as follows:
slot0: trader(20), nonce(8), transaction(2), XChainMsgType(2)
slot1: symbol(32)
slot2: quantity(32)
slot3: customdata(28), timestamp(4)

```solidity:no-line-numbers
function packXferMessage(struct IPortfolio.XFER _xfer) private pure returns (bytes message)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message to encode |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | bytes | Encoded XFER message |

#### getCrossChainMessageType

```solidity:no-line-numbers
function getCrossChainMessageType(enum IPortfolio.Tx _transaction) private pure returns (enum IBridgeProvider.CrossChainMessageType)
```

