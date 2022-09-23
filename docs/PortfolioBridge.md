# PortfolioBridge

*&quot;DEXALOT TEAM&quot;*

> &quot;PortfolioBridgeMain: bridging aggregator for the mainnet&quot;





## Methods

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### PAUSER_ROLE

```solidity
function PAUSER_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### PORTFOLIO_ROLE

```solidity
function PORTFOLIO_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### VERSION

```solidity
function VERSION() external pure returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### bridgeEnabled

```solidity
function bridgeEnabled(enum IPortfolioBridge.BridgeProvider) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | enum IPortfolioBridge.BridgeProvider | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### enableBridgeProvider

```solidity
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool enable) external nonpayable
```

Enables/disables given bridge

*Only admin can enable/disable bridge*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to enable/disable |
| enable | bool | True to enable, false to disable |

### executeDelayedTransfer

```solidity
function executeDelayedTransfer(bytes32 id) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id | bytes32 | undefined |

### forceResumeReceive

```solidity
function forceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external nonpayable
```

Force resumes the stucked bridge

*This action is destructive! Please use it only if you know what you are doing.Only admin can call this*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

### gasForDestinationLzReceive

```solidity
function gasForDestinationLzReceive() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getConfig

```solidity
function getConfig(uint16 _version, uint16 _chainId, address, uint256 _configType) external view returns (bytes)
```



*parameter for address is ignored as it is defaulted to the address of this contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _version | uint16 | Version of the config |
| _chainId | uint16 | Chain id |
| _2 | address | undefined |
| _configType | uint256 | Config type |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes | bytes  Config details |

### getDefaultBridgeProvider

```solidity
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```

Returns default bridge Provider




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum IPortfolioBridge.BridgeProvider | BridgeProvider |

### getInboundNonce

```solidity
function getInboundNonce(uint16 _srcChainId, bytes _srcAddress) external view returns (uint64)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint64 | uint64  Inbound nonce |

### getLzEndPoint

```solidity
function getLzEndPoint() external view returns (contract ILayerZeroEndpoint)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ILayerZeroEndpoint | ILayerZeroEndpoint  Layer Zero Endpoint |

### getOutboundNonce

```solidity
function getOutboundNonce(uint16 _dstChainId, address _srcAddress) external view returns (uint64)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _dstChainId | uint16 | Destination chain id |
| _srcAddress | address | Source contract address |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint64 | uint64  Outbound nonce |

### getPortfolio

```solidity
function getPortfolio() external view returns (contract IPortfolio)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPortfolio | IPortfolio  Portfolio contract |

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

### hasStoredPayload

```solidity
function hasStoredPayload(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  True if the bridge has stored payload, means it is stuck |

### initialize

```solidity
function initialize(address _endpoint) external nonpayable
```

Initializer for upgradeable contract.

*Grant admin, pauser and msg_sender role to the sender. Set gas for lz. Set endpoint and enable bridge*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _endpoint | address | Endpoint of the LZ bridge |

### isBridgeProviderEnabled

```solidity
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  True if bridge is enabled, false otherwise |

### isLZTrustedRemote

```solidity
function isLZTrustedRemote(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool  True if the source address is trusted |

### lzReceive

```solidity
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64, bytes _payload) external nonpayable
```

Receive message from source chain via LayerZero

*Only trusted LZ endpoint can call*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain ID |
| _srcAddress | bytes | Source address |
| _2 | uint64 | undefined |
| _payload | bytes | Payload received |

### lzTrustedRemoteLookup

```solidity
function lzTrustedRemoteLookup(uint16) external view returns (bytes)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint16 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes | undefined |

### pause

```solidity
function pause() external nonpayable
```

Pauses bridge operations

*Only pauser can pause*


### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### refundNative

```solidity
function refundNative() external nonpayable
```

Refunds the native balance inside contract

*Only admin can call*


### refundTokens

```solidity
function refundTokens(address[] tokens) external nonpayable
```

Refunds the ERC20 balance inside contract

*Only admin can call*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens | address[] | Array of ERC20 tokens to refund |

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

### retryPayload

```solidity
function retryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external nonpayable
```

Retries the stucked message in the bridge, if any

*Only admin can call this*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |
| _payload | bytes | Payload to retry |

### revokeRole

```solidity
function revokeRole(bytes32 _role, address _address) external nonpayable
```

Wrapper for revoking roles

*Only admin can revoke role*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _role | bytes32 | Role to revoke |
| _address | address | Address to revoke role from |

### sendXChainMessage

