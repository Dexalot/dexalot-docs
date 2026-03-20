---
headerDepth: 4
---

# OmniVaultShare

**OmniVaultShare**

This contract represents the share tokens of an OmniVault, allowing for minting and burning
        of shares in response to deposits and withdrawals from the vault. It extends the OFTUpgradeable
        contract to enable cross-chain functionality.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| omniVaultManager | address |
| vaultId | uint256 |

## Events

### OmniVaultManagerUpdated

```solidity:no-line-numbers
event OmniVaultManagerUpdated(address oldManager, address newManager)
```

## Modifiers

#### onlyOVManager

Modifier to restrict functions to be called only by the OmniVaultManager contract.

```solidity:no-line-numbers
modifier onlyOVManager(uint256 _vaultId)
```

## Methods

### Public

#### constructor

Constructor for the OmniVaultShare contract.

```solidity:no-line-numbers
constructor(address _lzEndpoint, uint256 _vaultId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lzEndpoint | address | The LayerZero endpoint address. |
| _vaultId | uint256 | The ID of the vault. |

#### initialize

Initializes the OmniVaultShare contract.

```solidity:no-line-numbers
function initialize(string _name, string _symbol, address _admin) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the token. |
| _symbol | string | The symbol of the token. |
| _admin | address | The address of the admin. |

### External

#### mint

Mints new vault shares to a specified address.

**Dev notes:** \
Can only be called by the OmniVaultManager contract upon deposits.

```solidity:no-line-numbers
function mint(uint256 _vaultId, address _to, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault. Must match the vaultId of this contract. |
| _to | address | The address to mint vault shares to. |
| _amount | uint256 | The amount of vault shares to mint. |

#### burn

Burns vault shares from the OmniVaultManager contract.

**Dev notes:** \
Can only be called by the OmniVaultManager contract when shares are locked upon withdrawals.

```solidity:no-line-numbers
function burn(uint256 _vaultId, uint256 _amount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault. |
| _amount | uint256 | The amount of vault shares to burn. |

#### setOmniVaultManager

Sets the OmniVaultManager contract address.

```solidity:no-line-numbers
function setOmniVaultManager(address _omniVaultManager) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _omniVaultManager | address | The address of the OmniVaultManager contract. |

