---
headerDepth: 4
---

# ExchangeSub

**Dexalot L1 Exchange**

This contract is the Dexalot L1 version of the Dexalot Exchange. \
*********** Dexalot Discovery (DD) Auction: Overview and Workflow \
Dexalot Discovery (DD) is a specialized launchpad mechanism on the Dexalot L1 designed to facilitate new token launches.
By utilizing an Omni-Vault and an off-chain Omni-Trader, projects can provide initial liquidity and manage price discovery through
automated bonding curves. \
*** Core Objectives: \
The smart contract logic focuses on two primary goals: \
Asset Control: Restricting the movement (withdrawals/transfers) of the auction token to prevent external market distortion
(e.g., rogue AMM pools). \
Order Book Integrity: Limiting order &quot;posting&quot; (market making) exclusively to the Omni-Vault to ensure a controlled discovery process. \
*** The Launch Process: \
Setup: Once Dexalot admins approve an Omni-Vault request, the token is added to the PortfolioMain, and initial liquidity is deposited
into the L1 vault. \
Omni-Trader Assignment: An off-chain component is assigned to the project to manage prices and quantities based on predefined bonding
curves and real-time supply/demand. \
Active Auction: While the auction is OPEN, the Omni-Trader is the sole market maker. Participants cannot post their own limit orders;
they can only trade against the Omni-Trader’s existing bids and asks (hitting the bid or lifting the ask). \

Graduation: Once the token reaches a specific market cap milestone, the order book transitions to a standard open market where all
users can post orders and transfer tokens freely. \
*** Auction Stages &amp; Transitions: \
Stage 1:    OPEN         Controlled Discovery. Only the Omni-Vault can post orders. Users trade via Limit IOC (Immediate-or-Cancel)
                         orders against the vault. Withdrawals/transfers are disabled. \
Stage 1A:   LIVETRADING  Early Trading (Optional). Anyone can post orders or market make, but the token remains locked within the
                         Dexalot ecosystem (no withdrawals/transfers). \
Stage 2:    OFF          Full Graduation. The auction concludes. The token is available for regular trading and Simple Swaps.
                         All transfer and withdrawal restrictions are lifted. The pair will also be offered in Simple Swap \
@dev
*** Security &amp; Integration: \
Privileged Access: The AUCTION_ADMIN manages transitions, while ExchangeSub holds administrative rights over portfolio and
trading pairs to ensure smooth operation. \
Trusted Deposits: To facilitate pre-sale participants, specific contracts (like Avalaunch or Dexalot TokenVesting) are
authorized to deposit tokens on behalf of users before the Token Generation Event (TGE). \
Anti-Manipulation: By disabling transfers during the auction, Dexalot prevents the formation of external liquidity pools
that could interfere with fair price discovery. \

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Private

| Name | Type |
| --- | --- |
| orderBooks | contract OrderBooks |
| tradePairs | contract ITradePairs |

## Events

### TradePairsSet

```solidity:no-line-numbers
event TradePairsSet(contract ITradePairs _oldTradePairs, contract ITradePairs _newTradePairs)
```

## Methods

### Public

#### pauseTrading

Un(pause) all trading functionality for all pairs

**Dev notes:** \
No new orders or cancellations allowed