```solidity
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, IPortfolio.XFER _xfer) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |
| _xfer | IPortfolio.XFER | undefined |

### setConfig

```solidity
function setConfig(uint16 _version, uint16 _chainId, uint256 _configType, bytes _config) external nonpayable
```

Sets generic config for LayerZero user Application



#### Parameters

| Name | Type | Description |
|---|---|---|
| _version | uint16 | Version of the config |
| _chainId | uint16 | Chain id |
| _configType | uint256 | Config type |
| _config | bytes | Config to set |

### setDelayPeriod

```solidity
function setDelayPeriod(uint256 _period) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _period | uint256 | undefined |

### setDelayThresholds

```solidity
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokens | bytes32[] | undefined |
| _thresholds | uint256[] | undefined |

### setEpochLength

```solidity
function setEpochLength(uint256 _length) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _length | uint256 | undefined |

### setEpochVolumeCaps

```solidity
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external nonpayable
```



*Only valid for the subnet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokens | bytes32[] | undefined |
| _caps | uint256[] | undefined |

### setGasForDestinationLzReceive

```solidity
function setGasForDestinationLzReceive(uint256 _gas) external nonpayable
```

Set gas for destination chain

*Only admin can set gas for destination chain*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _gas | uint256 | Gas for destination chain |

### setLZTrustedRemote

```solidity
function setLZTrustedRemote(uint16 _srcChainId, bytes _srcAddress) external nonpayable
```

Sets trusted remote address

*Allow owner to set it multiple times.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

### setLzEndPoint

```solidity
function setLzEndPoint(address _endpoint) external nonpayable
```

Sets the Layer Zero Endpoint address

*Only admin can set the Layer Zero Endpoint address*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _endpoint | address | Address of the Layer Zero Endpoint |

### setPortfolio

```solidity
function setPortfolio(address _portfolio) external nonpayable
```

Set portfolio address to grant role

*Only admin can set portfolio address. Only one portfolio address can be set*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _portfolio | address | Portfolio address |

### setReceiveVersion

```solidity
function setReceiveVersion(uint16 _version) external nonpayable
```

Sets receive message version

*Only admin can set the receive message version*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _version | uint16 | Version to set |

### setSendVersion

```solidity
function setSendVersion(uint16 _version) external nonpayable
```

Sets send message version

*Only admin can set the send message version*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _version | uint16 | Version to set |

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

### unpackMessage

```solidity
function unpackMessage(bytes data) external pure returns (enum IPortfolioBridge.XChainMsgType _xchainMsgType, bytes msgdata)
```

Decodes XFER message



#### Parameters

| Name | Type | Description |
|---|---|---|
| data | bytes | Encoded XFER message |

#### Returns

| Name | Type | Description |
|---|---|---|
| _xchainMsgType | enum IPortfolioBridge.XChainMsgType |  XChainMsgType |
| msgdata | bytes |  Decoded XFER message |

### unpackXFerMessage

```solidity
function unpackXFerMessage(bytes data) external pure returns (struct IPortfolio.XFER _xfer)
```

Unpacks XFER message



#### Parameters

| Name | Type | Description |
|---|---|---|
| data | bytes | XFER message |

#### Returns

| Name | Type | Description |
|---|---|---|
| _xfer | IPortfolio.XFER |  Unpacked XFER message |

### unpause

```solidity
function unpause() external nonpayable
```

Unpauses bridge operations

*Only pauser can unpause*




## Events

### GasForDestinationLzReceiveUpdated

```solidity
event GasForDestinationLzReceiveUpdated(uint256 gasForDestinationLzReceive)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| gasForDestinationLzReceive  | uint256 | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### LZTrustedRemoteSet

```solidity
event LZTrustedRemoteSet(uint16 remoteChainId, bytes remoteAddress)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| remoteChainId  | uint16 | undefined |
| remoteAddress  | bytes | undefined |

### Paused

```solidity
event Paused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

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

### XChainXFerMessage

```solidity
event XChainXFerMessage(uint8 version, enum IPortfolioBridge.BridgeProvider indexed bridge, enum IPortfolioBridge.Direction indexed msgDirection, uint32 indexed remoteChainId, uint256 messageFee, IPortfolio.XFER xfer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| bridge `indexed` | enum IPortfolioBridge.BridgeProvider | undefined |
| msgDirection `indexed` | enum IPortfolioBridge.Direction | undefined |
| remoteChainId `indexed` | uint32 | undefined |
| messageFee  | uint256 | undefined |
| xfer  | IPortfolio.XFER | undefined |



