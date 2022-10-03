---
headerDepth: 4
---

# Bytes32LinkedListLibrary

**Circular FIFO LinkedList library for bytes32 values.**

Provides functionality for implementing data indexing using a circlular linked list of bytes32 values.

**Dev notes:** \
The original library was forked by Modular.network from
[github.com/o0ragman0o/LibCLL](https://github.com/o0ragman0o/LibCLL)
into the Modular-Network ethereum-libraries repo at
[github.com/Modular-Network/ethereum-libraries](https://github.com/Modular-Network/ethereum-libraries).
It has been updated to add additional functionality and be more compatible with solidity 0.4.18
coding patterns.
It has been further updated by Dexalot team to handle a FIFO LinkedList of bytes32 values and be more
compatible with solidity 0.8.x. Documenention has also been modified to align with project&#x27;s style guide.

## Struct Types

### LinkedList



```solidity
struct LinkedList {
  mapping(bytes32 => mapping(bool => bytes32)) list;
}
```

## Enum Types


## Variables




### Private

| Name | Type |
| --- | --- |
| HEAD | bytes32 |
| NULL | bytes32 |
| NEXT | bool |
| PREV | bool |




## Methods



### Internal

#### listExists


**Dev notes:** \
Returns true if the list exists

```solidity:no-line-numbers
function listExists(struct Bytes32LinkedListLibrary.LinkedList self) internal view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |


#### nodeExists


**Dev notes:** \
Returns true if the node exists

```solidity:no-line-numbers
function nodeExists(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node) internal view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | a node to search for |


#### sizeOf


**Dev notes:** \
Returns the number of elements in the list

```solidity:no-line-numbers
function sizeOf(struct Bytes32LinkedListLibrary.LinkedList self) internal view returns (uint256 numElements)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |


#### getNode


**Dev notes:** \
Returns the links of a node as a tuple

```solidity:no-line-numbers
function getNode(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node) internal view returns (bool, bytes32, bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | id of the node to get |


#### getAdjacent


**Dev notes:** \
Returns the link of a node `_node` in direction `_direction`.

```solidity:no-line-numbers
function getAdjacent(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node, bool _direction) internal view returns (bool, bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | id of the node to step from |
| _direction | bool | direction to step in |


#### createLink


**Dev notes:** \
Creates a bidirectional link between two nodes on direction `_direction`

```solidity:no-line-numbers
function createLink(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node, bytes32 _link, bool _direction) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | first node for linking |
| _link | bytes32 | node to link to in the _direction |
| _direction | bool |  |


#### insert


**Dev notes:** \
Inserts node `_new` beside existing node `_node` in direction `_direction`.

```solidity:no-line-numbers
function insert(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node, bytes32 _new, bool _direction) internal returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | existing node |
| _new | bytes32 | new node to insert |
| _direction | bool | direction to insert node in |


#### remove


**Dev notes:** \
Removes an entry from the linked list

```solidity:no-line-numbers
function remove(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node) internal returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | node to remove from the list |


#### push


**Dev notes:** \
Pushes an enrty to the head of the linked list

```solidity:no-line-numbers
function push(struct Bytes32LinkedListLibrary.LinkedList self, bytes32 _node, bool _direction) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _node | bytes32 | new entry to push to the head |
| _direction | bool | push to the head (NEXT) or tail (PREV) |


#### pop


**Dev notes:** \
Pops the first entry from the linked list

```solidity:no-line-numbers
function pop(struct Bytes32LinkedListLibrary.LinkedList self, bool _direction) internal returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Bytes32LinkedListLibrary.LinkedList | stored linked list from contract |
| _direction | bool | pop from the head (NEXT) or the tail (PREV) |



