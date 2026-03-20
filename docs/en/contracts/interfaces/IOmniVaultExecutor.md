---
headerDepth: 4
---

# IOmniVaultExecutor

## Enum Types

### ContractAccess

```solidity
enum ContractAccess {
  NONE,
  TRUSTED,
  NATIVE,
  ERC20,
  NATIVE_AND_ERC20
}
```

## Events

### WhitelistedFunctionUpdate

```solidity:no-line-numbers
event WhitelistedFunctionUpdate(bytes4 funcSignature, address targetContract)
```

### TrustedContractUpdate

```solidity:no-line-numbers
event TrustedContractUpdate(address contractAddress, enum IOmniVaultExecutor.ContractAccess access)
```

### AddressUpdate

```solidity:no-line-numbers
event AddressUpdate(string name, address oldAddress, address newAddress)
```

### SetGasTopupValue

```solidity:no-line-numbers
event SetGasTopupValue(uint256 oldValue, uint256 newValue)
```

### GasTopup

```solidity:no-line-numbers
event GasTopup(uint256 timestamp, uint256 amount)
```

