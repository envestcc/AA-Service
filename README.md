# My Express Application

This is a simple Express application that provides an API for sending user operations to a smart contract.

## Getting Started

To get started, clone this repository and install the dependencies:

```
git clone https://github.com/envestcc/AA-Service.git
cd AA-Service
yarn install
```

## Running the Application

To run the application, use the following command:
```
yarn run server
```
This will start the application on port 8080.

## Sending a User Operation

To send a user operation, make a POST request to the `/userop/tx` endpoint with the following JSON payload:

```json
{
    "privateKey": "0x8e381f36fda646e255762857b8bbc37a9dc718f33f4233ebe846a07df4541c11",
    "to": "0x065e1164818487818E6BA714E8d80B91718ad758",
    "value": "0.001",
    "data": "0x",
    "chainRPC": "https://babel-api.testnet.iotex.io",
    "bundlerRPC": "https://bundler.testnet.w3bstream.com",
    "paymasterRPC": "https://paymaster.testnet.w3bstream.com/rpc/a0a7767f2aaa4db1b385f71dd82e55ea",
    "entryPointAddress": "0xc3527348De07d591c9d567ce1998eFA2031B8675",
    "accountFactoryAddress": "0xA8e5d5Ca2924f176BD3Bf1049550920969F23450"
}
```
Replace the values in the payload with your own values.