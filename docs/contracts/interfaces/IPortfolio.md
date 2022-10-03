---
headerDepth: 4
---

# IPortfolio

**Interface of Portfolio**



## Struct Types

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
  RECOVER
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


#### updateTransferFeeRate



```solidity:no-line-numbers
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external
```


#### addToken



```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external
```


#### removeToken



```solidity:no-line-numbers
function removeToken(bytes32 _symbol) external
```


#### adjustAvailable



```solidity:no-line-numbers
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external
```


#### addExecution



```solidity:no-line-numbers
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _taker, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external
```


#### depositNative



```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```


#### withdrawNative



```solidity:no-line-numbers
function withdrawNative(address payable _to, uint256 _quantity) external
```


#### depositToken



```solidity:no-line-numbers
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external
```


#### withdrawToken



```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external
```


#### depositTokenFromContract



```solidity:no-line-numbers
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external
```


#### addTrustedContract



```solidity:no-line-numbers
function addTrustedContract(address _contract, string _organization) external
```


#### isTrustedContract



```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```


#### removeTrustedContract



```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```


#### setAuctionMode



```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external
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


#### lzForceResumeReceive



```solidity:no-line-numbers
function lzForceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external
```


#### lzRetryPayload



```solidity:no-line-numbers
function lzRetryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external
```




