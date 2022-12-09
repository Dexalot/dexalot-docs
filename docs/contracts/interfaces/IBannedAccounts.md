---
headerDepth: 4
---

# IBannedAccounts

**Interface of BannedAccounts**

## Enum Types

### BanReason

```solidity
enum BanReason {
  NOTBANNED,
  OFAC,
  ABUSE,
  TERMS
}
```

## Methods

### External

#### isBanned

```solidity:no-line-numbers
function isBanned(address _account) external view returns (bool)
```

#### getBanReason

```solidity:no-line-numbers
function getBanReason(address _account) external view returns (enum IBannedAccounts.BanReason)
```

