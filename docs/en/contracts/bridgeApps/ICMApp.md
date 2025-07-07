---
headerDepth: 4
---

# ICMApp

**ICMApp**

This contract sends and receives generic messages between different chains via Avalanche&#x27;s Inter-Chain Messaging (ICM)

**Dev notes:** \
It is designed to be used in conjunction with the PortfolioBridge contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| allowedRelayers | mapping(bytes32 &#x3D;&gt; address[]) |
| gasLimits | mapping(enum IBridgeProvider.CrossChainMessageType &#x3D;&gt; uint256) |
| nativeBridgeFees | mapping(uint32 &#x3D;&gt; uint256) |

## Events

### SetRelayers

```solidity:no-line-numbers
event SetRelayers(bytes32 blockchainId, address[] relayers)
```

### AddRelayer

```solidity:no-line-numbers
event AddRelayer(bytes32 blockchainId, address relayer)
```

### ClearRelayers

```solidity:no-line-numbers
event ClearRelayers(bytes32 blockchainId)
```

### SetGasLimit

```solidity:no-line-numbers
event SetGasLimit(enum IBridgeProvider.CrossChainMessageType msgType, uint256 gasLimit)
```

## Methods

### Public

#### VERSION

```solidity:no-line-numbers
function VERSION() public pure virtual returns (bytes32)
```

#### getBridgeFee

Get the bridge fee for a given chain ID and message type in terms of the native token

```solidity:no-line-numbers
function getBridgeFee(uint32 _chainID, enum IBridgeProvider.CrossChainMessageType) public view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainID | uint32 | The chainlist chain ID to get a bridge fee for |
|  | enum IBridgeProvider.CrossChainMessageType |  |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The bridge fee in terms of the native token |

#### getBridgeProvider

Get the bridge provider enum

```solidity:no-line-numbers
function getBridgeProvider() public pure returns (enum IPortfolioBridge.BridgeProvider)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IPortfolioBridge.BridgeProvider | The bridge provider enum |

### External

#### initialize

```solidity:no-line-numbers
function initialize(address _teleporterRegistryAddress, uint256 _minTeleporterVersion, address _owner) external
```

#### setPortfolioBridge

Set the PortfolioBridge contract address

**Dev notes:** \
Called on deployment

```solidity:no-line-numbers
function setPortfolioBridge(address _portfolioBridgeAddr) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeAddr | address | The address of the PortfolioBridge contract |

#### getBridgeFee

Get the bridge fee for a given chain ID in terms of the native token

**Dev notes:** \
Defaults to the DEPOSIT message type

```solidity:no-line-numbers
function getBridgeFee(uint32 _chainID) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainID | uint32 | The chainlist chain ID to get a bridge fee for |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The bridge fee in terms of the native token |

#### setRelayers

Set the allowed relayer addresses

```solidity:no-line-numbers
function setRelayers(bytes32 _blockchainId, address[] _relayers) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockchainId | bytes32 | The destination blockchain ID |
| _relayers | address[] | The addresses of the relayers |

#### addRelayer

Add an allowed relayer address

```solidity:no-line-numbers
function addRelayer(bytes32 _blockchainId, address _relayer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockchainId | bytes32 | The destination blockchain ID |
| _relayer | address | The address of the relayer |

#### clearRelayers

Clear all allowed relayer addresses for a given chain

```solidity:no-line-numbers
function clearRelayers(bytes32 _blockchainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockchainId | bytes32 | The destination blockchain ID |

#### setGasLimit

Set the max gas limit for a given message type

```solidity:no-line-numbers
function setGasLimit(enum IBridgeProvider.CrossChainMessageType _msgType, uint256 _gasLimit) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _msgType | enum IBridgeProvider.CrossChainMessageType | The cross chain message type |
| _gasLimit | uint256 | The max gas limit |

#### setNativeBridgeFee

Set the native bridge fee for a given chain ID

```solidity:no-line-numbers
function setNativeBridgeFee(uint32 _chainID, uint256 _nativeBridgeFee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainID | uint32 | The chainlist chain ID to set the fee for |
| _nativeBridgeFee | uint256 | The native token fee in wei |

### Internal

#### _receiveTeleporterMessage

Receives a message from a remote chain via the ICMMessenger

```solidity:no-line-numbers
function _receiveTeleporterMessage(bytes32 _sourceBlockchainID, address _originSenderAddress, bytes _message) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sourceBlockchainID | bytes32 | Blockchain ID of the source chain |
| _originSenderAddress | address | Address of the sender contract |
| _message | bytes | Bytes payload of the message |

#### _sendMessage

Send a message to a remote chain

**Dev notes:** \
ICM does not support native token fees so 0 fee is always used

```solidity:no-line-numbers
function _sendMessage(struct IBridgeProvider.RemoteChain _destination, bytes _message, enum IBridgeProvider.CrossChainMessageType _msgType, address) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _destination | struct IBridgeProvider.RemoteChain | The remote chain details |
| _message | bytes | The message payload |
| _msgType | enum IBridgeProvider.CrossChainMessageType | The cross chain message type |
|  | address |  |

