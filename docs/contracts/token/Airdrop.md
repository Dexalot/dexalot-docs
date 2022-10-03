---
headerDepth: 4
---

# Airdrop

**Flexible airdrop contract**





## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| root | bytes32 |
| token | IERC20 |



### Private

| Name | Type |
| --- | --- |
| _cliff | uint256 |
| _start | uint256 |
| _duration | uint256 |
| _firstReleasePercentage | uint256 |
| _released | mapping(uint256 &#x3D;&gt; uint256) |

## Events

### Claimed



```solidity:no-line-numbers
event Claimed(address claimer, uint256 amount, uint256 timestamp)
```



## Methods

### Public

#### constructor



```solidity:no-line-numbers
constructor(contract IERC20 _token, bytes32 _root, uint256 __start, uint256 __cliffDuration, uint256 __duration, uint256 __firstReleasePercentage) public
```



### External

#### cliff



```solidity:no-line-numbers
function cliff() external view returns (uint256)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the cliff time of the airdrop vesting |

#### start



```solidity:no-line-numbers
function start() external view returns (uint256)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the start time of the airdrop vesting |

#### duration



```solidity:no-line-numbers
function duration() external view returns (uint256)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the duration of the airdrop vesting |

#### getPercentage



```solidity:no-line-numbers
function getPercentage() external view returns (uint256)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the initial release percentage. |

#### claim


**Dev notes:** \
Claims tokens to user's wallet

```solidity:no-line-numbers
function claim(uint256 index, uint256 amount, bytes32[] merkleProof) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | value of the position in the list |
| amount | uint256 | total value to airdrop, Percentage and Vesting calculated by it |
| merkleProof | bytes32[] | the proof of merkle |


#### released



```solidity:no-line-numbers
function released(uint256 index) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | value of the position in the list |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | released amount for the index |

#### releasableAmount



```solidity:no-line-numbers
function releasableAmount(uint256 index, uint256 amount, bytes32[] merkleProof) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | value of the position in the list |
| amount | uint256 | total value to airdrop, Percentage and Vesting calculated by it |
| merkleProof | bytes32[] | the proof of merkle |


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | releasableAmount for the index |

#### retrieveProjectToken


**Dev notes:** \
retrieves project tokens from the contract sending to the owner

```solidity:no-line-numbers
function retrieveProjectToken() external
```


#### retrieveOtherToken


**Dev notes:** \
retrieves other tokens from the contract sending to the owner

```solidity:no-line-numbers
function retrieveOtherToken(address tok) external
```


#### pause


**Dev notes:** \
pauses the contract

```solidity:no-line-numbers
function pause() external
```


#### unpause


**Dev notes:** \
unpauses the contract

```solidity:no-line-numbers
function unpause() external
```




### Private

#### _releasableAmount



```solidity:no-line-numbers
function _releasableAmount(uint256 index, uint256 amount) private view returns (uint256)
```


#### _vestedAmount



```solidity:no-line-numbers
function _vestedAmount(uint256 amount) private view returns (uint256)
```


#### _vestedByPercentage



```solidity:no-line-numbers
function _vestedByPercentage(uint256 amount) private view returns (uint256)
```


