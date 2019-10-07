# core-server

Express Server with Firebase Database for Swop dApp - https://youtu.be/UamRRDiRd-o

## dApp Architecture Design

The current design was made with the assumption that Amadeus or Airlines had partnered with this system by providing custom API to make it work.

## Sequence Flows

#### Sell Ticket

![](https://user-images.githubusercontent.com/47552061/61999843-0d875000-b098-11e9-9342-edee73c54de7.png)

#### Buy Ticket

![](https://user-images.githubusercontent.com/47552061/61999844-18da7b80-b098-11e9-9db4-d36a5371580e.png)


#### Off-Chain Bidding

![](https://user-images.githubusercontent.com/47552061/63214371-6bcab000-c0e5-11e9-9085-7d1567d63be3.png)

#### Close Auction

![](https://user-images.githubusercontent.com/47552061/63214369-679e9280-c0e5-11e9-9d06-78ca3458023c.png)

## Environment Variables

- ROPSTEN_DEV1_PK=YOUR_DEV_PRIVATE_KEY

## Local Setup

1. Generate Firebase serviceAccountKey and name it (swopServiceAccountKey.json)
2. Run npm install
3. Start the server - node index.js
