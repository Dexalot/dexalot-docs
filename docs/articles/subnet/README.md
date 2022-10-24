---
editLink: true
---
# The Dexalot Subnet

![subnet](/images/subnet/subnet.png)
**An innovative exchange on the horizontal scaling paradigm of the Avalanche ecosystem**

## Introduction

The Dexalot team has been working hard building our Avalanche Subnet, and it’s almost here! Our Subnet is currently being tested in the Avalanche Fuji test network, so users are sure to enjoy a newly enhanced trading experience once complete. Cheaper transaction fees, better liquidity, and blazing speed are just a few of the many new features coming with the subnet. Let’s take a look at the novel structure of the new Dexalot and how it establishes a foundation for a multi-chain future as an Avalanche Subnet.

<YouTube id="vRvaswPuMNg" /> You tube


The original Dexalot Testnet was introduced on August 6, 2021, followed by the Mainnet launch on Dec 6, 2021. Subsequently, the Dexalot Subnet Testnet was created on April 25, 2022. Simply said, all chain environments are being updated as Dexalot migrates to the new architecture.

The new Dexalot is a dual-chain application existing on both the Avalanche C-Chain (Mainnet) and Dexalot Subnet (Subnet). The Mainnet and Subnet communicate by generic message passing with the use of high-end bridge technologies. Previously, trading on Dexalot meant that all of your actions were sent to a single blockchain, but that’s changing in a big way. Dexalot’s new architecture allows for interaction between multiple blockchains from its frontend, instead of just one. This is not only more efficient but also paves the way for future innovations.
![trading](/images/subnet/trading.png)
How users interact with Dexalot — before and after migration to the new Dexalot Subnet

With the new architecture, you will need to deposit from the Mainnet, trade in the Subnet and withdraw from the Subnet. The advantage of doing it this way is the fact that the assets never leave the originating chain while trades are occurring in the subnet.

To switch between these two blockchains, simply select from the drop down menu found right next to the wallet connect button on the familiar Dexalot dashboard.
![chainswitch](/images/subnet/chainswitch.png)
![mainsub](/images/subnet/mainsub.png)

## **Architecture**

The frontend app is similar to the single-chain implementation already in place, while the underlying contracts, backend, and database architecture have all seen substantial changes.

The novel dual-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed. Dexalot’s new architecture is accessed through its frontend, which has been upgraded to be Mainnet and Subnet aware simultaneously. In addition, there is no separate bridging interface. All bridge functionality is integrated into Dexalot’s Mainnet smart contracts portfolio (PortfolioMain) and Subnet portfolio (PortfolioSub) to provide a seamless user experience for you. LayerZero will be the sole bridge provider at the start, and more bridges could be added in the future as needed. This approach will allow Dexalot to scale to multiple bridges (to further reduce risk from single points of failure) and for assets in chains other than Avalanche to be tradeable on the Dexalot Subnet.

### **Phase 1**
The first phase of the migration began on July 14, 2022. The Fuij testnet network was shut down briefly to support multiple blockchains using the same database schema — the first step of the multi-chain application. The Dexalot user’s view (as seen on the dashboard website) is created mostly by querying the records from the database (see the Dexalot litepaper) that is populated by a drop copy of the blockchain events. A new backend infrastructure with readers and writers capable of interacting with multiple blockchains was also deployed successfully during this phase.

### **Phase 2**
During the first week of August, the Mainnet was shut down in order to enable the Subnet environment for testing. The current Mainnet operates with 4 smart contracts and this system was updated to include 10+ smart contracts. This development environment has been deployed on the Avalanche Fuji test network and is undergoing internal testing.

## **Typical Trading Flow**

* Connect your wallet
* Deposit tokens from Mainnet
* Trade in Subnet
* Withdraw from Subnet

## **Key Concepts and Differences**

* One can deposit an asset only when connected to Mainnet. The deposit locks the user’s asset on the PortfolioMain and deposits the same amount in the PortfolioSub all in one transaction.

* Users will have two wallets for each account: one in the Mainnet and one in the Subnet accessible through supported wallet applications like Core, MetaMask and WalletConnect providers. More wallets will be added in the future.

* The mainnet wallet holds all assets in the Mainnet as before, and assets need to be deposited into Dexalot there for trading. All bridge functions are integrated into deposit and withdrawal actions.

* The subnet wallet holds only $ALOT for gas payments. That’s why the Subnet wallet is also referred to as the “Gas Tank”.

![gastank](/images/subnet/gastank.png)
* “Add Gas” will transfer ALOT from portfolioSub to subnet wallet.
* “Remove Gas” will transfer ALOT from the Subnet wallet to PortfolioSub.
![subnetportfolio](/images/subnet/subnetportfolio.png)

* ALOT available in the PortfolioSub transferred from Mainnet wallet or Subnet wallet (“Gas Tank”) can be used in trading or withdrawals.

* PortfolioSub tracks the Total and Available balances of users’ assets without creating any ERC20s in the subnet. These balances are updated when deposit, withdrawal and trading functions are used.

* As there are no ERC20 tokens in the Subnet and only the ALOT balance (“Gas Tank” balance) will be visible in the wallets like Core or MetaMask when connected to the Subnet.

* All trading is done while connected to the subnet.
One can withdraw an asset only when connected to the Subnet. The withdrawal removes the amount from the PortfolioSub and unlocks the same amount from the PortfolioMain, subsequently transferring the withdrawn asset to the user’s Mainnet wallet all in one transaction.

* Additional bridges will be introduced in the future by deploying multiple PortfolioMain contracts for different chains.

## Roadmap

![roadmap](/images/subnet/roadmap.png)
Stay tuned for upcoming announcements, media, and articles that will show you how to test and try out the new Dexalot Subnet.

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
