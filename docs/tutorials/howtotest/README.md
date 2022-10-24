---
editLink: true
---

# The Dexalot-Subnet Public Testing

 **How to Test**

![Dextr](/images/howtotest/dextrcomp.png)
— Welcome to the Dexalot-Subnet —

## **Introduction**

The Dexalot team is happy to present the Dexalot-Subnet for public testing. The dev team spent months of non-stop programming writing smart contracts and other code to migrate Dexalot’s Mainnet to the Dexalot Subnet. Dexalot would love your help to make the Dexalot Subnet even better. We are grateful to the community for helping us to get here. Thank you for helping us to get to the next stage in the development of Dexalot.

Since the Subnet is essentially just like the Mainnet you are familiar with, you can just connect and use it.

### **Navigate to this URL and you are good to go.**

Feel free to try it out using this Introduction or read below to learn more to help and guide you in your testing.

<YouTube id="vRvaswPuMNg" />

This is a public beta and we hope the community can help us stress-test our systems. If you want to help, but don’t know where to start, feel free to use the task list below.

The Dexalot developers will address as many bugs and usability issues as possible. Please report back any observations and concerns you would like the team to examine. Please attach screenshots of your concerns and enough information including transaction ids to assist them in addressing your observations and they will make changes as necessary.

You can email the team your report at [support@dexalot.com](support@dexalot.com). Dexalot community managers and moderators are available in Discord to help you and you may leave your comments in the Subnet Testing thread within the #Subnet channel. See you there!

**Happy Testing!!**

## **Architecture**

Dexalot’s new architecture is accessed through its front end, which has been upgraded to be Mainnet and Subnet aware simultaneously. The novel dual-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed.

The frontend app is similar to the single-chain implementation already in place, while the underlying contracts, backend, and database architecture have all seen substantial changes. There is no separate bridging interface. All bridge functionality is integrated into Dexalot’s Mainnet smart contracts portfolio (PortfolioMain) and Subnet portfolio (PortfolioSub) to provide a seamless user experience for you. LayerZero will be the sole bridge provider at the start, and more bridges could be added in the future as needed.

![roadmap](/images/howtotest/roadmp.png)

This approach allows Dexalot to scale to multiple bridges (to further reduce risk from single points of failure) and for assets in chains other than Avalanche to be tradeable on the Dexalot-Subnet.

## Things to remember, new features and key concepts

* One can deposit an asset only when connected to the Mainnet. The deposit locks the user’s asset on the PortfolioMain and deposits the same amount in the PortfolioSub all in one transaction.

* Users will have two wallets for each account: one in the Mainnet and one in the Subnet accessible through supported wallet applications like Core, MetaMask and WalletConnect providers. More wallets will be added in the future.

* The Mainnet wallet holds all assets in the Mainnet as before, and assets need to be deposited into Dexalot there for trading. All bridge functions are integrated into deposit and withdrawal actions.

* The Subnet wallet holds only $ALOT for gas payments. That’s why the Subnet wallet is also referred to as the “Gas Tank”.

![submaintank](/images/howtotest/submaintank.png)

* “Add Gas” transfers ALOT from portfolioSub to the Subnet wallet.

* “Remove Gas” transfers ALOT from the Subnet wallet to PortfolioSub.

![addrmgas](/images/howtotest/addrmgas.png)

* ALOT available in the PortfolioSub transferred from the Mainnet wallet or the Subnet wallet (“Gas Tank”) can be used in trading or withdrawals.

* PortfolioSub tracks the Total and Available balances of a users’ assets without creating any ERC20s in the Subnet. These balances are updated when deposit, withdrawal and trading functions are used.

* As there are no ERC20 tokens in the Subnet, only the ALOT balance (“Gas Tank” balance) will be visible in the wallets like Core or MetaMask when connected to the Subnet.

* All trading is done while connected to the Subnet.

* One can withdraw an asset only when connected to the Subnet. The withdrawal removes the amount from the PortfolioSub and unlocks the same amount from the PortfolioMain, subsequently transferring the withdrawn asset to the user’s Mainnet wallet all in one transaction.

* Additional bridges will be introduced in the future by deploying multiple PortfolioMain contracts for different chains.

## **Testing Task List**

Please note the following points during your tests:

1.  For every task below keep track of your amounts in your wallets as well as portfolio total and available. Make sure the amounts add up to what you are expecting to see. Make these sanity checks as you carry on with your tests.

2.  6–12 blocks need to be created before a deposit or withdrawal is committed to the chain as it involves a message transfer over the bridge. As the activity on Fuji is relatively high the rate-limiting step will be the activity on the Subnet. Depending on the level of Subnet activity, the transfer operations may be delayed. If funds are not delivered even after 1 hour please alert the dev team via support channels as the bridge may be blocked.

* Deposit from the Mainnet to the Subnet at least for the following three assets (for convenience the Fuji addresses of assets supported in the Subnet are included):

* AVAX (native)

* ALOT (0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6)

One of

1.  ETH (0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C)

2.  SER (0xf52602253474ddaF6111133ADc1F7C3d28A30ABd)

3. USDC (0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54)

4. USDT.e (0x2B62a6c0C750250034e328547Aa38830bd768a18)

Switch to the Subnet and enter at least 4 maker orders (2 sell and 2 buy orders) for each of your assets.
Use “Replace Order” for each asset at least once to change one parameter of the order.
Use the new “Send in Subnet” functionality to send funds to another account you have.
From another account, enter at least 1 taker order for each of your assets.
Withdraw your assets back to the Mainnet.
