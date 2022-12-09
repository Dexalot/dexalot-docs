---
headerDepth: 4
---

# IPortfolioBridge

**Interface of PortfolioBridge**

## Enum Types

### XChainMsgType

```solidity
enum XChainMsgType {
  XFER
}
```
### Direction

```solidity
enum Direction {
  SENT,
  RECEIVED
}
```
### BridgeProvider

```solidity
enum BridgeProvider {
  LZ,
  CELER
}
```

## Events

### XChainXFerMessage

```solidity:no-line-numbers
event XChainXFerMessage(uint8 version, enum IPortfolioBridge.BridgeProvider bridge, enum IPortfolioBridge.Direction msgDirection, uint32 remoteChainId, uint256 messageFee, struct IPortfolio.XFER xfer)
```

## Methods

### External

#### pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

```solidity:no-line-numbers
function unpause() external
```

#### sendXChainMessage

```solidity:no-line-numbers
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) external
```

#### getXFerMessage

```solidity:no-line-numbers
function getXFerMessage(bytes _data) external view returns (address, bytes32, uint256)
```

#### enableBridgeProvider

```solidity:no-line-numbers
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool _enable) external
```

#### isBridgeProviderEnabled

```solidity:no-line-numbers
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```

#### getDefaultBridgeProvider

```solidity:no-line-numbers
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```

#### VERSION

```solidity:no-line-numbers
function VERSION() external returns (bytes32)
```

