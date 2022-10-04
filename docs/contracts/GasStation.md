---
headerDepth: 4
---

# GasStation

**Native token treasury**

This contract swaps other tokens with subnet native coin to send users native coin for gas.
It receives native coin and only sends out to the low balanced users via PortfolioSub.




## Variables

### Public

| Name | Type |
| --- | --- |
| PAUSER_ROLE | bytes32 |
| SWAPPER_ROLE | bytes32 |
| VERSION | bytes32 |
| gasAmount | uint256 |




## Events

### GasAmountChanged



```solidity:no-line-numbers
event GasAmountChanged(uint256 amount)
```

### GasRequested



```solidity:no-line-numbers
event GasRequested(address to, uint256 amount)
```




## Methods

### Public

#### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grant admin and pauser role to the sender. Grant swapper role to swapper (portfolio) contract

```solidity:no-line-numbers
function initialize(address _swapper, uint256 _gasAmount) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapper | address | Address of the swapper contract (PortfolioSub in our case) |
| _gasAmount | uint256 | Amount of gas to be distrubuted to the users |



### External

#### pause

Pauses gas distribution

**Dev notes:** \
Only pauser can pause

```solidity:no-line-numbers
function pause() external
```


#### unpause

Unpauses gas distribution

**Dev notes:** \
Only pauser can unpause

```solidity:no-line-numbers
function unpause() external
```


#### setGasAmount

Set gas amount to be distributed to the users

**Dev notes:** \
Only admin can set gas amount

```solidity:no-line-numbers
function setGasAmount(uint256 _gasAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gasAmount | uint256 | New gas amount |


#### requestGas

Swapper contract will request gas after depositing bridge fee to our EOA

**Dev notes:** \
Only swapper (Portfolio Sub) can request gas

```solidity:no-line-numbers
function requestGas(address _to) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the user to receive gas |


#### withdrawNative

Withdraws native alot from the contract

**Dev notes:** \
Only admin can withdraw

```solidity:no-line-numbers
function withdrawNative(uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | Amount of alot to withdraw |


#### receive



```solidity:no-line-numbers
receive() external payable
```


#### fallback


**Dev notes:** \
we revert transaction if a non-existing function is called

```solidity:no-line-numbers
fallback() external payable
```




