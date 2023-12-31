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
// transfer
{
    "privateKey": "0x...",
    "to": "0x...",
    "value": "0.001",
    "data": "0x",
    "chainRPC": "https://babel-api.testnet.iotex.io",
    "bundlerRPC": "https://bundler.testnet.w3bstream.com",
    "paymasterRPC": "https://paymaster.testnet.w3bstream.com/rpc/{APIKEY}",
    "entryPointAddress": "0xc3527348De07d591c9d567ce1998eFA2031B8675",
    "accountFactoryAddress": "0xA8e5d5Ca2924f176BD3Bf1049550920969F23450"
}

// erc20Approve
{
    "privateKey": "0x...",
    "to": "0x0258866edaf84d6081df17660357ab20a07d0c80",
    "value": "0",
    "data": "0x095ea7b3000000000000000000000000065e1164818487818e6ba714e8d80b91718ad758000000000000000000000000000000000000000000000000f9ccd8a1c5080000",
    "chainRPC": "https://babel-api.testnet.iotex.io",
    "bundlerRPC": "https://bundler.testnet.w3bstream.com",
    "paymasterRPC": "https://paymaster.testnet.w3bstream.com/rpc/{APIKEY}",
    "entryPointAddress": "0xc3527348De07d591c9d567ce1998eFA2031B8675",
    "accountFactoryAddress": "0xA8e5d5Ca2924f176BD3Bf1049550920969F23450"
}
```
Replace the values in the payload with your own values.