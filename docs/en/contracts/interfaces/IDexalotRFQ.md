---
headerDepth: 4
---

# IDexalotRFQ

## Struct Types

### Order

```solidity
struct Order {
  uint256 nonceAndMeta;
  uint128 expiry;
  address makerAsset;
  address takerAsset;
  address maker;
  address taker;
  uint256 makerAmount;
  uint256 takerAmount;
}
```
### XChainSwap

```solidity
struct XChainSwap {
  bytes32 from;
  bytes32 to;
  bytes32 makerSymbol;
  bytes32 makerAsset;
  bytes32 takerAsset;
  uint256 makerAmount;
  uint256 takerAmount;
  uint96 nonce;
  uint32 expiry;
  uint32 destChainId;
  enum IPortfolioBridge.BridgeProvider bridgeProvider;
}
```
### SwapData

```solidity
struct SwapData {
  uint256 nonceAndMeta;
  address taker;
  bytes32 destTrader;
  uint32 destChainId;
  address srcAsset;
  bytes32 destAsset;
  uint256 srcAmount;
  uint256 destAmount;
  address msgSender;
  bool isDirect;
}
```
### PendingSwap

```solidity
struct PendingSwap {
  address trader;
  uint256 quantity;
  bytes32 symbol;
}
```

## Methods

### External

#### processXFerPayload

```solidity:no-line-numbers
function processXFerPayload(struct IPortfolio.XFER _xfer) external
```

#### simpleSwap

```solidity:no-line-numbers
function simpleSwap(struct IDexalotRFQ.Order order, bytes signature) external payable
```

#### receive

```solidity:no-line-numbers
receive() external payable
```

