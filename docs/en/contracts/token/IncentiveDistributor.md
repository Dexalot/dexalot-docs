---
headerDepth: 4
---

# IncentiveDistributor

**Distributor for Dexalot Incentive Program (DIP) rewards**

IncentiveDistributor distributes 200,000 $ALOT tokens monthly for up to 2 years and
potential other tokens to traders based on their trading activity. Token rewards per
trader are calculated off-chain and finalized at month&#x27;s end. To validate, we sign a
message containing the trader address, ids and amounts of reward tokens earned to date.
This signature is input to the claim function to verify and allow traders to withdraw
their earned Dexalot Incentive Program (DIP) rewards to the PortfolioSubnet contract.

## Variables

### Public

| Name | Type |
| --- | --- |
| CLAIM_TYPEHASH | bytes32 |
| VERSION | bytes32 |
| allTokens | uint32 |
| portfolio | contract IPortfolioSub |
| rewardSigner | address |
| tokens | mapping(uint32 &#x3D;&gt; bytes32) |

### Private

| Name | Type |
| --- | --- |
| _claimedWeeks | mapping(address &#x3D;&gt; mapping(uint32 &#x3D;&gt; struct BitMapsUpgradeable.BitMap)) |

## Events

### Claimed

```solidity:no-line-numbers
event Claimed(address claimer, uint32 tokenIds, uint32 expiry, uint16[] weekIds, uint128[] amounts, uint256 timestamp)
```

### AddRewardToken

```solidity:no-line-numbers
event AddRewardToken(bytes32 symbol, uint32 tokenId, uint256 timestamp)
```

### DepositGas

```solidity:no-line-numbers
event DepositGas(address from, uint256 quantity, uint256 timestamp)
```

### WithdrawGas

```solidity:no-line-numbers
event WithdrawGas(address to, uint256 quantity, uint256 timestamp)
```

### UpdateSigner

```solidity:no-line-numbers
event UpdateSigner(address oldSigner, address newSigner)
```

### RetrieveRewardToken

```solidity:no-line-numbers
event RetrieveRewardToken(address retriever, uint32 tokenId, uint256 quantity)
```

## Methods

### Public

#### initialize

```solidity:no-line-numbers
function initialize(bytes32 _alotSymbol, address __signer, address __portfolio) public
```

### External

#### receive

Receive native ALOT, ensures auto gas tank fill logic holds

```solidity:no-line-numbers
receive() external payable
```

#### claim

Claim DIP token rewards for specific weeks

**Dev notes:** \
To handle rolling expiry, we claim specific Week IDs.
The _amounts array should correspond to the total expected for the provided weeks.
Example: If claiming Week 10, 11 + 12 for Token A and Token B.
_weekIds: [10, 11, 12] (The weeks being claimed)
_amounts: [TotalForTokenA, TotalForTokenB] (The sum of those specific weeks)

```solidity:no-line-numbers
function claim(uint32 _tokenIds, uint32 _expiry, uint16[] _weekIds, uint128[] _amounts, bytes _signature) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenIds | uint32 | Bitmap of token IDs being claimed |
| _expiry | uint32 | Expiry timestamp of the signature |
| _weekIds | uint16[] | Array of week IDs being claimed |
| _amounts | uint128[] | Array of amounts corresponding to each token ID being claimed |
| _signature | bytes | EIP-712 signature from the authorized signer |

#### addRewardToken

Adds a new reward token to the distributor

**Dev notes:** \
Can only be called by the owner when the contract is paused

```solidity:no-line-numbers
function addRewardToken(bytes32 _symbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the new reward token |

#### retrieveRewardToken

Retrieve unclaimed reward tokens to owner

**Dev notes:** \
Can only be called by the owner when the contract is paused

```solidity:no-line-numbers
function retrieveRewardToken(uint32 _tokenId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint32 | Token ID to retrieve |

#### withdrawGas

Withdraw ALOT from IncentiveDistributor gas tank to owner

```solidity:no-line-numbers
function withdrawGas(uint256 amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount of ALOT to withdraw to owner |

#### pause

Pause to perform admin functions

```solidity:no-line-numbers
function pause() external
```

#### unpause

Unpause to allow claiming to resume

```solidity:no-line-numbers
function unpause() external
```

#### updateSigner

Update the authorized signer address

**Dev notes:** \
Can only be called by the owner when the contract is paused

```solidity:no-line-numbers
function updateSigner(address _newSigner) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newSigner | address | Address of the new signer |

#### isWeekClaimed

Check if a specific week has been claimed for a user and token

```solidity:no-line-numbers
function isWeekClaimed(address _user, uint32 _tokenId, uint16 _weekId) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | Address of the user |
| _tokenId | uint32 | Token ID to check |
| _weekId | uint16 | Week ID to check |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool indicating if the week has been claimed |

### Internal

#### _checkClaim

Internal function to verify claim signature

```solidity:no-line-numbers
function _checkClaim(address _user, uint32 _tokenIds, uint32 _expiry, uint16[] _weekIds, uint128[] _amounts, bytes _signature) internal view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | Address of the user making the claim |
| _tokenIds | uint32 | Bitmap of token IDs being claimed |
| _expiry | uint32 | Expiry timestamp of the signature |
| _weekIds | uint16[] | Array of week IDs being claimed |
| _amounts | uint128[] | Array of amounts corresponding to each token ID being claimed |
| _signature | bytes | EIP-712 signature from the authorized signer |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool indicating if the signature is valid |

