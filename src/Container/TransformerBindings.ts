import { interfaces } from 'inversify'
import Types from './Types';

import RequestType from '../Requests/RequestType';
import Transformer from '../Transformers/Transformer';
import ErrorTransformer from '../Transformers/ErrorTransformer';

import BaseTransformer from '../Transformers/BaseTransformer';
import ServerTimeTransformer from '../Transformers/ServerTimeTransformer';
import ExchangeInfoTransformer from '../Transformers/ExchangeInfoTransformer';
import OrderBookTransformer from '../Transformers/OrderBookTransformer';
import NewOrderTransformer from '../Transformers/NewOrderTransformer';
import OrderTransformer from '../Transformers/OrderTransformer';
import Bind = interfaces.Bind;


module.exports = (bind: Bind) => {
  bind<interfaces.Factory<Transformer>>(Types.TransformerFactory)
    .toFactory((context: interfaces.Context) => {
      return (status: number, requestType: RequestType) => {
        if (status != 200) {
          return context.container.get<Transformer>(Types.Transformer);
        }

        return context.container.getNamed<Transformer>(
          Types.Transformer, requestType
        );
      };
    });

  bind<Transformer>(Types.Transformer)
    .to(ErrorTransformer)
    .whenTargetIsDefault();

  bind<Transformer>(Types.Transformer)
    .to(BaseTransformer)
    .whenTargetNamed(RequestType.PING);

  bind<Transformer>(Types.Transformer)
    .to(ServerTimeTransformer)
    .whenTargetNamed(RequestType.SERVER_TIME);

  bind<Transformer>(Types.Transformer)
    .to(ExchangeInfoTransformer)
    .whenTargetNamed(RequestType.EXCHANGE_INFO);

  bind<Transformer>(Types.Transformer)
    .to(OrderBookTransformer)
    .whenTargetNamed(RequestType.ORDER_BOOK);

  bind<Transformer>(Types.Transformer)
    .to(NewOrderTransformer)
    .whenTargetNamed(RequestType.NEW_ORDER);

  bind<Transformer>(Types.Transformer)
    .to(OrderTransformer)
    .whenTargetNamed(RequestType.NEW_ORDER_TEST);
};