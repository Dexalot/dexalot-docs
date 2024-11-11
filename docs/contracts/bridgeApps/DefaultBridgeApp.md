---
headerDepth: 4
---

# DefaultBridgeApp

**DefaultBridgeApp**

Default implementation of the IBridgeProvider interface

## Variables

### Public

| Name | Type |
| --- | --- |
| portfolioBridge | address |
| remoteBlockchains | mapping(bytes32 &#x3D;&gt; struct IBridgeProvider.RemoteChain) |
| remoteChainIDs | mapping(uint32 &#x3D;&gt; struct IBridgeProvider.RemoteChain) |

### Private

| Name | Type |
| --- | --- |
| __gap | uint256[50] |

## Events

### PortfolioBridgeUpdated

```solidity:no-line-numbers
event PortfolioBridgeUpdated(address portfolioBridgeAddr)
```

### RemoteChainUpdated

```solidity:no-line-numbers
event RemoteChainUpdated(uint32 chainID, bytes32 blockchainID, bytes32 remoteContract)
```

## Modifiers

#### onlyPortfolioBridge

Reverts if function sender is not portfolio bridge.

```solidity:no-line-numbers
modifier onlyPortfolioBridge()
```

## Methods

### Public

#### getBridgeProvider

```solidity:no-line-numbers
function getBridgeProvider() public pure virtual returns (enum IPortfolioBridge.BridgeProvider)
```

### External

#### getBridgeFee

Get the bridge fee for a destination chain and message type

```solidity:no-line-numbers
function getBridgeFee(uint32, enum IBridgeProvider.CrossChainMessageType) external view virtual returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Default of zero fee |

#### getBridgeFee

Get the bridge fee for a destination chain

```solidity:no-line-numbers
function getBridgeFee(uint32) external view virtual returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Default of zero fee |

#### sendMessage

Sends a message to a remote chain

**Dev notes:** \
Only callable by the PortfolioBridge contract

```solidity:no-line-numbers
function sendMessage(uint32 _dstChainID, bytes _message, enum IBridgeProvider.CrossChainMessageType _msgType, address _feeRefundAddress) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainID | uint32 | Chain ID of the destination chain |
| _message | bytes | Bytes payload of the message |
| _msgType | enum IBridgeProvider.CrossChainMessageType | CrossChainMessageType |
| _feeRefundAddress | address | Address to refund the bridge fee (if any) |

#### setRemoteChain

Set the remote chain details

```solidity:no-line-numbers
function setRemoteChain(uint32 _chainID, bytes32 _blockchainID, bytes32 _remoteContract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainID | uint32 | The chainlist chain ID |
| _blockchainID | bytes32 | The blockchain ID of the remote chain |
| _remoteContract | bytes32 | The address of the remote contract in bytes32 format |

#### setPortfolioBridge

```solidity:no-line-numbers
function setPortfolioBridge(address _portfolioBridgeAddr) external virtual
```

### Internal

#### _setPortfolioBridge

Set the PortfolioBridge contract address

**Dev notes:** \
Reverts if the address is zero

```solidity:no-line-numbers
function _setPortfolioBridge(address _portfolioBridgeAddr) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeAddr | address | The address of the PortfolioBridge contract |

#### _receiveMessage

Internal function to process a message from a remote chain and call portfolio bridge

```solidity:no-line-numbers
function _receiveMessage(bytes32 _blockchainID, bytes32 _sourceContract, bytes _payload) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockchainID | bytes32 | The blockchain ID of the source chain |
| _sourceContract | bytes32 | The address of the source contract |
| _payload | bytes | The message payload |

#### _verifyDestination

Internal function to verify the destination chain

```solidity:no-line-numbers
function _verifyDestination(uint32 _chainId) internal view returns (struct IBridgeProvider.RemoteChain destination)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainId | uint32 | The chainlist chain ID |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| destination | struct IBridgeProvider.RemoteChain | RemoteChain struct |

#### _sendMessage

```solidity:no-line-numbers
function _sendMessage(struct IBridgeProvider.RemoteChain _destination, bytes _message, enum IBridgeProvider.CrossChainMessageType _msgType, address _feeRefundAddress) internal virtual
```

