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

### Quote

```solidity
struct Quote {
  uint256 nonceAndMeta;
  uint256 expiry;
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
| quoteMakerAmountUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| quoteExpiryUpdated | mapping(uint256 &#x3D;&gt; uint256) |
| swapSigner | address |
| slippageTolerance | uint256 |
| trustedContracts | mapping(address &#x3D;&gt; bool) |
| trustedContractToIntegrator | mapping(address &#x3D;&gt; string) |

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

### External

#### initialize

initializer function for Upgradeable RFQ

**Dev notes:** \
slippageTolerance is initially set to 9700. slippageTolerance is represented in BIPs,
therefore slippageTolerance is effectively set to 97%. This means that the price of a firm quote
can not drop more than 3% initially.

```solidity:no-line-numbers
function initialize(address _swapSigner) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapSigner | address | Address of swap signer, rebalancer is also defaulted to swap signer but it can be changed later |

#### simpleSwap

Swaps two Assets, based off a predetermined swap price.

**Dev notes:** \
This function can only be called after generating a firm quote from the RFQ API.
All parameters are generated from the RFQ API. Prices are determined based off of trade
prices from the Dexalot subnet.

```solidity:no-line-numbers
function simpleSwap(struct MainnetRFQ.Quote _quote, bytes _signature) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _quote | struct MainnetRFQ.Quote | Trade parameters for swap generated from /api/rfq/firm |
| _signature | bytes | Signature of trade parameters generated from /api/rfq/firm |

#### updateQuoteExpiry

Updates the expiry of a quote. The new expiry
is the deadline a trader has to execute the swap.

**Dev notes:** \
Only rebalancer can call this function.

```solidity:no-line-numbers
function updateQuoteExpiry(uint256 _nonceAndMeta, uint256 _newExpiry) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | nonce of quote |
| _newExpiry | uint256 | new expiry for quote |

#### updateQuoteMakerAmount

Updates the makerAmount of a quote.
The new makerAmount can not be lower than the percentage
of slippageTolerance from the previous quoted price.

**Dev notes:** \
Only rebalancer can call this function.

```solidity:no-line-numbers
function updateQuoteMakerAmount(uint256 _nonceAndMeta, uint256 _newMakerAmount, uint256 _oldMakerAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nonceAndMeta | uint256 | nonce of quote |
| _newMakerAmount | uint256 | new makerAmount for quote |
| _oldMakerAmount | uint256 |  |

#### setSlippageTolerance

Updates the slippageTolerance for a quote update.
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

#### addTrustedContract

Adds the given contract to trusted contracts in order to provide excluded functionality

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function addTrustedContract(address _contract, string _organization) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be added |
| _organization | string | Organization of the contract to be added |

#### removeTrustedContract

Removes the given contract from trusted contracts

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be removed |

#### isTrustedContract

```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the contract is trusted |

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

#### receive

**Dev notes:** \
Used to rebalance rfq contract

```solidity:no-line-numbers
receive() external payable
```

