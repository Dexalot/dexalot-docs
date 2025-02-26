# Trading Performance - Annual Percentage Yield (APY) Calculator Overview

## What is APY?

APY (Annual Percentage Yield) represents your potential annual return rate, assuming your monthly trading performance remains consistent and all profits are reinvested. Note that this is an indicative APY, as there are multiple methods for calculating APY in different financial contexts.

> **Note**: APY calculation feature is available for trading activity starting from January 2025.

## Calculation Method

### Active Capital

We calculate your APY using the maximum amount of active capital you used during the month. This means:

1. Your active capital (funds in open orders) which is tracked daily at 23:59 UTC
2. We use the highest active capital recorded during the month
3. Monthly yield is calculated as: Monthly Profit from [DIP](/en/DIP.md) / Maximum Active Capital
4. This monthly yield is then converted to APY using compound interest

The formula for converting monthly yield to APY is:
$$ APY = ((1 + monthlyYield)^{12} - 1) * 100 $$

### Simple Example

Active Capital: $500

Monthly Profit from [DIP](/en/DIP.md):: $50

Monthly Yield = $50 / $500 = 0.10 (or 10%)

APY = ((1 + 0.10)^12 - 1) × 100 = 213.84%

### Important: Impact of Changing Active Capital

**Example:**

Day 1-10: Trading with $500, make $50 profit from [DIP](/en/DIP.md)

Day 11-20: Increase to $1,000 in open orders

Day 21-30: Return to $500 in open orders

Results:

- Maximum Active Capital = $1,000 (highest amount during the month)
- Monthly Profit from [DIP](/en/DIP.md): $50
- Monthly Yield = $50 / $1,000 = 0.05 (or 5%)
- APY = ((1 + 0.05)^12 - 1) × 100 = 79.59%

### Current Month Calculation

For the current month, we project your monthly profit from [DIP](/en/DIP.md) based on your earnings so far. For example:

If on the 10th day of a 30-day month:

- Current [DIP](/en/DIP.md) earnings of the month: $50
- Days passed: 10
- Total days in month: 30
- Projected monthly profit from [DIP](/en/DIP.md) = ($50 / 10) × 30 = $150
- Maximum Active Capital (so far): $1,000
- Projected Monthly Yield = $150 / $1,000 = 0.15 (or 15%)
- Projected APY = ((1 + 0.15)^12 - 1) × 100 = 435.03%

Note that this is a projection based on your current performance and may change as the month progresses. The final APY will be calculated using your actual total [DIP](/en/DIP.md) earnings and the maximum active capital used throughout the entire month.

## Final Remark

The Active Capital Method shows how efficiently you're using your trading capital. It's particularly useful for comparing trading skill regardless of account size. However, remember that your APY will be calculated using your highest active capital amount during the month, even if that peak was temporary.

This APY calculation serves as an indicator of performance and may differ from APY calculations used in other financial products or services. It's specifically designed to reflect trading efficiency in our platform's context.

## Data Updates

For the current month, APY calculations are updated daily at 23:59 UTC. Your projected APY is recalculated each time your [DIP](/en/DIP.md) earnings or active capital changes during the day.

## Key Points to Remember

- **Profit Calculation**: Only [DIP](/en/DIP.md) earnings are counted as profit in APY calculations
- **Capital Measurement**: We use the maximum (not average) active capital of the month
- **Capital Changes**: Temporary increases in active capital will affect the entire month's calculation as we use the highest value
- **Current Month**: During the current month, APY is projected based on your earnings so far and updated daily at 23:59 UTC
- **Indicative Nature**: This APY calculation is one of several possible methods and serves as an indicator of trading performance
