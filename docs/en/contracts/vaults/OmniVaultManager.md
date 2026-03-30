---
headerDepth: 4
---

# OmniVaultManager

**OmniVaultManager**

The OmniVaultManager contract manages multiple OmniVaults, allowing users to request deposits and withdrawals
        of various tokens. It handles the registration of new vaults, processes deposit and withdrawal requests in batches,
        and maintains the state of each vault. The contract also supports pausing and unpausing operations for security and maintenance.
        It interacts with the PortfolioSub contract for token transfers and with OmniVaultExecutor contracts for executing
        asset dispatches.

## Variables

### Public

| Name | Type |
| --- | --- |
| MAX_PENDING_REQUESTS | uint256 |
| MAX_VAULT_PENDING_REQUESTS | uint256 |
| MAX_USER_PENDING_REQUESTS | uint256 |
| MIN_SHARE_MINT | uint256 |
| RECLAIM_DELAY | uint256 |
| SETTLER_ROLE | bytes32 |
| VERSION | bytes32 |
| assetInfo | mapping(uint16 &#x3D;&gt; struct IOmniVaultManager.AssetInfo) |
| batchStartTime | uint256 |
| currentBatchId | uint256 |
| completedBatches | mapping(uint256 &#x3D;&gt; struct IOmniVaultManager.BatchState) |
| portfolio | contract IPortfolioSub |
| pendingRequestCount | uint256 |
| rollingDepositHash | bytes32 |
| rollingWithdrawalHash | bytes32 |
| tokenIndex | uint16 |
| transferRequests | mapping(bytes32 &#x3D;&gt; struct IOmniVaultManager.TransferRequest) |
| userNonce | mapping(address &#x3D;&gt; uint80) |
| userRequestLimits | mapping(address &#x3D;&gt; struct IOmniVaultManager.RequestLimit) |
| vaultIndex | uint256 |
| vaultDetails | mapping(uint256 &#x3D;&gt; struct IOmniVaultManager.VaultDetails) |
| vaultRequestLimits | mapping(uint256 &#x3D;&gt; struct IOmniVaultManager.RequestLimit) |

### Internal

| Name | Type |
| --- | --- |
| tokenList | struct EnumerableSet.Bytes32Set |

## Methods

### Public

#### initialize

Initializer for the OmniVaultManager contract

```solidity:no-line-numbers
function initialize(address _admin, address _settler) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | The admin address with DEFAULT_ADMIN_ROLE |
| _settler | address | The address with SETTLER_ROLE responsible for batch settlement |

### External

#### bulkSettleState

Bulk settle deposit and withdrawal requests

**Dev notes:** \
This function is called by the off-chain batch settlement process after finalization to settle
pending deposit/withdrawals requests in one tx. It uses the prices and vault states recorded at
finalization time to correctly calculate shares to mint for deposits and tokens to dispatch for withdrawals,
preventing manipulation after batch finalization.
The batch state is verified against the recorded state hash to ensure integrity of the settlement process.
The batch is marked as settled after successful settlement, and cannot be settled again.

```solidity:no-line-numbers
function bulkSettleState(uint256[] _prices, struct IOmniVaultManager.VaultState[] _vaults, struct IOmniVaultManager.DepositFufillment[] _deposits, struct IOmniVaultManager.WithdrawalFufillment[] _withdrawals) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prices | uint256[] | The array of token prices for the batch, indexed by token ID (0 if token not used in batch) |
| _vaults | struct IOmniVaultManager.VaultState[] | The array of vault states for the batch, present only for vaults with pending requests |
| _deposits | struct IOmniVaultManager.DepositFufillment[] | The array of deposit fulfillments to settle |
| _withdrawals | struct IOmniVaultManager.WithdrawalFufillment[] | The array of withdrawal fulfillments to settle |

#### finalizeBatch

Finalize the current batch, recording the state for settlement

**Dev notes:** \
This function is called by the off-chain batch settlement process to finalize the batch before settlement.
It records the prices and vault states at finalization time, which are used to mint vault shares
and dispatch tokens for withdrawals. Finalization can only occur if its the first batch or if previous batch
is settled or unwound ensuring a first-in-first-out process for settlement.
The batch state is hashed and stored to ensure integrity of the settlement process, preventing manipulation after finalization.

```solidity:no-line-numbers
function finalizeBatch(uint256[] _prices, struct IOmniVaultManager.VaultState[] _vaults) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prices | uint256[] | The array of token prices for the batch, indexed by token ID (0 if token not used in batch) |
| _vaults | struct IOmniVaultManager.VaultState[] | The array of vault states for the batch, present only for vaults with pending requests |

#### requestDeposit

Request a deposit for one to multiple tokens

```solidity:no-line-numbers
function requestDeposit(uint256 _vaultId, uint16[] _tokens, uint256[] _amounts) external returns (bytes32 requestId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault to deposit into |
| _tokens | uint16[] | The token IDs to deposit |
| _amounts | uint256[] | The amounts to deposit |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The generated deposit request ID |

#### requestWithdrawal

Request a withdrawal for a given vault shares

```solidity:no-line-numbers
function requestWithdrawal(uint256 _vaultId, uint208 _shares) external returns (bytes32 requestId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _shares | uint208 | The vault shares to withdraw |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The generated withdrawal request ID |

#### unwindBatch

Unwind a batch of unsettled deposit and withdrawal requests after the reclaim delay

```solidity:no-line-numbers
function unwindBatch(struct IOmniVaultManager.DepositFufillment[] _deposits, struct IOmniVaultManager.WithdrawalFufillment[] _withdrawals) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _deposits | struct IOmniVaultManager.DepositFufillment[] | The deposit fulfillments to unwind |
| _withdrawals | struct IOmniVaultManager.WithdrawalFufillment[] | The withdrawal fulfillments to unwind |

#### registerVault

Registers a new vault with initial deposit

**Dev notes:** \
Deposit transfer occurs directly to executor contract on mainnet.
Tokens + amounts are only required for correct TransferRequest event emission.

```solidity:no-line-numbers
function registerVault(uint16 _vaultId, struct IOmniVaultManager.VaultDetails _vaultDetails, uint16[] _tokens, uint256[] _amounts, uint208 _shares) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint16 | The unique ID of the vault |
| _vaultDetails | struct IOmniVaultManager.VaultDetails | The details of the vault |
| _tokens | uint16[] | The list of token IDs being deposited |
| _amounts | uint256[] | The list of token amounts being deposited |
| _shares | uint208 | The amount of vault shares to mint for the proposer |

#### pauseVault

Pause a vault, disabling deposits

```solidity:no-line-numbers
function pauseVault(uint256 _vaultId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault to pause |

#### unpauseVault

Unpause a vault, enabling deposits

```solidity:no-line-numbers
function unpauseVault(uint256 _vaultId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault to unpause |

#### deprecateVault

Deprecate a vault, preventing new deposits. Existing shares remain redeemable
(withdrawals allowed)

```solidity:no-line-numbers
function deprecateVault(uint256 _vaultId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault to deprecate |

#### updateVaultDetails

Update details for an existing vault

```solidity:no-line-numbers
function updateVaultDetails(uint256 _vaultId, struct IOmniVaultManager.VaultDetails _newDetails) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault to update |
| _newDetails | struct IOmniVaultManager.VaultDetails | The updated vault details |

#### addTokenDetails

Add details for a new supported token

```solidity:no-line-numbers
function addTokenDetails(struct IOmniVaultManager.AssetInfo _asset) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | struct IOmniVaultManager.AssetInfo | The AssetInfo struct containing the token details |

#### updateTokenDetails

Update details for an existing supported token

**Dev notes:** \
The token address cannot be changed

```solidity:no-line-numbers
function updateTokenDetails(uint16 _tokenId, struct IOmniVaultManager.AssetInfo _asset) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint16 | The ID of the token to update |
| _asset | struct IOmniVaultManager.AssetInfo | The AssetInfo struct containing the updated token details |

#### pause

Pause the contract, disabling deposits and withdrawals

```solidity:no-line-numbers
function pause() external
```

#### unpause

Unpause the contract, enabling deposits and withdrawals

```solidity:no-line-numbers
function unpause() external
```

#### setPortfolio

Set the PortfolioSub contract address

```solidity:no-line-numbers
function setPortfolio(address _portfolio) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _portfolio | address | The new PortfolioSub contract address |

#### receive

Receive native ALOT, ensures auto gas tank fill logic holds

```solidity:no-line-numbers
receive() external payable
```

#### getVaultDetails

Get details of a specific vault

```solidity:no-line-numbers
function getVaultDetails(uint256 _vaultId) external view returns (struct IOmniVaultManager.VaultDetails)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IOmniVaultManager.VaultDetails | The VaultDetails struct containing the vault's details |

#### getTransferRequest

Get details of a specific transfer request

```solidity:no-line-numbers
function getTransferRequest(bytes32 _requestId) external view returns (struct IOmniVaultManager.TransferRequest)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | bytes32 | The ID of the transfer request |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IOmniVaultManager.TransferRequest | The TransferRequest struct containing the request's details |

### Internal

#### _verifyAndIncrementRequestLimits

Verify and increment the request limits for a user and vault

```solidity:no-line-numbers
function _verifyAndIncrementRequestLimits(address _user, uint256 _vaultId) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | The address of the user making the request |
| _vaultId | uint256 | The ID of the vault for the request |

#### _bulkSettleDeposits

Internal function to bulk settle deposit requests

**Dev notes:** \
Mints vault shares to users based on the USD value of their deposits
USD value is recorded at finalization time, so manipulation is not possible after batch finalization

```solidity:no-line-numbers
function _bulkSettleDeposits(uint256 _batchId, struct IOmniVaultManager.DepositFufillment[] _deposits) internal returns (bytes32 depositHash)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _batchId | uint256 | The ID of the current batch |
| _deposits | struct IOmniVaultManager.DepositFufillment[] | The array of deposit fulfillments |

#### _verifyDepositRequest

Internal function to verify a deposit request

```solidity:no-line-numbers
function _verifyDepositRequest(bytes32 requestId) internal returns (uint16 vaultId, address user)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The ID of the deposit request |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| vaultId | uint16 | The ID of the vault for the deposit |
| user | address | The address of the user who made the deposit request |

#### _refundDeposit

Internal function to refund a deposit request

```solidity:no-line-numbers
function _refundDeposit(bytes32 requestId, uint16[] tokenIds, uint256[] amounts, uint256 batchId) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The ID of the deposit request |
| tokenIds | uint16[] | The token IDs to refund |
| amounts | uint256[] | The amounts to refund |
| batchId | uint256 | The ID of the batch for event emission |

#### _bulkSettleWithdrawals

Internal function to bulk settle withdrawal requests

**Dev notes:** \
Burns vault shares from users and dispatches tokens to them equitable to the
current state of the vault at finalization time, so manipulation is not possible after batch finalization
Users with failed withdrawals are refunded their shares

```solidity:no-line-numbers
function _bulkSettleWithdrawals(uint256 _batchId, struct IOmniVaultManager.WithdrawalFufillment[] _withdrawals) internal returns (bytes32 withdrawalHash)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _batchId | uint256 | The ID of the batch to settle |
| _withdrawals | struct IOmniVaultManager.WithdrawalFufillment[] | The array of withdrawal fulfillments |

#### _verifyWithdrawalRequest

Internal function to verify a withdrawal request

```solidity:no-line-numbers
function _verifyWithdrawalRequest(bytes32 requestId) internal returns (uint16 vaultId, address user, uint256 shares)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | bytes32 | The ID of the withdrawal request |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| vaultId | uint16 | The ID of the vault for the withdrawal |
| user | address | The address of the user who made the withdrawal request |
| shares | uint256 | The amount of vault shares to withdraw |

#### _resetBatch

Internal function to reset the batch state

```solidity:no-line-numbers
function _resetBatch() internal
```

#### _depositTokens

Internal function to deposit tokens into the vault

```solidity:no-line-numbers
function _depositTokens(uint16[] _tokenIds, uint256[] _amounts, uint16[] _vaultTokens, address _executor) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenIds | uint16[] | The token IDs to deposit |
| _amounts | uint256[] | The amounts to deposit |
| _vaultTokens | uint16[] | The list of token IDs supported by the vault |
| _executor | address | The executor address to transfer tokens to |

#### _loadStateToTransient

Internal function to load the batch state (prices and vault states) into transient storage for settlement

```solidity:no-line-numbers
function _loadStateToTransient(uint256[] _prices, struct IOmniVaultManager.VaultState[] _vaults) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prices | uint256[] | The array of token prices to load |
| _vaults | struct IOmniVaultManager.VaultState[] | The array of vault states to load |

#### _tstorePrice

Internal function to store a token price in transient storage

```solidity:no-line-numbers
function _tstorePrice(uint16 _tokenId, uint256 _price) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint16 | The ID of the token |
| _price | uint256 | The price of the token |

#### _tstoreBalance

Internal function to store a token balance in transient storage

```solidity:no-line-numbers
function _tstoreBalance(uint256 _vaultId, uint16 _tokenId, uint256 _bal) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _tokenId | uint16 | The ID of the token |
| _bal | uint256 | The balance of the token |

#### _tstoreVaultCtx

Internal function to store vault context in transient storage

```solidity:no-line-numbers
function _tstoreVaultCtx(uint256 _vaultId, uint256 _usd, uint256 _totalShares, address _shareToken, address _executor) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _usd | uint256 | The total USD value of the vault |
| _totalShares | uint256 | The total shares of the vault |
| _shareToken | address | The share token address of the vault |
| _executor | address | The executor address of the vault |

#### _tstoreVaultTokenIds

Internal function to store vault token IDs in transient storage

```solidity:no-line-numbers
function _tstoreVaultTokenIds(uint256 _vaultId, uint16[] _tokenIds) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _tokenIds | uint16[] | The array of token IDs supported by the vault |

#### _calcSharesToMint

Internal function to calculate the number of vault shares to mint for a deposit

```solidity:no-line-numbers
function _calcSharesToMint(uint256 _vaultId, uint16[] _tokenIds, uint256[] _amounts) internal view returns (uint256 sharesToMint)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault for the deposit |
| _tokenIds | uint16[] | The token IDs being deposited |
| _amounts | uint256[] | The amounts of each token being deposited |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| sharesToMint | uint256 | The amount of vault shares to mint for the deposit |

#### _calcAmountsToDispatch

Internal function to calculate the amounts of each token to dispatch for a withdrawal

```solidity:no-line-numbers
function _calcAmountsToDispatch(uint256 _vaultId, uint256 _vaultShares, uint16[] _tokenIds) internal view returns (bytes32[] symbols, uint256[] amounts)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault for the withdrawal |
| _vaultShares | uint256 | The amount of vault shares to withdraw |
| _tokenIds | uint16[] | The token IDs supported by the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| symbols | bytes32[] | The symbols of the tokens to dispatch |
| amounts | uint256[] | The amounts of each token to dispatch |

#### _getPendingVaultRequests

Get the number of pending requests for a vault in the current batch

```solidity:no-line-numbers
function _getPendingVaultRequests(uint256 _vaultId) internal view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The number of pending requests for the vault |

#### _tloadPrice

Internal function to load a token price from transient storage

```solidity:no-line-numbers
function _tloadPrice(uint16 _tokenId) internal view returns (uint256 price)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint16 | The ID of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| price | uint256 | The price of the token |

#### _tloadBalance

Internal function to load a token balance from transient storage

```solidity:no-line-numbers
function _tloadBalance(uint256 _vaultId, uint16 _tokenId) internal view returns (uint256 bal)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _tokenId | uint16 | The ID of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| bal | uint256 | The balance of the token |

#### _tloadVaultTokenIds

Internal function to load vault token IDs from transient storage

```solidity:no-line-numbers
function _tloadVaultTokenIds(uint256 _vaultId) internal view returns (uint16[] tokenIds)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIds | uint16[] | The array of token IDs supported by the vault |

#### _tloadVaultUSD

Internal function to load vault usd from transient storage

```solidity:no-line-numbers
function _tloadVaultUSD(uint256 _vaultId) internal view returns (uint256 usd)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| usd | uint256 | The total USD value of the vault |

#### _tloadVaultTotalShares

Internal function to load vault total shares from transient storage

```solidity:no-line-numbers
function _tloadVaultTotalShares(uint256 _vaultId) internal view returns (uint256 totalShares)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalShares | uint256 | The total shares of the vault |

#### _tloadShareToken

Internal function to load vault share token address from transient storage

```solidity:no-line-numbers
function _tloadShareToken(uint256 _vaultId) internal view returns (address shareToken)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| shareToken | address | The share token address of the vault |

#### _tloadVaultExecutor

Internal function to load vault executor address from transient storage

```solidity:no-line-numbers
function _tloadVaultExecutor(uint256 _vaultId) internal view returns (address executor)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| executor | address | The executor address of the vault |

#### _tokenExistsInVault

Internal function to check if a token exists in the vault's supported tokens

```solidity:no-line-numbers
function _tokenExistsInVault(uint16 _tokenId, uint16[] _tokens) internal pure returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint16 | The token ID to check |
| _tokens | uint16[] | The list of token IDs supported by the vault |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the token exists in the vault, false otherwise |

#### _generateRequestId

Internal function to generate a unique request ID

```solidity:no-line-numbers
function _generateRequestId(uint256 _vaultId, address _user, uint256 _nonce) internal pure returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultId | uint256 | The ID of the vault |
| _user | address | The address of the user making the request |
| _nonce | uint256 | The user's current nonce for requests |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The generated unique request ID |

#### _decodeRequestId

Internal function to extract the request info from a request ID

```solidity:no-line-numbers
function _decodeRequestId(bytes32 _requestId) internal pure returns (uint16 vaultId, address user, uint80 nonce)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | bytes32 | The request ID to extract the info from |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| vaultId | uint16 | The extracted vault ID |
| user | address | The extracted user address |
| nonce | uint80 | The extracted nonce |

