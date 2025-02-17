---
headerDepth: 4
---

# PortfolioBridgeSub

**PortfolioBridgeSub: Bridge aggregator and message relayer for Dexalot L1(subnet) using multiple
different bridges**

This contracts checks volume and threshold limits for withdrawals if they are enabled in the
DelayedTransfers Contract that implements delayedTransfers as well as volume caps per epoch per token

**Dev notes:** \
Unlike PortfolioBridgeMain, PortfolioBridgeSub has its own internal list of tokenDetailsMapById and
tokenInfoMapBySymbolChainId because it has to keep track of the tokenDetails from each chain independently.
As a result the PortfolioSub tokenDetails are quite different than the PortfolioBridgeSub tokenDetails.
PortfolioBridgeSub always maps the symbol that it receives into a Dexalot L1(subnet) symbol and also attaches
the source chainId to the source Symbol to construct a symbolId to facilitate inventory management on receipt.
PortfolioSub expects the Dexalot L1(subnet) symbol. i.e USDt is mapped to (USDT43113, USDT) as symbolId and
Dexalot L1(subnet) symbol respectively. Similarly USDTx from another chain can also be mapped to USDC. This way
liquidity can be combined and traded together in a multichain implementation.
Similarly it keeps track of the token positions from each chain independently and it will have a different bridge
fee depending on the available inventory at the target chain (where the token will be withdrawn).
When sending back to the host chain, it maps the Dexalot L1(subnet) symbol back to the expected symbol by the host chain,
i.e ETH to ETH if sent back to Ethereum, ETH to WETH.e if sent to Avalanche. \
Symbol mapping happens in sendXChainMessageInternal on the way out. sendXChainMessageInternal uses getDestChainSymbol.
On the receival, the symbol mapping will happen in processPayload. getSymbolMappings is used where
xfer.symbol is overridden with symbolId (sourceSymbol + sourceChainId) and also the Dexalot L1(subnet) symbol is returned. \
The XChainXFerMessage always contains the host chain&#x27;s ERC20 Symbol in xfer.symbol &amp; source Chain id in
remoteChainId on the way in and out.

## Variables

### Public

