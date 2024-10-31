---
editLink: true
---

# Releases

## 15.11.2024 Release - Possible Breaking Changes!

This release includes some breaking changes! Please check and make sure your integration is working on our test environment before the release date.

### Documentation Links:

* [Dexalot Api Docs](/apiv2)
* [Dexalot Contract Docs](/contracts)

Full List of changes related to this release can be found in [version history](/contracts/#version-history)

### Contract Event Changes:

* Event signature changed for OrderStatusChanged. New event version will be version=3 in the events you receive from the chain.

### New Trading functions to implement:

* [AddNewOrder](/contracts/TradePairs.html#addneworder)
* [AddOrderList](/contracts/TradePairs.html#addorderlist)
* [CancelAddList](/contracts/TradePairs.html#canceladdlist)

---
**Author**: Ilker Ulutas
