---
headerDepth: 4
---

# InventoryFeeCalculatorLibrary

**InventoryFeeCalculatorLibrary**

Library for calculating withdrawal fees based on inventory levels across different chains.
The fee is determined by how the post-withdrawal inventory ratio compares to a target equilibrium
ratio, using a formula that incorporates a maximum fee and an exponent to adjust sensitivity.

**Dev notes:** \
This library is designed to be used in conjunction with the InventoryManager contract.

## Variables

### Internal

| Name | Type |
| --- | --- |
| BPS | uint256 |
| MAX_FEE_RATE | uint256 |
| MIN_FEE_RATE | uint256 |

## Methods

### Internal

#### calculateFee

Calculate the inventory fee for a withdrawal

```solidity:no-line-numbers
function calculateFee(uint256 K, uint256 _quantity, uint256 _chainInventory, uint256 _totalInventory, uint256 _targetChainRatio) internal pure returns (uint256 inventoryFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| K | uint256 | The sensitivity exponent factor to apply (e.g., 8, 12, 16, ..., 32) |
| _quantity | uint256 | The quantity being withdrawn |
| _chainInventory | uint256 | The current inventory on the chain from which the withdrawal is made |
| _totalInventory | uint256 | The total inventory across all chains |
| _targetChainRatio | uint256 | The target equilibrium ratio for the chain from which the withdrawal is made |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| inventoryFee | uint256 | The calculated inventory fee for the withdrawal |

### Private

#### mulBPS

Performs BPS fixed-point multiplication: (a * b) / BPS

```solidity:no-line-numbers
function mulBPS(uint256 a, uint256 b) private pure returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | The first multiplicand |
| b | uint256 | The second multiplicand |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The result of the multiplication in BPS fixed-point format |

#### divBPS

Performs BPS fixed-point division: (a * BPS) / b

```solidity:no-line-numbers
function divBPS(uint256 a, uint256 b) private pure returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | The numerator |
| b | uint256 | The denominator |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The result of the division in BPS fixed-point format |

#### powMultipleOf4BPS

Efficiently computes base^K where K is a multiple of 4 (e.g., 8, 12, 16, ..., 32)

```solidity:no-line-numbers
function powMultipleOf4BPS(uint256 base, uint256 K) private pure returns (uint256 result_)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| base | uint256 | The base value in terms of BPS |
| K | uint256 | The exponent value (must be a multiple of 4) |

