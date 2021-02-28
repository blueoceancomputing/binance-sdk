import { IConfig } from "config";
import { inject, injectable } from "inversify";
import Types from "../Container/Types";
import RequestBuilder from "./RequestBuilder";

@injectable()
class RequestBuilderFactory {
  /**
   * @member {IConfig} configReader
   * @private
   */
  private readonly configReader: IConfig;

  /**
   * Construct a new request builder factory
   * 
   * @param {IConfig} configReader 
   */
  public constructor (@inject(Types.Config) configReader: IConfig) {
    this.configReader = configReader;
  }

  /**
   * Make a new request builder
   * 
   * @param {string} request 
   * @returns {RequestBuilder}
   */
  public make (request: string): RequestBuilder {
    const config = this.configReader.get<any>('binance');
    return new RequestBuilder (config.requests[request].method, config.endpoints.primary);
  }
}

export default RequestBuilderFactory;