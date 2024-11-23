---
editLink: true
---

# Dexalot’s Asset Balance Snapshot

![abs1](/images/abs/abs1.png)

[Dexalot](https://dexalot.com/) is a dual-chain, non-custodial central order book DEX, powered by [Avalanche’s subnet technology](https://www.avax.network/). The next stage in the development of Dexalot’s life cycle continues the release of software architecture, optimized for speed, safety and experience. Dexalot’s subnet launch will include a built-in asset balance snapshot (ABS) feature that creates an immutable snapshot proof of your asset balances.

This unique feature makes quick and easy verification of the asset balances for a user by periodically writing asset information on Dexalot subnet into a data structure called a **Merkle Tree**. Once written, the ABS is independent of the availability of the Dexalot subnet thus enhancing security. Recovery of the state of your assets on Avalanche mainnet C-chain is made possible with ABS should that be necessary for any reason. Experience and enjoy another trail blazing best-in-class innovation from Dexalot !

---
## How to:

- Connect your wallet to <https://app.dexalot-test.com/asset_balance_snapshot>.
- Select a token you possess.
- Obtain secured data about the on-chain balance of your asset.

## ABS provides:

- Transparency of balances of assets interacting with Dexalot
- Ability for anyone to confirm assets independently
- Immutable time series data of asset balances for analysis if necessary

---

Here is a short video showing you how to connect your wallet and obtain the balance of any asset you own.

<https://youtu.be/IEuRCxOJ20k>

![abs2](/images/abs/abs2.png)

## Own your ABS:

If you are interested in manually verifying your own asset balances you can use [Merkletreejs](https://www.npmjs.com/package/merkletreejs) ( a Javascript library). You can use this library to simplify the following [steps](https://app.dexalot.com/balance_proof):

- Get the root of the balance merkle tree from [IPFS](https://ipfs.dexalot.com/ipfs/bafkreifjvfqxxar2upv5ab42ewy327g6hcdswq5imrhpa3wgdtoki47auq).
- Get the balance Merkle tree from [S3](https://merkletree.dexalot.com/ALOT-1732324905.json).
- Verify the root using the tree.
- Verify your leaf hash using Solidity’s keccak256 algorithm from your leaf index, your wallet address, and your asset balance using the tree.
- Verify the proofs for your leaf hash using the root and tree.
- Validate your leaf hash using the immutable combination of root, proofs, and leaf using the tree.

---
**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
