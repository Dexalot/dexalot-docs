---
editLink: true
---

# How to Run a Non-Validating Dexalot L1 Node

![runanode](/images/runanode/runanode.png)

## Introduction

Dexalot is an omni-chain decentralized exchange (DEX) that operates a central limit order book (CLOB) on its own sovereign blockchain within the Avalanche L1 ecosystem. It provides three distinct experiences to the users to access its superior prices and ample liquidity:

1. A centralized exchange experience with limit and market orders for experienced traders as well as casual traders requiring best prices and more control over their orders.
2. A swap experience that can be accessed from other connected chains catering more to traders looking for an AMM-like interface.
3. A programmatic trading experience through its APIs and well-documented contract interfaces for professional market makers and heavy traders.

Some users may want to interact with Dexalot running their own non-validating Avalanche node that tracks the Dexalot L1 blockchain in addition to the primary networks X, P, and C.

Running a non-validating node may be needed for several reasons:
- **Access to Full RPC Functionality**: It allows projects to have access to an Avalanche Network RPC server without the rate limitations imposed on public endpoints.
- **Backup Node**: It could serve as a ready replacement for validating nodes in case of issues.
- **Test Node**: It allows risk-free testing on a node for various configuration options and profiling.

This guide provides detailed instructions on setting up a non-validating Avalanche node that tracks Dexalot L1. The process involves downloading the AvalancheGo executable binary, adding the Subnet-EVM plugin, configuring the node to track the Dexalot L1 using these binaries, and ensuring it is properly synchronized with the network.

## Overview

