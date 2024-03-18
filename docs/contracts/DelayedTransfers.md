---
headerDepth: 4
---

# DelayedTransfers

**DelayedTransfers on withdrawals used by PortfolioBridgeSub**

This contracts checks volume and threshold limits for withdrawals if they are enabled

**Dev notes:** \
It implements delayedTransfers as well as volume caps per epoch per token

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| delayPeriod | uint256 |
| delayedTransfers | mapping(bytes32 &#x3D;&gt; struct IPortfolio.XFER) |
| delayThresholds | mapping(bytes32 &#x3D;&gt; uint256) |
| epochLength | uint256 |
| epochVolumes | mapping(bytes32 &#x3D;&gt; uint256) |
| epochVolumeCaps | mapping(bytes32 &#x3D;&gt; uint256) |
| lastOpTimestamps | mapping(bytes32 &#x3D;&gt; uint256) |

## Events

### DelayedTransfer

```solidity:no-line-numbers
event DelayedTransfer(string action, bytes32 id, struct IPortfolio.XFER xfer)
```

### DelayPeriodUpdated

```solidity:no-line-numbers
event DelayPeriodUpdated(uint256 period)
```

### DelayThresholdUpdated

```solidity:no-line-numbers
event DelayThresholdUpdated(bytes32 symbol, uint256 threshold)
```

### EpochLengthUpdated

```solidity:no-line-numbers
event EpochLengthUpdated(uint256 length)
```

### EpochVolumeUpdated

```solidity:no-line-numbers
event EpochVolumeUpdated(bytes32 token, uint256 cap)
```

## Methods

### Public

#### initialize

Initialize the upgradeable contract

```solidity:no-line-numbers
function initialize(address _portfolioBridgeSub) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolioBridgeSub | address | Address of the portfolioSub |

### External

#### checkThresholds

Checks the volume and thresholds to delay or execute immediately

**Dev notes:** \
This function is only called from sendXChainMessage (withdrawals from the subnet)
No checks on Deposits!!
Not bridge specific! Delayed messages will be processed by the defaultBridge
symbolId has already been mapped to symbol for the portfolio to properly process it

```solidity:no-line-numbers
function checkThresholds(struct IPortfolio.XFER _xfer) external returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the transfer can be executed immediately, false if it is delayed |

#### setDelayThresholds

Sets delay thresholds for tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _thresholds | uint256[] | Array of thresholds |

#### setDelayPeriod

Sets delay period for delayed transfers

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDelayPeriod(uint256 _period) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _period | uint256 | Delay period in seconds |

#### executeDelayedTransfer

Executes delayed transfer if the delay period has passed

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function executeDelayedTransfer(bytes32 _id) external returns (struct IPortfolio.XFER xfer)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Transfer ID |

#### setEpochLength

Sets epoch length for volume control

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setEpochLength(uint256 _length) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _length | uint256 | Epoch length in seconds |

#### setEpochVolumeCaps

Sets volume cap for tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _caps | uint256[] | Array of caps |

#### updateVolume

Updates volume for token. Used only for withdrawals from the subnet.

**Dev notes:** \
Does nothing if there is no cap/limit for the token
Volume threshold check for multiple small transfers within a epoch.

```solidity:no-line-numbers
function updateVolume(bytes32 _token, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | bytes32 | Token symbol |
| _amount | uint256 | Amount to add to volume |

### Private

#### addDelayedTransfer

Adds transfer to delayed queue

```solidity:no-line-numbers
function addDelayedTransfer(bytes32 _id, struct IPortfolio.XFER _xfer) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Transfer ID |
| _xfer | struct IPortfolio.XFER | XFER message |

