---
headerDepth: 4
---

# PortfolioBridgeSub

**PortfolioBridgeSub: Bridge aggregator and message relayer for subnet using multiple different bridges**

This contracts checks volume and threshold limits for withdrawals if they are enabled in the
DelayedTransfers Contract that implements delayedTransfers as well as volume caps per epoch per token

**Dev notes:** \
Unlike PortfolioBridgeMain, PortfolioBridgeSub has its own internal list of tokenDetailsMapById and
tokenInfoMapBySymbolChainId because it has to keep track of the tokenDetails from each chain independently.
As a result the PortfolioSub tokenDetails are quite different than the PortfolioBridgeSub tokenDetails.
PortfolioBridgeSub always maps the symbol that it receives into a subnet symbol on receipt, that PortfolioSub
expects. i.e USDC43114 is mapped to USDC. Similarly USDC1 can also be mapped to USDC. This way liquidity can
be combined and traded together in a multichain implementation.
Similarly it keeps track of the token positions from each chain independently and it will have a different bridge
fee depending on the available inventory at the target chain (where the token will be withdrawn).
When sending back to the target chain, it maps it back to the expected symbol by the target chain,
i.e USDC to USDC1 if sent back to Ethereum, USDC43114 if sent to Avalanche. \
Symbol mapping happens in packXferMessage on the way out. packXferMessage calls getTokenId that has
different implementations in PortfolioBridgeMain &amp; PortfolioBridgeSub. On the receival, the symbol
mapping will happen in processPayload. getSymbolForId is called by getXFerMessage and it returns the
Xfer Message as is but also returns the reverse mapped local symbol. \
We need to raise the XChainXFerMessage &amp; update the inventory with the symbolId so the
incoming and the outgoing xfer messages always contain the symbolId rather than symbol and then processPayload
can use the local symbol when calling portfolio methods \

## Variables

### Public

| Name | Type |
| --- | --- |
| delayedTransfers | contract IDelayedTransfers |
| inventoryManager | contract IInventoryManager |

### Private

