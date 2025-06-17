---
title: Smart Contracts
icon: code
editLink: true
---


## Introduction

Dexalot is a non-custodial omni-chain CLOB Dex that spans over the Dexalot L1 (previously referred as Subnet) and multiple host-chains (Mainnets). The Avalanche C-Chain has been the first host-chain that went live on Feb 1st, 2023 along with our Dexalot L1. With the March 2024 upgrade, we started onboarding other blockchains such as Arbitrum, Base and even other L1s such as Gunzilla as host-chains. Dexalot's patent pending novel architecture allows depositing any token from any host-chain and trade them in the Dexalot L1 without traditional bridging. Dexalot's frontend coupled with "zero slippage order types" such as Limit, Post-only, Immediate-or-Cancel, Fill-or-Kill rival many CEXs, but also preserves the critical non-custodial feature of blockchains. The Host Chains and the Dexalot L1 communicate by generic messages with the use of high-end bridge technologies.

The image below shows the trading workflow on Dexalot before and after L1 when the L1 went live first on Feb 1st, 2023.

![Trading workflow on Dexalot before and after Dexalot L1](/images/contracts/before_and_after_subnet.png)

In addition this next image below shows how host-chains & the Dexalot L1 communicate with each other with the March 2024 upgrade

![Host-Chains & Dexalot L1 communication](/images/api/contracts_architecture_oct24.png)

The novel omni-chain architecture allows Dexalot to unload more demanding operations to the Dexalot L1, reducing the gas cost while increasing speed. Dexalot’s contracts can be accessed through its frontend, or directly from your own code. In addition, there is no separate bridging interface. All bridge functionality is encapsulated into Dexalot’s host-chain smart contracts PortfolioMain &amp; PortfolioSub to provide a seamless user experience.

