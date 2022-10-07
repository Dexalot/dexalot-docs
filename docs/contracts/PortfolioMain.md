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
| tokenMap | mapping(bytes32 &#x3D;&gt; contract IERC20Upgradeable) |

## Methods

### Public

#### initialize

initializer function for Upgradeable Portfolio

**Dev notes:** \
Grants admin role to msg.sender

```solidity:no-line-numbers
function initialize(bytes32 _native, uint32 _chainId) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _native | bytes32 | Native token of the network. AVAX in mainnet, ALOT in subnet. |
| _chainId | uint32 |  |

### External

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

#### processXFerPayload

Processes the message coming from the bridge

**Dev notes:** \
Only process WITHDRAW messages as it is the only message that can be sent to the portfolio main
Even when the contract is paused, this method is allowed for the messages that
are in flight to complete properly. Pause for upgrade, then wait to make sure no messages are in
flight then upgrade

```solidity:no-line-numbers
function processXFerPayload(address _trader, bytes32 _symbol, uint256 _quantity, enum IPortfolio.Tx _transaction) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _trader | address | Address of the trader |
| _symbol | bytes32 | Symbol of the token in form of _symbol + chainId |
| _quantity | uint256 | Amount of token to be withdrawn |
| _transaction | enum IPortfolio.Tx | Transaction type |

#### lzRecoverPayload

Recovers the stucked message from the LZ bridge, returns the funds to the depositor/withdrawer

**Dev notes:** \
Only call this just before calling force resume receive function for the LZ bridge. \
Only the DEFAULT_ADMIN can call this function.

```solidity:no-line-numbers
function lzRecoverPayload(bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _payload | bytes | Payload of the message |

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

#### updateTransferFeeRate

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function updateTransferFeeRate(uint256 _rate, enum IPortfolio.Tx _rateType) external
```

#### setAuctionMode

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function setAuctionMode(bytes32 _symbol, enum ITradePairs.AuctionMode _mode) external
```

#### withdrawNative

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function withdrawNative(address payable _to, uint256 _quantity) external
```

#### withdrawToken

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function withdrawToken(address _to, bytes32 _symbol, uint256 _quantity, enum IPortfolioBridge.BridgeProvider) external
```

#### adjustAvailable

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function adjustAvailable(enum IPortfolio.Tx _transaction, address _trader, bytes32 _symbol, uint256 _amount) external
```

#### addExecution

**Dev notes:** \
Only valid for the subnet. Implemented with an empty block here.

```solidity:no-line-numbers
function addExecution(enum ITradePairs.Side _makerSide, address _makerAddr, address _takerAddr, bytes32 _baseSymbol, bytes32 _quoteSymbol, uint256 _baseAmount, uint256 _quoteAmount, uint256 _makerfeeCharged, uint256 _takerfeeCharged) external
```

### Internal

#### addIERC20

Add IERC20 token to the tokenMap. Only in the mainnet

```solidity:no-line-numbers
function addIERC20(bytes32 _symbol, address _tokenaddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _tokenaddress | address | address of the token |
| _srcChainId | uint32 |  |
| _decimals | uint8 | decimals of the token |
|  | enum ITradePairs.AuctionMode |  |

#### removeIERC20

Remove IERC20 token from the tokenMap

**Dev notes:** \
tokenMap balance for the symbol should be 0 before it can be removed.
                Make sure that there are no in-flight withdraw messages coming from the subnet

```solidity:no-line-numbers
function removeIERC20(bytes32 _symbol) internal
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |

### Private

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

