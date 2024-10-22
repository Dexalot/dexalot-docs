---
headerDepth: 4
---

# LzV2App

**LzV2App**

This contract sends and receives generic messages between different chains via LayerZero v2 Endpoints

**Dev notes:** \
It is designed to be used in conjunction with the PortfolioBridge contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Private

| Name | Type |
| --- | --- |
| DEFAULT_PAYLOAD | bytes |

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(address _endpoint, address _owner) public
```

#### getBridgeFee

Get the bridge fee for a given chain ID and message type in terms of the native token

```solidity:no-line-numbers
function getBridgeFee(uint32 _chainID, enum IBridgeProvider.CrossChainMessageType _msgType) public view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainID | uint32 | The chainlist chain ID to get a bridge fee for |
| _msgType | enum IBridgeProvider.CrossChainMessageType | The message type to get a bridge fee for |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The bridge fee in terms of the native token |

#### getBridgeProvider

Get the bridge provider enum

```solidity:no-line-numbers
function getBridgeProvider() public pure virtual returns (enum IPortfolioBridge.BridgeProvider)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IPortfolioBridge.BridgeProvider | The bridge provider enum |

### External

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

### Internal

#### _lzReceive

Receives a message from a remote chain via the LZEndpointV2

```solidity:no-line-numbers
function _lzReceive(struct Origin _origin, bytes32, bytes _payload, address, bytes) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _origin | struct Origin | Details of the origin chain and sender |
|  | bytes32 |  |
| _payload | bytes | Bytes payload of the message |
|  | address |  |
|  | bytes |  |

#### _sendMessage

Send a message to a remote chain via the LZEndpointV2

```solidity:no-line-numbers
function _sendMessage(struct IBridgeProvider.RemoteChain _destination, bytes _message, enum IBridgeProvider.CrossChainMessageType _msgType, address _feeRefundAddress) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _destination | struct IBridgeProvider.RemoteChain | Details of the destination chain and contract |
| _message | bytes | Bytes payload of the message |
| _msgType | enum IBridgeProvider.CrossChainMessageType | CrossChainMessageType |
| _feeRefundAddress | address | Address to refund the bridge fee (if any) |

