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
their earned Dexalot Incentive Program (DIP) rewards.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| allTokens | uint32 |
| claimedRewards | mapping(address &#x3D;&gt; mapping(uint32 &#x3D;&gt; uint128)) |
| tokens | mapping(uint32 &#x3D;&gt; contract IERC20Upgradeable) |

### Private

| Name | Type |
| --- | --- |
| _signer | address |

## Events

### Claimed

```solidity:no-line-numbers
event Claimed(address claimer, uint32 tokenIds, uint128[] amounts, uint256 timestamp)
```

### AddRewardToken

```solidity:no-line-numbers
event AddRewardToken(contract IERC20Upgradeable token, uint32 tokenId, uint256 timestamp)
```

## Methods

### Public

#### initialize

Initializer of the IncentiveDistributor

**Dev notes:** \
Adds ALOT token as the first reward token and defines the signer of claim messages.

```solidity:no-line-numbers
function initialize(contract IERC20Upgradeable _alotToken, address __signer) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _alotToken | contract IERC20Upgradeable | The address of the ALOT token |
| __signer | address | The public address of the signer of claim messages |

### External

#### claim

Claim DIP token rewards for a given trader

```solidity:no-line-numbers
function claim(uint128[] _amounts, uint32 _tokenIds, bytes _signature) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amounts | uint128[] | An array of total earned amount for each reward token |
| _tokenIds | uint32 | A bitmap representing which tokens to claim |
| _signature | bytes | A signed claim message to be verified |

#### addRewardToken

Add new claimable reward token

```solidity:no-line-numbers
function addRewardToken(contract IERC20Upgradeable _rewardToken) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardToken | contract IERC20Upgradeable | The address of the new reward token |

#### retrieveRewardToken

Retrieve reward token when DIP ends

```solidity:no-line-numbers
function retrieveRewardToken(uint32 _tokenId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint32 | The id of the reward token to retrieve |

#### retrieveAllRewardTokens

Retrieve all reward tokens when DIP ends

```solidity:no-line-numbers
function retrieveAllRewardTokens() external
```

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

### Internal

#### _checkClaim

Verifies claim message (_user, _tokenIds, _amount) has been signed by signer

```solidity:no-line-numbers
function _checkClaim(address _user, uint32 _tokenIds, uint128[] _amounts, bytes _signature) internal view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | The trader making a claim |
| _tokenIds | uint32 | A bitmap representing which tokens to claim |
| _amounts | uint128[] | An array of total earned amount for each reward token |
| _signature | bytes | A signed claim message to be verified |