We highly recommend the user to follow the official documentation from Ava Labs [Nodes & Validators](https://docs.avax.network/nodes) to run an Avalanche node to track the primary networks as a good starting point.

To successfully run a non-validating Avalanche node that tracks Dexalot L1, you'll perform the following high-level steps:
  - **Install the AvalancheGo Executable Binary**: Set up the base Avalanche node software, `avalanchego`, to connect to the primary networks.
  - **Download and Configure the Subnet-EVM Plugin**: Obtain the correct version of the Subnet-EVM plugin and configure it for Dexalot L1.
  - **Configure Dexalot L1 Specific Settings**: Add the latest `upgrade.json` file and enable state-sync if desired.
  - **Update Node Configuration to Track Dexalot L1**: Modify the node's configuration to include the Dexalot L1 tracking.
  - **Start and Monitor the Node**: Launch the node and monitor its status to ensure it's operating correctly.

### Note on State-Sync Option

If you are not planning on querying for historical chain data with older blocknumbers on the C-Chain you can start your node with state-sync enabled. It will reduce your storage needs significantly and cut down your bootstrapping time.  Review notes on [State Sync](https://docs.avax.network/nodes/chain-configs/c-chain#state-sync) to decide.  To enable it, you need to add the following option to your C-chain configuration at `~/.avalanchego/configs/chains/C/config.json` if you are using the standard installation locations.

```json
{
    "state-sync-enabled": true
}
```

Please note that a state-sync enabled node starts its database state from a relatively recent blocknumber.  Therefore, the bootstrapped database size for a state-sync node is a fraction of a full node. However, even for a state-sync node new blocks are continuously added to the database increasing its size at the same rate of a full node.  In short, over time storage management will be needed for a state-sync node as well.

### Prerequisites

    A machine running Ubuntu 22.04 (recommended) or a compatible Linux distribution.
    Basic knowledge of Linux command-line operations.
    Sufficient hardware resources as recommended by Ava Labs:
        CPU: Equivalent of 8 AWS vCPU or better.
        RAM: At least 16 GB.
        Storage: SSD with at least 500 GB of free space.
        Network: High-speed internet with at least 25 Mbps upload/download speed.

### Tips for Running a Stable Node

  - **Hardware Resources**: Ensure your hardware meets or exceeds the recommended specifications.
  - **Network Stability**: A stable internet connection is crucial for maintaining node uptime.
  - **Regular Updates**: Keep AvalancheGo and Subnet-EVM up-to-date by regularly checking for new releases.
  - **Monitoring**: Set up monitoring tools to alert you of any issues with your node.

### Port Settings

Ensure that necessary ports are open (default is `TCP/9651` for P2P and `TCP/9650` for API).  The access to `TCP/9650` needs to be managed to avoid unauthorized access to the API. On a validator node typically only `TCP/9651` would be open to public and `TCP/9650` would be available for local access. Adjust access to `TCP/9650` for a non-validating node based on your needs.

## Install AvalancheGo Executable Binary

Follow the instructions from Ava Labs documentation to install AvalancheGo Executable Binary from the link [installing AvalancheGo Executable Binary](https://docs.avax.network/nodes/using-install-script/installing-avalanche-go).

## Download Subnet-EVM Plugin Binary

Save the below script in your home directory as `get_evm.sh`.  This script will download the set version from Ava Labs' GitHub repo. You can check the latest release version from [Subnet-EVM Releases](https://github.com/ava-labs/subnet-evm/releases). The ReadMe file on this repo also provides a compatibility matrix between AvalancheGo and Subnet-EVM binaries.

```sh
#!/bin/sh

# this script downloads the specified version of subnet-evm plugin for avalanchego

VERSION=0.6.11  # check compatibility matrix from https://github.com/ava-labs/subnet-evm
                # typically you would need the latest compatible versions for both
                # AvalancheGo and Subnet-EVM binaries
OS=linux        # linux or darwin for macos
ARCH=amd64      # amd64 or arm64

# parametrized url on github
URL="https://github.com/ava-labs/subnet-evm/releases/download/v${VERSION}/subnet-evm_${VERSION}_${OS}_${ARCH}.tar.gz"

# get the archive with the specified subnet-evm version
curl -sSfL ${URL} -o "subnet-evm_${VERSION}_${OS}_${ARCH}.tar.gz"

# extract subnet-evm plugin binary from the archive
tar -zxf "subnet-evm_${VERSION}_${OS}_${ARCH}.tar.gz" "subnet-evm"

# rm archive
rm "subnet-evm_${VERSION}_${OS}_${ARCH}.tar.gz"

# gracefully exit the script
exit 0
```

Make the `get_evm.sh` script executable as follows:

```sh
chmnod u+rwx get_evm.sh
```

Now, run the script to get the subnet-evm plugin binary.

```sh
./get_evm.sh
```

## Rename the Subnet-EVM plugin binary and place it to the plugins directory

The plugin needs to have the correct VM ID as its name to function correctly. Use the table below to move `subnet-evm` to the plugins directory with the corresponding VM ID as its name.

| Network | VM ID                                             |
|---------|---------------------------------------------------|
| Fuji    | mDVSxzeWHpEU3eSqMwwGQsD787xGp7hv9Qgoe3R9SdjPapte8 |
| Mainnet | mDVSxzeWHmgqrcXK1tPYqavqTK5MC3mMqme6r3a6cz2fqMfqf |

When done correctly the directory tree where avalanchego binary is residing should look like this for fuji.

```sh
>ls *
avalanchego

plugins:
mDVSxzeWHpEU3eSqMwwGQsD787xGp7hv9Qgoe3R9SdjPapte8
```

## Copy the correct upgrade.json

Dexalot L1 is upgraded at various blocks over time like any other blockchain. The `upgrade.json` file tracks these hard forks and it needs to be placed to the right place to ensure the network can start and bootstrap correctly.

Copy the latest `upgrade.json` file from [Dexalot Public Chain Assets](https://github.com/Dexalot/dexalot-public-chain-assets) and place it to the parametrized location `~/.avalanchego/configs/chains/${BLOCKCHAIN_ID}/upgrade.json` with the correct blockchain ID from the table below.

| Network | Blockchain ID                                      |
|---------|----------------------------------------------------|
| Fuji    | XuEPnCE59rtutASDPCDeYw8geQaGWwteWjkDXYLWvssfuirde  |
| Mainnet | 21Ths5Afqi5r4PaoV8r8cruGZWhN11y5rxvy89K8px7pKy3P8E |

## Enable State-Sync on Dexalot L1

State-sync can also be enabled for Dexalot L1. The `config.json` file needs to be updated with the `"state-sync-enabled": true` option at the parametrized location `~/.avalanchego/configs/chains/${BLOCKCHAIN_ID}/config.json` with the correct blockchain ID from the table below to activate state-sync.

| Network | Blockchain ID                                      |
|---------|----------------------------------------------------|
| Fuji    | XuEPnCE59rtutASDPCDeYw8geQaGWwteWjkDXYLWvssfuirde  |
| Mainnet | 21Ths5Afqi5r4PaoV8r8cruGZWhN11y5rxvy89K8px7pKy3P8E |

## Add Dexalot L1 as a tracked chain to node configuration file

Before we can (re)start the avalanchego node we need to update the node config file so it knows that we want it to track Dexalot L1.  For that add `track-subnets` option to the `~/.avalanchego/configs/node.json` file using the corresponding Subnet ID from the table below.

```json
{
  "track-subnets": "${SUBNET_ID}"
}
```

| Network | Subnet ID                                          |
|---------|----------------------------------------------------|
| Fuji    | 9m6a3Qte8FaRbLZixLhh8Ptdkemm4csNaLwQeKkENx5wskbWP  |
| Mainnet | wenKDikJWAYQs3f2v9JhV86fC6kHZwkFZsuUBftnmgZ4QXPnu  |

## Restart your node and monitor its bootstrapping

### Restart AvalancheGo Service

```sh
sudo systemctl stop avalanchego
sleep 2
sudo systemctl start avalanchego
```

### Check Status of AvalancheGo Service

```sh
sudo systemctl status avalanchego
```

### Monitor Logs via Systemd Journal

```sh
sudo journalctl -u avalanchego -f
```

You can break this monitoring with `CTRL-C`

## Conclusion

By following this guide, you've set up a non-validating Avalanche node that tracks Dexalot L1. This setup allows you to interact with the Avalanche C-Chain and Dexalot L1 chains directly, bypassing any limitations of public RPC endpoints, and contributes to the transparency of the network.

## Troubleshooting

### Node Fails to Start

1. **Check Logs**: Use `sudo journalctl -u avalanchego -f` to view logs for error messages.
2. **Configuration Errors**: Verify that all configuration files are correctly formatted JSON and contain the correct IDs.
3. **Plugin Placement**: Ensure the Subnet-EVM plugin is correctly named and placed in the plugins directory.

### Node is Not Bootstrapping

1. **Network Connectivity**: Ensure your node can reach other nodes on the network.
2. **Firewall Settings**: Check that necessary ports are open (default is `TCP/9651` for P2P and `TCP/9650` for API).

## References

- [Avalanche Node Installation Guide](https://docs.avax.network/nodes/using-install-script/installing-avalanche-go)
- [Subnet-EVM Repo](https://github.com/ava-labs/subnet-evm)
- [AvalancheGo Configuration Flags](https://docs.avax.network/nodes/configure/configs-flags)

---

**Authors**: M. Nihat Gurmen, Kaan Keskin, Ilker Ulutas

**Graphics**: Can Toygar
