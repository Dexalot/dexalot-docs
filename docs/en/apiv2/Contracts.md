---
icon: link
prev: RestApi
next: Websocket
editLink: true
---

# Contracts

## Subnet Contract Invocations

1. Perform "Deposit to subnet" from the frontend for each token of
the tradepair you will be market making.

![Deposit to Subnet](/images/api/deposit_to_subnet.png)

This may take anywhere between 20 seconds to 2 minutes depending on the
bridge used. This action will automatically remove a set amount from the
token transferred and add an equivalent amount of ALOT into your subnet
wallet in case you don’t have enough ALOT in your subnet wallet.

2. Get a reference to TradePairs contract in the subnet using the
GetDeployment REST API EndPoint

`trading/deployment/params?contractType=TradePairs&returnAbi=true&env=fuji-multi-subnet`

You need this reference to add/cancel/check status of the orders , get
orderbook from the chain and listen to various events emitted from the
tradePairs.

3. get the reference to PortfolioSub Contract as well

`trading/deployment/params?contractType=Portfolio&returnAbi=true&env=fuji-multi-subnet`

You will need this to fill up your gas tank to be able to continue to
perform transactions in our subnet when you are running low. You can
choose to not automate this part either and just use Dexalot frontend
instead.

You also need this contract to check your balances of your holdings in
the subnet.

### Order Enum Type Reference

```ts
static OrderStatus: any = {
    "0": "NEW", //Order is in the orderbook with no trades/executions
    "1": "REJECTED", // Order is rejected. Currently used addLimitOrderList, cancelReplaceList to notify when an order from the list is
     // rejected instead of reverting the entire order list
    "2": "PARTIAL", //Order filled partially and it remains in the orderbook until FILLED/CANCELED
    "3": "FILLED", //Order filled fully and removed from the orderbook
    "4": "CANCELED", //Order canceled and removed from the orderbook. PARTIAL before CANCELED is allowed
    "5": "EXPIRED",  // For future use
    "6": "KILLED", // For future use
    "7": "CANCEL_REJECT", // Cancel Request Rejected with reason code and may only be from cancelOrderList
}
```

```ts
static OrderSide: any = {
 "BUY": 0
 "SELL": 1 }
```

```ts
static OrderType1 = {
"0": "MARKET",
"1": "LIMIT",
"2": "STOP",     // not used
"3": "STOPLIMIT" // not used }
```

```ts
static OrderType2 = {
    "0": "GTC"   // Good Till Cancel, may or may not get a fill, the remaining amount goes in the orderbook
    "1": "FOK"   // Fill or Kill - requires immediate full fill or reverts
    "2": "IOC"   // Immediate or Cancel - gets 0 or more fills & then the remaining amount is canceled. it will not go in the orderbook
    "3": "PO"    // Post Only - Requires to go in the orderbook without any fills or reverts
 }
```

 ```ts
static BridgeProvider = {
    "0" - LayerZero,
    "1" - CELER --not used
}
 ```

### TradePairs Contract (Only in Subnet)

#### Events

##### OrderStatusChanged

```solidity
 event OrderStatusChanged(
    uint8 version,
    address indexed traderaddress,
    bytes32 indexed pair,
    bytes32 orderId,
    bytes32 clientOrderId,
    uint price,
    uint totalamount,
    uint quantity,
    Side side,
    Type1 type1,
    Type2 type2,
    Status status,
    uint quantityfilled,
    uint totalfee,
    bytes32 code
);
 ```