```solidity:no-line-numbers
function pauseTrading(bool _tradingPause) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradingPause | bool | true to pause trading, false to unpause |

### External

#### pauseForUpgrade

(Un)pauses portfolioSub and portfolioBridgeSub and TradePairs contracts for upgrade

```solidity:no-line-numbers
function pauseForUpgrade(bool _pause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pause | bool | true to pause, false to unpause |

#### setOrderBooks

Set the address of the OrderBooks contract

**Dev notes:** \
Needed to initiate match auction orders

```solidity:no-line-numbers
function setOrderBooks(address _orderbooks) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderbooks | address | Address of the OrderBooks contract |

#### getOrderBooks

Gest the address of the OrderBooks contract

```solidity:no-line-numbers
function getOrderBooks() external view returns (address)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address  Address of the OrderBooks contract |

#### setTradePairs

Sets trade pairs contract

```solidity:no-line-numbers
function setTradePairs(contract ITradePairs _tradePairs) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairs | contract ITradePairs | address of the trade pairs contract |

#### getTradePairsAddr

```solidity:no-line-numbers
function getTradePairsAddr() external view returns (contract ITradePairs)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract ITradePairs | ITradePairs  trade pairs contract |

#### pauseTradePair

Un(pause) all trading functionality for a trade pair. Affects both addorder and cancelorder functions.

**Dev notes:** \
No new orders or cancellations allowed for the given pair

```solidity:no-line-numbers
function pauseTradePair(bytes32 _tradePairId, bool _tradePairPause) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _tradePairPause | bool | true to pause trading, false to unpause |

#### updateAllRates

Update all commissions rates of all trading pairs all at once

```solidity:no-line-numbers
function updateAllRates(uint8 _makerRate, uint8 _takerRate) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |

#### addToken

Add new token to portfolio

**Dev notes:** \
Exchange needs to be DEFAULT_ADMIN on the Portfolio

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, uint8 _l1Decimals, enum ITradePairs.AuctionMode _mode, uint256 _fee, uint256 _gasSwapRatio, bytes32 _subnetSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _tokenaddress | address | address of the token |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | decimals of the token |
| _l1Decimals | uint8 | decimals of the token on Dexalot L1 |
| _mode | enum ITradePairs.AuctionMode | starting auction mode |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |
| _subnetSymbol | bytes32 | Subnet Symbol of the token |

#### addTradePair

Adds a new trading pair to the exchange.

**Dev notes:** \
Both the base and quote symbol must exist in the PortfolioSub otherwise it will revert.
Both `DEFAULT_ADMIN_ROLE` and `AUCTION_ADMIN_ROLE` can add a new trading pair.

```solidity:no-line-numbers
function addTradePair(bytes32 _tradePairId, bytes32 _baseSymbol, uint8 _baseDisplayDecimals, bytes32 _quoteSymbol, uint8 _quoteDisplayDecimals, uint256 _minTradeAmount, uint256 _maxTradeAmount, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the new trading pair |
| _baseSymbol | bytes32 | symbol of the base token |
| _baseDisplayDecimals | uint8 | display decimals of the base token |
| _quoteSymbol | bytes32 | symbol of the quote token |
| _quoteDisplayDecimals | uint8 | display decimals of the quote token |
| _minTradeAmount | uint256 | minimum trade amount |
| _maxTradeAmount | uint256 | maximum trade amount |
| _mode | enum ITradePairs.AuctionMode | auction mode |

#### setAuctionMode

Sets auction mode for a trading pair and its basetoken in the PortfolioSUb.

```solidity:no-line-numbers
function setAuctionMode(bytes32 _tradePairId, enum ITradePairs.AuctionMode _mode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _mode | enum ITradePairs.AuctionMode | auction mode |

#### updateRate

Update maker and taker fee rates for execution

```solidity:no-line-numbers
function updateRate(bytes32 _tradePairId, uint8 _rate, enum ITradePairs.RateType _rateType) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _rate | uint8 | fee rate |
| _rateType | enum ITradePairs.RateType | rate type, maker or taker |

#### updateRates

Update maker and taker fee rates for execution

```solidity:no-line-numbers
function updateRates(bytes32 _tradePairId, uint8 _makerRate, uint8 _takerRate) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _makerRate | uint8 | maker fee rate |
| _takerRate | uint8 | taker fee rate |

#### setAuctionVaultAdress

Sets the OmniVault address that will run the auction

```solidity:no-line-numbers
function setAuctionVaultAdress(bytes32 _tradePairId, address _omniVaultAdress) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _omniVaultAdress | address | omniVault address |

#### setMinTradeAmount

Sets minimum trade amount for a trade pair

```solidity:no-line-numbers
function setMinTradeAmount(bytes32 _tradePairId, uint256 _minTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _minTradeAmount | uint256 | minimum trade amount |

#### getMinTradeAmount

```solidity:no-line-numbers
function getMinTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  minimum trade amount |

#### setMaxTradeAmount

Sets maximum trade amount for a trade pair

```solidity:no-line-numbers
function setMaxTradeAmount(bytes32 _tradePairId, uint256 _maxTradeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |
| _maxTradeAmount | uint256 | maximum trade amount |

#### getMaxTradeAmount

```solidity:no-line-numbers
function getMaxTradeAmount(bytes32 _tradePairId) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tradePairId | bytes32 | id of the trading pair |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  maximum trade amount |

### Private

#### checkMirrorPair

Checks to see if a mirror pair exists

**Dev notes:** \
Checks to see if USDC/AVAX exists when trying to add AVAX/USDC
Mirror pairs are not allowed to avoid confusion from a user perspective.

```solidity:no-line-numbers
function checkMirrorPair(bytes32 _baseSymbol, bytes32 _quoteSymbol) private view
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _baseSymbol | bytes32 | base Symbol of the pair to be added |
| _quoteSymbol | bytes32 | quote Symbol of the pair to be added |

