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
  AUTOFILL
}
```

## Events

### PortfolioUpdated

```solidity:no-line-numbers
event PortfolioUpdated(enum IPortfolio.Tx transaction, address wallet, bytes32 symbol, uint256 quantity, uint256 feeCharged, uint256 total, uint256 available)
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
function pauseDeposit(bool _pause) external
```

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio) external
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
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external
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

