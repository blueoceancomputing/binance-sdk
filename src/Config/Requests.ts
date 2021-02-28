import { Method } from "axios";

interface RequestConfig {
  method: Method,
  endpoint: string
};

const Requests: { [key: string]: RequestConfig } = {
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
};

export default Requests;