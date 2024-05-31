---
editLink: true
---
# Moving from non-standard avalanche symbols to standard symbols

Dexalot is moving to use the standard symbols instead of non-standard avalanche symbols to be able to combine liquidity from different chains. With the multichain architecture deployed  with this BTC.b from Avalanche can be traded as one with WBTC from Arbitrum.

On the day of converstion, all activity on BTC.b/USDC pair will be paused except cancellations and will remain visible until all outstanding orders from all traders are canceled.
We'll also list BTC/USDC pair at the same time so you can immediately start quoting on the new pair.

When your network is switched to Dexalot Subnet you will see 2 different lines for Bitcoin.
One line with the old non-stdard avalanche symbol BTC.b
Another line with the new standard symbol BTC.


## Steps

- Switch your network to Dexalot Subnet
- Cancel all of your outstanding orders on the paused BTC.b/USDC orderbook.
- Make sure that your Portfolio Total is equal to your Portfolio Available under the "Balances" tab for BTC.b line.
![tokenconversion](/images/tokenconversion/btc1a.png)
- Under the "Balances" tab, use the 3 dots on the right and pick "Convert to BTC" to convert your BTC.b to BTC
![tokenconversion](/images/tokenconversion/btc2a.png)
![tokenconversion](/images/tokenconversion/btc3a.png)
- Make sure that your new standard BTC token balance line is updated with the amount converted.
- You can now start trading with the new BTC/USDC pair


BTC.b line in the "Balances" Tab will remain visible until all traders have converted all their BTC.b. We do not have a way to control the user funds on their belhalf.
