---
headerDepth: 4
---

# IPortfolio

**Interface of Portfolio**

## Struct Types

### BridgeParams

```solidity
struct BridgeParams {
  uint256 fee;
  uint256 gasSwapRatio;
  bool usedForGasSwap;
}
```
### XFER

```solidity
struct XFER {
  uint64 nonce;
  enum IPortfolio.Tx transaction;
  address trader;
  bytes32 symbol;
  uint256 quantity;
  uint256 timestamp;
  bytes28 customdata;
}
```
### TokenDetails

```solidity
struct TokenDetails {
  uint8 decimals;
  address tokenAddress;
  enum ITradePairs.AuctionMode auctionMode;
  uint32 srcChainId;
  bytes32 symbol;
  bytes32 symbolId;
  bytes32 sourceChainSymbol;
  bool isVirtual;
}
```

## Enum Types

### Tx

```solidity
enum Tx {
  WITHDRAW,
  DEPOSIT,
  EXECUTION,
  INCREASEAVAIL,
  DECREASEAVAIL,
  IXFERSENT,
  IXFERREC,
  RECOVERFUNDS,
  ADDGAS,
  REMOVEGAS,
  AUTOFILL,
  CCTRADE
}
```

## Events

### PortfolioUpdated

```solidity:no-line-numbers
event PortfolioUpdated(enum IPortfolio.Tx transaction, address wallet, bytes32 symbol, uint256 quantity, uint256 feeCharged, uint256 total, uint256 available, address walletOther)
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

#### pauseDeposit

```solidity:no-line-numbers
function pauseDeposit(bool _depositPause) external
```

#### removeToken

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) external
```

#### depositNative

```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```

#### processXFerPayload

```solidity:no-line-numbers
function processXFerPayload(struct IPortfolio.XFER _xfer) external
```

#### getNative

```solidity:no-line-numbers
function getNative() external view returns (bytes32)
```

#### getChainId

```solidity:no-line-numbers
function getChainId() external view returns (uint32)
```

#### getTokenDetails

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbol) external view returns (struct IPortfolio.TokenDetails)
```

#### getTokenDetailsById

```solidity:no-line-numbers
function getTokenDetailsById(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

#### getTokenList

```solidity:no-line-numbers
function getTokenList() external view returns (bytes32[])
```

#### setBridgeParam

```solidity:no-line-numbers
function setBridgeParam(bytes32 _symbol, uint256 _fee, uint256 _gasSwapRatio, bool _usedForGasSwap) external
```

