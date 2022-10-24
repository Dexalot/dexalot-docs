---
editLink: true
---

# Dexalot Discovery

## Where No Dex Has Gone Before

![discoverybanner](/images/discovery/discoverybanner.png)

* IDOs work well, but launching tokens on AMMs simply doesn’t.
* AMMs don’t have limit order functionality, slippage control isn’t enough.
* Bots and MEV are wrecking users during launches.
* Dexalot presents  **Dexalot Discovery** to solve these problems.
* **Dexalot Discovery**  will support limit orders.
* **Dexalot Discovery** will prevent bots from shutting out users.
* **Dexalot Discovery**will give users ample time to enter orders and match.
* **Dexalot Discovery** will create a more orderly and fairer price discovery process.
* Once the price is discovered for a new asset, AMM listings should become safer!
You think the above is cool? Well then, read on!

One of the guiding principles that Dexalot embraces is the continuous improvement of community outcomes. Over the course of the last few months, the community has suffered a great number of inefficiencies during new project token listings, which led to outcomes detrimental to most users and only benefited a select few with special edges (Ex. bots, people with large nodes, etc.). Dexalot wishes to help solve these problems.

A big issue that users continuously suffer from is malicious price action that occurs during the listing of various IDOs (listings of new project tokens for trading).

Avalaunch (and others) literally paved the way to a novel and fair distribution of project allocations to a larger group of people. They’ve even implemented sophisticated algorithms to mitigate the “whale” effect, where a single large participant was ending up with too much of the allocation. There are now other IDO platforms doing their part in assisting ecosystem projects raise capital and are employing ideas to minimize the effects of bad actors as well. Dexalot has partnered with Avalaunch and is a firm believer in their ethos and their capabilities.

While the pre-market capital raise process works quite well, the issues begin when the projects complete their capital raise and the time comes for listing.

## Here are the high-level issues that we know exist when IDOs gets listed:

* IDOs are typically launched on AMM platforms, such as Uniswap, which open up for trading at a specific time (single transaction functionality), which creates a situation where speed matters.

* If we expand on the speed concept you can see that whoever gets the first execution once the token is listed gets the best price, because everybody ends up racing to buy at the same time. Effectively, this incentivizes people to find the best way to be the first or at least to be as early as possible.

* The first and simpler thing to do is to write software that automatically sends the appropriate transactions to buy. This is useful because it bypasses the human element of mouse movements, mouse clicks, transaction approvals and the slowness often caused by interacting with a user wallet. These actions are in the order of a few seconds, but if you are trying to be the first, it still matters.

* The second and more nefarious thing to do is, utilizing the MEV (Miner Extractable Value) attack surface (as discussed by Emin Gun Sirer here) if you have a large enough node. At a high level, Avalanche consensus mechanism works by nodes querying other nodes to reach a final answer. Each node picks another node to query using a probabilistic calculation. The probabilities are calculated based on the stake weight of the nodes, and in effect if you have a node that has a sufficiently large stake, you will be asked for ‘your opinion’ of which transaction should go in first more than others on average.

* Putting this info to work, if you have a sufficiently large node and you know how to prioritize your transactions, you have a good chance of being asked ‘your opinion’ at the time of an IDO listing and you will have the opportunity to put your transaction (a buy order) first. This is fairly capital intensive of course, but if you participated in the original Avalanche sale, you know the tokens were sold at prices that are significantly different than what they are today. Secondly, if you know that a project is under a reasonable amount of demand by the market, it’s really lucrative to grab the first share of the tokens as soon as they hit the market and then turn around and sell to other would-be buyers once their transaction requests start trickling in.

* Users who use AMMs to purchase newly listed projects have to define a slippage % (how much tolerance in price they accept when they trade) in lieu of the actual price they’d like to buy the tokens at.

* Because the IDO listing time usually ends up very competitive (because all users are racing to buy as soon as possible), most users are forced to have large slippage percentages since it is very difficult to define what the number needs to be to ensure efficient and effective trade transactions. Typically, users have to pick large numbers just to have their order get executed at all.

