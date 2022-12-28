---
headerDepth: 4
---

# RBTLibrary

**BokkyPooBah&#x27;s Red-Black Tree Library**

A Solidity Red-Black Tree binary search library to store and access a sorted
list of unsigned integer data. The Red-Black algorithm rebalances the binary
search tree, resulting in O(log n) insert, remove and search time (and ~gas).

**Dev notes:** \
For more details please refer to the Github repo
[BokkyPooBahsRedBlackTreeLibrary](https://github.com/bokkypoobah/BokkyPooBahsRedBlackTreeLibrary).
The library was modified with code optimization as per a PR submitted by user nremond.
The variable names for function arguments are updated to start with an underscore char.
Documentation has been added.

## Struct Types

### Node

```solidity
struct Node {
  uint256 parent;
  uint256 left;
  uint256 right;
  bool red;
}
```
### Tree

```solidity
struct Tree {
  uint256 root;
  mapping(uint256 => struct RBTLibrary.Node) nodes;
}
```

## Variables

### Private

| Name | Type |
| --- | --- |
| EMPTY | uint256 |

## Methods

### Internal

#### first

Returns the first node in the tree

```solidity:no-line-numbers
function first(struct RBTLibrary.Tree self) internal view returns (uint256 _key)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

#### last

Returns the last node in the tree

```solidity:no-line-numbers
function last(struct RBTLibrary.Tree self) internal view returns (uint256 _key)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

#### next

Returns the next node in the tree

```solidity:no-line-numbers
function next(struct RBTLibrary.Tree self, uint256 _target) internal view returns (uint256 _cursor)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _target | uint256 | the node for which the next node is returned |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _cursor | uint256 | the next node with respect to target node |

#### prev

Returns the previous node in the tree

```solidity:no-line-numbers
function prev(struct RBTLibrary.Tree self, uint256 _target) internal view returns (uint256 cursor)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _target | uint256 | the node for which the previous node is returned |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | the previous node with respect to target node |

#### exists

Checks if node with a key exists

```solidity:no-line-numbers
function exists(struct RBTLibrary.Tree self, uint256 _key) internal view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for a node |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  the previous node with respect to target node |

#### isEmpty

Checks if key is empty

```solidity:no-line-numbers
function isEmpty(uint256 _key) internal pure returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  returns true if key is empty |

#### getEmpty

Returns the definition of empty

```solidity:no-line-numbers
function getEmpty() internal pure returns (uint256)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | bool  returns the constant EMPTY |

#### getNode

Returns the node struct for a key

```solidity:no-line-numbers
function getNode(struct RBTLibrary.Tree self, uint256 _key) internal view returns (uint256 _returnKey, uint256 _parent, uint256 _left, uint256 _right, bool _red)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for a node |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _returnKey | uint256 | key for the node being returned |
| _parent | uint256 | parent of the node being returned |
| _left | uint256 | left node for the node being returned |
| _right | uint256 | right node for the node being returned |
| _red | bool | red/black state (true/false) for the node being returned |

#### insert

Inserts a new node to the tree with a key

```solidity:no-line-numbers
function insert(struct RBTLibrary.Tree self, uint256 _key) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree |  |
| _key | uint256 | key for the node being inserted |

#### remove

Removes a new node from the tree with a key

```solidity:no-line-numbers
function remove(struct RBTLibrary.Tree self, uint256 _key) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for the node being removed |

### Private

#### treeMinimum

Returns the key for the minimum node in the tree

```solidity:no-line-numbers
function treeMinimum(struct RBTLibrary.Tree self, uint256 _key) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 |  |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _key  key of the node being returned |

#### treeMaximum

Returns the key for the maximum node in the tree

```solidity:no-line-numbers
function treeMaximum(struct RBTLibrary.Tree self, uint256 _key) private view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 |  |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _key  key of the node being returned |

#### rotateLeft

Do a left rotation for the key in the tree

```solidity:no-line-numbers
function rotateLeft(struct RBTLibrary.Tree self, uint256 _key) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being returned |

#### rotateRight

Do a right rotation for the key in the tree

```solidity:no-line-numbers
function rotateRight(struct RBTLibrary.Tree self, uint256 _key) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being returned |

#### insertFixup

Insert fixup during insertion of a node with the key in the tree

```solidity:no-line-numbers
function insertFixup(struct RBTLibrary.Tree self, uint256 _key) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being inserted |

#### replaceParent

Replaces two parent nodes in the tree

```solidity:no-line-numbers
function replaceParent(struct RBTLibrary.Tree self, uint256 a, uint256 b) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree |  |
| a | uint256 | node in the tree |
| b | uint256 | mode in the tree |

#### removeFixup

Remove fixup during removal of a node with the key in the tree

```solidity:no-line-numbers
function removeFixup(struct RBTLibrary.Tree self, uint256 _key) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being removed |

