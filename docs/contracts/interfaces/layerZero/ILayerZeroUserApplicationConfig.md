---
headerDepth: 4
---

# ILayerZeroUserApplicationConfig

## Struct Types

### Destination

```solidity
struct Destination {
  uint16 lzRemoteChainId;
  uint32 chainListOrgChainId;
  bool userPaysFee;
  uint256 gasForDestination;
}
```

## Methods

### External

#### setConfig

```solidity:no-line-numbers
function setConfig(uint16 _version, uint16 _chainId, uint256 _configType, bytes _config) external
```

#### setSendVersion

```solidity:no-line-numbers
function setSendVersion(uint16 _version) external
```

#### setReceiveVersion

```solidity:no-line-numbers
function setReceiveVersion(uint16 _version) external
```

#### forceResumeReceive

```solidity:no-line-numbers
function forceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external
```

