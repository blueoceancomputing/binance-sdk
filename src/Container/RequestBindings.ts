import { interfaces } from 'inversify'
import Types from './Types';

import RequestType from '../Requests/RequestType';
import Request from '../Requests/Request';
import Endpoint from '../Endpoint';

import SignedRequest from '../Requests/SignedRequest';
import PingRequest from '../Requests/PingRequest';
import ServerTimeRequest from '../Requests/ServerTimeRequest';
import ExchangeInfoRequest from '../Requests/ExchangeInfoRequest';
import OrderBookRequest from '../Requests/OrderBookRequest';
import NewOrderRequest from '../Requests/NewOrderRequest';
import NewOrderTestRequest from '../Requests/NewOrderTestRequest';
import Bind = interfaces.Bind;

module.exports = (bind: Bind) => {
  bind<interfaces.Factory<Request>>(Types.RequestFactory)
    .toFactory((context: interfaces.Context) => {
      return (requestType: RequestType, endpoint: Endpoint, key: string, secret: string) => {
        const request = context.container.getNamed<Request>(
          Types.Request, requestType
        );

        if (request instanceof SignedRequest) {
          request
            .setApiKey(key)
            .setApiSecret(secret);
        }
        return request.setEndpoint(endpoint);
      };
    });

  bind<Request>(Types.Request)
    .to(PingRequest)
    .whenTargetNamed(RequestType.PING);

  bind<Request>(Types.Request)
    .to(ServerTimeRequest)
    .whenTargetNamed(RequestType.SERVER_TIME);

  bind<Request>(Types.Request)
    .to(ExchangeInfoRequest)
    .whenTargetNamed(RequestType.EXCHANGE_INFO);

  bind<Request>(Types.Request)
    .to(OrderBookRequest)
    .whenTargetNamed(RequestType.ORDER_BOOK);

  bind<Request>(Types.Request)
    .to(NewOrderRequest)
    .whenTargetNamed(RequestType.NEW_ORDER);

  bind<Request>(Types.Request)
    .to(NewOrderTestRequest)
    .whenTargetNamed(RequestType.NEW_ORDER_TEST);
};