
import RequestOptions  from './RequestOptions'
import OrderBookRequest from '../OrderBookRequest';

interface OrderBookRequestOptions extends RequestOptions<OrderBookRequest> {
  symbol: string;
  limit?: number;
}

export default OrderBookRequestOptions;