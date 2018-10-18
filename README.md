# How to Install

## Requirements

in order to install the project node.js and npm must be installed. For more information about how to install them refer to [official nodejs website](http://www.nodejs.org).

## Install Packages

Having installed nodejs and npm, please download or clone the project into your local directory and install all required packages using below command:

`npm install`

## Compile smart contract

If you have installed packages succefully, in order to compile smart contracts use the following command by the use of **truffle**:

`truffle compile`

## Deploy contract

It's possible to deploy CitextToken contract to either testnets or mainnet. However before all, safely import your wallet passphrases into environment variable of your powershell:

for ropsten, rinkeby or mainnet:

`$env:julia_ropsten_passphrase="..."`

`$env:julia_rinkeby_passphrase="..."`

`$env:julia_mainnet_passphrase="..."`

If you are using command prompt use `set` command in replace of commands mentioned in above:

`set julia_ropsten_passphrase="..."`

`set julia_rinkeby_passphrase="..."`

`set julia_mainnet_passphrase="..."`

Now, everything is ready to deploy fire you contract to ropsten, rinkeby or mainnet:

`truffle migrate --network ropsten --reset`

`truffle migrate --network rinkeby --reset`

`truffle migrate --network production --reset`