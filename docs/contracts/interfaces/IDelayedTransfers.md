---
headerDepth: 4
---

# IDelayedTransfers

**Interface of DelayedTransfers**

## Methods

### External

#### checkThresholds

```solidity:no-line-numbers
function checkThresholds(struct IPortfolio.XFER _xfer, uint32 _dstChainListOrgChainId) external returns (bool)
```

#### updateVolume

```solidity:no-line-numbers
function updateVolume(bytes32 _token, uint256 _amount) external
```

#### executeDelayedTransfer

```solidity:no-line-numbers
function executeDelayedTransfer(bytes32 _id) external returns (struct IPortfolio.XFER xfer, uint32 dstChainListOrgChainId)
```

#### setDelayThresholds

```solidity:no-line-numbers
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external
```

#### setDelayPeriod

```solidity:no-line-numbers
function setDelayPeriod(uint256 _period) external
```

#### setEpochLength

```solidity:no-line-numbers
function setEpochLength(uint256 _length) external
```

#### setEpochVolumeCaps

```solidity:no-line-numbers
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external
```

