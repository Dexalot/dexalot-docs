---
headerDepth: 4
---

# BannedAccounts

**Banned accounts storage contract**

This contract is used to manage a list of banned accounts. A banned account
is not allowed to deposit into Dexalot portfolio to engage in any activity on
Dexalot subnet.

## Struct Types

### BannedAccount

```solidity
struct BannedAccount {
  enum IBannedAccounts.BanReason reason;
  bool banned;
}
```

## Variables

### Public

| Name | Type |
| --- | --- |
| BAN_ADMIN_ROLE | bytes32 |
| VERSION | bytes32 |
| bannedAccounts | mapping(address &#x3D;&gt; struct BannedAccounts.BannedAccount) |

## Events

### BanStatusChanged

```solidity:no-line-numbers
event BanStatusChanged(address account, enum IBannedAccounts.BanReason reason, bool banned)
```

## Methods

### Public

#### initialize

Initialize the upgradeable contract

```solidity:no-line-numbers
function initialize(address _banAdmin) public
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _banAdmin | address | Address of the EOA that is allowed to update banned accounts |

### External

#### banAccount

Ban an account

```solidity:no-line-numbers
function banAccount(address _account, enum IBannedAccounts.BanReason _reason) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to be added to the banned accounts |
| _reason | enum IBannedAccounts.BanReason | Reason for the ban, e.g. BanReason.OFAC |

#### banAccounts

Ban an array of accounts

```solidity:no-line-numbers
function banAccounts(address[] _accounts, enum IBannedAccounts.BanReason[] _reasons) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _accounts | address[] | Array of addresses to be added to the banned accounts |
| _reasons | enum IBannedAccounts.BanReason[] | Array of reasons for the ban |

#### unbanAccount

Unban an account

```solidity:no-line-numbers
function unbanAccount(address _account) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to be removed from banned accounts |

#### unbanAccounts

Unban an array of accounts

```solidity:no-line-numbers
function unbanAccounts(address[] _accounts) external
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _accounts | address[] | Array of addresses to be removed from the banned accounts |

#### isBanned

Returns the ban status of an address

```solidity:no-line-numbers
function isBanned(address _account) external view returns (bool)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to be checked for its ban status |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool Ban status - true = banned or false = not banned |

#### getBanReason

Returns the ban reason of an address

```solidity:no-line-numbers
function getBanReason(address _account) external view returns (enum IBannedAccounts.BanReason)
```

##### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to be checked for its ban status |

##### Return values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IBannedAccounts.BanReason | BanReason Ban reason = [NOTBANNED, OFAC, ABUSE, TERMS] |

