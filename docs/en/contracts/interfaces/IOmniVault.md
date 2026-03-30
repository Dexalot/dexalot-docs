---
headerDepth: 4
---

#### c_58e6856a

```solidity:no-line-numbers
function c_58e6856a(bytes8 c__58e6856a) internal pure
```

#### c_true58e6856a

```solidity:no-line-numbers
function c_true58e6856a(bytes8 c__58e6856a) internal pure returns (bool)
```

#### c_false58e6856a

```solidity:no-line-numbers
function c_false58e6856a(bytes8 c__58e6856a) internal pure returns (bool)
```

# IOmniVault

## Struct Types

### TokenInfo

```solidity
struct TokenInfo {
  bytes20 symbol;
  bool isDepositAllowed;
  uint8 precision;
  uint32 minPerDeposit;
  uint32 maxPerDeposit;
}
```
### TransferRequest

```solidity
struct TransferRequest {
  enum IOmniVault.RequestStatus status;
  uint8 tokenId;
  uint32 timestamp;
  uint208 amount;
}
```

## Enum Types

### RequestStatus

```solidity
enum RequestStatus {
  DEPOSIT_REQUESTED,
  WITHDRAWAL_REQUESTED,
  DEPOSIT_FULFILLED,
  WITHDRAWAL_FULFILLED,
  DEPOSIT_CLAIMED,
  WITHDRAWAL_CLAIMED
}
```

## Methods

### External

#### bulkSettleState

```solidity:no-line-numbers
function bulkSettleState(bytes32[] depositRequestIds, uint256[] depositShares, bytes32[] withdrawalRequestIds, uint208[] withdrawalAmounts) external payable
```

#### omniTraderContract

```solidity:no-line-numbers
function omniTraderContract() external view returns (address)
```

#### initialDeposit

```solidity:no-line-numbers
function initialDeposit(uint208[] amounts, uint256[] shares) external
```

