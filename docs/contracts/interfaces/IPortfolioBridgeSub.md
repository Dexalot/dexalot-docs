---
headerDepth: 4
---

# IPortfolioBridgeSub

**Interface of PortfolioBridgeSub**

## Methods

### External

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external
```

#### removeToken

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) external
```

#### executeDelayedTransfer

```solidity:no-line-numbers
function executeDelayedTransfer(bytes32 _id) external
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

