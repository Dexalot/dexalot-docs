# RBTLibrary

> Red-Black Tree binary search library

This contracts implements a Solidity Red-Black Tree binary search library to store and access a sorted
         list of unsigned integer data. The Red-Black algorithm rebalances the binary
         search tree, resulting in O(log n) insert, remove and search time (and ~gas).

_For more details please refer to the Github repo
         [BokkyPooBahsRedBlackTreeLibrary](https://github.com/bokkypoobah/BokkyPooBahsRedBlackTreeLibrary).
    The library was modified with code optimization as per a PR submitted by @nremond.
         The variable names for function arguments are updated to start with an '_'.
         Documenention has been added._

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

### EMPTY

```solidity
uint256 EMPTY
```

### first

```solidity
function first(struct RBTLibrary.Tree self) internal view returns (uint256 _key)
```

Returns the first node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

### last

```solidity
function last(struct RBTLibrary.Tree self) internal view returns (uint256 _key)
```

Returns the last node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

### next

```solidity
function next(struct RBTLibrary.Tree self, uint256 _target) internal view returns (uint256 _cursor)
```

Returns the next node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _target | uint256 | the node for which the next node is returned |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _cursor | uint256 | the next node with respect to target node |

### prev

```solidity
function prev(struct RBTLibrary.Tree self, uint256 _target) internal view returns (uint256 cursor)
```

Returns the previous node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _target | uint256 | the node for which the previous node is returned |

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | the previous node with respect to target node |

### exists

```solidity
function exists(struct RBTLibrary.Tree self, uint256 _key) internal view returns (bool)
```

Checks if node with a key exists

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for a node |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  the previous node with respect to target node |

### isEmpty

```solidity
function isEmpty(uint256 _key) internal pure returns (bool)
```

Checks if key is empty

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | uint256 | key for a node |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  returns true if key is empty |

### getEmpty

```solidity
function getEmpty() internal pure returns (uint256)
```

Returns the definition of empty

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | bool  returns the constant EMPTY |

### getNode

```solidity
function getNode(struct RBTLibrary.Tree self, uint256 _key) internal view returns (uint256 _returnKey, uint256 _parent, uint256 _left, uint256 _right, bool _red)
```

Returns the node struct for a key

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for a node |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _returnKey | uint256 | key for the node being returned |
| _parent | uint256 | parent of the node being returned |
| _left | uint256 | left node for the node being returned |
| _right | uint256 | right node for the node being returned |
| _red | bool | red/black state (true/false) for the node being returned |

### insert

```solidity
function insert(struct RBTLibrary.Tree self, uint256 _key) internal
```

Inserts a new node to the tree with a key

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree |  |
| _key | uint256 | key for the node being inserted |

### remove

```solidity
function remove(struct RBTLibrary.Tree self, uint256 _key) internal
```

Removes a new node from the tree with a key

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key for the node being removed |

### treeMinimum

```solidity
function treeMinimum(struct RBTLibrary.Tree self, uint256 _key) private view returns (uint256)
```

Returns the key for the minimum node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 |  |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _key  key of the node being returned |

### treeMaximum

```solidity
function treeMaximum(struct RBTLibrary.Tree self, uint256 _key) private view returns (uint256)
```

Returns the key for the maximum node in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 |  |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _key  key of the node being returned |

### rotateLeft

```solidity
function rotateLeft(struct RBTLibrary.Tree self, uint256 _key) private
```

Do a left rotation for the key in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being returned |

### rotateRight

```solidity
function rotateRight(struct RBTLibrary.Tree self, uint256 _key) private
```

Do a right rotation for the key in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being returned |

### insertFixup

```solidity
function insertFixup(struct RBTLibrary.Tree self, uint256 _key) private
```

Insert fixup during insertion of a node with the key in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being inserted |

### replaceParent

```solidity
function replaceParent(struct RBTLibrary.Tree self, uint256 a, uint256 b) private
```

Replaces two parent nodes in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree |  |
| a | uint256 | node in the tree |
| b | uint256 | mode in the tree |

### removeFixup

```solidity
function removeFixup(struct RBTLibrary.Tree self, uint256 _key) private
```

Remove fixup during removal of a node with the key in the tree

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct RBTLibrary.Tree | stored tree from contract |
| _key | uint256 | key of the node being removed |
