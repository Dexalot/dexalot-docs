---
editLink: true
---

# Dexalot资产余额快照

![abs1](\images\abs\abs1.png)

[Dexalot](https://dexalot.com/)是一个双链、非托管的中央订单簿DEX，由[Avalanche的子网提供技术](https://www.avax.network/). 支持。Dexalot生命周期发展的下一阶段将继续发布软件架构，对速度、安全和体验进行优化。Dexalot的子网发布将包括一个内置的资产余额快照（ABS）功能，为你的资产余额创建一个不可改变的快照证明。

这个独特的功能通过定期将Dexalot子网的资产信息写入一个称为**Merkle Tree**的数据结构，使用户的资产余额得到快速和方便的验证。一旦写入，ABS就独立于Dexalot子网的可用性，从而提高了安全性。如果因为任何原因需要恢复你在Avalanche主网C链上的资产状态，ABS是可以做到的。体验并享受来自Dexalot的另一项开拓性的最佳创新!

---
## 如何使用:

- 将你的钱包连接到 <https://app.dexalot-test.com/asset_balance_snapshot>.
- 选择一个你拥有的代币。
- 获得你的资产的链上余额的安全数据。

## ABS提供:

- 与Dexalot互动的资产余额的透明度
- 任何人都可以独立确认资产的能力
- 资产余额的不可改变的时间系列数据，以便在必要时进行分析

---

这里有一个短视频，向你展示如何连接你的钱包并获得你拥有的任何资产的余额。

<https://youtu.be/IEuRCxOJ20k>

![abs2](\images\abs\abs2.png)

## 获取你的ABS:

如果你对手动验证自己的资产余额感兴趣，你可以使用 [Merkletreejs](https://www.npmjs.com/package/merkletreejs) (一个Javascript库)。你可以使用这个库来简化以下 [步骤](https://app.dexalot-test.com/balance_proof):

- 从[IPFS](https://ipfs.io/ipfs/bafkreibus7wgzcnukfkc5klog4urln4w5qgxxdfo2nx6okwucggaph5qci)获取余额Merkle tree的root。
- 从[S3](https://dexalot-balance-merkle-test.s3.amazonaws.com/AVAX-1672244063.json)中获取余额Merkle tree。
- 使用该tree验证root。
- 使用 Solidity 的 keccak256 算法从你的leaf index、你的钱包地址和你资产余额中使用tree来验证你的leaf哈希值。
- 使用root和tree来验证你的leaf哈希值的证明。
- 使用tree的root、证明、leaf的不可改变的组合来验证你的leaf哈西。

---
**作者**: Brad McFall

**编辑**: Dan Marcoulis

**图片**: Can Toygar