* The net result is that retail users who are “slow” transaction-wise, suffering relatively long latencies associated with using wallets like Metamask, have to use very large slippage % settings so that their orders get executed. Users however who have automation and knowledge around how to take advantage of the mechanics of consensus have a distinctive edge to make money without really necessarily intending to invest into any project.

## Dexalot presents Dexalot Discovery to even the playing field.

* **Dexalot Discovery** aims to solve the above problems by creating a fair process by which users and the overall the market can discover the appropriate price for newly listed tokens without worrying about speed or bots.

* **Dexalot Discovery** incorporates some of the key lessons learned from successful ecosystem projects and will implement the following process for projects to list their tokens fairly and transparently on Dexalot:

1. A Project works with and integrates with Dexalot; it creates the option of depositing project tokens into Dexalot and this option gets enabled at a pre-defined number of hours before claims become available (ex. 8 hours). Dexalot withdrawals will be disabled for the project token.

2. Avalaunch coordinates with Dexalot to integrate; creates the option of depositing project tokens into Dexalot and this option gets enabled a pre-defined number of hours before claims become available (ex. 8 hours). Dexalot withdrawals will be disabled for the project token.

3. Dexalot order book starts in “no-match” mode, a mode where users who deposit the counter asset (AVAX or USDT) can place BUY limit orders for the token and users who deposited the project token can place SELL limit orders. All the orders are displayed transparently and continuously to the community.

4. Users have the ability to cancel and replace orders throughout the pre-defined period (ex. 8 hours). Sellers are required to have the actual tokens deposited to be able to sell, but buyers can place buy orders as long as they have deposited the correct amount of the counter asset.

5. At the end of the order acceptance period, order acceptance will stop and, Dexalot enters into a “matching” mode wherein buy and sell limit orders are matched and the initial price for the asset is discovered (fills occur at prices that users had 8 hours to decide and place limit orders for).

6. Once the matching of the orders is complete, the order book enters “normal” mode. At this stage, Avalaunch, the Project and Dexalot all coordinate to enable claim/withdraw for buyers of the token.

7. Any participating Project can now utilize their liquidity allocations to create liquidity pools if they choose to do so on various AMMs with the discovered price and continue to be priced on Dexalot.

## Conclusion

In essence, Dexalot can utilize its CLOB capability with a few enhancements to equalize the chance for anyone to get a piece of a particular project. Users should have ample time to present their best bids and offers (similar to how one registers for an IDO on Avalaunch). They don’t have to worry about being front-run by bots or people who know more about the technical ins and outs of how the Avalanche platform works. Ultimately, users will have a better outcome by participating in the ecosystem this way. Dexalot also understands that it is extremely difficult to build a killer decentralized application in the environment that we operate in today. We would like to make at least the listing-part easier for all rockstar teams who are building new and cool products for the Avalanche ecosystem.

While Dexalot is aiming to mitigate as much nefarious activity as possible with the above process, we know that updating our mitigation implementation is a battle that we will have to wage going forward because the space is ever-evolving. Dexalot is intending to continuously evaluate, monitor, and improve this process as more data is collected and more projects are listed.

The above process is a product of many discussions with ecosystem champions. However, Dexalot knows that there are folks out there who can improve it even more. If you are one of those people who have a bright idea to further improve Dexalot Discovery for the end-user, please don’t hesitate to reach out to us either by Twitter, Telegram or our newly minted Discord.

**See you soon anon!**

**Where no DEX has gone before!**

Author: FireStorm

Editor: Brad McFall

Graphics: Can Toygar

# About Dexalot:
Dexalot is a revolutionary decentralized exchange aiming at bringing the traditional centralized exchange look and feel to a decentralized on-chain application. Its mission is to bring a truly inclusive and transparent environment where Dexalot users can trade crypto securely and efficiently, with no slippage or custody risk. It is built on Avalanche, the fastest smart contracts platform in the blockchain industry.

[Website](https://dexalot.com/) | [Twitter](https://twitter.com/dexalotcom) | [Telegram](https://t.me/dexalot)| [Medium](https://medium.com/dexalot) |[Discord](https://discord.gg/dexalot)
