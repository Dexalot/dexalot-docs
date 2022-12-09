---
headerDepth: 4
---

# DexalotSubnetBalances

**Balance merkle storage contract to reflect subnet balances**

This contract is used to store the merkle root of the balance merkle tree
that is constructed from the balances of the subnets. The merkle root is updated
regularly by a cron job.

**Dev notes:** \
This contract is only used to store the merkle root. The merkle tree is
stored in IPFS.

## Struct Types

### BalanceTree

```solidity
struct BalanceTree {
  uint256 timestamp;
  bytes32 root;
  string ipfs;
}
```

## Variables

### Public

| Name | Type |
| --- | --- |
| WRITER_ROLE | bytes32 |
| balances | mapping(bytes32 &#x3D;&gt; struct DexalotSubnetBalances.BalanceTree) |

## Methods

### Public

#### initialize

Initialize the upgradeable contract.

```solidity:no-line-numbers
function initialize(address _writer) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _writer | address | Address of the eoa that is allowed to update the merkle root. |

#### setBalances

Set the merkle root of the balance merkle tree.

```solidity:no-line-numbers
function setBalances(bytes32 _asset, bytes32 _root, string _ipfsLink, uint256 _timestamp) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | bytes32 | Asset for which the merkle root is set. |
| _root | bytes32 | Merkle root of the balance merkle tree. |
| _ipfsLink | string | IPFS link to the merkle tree. |
| _timestamp | uint256 | Timestamp of the construction. |

#### setBatchBalances

Set the merkle roots of the balance merkle trees.

```solidity:no-line-numbers
function setBatchBalances(bytes32[] _assets, bytes32[] _roots, string[] _ipfsLinks, uint256 _timestamp) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _assets | bytes32[] | Assets for which the merkle roots are set. |
| _roots | bytes32[] | Merkle roots of the balance merkle trees. |
| _ipfsLinks | string[] | IPFS links to the merkle trees. |
| _timestamp | uint256 | Timestamp of the construction. |

