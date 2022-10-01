# PortfolioBridgeSub

**Bridge aggregator and message relayer for subnet**

This contracts checks volume and threshold limits for withdrawals.

**Dev notes:** \
It implements delayedTransfers as well as volume caps per epoch per token


## Variables

| Var | Type |
| --- | --- |

## Events

### DelayedTransferAdded



```solidity
event DelayedTransferAdded(bytes32 id)
```
### DelayedTransferExecuted



```solidity
event DelayedTransferExecuted(bytes32 id, struct IPortfolio.XFER xfer)
```
### DelayPeriodUpdated



```solidity
event DelayPeriodUpdated(uint256 period)
```
### DelayThresholdUpdated



```solidity
event DelayThresholdUpdated(bytes32 symbol, uint256 threshold)
```
### EpochLengthUpdated



```solidity
event EpochLengthUpdated(uint256 length)
```
### EpochVolumeUpdated



```solidity
event EpochVolumeUpdated(bytes32 token, uint256 cap)
```

## Methods

### VERSION



```solidity
function VERSION() public pure returns (bytes32)
```


### sendXChainMessage

Sends XFER message to the destination chain

**Dev notes:** \
This is a wrapper to check volume and threshold while withdrawing

```solidity
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge type to send over |
| _xfer | struct IPortfolio.XFER | XFER message to send |


### checkTreshholds

Checks the volume and thresholds to delay or execute immediately

**Dev notes:** \
This function is called both in processPayload (deposits coming from mainnet)
as well as sendXChainMessage (withdrawals from the subnet)
Not bridge specific! Delayed messages will be processed by the defaultBridge

```solidity
function checkTreshholds(struct IPortfolio.XFER _xfer) internal returns (bool)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the transfer can be executed immediately, false if it is delayed |

### getTokenId

Retruns the symbolId used the subnet given the targetChainId

**Dev notes:** \
it uses the defaultTargetChain instead of instead of portfolio.getChainId() that PortfolioBridge uses.
When sending from Mainnet to Subnet we send out the symbolId of the sourceChain. USDC => USDC1337
Because the subnet needs to know about different ids from different mainnets.
When sending messages Subnet to Mainnet, it resolves it back to the symbolId the target chain expects

```solidity
function getTokenId(bytes32 _symbol) internal view returns (bytes32)
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |


#### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId |

### setDelayThresholds

Sets delay thresholds for tokens

**Dev notes:** \
Only admin can call this function

```solidity
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _thresholds | uint256[] | Array of thresholds |


### setDelayPeriod

Sets delay period for delayed transfers

**Dev notes:** \
Only admin can call this function

```solidity
function setDelayPeriod(uint256 _period) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _period | uint256 | Delay period in seconds |


### executeDelayedTransfer

Executes delayed transfer if the delay period has passed

**Dev notes:** \
Only admin can call this function

```solidity
function executeDelayedTransfer(bytes32 _id) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Transfer ID |


### setEpochLength

Sets epoch length for volume control

**Dev notes:** \
Only admin can call this function

```solidity
function setEpochLength(uint256 _length) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _length | uint256 | Epoch length in seconds |


### setEpochVolumeCaps

Sets volume cap for tokens

**Dev notes:** \
Only admin can call this function

```solidity
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external
```

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _caps | uint256[] | Array of caps |



