---
editLink: true
---
# Dexalot 子网公测
## 如何进行公测

![Dextr](/images/howtotest/dextrcomp.png)

— 欢迎来到 Dexalot 子网 —

我们很高兴向大家展示 Dexalot 子网并进行公开测试。Dexalot 开发团队花了几个月持续编写智能合约代码，将 Dexalot 主网迁移到了 Dexalot 子网。希望您能帮助我们使 Dexalot 子网变得更好，同时也非常感谢社区一路以来对我们的支持，并帮助我们进入 Dexalot 开发的下一个阶段。

子网本质上就像您熟悉的主网一样，您只需连接并使用即可。

**点击此[链接](https://app.dexalot-test.com/trade)，您就可以开始子网公测了。**

您可以通过阅读以下内容了解更多信息，从而帮助和指导您进行测试。

<VidStack src="youtube/vRvaswPuMNg" />

这是一个公开测试版，我们希望社区可以帮助我们对系统进行压力测试。如果您想提供帮助，但不知道从哪里开始，请随时查看下面的任务列表。

Dexalot 开发人员将尽可能多地修正错误和解决可用性问题，您可以随时给予任何反馈，团队会及时解答您的疑虑。请附上相关屏幕截图和足够的信息，包括交易 ID，从而帮助开发团队更好了解您的观察结果，他们将根据需要进行更改。

您可以将您的报告通过电子邮件发送到[support@dexalot.com](mailto:support@dexalot.com)。Discord 中的 Dexalot 社区管理员和主理人(moderators)也可以为您提供帮助，您可以在#Subnet 频道的子网测试线程中留下您的评论。期待与您相遇！

祝测试愉快！！

## 新架构

你可以通过前端访问Dexalot 的新架构，目前升级后的前端可以同时支持主网和子网。新的双链架构允许 Dexalot 将要求更高的操作转移到子网，从而提高速度并降低 gas 成本。

前端应用与之前类似，而底层合约、后端和数据库架构都发生了重大变化。没有单独的桥接接口。所有桥接功能都集成到 Dexalot 的主网智能合约组合 (PortfolioMain) 和子网组合 (PortfolioSub) 中，为您提供顺畅的用户体验。LayerZero 在最开始会是唯一的桥接器，未来可以根据需要添加更多桥接器。

![roadmap](/images/howtotest/roadmp.png)

这种方法允许 Dexalot 扩展到多个网桥（以进一步降低单点故障的风险），并且使 Avalanche 以外的链上资产在 Dexalot 子网上进行交易。

## 必知的新功能和关键概念

* 只有连接到主网时才能存入资产。存款时，用户的资产将被锁定在 PortfolioMain 上，并可以同时将相同的金额存入到 PortfolioSub。
* 用户每个账户中将拥有两个钱包：一个在主网中，一个在子网中，可通过支持的钱包（如 Core、MetaMask 和 WalletConnect 提供商）来访问。未来我们也将添加更多钱包。
* 和以前一样，主网钱包持有主网中的所有资产，资产需要存入主网后进行交易。所有桥接功能都会集成到存款和取款操作中。
* 子网钱包仅支持 $ALOT，用于支付gas费。这就是为什么子网钱包也被称为“Gas Tank”的原因。

![submaintank](/images/howtotest/submaintank.png)

* “Add Gas”将 $ALOT 从PortfolioSub 转移到子网钱包。
* “Remove Gas”将 $ALOT 从子网钱包转移到 PortfolioSub。

![addrmgas](/images/howtotest/addrmgas.png)

* 从主网钱包或子网钱包（“Gas Tank”）转移到 PortfolioSub 中的 $ALOT 可用于交易或提款。
* PortfolioSub 跟踪用户资产的总余额和可用余额，而无需在子网中创建任何 ERC20。这些余额根据使用存款、取款和交易功能情况而更新。
* 由于子网中没有 ERC20 代币，当连接到子网时，在 Core 或 MetaMask 等钱包中只能看到 $ALOT 余额（“Gas Tank”余额）。
* 所有交易都是在连接到子网时完成的。
* 只有连接到子网时才能提取资产。提款会从 PortfolioSub 中减去金额并从 PortfolioMain 中解锁相同金额，随后将提款的资产转移到您的主网钱包中，所有这些都在一次交易中完成。
* 未来将通过为不同的链部署多个 PortfolioMain 合约来接入更多的桥。

## 测试任务列表

在测试过程中请注意以下几点：

1.对于以下每项任务，请跟踪您钱包中的金额，投资组合总数以及可用数额。确保金额加起来符合您的预期。在测试时进行全面检查。

2.将存款或取款提交到链上之前，由于涉及通过桥接的消息传输，需要创建 6–12 个区块。由于 Fuji 上的活跃度相对较高，因此在子网上会进行一定的限速。根据子网活跃度，转账操作可能会延迟。如果资金在 1 小时后仍未交付，请通知开发团队，因为桥可能被阻塞。

* 至少把以下三种资产从主网存入子网（为方便起见，下面包含子网所支持的Fuji资产地址）：
* AVAX（原生）
* ALOT (0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6)

和以下一种：

1. 以太币 (0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C)
2. SER (0xf52602253474ddaF6111133ADc1F7C3d28A30ABd)
3. USDC (0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54)
4. USDT.e (0x2B62a6c0C750250034e328547Aa38830bd768a18)
* 切换到子网并为您的每项资产输入至少 4 个挂单(Maker Order)（2 个卖单和 2 个买单）。
* 对每种资产至少使用一次“Replace Order” (替换订单)以更改订单的某个参数。
* 使用新的“Send in Subnet”(子网内发送)功能将资金发送到您拥有的另一个帐户。
* 在另一个账户中，为您的每项资产输入至少 1 个吃单(Taker Order)。
* 将您的资产都放回主网。

![willtest](/images/howtotest/dextrbarttest.png)

**测试时需要考虑到特殊情况，我们希望你可以尝试多种方式。最好在测试中可以发现问题，及时解决！**

---

**作者**: Brad McFall

**编辑**: Dan Marcoulis

**图片**: Can Toygar

**翻译**: THAM
