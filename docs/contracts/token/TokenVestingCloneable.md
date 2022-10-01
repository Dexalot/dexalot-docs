# TokenVestingCloneable

**Flexible, cloneable token vesting contract**




## Variables

| Var | Type |
| --- | --- |

## Events

### TokensReleased



```solidity
event TokensReleased(address token, uint256 amount)
```
### TokenVestingRevoked



```solidity
event TokenVestingRevoked(address token)
```
### PortfolioChanged



```solidity
event PortfolioChanged(address portfolio)
```

## Methods

### initialize

This vesting contract depends on time-based vesting schedule using block timestamps.
Therefore, the contract would be susceptible to timestamp manipulation miners may be able to
do in some EVMs for variables with less than a min time lengths for delta time. To mitigate
potential exploits variables holding delta time are required to be more than 5 minutes.

**Dev notes:** \
Creates a vesting contract that vests its balance of any ERC20 token to the
beneficiary, gradually in a linear fashion until start + duration. By then all
of the balance will have vested.

```solidity
function initialize(address __beneficiary, uint256 __start, uint256 __cliffDuration, uint256 __duration, uint256 __startPortfolioDeposits, bool __revocable, uint256 __firstReleasePercentage, uint256 __period, address __portfolio, address __owner) public
```

#### Arguments

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


### beneficiary



```solidity
function beneficiary() external view returns (address)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | _beneficiary beneficiary of the tokens. |

### cliff



```solidity
function cliff() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _cliff cliff time of the token vesting. |

### start



```solidity
function start() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _start start time of the token vesting. |

### duration



```solidity
function duration() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _duration duration of the token vesting. |

### startPortfolioDeposits



```solidity
function startPortfolioDeposits() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _startPortfolioDeposits start time for depositing to portfolio. |

### revocable



```solidity
function revocable() external view returns (bool)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | _revocable true if the vesting is revocable. |

### period



```solidity
function period() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _period duration in seconds for claim periods. |

### released



```solidity
function released(address token) external view returns (uint256)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | ERC20 token which is being vested. |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _released amount of the token released. |

### revoked



```solidity
function revoked(address token) external view returns (bool)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | ERC20 token which is being vested. |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | _revoked true if the token is revoked. |

### getPercentage



```solidity
function getPercentage() external view returns (uint256)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _firstReleasePercentage percentage to be released initially. |

### canFundWallet

beneficiary check is not for access control, it is just for convenience in frontend


```solidity
function canFundWallet(contract IERC20MetadataUpgradeable token, address __beneficiary) external view returns (bool)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |
| __beneficiary | address | address of beneficiary. |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the vesting is funded to the portfolio. |

### canFundPortfolio

beneficiary check is not for access control, it is just for convenience in frontend


```solidity
function canFundPortfolio(address __beneficiary) public view returns (bool)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| __beneficiary | address | address of beneficiary. |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the vesting is funded to the portfolio. |

### getPortfolio



```solidity
function getPortfolio() external view returns (address)
```


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | _portfolio portfolio address for funding |

### setPortfolio


**Dev notes:** \
sets the address for the portfolio.

```solidity
function setPortfolio(address __portfolio) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| __portfolio | address | address of portfolio |


### release

Transfers vested tokens to beneficiary.


```solidity
function release(contract IERC20MetadataUpgradeable token) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |


### releaseToPortfolio

User must give two approvals for the vesting and portfolio contracts before calling this function.

**Dev notes:** \
Transfers vested tokens to Portfolio.

```solidity
function releaseToPortfolio(contract IERC20MetadataUpgradeable token) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |


### revoke

Tokens already vested remain in the contract, the rest are returned to the owner.

**Dev notes:** \
Allows the owner to revoke the vesting.

```solidity
function revoke(contract IERC20MetadataUpgradeable token) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |


### vestedAmount


**Dev notes:** \
Returns the amount for the amount remaining after the initial percentage vested at TGE.

```solidity
function vestedAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |


### releasedPercentageAmount


**Dev notes:** \
Returns the amount that has been released based on the initial percentage vested at TGE.

```solidity
function releasedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |


### vestedPercentageAmount


**Dev notes:** \
Returns the amount that is releaseable based on the initial percentage vested  at TGE.

```solidity
function vestedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |



