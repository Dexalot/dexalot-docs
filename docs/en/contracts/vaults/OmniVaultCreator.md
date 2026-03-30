---
headerDepth: 4
---

# OmniVaultCreator

**OmniVaultCreator**

This contract facilitates the creation of OmniVaults by allowing users to
        request vault creation, deposit required tokens and fees, and manage the
        lifecycle of vault creation requests. Deployment of contracts is handled
        off-chain by Dexalot admins upon acceptance of requests.

## Variables

### Public

| Name | Type |
| --- | --- |
| RISK_DISCLOSURE | string |
| VERSION | bytes32 |
| collectedFees | uint256 |
| creationNonces | mapping(address &#x3D;&gt; uint256) |
| feeAmount | uint256 |
| feeToken | address |
| hasAcknowledgedRisk | mapping(address &#x3D;&gt; bool) |
| pendingFees | uint256 |
| reclaimDelay | uint256 |
| vaultRequests | mapping(bytes32 &#x3D;&gt; struct IOmniVaultCreator.VaultRequest) |

## Methods

### Public

#### initialize

Initializes the contract.

```solidity:no-line-numbers
function initialize(address _admin) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | The address for the DEFAULT_ADMIN_ROLE. |

### External

#### openPairVault

Requests the creation of a new pair vault, deposits base + quote tokens into escrow
        as well as the required fee.

**Dev notes:** \
Funds are taken from the chain and addresses at index 0 in the arrays.

```solidity:no-line-numbers
function openPairVault(address[] baseTokens, address[] quoteTokens, uint32[] chainIds, uint256 baseAmount, uint256 quoteAmount) external returns (bytes32 requestId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseTokens | address[] | The array of base token addresses for each chain. |
| quoteTokens | address[] | The array of quote token addresses for each chain. |
| chainIds | uint32[] | The array of chain IDs for the vault. |
| baseAmount | uint256 | The amount of base token to deposit for the vault. |
| quoteAmount | uint256 | The amount of quote token to deposit for the vault. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The ID of the vault creation request. |

#### reclaimRequest

Allows the proposer to reclaim their deposited funds if the vault
        request is still pending after the reclaim delay or has been rejected.

```solidity:no-line-numbers
function reclaimRequest(bytes32 _requestId, address[] _tokens, uint256[] _amounts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | bytes32 | The ID of the vault creation request to reclaim. |
| _tokens | address[] | The array of token addresses to reclaim. |
| _amounts | uint256[] | The array of token amounts to reclaim. |

#### acceptAndFundVault

Accepts a vault creation request, transfers the deposited funds to the
        new vault's OmniVaultExecutor.

**Dev notes:** \
Verifies that the provided tokens and amounts match the original deposit (initialDepositHash).
     Does not mint shares; initial shares are minted via OmniVaultManager.registerVault.

```solidity:no-line-numbers
function acceptAndFundVault(bytes32 _requestId, address _omniVaultExecutor, address[] _tokens, uint256[] _amounts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | bytes32 | The ID of the vault creation request to accept. |
| _omniVaultExecutor | address | The address of the newly created OmniVaultExecutor contract. |
| _tokens | address[] | The array of token addresses that were initially deposited and will be forwarded. |
| _amounts | uint256[] | The array of token amounts that were initially deposited and will be forwarded. |

#### acknowledgeRiskDisclosure

Acknowledges the risk disclosure for vault creation.

```solidity:no-line-numbers
function acknowledgeRiskDisclosure(bytes signature) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| signature | bytes | The signature of the risk disclosure message. |

#### rejectVaultRequest

Rejects a vault creation request.

```solidity:no-line-numbers
function rejectVaultRequest(bytes32 _requestId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | bytes32 | The ID of the vault creation request to reject. |

#### setFeeToken

Sets the token used to pay the vault creation fee.

```solidity:no-line-numbers
function setFeeToken(address _feeToken) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feeToken | address | The address of the new fee token. |

#### setFeeAmount

Sets the fee amount required for vault creation.

```solidity:no-line-numbers
function setFeeAmount(uint64 _feeAmount) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feeAmount | uint64 | The new fee amount. |

#### setReclaimDelay

Sets the reclaim delay period.

```solidity:no-line-numbers
function setReclaimDelay(uint256 _newDelay) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newDelay | uint256 | The new reclaim delay in seconds. |

#### withdrawCollectedFees

Withdraws the collected fees to the admin.

```solidity:no-line-numbers
function withdrawCollectedFees() external
```

#### getCreationRequest

```solidity:no-line-numbers
function getCreationRequest(bytes32 _requestId) external view returns (struct IOmniVaultCreator.VaultRequest)
```

### Internal

#### _requestVaultCreation

Internal function to handle vault creation requests.

```solidity:no-line-numbers
function _requestVaultCreation(address[] _tokens, uint256[] _amounts) internal returns (bytes32 requestId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | address[] | The array of token addresses to deposit. |
| _amounts | uint256[] | The array of token amounts to deposit. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The ID of the vault creation request. |

#### _verifyRiskDisclosure

Internal function to verify the risk disclosure signature.

```solidity:no-line-numbers
function _verifyRiskDisclosure(bytes signature) internal view
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| signature | bytes | The signature provided by the proposer. |

