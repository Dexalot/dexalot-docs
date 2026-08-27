---
headerDepth: 4
---

# InstOVWalletMain

## Modifiers

#### onlyInstitutionalOwner

```solidity:no-line-numbers
modifier onlyInstitutionalOwner()
```

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(address _institutionalOwner) public
```

#### initialize

```solidity:no-line-numbers
function initialize(address _admin) public
```

### External

#### depositToken

```solidity:no-line-numbers
function depositToken(address, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```

#### depositNative

```solidity:no-line-numbers
function depositNative(address payable, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```

#### VERSION

```solidity:no-line-numbers
function VERSION() external pure virtual returns (bytes32)
```

