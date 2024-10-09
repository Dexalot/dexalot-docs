---
title: Smart Contracts
icon: code
prev: /
next: /contracts/Exchange
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
<col style="width: 9%" />
<col style="width: 17%" />
<col style="width: 73%" />
</colgroup>
<tr>
<th><strong>Version</strong></th>
<th><strong>Date</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>v4.0</td>
<td>2024-10-15</td>
<td>Cross Chain Swaps & Avalanche ICM Bridge</td>
</tr>
<tr>
<td></td>
<td></td>
<td>
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
- Add addNewOrder with order data provided via a struct<br/>
- Replaced cancelReplaceList with cancelAddList to improve on cancel replace logic and allow orders to any pair<br/>
- Using newOrder Struct instead of individual parameters<br/>
- New functions will raise reject events as much as possible instead of reverting<br/>
- Autofill to be executed with the last order in the cancelAddList.<br/>

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
<td>v3.0</td>
<td>2024-03-29</td>
<td>Omni-chain support upgrade</td>
</tr>
<tr>
<td></td>
<td></td>
<td>
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

-Moved addToken from Portfolio to PortfolioMain &amp; PortfolioSub with different signatures<br/>
-addTokenInternal multichain support<br/>

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
<td>v2.1</td>
<td>2023-02-23</td>
<td>Maintenance Release</td>
</tr>
<tr>
<td></td>
<td></td>
<td>TradePairs<br />

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
<td>v2.0</td>
<td>2023-01-18</td>
<td>initial dual-chain contract deployment</td>
</tr>



</table>
