---
headerDepth: 4
---

# LzApp

**Abstract Layer Zero contract**

It is extended by the PortfolioBridgeMain contract for Dexalot specific implementation

**Dev notes:** \
defaultLzRemoteChainId is the default destination chain. For PortfolioBridgeSub it is avalanche C-Chain
For other blockchains it is Dexalot Subnet

## Variables

### Public

| Name | Type |
| --- | --- |
| lzTrustedRemoteLookup | mapping(uint16 &#x3D;&gt; bytes) |
| remoteParams | mapping(uint16 &#x3D;&gt; struct ILayerZeroUserApplicationConfig.Destination) |

### Internal

| Name | Type |
| --- | --- |
| defaultLzRemoteChainId | uint16 |
| lzEndpoint | contract ILayerZeroEndpoint |

### Private

| Name | Type |
| --- | --- |
| __gap | uint256[50] |

## Events

### LzSetTrustedRemoteAddress

```solidity:no-line-numbers
event LzSetTrustedRemoteAddress(uint16 destinationLzChainId, bytes remoteAddress, uint32 chainListOrgChainId, uint256 gasForDestinationLzReceive, bool userPaysFee)
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

#### forceResumeReceive

Force resumes the stuck bridge by destroying the message blocking it.

**Dev notes:** \
This action is destructive! Use this as the last resort!
Use this function directly only when portfolioBridge.lzDestroyAndRecoverFunds() fails
If this function is used directly, destroyed message's funds are processed in the originating chain
properly but they will not be processed in the target chain at all. The funds in storedPayload destroyed
have to be manually sent to the originator of the message.
For example, if the message is destroyed using this function the end state will be:
If sending from mainnet to subnet. Funds deposited/locked in the mainnet but they won't show in the subnet
If sending from subnet to mainnet. Funds are withdrawn from the subnet but they won't be deposited into
the user's wallet in the mainnet
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

Retries the stuck message in the bridge, if any

**Dev notes:** \
Only DEFAULT_ADMIN_ROLE can call this function
Reverts if there is no storedPayload in the bridge or the supplied payload doesn't match the storedPayload
`_srcAddress` is 40 bytes data with the remote contract address concatenated with
the local contract address via `abi.encodePacked(sourceAddress, localAddress)`

```solidity:no-line-numbers
function retryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | Source chain id |
| _srcAddress | bytes | Remote contract address concatenated with the local contract address |
| _payload | bytes | Payload to retry |

#### getLzEndPoint

```solidity:no-line-numbers
function getLzEndPoint() external view returns (contract ILayerZeroEndpoint)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract ILayerZeroEndpoint | ILayerZeroEndpoint  Layer Zero Endpoint |

#### getTrustedRemoteAddress

Gets the Trusted Remote Address per given chainId

```solidity:no-line-numbers
function getTrustedRemoteAddress(uint16 _remoteChainId) external view returns (bytes)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _remoteChainId | uint16 | Remote chain id |

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

#### hasStoredPayload

```solidity:no-line-numbers
function hasStoredPayload() external view returns (bool)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the bridge has stored payload with its default destination, means it is stuck |

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

send a LayerZero message to the specified address at a LayerZero endpoint.

```solidity:no-line-numbers
function lzSend(uint16 _dstChainId, bytes _payload, address payable _refundAddress) internal virtual returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainId | uint16 | the destination chain identifier |
| _payload | bytes | a custom bytes payload to send to the destination contract |
| _refundAddress | address payable | if the source transaction is cheaper than the amount of value passed, refund the additional amount to this address |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Message fee |

#### lzEstimateFees

Estimates message fees

```solidity:no-line-numbers
function lzEstimateFees(uint16 _dstChainId, bytes _payload) internal view returns (uint256 messageFee, bytes adapterParams)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainId | uint16 | Target chain id |
| _payload | bytes | Message payload |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageFee | uint256 | Message fee |
| adapterParams | bytes | Adapter parameters |

#### getInboundNonce

**Dev notes:** \
Get the inboundNonce of a lzApp from a source chain which could be EVM or non-EVM chain

```solidity:no-line-numbers
function getInboundNonce(uint16 _srcChainId) internal view returns (uint64)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainId | uint16 | the source chain identifier |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | uint64  Inbound nonce |

#### getOutboundNonce

**Dev notes:** \
Get the outboundNonce of a lzApp for a destination chain which, consequently, is always an EVM

```solidity:no-line-numbers
function getOutboundNonce(uint16 _dstChainId) internal view returns (uint64)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainId | uint16 | The destination chain identifier |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | uint64  Outbound nonce |

