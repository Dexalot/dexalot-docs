# DEXALOT Liquid Staking

## Introduction

Dexalot is a decentralized exchange (DEX) built on the Dexalot L1 network, offering a central limit order book (CLOB) trading experience with the transparency and security of a blockchain. To further strengthen the network and reward its community, Dexalot has introduced a **Liquid Staking** program in partnership with [Suzaku](https://suzaku.network/).

This guide covers everything you need to know about staking your **\$ALOT** tokens, from the basics of how staking works, to step-by-step instructions for staking and unstaking, epoch schedules, rewards, fees, and the Suzaku Points program.

## What is Staking?

Staking is the process of locking up tokens to secure a blockchain network or protocol and, in return, receive rewards. It is a core component of **Proof-of-Stake (PoS)** consensus mechanisms, which are used by many major blockchain networks, including Dexalot.

When you stake your **\$ALOT** tokens, you are actively contributing to the security and stability of the Dexalot blockchain. In exchange, you earn staking rewards distributed from network activity and fees.

### Liquid Staking

Dexalot has partnered with **Suzaku** to build a Liquid Staking capability. Unlike traditional staking, where your tokens are locked and illiquid, Liquid Staking gives you a **transferable receipt token** (**\$wsALOT**) in exchange for your staked **\$ALOT**. This receipt token represents your staked position and accrues rewards over time, while remaining usable within the broader DeFi ecosystem.

::: info Liquid Staking with Dexalot offers:

- **Earn rewards**: Receive **\$ALOT** rewards from network fees and incentives.
- **Stay liquid**: Your staked position is represented by $wsALOT, a transferable token.
- **Low minimum**: Minimum staking amount is 1 **\$ALOT**.
- **No lockup penalty**: Unstake at any time, subject to the epoch cooldown period.

:::

## How to Stake **\$ALOT**

Staking **\$ALOT** is a straightforward process completed directly in the Dexalot interface.

### Step-by-Step: Staking

• **Step 1 — Connect your wallet:** Ensure your Dexalot-compatible wallet (e.g., Core, MetaMask, Rabby) is connected to the Dexalot platform.

• **Step 2 — Navigate to the Staking section:** Find the “STAKE” page on the Dexalot interface.

![](/images/lst/image1.webp)

• **Step 3 — Enter the amount:** Type the number of **\$ALOT** tokens you wish to stake into the input field.

![](/images/lst/image2.webp)

• **Step 4 — Click “STAKE”:** Confirm the transaction in your wallet.

• **Step 5 — Receive $wsALOT:** Once the transaction is confirmed, you will receive an equivalent amount of $wsALOT ("staked ALOT") to your wallet. This token represents your staked position.

::: info What is **\$wsALOT**?

***\$wsALOT ("wrapped staked ALOT")** is the auto-compounding liquid receipt token you receive when staking **\$ALOT**. It represents your proportional share of the staking pool. As rewards accumulate in the pool, each $wsALOT becomes redeemable for a greater amount of **\$ALOT** over time.

:::

## How to Unstake

Unstaking converts your **\$wsALOT** back into **\$ALOT**. Due to the staking epoch system, there is a mandatory waiting period before your tokens can be fully withdrawn.

### Step-by-Step: Unstaking

• **Step 1 — Navigate to the Staking section:** Locate the Unstake panel in the Dexalot interface.

• **Step 2 — Enter the amount:** Type the number of $wsALOT tokens you wish to unstake.

![](/images/lst/image3.webp)

• **Step 3 — Submit the Unstake request:** Confirm the transaction in your wallet. Your unstake request is now queued.

• **Step 4 — Wait for the epoch cooldown:** A full staking epoch (7 days) must pass after your request before your **\$ALOT** becomes withdrawable. See Section 4 for details on epoch timing.

• **Step 5 — Withdraw your $ALOT:** Once the epoch has passed, return to the Staking section, monitor your unstake status, and complete the withdrawal.

### Unstake Waiting Period

Because staking epochs run on a fixed 7-day schedule that starts and ends on Wednesdays at 13:00:00 GMT, the time you wait depends on **when during the current epoch** you submit your unstake request:

| Scenario | Estimated Wait Time |
| :---- | :---- |
| **Unstake submitted at the start of an epoch** | \~14 days (must wait for current epoch to end, then the full next epoch) |
| **Unstake submitted near the end of an epoch (e.g., Tuesday)** | \~8 days (short wait for current epoch to end, then the full next epoch) |
| **Earliest possible withdrawal** | 7 days (if submitted right at the end of the current epoch) |

**Example:** If you initiate an UNSTAKE on a Tuesday, you will be able to withdraw the unstaked **\$ALOT** on or after Wednesday at 13:00:00 GMT — approximately 8 days later.

You can monitor the status of your unstake requests in the Staking section of the Dexalot interface.

## Staking Epochs

### What is a Staking Epoch?

A staking epoch is the fundamental time unit of the staking system. Each epoch is exactly **7 calendar days** long, beginning and ending every **Wednesday at 13:00:00 GMT**.

The most current epoch information can be found under “MORE INFORMATION” on the page:

![](/images/lst/image4.webp)

The epoch schedule governs three key events:

- **Unstaking and withdrawal:** A full epoch must pass after an unstake request before **\$ALOT** can be withdrawn.
- **Reward calculation:** Rewards are calculated at the close of each epoch based on the total staked pool and fees collected.
- **Reward distribution and claiming:** Rewards become claimable at the start of each new epoch.

::: info Key Epoch Parameters

- **Epoch Duration**: 7 calendar days Epoch
- **Start/End**: Every Wednesday at 13:00:00 GMT
- **Unstake Cooldown**: 1 full epoch (7–14 days depending on timing)
- **Rewards Claimable**: At the start of each new epoch

:::

## Staking Rewards

Staking **\$ALOT** earns you rewards from two primary sources:

• **Network Rewards:** $ALOT distributed from Dexalot's network block rewards, allocated proportionally to all stakers based on their share of the staking pool.

• **Fee Revenue \[In Development\]:** A portion of trading fees accumulated on Dexalot may be distributed to stakers as additional $ALOT rewards.

• **Additional Incentives \[In Development\]:** From time to time, bonus incentives may be introduced to reward stakers. These will be announced via Dexalot's official channels.

All rewards are denominated in **\$ALOT** and are claimable at the beginning of each new staking epoch. Rewards automatically accrue in the staking pool, meaning the value of each **\$wsALOT** token appreciates over time relative to **\$ALOT**.

::: info Reward Rates

Reward rates are variable and depend on total network activity, the total amount of $ALOT staked in the protocol, and any additional incentives in place. Always refer to the Dexalot interface for the current estimated Annual Percentage Rate (APR).

:::

## Fees

Staking **\$ALOT** on Dexalot is designed to be low-cost and accessible.

• **Staking Fee:** 5% protocol fee.

• **Gas Fee:** A small AVAX gas fee is required to process transactions on the Avalanche network. This is a standard network cost unrelated to Dexalot and is typically negligible.

There are no hidden fees, lockup penalties, or performance fees associated with the Dexalot Liquid Staking program.

## Suzaku Points

### What are Suzaku Points?

Suzaku Points are a **measure of engagement** with the Suzaku protocol during its launch phase. They reflect your participation in and contribution to the growth of the Suzaku ecosystem.

Points are awarded to users who actively engage with the protocol, including by staking **\$ALOT** through Dexalot's Liquid Staking interface, which is powered by Suzaku.

### Why do Suzaku Points matter?

• **Recognize early adopters:** Points highlight and reward users who participate during the critical launch phase of the Suzaku protocol.

• **Reflect ecosystem contribution:** They serve as a record of your engagement and support for the network's growth.

• **May influence future distributions:** While Suzaku Points have no guaranteed monetary value, they may influence future token distributions or other ecosystem rewards, at the discretion of the Suzaku team.

::: info More on Suzaku Points

For full details on how Suzaku Points are earned, tracked, and potentially used, visit the official Suzaku documentation:

[https://docs.suzaku.network/suzaku-protocol/for-stakers/suzaku-points](https://docs.suzaku.network/suzaku-protocol/for-stakers/suzaku-points)

:::

## Glossary

| Term | Definition |
| :---- | :---- |
| **\$ALOT** | The native token of the Dexalot blockchain network. |
| **\$wsALOT** | "Wrapped Staked ALOT" — the liquid receipt token received upon staking $ALOT. Represents your staked position and accrues value over time. |
| **Staking** | The process of locking up tokens to support network security and earn rewards. |
| **Liquid Staking** | A form of staking where the staked position is represented by a transferable token ($wsALOT), allowing it to remain usable in DeFi. |
| **Staking Epoch** | A 7-day period that governs unstaking cooldowns and reward distribution. Begins and ends every Wednesday at 13:00:00 GMT. |
| **Unstake Cooldown** | The waiting period (one full epoch, 7–14 days) that must pass before unstaked $ALOT can be withdrawn. |
| **Proof-of-Stake (PoS)** | A consensus mechanism where validators are selected based on the amount of tokens they have staked, used by Dexalot and Avalanche. |
| **Suzaku** | Dexalot's Liquid Staking infrastructure partner, providing the underlying staking protocol and Suzaku Points program. |
| **Suzaku Points** | An engagement metric from the Suzaku protocol that reflects participation during the launch phase and may influence future distributions. |
| **APR** | Annual Percentage Rate — the estimated yearly rate of return from staking rewards. |
| **AVAX Gas Fee** | A small fee paid in AVAX to process transactions on the Avalanche network. |

## Frequently Asked Questions

### Can I stake any amount of $ALOT?

You can stake $ALOT as long as there is enough capacity.  The initial maximum amount of $ALOT is set to 5 million and will increase as demand warrants.

You can see the current capacity status under “More Information”:

![](/images/lst/image5.webp)

### Do I lose my staking rewards if I unstake early?

No. Rewards that have already been earned and distributed at epoch boundaries are credited to your **\$wsALOT** position. When you redeem **\$wsALOT** for **\$ALOT**, you receive the full accrued value.

### Can I add more $ALOT to my existing staking position?

Yes. You can stake additional **\$ALOT** at any time. Each stake transaction increases your **\$wsALOT** balance accordingly.

### What happens to my **\$wsALOT** during the unstaking period?

When you submit an unstake request, your **\$wsALOT** is locked and queued for redemption. You cannot transfer or use it during this cooldown period. Once the epoch passes and you complete the withdrawal, you receive your **\$ALOT** back.

### Where can I monitor my unstake requests?

You can monitor the status of all your unstake requests directly in the Staking section of the Dexalot interface.

 ![](/images/lst/image6.webp)

### Is staking on Dexalot safe?

Dexalot's Liquid Staking is built on audited smart contracts in partnership with Suzaku. As with all DeFi protocols, users should be aware of inherent smart contract risks. Always DYOR (Do Your Own Research) and only stake amounts you are comfortable with.

### How do I earn Suzaku Points?

Suzaku Points are earned automatically by engaging with the Suzaku protocol during its launch phase — which includes staking **\$ALOT** through Dexalot's Liquid Staking interface. Visit [docs.suzaku.network](https://docs.suzaku.network/suzaku-protocol/for-stakers/suzaku-points) for full details.
