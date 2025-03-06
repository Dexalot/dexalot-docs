---
headerDepth: 4
---

# DexalotTokenOFT

## Variables

### Private

| Name | Type |
| --- | --- |
| __symbol | string |

## Methods

### Public

#### constructor

```solidity:no-line-numbers
constructor(string _name, string _symbol, address _lzEndpoint, address _delegate) public
```

#### symbol

**Dev notes:** \
Returns the symbol of the token, usually a shorter version of the
name.

```solidity:no-line-numbers
function symbol() public view returns (string)
```

### External

#### renameSymbol

```solidity:no-line-numbers
function renameSymbol(string _symbol) external
```

