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
function addExecution(bytes32 _tradePairId, struct ITradePairs.TradePair _tradePair, enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, uint256 _baseAmount, uint256 _quoteAmount) external returns (uint256 makerfee, uint256 takerfee)
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
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId) external
```

#### withdrawToken

```solidity:no-line-numbers
function withdrawToken(address _from, bytes32 _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes1 _options) external
```

#### setAuctionMode

```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external
```

#### autoFill

```solidity:no-line-numbers
function autoFill(address _trader, bytes32 _symbol) external
```

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, uint8 _l1Decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio, bytes32 _subnetSymbol) external
```

#### removeToken

```solidity:no-line-numbers
function removeToken(bytes32 _subnetSymbol, uint32 _srcChainId, bytes32 _srcChainSymbol) external
```

