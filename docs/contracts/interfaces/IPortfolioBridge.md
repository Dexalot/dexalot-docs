---
headerDepth: 4
---

# IPortfolioBridge

**Interface of PortfolioBridge**






## Events

### XChainXFerMessage



```solidity:no-line-numbers
event XChainXFerMessage(uint8 version, enum IPortfolioBridge.BridgeProvider bridge, enum IPortfolioBridge.Direction msgDirection, uint32 remoteChainId, uint256 messageFee, struct IPortfolio.XFER xfer)
```




## Methods


### External

#### pause



```solidity:no-line-numbers
function pause() external
```


#### unpause



```solidity:no-line-numbers
function unpause() external
```


#### sendXChainMessage



```solidity:no-line-numbers
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) external
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


#### unpackMessage



```solidity:no-line-numbers
function unpackMessage(bytes _data) external pure returns (enum IPortfolioBridge.XChainMsgType _xchainMsgType, bytes msgdata)
```


#### getXFerMessage



```solidity:no-line-numbers
function getXFerMessage(bytes _data) external view returns (struct IPortfolio.XFER xfer)
```


#### enableBridgeProvider



```solidity:no-line-numbers
function enableBridgeProvider(enum IPortfolioBridge.BridgeProvider _bridge, bool _enable) external
```


#### isBridgeProviderEnabled



```solidity:no-line-numbers
function isBridgeProviderEnabled(enum IPortfolioBridge.BridgeProvider _bridge) external view returns (bool)
```


#### getDefaultBridgeProvider



```solidity:no-line-numbers
function getDefaultBridgeProvider() external view returns (enum IPortfolioBridge.BridgeProvider)
```


#### addToken



```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode _mode) external
```


#### removeToken



```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) external
```


#### VERSION



```solidity:no-line-numbers
function VERSION() external returns (bytes32)
```




