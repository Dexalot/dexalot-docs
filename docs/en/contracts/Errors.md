# Mapping of Error Codes and Messages

The error messages can be retrieved programmatically using [get-revert-reason](/apiv2/Contracts.html#get-revert-reason).

## Airdrop

A-CNET-01: contract does not have enough tokens

A-MPNV-01: Merkle proof is not valid for claim

A-MPNV-02: Merkle proof is not valid for releasableAmount

A-NTAD-01: no tokens are due for claim

A-TOOE-01: too early

## AirdropV1

A1-CNET-01: contract does not have enough tokens

A1-MPNV-01: Merkle proof is not valid

A1-THAC-01: tokens have already been claimed

## BannedAccounts

BA-LENM-01: number of banned accounts and ban reasons do not match

## DefaultBridgeApp

DB-OPBA-01: only portfolio bridge allowed to call this function

DB-PBNZ-01: portfolio bridge must not be zero address

DB-RCNM-01: remote contract for source does not match sender

DB-RCNS-01: remote chain info for destination not set

DB-RCNS-02: remote chain info for source not set

## Exchange

E-ALOA-01: at least one account needed in admin group

E-NFUN-01: unknown function call

E-OACC-01: default or auction admin account needed

E-OACC-02: default admin account needed for pauseTradePair

E-OACC-03: auction account needed for pauseTradePair

E-OACC-04: AuctionAmin can only perform this operation on a TradePair that is in auction

E-OIZA-01: address can not be address(0)

E-TNAP-01: tokens need to be added to portfolio first

E-TNSA-01: token in portfolio is not in the same auction mode/quote token can never be in auction

## GasStation

GS-ASBTZ-02: gasAmount must be greater than 0 in setGasAmount

GS-ASBTZ-03: gasAmount must be greater than 0 in withdrawNative

GS-ASBTZ-04: amount of gas request should be <= gasAmount

GS-FAIL-01: send failed in requestGas

GS-FAIL-02: send failed in withdrawNative

GS-NFUN-01: unknown function call

GS-ZADDR-01: cannot request gas to zero address(0)

## ICMApp

IC-ARNZ-01: add relayer address must be non-zero

IC-GLNS-01: gas limit not set for msgType

IC-SRNZ-01: set relayer addresses must be non-zero

## IncentiveDistributor

ID-AGCB-01: amount greater than contract balance

ID-NTTC-01: no reward tokens to claim

ID-RTPC-01: reward tokens previously claimed

ID-SIGN-01: invalid claim inputs, user, tokenId, amounts or signer does not match signature

ID-TACM-01: number of tokens and claim amounts mismatch, no. of tokens less than no. of claims

ID-TACM-02: number of tokens and claim amounts mismatch, no. of tokens greater than no. of claims

ID-TDNE-01: tokenId does not exist

ID-TDNE-02: tokenId does not exist

ID-ZADDR-01: cannot initialize signer with zero address(0)

ID-ZADDR-02: cannot initialize portfolio with zero address(0)

## InventoryManager

IM-ATNP-01: new time for future A is not permitted

IM-AVNP-01: new value for A is not permitted

IM-BTNE-01: block time not elapsed for future A time and A to be updated

IM-INVT-01: target chain does not have enough inventory to cover this withdrawal

IM-INVT-02: target chain does not have enough inventory to cover this withdrawal

IM-LENM-01: length mismatch in array type function parameters

IM-NVSI-01: not valid symbolId, symbolId does not exist in portfolio bridge

IM-NVSI-02: not valid symbolId, symbolId still exists in portfolio bridge

IM-SIAE-01: symbolId and inventory already exist

IM-SMEB-01: symbols cannot be empty bytes

IM-ZADDR-01: portfolio bridge sub cannot be the zero address

## LzApp

LA-DCNT-01: destination chain is not a trusted source

LA-LIZA-01: endpoint cannot be zero address(0)

## LzAppV2

LZ-EONS-01: enforced options not set for msgType

## Portfolio

P-AFNE-01: available funds not enough while entering order

P-AFNE-02: available funds not enough while attempting to transfer tokens between accounts

P-ALOA-01: at least one account needed in admin group

P-ALOA-02: can not remove PortfolioBridge from PORTFOLIO_BRIDGE_ROLE, use setPortfolioBridge function instead

P-AUCT-01: can not withdraw/transfer auction token before auction is finalized

P-BANA-01: account banned

P-BLTH-01: subnet wallet balance (Gas Tank) under threshold

P-CNAT-01: cannot add 0 decimals token

P-CNFF-01: collect native fee failed

P-DOTS-01: origin and destination addresses should be different

P-DUTH-01: deposit under threshold

P-ETNS-01: token is not supported in the subnet

P-ETNS-02: token is not supported in the host chain

P-GSRO-01: gasSwapRatio needs to be > 0

P-LENM-01: length mismatch in array type function parameters

P-MDML-01: minimum deposit multipler can not be less than 10 (10/10)

P-MTNZ-01: min taker rate can not be 0

P-NDNS-01: native deposits not supported

P-NETD-01: not enough ERC20 token balance to deposit

P-NFUN-01: unknown function call

P-NQTR-01: native token quantity truncated but refund failed

P-NTDP-01: deposits paused

P-NZBL-01: cannot remove token if there is non-zero balance

P-OACC-01: admin account needed for this function

P-OACC-02: address can not be address(0)

P-OACC-03: only TradePairs contract call this function

P-OACC-04: only TradePairs contract or admin can call this function

P-OODT-01: only owner can deposit erc20 tokens

P-OOWN-01: only owner can withdraw native token

P-OOWN-02: only owner can deposit native token

P-OOWT-01: only owner can withdraw ERC20 tokens

P-OWTF-01: can only withdraw from treasury or feeAddress

P-PTNS-01: main processXFerPayload transaction not supported

P-PTNS-02: sub processXFerPayload transaction not supported

P-SBPD-01: set bridge param incorrect decimals, must be truncated

P-SCEM-01: source Chain Id should be the same as specified in Portfolio Main

P-TAEX-01: token already exists

P-TDDM-01: Token decimals do not match

P-TNBC-01: token not been converted

P-TNEF-01: transaction amount not enough to cover fees

P-TSDM-01: token symbols do not match

P-TTNZ-01: tokanTotals needs to be 0

P-VLBF-01: msg.value is less than the native bridge fee for deposit

P-WNFA-01: withdrawNative failed

P-WUTH-01: withdraw under threshold

P-ZADDR-01: token address cannot be zero address(0)

P-ZADDR-02: trader address cannot be zero address(0)

P-ZETD-01: zero erc20 token quantity

## PortfolioBridge

PB-ALOA-01: at least one account needed in admin group

PB-ALOA-02: can not remove Portfolio from PORTFOLIO_ROLE, use setPortfolio instead

PB-BCNE-01: bridge contract not enabled

PB-CBIZ-01: balance of this contract is 0, send gas for message fees

PB-CBIZ-02: balance of this contract is 0, send gas for message fees

PB-CCTR-01: CCTRADE is not a valid transaction type in the subnet

PB-CCTR-02: symbol not allowed for CCTRADE at destination

PB-CCTR-03: can only receive non-virtual tokens with CCTRADE

PB-CSDE-01: destination for celerSend is not allowed

PB-DBCD-01: default bridge can not be disabled

PB-DDNS-01: destination not found when calling getTokenId

PB-DDNS-02: destination not found when calling sendXChainMessageInternal

PB-DDNZ-01: default destination chain id must be non zero

PB-DTAE-01: delayed transfer already exists

PB-DTNE-01: delayed transfer does not exist

PB-DTSL-01: delayed transfer still locked

PB-ETNS-01: erc20 token is not supported

PB-FRFD-01: failed to refund

PB-GASF-01: gas airdrop send fails

PB-INVT-01: target chain does not have enough inventory to cover this withdrawal

PB-INVZ-01: inventoryBySymbolId needs to be 0

PB-IUMF-01: insufficient user message fee received

PB-IVEC-01: invalid endpoint caller

PB-LENM-01: length mismatch in array type function parameters

PB-MING-01: gas can not be less than 200000 minimum gas required

PB-MPGT-01: bridge fee multiplier is greater than 100%

PB-NFUN-01: unknown function call

PB-OACC-01: admin account or PORTFOLIO_ROLE needed for this function

PB-OBSA-01: old bridge provider still active

PB-RBNE-01: requested bridge not enabled

PB-RBNE-03: requested bridge not enabled for bridge fee

PB-SDMP-01: symbol doesn't match Portfolio's common symbol

PB-SINA-01: source not allowed

PB-STNS-01: solana token address not set

PB-TAEX-01: token already exists

PB-UFPE-01: user fee payer address does not exist

PB-UFPR-01: user gas fee not necessary and refund failed

PB-VCAP-01: volume exceeds cap

PB-VTNS-01: virtual tokens can not be withdrawn

## PortfolioMinter

PM-NFUN-01: unknown function call

PM-ZADD-01: cannot initialize with 0 address

PM-ZAMT-01: mint amount must be greater than 0

## RBTLibrary

R-KDNE-01: key does not exist

R-KDNE-02: key does not exist

R-KEXI-01: key exists

R-KIEM-01: key is empty

R-KIEM-02: key is empty

R-TIEM-01: target is empty

R-TIEM-02: target is empty

## MainnetRFQ

RF-ALOA-01: at least one account needed in admin group

RF-BCAM-01: batch claim array mismatch

RF-DTNF-01: destination token not found

RF-IMS-01: invalid msg.sender

RF-IMV-01: invalid msg.value

RF-IN-01: invalid nonce

RF-IN-02: invalid nonce on xChain destination

RF-INVT-01: target chain does not have enough inventory to remove the xChainSwap from the queue

RF-IS-01: invalid order signature

RF-NFUN-01: unknown function call

RF-OCR-01: only callable by rebalancer

RF-PTNS-01: main processXFerPayload transaction not supported

RF-QE-01: quote expired due to manual override

RF-QE-02: quote expired due to block ts

RF-RAOW-01: rebalancer admin or wrapped token only allowed to deposit native token

RF-SAZ-01: set address to zero

RF-SPAM-01: slippage points array length mismatch

RF-SPMB-01: slippage points less than max slip bps

RF-STTA-01: slippage tolerance too aggressive

RF-TF-01: transfer failed

RF-TF-02: transfer failed

RF-ZADDR-01: trader address cannot be zero address(0)

RF-ZETD-01: zero erc20 token quantity

## Staking

S-CNSZ-01: cannot stake 0

S-CNWM-01: cannot withdraw more than staked

S-CNWZ-01: cannot withdraw 0 amount

S-DMBC-01: previous rewards period must be complete before changing the duration for the new period

S-PHBE-01: period has been ended

S-RCNZ-01: reward rate cannot be zero

S-SHBP-01: staking has been paused

S-SHBP-02: staking has been paused

## TradePairs

T-AOPA-01: addOrderPaused paused

T-AUCT-01: auction mode should be set to MATCHING

T-AUCT-02: too many decimals in the auction price

T-AUCT-03: auction price should be > 0 before matchAuctionOrders

T-AUCT-04: market orders not allowed in auction mode

T-AUCT-05: setAuctionMode can not turn on live trading when orderbook is crossed

T-CLOI-01: client order id has to be unique per trader

T-FOKF-01: FOK order can't be fully filled. Tx reverted

T-IVOT-01: invalid order type

T-LONR-01: Limit order type cannot be removed

T-LTMT-01: trade amount is less than minTradeAmount for the tradePair

T-LTPA-01: trade amount is less than minPostAmount. It can not be posted in the orderbook

T-MNOE-01: max number of fills has to be at least 10

T-MPNA-01: mirror pair not allowed

T-MTMT-01: trade amount is more than maxTradeAmount for the tradePair

T-OACC-01: admin account needed for this function

T-OAEX-01: order is already executed and cannot be canceled

T-OOCA-01: only msg.sender can add orders

T-OOCC-01: only owner of the order can cancel

T-OOCC-02: only owner of the order can cancel

T-POOA-01: Only PO(PostOnly) Orders allowed for this pair

T-PPAU-01: Pair paused

T-PPAU-02: cancelOrder pair paused

T-PPAU-04: Pair should be paused for this operation

T-RMTP-01: orderbook has to be empty to remove the tradePair

T-STPR-01: order cancled due to self trade prevention

T-T2PO-01: Post Only order is not allowed to be a taker

T-TMDP-01: too many decimals in the price

T-TMDQ-01: too many decimals in the quantity

T-USCL-01: unsolicited cancel from exchange

## TokenVesting

TV-BIZA-01: beneficiary is the zero address

TV-CLTD-01: cliff is longer than duration

TV-CNTR-01: cannot revoke

TV-DISZ-01: duration is too short

TV-FTBC-01: final time is before current time

TV-NBOC-01: no balance on the contract

TV-NTAD-01: no tokens are due

TV-NTAD-02: no tokens are due

TV-OPDA-01: only possible during auction

TV-PDBS-01: portfolio deposits begins after start

TV-PGTZ-01: percentage is greater than 100

TV-PGTZ-02: percentage is greater than 100

TV-PISZ-01: period is too short

TV-PIZA-01: portfolio is the zero address

TV-PIZA-02: portfolio is the zero address

TV-TEAR-01: too early

TV-TKAR-01: token already revoked

TV-TKNR-01: token not revoked

## TokenVestingV1

TV1-BIZA-01: beneficiary is the zero address

TV1-CLTD-01: cliff is longer than duration

TV1-CNTR-01: cannot revoke

TV1-DISZ-01: duration is too short

TV1-FTBC-01: final time is before current time

TV1-NBOC-01: no balance on the contract

TV1-NTAD-01: no tokens are due

TV1-NTAD-02: no tokens are due

TV1-OPDA-01: only possible during auction

TV1-PDBS-01: portfolio deposits begins after start

TV1-PGTZ-01: percentage is greater than 100

TV1-PGTZ-02: percentage is greater than 100

TV1-PIZA-01: portfolio is the zero address

TV1-PIZA-02: portfolio is the zero address

TV1-TEAR-01: too early

TV1-TKAR-01: token already revoked

TV1-TKNR-01: token not revoked

## TokenVestingCloneable

TVC-BIZA-01: beneficiary is the zero address

TVC-CLTD-01: cliff is longer than duration

TVC-CNTR-01: cannot revoke

TVC-DISZ-01: duration is too short

TVC-FTBC-01: final time is before current time

TVC-NBOC-01: no balance on the contract

TVC-NTAD-01: no tokens are due

TVC-NTAD-02: no tokens are due

TVC-OIZA-01: owner is the zero address

TVC-OPDA-01: only possible during auction

TVC-PDBS-01: portfolio deposits begins after start

TVC-PGTZ-01: percentage is greater than 100

TVC-PGTZ-02: percentage is greater than 100

TVC-PISZ-01: period is too short

TVC-PIZA-01: portfolio is the zero address

TVC-PIZA-02: portfolio is the zero address

TVC-TEAR-01: too early

TVC-TKAR-01: token already revoked

TVC-TKNR-01: token not revoked

## TokenVestingCloneFactory

TVCF-IOOB-01: index is out of bounds
