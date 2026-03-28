# DEXALOT OMNIVAULTS

[*app.dexalot.com/vaults*](http://app.dexalot.com/vaults)

April 2026

# **Introduction**

---

Dexalot OmniVaults is a next-generation liquidity vault solution that combines the simplicity of automated market maker (AMM) pools with the precision and capital efficiency of order books (CLOBs) \- powered by Dexalot’s omni-chain architecture.

It enables:

* Projects to easily deploy liquidity across multiple chains from a single source with minimal capital and zero operational overhead

* Users to earn yield through automated, actively managed liquidity strategies

By unifying liquidity into a single on-chain order book while maintaining multi-chain accessibility, OmniVaults delivers deeper markets, better pricing, and a dramatically improved liquidity experience.

# **Issues With AMMs**

---

The most prevalent type of DEXs in the industry are automated market makers (AMMs).  AMMs have played a critical role in DeFi’s growth.  However, their design introduces fundamental inefficiencies that limit scalability, capital efficiency, and trading performance.

A. **Capital Inefficiency**

* Liquidity is distributed across the entire price curve, leaving most capital unused
* Liquidity providers (LPs) must deposit both sides of a pair (e.g., ETH \+ USDC)
* Even with concentrated liquidity (v3-style), it still requires active management by the user
* Lower capital efficiency vs CLOBs, where orders sit exactly at desired price levels and requires \~80% less overall liquidity [Dexalot internal analysis, 2026]

B. **Poor Price Execution for Large Trades**

* AMMs suffer from slippage due to the bonding curve (e.g., x\*y=k)
* Larger trades move the price significantly
* Traders get worse execution vs order books
* Especially problematic for institutions or whales

C. **MEV (Maximal Extractable Value) Exposure** \- AMMs are highly vulnerable to MEV attacks:

* Front-running
* Sandwich attacks
* Back-running
* Users often get worse execution without realizing it.  MEV bots extract billions in value over time.

D. **Pricing Isn’t Always “Market-Based”** \- AMMs derive price from a formula—not directly from supply/demand order flow.

* Usually lags true market price
* Requires arbitrageurs to keep pools aligned with external markets
* LPs effectively subsidize arbitrageurs

E. **Fragmented Liquidity** \- Liquidity is split across:

* Different AMMs
* Different chains
* Different pools (even for same pair)
* Leads to far more capital requirements and differing pricing from protocol to protocol and chain to chain

F. **Not Ideal for Advanced Trading** \- AMMs lack key trading features:

* No limit orders (native)
* No advanced order types (PO, FOK, IOC, etc.)
* No proper depth chart / order book visibility
* Makes them suboptimal for serious traders and market makers

# **OmniVaults**

---

Dexalot OmniVaults offer a next-generation liquidity vault solution. This innovative product leverages Dexalot’s omni-chain architecture to merge the simplicity of AMM pools with the superior precision and capital efficiency characteristic of centralized limit order books (CLOBs).

Each OmniVault is associated with a specific trading pair.  For example, an ETH/USDC OmniVault will only take deposits for ETH and USDC and make markets in the ETH/USDC order book, while an ALOT/USDC OmniVault will only take deposits for ALOT and USDC and make markets in the ALOT/USDC order book..

OmniVault uses a hub-and-spoke model, where the majority of liquidity resides in the order book on the Dexalot L1 (the “hub”), while smaller allocations are distributed across the target chains (e.g. Avalanche, Arbitrum, Base. BNB Chain, etc.) (the “spokes”) to support Dexalot’s SimpleSwap (Dexalot RFQ)..

![](/images/omnivaults/image5.png)

These spokes are also linked to DEX aggregators, enabling users to execute atomic swaps on their native chains while accessing pricing from the Dexalot L1 order book.  By centralizing liquidity on the Dexalot L1, OmniVaults create a deeper, more efficient order book, delivering better pricing with significantly less capital than traditional AMM pools, where liquidity is fragmented across protocols and chains.

While CLOBs offer clear advantages over AMMs, they introduce operational complexity.  Effective market making requires continuously updating limit orders to reflect changing market conditions. Additionally, supporting liquidity across multiple chains typically involves active bridging and maintaining gas balances on each chain.

OmniVaults abstract away these challenges.  Projects can create and provide liquidity of their tokens into a new OmniVault.  The OmniVault will handle the rest systematically:  cross-chain rebalancing, gas management, and algorithmic order placement on the order book. This enables projects to benefit from professional-grade market making, without the operational burden or cost of managing it themselves.

At the same time, users can also provide liquidity into OmniVaults of their choosing and earn fees, trading P\&L and rewards, just like they do with AMM pools.

## **Benefits**

### **For Projects & Token Issuers \-**

* *Capital Efficiency:*  CLOBs are significantly more capital-efficient than Automated Market Makers (AMMs), requiring \~80% less liquidity1 to achieve comparable price spreads.
* *Hands-Free Liquidity Management:*  OmniVaults abstracts all operational friction by automating order placement, cross-chain rebalancing, and gas management achieving *immediate global reach* and atomic execution *without needing a market-maker.*
* *Omni-Chain Token Listing:*  Any token from any chain can be listed as the protocol supports universal token listing on Dexalot L1 without requiring cross chain token standards like OFT.  Instead, when depositing to Dexalot, assets are secured on their native chain(s), while a LayerZero message credits the user's trading balance on Dexalot L1.
* *Unified Liquidity Management with One-Click:*  Projects can deploy liquidity across multiple chains (Avalanche, Arbitrum, Base, and BSC with more to come) simultaneously from a single liquidity source without managing multiple liquidity sources individually.
* *Synchronized Cross-Chain Pricing:*  By maintaining the bulk of liquidity on the Dexalot L1, the hub-and-spoke model eliminates price discrepancies across networks. This architecture ensures that the same price is achieved across all chains at the same time, providing better rates and higher capital efficiency than fragmented AMMs.
* *Zero Technical Overhead:*  The protocol automates the complex parts of market making, including:
  * Algorithmically place and continuously adjust limit orders based on signals from AMMs and centralized exchange (CEX) price feeds.
  * Automated rebalancing of tokens between chains via Dexalot L1.
  * Automated bridging of OFT tokens between chains when needed.
  * Managing gas balances across multiple networks for transaction submission.
* *Aggregator Integrations:*  OmniVaults are linked to major DEX aggregators like 1inch, Kyberswap, Odos, Velora (Paraswap) and OpenOcean , allowing for instant, atomic swaps on target chains using real-time L1 prices.

### **For Individual Users (Yield Seekers) \-**

* *Passive Yield Generation:*  Users earn returns from a combination of trading fees, trading profit and loss, and rewards, all of which are automatically reinvested into the vault.
* *Simplified Experience:*  Users simply deposit assets into an OmniVault of their choosing on the Dexalot L1 (integrated from all the top chains), and OmniVault handles the rest \- the "heavy lifting" of rebalancing funds across various chains.
* *Flexible Deposits:*  Users can provide liquidity using the base token, the quote token (e.g., USDC/USDT), or a combination of both.

### **Security Benefits**

* *Risk Isolation:*  Every OmniVault uses its own dedicated proxy contracts (OmniVaultExecutor and OmniVaultShare), ensuring that a vulnerability in one OmniVault does not compromise others.
* *Closed-Loop Architecture:*  Funds only interact with trusted, audited contracts within the Dexalot ecosystem, such as the TradePairs and Portfolio contracts.
* *Smart contract audits:*  The protocol’s security is verified through a dual-layered audit process: a comprehensive manual review from Hacken and an automated, AI-driven analysis by Octane (CIDC).


# **How To**

---

1. ## **Create A New OmniVault**

**Step 1:**  Deposit tokens into Dexalot

![](/images/omnivaults/image2.png)

**Step 2:**  On the OmniVault main page, click “CREATE VAULT”.

![](/images/omnivaults/image6.png)

**Step 3:**  Enter the “Base Token” (e.g., project token) information. Select the chain it is native on and enter its contract address.

![](/images/omnivaults/image12.png)

**Step 4:**  The token name, symbol and logo should auto-populate.  Please chek for accuracy.

Optional \- If your token is an OFT (LayerZero Omnichain Fungible Token) and available on multiple chains, enter those too if you wish to provide liquidity on multiple chains.

![](/images/omnivaults/image9.png)

**Step 5:**  Next, select the counter token (“Quote Token”) you wish to list your token against:  USDC or USDT.

![](/images/omnivaults/image10.png)

**Step 6:**  Enter the liquidity you wish to provide initially for both tokens.

We highly recommend adding the same USD amount of the Base Token and the Quote Token for new OmniVaults to start with a balanced order book (i.e., bids vs offers).

*New OmniVaults must start with AT LEAST $20,000 of the “Quote Token” (e.g., USDC or USDT) for a single chain provision.  Any additional chains will require at least $10,000 more of the Quote Token.  For example, if your OFT token is native on both Base and BNB Chain, you will need to add at least $30,000 total of the Quote Token.  Additional liquidity can be provided in the future naturally, but these are the minimum amounts that need to be provided to launch a new OmniVault.*

![](/images/omnivaults/image7.png)

**Step 7:**  Continue to follow the screen to provide additional information.

![](/images/omnivaults/image4.png)

**Step 8:**  **SUBMIT** and approve deposit on your wallet.

New OmniVaults will be reviewed by the Dexalot team for accuracy and approval **within 2 business days.**  Each new Omnivault has a **small administrative fee of $100**.

![](/images/omnivaults/image13.png)

**Note:**

* A Dexalot representative will contact the submitter if any questions arise.
* If a submission is rejected for any reason, Dexalot will return all funds back to the submitting wallet.

2. ## **Provide Liquidity To An OmniVault**

**Step 1**:  **DEPOSIT** tokens into Dexalot.

![](/images/omnivaults/image2.png)

**Step 2**:  Select a specific OmniVault to provide liquidity to from the main OmniVault page by clicking **ADD**.

![](/images/omnivaults/image3.png)

...which will bring you to the details page of the specific OmniVault.

![](/images/omnivaults/image14.png)

**Step 3**:  Enter the number of tokens you wish to deposit into the OmniVault and click **ADD LIQUIDITY**.

![](/images/omnivaults/image8.png)

**Step 4**:  Monitor your deposits on the **MY VAULTS** tab.

![](/images/omnivaults/image11.png)

**Step 5**:  To withdraw your assets and rewards enter a USD amount or use the % slider to determine the approximate number of tokens you will be removing and click **REMOVE LIQUIDITY**.   The maximum liquidity that can be removed is shown in the “Total Liquidity" line.

**Note:  Rewards can only be claimed at the same time that liquidity is removed.  You can not remove rewards independently.**

![](/images/omnivaults/image1.png)

# **Technical Details**

---

## **OmniVault Creation**

Any project can create an OmniVault providing their token adheres to a standard ERC20 implementation. Please note that fee-on-transfer tokens are not supported. In addition, if deploying across multiple target chains your token must be an OFT to enable automated bridging across chains. The vault creation process follows these steps:

1. Submit Token Addresses \- Provide ERC20 contract addresses of project token on all desired target chains. Currently supported chains include Avalanche, Arbitrum, Base and Binance Smart Chain
2. Select Counter Token \- Choose your quote asset for the orderbook pair. Currently supported counter tokens are USDC and USDT.
3. Define Initial Liquidity \- Specify the project token and counter token amounts to deposit. To meet the baseline liquidity requirements:
   1. A single-chain deployment requires a minimum of $20,000 in the chosen counter token.
   2. Every additional target chain requires an extra $10,000 in the counter token.
4. On-Chain Registration \- Submit the Vault Creation request on-chain to the OmniVaultCreator. This requires a 100 USDC creation fee as an anti-spam measure and is fully refundable if your vault proposal is rejected.

Deployment Timeline: Because the OmniVault creation process involves deploying dedicated proxy contracts and provisioning off-chain infrastructure, please allow 24 to 48 hours from the initial on-chain invocation for the vault to go completely live.

## **User Lifecycle**

Once an OmniVault is created users are able to deposit the project or counter token to gain yield from the vault. Although the OmniVault is deployed across multiple chains all user interactions occur on Dexalot L1 so they can be processed in bulk. To avoid spam deposits are capped with a small minimum deposit amount.

The user lifecycle follows these steps:

1. Deposit Tokens \- Deposit the base token, quote token, or a combination of the two into the vault.
2. Pending State \- Funds remain in a pending state for a brief period of time. This varies but is typically 3 hours so multiple requests can be processed in a single batch.
3. Receive Vault Shares \- Once settlement for the vault occurs, the user is minted OmniVaultShares, which represents the proportion of the vault the user is entitled to. Only once the user receives these shares do they start earning yield.
4. Earning Yield \- As time progresses, yield accumulates via PnL, rewards, and trading fees, which all remain in the vault until withdrawal.
5. Withdrawing Shares \- To withdraw, a user provides their OmniVaultShares. These are burned, and the user receives their proportion of the vault in terms of the underlying tokens after the next settlement occurs. Please note: The ratio of base to quote asset the user receives mirrors the current composition of the overall vault.

## **DEX Aggregators**

A key benefit of using OmniVaults is the ability to instantly route volume from DEX aggregators across multiple chains simultaneously. We are currently integrated with major aggregators, including Velora, 1inch, Odos, Kyber, and OpenOcean.

On each target chain (spoke), there is a localized DexalotRFQ smart contract which holds a small inventory of the base and quote tokens. This architecture allows the spoke to provide atomic swaps directly to both end-users and aggregators.

This flow is powered by an RFQ (Request for Quote) process that generates exact prices based on the real-time orderbook state on Dexalot L1. Once these swaps are executed, the OmniVault handles the updating of orders and rebalancing funds between the target chain spokes and the L1 hub to replenish inventory.

## **Security**

OmniVaults are designed with a closed-loop architecture to ensure underlying funds remain safe, as they can only interact with trusted, audited contracts within the Dexalot ecosystem. In addition, fresh vault contracts are deployed for every single vault to isolate risk. A global OmniVaultManager contract is utilized across the system to ensure a unified settlement process.

## **Normal Trading Operations**

To facilitate automated market making and aggregator routing, the system interacts exclusively with the following contracts:

* OmniVaultExecutor \- Unique per vault. All deposited funds go into this isolated contract, it acts as a treasury to hold vault funds that are not in active trading.
* DexalotRFQ \- Unique per vault. Provides atomic swaps on the target chain spokes.
* TradePairs \- Executes and manages limit orders on Dexalot L1.
* Portfolio \- Handles rebalancing of funds between other chains and Dexalot L1

## **Vault Settlement Operations**

When processing pending deposits and withdrawals it interacts with the following contracts:

* OmniVaultManager \- The global entry point for users to request deposits and withdrawals. It handles all vault share pricing and withdrawal calculations upon epoch settlement.
* OmniVaultShare \- Unique per vault. The ERC20 receipt token minted and burned by the OmniVaultManager to represent a user's proportional ownership of the vault's underlying assets.
