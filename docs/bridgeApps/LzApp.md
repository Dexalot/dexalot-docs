# LzApp



> Generic Layer Zero Application Implementation





## Methods

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

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
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload) external nonpayable
```

Receive message from Layer Zero

*Implemented by the real application*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |
| _nonce | uint64 | Nonce received |
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
function revokeRole(bytes32 role, address account) external nonpayable
```



*Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``&#39;s admin role. May emit a {RoleRevoked} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

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



## Events

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



