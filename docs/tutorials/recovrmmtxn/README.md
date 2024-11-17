---
editLink: true
---

# How to Fix Pending Metamask Transactions

 ![fixmmcover](/images/recovrmmtxn/fixpendngcvr.png)

 Dexalot is built on top of the Avalanche network, which is clearly growing in popularity very quickly. One consequence of this growing use: gas fees can be periodically high for one app as a result of high activity on another app. When traffic is high, [transactions can be pending](https://snowtrace.io/chart/pendingtx) for longer than usual.

 ![pendingchart](/images/recovrmmtxn/pendngchrt.png)

Dexalot itself does not have a high enough amount of activity to result in high gas costs for other apps, or cause other transactions to remain pending for long periods. If you check the [Snow Trace gas tracker](https://snowtrace.io/gastracker) , you’ll be able to see when the gas costs are high and transactions are “stuck” on the network. The Gas Tracker continuously updates the pending transactions, and sorts by the price of gas being spent for each transaction.

 ![gastransactionsorted](/images/recovrmmtxn/gastxnsortd.png)

An average gas cost of anything greater than 30 nAVAX means that your Dexalot transaction will take longer than normal to complete. Transaction gas costs of over 20–30 nAVAX indicate an increasingly congested blockchain network state.

 ![metamaskpending](/images/recovrmmtxn/mmpending.png)

Before you try one of one of the two two solutions listed below, simply do a hard refresh of your browser (Press Ctrl+F5 , Shift+F5 or Ctrl+Shift+R). If this doesn’t work, you can cancel the transaction if you’re no longer interested in having the pending transaction complete.

## Solution 1 — Increase gas being spent for your existing and pending transaction

![pendingspeedup](/images/recovrmmtxn/pendngspeedup.png)

You can click on the “speed up” button to edit your priority and max fee. By default, the new transaction has slightly more priority and max fee (say 10% more than the previous), but you can edit to your liking.

![speedupoptions](/images/recovrmmtxn/speedpopts.png)

Have a look at Snowtrace’s gas tracker to get an estimate of the average base fee, which is currently getting accepted. If the max fee of the network is much higher than your transaction, set the max fee cap to match the network’s. In the example above, you could set the max fee cap somewhere between 60 and 74 GWEI(in nAVAX). Once you’ve decided, click Save. You have now sped up your transaction, and hopefully, it will go through faster than if the gas being spent hadn’t been increased.

If you already know that the network is busy, you can choose to set the max priority fee high before you even send the transaction. That way, you might not need to speed it up later. Here is a short video explaining the process.

<VidStack src="youtube/gsfJywNxpi4" />

## Solution 2 — Force cancellation of your pending transaction by creating another transaction with the same nonce, but higher amount of gas

If the new transaction gets accepted, the nonce of the pending transaction will fail as it has already been used. Consequently, your former pending state with MetaMask will no longer exist. Your transaction will cancel out of a pending state, as long as the gas amount in the new transaction is high enough to pass through the network faster than if it hadn’t been changed. If the increased gas added to your on-going transaction results in an accepted transaction, you will exit the pending state successfully.

### 1. Enable Customized Transaction Nonce
a. Open your MetaMask plugin.

![metamaskplugin](/images/recovrmmtxn/mmplgin.png)

b. Click on the colorful circle icon on the top-right, and click Settings from the drop down menu.

![metamasksettings](/images/recovrmmtxn/mmstngs.png)

c. In the Settings menu, select **Advanced**.

d. Scroll down until you see **Advanced gas controls**. Toggle this to ON.

![gascontrols](/images/recovrmmtxn/gscntlrs.png)

e. Still in Advanced settings, keep scrolling until you see **Customize transaction nonce**. Toggle this to **ON**.

### 2. Finding the nonce of your stuck transaction
a. Open your MetaMask wallet and go into the activity session. There will be a list of your recent transactions. When you find the one that’s stuck, left click with your mouse anywhere inside the transaction field.

![transactionnonce](/images/recovrmmtxn/txnnonce.png)

*make a note of the “nonce”. That’s a kind of identifier, which we’ll re-use later — here, it’s 124

### 3. Overwrite the Stuck Transaction
Now we’re going to make a new transaction to replace the stuck one. We’ll customize the nonce number, so that it’s the same as the one that you just wrote down.

a. Create a new transaction to replace your stuck transaction. Create the exact same transaction as the one that is pending, but make this one with a custom nonce, and increase the **Transaction Fee**.

![transactionfee](/images/recovrmmtxn/txnfee.png)

b. Click on Edit

![editfee](/images/recovrmmtxn/edtfee.png)

c. Now set the max base fee to the Standard, Fast or Rapid rate you have found from the Gas Tracker — here you could set it between 60 and 70 and then click Save.

d. Find the **CUSTOM NONCE** entry and change the nonce to the number you wrote down.

![customnonce](/images/recovrmmtxn/cstmnonce.png)

e. Click **Confirm**.

f. Your new transaction should now be accepted into a block. To check, open MetaMask and click the Activity tab.

g. Your completed transaction should show at the top of your Activity list. If it still says “Pending” in orange, you’ll need to wait a little longer, or try the process again with an even higher transaction fee (gas price).

h. Since no wallet can create two transactions of the same nonce, if the replacement transaction you make is successful, your stuck transaction will be canceled.

Lastly, aside from network congestion you may have a MetaMask software issue. You may not be able know this until you have tried to speed up your transaction, and the problem persists repeatedly. If this is the case then you will need contact [MetaMask](https://metamask.zendesk.com/hc/en-us/requests/new) for support.

---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
