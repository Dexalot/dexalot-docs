---
headerDepth: 4
---

# PortfolioSub

**Subnet Portfolio**

Receives messages from mainnet for deposits and sends withdraw requests to mainnet.  It also
   transfers tokens between traders as their orders gets matched.

**Dev notes:** \
Allows one to withdraw and deposit native token from/to the subnet wallet. Any other token has be be
deposited via PortfolioBridge using processXFerPayload function. It can only be invoked by a bridge
provider&#x27;s message receive event.
Any other token token including ALOT (native) can be withdrawn to mainnet using withdrawToken that will
send the holdings back to the user&#x27;s wallet in the mainnet.
TradePairs needs to have EXECUTOR_ROLE on PortfolioSub contract.
If a trader deposits a token and has 0 ALOT in his subnet wallet, this contract will make a call
to GasStation to deposit a small amount of ALOT to the user&#x27;s wallet to be used for gas.
In return, It will deduct a tiny amount of the token transferred.

## Struct Types

### AssetEntry



```solidity
struct AssetEntry {
  uint256 total;
  uint256 available;
}
```

## Enum Types

### AssetType



```solidity
enum AssetType {
  NATIVE,
  ERC20,
  NONE
}
```

## Variables

### Public

| Name | Type |
| --- | --- |
| EXECUTOR_ROLE | bytes32 |
| VERSION | bytes32 |
| assets | mapping(address &#x3D;&gt; mapping(bytes32 &#x3D;&gt; struct PortfolioSub.AssetEntry)) |
| depositFeeRate | uint256 |
| feeAddress | address |
| tokenTotals | mapping(bytes32 &#x3D;&gt; uint256) |
| totalNativeBurned | uint256 |
| walletBalanceDepositThreshold | uint256 |
| withdrawFeeRate | uint256 |



### Private

| Name | Type |
| --- | --- |
| gasStation | IGasStation |
| portfolioMinter | IPortfolioMinter |
| treasury | address |




## Methods

### Public

#### initialize

Initializer for upgradeable Portfolio Sub

**Dev notes:** \
Initializes with the native deposit threshold, users can deposit ALOT if they at least have 0.05 ALOT.

```solidity:no-line-numbers
function initialize(bytes32 _native, uint32 _chainId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _native | bytes32 | Native token of the chain |
| _chainId | uint32 |  |


#### addToken

Adds the given token to the portfolioSub with 0 address in the subnet.

**Dev notes:** \
Only callable by admin
We don't allow tokens with same symbols.
Native symbol is also added as a token with 0 address.
PortfolioSub keeps track of total deposited tokens in tokenTotals for sanity checks against mainnet
It has no ERC20 Contracts hence, it overwtires the addresses with address(0).
But PortfolioBridgeSub keeps all the symbols added from all different mainnet chains separately with
their original details including the addresses
except AVAX which passed with address(0).

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id, overwritten by srcChain of Portolio. Only used by PortfolioBridgeSub. |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |


#### removeToken

Remove IERC20 token from the tokenMap

**Dev notes:** \
tokenTotals for the symbol should be 0 before it can be removed
                Make sure that there are no in-flight deposit messages

```solidity:no-line-numbers
function removeToken(bytes32 _symbol) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |



### External

#### setFeeAddress


**Dev notes:** \
Only callable by the owner

```solidity:no-line-numbers
function setFeeAddress(address _feeAddress) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feeAddress | address | Address to collect trading fees |


#### setAuctionMode

Set auction mode for a token

**Dev notes:** \
Only callable by the default admin

```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _mode | enum ITradePairs.AuctionMode | New auction mode |


#### getBalance

Frontend function to show traders total and available balance for a token


```solidity:no-line-numbers
function getBalance(address _owner, bytes32 _symbol) external view returns (uint256 total, uint256 available, enum PortfolioSub.AssetType assetType)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| total | uint256 | Total balance of the trader |
| available | uint256 | Available balance of the trader |
| assetType | enum PortfolioSub.AssetType | Type of the token |

#### addExecution

Function for TradePairs to transfer tokens between addresses as a result of an execution

**Dev notes:** \
WHEN Increasing in addExectuion the amount is applied to both total and available
(so SafeIncrease can be used) as opposed to
WHEN Decreasing in addExectuion the amount is only applied to total. (SafeDecrease
can NOT be used, so we have safeDecreaseTotal instead)
i.e. (USDT 100 Total, 50 Available after we send a BUY order of 10 avax at 5$.
Partial Exec 5 at $5. Total goes down to 75. Available stays at 50)

```solidity:no-line-numbers
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerSide | enum ITradePairs.Side | Side of the maker |
| _makerAddr | address | Address of the maker |
| _takerAddr | address | Address of the taker |
| _baseSymbol | bytes32 | Symbol of the base token |
| _quoteSymbol | bytes32 | Symbol of the quote token |
| _baseAmount | uint256 | Amount of the base token |
| _quoteAmount | uint256 | Amount of the quote token |
| _makerfeeCharged | uint256 | Fee charged to the maker |
| _takerfeeCharged | uint256 | Fee charged to the taker |


#### processXFerPayload

Processes the message coming from the bridge

**Dev notes:** \
DEPOSIT messages are the only message that can be sent to the portfolio sub for the moment
Even when the contract is paused, this method is allowed for the messages that
are in flight to complete properly.
CAUTION: if Paused for upgrade, wait to make sure no messages are in flight, then upgrade.

```solidity:no-line-numbers
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _transaction | enum IPortfolio.Tx | Transaction type |


#### lzRecoverPayload

Recovers the stucked message from the LZ bridge, returns the funds to the depositor/withdrawer

**Dev notes:** \
Only call this just before calling force resume receive function for the LZ bridge
Only the DEFAULT_ADMIN can call this function

```solidity:no-line-numbers
function lzRecoverPayload(bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload of the message |


#### depositNative

This function is only used to deposit native ALOT from the subnet wallet


```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address payable | Address of the depositor |
|  | enum IPortfolioBridge.BridgeProvider |  |


#### withdrawNative

This function is used to withdraw only native ALOT to the subnet wallet

**Dev notes:** \
This function decreases ALOT balance of the user and calls the PortfolioMinter to mint the native ALOT

```solidity:no-line-numbers
function withdrawNative(address payable _to, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address payable | Address of the withdrawer |
| _quantity | uint256 | Amount of the native ALOT to withdraw |


#### withdrawToken

Withdraws the token to the mainnet


```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the withdrawer |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum bridge type |


#### adjustAvailable

Function for TradePairs to adjust total and available as a result of an order update


```solidity:no-line-numbers
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |


#### transferToken

Transfers token from the `msg.sender`'s portfolio to `_to`'s portfolio

**Dev notes:** \
This is not a ERC20 transfer, this is a balance transfer between portfolios

```solidity:no-line-numbers
function transferToken(address _to, bytes32 _symbol, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the receiver |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |


#### withdrawFees

Withdraws collected fees to the mainnet

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function withdrawFees() external
```


#### getGasStation



```solidity:no-line-numbers
function getGasStation() external view returns (contract IGasStation)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IGasStation | IGasStation  Gas station contract |

#### setGasStation

Sets the gas station contract

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setGasStation(contract IGasStation _gasStation) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gasStation | contract IGasStation | Gas station contract to be set |


#### getTreasury



```solidity:no-line-numbers
function getTreasury() external view returns (address)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address  Address of the treasury wallet |

#### setTreasury

Sets the treasury wallet

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setTreasury(address _treasury) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _treasury | address | Address of the treasury wallet |


#### getPortfolioMinter



```solidity:no-line-numbers
function getPortfolioMinter() external view returns (contract IPortfolioMinter)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IPortfolioMinter | IPortfolioMinter  Portfolio minter contract |

#### setPortfolioMinter

Sets the portfolio minter contract

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setPortfolioMinter(contract IPortfolioMinter _portfolioMinter) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioMinter | contract IPortfolioMinter | Portfolio minter contract to be set |


#### setWalletBalanceDepositThreshold

Sets wallet balance deposit thresholds

**Dev notes:** \
This threshold checks the users remaining native balance while depositing native from subnet wallet.

```solidity:no-line-numbers
function setWalletBalanceDepositThreshold(uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | Amount of native token to be set as threshold |


#### updateTransferFeeRate

Updates the transfer fee rate for the given Tx type

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rate | uint256 | Transfer fee rate to be set |
| _rateType | enum IPortfolio.Tx | Tx type for which the transfer fee rate is to be set |


#### getToken


**Dev notes:** \
Only valid for the mainnet. Implemented with an empty block here.

```solidity:no-line-numbers
function getToken(bytes32 _symbol) external view returns (contract IERC20Upgradeable)
```


#### depositToken


**Dev notes:** \
Only valid for the mainnet. Implemented with an empty block here.

```solidity:no-line-numbers
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider) external
```


#### depositTokenFromContract


**Dev notes:** \
Only valid for the mainnet. Implemented with an empty block here.

```solidity:no-line-numbers
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external
```



### Internal

#### getSwapAmount

Returns the swap amount for the given gas amount

**Dev notes:** \
Calculates the swap amount for each token for the given gas amount

```solidity:no-line-numbers
function getSwapAmount(bytes32 _symbol, uint256 _gasAmount) internal view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _gasAmount | uint256 | Amount of gas to be swapped |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Amount of the token to be swapped |

#### addIERC20

Add IERC20 token to the tokenMap


```solidity:no-line-numbers
function addIERC20(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Token symbol |
| _tokenaddress | address | Mainnet token address or zero address for AVAX |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Token decimals |
|  | enum ITradePairs.AuctionMode |  |


#### removeIERC20


**Dev notes:** \
Only valid for the mainnet. Implemented with an empty block here.

```solidity:no-line-numbers
function removeIERC20(bytes32 _symbol) internal
```



### Private

#### safeIncrease

Increases the balance of the user

**Dev notes:** \
`_feeCharged` is deducted from the `_amount` before it is reflected in the user's balance
`_feeCharged` is transferred to feeAddress
Adds to tokenTotals: cumulative deposits per symbol for sanity checks with the mainnet

```solidity:no-line-numbers
function safeIncrease(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the _transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |


#### safeDecreaseTotal

Decreases the total balance of the user

**Dev notes:** \
`_feeCharged` is passed here for information purposes to be included in the event
`_feeCharged` does not change the user balance inside this function
Removes from tokenTotals: cumulative deposits per symbol for sanity checks with the mainnet

```solidity:no-line-numbers
function safeDecreaseTotal(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |


#### safeDecrease

Decreases the available balance of the user


```solidity:no-line-numbers
function safeDecrease(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |


#### transferToken



```solidity:no-line-numbers
function transferToken(address _from, address _to, bytes32 _symbol, uint256 _quantity, uint256 _feeCharged, enum IPortfolio.Tx _transaction, bool _decreaseTotalOnly) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the sender |
| _to | address | Address of the receiver |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _decreaseTotalOnly | bool | If true, only total balance is decreased |


#### safeTransferFee

Transfers the fees collected to the fee address


```solidity:no-line-numbers
function safeTransferFee(bytes32 _symbol, uint256 _feeCharged) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _feeCharged | uint256 | Fee charged for the transaction |


#### emitPortfolioEvent

Wrapper for emit event


```solidity:no-line-numbers
function emitPortfolioEvent(address _trader, bytes32 _symbol, uint256 _quantity, uint256 _feeCharged, enum IPortfolio.Tx _transaction) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token used in the transaction |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |


