---
headerDepth: 4
---

# ILayerZeroEndpoint

## Methods

### External

#### send

```solidity:no-line-numbers
function send(uint16 _dstChainId, bytes _destination, bytes _payload, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

#### receivePayload

```solidity:no-line-numbers
function receivePayload(uint16 _srcChainId, bytes _srcAddress, address _dstAddress, uint64 _nonce, uint256 _gasLimit, bytes _payload) external
```

#### getInboundNonce

```solidity:no-line-numbers
function getInboundNonce(uint16 _srcChainId, bytes _srcAddress) external view returns (uint64)
```

#### getOutboundNonce

```solidity:no-line-numbers
function getOutboundNonce(uint16 _dstChainId, address _srcAddress) external view returns (uint64)
```

#### estimateFees

```solidity:no-line-numbers
function estimateFees(uint16 _dstChainId, address _userApplication, bytes _payload, bool _payInZRO, bytes _adapterParam) external view returns (uint256 nativeFee, uint256 zroFee)
```

#### getChainId

```solidity:no-line-numbers
function getChainId() external view returns (uint16)
```

#### retryPayload

```solidity:no-line-numbers
function retryPayload(uint16 _srcChainId, bytes _srcAddress, bytes _payload) external
```

#### hasStoredPayload

```solidity:no-line-numbers
function hasStoredPayload(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```

#### getSendLibraryAddress

```solidity:no-line-numbers
function getSendLibraryAddress(address _userApplication) external view returns (address)
```

#### getReceiveLibraryAddress

```solidity:no-line-numbers
function getReceiveLibraryAddress(address _userApplication) external view returns (address)
```

#### isSendingPayload

```solidity:no-line-numbers
function isSendingPayload() external view returns (bool)
```

#### isReceivingPayload

```solidity:no-line-numbers
function isReceivingPayload() external view returns (bool)
```

#### getConfig

```solidity:no-line-numbers
function getConfig(uint16 _version, uint16 _chainId, address _userApplication, uint256 _configType) external view returns (bytes)
```

#### getSendVersion

```solidity:no-line-numbers
function getSendVersion(address _userApplication) external view returns (uint16)
```

#### getReceiveVersion

```solidity:no-line-numbers
function getReceiveVersion(address _userApplication) external view returns (uint16)
```

#### storedPayload

```solidity:no-line-numbers
function storedPayload(uint16 _srcChainId, bytes _srcAddress) external view returns (uint64, address, bytes32)
```

