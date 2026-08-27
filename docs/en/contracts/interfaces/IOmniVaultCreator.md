---
headerDepth: 4
---

# IOmniVaultCreator

## Struct Types

### VaultRequest

```solidity
struct VaultRequest {
  address proposer;
  uint32 timestamp;
  enum IOmniVaultCreator.VaultRequestStatus status;
  uint64 feeCollected;
  bytes32 initialDepositHash;
}
```

## Enum Types

### VaultRequestStatus

```solidity
enum VaultRequestStatus {
  NONE,
  PENDING,
  REJECTED,
  RECLAIMED,
  ACCEPTED
}
```

## Events

### VaultCreationRequest

```solidity:no-line-numbers
event VaultCreationRequest(bytes32 requestId, address creator, enum IOmniVaultCreator.VaultRequestStatus status, address feeToken, uint256 feeCollected, address[] tokens, uint256[] amounts)
```

### VaultCreationUpdate

```solidity:no-line-numbers
event VaultCreationUpdate(bytes32 requestId, enum IOmniVaultCreator.VaultRequestStatus status)
```

### PairVault

```solidity:no-line-numbers
event PairVault(bytes32 requestId, address[] baseTokens, address[] quoteTokens, uint32[] chainIds)
```

### RiskAcknowledged

```solidity:no-line-numbers
event RiskAcknowledged(address proposer)
```

### FeeUpdated

```solidity:no-line-numbers
event FeeUpdated(uint256 newFee, uint256 oldFee)
```

### FeeTokenUpdated

```solidity:no-line-numbers
event FeeTokenUpdated(address newFeeToken, address oldFeeToken)
```

### ReclaimDelayUpdated

```solidity:no-line-numbers
event ReclaimDelayUpdated(uint256 newDelay, uint256 oldDelay)
```

### CreationFeeCollected

```solidity:no-line-numbers
event CreationFeeCollected(address feeClaimer, address feeToken, uint256 feeAmount)
```

