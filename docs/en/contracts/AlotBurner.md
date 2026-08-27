---
headerDepth: 4
---

# IERC20Burnable

**Terminal sink for the ALOT buyback**

Burns every ALOT it holds. Deployed on the mainnet rather than the Dexalot L1 because L1 ALOT
is a bridged representation of ALOT locked in PortfolioMain, so burning the L1 entry would orphan the
locked tokens without reducing ERC20 supply.

**Dev notes:** \
No withdrawal function of any kind, no roles, no owner, no initializer and no proxy. The bytecode
is the guarantee that tokens sent here can only be destroyed.

## Methods

### External

#### burn

```solidity:no-line-numbers
function burn(uint256 amount) external
```

#### balanceOf

```solidity:no-line-numbers
function balanceOf(address account) external view returns (uint256)
```

#### totalSupply

```solidity:no-line-numbers
function totalSupply() external view returns (uint256)
```

# AlotBurner

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| alot | contract IERC20Burnable |
| totalBurned | uint256 |

## Events

### Burned

```solidity:no-line-numbers
event Burned(uint256 amount, uint256 newTotalSupply, uint256 cumulativeBurned)
```

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(address _alot) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _alot | address | Address of the ALOT token |

### External

#### burn

Destroys the entire ALOT balance held by this contract

**Dev notes:** \
Permissionless as there is nothing to decide and nothing to steal. Reads its own balance
instead of taking an amount because bridge fees are deducted in transit, so the amount arriving is
never the amount BuybackVault sent.

```solidity:no-line-numbers
function burn() external
```

