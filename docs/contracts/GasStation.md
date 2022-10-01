# GasStation

**Native token treasury**

This contract swaps other tokens with subnet native coin to send users native coin for gas.
It receives native coin and only sends out to the low balanced users via PortfolioSub.



## Variables

| Var | Type |
| --- | --- |

## Events

### GasAmountChanged



```solidity
event GasAmountChanged(uint256 amount)
```
### GasRequested



```solidity
event GasRequested(address to, uint256 amount)
```

## Methods

### initialize

Initializer for upgradeable contract.

**Dev notes:** \
Grant admin and pauser role to the sender. Grant swapper role to swapper (portfolio) contract

```solidity
function initialize(address _swapper, uint256 _gasAmount) public
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _swapper | address | Address of the swapper contract (PortfolioSub in our case) |
| _gasAmount | uint256 | Amount of gas to be distrubuted to the users |


### pause

Pauses gas distribution

**Dev notes:** \
Only pauser can pause

```solidity
function pause() external
```


### unpause

Unpauses gas distribution

**Dev notes:** \
Only pauser can unpause

```solidity
function unpause() external
```


### setGasAmount

Set gas amount to be distributed to the users

**Dev notes:** \
Only admin can set gas amount

```solidity
function setGasAmount(uint256 _gasAmount) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gasAmount | uint256 | New gas amount |


### requestGas

Swapper contract will request gas after depositing bridge fee to our EOA

**Dev notes:** \
Only swapper (Portfolio Sub) can request gas

```solidity
function requestGas(address _to) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the user to receive gas |


### withdrawNative

Withdraws native alot from the contract

**Dev notes:** \
Only admin can withdraw

```solidity
function withdrawNative(uint256 _amount) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | Amount of alot to withdraw |


### receive



```solidity
receive() external payable
```


### fallback


**Dev notes:** \
we revert transaction if a non-existing function is called

```solidity
fallback() external payable
```



