---
headerDepth: 4
---

# PortfolioBridgeSub

**PortfolioBridgeSub: Bridge aggregator and message relayer for subnet using multiple different bridges**

This contracts checks volume and threshold limits for withdrawals if they are enabled

**Dev notes:** \
It implements delayedTransfers as well as volume caps per epoch per token
Unlike PortfolioBridgeMain, PortfolioBridgeSub has its own internal list of tokenDetailsMapById and
tokenDetailsMapBySymbolChainId because it has to keep track of the tokenDetails from each chain independently.
As a result the PortfolioSub tokenDetails are quite different than the PortfolioBridgeSub tokenDetails.
PortfolioBridgeSub always maps the symbol that it receives into a subnet symbol on receipt, that PortfolioSub
expects. i.e USDC43114 is mapped to USDC. Similarly USDC1 can also be mapped to USDC. This way liquidity can
be combined and traded together in a multichain implementation.
When sending back to the target chain, it maps it back to the expected symbol by the target chain,
i.e USDC to USDC1 if sent back to Ethereum, USDC43114 if sent to Avalanche. \
Symbol mapping happens in packXferMessage on the way out. packXferMessage calls getTokenId that has
different implementations in PortfolioBridgeMain &amp; PortfolioBridgeSub. On the receival, the symbol mapping
will happen in different functions, either in processPayload or in getXFerMessage.
We need to raise the XChainXFerMessage before xfer.symbol is mapped in processPayload function so the
incoming and the outgoing xfer messages always contain the symbolId rather than symbol. \

## Variables

### Public

