# Binance-SDK

This package provides a wrapper around the Binance spot API, and conducts all the requests via axios. The specification for the API can be found [here](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#new-order--trade). 

### Installation

The package can be installed either by NPM or yarn using the respective command:

```bash
npm install @blueoceancomputing/binance-sdk
```

```bash
yarn add @blueoceancomputing/binance-sdk
```

### Initialisation

The following section will detail how to get set up with the client, and explain where to obtain resource.

```javascript
import BinanceClient from '@blueoceancomputing/binance-sdk';

const client = new BinanceClient().options({
  endpoint: Endpoint.PRIMARY,
  apiKey: '',
  apiSecret: ''
});
```

#### Endpoint enum

| Endpoint enum | API url                  |
| ------------- | ------------------------ |
| PRIMARY       | https://api.binance.com  |
| SECONDARY     | https://api1.binance.com |
| TERTIARY      | https://api2.binance.com |
| QUATERNARY    | https://api3.binance.com |

#### API key and secret

The API key and secret can be obtained from the Binance api management dashboard located [here] (https://www.binance.com/en/my/settings/api-management)


### Example requests

Now that the client has been initilised, you can make called to the API using the client. All endpoints with parameters have typed options and validation will detail if any parameters are missing.

#### Ping request

``` javascript
client.ping().then(data => console.log(data));
```
