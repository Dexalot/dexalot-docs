---
headerDepth: 4
---

# IPortfolioSub

**Interface of PortfolioSub**

## Enum Types

### AssetType

```solidity
enum AssetType {
  NATIVE,
  ERC20,
  NONE
}
```

## Methods

### External

#### adjustAvailable

```solidity:no-line-numbers
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external
```

#### addExecution

```solidity:no-line-numbers
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _taker, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external
```

#### transferToken

```solidity:no-line-numbers
function transferToken(address _to, bytes32 _symbol, uint256 _quantity) external
```

#### getBalance

```solidity:no-line-numbers
function getBalance(address _owner, bytes32 _symbol) external view returns (uint256 total, uint256 available, enum IPortfolioSub.AssetType assetType)
```

#### withdrawNative

```solidity:no-line-numbers
function withdrawNative(address payable _to, uint256 _quantity) external
```

#### withdrawToken

```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external
```

#### setAuctionMode

```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external
```

#### autoFill

```solidity:no-line-numbers
function autoFill(address _trader, bytes32 _symbol) external
```

