---
headerDepth: 4
---

# LzApp

**Generic Layer Zero Application Implementation**

**Dev notes:** \
https://github.com/LayerZero-Labs/solidity-examples/blob/main/contracts/lzApp/LzApp.sol

## Variables

### Public

| Name | Type |
| --- | --- |
| gasForDestinationLzReceive | uint256 |
| lzTrustedRemoteLookup | mapping(uint16 &#x3D;&gt; bytes) |

### Internal

| Name | Type |
| --- | --- |
| lzEndpoint | contract ILayerZeroEndpoint |
| lzOutNonce | uint64 |
| lzInNonce | uint64 |
| lzRemoteChainId | uint16 |

## Events

### LzSetTrustedRemote

```solidity:no-line-numbers
event LzSetTrustedRemote(uint16 remoteChainId, bytes path)

### LzSetTrustedRemoteAddress

```solidity:no-line-numbers
event LzSetTrustedRemoteAddress(uint16 remoteChainId, bytes remoteAddress)
```

## Methods

### External

#### setLzEndPoint

Sets the Layer Zero Endpoint address

**Dev notes:** \
Only admin can set the Layer Zero Endpoint address

```solidity:no-line-numbers
function setLzEndPoint(address _endpoint) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _endpoint | address | Address of the Layer Zero Endpoint |

#### getLzEndPoint

```solidity:no-line-numbers
function getLzEndPoint() external view returns (contract ILayerZeroEndpoint)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract ILayerZeroEndpoint | ILayerZeroEndpoint  Layer Zero Endpoint |

#### lzReceive

Receive message from Layer Zero

**Dev notes:** \
Implemented by the real application

```solidity:no-line-numbers
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |
| _nonce | uint64 | Nonce received |
| _payload | bytes | Payload received |

#### getConfig

**Dev notes:** \
parameter for address is ignored as it is defaulted to the address of this contract

```solidity:no-line-numbers
function getConfig(uint16 _version, uint16 _chainId, address, uint256 _configType) external view returns (bytes)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | uint16 | Version of the config |
| _chainId | uint16 | Chain id |
|  | address |  |
| _configType | uint256 | Config type |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | bytes  Config details |

#### setConfig

Sets generic config for LayerZero user Application

```solidity:no-line-numbers
function setConfig(uint16 _version, uint16 _chainId, uint256 _configType, bytes _config) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | uint16 | Version of the config |
| _chainId | uint16 | Chain id |
| _configType | uint256 | Config type |
| _config | bytes | Config to set |

#### setSendVersion

Sets send message version

**Dev notes:** \
Only admin can set the send message version

```solidity:no-line-numbers
function setSendVersion(uint16 _version) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | uint16 | Version to set |

#### setReceiveVersion

Sets receive message version

**Dev notes:** \
Only admin can set the receive message version

```solidity:no-line-numbers
function setReceiveVersion(uint16 _version) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | uint16 | Version to set |

#### setLZTrustedRemote

Set the trusted path for the cross-chain communication

**Dev notes:** \
`_path` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function setLZTrustedRemote(uint16 _srcChainId, bytes _path) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source(Remote) chain id |
| _path | bytes | Remote contract address concatenated with the local contract address |

#### setLZTrustedRemoteAddress

Sets trusted remote address for the cross-chain communication

**Dev notes:** \
Allow DEFAULT_ADMIN to set it multiple times.

```solidity:no-line-numbers
function setLZTrustedRemoteAddress(uint16 _srcChainId, bytes _srcAddress) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source(Remote) chain id |
| _srcAddress | bytes | Source(Remote) contract address |

#### forceResumeReceive

Force resumes the stucked bridge

**Dev notes:** \
This action is destructive! Please use it only if you know what you are doing.
Only admin can call this function. \
`_srcAddress` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function forceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Remote contract address concatenated with the local contract address |

#### retryPayload

Retries the stucked message in the bridge, if any

**Dev notes:** \
Only admin can call this function \
`_srcAddress` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function retryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Remote contract address concatenated with the local contract addres |
| _payload | bytes | Payload to retry |

#### getTrustedRemoteAddress

Gets the Trusted Remote Address per given chainId

```solidity:no-line-numbers
function getTrustedRemoteAddress(uint16 _srcChainId) external view returns (bytes)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | bytes  Trusted Source Remote Address |

#### hasStoredPayload

**Dev notes:** \
`_srcAddress` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function hasStoredPayload(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Remote contract address concatenated with the local contract address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the bridge has stored payload, means it is stuck |

#### getInboundNonce

```solidity:no-line-numbers
function getInboundNonce(uint16 _srcChainId, bytes _srcAddress) external view returns (uint64)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Source contract address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | uint64  Inbound nonce |

#### getOutboundNonce

```solidity:no-line-numbers
function getOutboundNonce(uint16 _dstChainId, address _srcAddress) external view returns (uint64)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainId | uint16 | Destination chain id |
| _srcAddress | address | Source contract address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | uint64  Outbound nonce |

#### isLZTrustedRemote

**Dev notes:** \
`_srcAddress` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function isLZTrustedRemote(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Remote contract address concatenated with the local contract address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the source address is trusted |

### Internal

#### lzSend

Sends message

```solidity:no-line-numbers
function lzSend(bytes _payload, address payable _refundAddress) internal virtual returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload to send |
| _refundAddress | address payable | Refund address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Message fee |

#### lzEstimateFees

Estimates message fees

```solidity:no-line-numbers
function lzEstimateFees(bytes _payload) internal view returns (uint256 messageFee, bytes adapterParams)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Message payload |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageFee | uint256 | Message fee |
| adapterParams | bytes | Adapter parameters |

