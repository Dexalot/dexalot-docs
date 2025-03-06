---
headerDepth: 4
---

# IPortfolioMain

## Methods

### External

#### addToken

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenaddress, uint8 _decimals, uint8 _l1Decimals, uint256 _fee, uint256 _gasSwapRatio) external
```

#### depositTokenFromContract

```solidity:no-line-numbers
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external
```

#### addTrustedContract

```solidity:no-line-numbers
function addTrustedContract(address _contract, string _organization) external
```

#### isTrustedContract

```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```

#### removeTrustedContract

```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```

#### getToken

```solidity:no-line-numbers
function getToken(bytes32 _symbol) external view returns (contract IERC20Upgradeable)
```

