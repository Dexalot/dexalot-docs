# DIP - Dexalot Incentive Program

![DIP - Dexalot Incentive Program](/images/dip.png)

The Dexalot Incentive Program (DIP) is designed to reward users for providing liquidity and trading on our protocol. Users are scored on their activity on a pair by pair basis. Pair scores are put together to give a combined token score per user. Calculations are processed on a daily basis after 00:00 UTC. At the end of the month a user's score is finalized and reward tokens are distributed proportionally based on this score. The score consists of 3 underlying components, executed volume (E), orderbook score (O) and ALOT balance score (A). Each pair and reward token and may be weighted differently, the current active weightings can be viewed [here](/en/DIP.md#weightings)

## Executed Volume (E)

Executed volume relates to the total monthly executed volume for a user in USD terms. To prevent malicious activity any wash trades are excluded in this calculation.

## Orderbook Score (O)

Orderbook score determines the “quality” of a user's orders based on the size (US$ value), the duration orders remain on the order book, and the distance orders are from the best bid or ask. To prevent giving rewards to illiquid markets we have two parameters for each pair, max spread and max depth. If the price difference between best bid and best ask is greater than max spread then no rewards are given for the pair until prices are back within the range. Whereas max depth determines the distance between the best bid/ask and the last order to include for scoring. This ensures that orders far away from the mid price are not rewarded as they are not aiding liquidity.

**Orderbook Score Parameters**

| Pair | Max Spread (bps) | Max Depth (bps) |
| ---- | ---------- | --------- |
| USDT/USDC | 4 | 8.5
| sAVAX/AVAX | 4 | 8.5
| EURC/USDC | 8 | 16
| ALOT/USDC | 60 | 100
| TRUMP/USDC | 80 | 100
| ARENA/AVAX | 200 | 100
| COQ/AVAX | 200 | 100
| PLSR/USDC | 200 | 100
| All Other Pairs | 30 | 100

The formula for orderbook score calculations is as follows:

$$ pd = {|\frac{bp - p}{p}|} $$

$$ qualityScore = {q * \frac{t}{600} * e^{\frac{-3*pd}{md}}} $$

- $bp$: best price, best ask for ask side or best bid for bid side
- $p$: price of the order
- $pd$: price difference, difference between order price and best price
- $q$: quantity remaining in order
- $t$: time in seconds order is open for
- $md$: max depth, depth from best bid/ask to give rewards up to, orders outside this range are not calculated until they enter the range

In the quality score calculation $e$ is used to generate the distance from best bid/ask so orders tighter to the best price are rewarded exponentially better than those further away. After calculation, quality scores are normalized to give the final orderbook score. For every second on a given side of the orderbook a score of 1 is distributed proportionally across applicable orders. By scoring with respect to time orderbook scores across different pairs are comparable irrespective of price.

$$ orderbookScore(x) = { \frac{qualityScore_x}{\sum_{i=1}^{n} qualityScore_i} * totalTime} $$


## ALOT Balance Score (A)

Balance score rewards users for the duration and quantity of ALOT they hold in their portfolio. The formula is as follows:

$$ balanceScore = {\sqrt{alotBalance * 0.014 * timeHeld / 3600}} $$

- Square root is used to more fairly represent smaller sized users
- Time held represents the number of seconds a user holds alot in their portfolio
- Balance score is additive i.e. if a user holds 10 ALOT for 23 hours and 1 ALOT for 1 hour. newBalanceScore = prevDayBalanceScore + 10 ALOT for 23 hours + 1 ALOT for 1 hour


## Weightings

**DIP Distribution by Pair**

| Pair       | ALOT % | sAVAX % |
| ---------- | ------ | ------- |
| ALOT/USDC  | 9.14   | 9.14    |
| ARB/USDC   | 5.08   | 5.08    |
| ARENA/AVAX | 0.51   | 0.51    |
| AVAX/USDC  | 10.15  | 10.15   |
| AVAX/USDT  | 10.15  | 10.15   |
| BTC/USDC   | 10.15  | 10.15   |
| COQ/AVAX   | 0.51   | 0.51    |
| ETH/USDC   | 10.15  | 10.15   |
| ETH/USDT   | 10.15  | 10.15   |
| EURC/USDC  | 6.60   | 6.60    |
| GUN/USDC   | 3.05   | 3.05    |
| PLSR/USDC  | 0.51   | 0.51    |
| sAVAX/AVAX | 5.08   | 5.08    |
| TRUMP/USDC | 2.03   | 2.03    |
| USDT/USDC  | 6.60   | 6.60    |
| WBTC/USDC  | 10.15  | 10.15   |


**DIP Distribution by Token**

| Token  | Monthly Amount | End Date | E % | O % | A % |
| ------ | -------------- | -------- | --- | --- | --- |
| ALOT   | up to $200,000 (i) | 2025-23-31 (iii) | 25% | 50% | 25% |
| sAVAX  | 1,000         | 2025-12-31 (ii)  | 25% | 50% | 25% |
| QI     | 600,000     | 2025-06-30 | 25% | 50% | 25% |
| ARENA  | up to $4,500  | 2025-03-31 | 50% | 50%  | 0% |


(i) - To calculate the absolute number of ALOT tokens the 7 day volume weighted average ALOT price is used (taken on the day prior to the start of a new month).

(ii) - sAVAX rewards may be extended further, subject to Multiverse tiers.

(iii) - ALOT end date is rolling and may be extended further.


For ALOT rewards emphasis on executions is reduced as these users will now be rewarded via volume rebates.

## Score Calculations

For a given reward token (e.g. ALOT) the following formula is applied for every user to generate a score:

$$ tokenScore = {\sum_{i=1}^{p} w_i * max(1, e_i ^{E \%}) * max(1, o_i ^{O \%}) * max(1, a_i ^{A \%})} $$

- $p$: number of pairs
- $i$: current pair
- $w$: % weighting for a pair in a given reward token
- $e$: % E score for a given pair
- $o$: % O score for a given pair
- $a$: % A score for a given pair
- $E \%$: % weighting for E score for a given reward token
- $O \%$: % weighting for O score for a given reward token
- $A \%$: % weighting for A score for a given reward token
- $max(1, )$: to ensure that if a user is missing a component (E, O or A), their overall score is not hindered

Rewards are distributed proportionally based on a user's token score. Therefore to calculate the token amount to be distributed to a user the following function is applied:

$$ userRewardTokens(x) = { \frac{tokenScore_x}{\sum_{j=1}^{n} tokenScore_j} * monthlyAmount} $$
