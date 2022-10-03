---
headerDepth: 4
---

# DexalotToken

**Dexalot Token (ALOT) contract**









## Methods

### Public

#### constructor



```solidity:no-line-numbers
constructor() public
```


#### pause



```solidity:no-line-numbers
function pause() public
```


#### unpause



```solidity:no-line-numbers
function unpause() public
```




### Internal

#### _beforeTokenTransfer


**Dev notes:** \
Hook that is called before any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

```solidity:no-line-numbers
function _beforeTokenTransfer(address from, address to, uint256 amount) internal
```


#### _afterTokenTransfer



```solidity:no-line-numbers
function _afterTokenTransfer(address from, address to, uint256 amount) internal
```


#### _mint



```solidity:no-line-numbers
function _mint(address to, uint256 amount) internal
```


#### _burn



```solidity:no-line-numbers
function _burn(address account, uint256 amount) internal
```



