---
headerDepth: 4
---

# IGasStation

**Interface of GasStation**

## Methods

### External

#### gasAmount

```solidity:no-line-numbers
function gasAmount() external view returns (uint256)
```

#### requestGas

```solidity:no-line-numbers
function requestGas(address _to, uint256 _amount) external
```

#### pause

```solidity:no-line-numbers
function pause() external
```

#### unpause

```solidity:no-line-numbers
function unpause() external
```

#### setGasAmount

```solidity:no-line-numbers
function setGasAmount(uint256 _gasAmount) external
```

#### withdrawNative

```solidity:no-line-numbers
function withdrawNative(uint256 _amount) external
```

#### receive

```solidity:no-line-numbers
receive() external payable
```

#### fallback

```solidity:no-line-numbers
fallback() external payable
```

