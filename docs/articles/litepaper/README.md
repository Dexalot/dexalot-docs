---
editLink: true
---

# Litepaper

## Executive Summary

Dexalot’s mission is to bring the traditional exchange experience - namely the Central Limit Order Book capability - in a decentralized manner through the use of a fast and scalable blockchain - Avalanche.

Dexalot is built on Avalanche platform’s C-Chain technology for its implementation as it offers the following advantages:
1. 100% compatibility with the mature Ethereum Virtual Machine technology.
2. Transactional speeds with 1-2 second finality.
3. Transactional throughput that can withstand thousands of transactions per second.
4. Low cost of deployment and operation.

## Introduction

Dexalot is an exchange aiming at bringing the traditional centralized exchange user experience without compromising on decentralization and transparency. As such Dexalot implements an on-chain Central Limit Order Book for its trade pairs on the Avalanche platform.  Dexalot allows for users to trade ERC20 tokens supported on the C-chain against the blockchain native currency AVAX. Users can also trade supported ERC20 tokens against other supported ERC20 tokens.

Dexalot has three differentiating characteristics that set it apart from other centralized and decentralized exchanges:

* **Ability to place limit orders fully on-chain**

  Traders can set the size and limit price for their orders. If an order matches an existing order in the order book in terms of price, it removes liquidity (taker order) and executes immediately. If there are no immediate matches in the order book, the order will be added to the order book as a new maker order. Taker orders do not have to be all-or-nothing (AON) as Dexalot supports partially filled orders where the unfilled portion of an order automatically enters the order book as a maker order. Dexalot supports market orders as well but this functionality will be turned on for  trade pairs individually  that reach  appropriate liquidity levels.
* **Inclusion of users through governance**

  Dexalot will issue its native token in the near future to implement a governance model as well as create incentives for it's loyal users. The distribution of the token will follow a fair distribution model to ensure strong community ownership and participation in governance.

* **Built on Avalanche**

  exalot chose the Avalanche platform for its obvious advantages in speed, throughput and near-instantaneous finality. Previous attempts to bring Central Limit Order Book Functionality on blockchains with inferior consensus protocols typically led to limited adoption, high slippage and large amounts of market risk for the users. Dexalot solves these problems by operating on the C-Chain and it will also look to further improve usability and user experience by potentially moving the technology to a subnet after key platform updates and  adequate adoption.

## Exchange

### Overview

