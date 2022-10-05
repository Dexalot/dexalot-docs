---
headerDepth: 4
---

# Staking

**Flexible staking contract**

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| isStakingPaused | bool |
| lastUpdateTime | uint256 |
| periodFinish | uint256 |
| rewardsToken | contract IERC20Upgradeable |
| rewardsDuration | uint256 |
| rewardRate | uint256 |
| rewardPerTokenStored | uint256 |
| rewards | mapping(address &#x3D;&gt; uint256) |
| stakingToken | contract IERC20Upgradeable |
| userRewardPerTokenPaid | mapping(address &#x3D;&gt; uint256) |

### Private

| Name | Type |
| --- | --- |
| MULTIPLIER | uint256 |
| SECONDSINYEAR | uint256 |
| TENK | uint256 |
| _totalStake | uint256 |
| _stakes | mapping(address &#x3D;&gt; uint256) |

## Events

### Staked

```solidity:no-line-numbers
event Staked(address user, uint256 amount)
```

### Withdrawn

```solidity:no-line-numbers
event Withdrawn(address user, uint256 amount)
```

### Restaked

```solidity:no-line-numbers
event Restaked(address user, uint256 reward)
```

### RewardPaid

```solidity:no-line-numbers
event RewardPaid(address user, uint256 reward)
```

### RewardRateUpdated

```solidity:no-line-numbers
event RewardRateUpdated(uint256 rate)
```

### RewardsDurationUpdated

```solidity:no-line-numbers
event RewardsDurationUpdated(uint256 rewardsDuration)
```

### FundsRecovered

```solidity:no-line-numbers
event FundsRecovered(uint256 amount, address token)
```

## Modifiers

#### updateReward

```solidity:no-line-numbers
modifier updateReward(address account)
```

## Methods

### Public

#### initialize

```solidity:no-line-numbers
function initialize(address _stakingToken, address _rewardsToken, uint256 _rewardRate, uint256 _rewardsDuration) public
```

#### lastTimeRewardApplicable

```solidity:no-line-numbers
function lastTimeRewardApplicable() public view returns (uint256)
```

#### rewardPerToken

```solidity:no-line-numbers
function rewardPerToken() public view returns (uint256)
```

#### earned

```solidity:no-line-numbers
function earned(address account) public view returns (uint256)
```

#### unstake

```solidity:no-line-numbers
function unstake(uint256 amount) public
```

#### restake

```solidity:no-line-numbers
function restake() public
```

#### claim

```solidity:no-line-numbers
function claim() public
```

### External

#### totalStake

```solidity:no-line-numbers
function totalStake() external view returns (uint256)
```

#### stakeOf

```solidity:no-line-numbers
function stakeOf(address account) external view returns (uint256)
```

#### stake

```solidity:no-line-numbers
function stake(uint256 amount) external
```

#### exit

```solidity:no-line-numbers
function exit(uint256 amount) external
```

#### pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

```solidity:no-line-numbers
function unpause() external
```

#### pauseStaking

```solidity:no-line-numbers
function pauseStaking() external
```

#### unpauseStaking

```solidity:no-line-numbers
function unpauseStaking() external
```

#### setRewardRate

```solidity:no-line-numbers
function setRewardRate(uint256 _rewardRate) external
```

#### setRewardsDuration

```solidity:no-line-numbers
function setRewardsDuration(uint256 _rewardsDuration) external
```

#### recoverFunds

```solidity:no-line-numbers
function recoverFunds() external
```

