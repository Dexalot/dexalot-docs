---
editLink: true
---

# Releases

## November Nov-20-2024 10:00AM EST (Tentative) Release - Multiple Breaking Changes!

This release includes breaking changes! Please check and make sure your integration is working on our test environment before the release date. \
Please use the `cancelReplaceOrder` and/or `cancelAddList` functions as much as possible(rather than using `addNewOrder, addOrderList` and then `cancelOrder, cancelOrderList`) to be able to cancel your orders and add new ones `in the same block to maintain a healthy orderbook`.

### Documentation Links:

* [Dexalot Api Docs](/apiv2)
* [Dexalot Contract Docs](/contracts)

Full List of changes related to this release can be found in [version history](/contracts/#version-history)

### Note for integrations done before November 7, 2024

* A new trade parameter has been added to the `ITradePairs.NewOrder` struct as the last parameter. Please see for details [AddNewOrder](/contracts/TradePairs.html#addneworder)

### Functions deprecated

The following functions are deprecated and will no longer work. Please implement the replacement functions in the next section .

* `addOrder`
* `addLimitOrderList`
* `cancelReplaceList`


### Use NewOrder Struct when sending orders using the below functions
* Please see [newOrder](/contracts/interfaces/ITradePairs.html####NewOrder)

### New Trading functions to implement:

* if your current code base uses `addOrder`, replace it with [addNewOrder](/contracts/TradePairs.html#addneworder)
* if your current code base uses `addLimitOrderList`, replace it with [addOrderList](/contracts/TradePairs.html#addorderlist)
* if your current code base uses `cancelReplaceList`, replace it with [cancelAddList](/contracts/TradePairs.html#canceladdlist)
* Note: Please use the `cancelReplaceOrder` and/or `cancelAddList` functions as much as possible(rather than using  `addNewOrder, addOrderList` and then `cancelOrder, cancelOrderList`) to be able to cancel your orders and add new ones `in the same block to maintain a healthy orderbook`. For example, suppose there is a single market maker on the orderbook X/USDC. If the market maker cancels all his orders and wait for the confirmation before sending the new orders, the orderbook can be theoretically be completely empty for a block or two which will cause a lot of grief to the market participants.

### New Trading feature: STP (Self Trade Prevention)

* Please see for details [AddNewOrder](/contracts/TradePairs.html#addneworder)

### Contract Event Changes:

* Event signature changed for `OrderStatusChanged`. New event `version` will be `3` in the events you receive from the chain.

### Special note for bots that relied on addOrder function

* `addOrder` function heavily relied on `REVERTS` rather than `REJECTS`. Most of the `REVERTS` conditions have been replaced with `REJECTS` in the new addNewOrder. This is to ensure that all responses from all the new trading functions above are consistent. Please see `REVERTS`vs `REJECTS` in [addNewOrder](/contracts/TradePairs.html#addneworder)


---
**Author**: Ilker Ulutas
