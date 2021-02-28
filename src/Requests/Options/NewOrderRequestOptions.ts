
import SignedRequestOptions  from './SignedRequestOptions';
import NewOrderRequest from '../NewOrderRequest';
import Side from '../../Models/Side';
import OrderType from '../../Models/OrderType';
import TimeInForce from '../../Models/TimeInForce';
import NewOrderResponseType from '../../Models/NewOrderResponseType';

interface NewOrderRequestOptions extends SignedRequestOptions<NewOrderRequest> {
  symbol: string,
  side: Side,
  type: OrderType,
  timeInForce?: TimeInForce,
  quantity?: number,
  quoteOrderQty?: number,
  price?: number,
  newClientOrderId?: string,
  stopPrice?: number,
  icebergQty?: number,
  newOrderRespType?: NewOrderResponseType,
  recvWindow?: number
}

export default NewOrderRequestOptions;