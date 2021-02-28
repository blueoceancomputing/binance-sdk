import { AxiosInstance } from 'axios';
import { interfaces } from 'inversify';
import config, { IConfig } from 'config';
import Types from './Types';
import CallRunner from '../Calls/CallRunner';
import AxiosBuilder from '../Http/AxiosBuilder';
import RequestBuilder from '../Http/RequestBuilder';
import RequestBuilderFactory from '../Http/RequestBuilderFactory';
import Bind = interfaces.Bind;

module.exports = (bind: Bind) => {
  bind<CallRunner>(Types.CallRunner).to(CallRunner);
  bind<IConfig>(Types.Config).toConstantValue(config);

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
      return (request: string) => {
        const factory = context.container.get<RequestBuilderFactory>(
          Types.RequestBuilderFactory
        );
        return factory.make(request);
      };
    });
};