---
headerDepth: 4
---

# FeeCollector

**Protocol fee collector**

Set as PortfolioSub.feeAddress. Trading fees are credited here by PortfolioSub.safeTransferFee
and DexalotRFQ fees arrive via OmniVaultExecutorSub.collectSwapFees. Neither emits an event to this
contract, so epoch accounting works from balance snapshots rather than events.

**Dev notes:** \
The collector is passive: between closes it only receives, and closeEpoch pushes everything out,
which is what makes a snapshot unambiguous. At close the basket is valued in USD and the operating
budget is drawn in kind in a configured priority order, stables first, so the operating share never
touches the orderbook. Whatever is left goes to the buyback vault.
Prices are a standing input maintained separately from the close so closeEpoch stays permissionless.
The USD value written at close doubles as an on chain cost basis for a later conversion.
There is no generic withdraw. Value leaves only via the two configured destinations.
Requires PortfolioSub&#x27;s AUCTION_TRANSFER_ROLE, otherwise a token entering auction reverts the close
with P-AUCT-01.

## Variables

### Public

| Name | Type |
| --- | --- |
| EPOCH_DURATION | uint256 |
| MAX_PRICE_AGE | uint256 |
| MAX_WEEKLY_OPEX_BUDGET | uint256 |
| PRICE_FEEDER_ROLE | bytes32 |
| TENK | uint256 |
| VERSION | bytes32 |
| buybackVault | address |
| genesis | uint256 |
| nextEpochToClose | uint256 |
| opexOrder | bytes32[] |
| portfolio | contract IPortfolioSub |
| prices | mapping(bytes32 &#x3D;&gt; uint256) |
| pricesUpdatedAt | uint256 |
| treasury | address |
| weeklyOpexBudget | uint256 |

## Events

### EpochClosed

Emitted once per closeEpoch call. The summary line for an epoch.

```solidity:no-line-numbers
event EpochClosed(uint256 fromEpoch, uint256 toEpoch, uint256 basketValue, uint256 opexFunded, uint256 shortfall)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| fromEpoch | uint256 | First epoch settled by this call |
| toEpoch | uint256 | Last epoch settled by this call. Greater than fromEpoch when closes were missed. |
| basketValue | uint256 | Total USD value of everything settled, 1e18 scale |
| opexFunded | uint256 | USD value drawn to the treasury |
| shortfall | uint256 | Budget the basket could not cover. Non zero means a lean epoch. |
### TokenSettled

Emitted once per token per close. The complete accrual record for that token.

**Dev notes:** \
One event rather than a separate valuation and one leg per destination, so an indexer
gets accrual, cost basis and distribution from a single row. `price` is the on chain cost basis:
comparing it against the execution price of a later conversion gives realised P&L from events
alone. toTreasury + toBuyback always equals quantity.

```solidity:no-line-numbers
event TokenSettled(uint256 epoch, bytes32 symbol, uint256 quantity, uint256 price, uint256 toTreasury, uint256 toBuyback)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| epoch | uint256 | Epoch being settled |
| symbol | bytes32 | Symbol settled |
| quantity | uint256 | Amount held at close |
| price | uint256 | USD per whole token, 1e18 scale, used for this close |
| toTreasury | uint256 | Amount sent to the treasury in kind |
| toBuyback | uint256 | Amount sent to the buyback vault |
### PriceUpdated

```solidity:no-line-numbers
event PriceUpdated(bytes32 symbol, uint256 price)
```

### OpexBudgetUpdated

```solidity:no-line-numbers
event OpexBudgetUpdated(uint256 oldBudget, uint256 newBudget)
```

### OpexOrderUpdated

```solidity:no-line-numbers
event OpexOrderUpdated(bytes32[] order)
```

### AddressSet

```solidity:no-line-numbers
event AddressSet(string name, string actionName, address oldAddress, address newAddress)
```

## Methods

### Public

#### currentEpoch

Epoch index for the current timestamp

```solidity:no-line-numbers
function currentEpoch() public view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Epoch index |

### External

#### initialize

Initializer

```solidity:no-line-numbers
function initialize(address _portfolio, address _treasury, address _buybackVault, uint256 _weeklyOpexBudget, uint256 _genesis, address _admin) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | PortfolioSub address |
| _treasury | address | Address receiving the operating draw in kind |
| _buybackVault | address | Address receiving everything else |
| _weeklyOpexBudget | uint256 | Operating budget per epoch in USD, 1e18 scale |
| _genesis | uint256 | Timestamp epoch 0 starts at. At most EPOCH_DURATION in the past, never future. |
| _admin | address |  |

#### receive

Required. PortfolioSub can push native ALOT to any holder of an ALOT balance via autoGas,
and PortfolioBridgeMain refunds the fee payer with a zero value call during withdrawals. Without a
payable receiver both paths revert.

```solidity:no-line-numbers
receive() external payable
```

#### closeEpoch

Settles every fully elapsed epoch and empties the collector

**Dev notes:** \
Permissionless and argument free so it cannot depend on keeper liveness and can only
move value along the configured destinations. Missed closes cannot be split back into individual
epochs, so one call settles the whole outstanding range and EpochClosed records it.

```solidity:no-line-numbers
function closeEpoch() external
```

#### setPrices

Sets USD prices for a batch of symbols

**Dev notes:** \
Maintained on its own cadence by the off chain price app, like gasSwapRatio. Keeping it
separate from closeEpoch is what lets the close stay permissionless.

```solidity:no-line-numbers
function setPrices(bytes32[] _symbols, uint256[] _prices) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbols | bytes32[] | Symbols to price |
| _prices | uint256[] | USD per whole token, 1e18 scale |

#### setWeeklyOpexBudget

Sets the per epoch operating budget

```solidity:no-line-numbers
function setWeeklyOpexBudget(uint256 _weeklyOpexBudget) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _weeklyOpexBudget | uint256 | Budget in USD, 1e18 scale. At most MAX_WEEKLY_OPEX_BUDGET. |

#### setOpexOrder

Sets the order symbols are drawn in when funding the budget

**Dev notes:** \
Symbols not listed are still drawn from afterwards, in token list order. That only
happens when the listed ones fell short, where taking illiquid tokens beats underfunding opex.

```solidity:no-line-numbers
function setOpexOrder(bytes32[] _order) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | bytes32[] | Symbols in draw order, typically stables then majors |

#### setTreasury

Sets the treasury address

```solidity:no-line-numbers
function setTreasury(address _treasury) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _treasury | address | New treasury address |

#### setPortfolio

Sets the PortfolioSub address

**Dev notes:** \
Every transfer this contract makes goes through it, so a wrong value silently redirects
an entire epoch's fees.

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | New PortfolioSub address |

#### setBuybackVault

Sets the buyback vault address

```solidity:no-line-numbers
function setBuybackVault(address _buybackVault) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _buybackVault | address | New buyback vault address |

#### getOpexOrder

```solidity:no-line-numbers
function getOpexOrder() external view returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Current opex draw order |

### Private

#### _setWeeklyOpexBudget

```solidity:no-line-numbers
function _setWeeklyOpexBudget(uint256 _weeklyOpexBudget) private
```

#### _snapshot

Snapshots every distributable balance held by this contract

**Dev notes:** \
Uses PortfolioSub's canonical token list rather than a local one, so a newly listed pair
cannot silently strand fees that no generic withdraw could recover.

```solidity:no-line-numbers
function _snapshot() private view returns (bytes32[] symbols, uint256[] balances, uint256 count)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| symbols | bytes32[] | Symbols carrying a balance, packed into the first `count` entries |
| balances | uint256[] | Corresponding available balances |
| count | uint256 | Number of populated entries |

#### _allocate

Values the basket, funds the budget in kind by priority, sends the rest to the vault

**Dev notes:** \
Three phases, kept as separate frames to stay inside the stack limit: value the basket,
work out what the budget claims without moving anything, then settle. Every entry is fully
emptied, so the collector holds nothing after a close.

```solidity:no-line-numbers
function _allocate(bytes32[] _symbols, uint256[] _balances, uint256 _count, uint256 _epoch, uint256 _epochsCovered) private returns (uint256 basketValue, uint256 funded, uint256 shortfall)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| basketValue | uint256 | Total USD value of the snapshot |
| funded | uint256 | USD value drawn to the treasury |
| shortfall | uint256 | Budget the basket could not cover |

#### _draw

Claims the operating budget across the snapshot, configured symbols first

**Dev notes:** \
Bookkeeping only, writes into `_taken` and `_values`. No clamp: if the basket cannot
cover the budget the draw runs out of tokens, opex takes everything and the caller records the
shortfall, so in a lean epoch the buyback gets nothing. Symbols outside opexOrder are drawn from
afterwards, in token list order, which only happens when the listed ones fell short.

```solidity:no-line-numbers
function _draw(bytes32[] _symbols, uint256[] _balances, uint256[] _values, uint256[] _taken, uint256 _count, uint256 _budget) private view returns (uint256 drawn)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbols | bytes32[] |  |
| _balances | uint256[] |  |
| _values | uint256[] |  |
| _taken | uint256[] |  |
| _count | uint256 |  |
| _budget | uint256 | Budget to fund, one weeklyOpexBudget per epoch this close covers |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawn | uint256 | USD actually claimed for the treasury |

#### _take

Claims up to `_remaining` USD of value from entry `_i` for the operating budget

**Dev notes:** \
Records the quantity in `_taken` and writes down `_values` so a later pass skips an
entry that is already drained.

```solidity:no-line-numbers
function _take(bytes32[] _symbols, uint256[] _balances, uint256[] _values, uint256[] _taken, uint256 _i, uint256 _remaining) private view returns (uint256 remaining, uint256 drawn)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| remaining | uint256 | Budget still unfunded after this claim |
| drawn | uint256 | USD actually claimed, under what was asked for when the quantity floors down |

#### _settle

Moves every entry out and records it, one event per token

**Dev notes:** \
Leaves the collector empty by construction: each entry sends `_taken` to the treasury
and its entire remainder to the buyback vault, so the two legs always sum to the balance. \
Settled as two bulk transfers rather than up to 2N individual ones. Besides the obvious saving
on external calls, PortfolioSub runs autoGas once per bulkTransferTokens rather than once per
transfer, so a close triggers two gas top ups instead of one per token.

```solidity:no-line-numbers
function _settle(bytes32[] _symbols, uint256[] _balances, uint256[] _taken, uint256 _count, uint256 _epoch) private
```

#### _send

Sends the non zero entries of `_quantities` to `_to` in a single bulk transfer

**Dev notes:** \
bulkTransferTokens walks the entire array and requires every symbol to be listed, so a
zero padded tail is not skipped, it reverts the close with P-ETNS-01. The arrays must therefore
be exactly as long as the number of non zero legs.
The leg count is only known after walking `_quantities`, so the alternatives are a counting pass
before allocating, or having the caller count and pass the total down. Both measured ~2.9k more
gas per close than shrinking in place.
Shrinking in place is safe because `n <= _count` always holds: both arrays are allocated at
`_count` and `n` is incremented at most once per iteration, so this only ever shrinks. Solidity
never reclaims memory, the free memory pointer is untouched, every element below `n` is written
by the loop and nothing reads past it.

```solidity:no-line-numbers
function _send(bytes32[] _symbols, uint256[] _quantities, uint256 _count, address _to) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbols | bytes32[] | Symbols, aligned with _quantities |
| _quantities | uint256[] | Amounts to send, zeros are skipped |
| _count | uint256 | Number of populated entries in the source arrays |
| _to | address | Destination |

#### _toUsd

Values a quantity of a symbol in USD

```solidity:no-line-numbers
function _toUsd(bytes32 _symbol, uint256 _quantity) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol to value |
| _quantity | uint256 | Amount in the token's own decimals |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Value in USD, 1e18 scale. Zero when no price is set, which routes the whole balance to the buyback vault rather than letting an unpriced token fund operations. |

#### _claim

What `_value` of USD buys of a symbol, and what that quantity is actually worth

**Dev notes:** \
The two differ because the quantity floors to whole atomic units. Returned together so
the decimals lookup, an external call, happens once. `_cap` clamps the quantity before valuing it.

```solidity:no-line-numbers
function _claim(bytes32 _symbol, uint256 _value, uint256 _cap) private view returns (uint256 quantity, uint256 claimedValue)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol to convert into |
| _value | uint256 | Value in USD, 1e18 scale |
| _cap | uint256 | Most that can be claimed, in the token's own decimals |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| quantity | uint256 | Amount claimed, in the token's own decimals |
| claimedValue | uint256 | Value in USD of that quantity, 1e18 scale. At most `_value`. |

