---
headerDepth: 4
---

# IPortfolioBridgeSub

**Interface of PortfolioBridgeSub**

## Struct Types

### TokenDestinationInfo

```solidity
struct TokenDestinationInfo {
  bytes32 symbolId;
  uint240 bridgeFee;
  uint16 maxBridgeFeeCap;
}
```

## Events

### BridgeFeeUpdated

```solidity:no-line-numbers
event BridgeFeeUpdated(uint32 dstChainId, bytes32[] tokens, uint240[] bridgeFees)
```

### MaxBridgeFeeCapUpdated

```solidity:no-line-numbers
event MaxBridgeFeeCapUpdated(uint32 dstChainId, bytes32[] tokens, uint16[] maxBridgeFeeCaps)
```

## Methods

### External

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode, bytes32 _subnetSymbol, uint256 _bridgeFee) external
```

#### removeToken

```solidity:no-line-numbers
function removeToken(bytes32 _srcChainSymbol, uint32 _srcChainId, bytes32 _subnetSymbol) external returns (bool deleted)
```

#### getTokenDetails

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

#### executeDelayedTransfer

```solidity:no-line-numbers
function executeDelayedTransfer(bytes32 _id) external
```

#### getAllBridgeFees

```solidity:no-line-numbers
function getAllBridgeFees(enum IPortfolioBridge.BridgeProvider _bridge, bytes32 _symbol, uint256 _quantity) external view returns (uint256[] bridgeFees, uint32[] chainIds)
```

#### setBridgeFees

```solidity:no-line-numbers
function setBridgeFees(uint32 _dstChainListOrgChainId, bytes32[] _tokens, uint240[] _bridgeFees) external
```