| Name | Type |
| --- | --- |
| DEFAULT_MAX_BRIDGE_FEE_CAP | uint16 |
| TENK | uint256 |
| delayedTransfers | contract IDelayedTransfers |
| inventoryManager | contract IInventoryManager |
| optionsGasCost | mapping(uint256 &#x3D;&gt; uint256) |

### Private

| Name | Type |
| --- | --- |
| bridgeFeeMultipler | mapping(enum IPortfolioBridge.BridgeProvider &#x3D;&gt; uint256) |
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
function getBridgeFee(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes32 _symbol, uint256 _quantity, bytes1 _options) public view returns (uint256 bridgeFee)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider to use |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _symbol | bytes32 | Dexalot L1(subnet) symbol of the token |
| _quantity | uint256 | quantity of the token to withdraw |
| _options | bytes1 | Custom options for the withdrawal transaction |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgeFee | uint256 | bridge fee for the destination |

### External

#### addToken

Adds the given token to the PortfolioBridgeSub. PortfolioBridgeSub the list will be bigger as they could
be from different mainnet chains

**Dev notes:** \
`addToken` is only callable by admin or from Portfolio when a new Dexalot L1(subnet) symbol is added for the
first time. The same Dexalot L1(subnet) symbol but a different symbolId is required when adding a token to
PortfolioBridgeSub. \
Sample Token List in PortfolioBridgeSub: (BTC & ALOT Listed twice with 2 different chain ids) \
Native symbol is also added as a token with 0 address \
Symbol, SymbolId, Decimals, address, auction mode (432204: Dexalot L1 ChainId, 43114: Avalanche C-ChainId) \
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
function addToken(bytes32 _srcChainSymbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, uint8 _l1Decimals, enum ITradePairs.AuctionMode, bytes32 _subnetSymbol, uint256 _bridgeFee) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcChainSymbol | bytes32 | Source Chain Symbol of the token |
| _tokenAddress | address | Mainnet token address the symbol or zero address for AVAX |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
| _l1Decimals | uint8 | Decimals of the token in the Dexalot L1 param   ITradePairs.AuctionMode  irrelevant for PBridge |
|  | enum ITradePairs.AuctionMode |  |
| _subnetSymbol | bytes32 | Dexalot L1(subnet) Symbol of the token (Shared Symbol of the same token from different chains) |
| _bridgeFee | uint256 | Bridge Fee |

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

#### setL1Decimals

Sets the dexalot L1 decimals for the given token

**Dev notes:** \
Only callable by admin, removable in future releases

```solidity:no-line-numbers
function setL1Decimals(bytes32 _symbolId, uint8 _l1Decimals) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbolId | bytes32 | Symbol id of the token |
| _l1Decimals | uint8 | Decimals of the token in the Dexalot L1 |

#### getAllBridgeFees

Returns the valid bridge fees for all the host chain tokens of a given Dexalot L1(subnet) token

```solidity:no-line-numbers
function getAllBridgeFees(enum IPortfolioBridge.BridgeProvider _bridge, bytes32 _symbol, uint256 _quantity, bytes1 _options) external view returns (uint256[] bridgeFees, uint32[] chainIds)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider to use |
| _symbol | bytes32 | Dexalot L1(subnet) symbol of the token |
| _quantity | uint256 | quantity of the token to withdraw |
| _options | bytes1 | Custom options for the withdrawal transaction |

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
function setBridgeFees(uint32 _dstChainListOrgChainId, bytes32[] _tokens, uint240[] _bridgeFees) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _tokens | bytes32[] | Array of Dexalot L1(subnet) Symbol |
| _bridgeFees | uint240[] | Array of  bridge fees |

#### getTokenDetails

Returns the token details.

**Dev notes:** \
Will always return here as actionMode.OFF as auctionMode is controlled in PortfolioSub.
Dexalot L1(subnet) does not have any ERC20s, hence the tokenAddress is token's mainnet address.
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
function sendXChainMessage(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) external payable virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination ChainListOrg chain id |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge type to send over |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address |  |

#### setOptionGasCost

Sets the gas cost multiplier for a given option

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setOptionGasCost(enum IPortfolio.Options _option, uint256 _gasMultiplier) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _option | enum IPortfolio.Options | Option to set the gas cost for |
| _gasMultiplier | uint256 | Gas cost multiplier |

#### processPayload

Processes message received from source chain via bridge in the Dexalot L1(subnet).

**Dev notes:** \
if bridge is disabled or PAUSED and there are messages in flight, we still need to
                process them when received at the destination.
                Resolves the subnetSymbol and updates the inventory

```solidity:no-line-numbers
function processPayload(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _srcChainListOrgChainId, bytes _payload) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to receive message from |
| _srcChainListOrgChainId | uint32 | Source chain ID |
| _payload | bytes | Payload received |

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
function executeDelayedTransfer(bytes32 _id) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Transfer ID |

#### setInventoryManager

Set InventoryManager address

**Dev notes:** \
Only admin can set InventoryManager address.

```solidity:no-line-numbers
function setInventoryManager(address _inventoryManager) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _inventoryManager | address | InventoryManager address |

#### setBridgeFeeMultipler

Set the bridge fee multipler for a given bridge

**Dev notes:** \
Only admin can set the bridge fee multipler

```solidity:no-line-numbers
function setBridgeFeeMultipler(enum IPortfolioBridge.BridgeProvider _bridge, uint256 _multipler) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider to use |
| _multipler | uint256 | Multipler to set |

#### setMaxBridgeFeeCaps

Set the max bridge fee cap for a given token

**Dev notes:** \
Only admin can set the max bridge fee cap

```solidity:no-line-numbers
function setMaxBridgeFeeCaps(uint32 _dstChainListOrgChainId, bytes32[] _tokens, uint16[] _maxBridgeFeeCaps) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _tokens | bytes32[] | array of Dexalot L1(subnet) symbols |
| _maxBridgeFeeCaps | uint16[] | array of max bridge fee caps to set |

#### truncateQuantity

Truncate the quantity to the token's mainnet decimals

```solidity:no-line-numbers
function truncateQuantity(uint32 _dstChainListOrgChainId, bytes32 _symbol, uint256 _quantity, uint256 _bridgeFee) external view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _symbol | bytes32 | Dexalot L1(subnet) symbol of the token |
| _quantity | uint256 | quantity of the token to withdraw |
| _bridgeFee | uint256 | bridge fee for the destination |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | truncated quantity |

### Internal

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() internal
```

#### sendXChainMessageInternal

Actual internal function that implements the message sending.

```solidity:no-line-numbers
function sendXChainMessageInternal(uint32 _dstChainListOrgChainId, enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer, address _userFeePayer) internal virtual
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | the destination chain identifier |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge to send message to |
| _xfer | struct IPortfolio.XFER | XFER message to send |
| _userFeePayer | address | Address of the user who pays the bridge fee, zero address for PortfolioBridge |

#### _calcBridgeFee

Calculate the bridge fee for a given bridge

```solidity:no-line-numbers
function _calcBridgeFee(enum IPortfolioBridge.BridgeProvider _bridge, uint32 _dstChainListOrgChainId, bytes32 _symbol, uint256 _quantity, uint256 _inventoryFee, bytes1 _options) internal view returns (uint256)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge provider to use |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _symbol | bytes32 | Dexalot L1(subnet) symbol of the token |
| _quantity | uint256 |  |
| _inventoryFee | uint256 |  |
| _options | bytes1 |  |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | bridgeFee  bridge fee for the destination |

### Private

#### getDestChainSymbol

Returns the target symbol & symbolId given the destination chainId

**Dev notes:** \
PortfolioBridgeSub uses its internal token list & the defaultTargetChain to resolve the mapping
When sending from Mainnet to Dexalot L1(subnet) we send out the symbol of the sourceChain. BTC.b => BTC.b
When sending messages back to mainnet we use this function to resolve the symbol.
BTC could be resolved to BTC.b for avalanche and WBTC for Arbitrum

```solidity:no-line-numbers
function getDestChainSymbol(uint32 _dstChainListOrgChainId, bytes32 _subnetSymbol) private view returns (bytes32 dstSymbol, bytes32 dstSymbolId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dstChainListOrgChainId | uint32 | destination chain id |
| _subnetSymbol | bytes32 | Dexalot L1(subnet) symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstSymbol | bytes32 | symbol of the target chain |
| dstSymbolId | bytes32 | symbolId of the target chain used for inventory management |

#### getSymbolMappings

Returns the Dexalot L1(subnet) symbol & symbolId given the chainListOrgChainId & source chain symbol

**Dev notes:** \
Mainnet receives the messages in the same format that it sent out, by its ERC20 symbol
Dexalot L1(subnet) has its own standardized list of symbols i.e. BTC.b in the mainnet may be mapped to BTC
in the Dexalot L1(subnet). \
The Dexalot L1(subnet) knows which chain the message is coming from and will tag the chainId to the sourceSymbol
to keep track of the inventory coming from different mainnets.

```solidity:no-line-numbers
function getSymbolMappings(uint32 _chainListOrgChainId, bytes32 _symbol) private view returns (bytes32 subnetSymbol, bytes32 symbolId)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainListOrgChainId | uint32 | source/Destination chain id |
| _symbol | bytes32 | source symbol |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| subnetSymbol | bytes32 | subnetSymbol |
| symbolId | bytes32 | symbolId of the source/destination Chain, symbol + chainId |

#### updateInventoryBySource

Update the inventory by each chain only in the Dexalot L1(subnet).

**Dev notes:** \
Inventory available per host chain. i.e. USDC may exist in both Avalanche and Arbitrum

```solidity:no-line-numbers
function updateInventoryBySource(bytes32 _subnetSymbol, struct IPortfolio.XFER _xfer) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _subnetSymbol | bytes32 | Dexalot L1(subnet) Symbol |
| _xfer | struct IPortfolio.XFER | Transfer Message |

