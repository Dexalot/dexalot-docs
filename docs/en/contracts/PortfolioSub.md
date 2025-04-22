---
headerDepth: 4
---

# PortfolioSub

**Dexalot L1(previously subnet) Portfolio**

Receives deposits messages from the mainnets and sends withdraw requests back to any mainnet.
It also transfers tokens between traders as their orders gets matched.

**Dev notes:** \
Allows only the native token to be withdrawn and deposited from/to the L1 wallet. Any other
token deposit has to be done via PortfolioMain&#x27;s deposit functions that sends a message via the bridge.
When the bridge&#x27;s message receive event emitted PortfolioBridgeSub invokes processXFerPayload \
All tokens including ALOT (native) can be withdrawn to mainnet using withdrawToken that will
send the funds back to the user&#x27;s wallet in the mainnet. \
TradePairs needs to have EXECUTOR_ROLE on PortfolioSub contract. \
*******Gas Abstraction*********
If a trader deposits an XX token and has 0 ALOT in his Dexalot L1(subnet) wallet(Gas Tank), this contract
will make a call to GasStation to deposit a small amount of ALOT to the user&#x27;s Gas Tank to be used for gas.
In return, It will deduct a tiny amount of the XX token transferred. This feature is called AutoFill
and it aims shield the clients from gas Token management in the Dexalot L1(subnet).
It is suffice to set usedForGasSwap&#x3D;false for all tokens to disable autofill using tokens. ALOT can and
will always be used for this purpose.
Similarly autofill will kick-in if the user&#x27;s balance falls below the set threshold, during the normal
trading activity and will continue to deposit small amounts to the user&#x27;s Gas Tank. See autoFillPrivate

## Struct Types

### AssetEntry

```solidity
struct AssetEntry {
  uint256 total;
  uint256 available;
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
| portfolioSubHelper | contract IPortfolioSubHelper |
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
Calling this function also removes the token from portfolioBridge. If multiple tokens in the
portfolioBridgeSub shares the Dexalot L1(subnet) symbol, the symbol is not deleted from the PortfolioSub

```solidity:no-line-numbers
function removeToken(bytes32 _srcChainSymbol, uint32 _srcChainId, bytes32 _subnetSymbol) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _srcChainId | uint32 | Source Chain id of the token to be removed. Used by PortfolioBridgeSub. Don't use the Dexalot L1(subnet) id here. Always use the chain id that the token is being removed. Otherwise it will silently fail as it can't find the token to delete in PortfolioBridgeSub |
| _subnetSymbol | bytes32 | Dexalot L1(subnet) Symbol of the token |

### External

#### addToken

Adds the given token to the portfolio

**Dev notes:** \
Only callable by admin.
We don't allow tokens with the same symbols but different addresses.
Native symbol is also added by default with 0 address.

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, uint8 _l1Decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio, bytes32 _subnetSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
| _l1Decimals | uint8 |  |
| _mode | enum ITradePairs.AuctionMode | Starting auction mode of the token |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |
| _subnetSymbol | bytes32 | Dexalot L1(subnet) Symbol of the token |

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
Only callable by the default admin or TradePairs

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
function getBalance(address _owner, bytes32 _symbol) external view returns (uint256 total, uint256 available, enum IPortfolioSub.AssetType assetType)
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
| assetType | enum IPortfolioSub.AssetType | Type of the token |

#### addExecution

Function for TradePairs to transfer tokens between addresses as a result of an execution

**Dev notes:** \
This function calculates the fee to be applied to the orders and it also looks up if
a rate override mapping.
WHEN Increasing in addExecution the amount is applied to both total and available
(so SafeIncrease can be used) as opposed to
WHEN Decreasing in addExecution the amount is only applied to total. (SafeDecrease
can NOT be used, so we have safeDecreaseTotal instead)
i.e. (USDT 100 Total, 50 Available after we send a BUY order of 10 avax at 5$.
Partial Exec 5 at $5. Total goes down to 75. Available stays at 50)

