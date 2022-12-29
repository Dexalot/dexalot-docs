---
editLink: true
---

# Dexalot 的Sample Bot说明示例


![samplebot](/images/samplebot/samplebot.png)

Dexalot 已将其做市商部分源代码提取到 SampleBot [存储库](https://github.com/Dexalot/samplebot)中，供 Dexalot 的最新 [合约](https://github.com/Dexalot/contracts/tree/main/contracts)使用。你可以在 [交易、做市](https://medium.com/dexalot/trading-market-making-beb86c6ab159)和[交易词汇表](https://medium.com/dexalot/dexalot-trading-glossary-88f0406fd41c)中找到有关交易、做市以及其他和 Dexalot 相关内容的想法和术语。

[https://github.com/Dexalot/samplebot](https://github.com/Dexalot/samplebot)

SampleBot 扩展了 AbstractBot 并通过其与测试网上的 Dexalot RestAPI (api.dexalot-test.com/api/) 相连接。请注意，虽然此代码与当前部署的主网合约和主网 RestAPI 不兼容，但可以与部署在 Fuji 测试网上的合约交互，为计划于 2023 年 1 月初发布的产品做准备。你可以点击[此处](https://docs.dexalot-test.com/)获得Dexalot 的最新 RestAPI 文档。

你可以自由更改 SampeBot 或是添加一个扩展 AbstractBot 的新 Bot 类型。有关安装说明和更多详细信息，请参阅[README.md 文件](https://github.com/Dexalot/samplebot)以下是 SampleBot 可以执行的一些功能：

* 从 RESTAPI 获取主网/子网环境、交易对、代币的详细信息
* 引用重要合约
* 在崩溃恢复的情况下从 RESTAPI 请求未结订单
* 保留未完成订单的列表和内存中的本地订单簿
* 从链中获取前两个最佳出价/卖出订单簿
* SampleBot 监听来自区块链的 OrderStatusChanged （订单状态改变）事件，防止影响或解除未完成的订单。
* SampleBot 还会在发送订单时捕获 OrderStatusChanged 事件作为 tx 结果的一部分，并更新内存中的订单状态。几秒钟后，链上会向所有听众宣布 OrderStatusChanged 事件。所以同一个事件被处理了两次。一次是订单发送出去，另一次是当它从链上被独立监听器线程再次收到。因此，看到“重复订单事件：……”消息是正常的。
* 每 10 分钟仔细检查一次链上的订单状态，防止错过OrderStatusChanged事件。

---

**作者**: Brad McFall

**编辑**: Dan Marcoulis

**图片**: Can Toygar
