# TokenVestingCloneable

*&quot;DEXALOT TEAM&quot;*

> &quot;TokenVestingCloneable: a flexible, cloneable token vesting contract&quot;





## Methods

### VERSION

```solidity
function VERSION() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### beneficiary

```solidity
function beneficiary() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | _beneficiary beneficiary of the tokens. |

### canFundPortfolio

```solidity
function canFundPortfolio(address __beneficiary) external view returns (bool)
```

beneficiary check is not for access control, it is just for convenience in frontend



#### Parameters

| Name | Type | Description |
|---|---|---|
| __beneficiary | address | address of beneficiary. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | true if the vesting is funded to the portfolio. |

### canFundWallet

```solidity
function canFundWallet(contract IERC20MetadataUpgradeable token, address __beneficiary) external view returns (bool)
```

beneficiary check is not for access control, it is just for convenience in frontend



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |
| __beneficiary | address | address of beneficiary. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | true if the vesting is funded to the portfolio. |

### cliff

```solidity
function cliff() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _cliff cliff time of the token vesting. |

### duration

```solidity
function duration() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _duration duration of the token vesting. |

### getPercentage

```solidity
function getPercentage() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _firstReleasePercentage percentage to be released initially. |

### getPortfolio

```solidity
function getPortfolio() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | _portfolio portfolio address for funding |

### initialize

```solidity
function initialize(address __beneficiary, uint256 __start, uint256 __cliffDuration, uint256 __duration, uint256 __startPortfolioDeposits, bool __revocable, uint256 __firstReleasePercentage, uint256 __period, address __portfolio, address __owner) external nonpayable
```

This vesting contract depends on time-based vesting schedule using block timestamps. Therefore, the contract would be susceptible to timestamp manipulation miners may be able to do in some EVMs for variables with less than a min time lengths for delta time. To mitigate potential exploits variables holding delta time are required to be more than 5 minutes.

*Creates a vesting contract that vests its balance of any ERC20 token to the beneficiary, gradually in a linear fashion until start + duration. By then all of the balance will have vested.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| __beneficiary | address | address of the beneficiary to whom vested tokens are transferred |
| __start | uint256 | time (as Unix time) at which point vesting starts |
| __cliffDuration | uint256 | duration in seconds of the cliff in which tokens will begin to vest |
| __duration | uint256 | duration in seconds of the period in which the tokens will vest |
| __startPortfolioDeposits | uint256 | time (as Unix time) portfolio deposits start |
| __revocable | bool | whether the vesting is revocable or not |
| __firstReleasePercentage | uint256 | percentage to be released initially |
| __period | uint256 | length of claim period that allows one to withdraw in discrete periods. i.e. (60 x 60 x 24) x 30 will allow the beneficiary to claim every 30 days, 0 for no restrictions |
| __portfolio | address | address of portfolio |
| __owner | address | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### period

```solidity
function period() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _period duration in seconds for claim periods. |

### release

```solidity
function release(contract IERC20MetadataUpgradeable token) external nonpayable
```

Transfers vested tokens to beneficiary.



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

### releaseToPortfolio

```solidity
function releaseToPortfolio(contract IERC20MetadataUpgradeable token) external nonpayable
```

User must give two approvals for the vesting and portfolio contracts before calling this function.

*Transfers vested tokens to Portfolio.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

### released

```solidity
function released(address token) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | ERC20 token which is being vested. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _released amount of the token released. |

### releasedPercentageAmount

```solidity
function releasedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```



*Returns the amount that has been released based on the initial percentage vested at TGE.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### revocable

```solidity
function revocable() external view returns (bool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | _revocable true if the vesting is revocable. |

### revoke

```solidity
function revoke(contract IERC20MetadataUpgradeable token) external nonpayable
```

Tokens already vested remain in the contract, the rest are returned to the owner.

*Allows the owner to revoke the vesting.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

### revoked

```solidity
function revoked(address token) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | ERC20 token which is being vested. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | _revoked true if the token is revoked. |

### setPortfolio

```solidity
function setPortfolio(address __portfolio) external nonpayable
```



*sets the address for the portfolio.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| __portfolio | address | address of portfolio |

### start

```solidity
function start() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _start start time of the token vesting. |

### startPortfolioDeposits

```solidity
function startPortfolioDeposits() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | _startPortfolioDeposits start time for depositing to portfolio. |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### vestedAmount

```solidity
function vestedAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```



*Returns the amount for the amount remaining after the initial percentage vested at TGE.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### vestedPercentageAmount

```solidity
function vestedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```



*Returns the amount that is releaseable based on the initial percentage vested  at TGE.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

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

### PortfolioChanged

```solidity
event PortfolioChanged(address portfolio)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| portfolio  | address | undefined |

### TokenVestingRevoked

```solidity
event TokenVestingRevoked(address token)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token  | address | undefined |

### TokensReleased

```solidity
event TokensReleased(address token, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token  | address | undefined |
| amount  | uint256 | undefined |



