---
headerDepth: 4
---

# InstOVWalletL1

## Variables

### Public

| Name | Type |
| --- | --- |
| OPERATOR_ROLE | bytes32 |
| ovManager | address |

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(address _institutionalOwner) public
```

#### initialize

```solidity:no-line-numbers
function initialize(address _admin, address _l1Operator) public
```

### External

#### requestDeposit

```solidity:no-line-numbers
function requestDeposit(uint256 _vaultId, uint16[] _tokens, uint256[] _amounts) external returns (bytes32 requestId)
```

#### requestWithdrawal

```solidity:no-line-numbers
function requestWithdrawal(uint256 _vaultId, uint208 _shares) external returns (bytes32 requestId)
```

#### withdrawToken

```solidity:no-line-numbers
function withdrawToken(address, bytes32, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes1 _options) external
```

#### setOVManager

```solidity:no-line-numbers
function setOVManager(address _ovManager) external
```

#### VERSION

```solidity:no-line-numbers
function VERSION() external pure virtual returns (bytes32)
```

