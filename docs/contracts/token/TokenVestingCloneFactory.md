---
headerDepth: 4
---

# TokenVestingCloneFactory

**Clone factory for TokenVestingCloneable**

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| clones | mapping(uint256 &#x3D;&gt; address) |
| count | uint256 |
| implementation | address |

## Events

### TokenVestingCloneFactoryInitialized

```solidity:no-line-numbers
event TokenVestingCloneFactoryInitialized(address implementation)
```

### NewClone

```solidity:no-line-numbers
event NewClone(address _clone)
```

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor() public
```

### External

#### createTokenVesting

**Dev notes:** \
Create function for a new TokenVesting clone

```solidity:no-line-numbers
function createTokenVesting(address __beneficiary, uint256 __start, uint256 __cliffDuration, uint256 __duration, uint256 __startPortfolioDeposits, bool __revocable, uint256 __firstReleasePercentage, uint256 __period, address __portfolio, address __owner) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| __beneficiary | address | address of the beneficiary to whom vested tokens are transferred |
| __start | uint256 | time (as Unix time) at which point vesting starts |
| __cliffDuration | uint256 | duration in seconds of the cliff in which tokens will begin to vest |
| __duration | uint256 | duration in seconds of the period in which the tokens will vest |
| __startPortfolioDeposits | uint256 | time (as Unix time) portfolio deposits start |
| __revocable | bool | whether the vesting is revocable or not |
| __firstReleasePercentage | uint256 | percentage to be released initially |
| __period | uint256 | length of claim period that allows one to withdraw in discrete periods. i.e. (60 x 60 x 24) x 30 will allow the beneficiary to claim every 30 days, 0 for no restrictions |
| __portfolio | address | address of portfolio |
| __owner | address |  |

#### getClone

**Dev notes:** \
Accessor method to get i-th clone

```solidity:no-line-numbers
function getClone(uint256 index) external view returns (address)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | clone index |

