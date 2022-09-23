# Airdrop

*&quot;DEXALOT TEAM&quot;*

> &quot;AirDrop: a flexible airdrop contract&quot;





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
function claim(uint256 index, uint256 amount, bytes32[] merkleProof) external nonpayable
```



*Claims tokens to user&#39;s wallet*

#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | value of the position in the list |
| amount | uint256 | total value to airdrop, Percentage and Vesting calculated by it |
| merkleProof | bytes32[] | the proof of merkle |

### cliff

```solidity
function cliff() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | the cliff time of the airdrop vesting |

### duration

```solidity
function duration() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | the duration of the airdrop vesting |

### getPercentage

```solidity
function getPercentage() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | the initial release percentage. |

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



*pauses the contract*


### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### releasableAmount

```solidity
function releasableAmount(uint256 index, uint256 amount, bytes32[] merkleProof) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | value of the position in the list |
| amount | uint256 | total value to airdrop, Percentage and Vesting calculated by it |
| merkleProof | bytes32[] | the proof of merkle |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | releasableAmount for the index |

### released

```solidity
function released(uint256 index) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | value of the position in the list |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | released amount for the index |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### retrieveOtherToken

```solidity
function retrieveOtherToken(address tok) external nonpayable
```



*retrieves other tokens from the contract sending to the owner*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tok | address | undefined |

### retrieveProjectToken

```solidity
function retrieveProjectToken() external nonpayable
```



*retrieves project tokens from the contract sending to the owner*


### root

```solidity
function root() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### start

```solidity
function start() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | the start time of the airdrop vesting |

### token

```solidity
function token() external view returns (contract IERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20 | undefined |

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



*unpauses the contract*




## Events

### Claimed

```solidity
event Claimed(address claimer, uint256 amount, uint256 timestamp)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| claimer  | address | undefined |
| amount  | uint256 | undefined |
| timestamp  | uint256 | undefined |

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

### Unpaused

```solidity
event Unpaused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |



