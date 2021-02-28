import { AxiosInstance } from 'axios';
import { interfaces } from 'inversify';
import Types from './Types';
import CallRunner from '../Calls/CallRunner';
import AxiosBuilder from '../Http/AxiosBuilder';
import RequestBuilder from '../Http/RequestBuilder';
import RequestBuilderFactory from '../Http/RequestBuilderFactory';
import Bind = interfaces.Bind;
import RequestType from '../Requests/RequestType';

module.exports = (bind: Bind) => {
  bind<CallRunner>(Types.CallRunner).to(CallRunner);

  // Axios
  bind<AxiosBuilder>(Types.AxiosBuilder)
    .to(AxiosBuilder);
  bind<interfaces.Factory<AxiosInstance>>('Factory<AxiosInstance>')
    .toFactory((context: interfaces.Context) => {
      return () => {
        const builder = context.container.get<AxiosBuilder>(Types.AxiosBuilder);
        return builder.build();
      };
    });

  // Request builder
  bind<RequestBuilderFactory>(Types.RequestBuilderFactory)
    .to(RequestBuilderFactory);
  bind<interfaces.Factory<RequestBuilder>>('Factory<RequestBuilder>')
    .toFactory((context: interfaces.Context) => {
      return (request: RequestType) => {
        const factory = context.container.get<RequestBuilderFactory>(
          Types.RequestBuilderFactory
        );
        return factory.make(request);
      };
    });
};