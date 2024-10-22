---
headerDepth: 4
---

# IBridgeProvider

## Struct Types

### RemoteChain

```solidity
struct RemoteChain {
  uint32 chainID;
  bytes32 blockchainID;
  bytes32 remoteContract;
}
```

## Enum Types

### CrossChainMessageType

```solidity
enum CrossChainMessageType {
  WITHDRAW,
  DEPOSIT,
  CCTRADE
}
```

## Methods

### External

#### sendMessage

```solidity:no-line-numbers
function sendMessage(uint32 dstChainID, bytes message, enum IBridgeProvider.CrossChainMessageType msgType, address feeRefundAddress) external payable
```

#### setRemoteChain

```solidity:no-line-numbers
function setRemoteChain(uint32 chainID, bytes32 blockchainID, bytes32 remoteContract) external
```

#### getBridgeFee

```solidity:no-line-numbers
function getBridgeFee(uint32 dstChainID) external view returns (uint256)
```

#### getBridgeFee

```solidity:no-line-numbers
function getBridgeFee(uint32 dstChainID, enum IBridgeProvider.CrossChainMessageType msgType) external view returns (uint256)
```

