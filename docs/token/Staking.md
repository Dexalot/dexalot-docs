# Staking



> Flexible staking contract





## Methods

### VERSION

```solidity
function VERSION() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### claim

```solidity
function claim() external nonpayable
```






### earned

```solidity
function earned(address account) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### exit

```solidity
function exit(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### initialize

```solidity
function initialize(address _stakingToken, address _rewardsToken, uint256 _rewardRate, uint256 _rewardsDuration) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _stakingToken | address | undefined |
| _rewardsToken | address | undefined |
| _rewardRate | uint256 | undefined |
| _rewardsDuration | uint256 | undefined |

### isStakingPaused

```solidity
function isStakingPaused() external view returns (bool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### lastTimeRewardApplicable

```solidity
function lastTimeRewardApplicable() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### lastUpdateTime

```solidity
function lastUpdateTime() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### pause

```solidity
function pause() external nonpayable
```






### pauseStaking

```solidity
function pauseStaking() external nonpayable
```






### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### periodFinish

```solidity
function periodFinish() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### recoverFunds

```solidity
function recoverFunds() external nonpayable
```






### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### restake

```solidity
function restake() external nonpayable
```






### rewardPerToken

```solidity
function rewardPerToken() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewardPerTokenStored

```solidity
function rewardPerTokenStored() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewardRate

```solidity
function rewardRate() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewards

```solidity
function rewards(address) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewardsDuration

```solidity
function rewardsDuration() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewardsToken

```solidity
function rewardsToken() external view returns (contract IERC20Upgradeable)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### setRewardRate

```solidity
function setRewardRate(uint256 _rewardRate) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _rewardRate | uint256 | undefined |

### setRewardsDuration

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _rewardsDuration | uint256 | undefined |

### stake

```solidity
function stake(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### stakeOf

```solidity
function stakeOf(address account) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### stakingToken

```solidity
function stakingToken() external view returns (contract IERC20Upgradeable)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### totalStake

```solidity
function totalStake() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### unpause

```solidity
function unpause() external nonpayable
```






### unpauseStaking

```solidity
function unpauseStaking() external nonpayable
```






### unstake

```solidity
function unstake(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### userRewardPerTokenPaid

```solidity
function userRewardPerTokenPaid(address) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

### FundsRecovered

```solidity
event FundsRecovered(uint256 amount, address token)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount  | uint256 | undefined |
| token  | address | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### Paused

```solidity
event Paused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

### Restaked

```solidity
event Restaked(address indexed user, uint256 reward)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| reward  | uint256 | undefined |

### RewardPaid

```solidity
event RewardPaid(address indexed user, uint256 reward)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| reward  | uint256 | undefined |

### RewardRateUpdated

```solidity
event RewardRateUpdated(uint256 rate)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rate  | uint256 | undefined |

### RewardsDurationUpdated

```solidity
event RewardsDurationUpdated(uint256 rewardsDuration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rewardsDuration  | uint256 | undefined |

### Staked

```solidity
event Staked(address indexed user, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| amount  | uint256 | undefined |

### Unpaused

```solidity
event Unpaused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

### Withdrawn

```solidity
event Withdrawn(address indexed user, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| amount  | uint256 | undefined |