<table>
<colgroup>
<col style="width: 16%" />
<col style="width: 12%" />
<col style="width: 70%" />
</colgroup>
<thead>
<tr>
<th><strong>Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>version</td>
<td>uint8</td>
<td>event version</td>
</tr>
<tr>
<td>traderaddress</td>
<td>address</td>
<td>traders’s C chain wallet</td>
</tr>
<tr>
<td>pair</td>
<td>bytes32</td>
<td>traded pair. ie. ALOT/AVAX in bytes32</td>
</tr>
<tr>
<td>orderId</td>
<td>bytes32</td>
<td>unique order id assigned by the contract</td>
</tr>
<tr>
<td>clientOrderId</td>
<td>bytes32</td>
<td>order id given by the owner of the order as a reference. Please make
sure that this is unique per traderid otherwise it will be
rejected.</td>
</tr>
<tr>
<td>price</td>
<td>uint</td>
<td>price of the order entered by the trader. (0 if market order)</td>
</tr>
<tr>
<td>totalamount</td>
<td>uint</td>
<td>cumulative amount in quote currency. ⇒ price* quantityfilled . If
multiple partial fills , the new partial fill price*quantity is added to
the current value in the field. Average execution price can be quickly
calculated by totalamount/quantityfilled regardless of the number of
partial fills at different prices.</td>
</tr>
<tr>
<td>quantity</td>
<td>uint</td>
<td>order quantity</td>
</tr>
<tr>
<td>side</td>
<td>Side</td>
<td>Order side (see Order reference Data)</td>
</tr>
<tr>
<td>type1</td>
<td>Type1</td>
<td>(see Order reference Data)</td>
</tr>
<tr>
<td>type2</td>
<td>Type2</td>
<td>(see Order reference Data)</td>
</tr>
<tr>
<td>status</td>
<td>Status</td>
<td>Order Status (see Order reference Data)</td>
</tr>
<tr>
<td>quantityfilled</td>
<td>uint</td>
<td>cumulative quantity filled</td>
</tr>
<tr>
<td>totalfee</td>
<td>uint</td>
<td>Cumulative fee paid for the order (total fee is always in terms
of received currency. ie. if Buy ALOT/AVAX, fee is paid in ALOT, if Sell
ALOT/AVAX, fee is paid in AVAX<br />
Note: Order price can be different than the execution price.</td>
</tr>
<tr>
<td>code</td>
<td>bytes32</td>
<td>Reject reason when an order has REJECT or CANCEL_REJECT status when list Order functions are called, empty otherwise. Not relevant for single orders.<br />
The good orders will continue to process. But this will include rejectReason only when one or more order in the list is rejected as below: <br />
addLimitOrderList:  "status" = REJECTED and "code" = rejectReason  <br />
or cancelListOrders: "status" = CANCEL_REJECT, "code"= "T-OAEX-01"  </td>
</tr>

</thead>
<tbody>
</tbody>
</table>

#### Executed

```solidity
event Executed(
    uint8 version,
    bytes32 indexed pair,
    uint price,
    uint quantity,
    bytes32 makerOrder,
    bytes32 takerOrder,
    uint feeMaker,
    uint feeTaker,
    Side takerSide,
    uint execId,
    address indexed addressMaker,
    address indexed addressTaker
);
```

| **Field Name** | **Type**      | **Description**                                                                                                                                                                                                                                                                                                                         |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version        | uint8 version | event version                                                                                                                                                                                                                                                                                                                           |
| pair           | bytes32       | traded pair. ie. ALOT/AVAX in bytes32                                                                                                                                                                                                                                                                                                   |
| price          | uint          | executed price                                                                                                                                                                                                                                                                                                                          |
| quantity       | uint          | executed quantity                                                                                                                                                                                                                                                                                                                       |
| makerOrder     | bytes32       | Maker Order id                                                                                                                                                                                                                                                                                                                          |
| takerOrder     | bytes32       | Taker Order id                                                                                                                                                                                                                                                                                                                          |
| feeMaker       | uint          | fee paid by maker                                                                                                                                                                                                                                                                                                                       |
| feeTaker       | uint          | fee paid by taker                                                                                                                                                                                                                                                                                                                       |
| takerSide      | Side          | Side of the taker order. 0 - BUY, 1- SELL (Note: This can be used to identify the fee UNITs. If takerSide= 1, then the fee is paid by the Maker in Base Currency and the fee paid by the taker in Quote currency. If takerSide= 0 then the fee is paid by the Maker in Quote Currency and the fee is paid by the taker in Base currency |
| execId         | uint          | Unique trade id (execution id) assigned by the contract                                                                                                                                                                                                                                                                                 |
| addressMaker   | address       | maker traderaddress                                                                                                                                                                                                                                                                                                                     |
| addressTaker   | address       | taker traderaddress                                                                                                                                                                                                                                                                                                                     |

#### Functions

##### Get Order

```solidity
function getOrder(
    bytes32 _orderId
)
public
view
returns (
    struct ITradePairs.Order
)
```

###### Description

Returns the details of the order given

###### Inputs

| **Field Name** | **Type** | **Sample Value**                                                   |
|----------------|----------|--------------------------------------------------------------------|
| orderId        | bytes32  | 0x8f0bd43379dae5fc0000d81d4b4d2cf04f8b1c4145723c689f3dcb92dcdbf40c |

**Sample Contract Call**

tradePairsContract.getOrder("0x8f0bd43379dae5fc0000d81d4b4d2cf04f8b1c4145723c689f3dcb92dcdbf40c")

##### Get Order By Client Id

```solidity
function getOrderByClientOrderId(
    address _trader,
    bytes32 _clientOrderId
)
```

###### Description

Returns the details of the order with the given trader address and client order id

###### Inputs

| **Field Name** | **Type** | **Sample Value** |
|----------------|----------|------------------|
| trader         | address  |                  |
| clientOrderId  | bytes32  |                  |

##### Add Order

```solidity
function addOrder(
    address _trader,
    bytes32 _clientOrderId,
    bytes32 _tradePairId,
    uint256 _price,
    uint256 _quantity,
    enum ITradePairs.Side _side,
    enum ITradePairs.Type1 _type1,
    enum ITradePairs.Type2 _type2
)
```

###### Description

Adds an order with the given fields. As a general rule of thumb
msg.sender should be the `_trader` otherwise the tx will revert. Only
certain privileged Dexalot smart contracts can send orders on behalf of
somebody else. 'OrderStatusChanged' event will be emitted when an order
is received and committed to the blockchain. You can get the contract
generated orderid along with your clientorderid from this event.
When the blockchain is extremely busy, the transactions are queued up in
the mempool and prioritized based on their gas price. We have seen
orders waiting for hours in the mempool in Avalanche C-Chain , before
they are committed. This is a function of the blockchain and will
typically happen when the current gas price is 100 gwei (2 times the
usual gas price) and your transaction maximum gas is set to be 50
gwei(normal level). Your transaction will wait in the mempool until the
blockchain gas price goes back to normal levels.

###### Inputs

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 28%" />
<col style="width: 58%" />
</colgroup>
<tr>
<th><strong>Field Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>_trader</td>
<td>address</td>
<td>address of the trader</td>
</tr>
<tr>
<td>_clientOrderId</td>
<td>bytes32</td>
<td>clientorderid is provided by the owner of the order and it is
returned in responses for reference. Note: must be unique</td>
</tr>
<tr>
<td>_tradePairId</td>
<td>bytes32</td>
<td>pair</td>
</tr>
<tr>
<td>_price</td>
<td>uint256</td>
<td><p>price of the limit order. 0 for market Orders (type1=0).</p>
<p>Note: price increment(baseDisplayDecimals) &amp; evm decimals can be
obtained from the getPairs REST API.</p></td>
</tr>
<tr>
<td>_quantity</td>
<td>uint256</td>
<td>quantity increment(quoteDisplayDecimals) &amp; evm decimals can be
obtained from the getPairs REST API</td>
</tr>
<tr>
<td>_side</td>
<td>enum ITradePairs.Side</td>
<td>Side of the order ( see Order reference Data)</td>
</tr>
<tr>
<td>_type1</td>
<td>enum ITradePairs.Type1</td>
<td>Type of the order , LIMIT, MARKET … ( see Order reference Data)</td>
</tr>
<tr>
<td>_type2</td>
<td>enum ITradePairs.Type2</td>
<td>SubType of the order (see Order reference Data)<br />
Default 0:GTC</td>
</tr>
</table>

**Sample Contract Call**

```ts
const tx = await tradePairsContract.addOrder(
    traderaddress,
    clientorderid,
    tradePairByte32,
    utils.parseUnits(price.toFixed(this.quoteDisplayDecimals), this.quoteDecimals),
    utils.parseUnits(quantity.toFixed(this.baseDisplayDecimals), this.baseDecimals),
    side,
    type1,
    options
);

const orderLog = await tx.wait();

if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee,
                        _log.args.code
                    );
                }
            }
        }
    }
}
```

##### Cancel Order

```solidity
function cancelOrder(
    bytes32 _orderId
)
```

###### Description

Cancels the specified order

###### Inputs

| **Field Name** | **Type** | **Description**         |
|----------------|----------|-------------------------|
| _orderId      | bytes32  | order id to be canceled |

**Sample Contract Call**

```ts
const tx = await this.tradePair.cancelOrder(order.id, options);
const orderLog = await tx.wait();
if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee,
                        _log.args.code
                    );
                }
            }
        }
    }
}
```

##### Cancel and Replace Order

```solidity
function cancelReplaceOrder(
    bytes32 _orderId,
    bytes32 _clientOrderId,
    uint _price,
    uint _quantity
)
```

###### Description

Cancels the given order and replaces it with one for the same pair with
the given price and quantity. You can’t change the type1 or type2 of the
original order entered. This function cancels and removes the original
order from the orderbook and enters a new one. Hence the original
order’s time priority will be lost.

###### Inputs

| **Field Name**  | **Type** | **Description**            |
|-----------------|----------|----------------------------|
| _orderId        | bytes32  | Id of the order to cancel/replace  |
| _clientOrderId  | bytes32  | Client Order id of the new Order |
| _price          | uint     | Price of the new order     |
| _quantity       | uint     | Quantity for the new order |

**Sample Contract Call:**

### List Orders

##### addLimitOrderList

```solidity
addLimitOrderList(
        bytes32 _tradePairId,
        bytes32[] calldata _clientOrderIds,
        uint256[] calldata _prices,
        uint256[] calldata _quantities,
        Side[] calldata _sides,
        Type2[] calldata _type2s)
```

###### Description

To send multiple Limit Orders in a single transaction designed specifically for Market Makers
Make sure that each array is ordered properly. if a single order in the list reverts
the entire list is reverted. Currently this function will revert ONLY if it fails pair level checks
, which are admin level tradePair.pairPaused or tradePair.addOrderPaused
It can potentially revert if type2= FOK is used. Safe to use with IOC.
For the rest of the order level check failures, It will reject those orders by emitting
OrderStatusChanged event with "status" = Status.REJECTED and "code" = rejectReason
The event will have your clientOrderId, but no orderId will be assigned to the order as it will not be
added to the blockchain.
Order rejects will only be raised if called from this function. Single orders entered using addOrder
function will revert as before for backward compatibility.
See addOrderChecks function. Every line that starts with  return (0, rejectReason) will be rejected.

###### Inputs

| **Field Name**   | **Type** | **Description**            |
|------------------|----------|----------------------------|
| _tradePairId     | bytes32    | Id of the trading pair  |
| _clientOrderIds  | bytes32[]  |  Array of unique id provided by the owner of the orders                          |
| _prices          | uint256[]     | Array of prices     |
| _quantities      | uint256[]     | Array of quantities |
| _sides           | enum ITradePairs.Side _side     | Array of sides |
| _type2s          | enum ITradePairs.Type2 _type2     | Array of SubTypes |


**Sample Contract Call:**




##### Cancel Replace List

```solidity
    function cancelReplaceList(
        bytes32[] calldata _orderIds,
        bytes32[] calldata _clientOrderIds,
        uint256[] calldata _prices,
        uint256[] calldata _quantities)
```

###### Description

To Cancel/Replace multiple Orders in a single transaction designed specifically for Market Makers
Make sure that each array is ordered properly.
Cancels the first order in the list and immediately enters a similar order in the same direction, then repeats it
for the next order in the list. Only the quantity and the price of the order can be changed. All the other order
fields are copied from the canceled order to the new order.
CAUTION: The time priority of the original order is lost!
Canceled order's locked quantity is made available for the new order within this tx.
Call with Maximum ~15 orders at a time for a block size of 30M
Will emit OrderStatusChanged "status" = CANCEL_REJECT, "code"= "T-OAEX-01" for orders that are already
canceled/filled while continuing to cancel/replace the remaining open orders in the list.
In this case, because the closed orders are already removed from the blockchain, all values in the OrderStatusChanged
event except "orderId", "traderaddress", "status" and "code" fields will be empty/default values. This includes the
indexed field "pair" which you may use as filters for your event listeners. Hence you should process the
transaction log rather than relying on your event listeners if you need to capture CANCEL_REJECT messages and
filtering your events using the "pair" field.
if a single order in the list reverts the entire list is reverted. This function will only revert if it fails
pair level checks, which are tradePair.pairPaused or tradePair.addOrderPaused
It can potentially revert if type2= FOK is used. Safe to use with IOC.
For the rest of the order level check failures, It will reject those orders by emitting
OrderStatusChanged event with "status" = Status.REJECTED and "code" = rejectReason
Event though the new order is rejected, the cancel operation still holds. For example, you try to C/R list
5 orders, the very first, Order1 gets canceled and at the time of new order entry for Order1.1, it may get rejected
because of type2=PO as it will match an active order. Order1 is still canceled. Order1.1 gets a REJECT with
"T-T2PO-01". The event will have your clientOrderId, but no orderId will be assigned to the order as it will not be
added to the blockchain.
Order rejects will only be raised if called from this function. Single orders entered using addOrder
function will revert as before for backward compatibility.
See addOrderChecks function. Every line that starts with  return (0, rejectReason) will be rejected.

###### Inputs

| **Field Name**   | **Type** | **Description**            |
|------------------|----------|----------------------------|
| _orderIds        | bytes32[]    | order ids to be replaced  |
| _clientOrderIds  | bytes32[]  |  Array of unique client ids that will be assinged to replaced orders                        |
| _prices          | uint256[]     | Array of new prices     |
| _quantities      | uint256[]     | Array of new quantities |


**Sample Contract Call:**



##### Cancel List Orders

```solidity
function cancelListOrders(
    bytes32[] _orderIds
)
```

###### Description

Cancels all orders contained in the given array of order ids

###### Inputs

<table>
<colgroup>
<col style="width: 24%" />
<col style="width: 23%" />
<col style="width: 52%" />
</colgroup>
<tr>
<th><strong>Field Name</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<td>_orderId</td>
<td>Array of orderIds</td>
<td>order ids to be canceled as an array.<br />
Note: It is not advised to send an array more than 15-20 ids to avoid
running out of gas</td>
</tr>
</table>

**Sample Contract Call:**

```ts
const tx = await this.tradePair.cancelListOrders(orderIds.slice(1,
Math.min(20,orderIds.length-1)), options);

const orderLog = await tx.wait();
if (orderLog){
    for (let _log of orderLog.events) {
        if (_log.event) {
            if (_log.event === 'OrderStatusChanged') {
                if (_log.args.traderaddress === this.account && _log.args.pair === this.tradePairByte32) {
                    this.processOrders(
                        OrderStatusChangedVersion,
                        this.account,
                        _log.args.pair,
                        _log.args.id,
                        _log.clientOrderId,
                        _log.args.price,
                        _log.args.totalamount,
                        _log.args.quantity,
                        _log.args.side,
                        _log.args.type1,
                        _log.args.type2,
                        _log.args.status,
                        _log.args.quantityfilled,
                        _log.args.totalfee,
                        _log.args.code
                    );
                }
            }
        }
    }
}
```

##### Get Order Book From Chain

```solidity
function getNBook(
    bytes32 _tradePairId,
    Side _side,
    uint256 _nPrice,
    uint256 _nOrder,
    uint256 _lastPrice,
    bytes32 _lastOrder
)
public
view
returns (
    uint256[],
    uint256[],
    uint256, bytes32
);
```

###### Description

Returns orderbook (buy or sell) for the given tradepair

```
@return uint256[] Prices array
@return uint256[] Quantities array
@return uint256 Last Price processed. 0 if no more price points left
@return bytes32 Last Order id processed. "" if no more orders left
```

Note: Although this is a view function and do not cost any gas for the invocation, your call may get "run out of gas" exception in case
you try to get the entire order book with a lot of orders. That's why it
has nPrice and nOrder parameters for pagination, i.e.

`this.tradePair.getNBook(this.tradePairByte32,0, 2, 50, 0, utils.fromUtf8(''))`

will get the best 2 buy price point (top of
the buy book and the next best price and it will aggregate up to 50
orders at a time when generating the orderbook).

###### Inputs

| **Field Name** | **Type** | **Description**                                                                                                     |
|----------------|----------|---------------------------------------------------------------------------------------------------------------------|
| _tradePairId   | bytes32  | pair in bytes32                                                                                                     |
| _side          | Side     | 0 for BuyBook, 1 for SellBook                                                                                       |
| _nPrice        | uint256  | depth requested. If 1, top of the book, if 2 best 2 prices etc…                                                     |
| _nOrder        | uint256  | number of orders to be retrieved at the price point                                                                 |
| _lastPrice     | uint256  | the price point to start at in case a loop is used to get the entire order book. Use 0 for small requests           |
| _lastOrder     | bytes32  | the orderid used in case a loop is used to get the entire order book. Use empty string in bytes32 for small request |

**Sample Contract Call:**

```ts
async getBookfromChain() {
    try {
        var borders = await this.tradePair.getNBook(this.tradePairByte32, 0, 2, 50, 0, utils.fromUtf8(''));
        var sorders = await this.tradePair.getNBook(this.tradePairByte32, 1, 2, 50, 0, utils.fromUtf8(''));
        var buyOrderArray = [];
        var sellOrderArray = [];
        sellOrderArray.push(sorders[0].toString(),sorders[1].toString());
        buyOrderArray.push(borders[0].toString(),borders[1].toString());
        return {buyBook: buyOrderArray, sellBook: sellOrderArray};
    } catch (error) {
        this.logger.error (`${this.instanceName} Error during getBookfromChain`, error);
    }
}
```


### PortfolioMain (Only in Mainnet)

Your PorfolioSub can only be funded by PortfolioMain. Having said that,
you don’t have to interface with PortfolioMain and can easily perform
the initial deposits functions using Dexalot’s frontend to fund your
Subnet portfolio. If your subnet wallet doesn’t have any ALOT balance ,
this process will automatically remove a small amount of token
transferred from your balance and deposit an equivalent amount of ALOT
to your subnet wallet (Gas Tank). The ALOT amount deposited to your Gas
Tank should be able to give you 3 to 5 transactions and you’ll need to
buy more ALOT and fill up your Gas Tank to continue your trading.

#### Deposit Native

```solidity
function depositNative(
    address payable _from,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to deposit your native coins from one of your host-chain wallet.
The amount will be locked in the PortfolioMain of the host-chain and then
communicated to PortfolioSub via the selected bridge for trading purposes.

Inputs

| **Field Name** | **Type**                  | **Description**                                                    |
|----------------|---------------------------|--------------------------------------------------------------------|
| _from          | address payable           | wallet address                                                     |
| _bridge        | IPortfolio.BridgeProvider | bridge provider (see [reference data](#order-enum-type-reference)) |

##### Example Code

```ts
await portfolio.depositNative(owner.address, {value: Utils.toWei(deposit_amount)}, 0);
```

#### Deposit Token

```solidity
function depositToken(
    address _from,
    bytes32 _symbol,
    uint _quantity,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to deposit your ERC20 from one of your host-chain wallet.
The amount will be locked in the PortfolioMain of the host-chain and then
communicated to PortfolioSub via the selected bridge for trading purposes.

##### Inputs

| **Field Name** | **Type**                  | **Description**                                                    |
|----------------|---------------------------|--------------------------------------------------------------------|
| _from          | address payable           | wallet address                                                     |
| _symbol        | bytes32                   | token symbol to deposit                                            |
| _quantity      | uint                      | amount of tokens to deposit                                        |
| _bridge        | IPortfolio.BridgeProvider | bridge provider (see [reference data](#order-enum-type-reference)) |

##### Example Code

```ts
await portfolioMain.depositToken(owner.address, USDT, Utils.toWei(deposit_amount), 0);
```

#### getTokenDetails

```solidity
function getTokenDetails(bytes32 _symbol)
```

##### Description

Inputs

| Field Name | Type    | Description  |
|------------|---------|--------------|
| _symbol    | bytes32 | token symbol |

##### Example Code

```ts
await portfolio.getTokenDetails(Utils.fromUtf8(td.symbol));
```

### PortfolioSub Contract (Only in Subnet)

#### Get Portfolio Balance

```solidity
function getBalance(
    address _owner,
    bytes32 _symbol
)
```

##### Description

Returns the total and available balance for the given token (symbol)
within the given portfolio (address). Any open orders will reduce your
available balance to ensure the settlement in case there is a trade.

##### Inputs

| **Field Name** | **Type** | **Description**                              |
|----------------|----------|----------------------------------------------|
| _owner         | bytes32  | wallet address                               |
| _symbol        | bytes32  | symbol in bytes32 (AVAX or any token symbol) |

##### Example Code

```ts
bal = await this.portfolio.getBalance(this.account, this.baseByte32);
balanceTotal = utils.formatUnits(bal.total, this.baseDecimals);
balanceAvail = utils.formatUnits(bal.available, this.baseDecimals);
```

#### Deposit Native (Add gas to tank)

```solidity
function depositNative(
    address payable _from,
    IPortfolio.BridgeProvider _bridge
)
```

##### Description

Use this function to transfer ALOT from your Portfolio to your subnet
wallet. You need to do this to fill up gas tank to continue to perform
transactions in the subnet

##### Inputs

| **Field Name** | **Type**                  | **Description** |
|----------------|---------------------------|-----------------|
| _from          | address payable           | wallet address  |
| 2nd Parameter  | IPortfolio.BridgeProvider | not used        |

##### Example Code

```ts
await portfolio.depositNative(owner.address, {value:
Utils.toWei(deposit_amount)});
```

#### Withdraw Native (Remove excess gas from your tank)

```solidity
function withdrawNative(
    address payable _to,
    uint _quantity
)
```

##### Description

Use this function to transfer ALOT from your subnet wallet to your
Portfolio in case you are holding too much ALOT.

##### Inputs

| **Field Name** | **Type**        | **Description**            |
|----------------|-----------------|----------------------------|
| _to            | address payable | wallet address             |
| _quantity      | uint            | amount of ALOT to transfer |

##### Example Code

```ts
await portfolio.withdrawNative(owner.address, Utils.toWei("5"));
```

#### Withdraw Token

```solidity
function withdrawToken(
    address _to,
    bytes32 _symbol,
    uint _quantity,
    BridgeProvider _bridge,
    uint _dstChainListOrgChainId
)
```

##### Description

Use this function to transfer any tokens or natives (including ALOT,
AVAX, ETH ) from your PortfolioSub to your host-chain wallet.
If there is not enough inventory available at the chosen host-chain,
the transaction will revert in the subnet and nothing will be sent to
the host-chain. The subnet always keeps track of inventory available at
all the connected host-chains.

##### Inputs

| **Field Name**                    | **Type**       | **Description**                              |
|-----------------------------------|----------------|----------------------------------------------|
| _to                               | address        | wallet address                               |
| _symbol                           | bytes32        | symbol in bytes32 (AVAX or any token symbol) |
| _quantity                         | unit256        | quantity to withdraw to a host-chain         |
| _bridge                           | BridgeProvider | 0 - LayerZero                                |
| _dstChainListOrgChainId           | unit32         | host-chain chainlist.org chain id            |
##### Example Code

```ts
await portfolio.withdrawToken(owner.address, USDT, Utils.toWei(withdrawal_amount), 43114);
```







#### Transfer Token

```solidity
function transferToken(
    address _to,
    bytes32 _symbol,
    uint256 _quantity
)
```
##### Description

Inputs

| Field Name | Type    | Description                                  |
|------------|---------|----------------------------------------------|
| _to        | address | trader address                               |
| _symbol    | bytes32 | symbol in bytes32 (AVAX or any token symbol) |
| _quantity  | uint256 | amount of token to transfer                  |

##### Example Code

```ts
await portfolio.transferToken(trader1.address, AVAX, Utils.toWei(transfer_amount)));
```

### Utility Functions

Please refer to docs of ethers.js for more details at [docs.ethers.io/v5/api/utils/display-logic>](https://docs.ethers.io/v5/api/utils/display-logic/)

#### String to Bytes32 Conversion

```ts
static fromUtf8 = (txt: string): string => {
    return ethers.utils.formatBytes32String(txt);
}
```

#### Bytes32 to String Conversion

```ts
static toUtf8 = (txt: ethers.utils.BytesLike): string => {
    return ethers.utils.parseBytes32String(txt);
};
```

#### Unit Conversion

```ts
static parseUnits = (txt: string, decimals: ethers.BigNumberish): ethers.BigNumber => {
    return ethers.utils.parseUnits(txt, decimals);
};
```

```ts
static formatUnits = (
    wei: ethers.BigNumberish,
    decimals: ethers.BigNumberish | undefined
): string => {
    return ethers.utils.formatUnits(wei, decimals);
};
```

#### Get Revert Reason

##### Description

Use this function to get the revert reason of a particular action.

```ts
async getRevertReason(error: any) {
    let reason;
    if (!error.transaction) {
        this.logger.warn(
            `${this.instanceName} getRevertReason: error.transaction is undefined`
        );
    } else {
        // https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a
        let code = await provider.call(
            error.transaction, error.blockNumber
            || error.receipt.blockNumber
        );
        reason = ethers.utils.toUtf8String("0x" + code.substr(138));
        var i = reason.indexOf("0"); // delete all null characters after the string
        if (i>-1) {
            return reason.substring(0, i);
        }
    }
    return reason;
}
```

#### Get Client OrderId

##### Description

Use this function to create a unique client orrder id for an order to send to Dexalot.

```ts
async getClientOrderId(): Promise<string> {
    const blocknumber: number =
        await this.contracts["SubNetProvider"].getBlockNumber() || 0;
    const timestamp = new Date().toISOString();
    if (this.account) {
        const id = ethers.utils.toUtf8Bytes(`${this.account}${blocknumber}${timestamp}`);
        return ethers.utils.keccak256(id);
}
return "";
}
```