Dexalot is accessible through the website at [dexalot.com](https://dexalot.com) compatible with recent versions of Chrome, Edge, Brave, Opera and Firefox desktop browsers. Dexalot will initially support Metamask and traders will need to install the extension (or the mobile application) to be able to trade. MetaMask is the initial wallet integration of choice due to its wide adoption and proven track record. Dexalot will integrate more wallets in the future to provide additional flexibility to users.

All transactions that lead to a state change on the blockchain (depositing funds into Dexalot smart contract, withdrawing funds from Dexalot smart contract, placing limit order into the orderbook, taking liquidity by trading against an order in the book via either limit or market order and canceling existing orders) require a confirmation via the MetaMask wallet and network transaction fee. The network transaction fee is inherent to the Avalanche platform and it is always paid from the wallet of the trader initiating the operation.

Activity on the Dexalot platform will also incur an additional platform fee which is collected by the smart contract and will be used for enhancing the platform.

### Technology

All smart contracts are coded in Solidity v8.x and they are available from the project github repository with an BUSL 1.1 license at [github.com/dexalot/contracts](https://github.com/dexalot/contracts). Dexalot’s collection of smart contracts make extensive use of OpenZeppelin upgradeable contracts available from [github.com/OpenZeppelin/openzeppelin-contracts-upgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable). All traders and smart contract enthusiasts are welcome to scrutinize the code for security and become part of the development. Dexalot’s smart contracts are fully audited by Ava Labs and Hacken OU.

The Dexalot platform is made up of components that provide various services:

**User Wallet**: Users will utilize their wallets (Metamask to start) to connect and interact with Dexalot.

**Frontend**: This is the user interface for Dexalot where users can view the order book, place orders, cancel existing orders and can track their portfolio.

**Backend**: This is the server side infrastructure that is responsible for responding to the interactions from the frontend, recording the transaction activity into the database, and serving data back to the frontend.

**Smart Contracts**: This is the collection of smart contracts that are deployed on Avalanche C-Chain which houses the on-chain order and trade information. This component is also responsible for performing the settlement when two orders are matched.

**Database**: A PostgreSQL database is leveraged to keep a drop copy of all transactions on the exchange  as well as associated  events for performant response to the frontend.

**Automated Market Makers**: These are the participants who are providing liquidity and two way pricing on Dexalot.

![Dexalot Architecture](/images/litepaper/architecture_1.png)

### Privacy

Dexalot’s web portal is designed with decentralized, permissionless and trustless principles in mind. Therefore, the Dexalot platform does not collect any personally identifiable information. It does not use cookies, web beacons or any other tracking technology to collect personal information. It does not use any third party ad services either.

The only trace of your visit to the application website will be in the web server log files and in the log files of hosting providers. Logs would only be used for security audits and web server performance optimization tasks. The purpose of the information is for analyzing trends, optimizing website performance based on users' activity on the website, and gathering geographic information. This activity is generally accepted as common practice.

### Matching Algorithm

Dexalot will initially support MARKET and LIMIT  order functionality.

* **MARKET orders are orders that immediately interact with available liquidity.**

  If a user places a BUY MARKET order, the order will be filled by matching with the best available offer(s).

* **LIMIT orders are orders that are targeting a specific price level.**

  If a user places a BUY LIMIT order that is not immediately marketable (i.e. there are no offers -a user willing to sell- at the limit price), the order will enter the order book and wait to be filled by another user willing to sell at the limit price.
  If a user places a BUY LIMIT order that is already marketable (i.e. there already exists an offer -a user willing to sell- at the limit price), the order will be filled by matching with the best offer(s). If the order is not fully filled and becomes non-marketable, then the remaining amount of the order will enter the order book and wait to be filled by another user willing to sell at the limit price.

Dexalot utilizes **price-time priority** as the methodology of ordering its order book. In other words, the **highest priority will be given to the orders that have the best price (lowest price to sell OR highest price to buy)**. If multiple orders are placed at the same price, whichever order gets inserted into the book first will have the priority for filling the order.

The following logic is applied to determine matching trades when a new order is submitted:

1. Determine the side of the order: BUY or SELL.
2. Trigger a matching taker trade if one of these conditions hold
    - BUY side: LIMIT order price >= lowest priced order on the sell book
    - SELL side: LIMIT order price <= highest priced order on the buy book
3. Add the incoming order as a maker order to its side’s order book if the order is not filled, or partially filled. This maker order stays idle until a new order comes in that triggers a match for it or until CANCELED.
4. If it is a MARKET order, the order traverses the opposite side order book, executing all available prices from best to worst, until filled. If MARKET order takes out the entire order book with its size without running out of gas, and still PARTIALLY FILLED, it gets an unsolicited CANCEL for the remaining unfilled quantity.
5. If it is a sizeable MARKET order that is traversing the order book, the Maximum Slippage Percent parameter (currently at 20%)  will force an unsolicited CANCEL for the unfilled portion of the order if the next partial execution price is 20% worse then the very first partial execution price that it started with.

There are various additional operational parameters that are configured for the trading activity such as minimum tick size (the difference between each consecutive price level in the order book),  max trade size, min trade size. These parameters are configured with sensible defaults and they will be administered through a multisig wallet initially. Once the governance is live, these configurations will be rolled into the governance model.

Separately, a new trading pair will be listed with LIMIT order type only. MARKET order type will be added when liquidity targets are achieved for that trade pair.

### Dexalot Token

Dexalot token is intended to be a utility and governance token for the Dexalot ecosystem.

The planned utility for the Dexalot token is as follows:
* **Governance**: Dexalot token is planned to be the token for governing the future of Dexalot. Governance details will be discussed in the next section.
* **Gas**: Dexalot token is planned to be the main currency for gas payments when Dexalot moves to its own subnet.
* **Staking**: Dexalot token is planned to be stake-able and delegate-able by validators and delegators to secure the subnet (similarly to the X, P and C chains of Avalanche itself) and to drive good behavior on the platform.
* **Incentives**: Dexalot token may also be utilized in the future as an incentive to promote the platform and incentivize users to use Dexalot.

### Dexalot Tokenomics

The Dexalot token will be distributed to the community through a variety of mechanisms.

| Type of Distribution | % of Supply | Vesting Schedule |
|----------------------|-------------|------------------|
| Operational Rewards | 50.0% | 200,000/month first 6 months, then 1.2% monthly |
| Foundation | 14.0% | 3.33% TGE, 30 Months linear vesting |
| Team | 12.0% | 0% TGE, 6 months cliff, 42 months linear vesting |
| Investors | 10.5% | 15% TGE, 3 months cliff, 21 months linear vesting |
| Dropalot (Airdrop) | 3.0% | 1-3 months cliff after TGE, variable vesting |
| Avalanche Blizzard Fund | 4.0% | 15% TGE, 3 months cliff, 21 months linear vesting |
| Liquidity | 4.0% | 100% TGE |
| Avalaunch IDO | 2.5% | 25% TGE, 3 months cliff, 9 months linear vesting |

#### Token Allocations

![Token Allocations](/images/litepaper/allocations_1.png)

#### Token Emissions

![Token Emissions](/images/litepaper/emissions_1.png)

### Governance

The first few months after launch will be critical for Dexalot’s long-term viability. A multisig wallet will administer the key aspects of the Dexalot platform until appropriate adoption is reached. Once an appropriate number of users is achieved, a clear and fair plan will transition the operational parameters of the Dexalot platform into a governance model.

With the above said, the intention is to keep this period as short as practically possible.  Active and heavy usage of the Dexalot platform through the end of 2021 would allow for a fair assessment of Dexalot’s stability and security. If the usage patterns do not reach enough trading capacity in this period, it can be extended to be able to make a conclusive assessment in terms of system stability and security.

#### Roadmap

    Q3 2021 - Testnet Launch
    Q4 2021 - Mainnet launch with multisig wallet
    Q2 2022 - Transition to governance
    Q2/3 2022 - Transition to subnet

#### Fees at Launch
There will be no fees at the launch of Dexalot. Fees may change after the launch in line with the community and governance requirements.

The above state-changing functions will additionally incur network fees imposed by the underlying Avalanche platform. These network fees are not collected by Dexalot and they depend on the following two factors: a) the gas the above functions use, and b) the current gas price on the platform. The concepts of gas and gas price are central to the operation of Ethereum Virtual Machine (EVM) implementation of Avalanche’s C-Chain just like the original implementation from Ethereum team. They form an effective mechanism for auto-regulating network traffic and contract implementations. For a more detailed discussion of gas and gas price please refer to the documentation from Ethereum’s website for developers at [ethereum.org/en/developers/docs/gas](https://ethereum.org/en/developers/docs/gas).

The Avalanche platform (C-Chain) has dynamic fees currently which fluctuate depending on the demand on the platform, but overall it is significantly cheaper compared to other blockchains (such as Ethereum). Separately, the Avalanche development team is constantly working on improving transactional efficiency and reducing the blockchain fees.

One important caveat for users is that, if a user utilizes a market order that would clear multiple price levels (i.e. the order would need to interact against multiple orders at different prices) to fill, the transaction fee paid would also be higher since more computation would be needed to fill the order.  Effectively, simpler operations will incur lower transaction fees.

#### Trade Pairs at Launch
Dexalot will start with a single trade pair and expects the multisig and governance to gradually add from a pool of 10 trade pairs.The pool includes top traded pairs from existing DEXs on the Avalanche platform.

#### Research and Development

After the initial launch, Dexalot will need resourcing for new development, user experience enhancements, day to day operations and partnerships. The vision is to pursue a similar model to previously successful DeFi projects where the revenue derived from the Dexalot platform drives the new development, and the allocation of such revenue is dictated by the governance model, i.e. the community and stakeholders of the platform.

The list of groups that may receive funding include (but not limited to):

1. Core development team working on projects prioritized by the governance proposals and funding.
2. Community members with the necessary skill set working on their own proposals and receiving funding through governance proposals as research grants.
3. Contractors brought in to work on some proposed projects to accelerate development or fill gaps in the core team and community’s expertise.

## Strategic Road Map

### Governance

The governance feature is explained above as it is central to Dexalot’s vision for community participation and democratization of its management.

### Avalanche Subnet

Avalanche platform offers the capability to create a dedicated subnet (a blockchain) with its own virtual machine, which Dexalot is planning to utilize shortly after launch.  The goal of this effort would be to increase the transaction speed by at least 10 fold, decrease transaction fees to negligible levels in addition to improving the user experience, community engagement, and capital efficiency.

### Frontend, Backend Development, Infrastructure Expansion

* Application(s) to support governance framework (Custom or 3rd party apps)
* All components will have to be reviewed/revised to interface with the subnet.
* Infrastructure will have to be constantly monitored to identify  the most demanding regions and mitigate the bottlenecks by adding cloud resources appropriately. For example, additional load-balanced  backend servers can be deployed in Asia, servicing the Asian region.
* When the user demand reaches a certain point, an in-memory database such as Redis may be implemented for low latency actions servicing the frontend (e.g. charts, prices, etc.)
* More internationalization options for the frontend will certainly be expected as Dexalot grows.

## Conclusion

Dexalot is looking to bring transparent, user friendly and modern trading to the Avalanche community. We are looking to bring the traditional centralized exchange look and feel through a decentralized application on Avalanche.  All crypto enthusiasts as well as traders are invited to explore its capabilities and become part of the Dexalot community.
