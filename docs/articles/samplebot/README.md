---
editLink: true
---

# Dexalot's Sample Bot


![samplebot](/images/samplebot/samplebot.png)

Dexalot has abstracted some of the backbone of its Market Maker’s source code into the SampleBot [repository](https://github.com/Dexalot/samplebot) for use with Dexalot’s newest [contracts](https://github.com/Dexalot/contracts/tree/main/contracts). Some ideas and terms about trading, market making and what you might consider building on top of Dexalot can be found in [Trading & Market Making](https://medium.com/dexalot/trading-market-making-beb86c6ab159) and [Trading Glossary](https://medium.com/dexalot/dexalot-trading-glossary-88f0406fd41c).

[https://github.com/Dexalot/samplebot](https://github.com/Dexalot/samplebot)

SampleBot extends the AbstractBot and utilizes connections to the Dexalot RestAPI on the Testnet (api.dexalot-test.com/api/). Please note that this code is not compatible with the currently deployed Mainnet contracts nor the mainnet RestAPI. However, it can be used to interact with contracts deployed on Fuji testnet as a preparation for production release planned for early January 2023. Dexalot’s latest RestAPI documentation is available [here](https://docs.dexalot-test.com/).

Feel free to change SampleBot and/or add a new bot type that extends the AbstractBot. Please see [the README.md file](https://github.com/Dexalot/samplebot) for installation instructions and more details. Here are some of the functions that SampleBot can perform:

* Get the mainnet/subnet environments, pairs listed, token details from the RESTAPI
* Create references to the necessary contracts
* Requests open orders from the RESTAPI in case of crash recovery
* Keeps a list of its outstanding orders, and a local orderbook in memory
* Gets the best 2 bid/asks orderbook from the chain
* SampleBot listens to OrderStatusChanged events from the blockchain in case one of its outstanding orders gets hit/lifted.
* SampleBot also captures OrderStatusChanged events as a part of tx results when sending an order and updates the order status in memory. The OrderStatusChanged event is raised from the blockchain to all the listeners a few seconds later. So the same event is processed twice. Once when the order is sent out and again when it is received from the blockchain by the independent listener thread. Hence it is normal to see the message “Duplicate Order event: ……”
* Double Checks the order status from the chain every 10 min, in case an OrderStatusChanged event is missed.

---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
