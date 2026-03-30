---
headerDepth: 4
---

# IOmniVaultManager

## Struct Types

### VaultDetails

```solidity
struct VaultDetails {
  string name;
  address proposer;
  address omniTrader;
  enum IOmniVaultManager.VaultStatus status;
  address executor;
  address shareToken;
  address dexalotRFQ;
  uint32[] chainIds;
  uint16[] tokens;
}
```
### BatchState

```solidity
struct BatchState {
  uint32 finalizedAt;
  enum IOmniVaultManager.BatchStatus status;
  bytes32 depositHash;
  bytes32 withdrawalHash;
  bytes32 stateHash;
}
```
### VaultState

```solidity
struct VaultState {
  uint256 vaultId;
  uint16[] tokenIds;
  uint256[] balances;
}
```
### DepositFufillment

```solidity
struct DepositFufillment {
  bytes32 depositRequestId;
  bool process;
  uint16[] tokenIds;
  uint256[] amounts;
}
```
### WithdrawalFufillment

```solidity
struct WithdrawalFufillment {
  bytes32 withdrawalRequestId;
  bool process;
}
```
### AssetInfo

```solidity
struct AssetInfo {
  bytes32 symbol;
  enum IOmniVaultManager.AssetType tokenType;
  uint8 precision;
  uint32 minPerDeposit;
  uint32 maxPerDeposit;
}
```
### TransferRequest

```solidity
struct TransferRequest {
  enum IOmniVaultManager.RequestStatus status;
  uint32 timestamp;
  uint208 shares;
}
```
### RequestLimit

```solidity
struct RequestLimit {
  uint248 lastBatchId;
  uint8 pendingCount;
}
```

## Enum Types

### VaultStatus

```solidity
enum VaultStatus {
  NONE,
  ACTIVE,
  PAUSED,
  DEPRECATED
}
```
### BatchStatus

```solidity
enum BatchStatus {
  NONE,
  FINALIZED,
  SETTLED,
  UNWOUND
}
```
### RequestStatus

```solidity
enum RequestStatus {
  DEPOSIT_REQUESTED,
  WITHDRAWAL_REQUESTED,
  DEPOSIT_SUCCESS,
  WITHDRAWAL_SUCCESS,
  DEPOSIT_FAILED,
  WITHDRAWAL_FAILED
}
```
### AssetType

```solidity
enum AssetType {
  BASE,
  QUOTE,
  REWARD,
  OTHER
}
```

## Events

### TransferRequestUpdate

```solidity:no-line-numbers
event TransferRequestUpdate(bytes32 requestId, uint256 batchId, address user, enum IOmniVaultManager.RequestStatus status, uint16[] tokenIds, uint256[] amounts)
```

### BatchUpdate

```solidity:no-line-numbers
event BatchUpdate(uint256 batchId, enum IOmniVaultManager.BatchStatus status)
```

## Methods

### External

#### bulkSettleState

```solidity:no-line-numbers
function bulkSettleState(uint256[] _prices, struct IOmniVaultManager.VaultState[] _vaults, struct IOmniVaultManager.DepositFufillment[] _deposits, struct IOmniVaultManager.WithdrawalFufillment[] _withdrawals) external
```

