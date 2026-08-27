---
headerDepth: 4
---

# InstOVWallet

## Variables

### Public

| Name | Type |
| --- | --- |
| institutionalOwner | address |
| portfolio | address |

### Private

| Name | Type |
| --- | --- |
| __gap | bytes32[50] |

## Methods

### External

#### receive

Allows the contract to receive native currency

```solidity:no-line-numbers
receive() external payable
```

#### setPortfolio

Sets the portfolio contract address

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | The address of the portfolio contract |

### Internal

#### constructor

```solidity:no-line-numbers
constructor(address _institutionalOwner) internal
```

