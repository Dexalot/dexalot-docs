---
headerDepth: 4
---

# PortfolioSub

**Subnet Portfolio**

Receives messages from mainnet for deposits and sends withdraw requests to mainnet.  It also
   transfers tokens between traders as their orders gets matched.

**Dev notes:** \
Allows only the native token to be withdrawn and deposited from/to the subnet wallet. Any other
token has to be deposited via PortfoliMain deposit functions that sends a message via the bridge.
When the bridge&#x27;s message receive event emitted PortfolioBridgeSub invokes processXFerPayload \
All tokens including ALOT (native) can be withdrawn to mainnet using withdrawToken that will
send the holdings back to the user&#x27;s wallet in the mainnet. \
TradePairs needs to have EXECUTOR_ROLE on PortfolioSub contract. \
If a trader deposits a token and has 0 ALOT in his subnet wallet, this contract will make a call
to GasStation to deposit a small amount of ALOT to the user&#x27;s wallet to be used for gas.
In return, It will deduct a tiny amount of the token transferred. This feature is called AutoFill
and it aims shield the clients from gas Token managment in the subnet.
It is suffice to set usedForGasSwap&#x3D;false for all tokens to disable autofill using tokens. ALOT can and
will always be used for this purpose.

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
| feeAddress | address |
| tokenTotals | mapping(bytes32 &#x3D;&gt; uint256) |
| totalNativeBurned | uint256 |

### Private

| Name | Type |
| --- | --- |
| gasStation | contract IGasStation |
| portfolioMinter | contract IPortfolioMinter |
| treasury | address |

## Methods

### Public

#### initialize

Initializer for upgradeable Portfolio Sub

```solidity:no-line-numbers
function initialize(bytes32 _native, uint32 _chainId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _native | bytes32 | Native token of the chain |
| _chainId | uint32 | ChainId of the chain |

#### removeToken

Remove token from the tokenMap

**Dev notes:** \
tokenTotals for the symbol should be 0 before it can be removed
Make sure that there are no in-flight deposit messages.
Calling this function also removes the token from portfolioBridge.

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _srcChainId | uint32 | Source Chain id of the token to be removed. Used by PortfolioBridgeSub. |

### External

#### setFeeAddress

Trading commissions are collected in this account.

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
DEPOSIT/RECOVERFUNDS messages are the only messages that can be sent to the portfolio sub for the moment
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

#### autoFill

Deposits small amount of gas Token (ALOT) to trader's wallet in exchange of the token
held in the trader's portfolio. (It can by any token including ALOT)

**Dev notes:** \
Only called by TradePairs from doCancelOrder. Cancels makes tokens available.
doCancelOrder is a good place to auto Fill Gas Tank with newly available funds.

```solidity:no-line-numbers
function autoFill(bytes32 _symbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol to be used in exchange of Gas Token. ALOT or any other |

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

Withdraws collected fees from the feeAdress or treasury to the mainnet

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function withdrawFees(address _from, uint8 _maxCount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | address that can withdraw collected fees |
| _maxCount | uint8 | maximum number of ERC20 tokens with a non-zero balance to process at one time |

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

Sets the treasury wallet. Tokens collected here for ALOT deposited in clients GasTank

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

### Internal

#### addTokenInternal

Adds the given token to the portfolioSub with 0 address in the subnet.

**Dev notes:** \
This function is only callable by admin. \
We don't allow tokens with same symbols. \
Native symbol is also added as a token with 0 address. \
PortfolioSub keeps track of total deposited tokens in tokenTotals for sanity checks against mainnet.
It has no ERC20 Contracts hence, it overwrites the addresses with address(0). \
It also adds the token to the PortfolioBridgeSub with the proper sourceChainid
Tokens in PorfolioSub has ZeroAddress but PortfolioBridge has the proper address from each chain
Sample Token List in PortfolioSub: \
Symbol, SymbolId, Decimals, address, auction mode (432204: Dexalot Subnet ChainId) \
ALOT ALOT432204 18 0x0000000000000000000000000000000000000000 0 \
AVAX AVAX432204 18 0x0000000000000000000000000000000000000000 0 \
BTC.b BTC.b432204 8 0x0000000000000000000000000000000000000000 0 \
DEG DEG432204 18 0x0000000000000000000000000000000000000000 2 \
LOST LOST432204 18 0x0000000000000000000000000000000000000000 0 \
SLIME SLIME432204 18 0x0000000000000000000000000000000000000000 0 \
USDC USDC432204 6 0x0000000000000000000000000000000000000000 0 \
USDt USDt432204 6 0x0000000000000000000000000000000000000000 0 \
WETH.e WETH.e432204 18 0x0000000000000000000000000000000000000000 0 \

```solidity:no-line-numbers
function addTokenInternal(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain Id, overwritten by srcChain of Portolio but used when adding it to PortfolioBridgeSub. |
| _decimals | uint8 | Decimals of the token |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |

#### setBridgeParamInternal

Sets the bridge provider fee & gasSwapRatio per ALOT for the given token and usedForGasSwap flag

**Dev notes:** \
Called by Portfolio.initialize() as well as setBridgeParam()
For auction tokens or any non major tokens this needs to be set as gasSwapRatio =0 & usedForGasSwap= false
Because we don't want to swap gas with any thinly traded tokens or tokens with high volatility
gasSwapRatio will be updated multiple times a day with an offchain app with the current market prices
except for ALOT which is always 1 to 1 and minors (usedForGasSwap==false).
amount of gas swapped is quite miniscule (0.1 ALOT is set in GasStation $0.014 as of 2022-12-07 )

```solidity:no-line-numbers
function setBridgeParamInternal(bytes32 _symbol, uint256 _fee, uint256 _gasSwapRatio, bool _usedForGasSwap) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT. Always set it to equivalent of 1 ALOT. |
| _usedForGasSwap | bool | bool to control the list of tokens that can be used for gas swap. Mostly majors |

### Private

#### autoFillPrivate

Deposits small amount of gas Token (ALOT) to trader's wallet in exchange of the token
held in the trader's portfolio. (It can be any token including ALOT)

**Dev notes:** \
Allow only when the traders total ALOT holdings < gasAmount
Minimal use of require statements, and lots of if checks to avoid blocking the bridge as it is
also called by processXFerPayload \
Users will always have some ALOT deposited to their gasTank if they start from the mainnet with any token
Hence it is not possible to have a porfolioSub holding without gas in the GasTank
In other words: if assets[_trader][_symbol].available > 0 then _trader.balance will be > 0 \
Same in the scenario when person A sends tokens to person B who has no gas in his gasTank
using transferToken in the subnet because autoFillPrivate is also called
if the recipient has ALOT in his portfolio, his ALOT inventory is used to deposit to wallet even when a
different token is sent, so swap doesn't happen in this case. \
Swap happens using the token sent only when there is not enough ALOT in the recipient portfolio and wallet

```solidity:no-line-numbers
function autoFillPrivate(address _trader, bytes32 _symbol, enum IPortfolio.Tx _transaction) private returns (bool tankFull)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token. ALOT or any other |
| _transaction | enum IPortfolio.Tx | Transaction type |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tankFull | bool | Tranders Gas Tank status |

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

#### getSwapAmount

Returns the amount of token to be deducted from user's holding for a given gas amount(in ALOT terms)

**Dev notes:** \
Calculates the swap amount for each token for the given gas amount

```solidity:no-line-numbers
function getSwapAmount(bytes32 _symbol, uint256 _gasAmount) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _gasAmount | uint256 | Amount of gas to be swapped (in ALOT terms) |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Amount of the token to be swapped |

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

