---
headerDepth: 4
---

# InvariantMathLibrary

**InvariantMathLibrary**

Library for calculating withdrawal fees of the same asset across different chains
using a stableswap invariant which combines a constant product and constant sum formula.

**Dev notes:** \
To be used in conjunction with the InventoryManager contract. Calculations use Newton&#x27;s method to
approximate the value of D and YD. For more information, see the StableSwap whitepaper.

## Methods

### Internal

#### calcWithdrawOneChain

Calculate the withdrawal fee for a token from a given chain

```solidity:no-line-numbers
function calcWithdrawOneChain(uint256 _quantity, uint256 _i, uint256[] _xp, uint256 _totalInventory, uint256 _A, uint256 _N) internal pure returns (uint256 fee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _quantity | uint256 | The quantity to withdraw |
| _i | uint256 | The index of the chain to withdraw from |
| _xp | uint256[] | The array of inventory per chain |
| _totalInventory | uint256 | The total inventory across all chains |
| _A | uint256 | The amplification coefficient |
| _N | uint256 | The number of chains |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint256 | The withdrawal fee |

### Private

#### abs

Calculate the absolute difference between two numbers

```solidity:no-line-numbers
function abs(uint256 x, uint256 y) private pure returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| x | uint256 | The first number |
| y | uint256 | The second number |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The absolute difference between x and y |

#### getD

Calculate the D value for the given x and A

```solidity:no-line-numbers
function getD(uint256[] xp, uint256 A, uint256 N) private pure returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| xp | uint256[] | The array of inventory per chain |
| A | uint256 | The amplification coefficient |
| N | uint256 | The number of chains |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The D value |

#### getYD

Calculate the YD value for the given i, xp, d, A, and N

```solidity:no-line-numbers
function getYD(uint256 i, uint256[] xp, uint256 d, uint256 A, uint256 N) private pure returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| i | uint256 | The index of the chain to withdraw from |
| xp | uint256[] | The array of inventory per chain |
| d | uint256 | The D value |
| A | uint256 | The amplification coefficient |
| N | uint256 | The number of chains |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The YD value |

