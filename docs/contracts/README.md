---
title: Smart Contracts
icon: code
prev: /
next: /contracts/Exchange
editLink: true
---

The new Dexalot is a dual-chain application existing on both the Avalanche C-Chain (Mainnet) and Dexalot Subnet (Subnet). The Mainnet and Subnet communicate by generic message passing with the use of high-end bridge technologies. Previously, trading on Dexalot meant that all of your actions were sent to a single blockchain, but that’s changing in a big way. Dexalot’s new architecture allows for interaction between multiple blockchains from its frontend, instead of just one. This is not only more efficient but also paves the way for future innovations. The image below shows the trading workflow on Dexalot before and after subnet.

![Trading workflow on Dexalot before and after subnet](/images/contracts/before_and_after_subnet.png)

The novel dual-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed. Dexalot’s new architecture is accessed through its frontend, which has been upgraded to be Mainnet and Subnet aware simultaneously. In addition, there is no separate bridging interface. All bridge functionality is integrated into Dexalot’s Mainnet smart contracts portfolio (PortfolioMain) and Subnet portfolio (PortfolioSub) to provide a seamless user experience for you. LayerZero will be the sole bridge provider at the start, and more bridges could be added in the future as needed. This approach will allow Dexalot to scale to multiple bridges (to further reduce risk from single point of failure) and for assets in chains other than Avalanche to be tradeable on the Dexalot Subnet.