```solidity:no-line-numbers
function addExecution(bytes32 _tradePairId, struct ITradePairs.TradePair _tradePair, enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, uint256 _baseAmount, uint256 _quoteAmount) external returns (uint256 makerfee, uint256 takerfee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 |  |
| _tradePair | struct ITradePairs.TradePair | TradePair struct |
| _makerSide | enum ITradePairs.Side | Side of the maker |
| _makerAddr | address | Address of the maker |
| _takerAddr | address | Address of the taker |
| _baseAmount | uint256 | Amount of the base token |
| _quoteAmount | uint256 | Amount of the quote token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| makerfee | uint256 | Maker fee |
| takerfee | uint256 | Taker fee |

#### processXFerPayload

Processes the message coming from the bridge

**Dev notes:** \
DEPOSIT message is the only message that can be sent to portfolioSub for the moment
Even when the contract is paused, this method is allowed for the messages that
are in flight to complete properly.
CAUTION: if Paused for upgrade, wait to make sure no messages are in flight, then upgrade.

```solidity:no-line-numbers
function processXFerPayload(struct IPortfolio.XFER _xfer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | Transfer message |

#### autoFill

Deposits small amount of gas Token (ALOT) to trader's wallet in exchange of the token
held in the trader's portfolio. (It can by any token including ALOT)

**Dev notes:** \
Only called by addOrderPrivate, doCancelOrder from TradePairs.
doCancelOrder is a good place to auto Fill Gas Tank with newly available funds.

```solidity:no-line-numbers
function autoFill(address _trader, bytes32 _symbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol to be used in exchange of Gas Token. ALOT or any other |

#### depositNative

This function is only used to deposit native ALOT from the Dexalot L1(subnet) wallet to
the portfolio. Also referred as RemoveGas

```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address payable | Address of the depositor |
|  | enum IPortfolioBridge.BridgeProvider |  |

#### withdrawNative

This function is used to withdraw only native ALOT from the portfolio
into the Dexalot L1(subnet) wallet. Also referred as AddGas

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

Withdraws token to an evm destination chain

```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the withdrawer |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum bridge type |
| _dstChainListOrgChainId | uint32 | Destination chain the token is being withdrawn |

#### withdrawToken

Withdraws token to any destination chain including options

```solidity:no-line-numbers
function withdrawToken(address _from, bytes32 _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes1 _options) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Source address of the withdrawer |
| _to | bytes32 | Bytes32 destination address of the withdrawer |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum bridge type |
| _dstChainListOrgChainId | uint32 | Destination chain the token is being withdrawn |
| _options | bytes1 | Options for the withdrawal transaction |

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
This is not a ERC20 transfer, this is a balance transfer between 2 address within the portfolio

```solidity:no-line-numbers
function transferToken(address _to, bytes32 _symbol, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the receiver |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of the token |

#### getBalances

Function to show Trader's balances for all available tokens.

**Dev notes:** \
If you pass pageNo == 0 it will scan all available tokens but as the tokenlist grows,
it may eventually run out of gas. Use _pageNo in this case to get 50 tokens at a time.
The returned arrays will be ordered to have the tokens with balances first then empty entries
next. You can discard all the entries starting from when symbols[i] == bytes32(0)
or total[i] == 0

```solidity:no-line-numbers
function getBalances(address _owner, uint256 _pageNo) external view returns (bytes32[] symbols, uint256[] total, uint256[] available)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | Address of the trader |
| _pageNo | uint256 | Page no for pagination |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| symbols | bytes32[] | Array of Symbol |
| total | uint256[] | Array of Totals |
| available | uint256[] | Array of availables |

#### setPortfolioSubHelper

Sets the Rebate Accounts contract

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setPortfolioSubHelper(contract IPortfolioSubHelper _portfolioSubHelper) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioSubHelper | contract IPortfolioSubHelper | Rebate Accounts contract to be set |

#### getPortfolioSubHelper

```solidity:no-line-numbers
function getPortfolioSubHelper() external view returns (contract IPortfolioSubHelper)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IPortfolioSubHelper | IPortfolioSubHelper  PortfolioSubHelper contract |

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

Adds the given token to the portfolioSub with 0 address in the Dexalot L1(subnet).

**Dev notes:** \
This function is only callable by admin. \
We don't allow tokens with same symbols. \
Native symbol is also added as a token with 0 address. \
PortfolioSub keeps track of total deposited tokens in tokenTotals for sanity checks against mainnet. It has
no ERC20 Contracts hence, it overwrites the addresses with address(0) and isVirtual =true except native ALOT. \
It also adds the token to the PortfolioBridgeSub with the proper sourceChainid
Tokens in PortfolioSub has ZeroAddress but PortfolioBridgeMain has the proper address from each chain
Sample Token List in PortfolioSub: \
Symbol, SymbolId, Decimals, address, auction mode (432204: Dexalot L1 ChainId) \
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
function addTokenInternal(struct IPortfolio.TokenDetails _details, uint256 _fee, uint256 _gasSwapRatio) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _details | struct IPortfolio.TokenDetails | Token Details |
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

#### calculateFee

Calculates the commission

**Dev notes:** \
Commissions are rounded down based on evm and display decimals to avoid DUST

```solidity:no-line-numbers
function calculateFee(struct ITradePairs.TradePair _tradePair, enum ITradePairs.Side _side, uint256 _quantity, uint256 _quoteAmount, uint256 _rate) private pure returns (uint256 lastFeeRounded)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePair | struct ITradePairs.TradePair | TradePair struct |
| _side | enum ITradePairs.Side | order side |
| _quantity | uint256 | execution quantity |
| _quoteAmount | uint256 | quote amount |
| _rate | uint256 | taker or maker rate |

#### autoFillPrivate

Deposits small amount of gas Token (ALOT) to trader's wallet in exchange of the token
held in the trader's portfolio. (It can be any token including ALOT)

**Dev notes:** \
Allow only when the traders total ALOT holdings < gasAmount
Minimal use of require statements, and lots of if checks to avoid blocking the bridge as it is
also called by processXFerPayload \
Users will always have some ALOT deposited to their gasTank if they start from the mainnet with any token
Hence it is not possible to have a portfolioSub holding without gas in the GasTank
In other words: if assets[_trader][_symbol].available > 0 then _trader.balance will be > 0 \
Same in the scenario when person A sends tokens to person B who has no gas in his gasTank
using transferToken in the Dexalot L1(subnet) because autoFillPrivate is also called
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
| tankFull | bool | Trader's Gas Tank status |

#### withdrawNativePrivate

See withdrawNative

```solidity:no-line-numbers
function withdrawNativePrivate(address _to, uint256 _quantity) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the withdrawer |
| _quantity | uint256 | Amount of the native ALOT to withdraw |

#### safeIncrease

Increases the balance of the user

**Dev notes:** \
`_feeCharged` is deducted from the `_amount` before it is reflected in the user's balance
`_feeCharged` is transferred to feeAddress
Adds to tokenTotals: cumulative deposits per symbol for sanity checks with the mainnet

```solidity:no-line-numbers
function safeIncrease(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction, address _traderOther) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the _transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _traderOther | address |  |

#### safeDecreaseTotal

Decreases the total balance of the user

**Dev notes:** \
`_feeCharged` is passed here for information purposes to be included in the event
`_feeCharged` does not change the user balance inside this function
Removes from tokenTotals: cumulative deposits per symbol for sanity checks with the mainnet

```solidity:no-line-numbers
function safeDecreaseTotal(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction, address _traderOther) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _traderOther | address |  |

#### safeDecrease

Decreases the available balance of the user

```solidity:no-line-numbers
function safeDecrease(address _trader, bytes32 _symbol, uint256 _amount, uint256 _feeCharged, enum IPortfolio.Tx _transaction, address _traderOther) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _amount | uint256 | Amount of the token |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _traderOther | address |  |

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

Transfers the fees collected to the fee or treasury address

```solidity:no-line-numbers
function safeTransferFee(address _to, bytes32 _symbol, uint256 _feeCharged) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | fee or treasury address |
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
function emitPortfolioEvent(address _trader, bytes32 _symbol, uint256 _quantity, uint256 _feeCharged, enum IPortfolio.Tx _transaction, address _traderOther) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token used in the transaction |
| _feeCharged | uint256 | Fee charged for the transaction |
| _transaction | enum IPortfolio.Tx | Transaction type |
| _traderOther | address |  |