| Name | Type |
| --- | --- |
| defaultTargetChainId | uint32 |
| delayPeriod | uint256 |
| delayedTransfers | mapping(bytes32 &#x3D;&gt; struct IPortfolio.XFER) |
| delayThresholds | mapping(bytes32 &#x3D;&gt; uint256) |
| epochLength | uint256 |
| epochVolumes | mapping(bytes32 &#x3D;&gt; uint256) |
| epochVolumeCaps | mapping(bytes32 &#x3D;&gt; uint256) |
| lastOpTimestamps | mapping(bytes32 &#x3D;&gt; uint256) |
| tokenDetailsMapById | mapping(bytes32 &#x3D;&gt; struct IPortfolio.TokenDetails) |
| tokenDetailsMapBySymbolChainId | mapping(bytes32 &#x3D;&gt; mapping(uint32 &#x3D;&gt; bytes32)) |

### Private

| Name | Type |
| --- | --- |
| tokenListById | struct EnumerableSetUpgradeable.Bytes32Set |

## Events

### DelayedTransfer

```solidity:no-line-numbers
event DelayedTransfer(string action, bytes32 id, struct IPortfolio.XFER xfer)
```

### DelayPeriodUpdated

```solidity:no-line-numbers
event DelayPeriodUpdated(uint256 period)
```

### DelayThresholdUpdated

```solidity:no-line-numbers
event DelayThresholdUpdated(bytes32 symbol, uint256 threshold)
```

### EpochLengthUpdated

```solidity:no-line-numbers
event EpochLengthUpdated(uint256 length)
```

### EpochVolumeUpdated

```solidity:no-line-numbers
event EpochVolumeUpdated(bytes32 token, uint256 cap)
```

## Methods

### Public

#### VERSION

```solidity:no-line-numbers
function VERSION() public pure returns (bytes32)
```

### External

#### addToken

Adds the given token to the portfolioBridge. PortfolioBridgeSub the list will be bigger as they could
be from different mainnet chains

**Dev notes:** \
`addToken` is only callable by admin or from Portfolio when a new subnet symbol is added for the
first time. The same subnet symbol but different symbolId are required when adding a token to
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
function addToken(bytes32 _symbol, address _tokenAddress, uint32 _srcChainId, uint8 _decimals, enum ITradePairs.AuctionMode) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | Symbol of the token |
| _tokenAddress | address | Mainnet token address the symbol or zero address for AVAX |
| _srcChainId | uint32 | Source Chain id |
| _decimals | uint8 | Decimals of the token |
|  | enum ITradePairs.AuctionMode |  |

#### removeToken

Remove the token from the tokenDetailsMapById and tokenDetailsMapBySymbolChainId

**Dev notes:** \
Make sure that there are no in-flight messages

```solidity:no-line-numbers
function removeToken(bytes32 _symbol, uint32 _srcChainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |
| _srcChainId | uint32 | Source Chain id |

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

#### setDefaultTargetChain

Sets the default target chain id. To be extended with multichain implementation

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDefaultTargetChain(uint32 _chainId) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainId | uint32 | Default Chainid to use |

#### getTokenList

List of the tokens in the portfolioBridge

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
function sendXChainMessage(enum IPortfolioBridge.BridgeProvider _bridge, struct IPortfolio.XFER _xfer) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bridge | enum IPortfolioBridge.BridgeProvider | Bridge type to send over |
| _xfer | struct IPortfolio.XFER | XFER message to send |

#### setDelayThresholds

Sets delay thresholds for tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDelayThresholds(bytes32[] _tokens, uint256[] _thresholds) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _thresholds | uint256[] | Array of thresholds |

#### setDelayPeriod

Sets delay period for delayed transfers

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setDelayPeriod(uint256 _period) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _period | uint256 | Delay period in seconds |

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

#### setEpochLength

Sets epoch length for volume control

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setEpochLength(uint256 _length) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _length | uint256 | Epoch length in seconds |

#### setEpochVolumeCaps

Sets volume cap for tokens

**Dev notes:** \
Only admin can call this function

```solidity:no-line-numbers
function setEpochVolumeCaps(bytes32[] _tokens, uint256[] _caps) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | bytes32[] | Array of tokens |
| _caps | uint256[] | Array of caps |

### Internal

#### addNativeToken

private function that handles the addition of native token

**Dev notes:** \
gets the native token details from portfolio

```solidity:no-line-numbers
function addNativeToken() internal
```

#### getTokenId

Returns the symbolId used the subnet given the targetChainId

**Dev notes:** \
PortfolioBridgeSub uses its internal token list & the defaultTargetChain to resolve the mapping
When sending from Mainnet to Subnet we send out the symbolId of the sourceChain. USDC => USDC43114
Because the subnet needs to know about different ids from different mainnets.
When sending messages Subnet to Mainnet, it resolves it back to the symbolId the target chain expects

```solidity:no-line-numbers
function getTokenId(bytes32 _symbol) internal view returns (bytes32)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _symbol | bytes32 | symbol of the token |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32  symbolId |

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

#### checkTresholds

Checks the volume and thresholds to delay or execute immediately

**Dev notes:** \
This function is called both in processPayload (deposits coming from mainnet)
as well as sendXChainMessage (withdrawals from the subnet)
Not bridge specific! Delayed messages will be processed by the defaultBridge
symbolId has already been mapped to symbol for the portfolio to properly process it

```solidity:no-line-numbers
function checkTresholds(struct IPortfolio.XFER _xfer) internal returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xfer | struct IPortfolio.XFER | XFER message |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool  True if the transfer can be executed immediately, false if it is delayed |

### Private

#### addDelayedTransfer

Adds transfer to delayed queue

```solidity:no-line-numbers
function addDelayedTransfer(bytes32 _id, struct IPortfolio.XFER _xfer) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Transfer ID |
| _xfer | struct IPortfolio.XFER | XFER message |

#### updateVolume

Updates volume for token. Used only for withdrawals from the subnet.

**Dev notes:** \
Does nothing if there is no cap/limit for the token
Volume treshold check for multiple small transfers within a epoch.

```solidity:no-line-numbers
function updateVolume(bytes32 _token, uint256 _amount) private
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | bytes32 | Token symbol |
| _amount | uint256 | Amount to add to volume |

