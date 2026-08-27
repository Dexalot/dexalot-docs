---
headerDepth: 4
---

# DexalotRouter

**DexalotRouter**

A router contract to facilitate aggregator swaps via RFQ order execution. It forwards calls to allowed MainnetRFQ contracts,
transferring tokens from the original sender. Only the partialSwap and simpleSwap functions are supported.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Private

| Name | Type |
| --- | --- |
| MAKER_OFFSET | uint256 |
| PARTIAL_SWAP_SELECTOR | bytes4 |
| SIMPLE_SWAP_SELECTOR | bytes4 |
| TAKER_ASSET_OFFSET | uint256 |
| TAKER_AMOUNT_OFFSET | uint256 |
| TAKER_PARTIAL_AMOUNT_OFFSET | uint256 |
| __gap | uint256[50] |
| allowedRFQs | struct EnumerableSet.AddressSet |

## Events

### AllowedRFQUpdated

```solidity:no-line-numbers
event AllowedRFQUpdated(address rfq, bool allowed)
```

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor() public
```

#### initialize

Constructor to set up roles

```solidity:no-line-numbers
function initialize(address _owner) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to be granted the admin role |

### External

#### multiPartialSwap

Executes two partial swaps in sequence between two allowed DexalotRFQ contracts

```solidity:no-line-numbers
function multiPartialSwap(struct IDexalotRFQ.Order _orderA, bytes _signatureA, uint256 _takerAmountA, struct IDexalotRFQ.Order _orderB, bytes _signatureB) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderA | struct IDexalotRFQ.Order | The first RFQ order |
| _signatureA | bytes | The signature for the first RFQ order |
| _takerAmountA | uint256 | The taker amount for the first RFQ order |
| _orderB | struct IDexalotRFQ.Order | The second RFQ order |
| _signatureB | bytes | The signature for the second RFQ order |

#### setAllowedRFQ

Add or remove an address from the allowed MainnetRFQs

```solidity:no-line-numbers
function setAllowedRFQ(address _mainnetRFQ, bool _allowed) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mainnetRFQ | address | The address of the MainnetRFQ maker |
| _allowed | bool | True to add to allowed list, false to remove |

#### retrieveToken

Retrieve any ERC20 tokens or native mistakenly sent to this contract

```solidity:no-line-numbers
function retrieveToken(address _token, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to retrieve |
| _amount | uint256 | The amount of tokens to retrieve |

#### isAllowedRFQ

Check if a MainnetRFQ address is allowed

```solidity:no-line-numbers
function isAllowedRFQ(address _mainnetRFQ) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mainnetRFQ | address | The address to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the address is in the allowed list, false otherwise |

#### getAllowedRFQs

Get the list of allowed MainnetRFQs

```solidity:no-line-numbers
function getAllowedRFQs() external view returns (address[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | An array of allowed MainnetRFQ contract addresses |

#### getAllowedRFQsPaginated

Get a paginated list of allowed MainnetRFQs

```solidity:no-line-numbers
function getAllowedRFQsPaginated(uint256 _startIndex, uint256 _pageSize) external view returns (address[])
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _startIndex | uint256 | The starting index of the page |
| _pageSize | uint256 | The number of addresses to return in the page |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | An array of allowed MainnetRFQ contract addresses for the specified page |

#### numberOfAllowedRFQs

Get the number of allowed MainnetRFQs

```solidity:no-line-numbers
function numberOfAllowedRFQs() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The count of allowed MainnetRFQ contract addresses |

#### fallback

Internal fallback function to forward calls to allowed MainnetRFQ contracts.
Only the partialSwap and simpleSwap functions are supported.
The original sender's address is appended to the calldata for the target contract to extract.
If the call involves token transfer, the tokens are transferred from the original sender to the target contract before forwarding the call.

```solidity:no-line-numbers
fallback() external payable
```

#### receive

Rejects direct native transfers without calldata from non-whitelisted senders.
Whitelisted RFQ contracts may send native as part of multi-hop execution (e.g., when
this router is the destTrader in a hop that releases native).

```solidity:no-line-numbers
receive() external payable
```

### Internal

#### _authorizeUpgrade

**Dev notes:** \
Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal onlyOwner {}
```

```solidity:no-line-numbers
function _authorizeUpgrade(address newImplementation) internal
```

#### _bubbleRevert

Internal function to bubble up revert reasons from low-level calls

```solidity:no-line-numbers
function _bubbleRevert(bytes _returnData, string _defaultMsg) internal pure
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _returnData | bytes | The return data from the failed call |
| _defaultMsg | string | The default revert message to use if no revert reason is found in the return data |

