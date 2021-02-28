module.exports = {
  endpoints: {
    primary: 'https://api.binance.com',
    secondary: 'https://api1.binance.com',
    tertiary: 'https://api2.binance.com',
    quaternary: 'https://api3.binance.com',
  },
  requests: {
    ping: {
      method: 'GET',
      endpoint: '/api/v3/ping'
    },
    serverTime: {
      method: 'GET',
      endpoint: '/api/v3/time'
    },
    exchangeInfo: {
      method: 'GET',
      endpoint: '/api/v3/exchangeInfo'
    },
    orderBook: {
      method: 'GET',
      endpoint: '/api/v3/depth'
    },
    newOrder: {
      method: 'POST',
      endpoint: '/api/v3/order'
    },
    newOrderTest: {
      method: 'POST',
      endpoint: '/api/v3/order/test'
    }
  }
};