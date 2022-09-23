# IPortfolioBridge

*&quot;DEXALOT TEAM&quot;*

> &quot;IPortfolioBridge: interface of PortfolioBridge&quot;





## Methods

### VERSION

```solidity
function VERSION() external nonpayable returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### enableBridgeProvider

```solidity
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool enable) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |
| enable | bool | undefined |

### executeDelayedTransfer

```solidity
function executeDelayedTransfer(bytes32 id) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| id | bytes32 | undefined |

### getDefaultBridgeProvider

```solidity
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum IPortfolioBridge.BridgeProvider | undefined |

### isBridgeProviderEnabled

```solidity
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### sendXChainMessage

```solidity
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, IPortfolio.XFER _xfer) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bridge | enum IPortfolioBridge.BridgeProvider | undefined |
| _xfer | IPortfolio.XFER | undefined |

### setDelayPeriod

```solidity
function setDelayPeriod(uint256 _period) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _period | uint256 | undefined |

### setDelayThresholds

```solidity
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokens | bytes32[] | undefined |
| _thresholds | uint256[] | undefined |

### setEpochLength

```solidity
function setEpochLength(uint256 _length) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _length | uint256 | undefined |

### setEpochVolumeCaps

```solidity
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokens | bytes32[] | undefined |
| _caps | uint256[] | undefined |

### unpackMessage

```solidity
function unpackMessage(bytes data) external pure returns (enum IPortfolioBridge.XChainMsgType _xchainMsgType, bytes msgdata)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| data | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _xchainMsgType | enum IPortfolioBridge.XChainMsgType | undefined |
| msgdata | bytes | undefined |

### unpackXFerMessage

```solidity
function unpackXFerMessage(bytes data) external pure returns (struct IPortfolio.XFER _xfer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| data | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _xfer | IPortfolio.XFER | undefined |



## Events

### XChainXFerMessage

```solidity
event XChainXFerMessage(uint8 version, enum IPortfolioBridge.BridgeProvider indexed bridge, enum IPortfolioBridge.Direction indexed msgDirection, uint32 indexed remoteChainId, uint256 messageFee, IPortfolio.XFER xfer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |
| bridge `indexed` | enum IPortfolioBridge.BridgeProvider | undefined |
| msgDirection `indexed` | enum IPortfolioBridge.Direction | undefined |
| remoteChainId `indexed` | uint32 | undefined |
| messageFee  | uint256 | undefined |
| xfer  | IPortfolio.XFER | undefined |



