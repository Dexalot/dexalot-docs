---
headerDepth: 4
---

# IPortfolioBridgeSub

**Interface of PortfolioBridgeSub**

## Struct Types

### TokenDestinationInfo

```solidity
struct TokenDestinationInfo {
  bytes32 symbolId;
  uint256 bridgeFee;
}
```

## Methods

### External

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode, bytes32 _subnetSymbol, uint256 _bridgeFee) external
```

#### removeToken

```solidity:no-line-numbers
function removeToken(bytes32 _srcChainSymbol, uint32 _srcChainId, bytes32 _subnetSymbol) external returns (bool deleted)
```

#### getTokenDetails

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

#### executeDelayedTransfer

```solidity:no-line-numbers
function executeDelayedTransfer(uint16 _dstChainId, bytes32 _id) external
```

#### setBridgeFees

```solidity:no-line-numbers
function setBridgeFees(uint32 _dstChainListOrgChainId, bytes32[] _tokens, uint256[] _bridgeFees) external
```

