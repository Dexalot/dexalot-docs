---
headerDepth: 4
---

# TokenVestingCloneable

**Flexible, cloneable token vesting contract**

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |

### Private

| Name | Type |
| --- | --- |
| _beneficiary | address |
| _cliff | uint256 |
| _start | uint256 |
| _duration | uint256 |
| _startPortfolioDeposits | uint256 |
| _period | uint256 |
| _revocable | bool |
| _portfolio | contract IPortfolioMain |
| _totalSupplyBeforeRevoke | uint256 |
| _firstReleasePercentage | uint256 |
| _releasedPercentage | mapping(address &#x3D;&gt; uint256) |
| _released | mapping(address &#x3D;&gt; uint256) |
| _revoked | mapping(address &#x3D;&gt; bool) |

## Events

### TokensReleased

```solidity:no-line-numbers
event TokensReleased(address token, uint256 amount)
```

### TokenVestingRevoked

```solidity:no-line-numbers
event TokenVestingRevoked(address token)
```

### PortfolioChanged

```solidity:no-line-numbers
event PortfolioChanged(address portfolio)
```

## Methods

### Public

#### initialize

This vesting contract depends on time-based vesting schedule using block timestamps.
Therefore, the contract would be susceptible to timestamp manipulation miners may be able to
do in some EVMs for variables with less than a min time lengths for delta time. To mitigate
potential exploits variables holding delta time are required to be more than 5 minutes.

**Dev notes:** \
Creates a vesting contract that vests its balance of any ERC20 token to the
beneficiary, gradually in a linear fashion until start + duration. By then all
of the balance will have vested.

```solidity:no-line-numbers
function initialize(address __beneficiary, uint256 __start, uint256 __cliffDuration, uint256 __duration, uint256 __startPortfolioDeposits, bool __revocable, uint256 __firstReleasePercentage, uint256 __period, address __portfolio, address __owner) public
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
| __period | uint256 | length of claim period that allows one to withdraw in discrete periods. i.e. (60 x 60 x 24) x 30 will allow the beneficiary to claim every 30 days, 0 for no restrictions |
| __portfolio | address | address of portfolio |
| __owner | address |  |

#### canFundPortfolio

beneficiary check is not for access control, it is just for convenience in frontend

```solidity:no-line-numbers
function canFundPortfolio(address __beneficiary) public view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| __beneficiary | address | address of beneficiary. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the vesting is funded to the portfolio. |

### External

#### beneficiary

```solidity:no-line-numbers
function beneficiary() external view returns (address)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | _beneficiary beneficiary of the tokens. |

#### cliff

```solidity:no-line-numbers
function cliff() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _cliff cliff time of the token vesting. |

#### start

```solidity:no-line-numbers
function start() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _start start time of the token vesting. |

#### duration

```solidity:no-line-numbers
function duration() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _duration duration of the token vesting. |

#### startPortfolioDeposits

```solidity:no-line-numbers
function startPortfolioDeposits() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _startPortfolioDeposits start time for depositing to portfolio. |

#### revocable

```solidity:no-line-numbers
function revocable() external view returns (bool)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | _revocable true if the vesting is revocable. |

#### period

```solidity:no-line-numbers
function period() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _period duration in seconds for claim periods. |

#### released

```solidity:no-line-numbers
function released(address token) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | ERC20 token which is being vested. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _released amount of the token released. |

#### revoked

```solidity:no-line-numbers
function revoked(address token) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | ERC20 token which is being vested. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | _revoked true if the token is revoked. |

#### getPercentage

```solidity:no-line-numbers
function getPercentage() external view returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _firstReleasePercentage percentage to be released initially. |

#### canFundWallet

beneficiary check is not for access control, it is just for convenience in frontend

```solidity:no-line-numbers
function canFundWallet(contract IERC20MetadataUpgradeable token, address __beneficiary) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |
| __beneficiary | address | address of beneficiary. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the vesting is funded to the portfolio. |

#### getPortfolio

```solidity:no-line-numbers
function getPortfolio() external view returns (address)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | _portfolio portfolio address for funding |

#### setPortfolio

**Dev notes:** \
sets the address for the portfolio.

```solidity:no-line-numbers
function setPortfolio(address __portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| __portfolio | address | address of portfolio |

#### release

Transfers vested tokens to beneficiary.

```solidity:no-line-numbers
function release(contract IERC20MetadataUpgradeable token) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### releaseToPortfolio

User must give two approvals for the vesting and portfolio contracts before calling this function.

**Dev notes:** \
Transfers vested tokens to Portfolio.

```solidity:no-line-numbers
function releaseToPortfolio(contract IERC20MetadataUpgradeable token) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### revoke

Tokens already vested remain in the contract, the rest are returned to the owner.

**Dev notes:** \
Allows the owner to revoke the vesting.

```solidity:no-line-numbers
function revoke(contract IERC20MetadataUpgradeable token) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### vestedAmount

**Dev notes:** \
Returns the amount for the amount remaining after the initial percentage vested at TGE.

```solidity:no-line-numbers
function vestedAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### releasedPercentageAmount

**Dev notes:** \
Returns the amount that has been released based on the initial percentage vested at TGE.

```solidity:no-line-numbers
function releasedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### vestedPercentageAmount

**Dev notes:** \
Returns the amount that is releaseable based on the initial percentage vested  at TGE.

```solidity:no-line-numbers
function vestedPercentageAmount(contract IERC20MetadataUpgradeable token) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

### Private

#### _releasableAmount

**Dev notes:** \
Calculates the amount that has already vested but hasn't been released yet.

```solidity:no-line-numbers
function _releasableAmount(contract IERC20MetadataUpgradeable token) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### _vestedAmount

Subtracts the amount calculated by percentage.
Starts calculating of vested amount after the time of cliff.

**Dev notes:** \
Calculates the amount that has already vested.

```solidity:no-line-numbers
function _vestedAmount(contract IERC20MetadataUpgradeable token) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

#### _vestedByPercentage

**Dev notes:** \
Calculates the amount vested at TGE.

```solidity:no-line-numbers
function _vestedByPercentage(contract IERC20MetadataUpgradeable token) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20MetadataUpgradeable | ERC20 token which is being vested. |

