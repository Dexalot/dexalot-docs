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
  CELER,
  ICM
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
function sendXChainMessage(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) external payable
```

#### unpackXFerMessage

```solidity:no-line-numbers
function unpackXFerMessage(bytes _data) external view returns (struct IPortfolio.XFER xfer)
```

#### enableBridgeProvider

```solidity:no-line-numbers
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, address _bridgeContract) external
```

#### isBridgeProviderEnabled

```solidity:no-line-numbers
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```

#### getDefaultBridgeProvider

```solidity:no-line-numbers
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```

#### getDefaultDestinationChain

```solidity:no-line-numbers
function getDefaultDestinationChain() external view returns (uint32)
```

#### getPortfolio

```solidity:no-line-numbers
function getPortfolio() external view returns (contract IPortfolio)
```

#### getMainnetRfq

```solidity:no-line-numbers
function getMainnetRfq() external view returns (contract IMainnetRFQ)
```

#### getTokenList

```solidity:no-line-numbers
function getTokenList() external view returns (bytes32[])
```

#### VERSION

```solidity:no-line-numbers
function VERSION() external returns (bytes32)
```

#### getBridgeFee

```solidity:no-line-numbers
function getBridgeFee(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes32 _symbol, uint256 _quantity, bytes1 _options) external view returns (uint256 bridgeFee)
```