| Name | Type |
| --- | --- |
| tokenDetailsMapById | mapping(bytes32 &#x3D;&gt; struct IPortfolio.TokenDetails) |
| tokenInfoMapBySymbolChainId | mapping(bytes32 &#x3D;&gt; mapping(uint32 &#x3D;&gt; struct IPortfolioBridgeSub.TokenDestinationInfo)) |
| tokenListById | struct EnumerableSetUpgradeable.Bytes32Set |

## Methods

### Public

#### VERSION

```solidity:no-line-numbers
function VERSION() public pure returns (bytes32)
```

#### getBridgeFee

Returns the minimum bridgeFee calculated offChain for the targetChainId, in addition to the
inventoryManager calculated withdrawal fee

**Dev notes:** \
This is in terms of token transferred. LZ charges us using based on the payload size and gas px at
destination. Our offchain app monitors the gas at the destination and sets the gas using LZ based estimation
and the Token/ALOT parity at that point. The inventoryManager calculates the withdrawal fee based on the
quantity of the token to be withdrawn, current inventory in the receiving chain and other chains.

```solidity:no-line-numbers
function getBridgeFee(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes32 _symbol, uint256 _quantity) public view returns (uint256 bridgeFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider to use |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _symbol | bytes32 | subnet symbol of the token |
| _quantity | uint256 | quantity of the token to withdraw |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgeFee | uint256 | bridge fee for the destination |

### External

#### addToken

Adds the given token to the PortfolioBridgeSub. PortfolioBridgeSub the list will be bigger as they could
be from different mainnet chains

**Dev notes:** \
`addToken` is only callable by admin or from Portfolio when a new subnet symbol is added for the
first time. The same subnet symbol but a different symbolId is required when adding a token to
PortfolioBridgeSub. \
Sample Token List in PortfolioBridgeSub: (BTC & ALOT Listed twice with 2 different chain ids) \
Native symbol is also added as a token with 0 address \
Symbol, SymbolId, Decimals, address, auction mode (432204: Dexalot Subnet ChainId, 43114: Avalanche C-ChainId) \
ALOT ALOT432204 18 0x0000000000000000000000000000000000000000 0 (Native ALOT) \
ALOT ALOT43114 18 0x5FbDB2315678afecb367f032d93F642f64180aa3 0 (Avalanche ALOT) \
AVAX AVAX43114 18 0x0000000000000000000000000000000000000000 0 (Avalanche Native AVAX) \
BTC.b BTC.b43114 8 0x59b670e9fA9D0A427751Af201D676719a970857b 0 (Avalanche BTC.b) \
BTC BTC1 18  0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6 0 (Ethereum BTC) \
DEG DEG43114 18 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf 2 \
LOST LOST43114 18 0x162A433068F51e18b7d13932F27e66a3f99E6890 0 \
SLIME SLIME43114 18 0x2B0d36FACD61B71CC05ab8F3D2355ec3631C0dd5 0 \
USDC USDC43114 6 0xD5ac451B0c50B9476107823Af206eD814a2e2580 0 \
USDt USDt43114 6 0x38a024C0b412B9d1db8BC398140D00F5Af3093D4 0 \
WETH.e WETH.e43114 18 0x02b0B4EFd909240FCB2Eb5FAe060dC60D112E3a4 0 \
Note:
ALOT from the Avalanche Mainnet (Line 2 in the list) will be added with a direct function call
to PortfolioBridgeSub.addToken as a part of the deployment script. All other tokens have be
added via PortfolioSub.addToken which also calls the same PortfolioBridgeSub function. \
Similarly, ALOT from the Avalanche Mainnet can only be removed by PortfolioBridgeSub.removeToken
if it was added by mistake. All other tokens should be removed with PortfolioSub.removeToken.

```solidity:no-line-numbers
function addToken(bytes32 _srcChainSymbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode, bytes32 _subnetSymbol, uint256 _bridgeFee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _tokenAddress | address | Mainnet token address the symbol or zero address for AVAX |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
|  | enum ITradePairs.AuctionMode |  |
| _subnetSymbol | bytes32 | Subnet Symbol of the token (Shared Symbol of the same token from different chains) |
| _bridgeFee | uint256 |  |

#### removeToken

Remove the token from the tokenDetailsMapById and tokenInfoMapBySymbolChainId

**Dev notes:** \
Make sure that there are no in-flight messages

```solidity:no-line-numbers
function removeToken(bytes32 _srcChainSymbol, uint32 _srcChainId, bytes32 _subnetSymbol) external returns (bool deleted)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _srcChainId | uint32 | Source Chain id |
| _subnetSymbol | bytes32 | symbol of the token |

#### getAllBridgeFees

Returns the bridge fees for all the host chain tokens of a given subnet token

```solidity:no-line-numbers
function getAllBridgeFees(bytes32 _symbol, uint256 _quantity) external view returns (uint256[] bridgeFees, uint32[] chainIds)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | subnet symbol of the token |
| _quantity | uint256 | quantity of the token to withdraw |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgeFees | uint256[] | Array of bridge fees for each corresponding chainId |
| chainIds | uint32[] | Array of chainIds for each corresponding bridgeFee |

#### setBridgeFees

Sets the bridge fee for each token calculated offChain for the targetChainId

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setBridgeFees(uint32 _dstChainListOrgChainId, bytes32[] _tokens, uint256[] _bridgeFees) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _tokens | bytes32[] | Array of Subnet Symbol |
| _bridgeFees | uint256[] | Array of  bridge fees |

#### getTokenDetails

Returns the token details.

**Dev notes:** \
Will always return here as actionMode.OFF as auctionMode is controlled in PortfolioSub.
Subnet does not have any ERC20s, hence the tokenAddress is token's mainnet address.
See the TokenDetails struct in IPortfolio for the full type information of the return variable.

```solidity:no-line-numbers
function getTokenDetails(bytes32 _symbolId) external view returns (struct IPortfolio.TokenDetails)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | SymbolId of the token. |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPortfolio.TokenDetails | TokenDetails decimals (Identical to mainnet), tokenAddress (Token address at the mainnet) |

#### getTokenList

List of the tokens in the PortfolioBridgeSub

```solidity:no-line-numbers
function getTokenList() external view returns (bytes32[])
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | bytes32[]  Array of symbols of the tokens |

#### sendXChainMessage

Sends XFER message to the destination chain

**Dev notes:** \
This is a wrapper to check volume and threshold while withdrawing

```solidity:no-line-numbers
function sendXChainMessage(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) external payable virtual returns (uint256 messageFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination ChainListOrg chain id |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge type to send over |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address |  |

#### renameToken

Changes the mapping from one symbol to the other symbol

**Dev notes:** \
Only admin can call this function. After the March 2024 upgrade we need to rename
3 current subnet symbols BTC.b, WETH.e and USDt to BTC, ETH, USDT to support multichain trading.
The current inventory is completely from Avalanche C Chain which is the default destination for
the subnet. So there is no inventory comingling until we onboard a new chain. The conversions can
be done after the second mainnet but better to do it before for simplicity

```solidity:no-line-numbers
function renameToken(uint32 _dstChainListOrgChainId, bytes32 _fromSymbol, bytes32 _toSymbol) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination ChainListOrg chain id |
| _fromSymbol | bytes32 | Original subnet token symbol |
| _toSymbol | bytes32 | New subnet token symbol |

#### setDelayedTransfer

Set DelayedTransfers address

**Dev notes:** \
Only admin can set DelayedTransfers address.

```solidity:no-line-numbers
function setDelayedTransfer(address _delayedTransfers) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delayedTransfers | address | DelayedTransfers address |

#### executeDelayedTransfer

Executes delayed transfer if the delay period has passed

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function executeDelayedTransfer(uint16 _dstChainId, bytes32 _id) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainId | uint16 | lz destination chain id |
| _id | bytes32 | Transfer ID |

#### setInventoryManager

```solidity:no-line-numbers
function setInventoryManager(address _inventoryManager) external
```

### Internal

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() internal
```

#### getTokenId

Returns the symbolId of the targetChainId

**Dev notes:** \
PortfolioBridgeSub uses its internal token list & the defaultTargetChain to resolve the mapping
When sending from Mainnet to Subnet we send out the symbolId of the sourceChain. USDC => USDC43114
Because the subnet needs to know about different ids from different mainnets.
When sending messages Subnet to Mainnet, it resolves it back to the symbolId the target chain expects

```solidity:no-line-numbers
function getTokenId(uint32 _dstChainListOrgChainId, bytes32 _symbol) internal view returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _symbol | bytes32 | symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId for the destination |

#### getSymbolForId

Returns the locally used symbol given the symbolId

**Dev notes:** \
Mainnet receives the messages in the same format that it sent out, by symbolId

```solidity:no-line-numbers
function getSymbolForId(bytes32 _id) internal view returns (bytes32)
```

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId |

#### updateInventoryBySource

Overriding empty function from PortfolioBridgeMain

**Dev notes:** \
Update the inventory by each chain only in the Subnet.
Inventory available per host chain. i.e. USDC may exist in both Avalanche and Arbitrum

```solidity:no-line-numbers
function updateInventoryBySource(struct IPortfolio.XFER _xfer) internal
```

