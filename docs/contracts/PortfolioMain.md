---
headerDepth: 4
---

# PortfolioMain

**Mainnet Portfolio**

**Dev notes:** \
This contract prevalidates the PortfolioSub checks and allows deposits to be sent to the subnet.
ExchangeMain needs to have DEFAULT_ADMIN_ROLE on PortfolioMain.

## Variables

### Public

| Name | Type |
| --- | --- |
| VERSION | bytes32 |
| bridgeFeeCollected | mapping(bytes32 &#x3D;&gt; uint256) |
| minDepositMultiplier | uint8 |
| nativeDepositsRestricted | bool |
| tokenMap | mapping(bytes32 &#x3D;&gt; contract IERC20Upgradeable) |
| trustedContracts | mapping(address &#x3D;&gt; bool) |
| trustedContractToIntegrator | mapping(address &#x3D;&gt; string) |

### Internal

| Name | Type |
| --- | --- |
| bannedAccounts | contract IBannedAccounts |

## Methods

### Public

#### initialize

Initializes the PortfolioMain contract

```solidity:no-line-numbers
function initialize(bytes32 _native, uint32 _chainId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _native | bytes32 | Symbol of the native token |
| _chainId | uint32 | Current chainId of the Portfolio |

#### removeToken

Removes the given token from the portfolio. Native token removal is allowed if only the wrapped
version of the token needs to be supported.

**Dev notes:** \
Only callable by admin and portfolio should be paused. Makes sure there are no
in-flight deposit/withdraw messages

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32) public virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
|  | uint32 |  |

### External

#### addToken

Adds the given token to the portfolio

**Dev notes:** \
Only callable by admin.
We don't allow tokens with the same symbols but different addresses.
Native symbol is also added by default with 0 address.

```solidity:no-line-numbers
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, uint256 _fee, uint256 _gasSwapRatio, bool _isVirtual) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Address of the token |
| _srcChainId | uint32 | Source Chain Symbol of the virtual token only. Otherwise it is overridden by the current chainid |
| _decimals | uint8 | Decimals of the token |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |
| _isVirtual | bool | Not an ERC20 or native. It is only used to facilitate Cross Chain Trades where the token doesn't exist |

#### getToken

Frontend function to get the ERC20 token

```solidity:no-line-numbers
function getToken(bytes32 _symbol) external view returns (contract IERC20Upgradeable)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IERC20Upgradeable | IERC20Upgradeable  ERC20 token |

#### depositNative

```solidity:no-line-numbers
function depositNative(address payable _from, enum IPortfolioBridge.BridgeProvider _bridge) external payable
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address payable | Address of the depositor |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |

#### depositToken

```solidity:no-line-numbers
function depositToken(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to deposit |
| _bridge | enum IPortfolioBridge.BridgeProvider | Enum for bridge type |

#### getMinDepositAmount

Minimum Transaction Amount in deposits

**Dev notes:** \
The user has to have at least 1.9 as much for bridge fee (if set) + any potential gas token swap
For ALOT this will be 1.9 by default, so we are allowing 2 ALOT to be deposited easily

```solidity:no-line-numbers
function getMinDepositAmount(bytes32 _symbol) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256  Minimum DepositAmount |

#### setMinDepositMultiplier

Sets the minimum deposit multiplier

**Dev notes:** \
The multiplier entered will always be divided by 10

```solidity:no-line-numbers
function setMinDepositMultiplier(uint8 _minDepositMultiplier) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _minDepositMultiplier | uint8 | multiplier for minimum deposits |

#### getMinDepositAmounts

List of Minimum Deposit Amounts

**Dev notes:** \
The user has to have at least 1.9 as much for bridge fee (if set) + any potential gas token swap

```solidity:no-line-numbers
function getMinDepositAmounts() external view returns (bytes32[], uint256[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  tokens uint256[] amounts  . |
| [1] | uint256[] |  |

#### addTrustedContract

Adds the given contract to trusted contracts in order to provide excluded functionality

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function addTrustedContract(address _contract, string _organization) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be added |
| _organization | string | Organization of the contract to be added |

#### isTrustedContract

```solidity:no-line-numbers
function isTrustedContract(address _contract) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the contract is trusted |

#### removeTrustedContract

Removes the given contract from trusted contracts

**Dev notes:** \
Only callable by admin

```solidity:no-line-numbers
function removeTrustedContract(address _contract) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to be removed |

#### depositTokenFromContract

Allows deposits from trusted contracts

**Dev notes:** \
Used by Avalaunch for DD deposits and Vesting Contracts.
Keeping for backward compatibility instead of using ON_BEHALF_ROLE.

```solidity:no-line-numbers
function depositTokenFromContract(address _from, bytes32 _symbol, uint256 _quantity) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the depositor |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token to deposit |

#### setBannedAccounts

Sets banned accounts contract address

```solidity:no-line-numbers
function setBannedAccounts(address _address) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | address of the banned accounts contract |

#### getBannedAccounts

```solidity:no-line-numbers
function getBannedAccounts() external view returns (contract IBannedAccounts)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IBannedAccounts | IBannedAccounts  banned accounts contract |

#### processXFerPayload

Processes the message coming from the bridge

**Dev notes:** \
WITHDRAW message is the only message that can be sent to portfolioMain.
Even when the contract is paused, this method is allowed for the messages that
are in flight to complete properly. Pause for upgrade, then wait to make sure no messages are in
flight then upgrade

```solidity:no-line-numbers
function processXFerPayload(struct IPortfolio.XFER _xfer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | Transfer message |

#### collectBridgeFees

Allows the owner to withdraw the fees collected from the bridge

**Dev notes:** \
Collect fees to pay for the bridge as native token
    Only the owner can call this function

```solidity:no-line-numbers
function collectBridgeFees(bytes32[] _symbols) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbols | bytes32[] | Array of symbols of tokens to withdraw |

#### collectNativeBridgeFees

Allows the owner to withdraw the fees collected in AVAX from the bridge

**Dev notes:** \
Collect fees to pay for the bridge as native token
    Only the owner can call this function

```solidity:no-line-numbers
function collectNativeBridgeFees() external
```

### Internal

#### addTokenInternal

Internal function that implements the token addition

**Dev notes:** \
Unlike in the subnet it doesn't add the token to the PortfolioBridgeMain as it is redundant
Sample Token List in PortfolioMain: \
Symbol, SymbolId, Decimals, address, auction mode (43114: Avalanche C-ChainId) \
ALOT ALOT43114 18 0x5FbDB2315678afecb367f032d93F642f64180aa3 0 (Avalanche ALOT) \
AVAX AVAX43114 18 0x0000000000000000000000000000000000000000 0 (Avalanche Native AVAX) \
BTC.b BTC.b43114 8 0x59b670e9fA9D0A427751Af201D676719a970857b 0 \
DEG DEG43114 18 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf 2 \
LOST LOST43114 18 0x162A433068F51e18b7d13932F27e66a3f99E6890 0 \
SLIME SLIME43114 18 0x2B0d36FACD61B71CC05ab8F3D2355ec3631C0dd5 0 \
USDC USDC43114 6 0xD5ac451B0c50B9476107823Af206eD814a2e2580 0 \
USDt USDt43114 6 0x38a024C0b412B9d1db8BC398140D00F5Af3093D4 0 \

```solidity:no-line-numbers
function addTokenInternal(struct IPortfolio.TokenDetails _details, uint256 _fee, uint256 _gasSwapRatio) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _details | struct IPortfolio.TokenDetails | Token Details |
| _fee | uint256 | Bridge Fee |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT |

#### setBridgeParamInternal

Sets the bridge provider fee & gasSwapRatio per ALOT for the given token and usedForGasSwap flag

**Dev notes:** \
Called by PortfolioSub.initialize() as well as setBridgeParam()
We can never set a token gasSwapRatio to 0 in the mainnet

```solidity:no-line-numbers
function setBridgeParamInternal(bytes32 _symbol, uint256 _fee, uint256 _gasSwapRatio, bool) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _fee | uint256 | Fee to be set |
| _gasSwapRatio | uint256 | Amount of token to swap per ALOT. Used to control min deposit amount in the mainnet Because we want users to deposit more than whats going to be swapped out for them to end up a portion of their token in their subnet portfolio after the swap. gasSwapRatio will be updated daily with an offchain app with the current market pricesexcept for ALOT which is always 1 to 1. Daily update is sufficient as it is multiplied by 1.9 to calculate the min deposit Amount. _usedForGasSwap  not used in the mainnet |
|  | bool |  |

### Private

#### deposit

```solidity:no-line-numbers
function deposit(address _from, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider _bridge) private
```

#### emitPortfolioEvent

Wrapper for emit event

```solidity:no-line-numbers
function emitPortfolioEvent(address _trader, bytes32 _symbol, uint256 _quantity, uint256 _feeCharged, enum IPortfolio.Tx transaction) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token |
| _quantity | uint256 | Amount of token used in the transaction |
| _feeCharged | uint256 | Fee charged for the transaction |
| transaction | enum IPortfolio.Tx | Transaction type |

