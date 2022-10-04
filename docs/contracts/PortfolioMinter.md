---
headerDepth: 4
---

# PortfolioMinter

**Intermediate contract to mint native tokens via NativeTokenMinter precompile.**


**Dev notes:** \
Only this contract is used to mint native tokens via NativeTokenMinter precompile.



## Variables

### Public

| Name | Type |
| --- | --- |
| MINTER_ROLE | bytes32 |
| PAUSER_ROLE | bytes32 |
| VERSION | bytes32 |
| totalNativeMinted | uint256 |



### Private

| Name | Type |
| --- | --- |
| nativeMinter | NativeMinterInterface |

## Events

### Mint



```solidity:no-line-numbers
event Mint(address to, uint256 amount)
```




## Methods

### Public

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grant admin and pauser role to the sender. Grant minter role to portfolio and set precompile address

```solidity:no-line-numbers
function initialize(address _portfolio, address _nativeMinter) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | Address of the portfolioSub |
| _nativeMinter | address | Address of the NativeMinter precompile |



### External

#### pause

Pauses minting

**Dev notes:** \
Only pauser can pause

```solidity:no-line-numbers
function pause() external
```


#### unpause

Unpauses minting

**Dev notes:** \
Only pauser can unpause

```solidity:no-line-numbers
function unpause() external
```


#### getNativeMinter



```solidity:no-line-numbers
function getNativeMinter() external view returns (address)
```


##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address  Address of the NativeMinter precompile |

#### mint

Mints native tokens by calling precompile

**Dev notes:** \
Only minter (portfolio) can mint

```solidity:no-line-numbers
function mint(address _to, uint256 _amount) external virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address to mint to |
| _amount | uint256 | Amount to mint |


#### fallback



```solidity:no-line-numbers
fallback() external
```