Dexalot is bridge agnostic and currently supports ICM and LayerZero. Additional bridge providers will be added as needed. The default bridge provider is ICM (Avalanche's Interchain Messaging) within Avalanche echosystem & LayerZero for any other chains. The default bridge can't be disabled.
You can technically deposit with Avalanche's ICM and withdraw with LayerZero. This approach is allowing Dexalot to further reduce risk from single point of failure and for assets in chains other than Avalanche to be tradeable on the Dexalot L1.

Dexalot also supports a new cross chain swap flow(originally referred to as GUN Flow) where any user can buy GUN token from any network with a single click. This is particularly beneficial for Avalanche L1s that have certain token restrictions. For example Gunzilla L1 prohibits ERC20s in their network just like Dexalat L1 and they don't allow their gas token in any network but in Gunzilla.

When Buying GUN from Avalanche(or Arb,...) with counter token USDC, USDC is kept in MainnetRFQ(Avax) and GUN is deposited to the buyer's wallet via MainnetRFQ(Gun). The flow is :
* MainnetRFQ(Avax) => PortfolioBridgeMain(Avax) => ICM => PortfolioBridgeMain(Gun) => MainnetRFQ(Gun)

When Selling GUN from Gunzilla with counter token USDC. GUN is kept in MainnetRFQ(Gun) and USDC is deposited to the buyer's wallet via MainnetRFQ(Avax) The flow is :
* MainnetRFQ(Gun) => PortfolioBridgeMain(Gun) => ICM => PortfolioBridgeMain(Avax) => MainnetRFQ(Avax)

Similarly a Cross Chain Swaps Betwen Avalanche & Arb would work as follows, say when exchanging AVAX & ETH
* MainnetRFQ(Avax) => PortfolioBridgeMain(Avax) => LayerZero => PortfolioBridgeMain(Arb) => MainnetRFQ(Arb) ( sold Avax in Avalanche, ETH received in Arbitrum)
* MainnetRFQ(Arb) => PortfolioBridgeMain(Arb) => LayerZero => PortfolioBridgeMain(Avax) => MainnetRFQ(Avax) ( sold ETH in Arbitrum, Avax received in Avalanche)


![Cross Chain Swap Flow for GUN](/images/api/cross-chain-swaps-gun.png)

## Version History

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 80%" />
</colgroup>
<tr>
<th><strong>Date</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td valign="top">2025-06-25</td>
<td><strong>Non-Reverting List Orders & CancelByClientOrderId Functions & MinPostAmount</strong>

TradePairs (v3.6.1):<br/>

- To avoid `REVERT` conditions in list orders,  the following changes have been made:
  * `P-AFNE-01` : available funds not enough while entering order will not revert going forward. Instead it will be rejected at the time of order entry.
  * Reversion with `P-AFNE-02` is not possible anymore as funds are checked at the time of order entry using the new `portfolioSub.checkAvailable` function.

- Added `cancelOrderByClientId`, `cancelOrderListByClientIds`, `cancelAddListByClientIds` functions to enable cancelation of the live orders by clientOrderId instead of orderId
- The `tradePair.minTradeAmount` will be used to control the minimum trade amount a trader can execute as a `taker` to enable traders to for example BUY $1 worth of ALOT to replenish their gas tank. We also added `tradePair.minPostAmount` that controls the minimum amount that can be posted to the orderbook. `minPostAmount` will be higher than or equal to `minTradeAmount`. At the time of the release, `minPostAmount` for all the pairs will be set to `minTradeAmount` for backword compatibility. We will decrease the `minTradeAmount` of certain pairs like `ALOT/USDC` at a later time.
- cancelReplaceOrder: The new order will get status= `REJECTED` code = `P-AFNE-01` if there is not enough available funds in the contract instead of `REVERTING`. The cancel order is still processed even if the new order is `REJECTED`

- The uniqueness the `clientOrderId` is only enforced against live orders that are already posted to the orderbook, and `clientOrderId` can be used to cancel them without waiting to receive the orderId back from the blockchain. Uniqueness of the `clientOrderId` is `NOT` checked against neither `MARKET` nor fully closed taker `LIMIT` orders as they are only relevant(their scope) in the block they are being processed and all their references are deleted before the next block.
- Bug Fix: ClientOrderId for `MARKET` orders were inadvertently not removed from the blockchain state.
- Decreased market orders specific paramater `tradePair.allowedSlippagePercent`'s default to `3%` from `20%`
- New `UtilsLibrary.getOutgoingDetails` function to get the outgoing symbol and the quantity of an order

PortfolioSub (v2.6.4):<br/>

- New `checkAvailable` function to `reject` orders at the time of order entry instead of `reverting`
- Optimized `calculateFee` function with the new `calculateFees` function
- Used onlyRole(EXECUTOR_ROLE) instead of require for functions executable by TradePair only
- Used `assert` instead of `require` for catastrophic contract level problems.


OrderBooks (v2.2.2):<br/>

 - Moved addToOrderbooks logic from the TradePairs to OrderBooks

</td>
</tr>
<tr>
<td valign="top">2025-04-29</td>
<td><strong>Non-EVM support & other enhancements</strong>

Struct Changes:<br/>
- [IPortfolio.XFER](/en/contracts/interfaces/IPortfolio.html#xfer)
  - trader modified from `address` to `bytes32`
  - customdata modified from `bytes28` to `bytes18`
- [IPortfolio.TokenDetails](/en/contracts/interfaces/IPortfolio.html#tokendetails)
  - add new `l1Decimals` field to represent token decimals on Dexalot L1
- [IPortfolio.Options](/en/contracts/interfaces/IPortfolio.html#options)
  - enum to represent different custom options for withdrawals, e.g. `GASAIRDROP` which airdrops a small amount of native token to the user or `UNWRAP` which unwraps a wrapped token upon withdrawal
- [ITradePairs.Order](/en/contracts/interfaces/ITradePairs.html#order)
  - add `createBlock` to order struct

TradePairs (v3.5.3):<br/>
- add `createBlock` to order struct for the block an order was created
- (breaking) OrderStatusChangedEvent as it contains the order struct, new field for `createBlock`

Exchange:<br/>
- add `l1Decimals` as a parameter for adding tokens

DelayedTransfers (v3.0.2):<br/>
- modify customdata handling to not overwrite withdraw options

PortfolioBridgeMain (v4.1.6):<br/>
- add `gasAirdrop` to fund user with small amount of native token if specified on withdrawal
- modify Xfer packing + unpacking to support `bytes32` trader
- (breaking) `getBridgeFee` takes an additional `bytes1` parameter for options + trader `address`
- (breaking) `XCHAIN_XFER_MESSAGE_VERSION` incremented to 3
- (breaking) XChainXFerMessage event as it contains the Xfer struct

PortfolioBridgeSub (v4.1.6):<br/>
- add `l1Decimals` as a parameter for adding tokens
- add `truncateQuantity` to truncate withdrawals to the destination chain decimals
- add `optionsGasCost` to set a bridge fee cost for `GASAIRDROP`  or `UNWRAP`
- (breaking) `getAllBridgeFees` takes an additional `bytes1` parameter for options + trader `address`

PortfolioMain (v2.6.1):<br/>
- add `l1Decimals` as a parameter for adding tokens
- add `wrappedNative` to wrap on deposit + unwrap on withdrawal (if `UNWRAP` option set)
- add truncation on deposit so quantity is in terms of dexalot l1 decimals
- scale deposit quantities into dexalot l1 decimals and scale withdrawal quantities into mainnet actual decimals

PortfolioSub (v2.6.1):<br/>
- add `l1Decimals` as a parameter for adding tokens, for PortfolioSub l1Decimals=decimals
- (breaking) remove `getAllBridgeFees`, can be accessed via PortfolioBridgeSub
- (breaking) remove deprecated `withdrawToken(address, bytes32, uint256, IPortfolioBridge.BridgeProvider)`
- (new) add `withdrawToken(address, bytes32, bytes32, uint256, IPortfolioBridge.BridgeProvider, uint32, bytes1)`
- add support for withdrawing to non evm chains with `bytes32` addresses
- add support for withdrawing for  `GASAIRDROP`  or `UNWRAP` token

MainnetRFQ (v1.1.7):<br/>
- add wrappedInfo to unwrap/wrap tokens based on the chain to keep consistent inventory
- (breaking) modify `XChainSwap` struct to add support for bytes32 addresses and tokens (for non-evm)
- (breaking) SwapExecuted event, fields `destTrader` + `destAsset` from address to bytes32
- add support to slip swaps per quote based on execution time

InventoryManager (v3.2.0):<br/>
- add userProvidedLiquidity to offer 0 inventoryFee if withdrawing to same chain as deposit

UtilsLibrary:<br/>
- add helpers for converting to/from `address` to `bytes32`
- add truncation support for differing decimals
- add bitwise check for options
</td>
</tr>
<tr>
<td valign="top">2024-10-15</td>
<td><strong>Cross Chain Swaps & Avalanche ICM Bridge</strong>

InventoryManager:<br/>

- Remove setInventoryBySymbolId (required for initial deployment)<br/>
- Add array functions for setting and getting scaling factors<br/>
- Correct fee logic by multiplying by scaling factor after invariant math calc<br/>

InvariantMathLibrary:<br/>
- Remove division by scale factor in calculations<br/>

Portfolio:<br/>
- Enable bridgeProvider via external contract<br/>

PortfolioBridge:<br/>
- Refactor logic to not inherit bridge logic but call bridge specific contracts which handle sending/receiving of messages<br/>
- Remove reliance of lzChainID for normal chainID in mapping/structs<br/>
- Add support for ICM bridge type<br/>
- Modify bridge fee functions to use bridge type parameter<br/>
- Add xChainAllowedDestinations to support cross chain swaps<br/>
- Add mapping for multiplier factor in subnet to discount various bridge providers on withdrawal<br/>
- Add getSupportedChainIds function per bridge provider<br/>

TradePairs:<br/>
- Breaking Change: `addOrder,addLimitOrderList,cancelReplaceList` are deprecated
- Breaking Change: Replaced the deprecated addOrder with `addNewOrder` function that is using `ITradePairs.NewOrder` Struct instead of individual parameters<br/>
- Breaking Change: Replaced the deprecated addLimitOrderList with `addOrderList` to improve list order functionality<br/>
- Breaking Change: Replaced the deprecated cancelReplaceList with `cancelAddList` to improve on cancel replace logic and allow orders to any pair<br/>
- Breaking Change: OrderStatusChanged Event changes<br/>
    - `args.version= 3`
    - args.traderaddress (indexed - no change)
    - args.pair (indexed - no change)
    - `args.previousUpdateBlock` (new field)
    - args.code  (no change)
    - `Access all the rest of the order details using "args.order.xxx"`
    - Fields Renamed:
    - args.orderId ==> `args.order.id`
    - args.totalamount  => `args.order.totalAmount `  (changed to Camel Case)
    - args.quantityfilled  => `args.order.quantityFilled` (changed to Camel Case)
    - args.totalfee  => `args.order.totalFee` (changed to Camel Case)
    - New Fields in the args.order:
    - `args.order.updateBlock`
    - args.order.tradePairId has the same value as args.pair above
    - args.order.traderaddress has the same value as args.traderaddress above
- Breaking Change only in fuji after November 7, 2024: NewOrder Struct(ITradePairs.NewOrder) has a new required STP (Self Trade Prevention) flag when sending a new order. Self Trade Prevention Mode is checked when both maker and taker orders are from the same traderaddress.
     - 0: `CANCELTAKER`   – Cancel taker Order. Let the resting maker order remain in the orderbook.
     - 1: `CANCELMAKER`   – Cancel maker Order. Continue matching the newer taking order against the orderbook.
     - 2: `CANCELBOTH`   – Cancel both maker & taker orders immediately.
     - 3: `NONE`         – Do nothing. Self Trade allowed <br/>
- All trading functions will raise OrderStatusChanged events with `status= REJECTED` instead of reverting for smoother list functions. See [addNewOrder](/en/contracts/TradePairs.html#addneworder) documentation for REVERT & REJECT conditions<br/>
- Rejected new Orders will start getting an id(orderId) assigned by the blockchain for consistency<br/>
- Unsolicited cancels will continue to get `status=CANCELED` status but `code` field will be populated with `"T-USCL-01"` for additional explanation<br/>
- 30-35% Gas optimization when sending new orders <br/>
- Auto GasTank Fill to be executed with the last order in the cancelAddList.<br/>

MainnetRFQ:<br/>
- Add volatility admin role to slip quotes during volatile periods<br/>
- Add volatilityPairs bitmap to determine which pairs to slip<br/>
- Use one byte from nonceAndMeta to represent the pair<br/>

BridgeApps:<br/>
- Add new ICM bridge type<br/>
- Replace LZApp with LzV2App for support with LayerZero Endpoint V2<br/>
- Move remote chain + gas limit logic to individual bridge apps<br/>
- Add ICMApp to send/receive messages via ICM/Teleporter messaging on avalanche blockchains<br/>
</td>
</tr>

<tr>
<td valign="top">2024-03-29</td>
<td><strong>Omni-chain support upgrade</strong>

TradePairs:<br/>

- New cancelReplaceList function <br/>
- addTradePair checks moved to ExchangeSub, new EXCHANGE_ROLE to only allow ExchangeSub to add a new tradePair<br/>
- getQuoteAmount moved to UtilsLibrary <br/>
- addExecution has been changed to have the fee(commission) calculations done in PortfolioSub<br/>

PortfolioSub:<br/>

- Moved addToken from Portfolio to PortfolioMain &amp; PortfolioSub with different signatures<br/>
- Added sourceChainSymbol to TokenDetails<br/>
- Using TokenDetails struct for addTokenInternal function to avoid stack too deep<br/>
- New PortfolioSubHelper contract that PortfolioSub uses to get preferential rates<br/>
- add/removeToken changes &amp; use of sourceChainSymbol to support multichain/multisymbol mapping in the Dexalot L1<br/>
- addExecution has been changed to have the fee(commission) calculations done in PortfolioSub<br/>
- Removed Tx.RECOVERFUNDS as it is obsolete after PortfolioBridge getXFerMessage cleanup <br/>
- Added _dstChainListOrgChainId in the withdrawToken, but kept the previous version of this function for backward compatibility<br/>

ExchangeSub:<br/>

- addTradePair checks moved to ExchangeSub, new EXCHANGE_TOLE to only allow ExchangeSub to add a new tradePair.<br/>
- Moved addToken from Exchange to ExchangeSub because of the addToken move from Portfolio to PortfolioSub<br/>

PortfolioBridgeSub:<br/>

- DelayedTransfer functionality ported over to a new DelayedTransfers contract from PortfolioBridgeSub<br/>
- add/removeToken changes to support multichain/multisymbol mapping in the Dexalot L1<br/>
- Added inventoryBySymbolId support. Withdrawal will revert if there is not enough inventory at the target chain<br/>
- Delayed transfer Deposit checks removed. Thresholds are ONLY checked for WITHRAWALS going forward<br/>
- Renamed PORTFOLIO_ROLE as BRIDGE_USER_ROLE as both Portfolio &amp; MainnetRfq can use the bridge now<br/>
- Combined the split logic that was in processPayload &amp; getXFerMessage into a getXFerMessage for consistency<br/>
- Added _dstChainListOrgChainId in various functions to support messages targeted to multiple different host chains<br/>

PortfolioBridgeMain: (Renamed former PortfolioBridge as PortfolioBridgeMain for consistency)<br/>

- PortfolioBridgeMain can now send &amp; receive messages to/from MainnetRFQ(from different chains) in addition to PortfolioMain<br/>
- add/removeToken changes to support multichain/multisymbol mapping in the Dexalot L1<br/>

PortfolioMain:<br/>

- Moved addToken from Portfolio to PortfolioMain &amp; PortfolioSub with different signatures<br/>
- addTokenInternal multichain support<br/>
- Addition of virtual tokens for cross chain trades<br/>
- Using TokenDetails struct for addTokenInternal function to avoid stack too deep<br/>

ExchangeMain:<br/>

- Moved addToken from Exchange to ExchangeMain because of the addToken move from Portfolio to PortfolioSub<br/>

Portfolio:<br/>

- Moved addToken from Portfolio to PortfolioMain &amp; PortfolioSub with different signatures<br/>
- addTokenInternal multichain support<br/>

LzApp:<br/>

- Added _dstChainId in various functions to support messages targeted to multiple different host chains<br/>
- Added remoteParams mapping that has gas for each destination and Chainlistorg chain id that is used for symbol mapping<br/>
- Added default RemoteChain id &amp; default gas for destination<br/>

MainnetRFQ:<br/>

- Add XChainSwap function for cross chain swaps<br/>
- Replace nonceUsed with completedSwaps bitmap<br/>
- Replace orderExpiryUpdated with expiredSwaps bitmap<br/>
- Remove reliance on orderMakerAmountUpdated + trustedContracts<br/>
- Add destChainId to SwapExecuted event<br/>
- Add swapQueue for XChain Swaps that do not have enough inventory on the destination chain<br/>
</td>
</tr>
<tr>
<td valign="top">2023-02-23</td>
<td><strong>Maintenance Release</strong>

TradePairs<br />

- Functionality for addLimitOrderList to emit OrderStatusChanged with status= REJECTED events instead of reverting the tx<br />
- Removed the last function paramater "_revertOnPO" from addLimitOrderList<br />
- Added a new field at the end of OrderStatusChanged event called "code" <br />
- Incremented ORDER_STATUS_CHANGED_VERSION field in OrderStatusChanged event to 2 from 1 <br />
- Used Previously unused REJECTED from enum "Status" so addLimitOrderList can emit OrderStatusChanged with status= REJECTED instead of reverting. <br />
- Added CANCEL_REJECT at the end of enum "Status" so cancelOrderList can emit OrderStatusChanged with status= CANCEL_REJECT if order already closed <br />
- Renamed cancelAllOrders to cancelOrderList as only the supplied list is canceled, not all open orders <br />

PortfolioSub<br />

- AutoFill added at the end of addOrder function only when called from addOrder(singleOrder) <br />
- removed redundant UtilsLibrary.canCancel function calls. Already closed orders are removed from the mapping and the remaining open orders are cancelable by definition <br />
- DepositNative(RemoveGas) Bug Fix where you can only deposit half of ALOT wallet balances at a time when in Dexalot L1.<br />
- Expose transferToken & getBalance via Interface so it can be called by IncentiveDistributor<br />
- Granted access to setBridgeParams function for PORTFOLIO_BRIDGE_ROLE<br />

PortfolioBridge:<br />

- added setBridgeParams function that needs BRIDGE_ADMIN_ROLE that calls portfolio.setBridgeParams<br />

IncentiveDistributor<br />

- Enhanced it to be deployed in the Dexalot L1 and use the portfolioSub.transferToken function to distribute the rewards rather than using ERC20 tokens in the mainnet.<br />

BannedAccounts:<br />

- added BanStatusChanged event<br />
- gas optimization (++i) where possible
</td>
</tr>
<tr>
<td>2023-01-18</td>
<td><strong>Initial dual-chain contract deployment</strong></td>
</tr>



</table>
