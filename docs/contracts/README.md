---
title: Smart Contracts
icon: code
prev: /
next: /contracts/Exchange
editLink: true
---


## Introduction

Dexalot is a non-custodial multi-chain CLOB Dex that spans over the Dexalot Subnet (Subnet) and multiple host-chains (Mainnets). The Avalanche C-Chain has been the first host-chain that went live on Feb 1st, 2023 along with our subnet. With the March 2024 upgrade, we will start onboarding other blockchains such as Arbitrum, Ethereum and even subnets such as Gunzilla as host-chains. Dexalot's patent pending novel architecture allows depositing any token from any host-chain and trade them in the subnet without traditional bridging. Dexalot's frontend coupled with "zero slippage order types" such as Limit, Post-only, Immediate-or-Cancel, Fill-or-Kill rival many CEXs, but also preserves the critical non-custodial feature of blockchains. The Host Chains and the Subnet communicate by generic messages with the use of high-end bridge technologies.



The image below shows the trading workflow on Dexalot before and after subnet when the subnet went live first on Feb 1st, 2023.

![Trading workflow on Dexalot before and after subnet](/images/contracts/before_and_after_subnet.png)

In addition this next image below shows how host-chains & the subnet communicate with each other with the March 2024 upgrade

![Host-Chains & Subnet communication](/images/api/contracts_architecture.png)

The novel multi-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed. Dexalot’s contracts can be accessed through its frontend, or directly from your own code. In addition, there is no separate bridging interface. All bridge functionality is encapsulated into Dexalot’s host-chain smart contracts PortfolioMain &amp; PortfolioSub to provide a seamless user experience. LayerZero has been the sole bridge provider since the start, and more bridges or protocols such as AWM (Avalanche Warp Messaging) will be added in the future as needed. This approach will allow Dexalot to scale to multiple bridges (to further reduce risk from single point of failure) and for assets in chains other than Avalanche to be tradeable on the Dexalot Subnet.


Dexalot also supports a novel flow where you can buy GUN token from any chain using your USDC and have your GUN token deposited directly into your wallet in the Gunzilla Subnet. Similarly, you can sell your GUN token from the Gunzilla Subnet and have your USDC deposited directly into your wallet in the chain of your choice.
![Gun Trading Flow (Leveraging Simple Swap Flow)](/images/api/gun-ss-flow.png)

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
<td>v2.0</td>
<td>2023-01-18</td>
<td>initial dual-chain contract deployment</td>
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
- DepositNative(RemoveGas) Bug Fix where you can only deposit half of ALOT wallet balances at a time when in subnet.<br />
- Expose transferToken & getBalance via Interface so it can be called by IncentiveDistributor<br />
- Granted access to setBridgeParams function for PORTFOLIO_BRIDGE_ROLE<br />

PortfolioBridge:<br />

- added setBridgeParams function that needs BRIDGE_ADMIN_ROLE that calls portfolio.setBridgeParams<br />

IncentiveDistributor<br />

- Enhanced it to be deployed in the subnet and use the portfolioSub.transferToken function to distribute the rewards rather than using ERC20 tokens in the mainnet.<br />

BannedAccounts:<br />

- added BanStatusChanged event<br />
- gas optimization (++i) where possible
</td>
</tr>
<tr>
<td>v3.0</td>
<td>2024-03-29</td>
<td>Multi-chain support upgrade</td>
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
- add/removeToken changes &amp; use of sourceChainSymbol to support multichain/multisymbol mapping in the subnet<br/>
- addExecution has been changed to have the fee(commission) calculations done in PortfolioSub<br/>
- Removed Tx.RECOVERFUNDS as it is obsolete after PortfolioBridge getXFerMessage cleanup <br/>
- Added _dstChainListOrgChainId in the withdrawToken, but kept the previous version of this function for backward compatibility<br/>

ExchangeSub:<br/>

- addTradePair checks moved to ExchangeSub, new EXCHANGE_TOLE to only allow ExchangeSub to add a new tradePair.<br/>
- Moved addToken from Exchange to ExchangeSub because of the addToken move from Portfolio to PortfolioSub<br/>

PortfolioBridgeSub:<br/>

- DelayedTransfer functionality ported over to a new DelayedTransfers contract from PortfolioBridgeSub<br/>
- add/removeToken changes to support multichain/multisymbol mapping in the subnet<br/>
- Added inventoryBySymbolId support. Withdrawal will revert if there is not enough inventory at the target chain<br/>
- Delayed transfer Deposit checks removed. Thresholds are ONLY checked for WITHRAWALS going forward<br/>
- Renamed PORTFOLIO_ROLE as BRIDGE_USER_ROLE as both Portfolio &amp; MainnetRfq can use the bridge now<br/>
- Combined the split logic that was in processPayload &amp; getXFerMessage into a getXFerMessage for consistency<br/>
- Added _dstChainListOrgChainId in various functions to support messages targeted to multiple different host chains<br/>

PortfolioBridgeMain: (Renamed former PortfolioBridge as PortfolioBridgeMain for consistency)<br/>

- PortfolioBridgeMain can now send &amp; receive messages to/from MainnetRFQ(from different chains) in addition to PortfolioMain<br/>
- add/removeToken changes to support multichain/multisymbol mapping in the subnet<br/>

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

</table>
