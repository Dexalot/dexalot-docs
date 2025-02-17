---
headerDepth: 4
---

# MainnetRFQ

**Request For Quote smart contract**

This contract takes advantage of prices from the Dexalot L1 to provide
token swaps on EVM compatible chains. Users must request a quote via our RFQ API.
Using this quote they can execute a swap on the current chain using simpleSwap() or partialSwap().
The contract also supports cross chain swaps using xChainSwap() which locks funds in the current
chain and sends a message to the destination chain to release funds.

**Dev notes:** \
After getting a firm quote from our off chain RFQ API, call the simpleSwap() function with
the quote. This will execute a swap, exchanging the taker asset (asset you provide) with
the maker asset (asset we provide). In times of high volatility, the API may adjust the expiry of your quote.
The Api may also add slippage to all orders for a particular tradepair during times of high volatility.
Monitor the SwapExpired event to verify if a swap has been adjusted. Adjusting the quote is rare, and
only resorted to in periods of high volatility for quotes that do not properly represent the liquidity
of the Dexalot L1.
IThis contract also supports a new cross chain swap flow(originally referred to as GUN Flow) where
any user can buy GUN token from any network with a single click. This is particularly
beneficial for Avalanche L1s that have certain token restrictions. For example Gunzilla prohibits ERC20s just
like Dexalat L1 and they don&#x27;t allow their gas token in any network but in Gunzilla.
When Buying GUN from Avalanche(or Arb,...) with counter token USDC, USDC is kept in MainnetRFQ(Avax)
and GUN is deposited to the buyer&#x27;s wallet via MainnetRFQ(Gun). The flow is : \
MainnetRFQ(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; ICM &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; MainnetRFQ(Gun) \
When Selling GUN from Gunzilla with counter token USDC. GUN is kept in MainnetRFQ(Gun) and USDC is deposited
to the buyer&#x27;s wallet via MainnetRFQ(Avax) The flow is : \
MainnetRFQ(Gun) &#x3D;&gt; PortfolioBridgeMain(Gun) &#x3D;&gt; ICM &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; MainnetRFQ(Avax) \
Similarly a Cross Chain Swaps Betwen Avalanche &amp; Arb would work as follows exchanging AVAX &amp; ETH
MainnetRFQ(Avax) &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; LayerZero &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; MainnetRFQ(Arb) \
MainnetRFQ(Arb) &#x3D;&gt; PortfolioBridgeMain(Arb) &#x3D;&gt; LayerZero &#x3D;&gt; PortfolioBridgeMain(Avax) &#x3D;&gt; MainnetRFQ(Avax) \

## Struct Types

### Order

```solidity
struct Order {
  uint256 nonceAndMeta;
  uint128 expiry;
  address makerAsset;
  address takerAsset;
  address maker;
  address taker;
  uint256 makerAmount;
  uint256 takerAmount;
}
```
### XChainSwap

```solidity
struct XChainSwap {
  bytes32 from;
  bytes32 to;
  bytes32 makerSymbol;
  bytes32 makerAsset;
  bytes32 takerAsset;
  uint256 makerAmount;
  uint256 takerAmount;
  uint96 nonce;
  uint32 expiry;
  uint32 destChainId;
  enum IPortfolioBridge.BridgeProvider bridgeProvider;
}
```
### SwapData

```solidity
struct SwapData {
  uint256 nonceAndMeta;
  address taker;
  bytes32 destTrader;
  uint32 destChainId;
  address srcAsset;
  bytes32 destAsset;
  uint256 srcAmount;
  uint256 destAmount;
}
```
### PendingSwap

```solidity
struct PendingSwap {
  address trader;
  uint256 quantity;
  bytes32 symbol;
}
```
### WrappedInfo

```solidity
struct WrappedInfo {
  contract IWrappedToken wrappedNative;
  bool keepWrapped;
}
```

## Variables

### Public

| Name | Type |
| --- | --- |
| PORTFOLIO_BRIDGE_ROLE | bytes32 |
| REBALANCER_ADMIN_ROLE | bytes32 |
| VERSION | bytes32 |
| VOLATILITY_ADMIN_ROLE | bytes32 |
| completedSwaps | mapping(uint256 &#x3D;&gt; uint256) |
| expiredSwaps | mapping(uint256 &#x3D;&gt; uint256) |
| portfolioBridge | contract IPortfolioBridge |
| portfolioMain | address |
| swapSigner | address |
| slippageTolerance | uint256 |
| swapQueue | mapping(uint256 &#x3D;&gt; struct MainnetRFQ.PendingSwap) |
| volatilePairs | uint256 |
| wrappedInfo | struct MainnetRFQ.WrappedInfo |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[42] |

### Private

| Name | Type |
| --- | --- |
| NONCE_MASK | uint96 |
| ORDER_TYPEHASH | bytes32 |
| XCHAIN_SWAP_TYPEHASH | bytes32 |
| nonceUsed | mapping(uint256 &#x3D;&gt; bool) |
| orderMakerAmountUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| orderExpiryUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| trustedContracts | mapping(address &#x3D;&gt; bool) |

## Events

### SwapSignerUpdated

```solidity:no-line-numbers
event SwapSignerUpdated(address newSwapSigner)
```

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

### AddressSet

```solidity:no-line-numbers
event AddressSet(string name, string actionName, address newAddress)
```

### SwapExecuted

```solidity:no-line-numbers
event SwapExecuted(uint256 nonceAndMeta, address taker, bytes32 destTrader, uint32 destChainId, address srcAsset, bytes32 destAsset, uint256 srcAmount, uint256 destAmount)
```

### XChainFinalized

```solidity:no-line-numbers
event XChainFinalized(uint256 nonceAndMeta, address trader, bytes32 symbol, uint256 amount, uint256 timestamp)
```

### RebalancerWithdraw

```solidity:no-line-numbers
event RebalancerWithdraw(address asset, uint256 amount)
```

### SwapExpired

```solidity:no-line-numbers
event SwapExpired(uint256 nonceAndMeta, uint256 timestamp)
```

### SwapQueue

```solidity:no-line-numbers
event SwapQueue(string action, uint256 nonceAndMeta, struct MainnetRFQ.PendingSwap pendingSwap)
```

### UpdatedSlippageTolerance

```solidity:no-line-numbers
event UpdatedSlippageTolerance(uint256 slippageTolerance)
```

### UpdatedVolatilePairs

```solidity:no-line-numbers
event UpdatedVolatilePairs(uint256 volatilePairs)
```

## Methods

### Public

#### isValidSignature

Verifies Signature in accordance of ERC1271 standard

```solidity:no-line-numbers
function isValidSignature(bytes32 _hash, bytes _signature) public view returns (bytes4)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _hash | bytes32 | Hash of order data |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes4 | bytes4   The Magic Value based on ERC1271 standard. 0x1626ba7e represents a valid signature, while 0x00000000 represents an invalid signature. |

### External

#### initialize

initializer function for Upgradeable RFQ

**Dev notes:** \
slippageTolerance is initially set to 9800. slippageTolerance is represented in BIPs,
therefore slippageTolerance is effectively set to 98%. This means that the price of a firm quote
can not drop more than 2% initially.

```solidity:no-line-numbers
function initialize(address _swapSigner) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapSigner | address | Address of swap signer, rebalancer is also defaulted to swap signer but it can be changed later |

#### receive

Used to rebalance native token on rfq contract

```solidity:no-line-numbers
receive() external payable
```

#### simpleSwap

Swaps two assets for another smart contract or EOA, based off a predetermined swap price.

**Dev notes:** \
This function can only be called after generating a firm quote from the RFQ API.
All parameters are generated from the RFQ API. Prices are determined based off of trade
prices from the Dexalot L1.

```solidity:no-line-numbers
function simpleSwap(struct MainnetRFQ.Order _order, bytes _signature) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

#### partialSwap

Swaps two assets for another smart contract or EOA, based off a predetermined swap price.

**Dev notes:** \
This function can only be called after generating a firm quote from the RFQ API.
All parameters are generated from the RFQ API. Prices are determined based off of trade
prices from the Dexalot L1. This function is used for multi hop swaps and will partially fill
at the original quoted price.

```solidity:no-line-numbers
function partialSwap(struct MainnetRFQ.Order _order, bytes _signature, uint256 _takerAmount) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |
| _takerAmount | uint256 | Actual amount of takerAsset utilized in swap |

#### xChainSwap

Swaps two assets cross chain, based on a predetermined swap price

**Dev notes:** \
This function can only be called after generating a firm quote from the RFQ API.
All parameters are generated from the RFQ API. Prices are determined based off of trade
prices from the Dexalot L1. This function is called on the source chain where is locks
funds and sends a cross chain message to release funds on the destination chain.

```solidity:no-line-numbers
function xChainSwap(struct MainnetRFQ.XChainSwap _order, bytes _signature) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.XChainSwap | Trade parameters for cross chain swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

#### processXFerPayload

Processes the message coming from the bridge

**Dev notes:** \
CCTRADE Cross Chain Trade message is the only message that can be processed.
Even when the contract is paused, this method is allowed for the messages that
are in flight to complete properly. Pause for upgrade, then wait to make sure no messages are in
flight then upgrade

```solidity:no-line-numbers
function processXFerPayload(struct IPortfolio.XFER _xfer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message |

#### setWrapped

Sets the wrapped info for the given chain

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function setWrapped(address _wrappedToken, bool _keepWrapped) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wrappedToken | address | Address of the wrapped token |
| _keepWrapped | bool | Boolean to keep wrapped token or false for native token |

#### setPortfolioBridge

Sets the portfolio bridge contract address

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function setPortfolioBridge(address _portfolioBridge) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridge | address | New portfolio bridge contract address |

#### setPortfolioMain

Sets the portfolio main contract address

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function setPortfolioMain() external
```

#### updateSwapExpiry

Updates the expiry of a order. The new expiry
is the deadline a trader has to execute the swap.

**Dev notes:** \
Only rebalancer can call this function.

```solidity:no-line-numbers
function updateSwapExpiry(uint256 _nonceAndMeta) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | nonce of order |

#### setSwapSigner

Updates the signer address.

**Dev notes:** \
Only DEFAULT_ADMIN can call this function.

```solidity:no-line-numbers
function setSwapSigner(address _swapSigner) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapSigner | address | Address of new swap signer |

#### pause

Pause contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function pause() external
```

#### unpause

Unpause contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function unpause() external
```

#### claimBalance

Allows rebalancer to withdraw an asset from smart contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function claimBalance(address _asset, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | address | Address of the asset to be withdrawn |
| _amount | uint256 | Amount of asset to be withdrawn |

#### batchClaimBalance

Allows rebalancer to withdraw multiple assets from smart contract

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function batchClaimBalance(address[] _assets, uint256[] _amounts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _assets | address[] | Array of addresses of the assets to be withdrawn |
| _amounts | uint256[] | Array of amounts of assets to be withdrawn |

#### removeFromSwapQueue

Releases funds which have been queued on the destination chain due to lack of inventory

**Dev notes:** \
Only worth calling once inventory has been replenished

```solidity:no-line-numbers
function removeFromSwapQueue(uint256 _nonceAndMeta) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | Nonce of order |

#### setSlippageTolerance

Sets slippage tolerance for the contract

**Dev notes:** \
Slippage tolerance is represented in BIPs. i.e. slippage must be less than 1%.

```solidity:no-line-numbers
function setSlippageTolerance(uint256 _slippageTolerance) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _slippageTolerance | uint256 | slippage tolerance in BIPs |

#### setVolatilePairs

Sets volatile pairs to slip for the contract

**Dev notes:** \
Volatile pairs is a bitmap. If a pair is set to slip, the contract will
slip the quote for that pair during high volatility.

```solidity:no-line-numbers
function setVolatilePairs(uint256 _volatilePairs) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _volatilePairs | uint256 | volatile pairs to slip bitmap |

#### addRebalancer

Adds Rebalancer Admin role to the address

```solidity:no-line-numbers
function addRebalancer(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to add role to |

#### removeRebalancer

Removes Rebalancer Admin role from the address

```solidity:no-line-numbers
function removeRebalancer(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to remove role from |

#### addAdmin

Adds Default Admin role to the address

```solidity:no-line-numbers
function addAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to add role to |

#### removeAdmin

Removes Default Admin role from the address

```solidity:no-line-numbers
function removeAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to remove role from |

#### addVolatilityAdmin

Adds Volatility Admin role to the address

```solidity:no-line-numbers
function addVolatilityAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to add role to |

#### removeVolatilityAdmin

Removes Volatility Admin role from the address

```solidity:no-line-numbers
function removeVolatilityAdmin(address _address) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to remove role from |

#### isRebalancer

Checks if address has Rebalancer Admin role

```solidity:no-line-numbers
function isRebalancer(address _address) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool    true if address has Rebalancer Admin role |

#### isAdmin

Checks if address has Default Admin role

```solidity:no-line-numbers
function isAdmin(address _address) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool    true if address has Default Admin role |

### Private

#### _verifyXSwap

Verifies that a XChainSwap order is valid and has not been executed already.

```solidity:no-line-numbers
function _verifyXSwap(struct MainnetRFQ.XChainSwap _order, bytes _signature) private returns (uint256 nonceAndMeta)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.XChainSwap | Trade parameters for cross chain swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| nonceAndMeta | uint256 | The nonce of the swap |

#### _executeXSwap

Handles the exchange of assets based on swap type and
if the assets are ERC-20's or native tokens. Transfer assets in on the source chain
and sends a cross chain message to release assets on the destination chain

```solidity:no-line-numbers
function _executeXSwap(struct MainnetRFQ.XChainSwap _order, uint256 _nonceAndMeta) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.XChainSwap | Trade parameters for cross chain swap generated from /api/rfq/firm |
| _nonceAndMeta | uint256 | Nonce of swap |

#### _verifyOrder

Verifies that an order is valid and has not been executed already.

```solidity:no-line-numbers
function _verifyOrder(struct MainnetRFQ.Order _order, bytes _signature) private returns (address)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address The address where the funds will be transferred. It is an Aggregator address if the address in the nonceAndMeta matches the msg.sender |

#### _executeOrder

Handles the exchange of assets based on swap type and
if the assets are ERC-20's or native tokens.

```solidity:no-line-numbers
function _executeOrder(struct MainnetRFQ.Order _order, uint256 _makerAmount, uint256 _takerAmount, address _destTrader) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _makerAmount | uint256 | The proper makerAmount for the trade |
| _takerAmount | uint256 | The proper takerAmount for the trade |
| _destTrader | address | The address to transfer funds to |

#### _verifySwapInternal

Verifies that a swap has a valid signature, nonce and expiry

```solidity:no-line-numbers
function _verifySwapInternal(uint256 _nonceAndMeta, uint256 _expiry, address _taker, bool _isAggregator, bytes32 _hashedStruct, bytes _signature) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | Nonce of swap |
| _expiry | uint256 | Expiry of swap |
| _taker | address | Address of originating user |
| _isAggregator | bool | True if swap initiated by contract i.e. aggregator |
| _hashedStruct | bytes32 | Hashed swap struct, required for signature verification |
| _signature | bytes | Signature of swap |

#### _takeFunds

Pulls funds for a swap from the msg.sender

```solidity:no-line-numbers
function _takeFunds(struct MainnetRFQ.SwapData _swapData) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapData | struct MainnetRFQ.SwapData | Struct containing all information for executing a swap |

#### _releaseFunds

Release funds for a swap to the destTrader

```solidity:no-line-numbers
function _releaseFunds(struct MainnetRFQ.SwapData _swapData) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapData | struct MainnetRFQ.SwapData | Struct containing all information for executing a swap |

#### _refundNative

Refunds remaining native token to the msg.sender

```solidity:no-line-numbers
function _refundNative(struct MainnetRFQ.SwapData _swapData) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapData | struct MainnetRFQ.SwapData | Struct containing all information for executing a swap |

#### _executeSwapInternal

Executes a swap by taking funds from the msg.sender and if the swap is not cross chain
funds are released to the destTrader. Emits SwapExecuted event upon completion.

```solidity:no-line-numbers
function _executeSwapInternal(struct MainnetRFQ.SwapData _swapData, bool isNotXChain) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapData | struct MainnetRFQ.SwapData | Struct containing all information for executing a swap |
| isNotXChain | bool |  |

#### _sendCrossChainTrade

Sends a cross chain message to PortfolioBridge containing the destination token amount,
symbol and trader. Sends remaining native token as gas fee for cross chain message. Refund for
gas fee is handled in PortfolioBridge.

```solidity:no-line-numbers
function _sendCrossChainTrade(struct MainnetRFQ.XChainSwap _order) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.XChainSwap | Trade parameters for cross chain swap generated from /api/rfq/firm |

#### _addToSwapQueue

Adds unfulfilled swaps (due to lack of inventory) to a queue

```solidity:no-line-numbers
function _addToSwapQueue(address _trader, bytes32 _symbol, uint256 _quantity, uint256 _nonceAndMeta) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Trader address to transfer to |
| _symbol | bytes32 | Token symbol to transfer |
| _quantity | uint256 | Quantity of token to transfer |
| _nonceAndMeta | uint256 | Nonce of the swap |

#### _processXFerPayloadInternal

Using the bridge message, releases the remaining swap funds to the trader on the
destination chain and sets nonce to used. If not enough inventory swap is added to queue.

```solidity:no-line-numbers
function _processXFerPayloadInternal(address _trader, bytes32 _symbol, uint256 _quantity, uint256 _nonceAndMeta) private returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to be withdrawn |
| _nonceAndMeta | uint256 | Nonce of the swap |

