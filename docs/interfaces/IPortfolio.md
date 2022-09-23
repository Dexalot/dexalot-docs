# IPortfolio

*&quot;DEXALOT TEAM&quot;*

> &quot;IPortfolio: interface of Portfolio&quot;





## Methods

### addExecution

```solidity
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _taker, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _makerSide | enum ITradePairs.Side | undefined |
| _makerAddr | address | undefined |
| _taker | address | undefined |
| _baseSymbol | bytes32 | undefined |
| _quoteSymbol | bytes32 | undefined |
| _baseAmount | uint256 | undefined |
| _quoteAmount | uint256 | undefined |
| _makerfeeCharged | uint256 | undefined |
| _takerfeeCharged | uint256 | undefined |

### addToken

```solidity
function addToken(bytes32 _symbol, address _tokenaddress, uint8 _decimals, enum ITradePairs.AuctionMode auctionMode) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |
| _tokenaddress | address | undefined |
| _decimals | uint8 | undefined |
| auctionMode | enum ITradePairs.AuctionMode | undefined |

### addTrustedContract

```solidity
function addTrustedContract(address _contract, string _organization) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | undefined |
| _organization | string | undefined |

### adjustAvailable

```solidity
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _transaction | enum IPortfolio.Tx | undefined |
| _trader | address | undefined |
| _symbol | bytes32 | undefined |
| _amount | uint256 | undefined |

### depositNative

```solidity
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address payable | undefined |
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |

### depositToken

```solidity
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |

### depositTokenFromContract

```solidity
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _from | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |

### getNative

```solidity
function getNative() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getTokenDetails

```solidity
function getTokenDetails(bytes32 _symbol) external view returns (address tokenAddress, uint8 decimals, enum ITradePairs.AuctionMode auctionMode)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokenAddress | address | undefined |
| decimals | uint8 | undefined |
| auctionMode | enum ITradePairs.AuctionMode | undefined |

### isTrustedContract

```solidity
function isTrustedContract(address _contract) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### lzForceResumeReceive

```solidity
function lzForceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | undefined |
| _srcAddress | bytes | undefined |

### lzRetryPayload

```solidity
function lzRetryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _srcChainId | uint16 | undefined |
| _srcAddress | bytes | undefined |
| _payload | bytes | undefined |

### pause

```solidity
function pause() external nonpayable
```






### pauseDeposit

```solidity
function pauseDeposit(bool _pause) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _pause | bool | undefined |

### processXFerPayload

```solidity
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _trader | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |
| _transaction | enum IPortfolio.Tx | undefined |

### removeToken

```solidity
function removeToken(bytes32 _symbol) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |

### removeTrustedContract

```solidity
function removeTrustedContract(address _contract) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _contract | address | undefined |

### setAuctionMode

```solidity
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | bytes32 | undefined |
| _mode | enum ITradePairs.AuctionMode | undefined |

### unpause

```solidity
function unpause() external nonpayable
```






### updateTransferFeeRate

```solidity
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _rate | uint256 | undefined |
| _rateType | enum IPortfolio.Tx | undefined |

### withdrawNative

```solidity
function withdrawNative(address payable _to, uint256 _quantity) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address payable | undefined |
| _quantity | uint256 | undefined |

### withdrawToken

```solidity
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _to | address | undefined |
| _symbol | bytes32 | undefined |
| _quantity | uint256 | undefined |
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |



## Events

### PortfolioUpdated

```solidity
event PortfolioUpdated(enum IPortfolio.Tx indexed transaction, address indexed wallet, bytes32 indexed symbol, uint256 quantity, uint256 feeCharged, uint256 total, uint256 available)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| transaction `indexed` | enum IPortfolio.Tx | undefined |
| wallet `indexed` | address | undefined |
| symbol `indexed` | bytes32 | undefined |
| quantity  | uint256 | undefined |
| feeCharged  | uint256 | undefined |
| total  | uint256 | undefined |
| available  | uint256 | undefined |



