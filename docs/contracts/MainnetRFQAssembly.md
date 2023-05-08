---
headerDepth: 4
---

# MainnetRFQAssembly

**Request For Quote smart contract**

This contract takes advantages of prices from the dexalot subnet to provide
token swaps on C-Chain. Currently, users must perform a simple swap via our Paraswap API.

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
| VERSION | bytes32 |
| rebalancer | address |
| swapSigner | address |
| trustedContracts | mapping(address &#x3D;&gt; bool) |
| trustedContractToIntegrator | mapping(address &#x3D;&gt; string) |

### Private

| Name | Type |
| --- | --- |
| nonceUsed | mapping(uint256 &#x3D;&gt; bool) |

## Events

### SwapSignerUpdated

```solidity:no-line-numbers
event SwapSignerUpdated(address _newSwapSigner)
```

### RebalancerUpdated

```solidity:no-line-numbers
event RebalancerUpdated(address _rebalancer)
```

### RoleUpdated

```solidity:no-line-numbers
event RoleUpdated(string name, string actionName, bytes32 updatedRole, address updatedAddress)
```

### AddressSet

```solidity:no-line-numbers
event AddressSet(string name, string actionName, address oldAddress, address newAddress)
```

### SwapExecuted

```solidity:no-line-numbers
event SwapExecuted(address maker, address taker, address makerAsset, address takerAsset, uint256 makerAmountReceived, uint256 takerAmountReceived)
```

### RebalancerWithdraw

```solidity:no-line-numbers
event RebalancerWithdraw(address _asset, uint256 _amount)
```

## Methods

### Public

#### initialize

initializer function for Upgradeable RFQ

```solidity:no-line-numbers
function initialize(address _admin, address _swapSigner, address _rebalancer) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | Address of contract admin |
| _swapSigner | address | Address of swap signer |
| _rebalancer | address |  |

### External

#### simpleSwap

Swaps two ERC-20 tokens.

**Dev notes:** \
This function can only be called after generating a firm quote from the Paraswap API.
All parameters are generated from the Paraswap API.

```solidity:no-line-numbers
function simpleSwap(struct MainnetRFQAssembly.Quote _quote, bytes _signature) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _quote | struct MainnetRFQAssembly.Quote | Trade parameters for swap generated from /api/ps/firm |
| _signature | bytes | Signature of trade parameters generated from /api/ps/firm |

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

#### setRebalancer

Updates the rebalancer address.

**Dev notes:** \
Only DEFAULT_ADMIN can call this function.

```solidity:no-line-numbers
function setRebalancer(address _rebalancer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rebalancer | address | Address of new rebalancer |

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
| _assets | address[] | Array of addresses of the asset to be withdrawn |
| _amounts | uint256[] | Array of Amount of assets to be withdrawn |

#### receive

**Dev notes:** \
Used to rebalance rfq contract

```solidity:no-line-numbers
receive() external payable
```

