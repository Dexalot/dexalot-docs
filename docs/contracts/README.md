---
title: Smart Contracts
icon: code
prev: /
next: /contracts/Exchange
editLink: true
---

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
<td>-TradePairs:(Functionality for addLimitOrderList to emit OrderStatusChanged with status= REJECTED events instead of reverting the tx)<br />
- Removed the last function paramater "_revertOnPO" from addLimitOrderList<br />
- Added a new field at the end of OrderStatusChanged event called "code" <br />
- Incremented ORDER_STATUS_CHANGED_VERSION field in OrderStatusChanged event to 2 from 1 <br />
- Used Previously unused REJECTED from enum "Status" so addLimitOrderList can emit OrderStatusChanged with status= REJECTED instead of reverting. <br />
- Added CANCEL_REJECT at the end of enum "Status" so cancelOrderList can emit OrderStatusChanged with status= CANCEL_REJECT if order already closed <br />
- Renamed cancelAllOrders to cancelOrderList as only the supplied list is canceled, not all open orders <br />
- portoflioSub.AutoFill added at the end of addOrder function only when called from addOrder(singleOrder) <br />
- removed redundant UtilsLibrary.canCancel function calls. Already closed orders are removed from the mapping and the remaining open orders are cancelable by definition <br />
PortfolioSub:<br />
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
</table>

The new Dexalot is a dual-chain application existing on both the Avalanche C-Chain (Mainnet) and Dexalot Subnet (Subnet). The Mainnet and Subnet communicate by generic message passing with the use of high-end bridge technologies. Previously, trading on Dexalot meant that all of your actions were sent to a single blockchain, but that’s changing in a big way. Dexalot’s new architecture allows for interaction between multiple blockchains from its frontend, instead of just one. This is not only more efficient but also paves the way for future innovations. The image below shows the trading workflow on Dexalot before and after subnet.

![Trading workflow on Dexalot before and after subnet](/images/contracts/before_and_after_subnet.png)

The novel dual-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed. Dexalot’s new architecture is accessed through its frontend, which has been upgraded to be Mainnet and Subnet aware simultaneously. In addition, there is no separate bridging interface. All bridge functionality is integrated into Dexalot’s Mainnet smart contracts portfolio (PortfolioMain) and Subnet portfolio (PortfolioSub) to provide a seamless user experience for you. LayerZero will be the sole bridge provider at the start, and more bridges could be added in the future as needed. This approach will allow Dexalot to scale to multiple bridges (to further reduce risk from single point of failure) and for assets in chains other than Avalanche to be tradeable on the Dexalot Subnet.
