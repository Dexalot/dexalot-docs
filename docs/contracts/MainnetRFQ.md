---
headerDepth: 4
---

# MainnetRFQ

**Request For Quote smart contract**

This contract takes advantage of prices from the Dexalot subnet to provide
token swaps on C-Chain. Currently, users must perform a simple swap via our RFQ API.

**Dev notes:** \
After getting a firm quote from our off chain RFQ API, call the simpleSwap() function with
the quote. This will execute a swap, exchanging the taker asset (asset you provide) with
the maker asset (asset we provide). In times of high volatility, the API may adjust your quoted
price. The price will never be lower than slippageTolerance, which represents a percentage of the
original quoted price. To check if your quoted price has been affected by slippage, monitor the SlippageApplied
event. The expiry of your quote may also be adjusted during times of high volatility. Monitor the ExpiryUpdated
event to verify if the deadline has been updated. It is highly unlikely that your quotes&#x27;s makerAmount and expiry
are updated. Adjusting the quote is rare, and only resorted to in periods of high volatility for quotes that do
not properly represent the liquidity of the Dexalot subnet.

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

## Variables

### Public

| Name | Type |
| --- | --- |
| REBALANCER_ADMIN_ROLE | bytes32 |
| VERSION | bytes32 |
| orderMakerAmountUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| orderExpiryUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| swapSigner | address |
| slippageTolerance | uint256 |

### Internal

| Name | Type |
| --- | --- |
| __gap | uint256[50] |

### Private

| Name | Type |
| --- | --- |
| nonceUsed | mapping(uint256 &#x3D;&gt; bool) |

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
event SwapExecuted(uint256 nonceAndMeta, address maker, address taker, address makerAsset, address takerAsset, uint256 makerAmountReceived, uint256 takerAmountReceived)
```

### RebalancerWithdraw

```solidity:no-line-numbers
event RebalancerWithdraw(address asset, uint256 amount)
```

### SlippageApplied

```solidity:no-line-numbers
event SlippageApplied(uint256 nonceAndMeta, uint256 newMakerAmount)
```

### ExpiryUpdated

```solidity:no-line-numbers
event ExpiryUpdated(uint256 nonceAndMeta, uint256 newExpiry)
```

### SlippageToleranceUpdated

```solidity:no-line-numbers
event SlippageToleranceUpdated(uint256 newSlippageTolerance)
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
| [0] | bytes4 | bytes4   The Magic Value based on ERC1271 standard. 0x1626ba7e represents a valid signature, while 0x00000000 represents an invalid signature. |

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
| _swapSigner | address | Address of swap signer, rebalancer is also defaulted to swap signer but it can be changed later |

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
prices from the Dexalot subnet.

```solidity:no-line-numbers
function simpleSwap(struct MainnetRFQ.Order _order, bytes _signature) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

#### updateOrderExpiry

Updates the expiry of a order. The new expiry
is the deadline a trader has to execute the swap.

**Dev notes:** \
Only rebalancer can call this function.

```solidity:no-line-numbers
function updateOrderExpiry(uint256 _nonceAndMeta, uint256 _newExpiry) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | nonce of order |
| _newExpiry | uint256 | new expiry for order |

#### updateOrderMakerAmount

Updates the makerAmount of a order.
The new makerAmount can not be lower than the percentage
of slippageTolerance from the previous quoted price.

**Dev notes:** \
Only rebalancer can call this function.

```solidity:no-line-numbers
function updateOrderMakerAmount(uint256 _nonceAndMeta, uint256 _newMakerAmount, uint256 _oldMakerAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | nonce of order |
| _newMakerAmount | uint256 | new makerAmount for order |
| _oldMakerAmount | uint256 |  |

#### setSlippageTolerance

Updates the slippageTolerance for a order update.
i.e. slippageTolerance = 9700 (97%), _oldMakerAmount = 100
_newMakerAmount must be greater than if not equal to 97
97 = 100 * 9700 / 10000

**Dev notes:** \
Only default admin can call this function.

```solidity:no-line-numbers
function setSlippageTolerance(uint256 _newSlippageTolerance) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newSlippageTolerance | uint256 | lowest percent of original makerAmount allowed in BIPs |

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

### Private

#### _recoverSigner

Helper function used to verify signature

```solidity:no-line-numbers
function _recoverSigner(bytes32 _messageHash, bytes _signature) private pure returns (address)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _messageHash | bytes32 | Hash of order data |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | signer   The address of the signer of the signature. |

#### _verifyTradeNotProcessed

Verifies that a transaction has not been traded already.

```solidity:no-line-numbers
function _verifyTradeNotProcessed(struct MainnetRFQ.Order _order) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |

#### _calculateOrderDigest

Calculates the digest of the transaction's order.

**Dev notes:** \
The digest is then used to determine the validity of the signature passed
to a swap function.

```solidity:no-line-numbers
function _calculateOrderDigest(struct MainnetRFQ.Order _order) private view returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32   The digest of the _order. |

#### _verifyTradeParameters

Checks if the trade parameters have been updated. If so,
this function updates the parameters for the trade. Additionally, this
function checks if the trade expiry has past.

```solidity:no-line-numbers
function _verifyTradeParameters(struct MainnetRFQ.Order _order) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The proper makerAmount to use for the trade. |

#### _executeSwap

Handles the exchange of assets based on swap type and
if the assets are ERC-20's or native tokens.

```solidity:no-line-numbers
function _executeSwap(struct MainnetRFQ.Order _order, uint256 _makerAmount) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _order | struct MainnetRFQ.Order | Trade parameters for swap generated from /api/rfq/firm |
| _makerAmount | uint256 | the proper makerAmount for the trade |

