import { IConfig } from 'config';
import { inject, injectable, interfaces } from 'inversify';
import Types from '../Container/Types';
import AxiosRequest from '../Http/AxiosRequest';
import RequestBuilder from '../Http/RequestBuilder';
import RequestOptions from './Options/RequestOptions';
import RequestType from './RequestType';
import Endpoint from '../Endpoint';

@injectable()
abstract class Request {
  /**
   * @member {IConfig} configReader
   * @protected
   */
  protected readonly configReader: IConfig;

  /**
   * @member {RequestBuilder} requestBuilder
   * @protected
   */
  protected readonly requestBuilder: RequestBuilder;

  /**
   * @param {IConfig} configReader 
   * @param {Factory<RequestBuilder>} requestBuilderFactory 
   */
  public constructor (
    @inject(Types.Config) configReader: IConfig,
    @inject('Factory<RequestBuilder>') requestBuilderFactory: interfaces.Factory<RequestBuilder>
  ) {
    const requestType = this.requestType();
    this.configReader = configReader;
    this.requestBuilder = <RequestBuilder> requestBuilderFactory(requestType);
    this.setRequestEndpoint(requestType);
    this.addCommmonHeaders();
  }

  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public abstract requestType(): RequestType;

  /**
   * Build the request
   * 
   * @param {RequestOptions} options
   * 
   * @returns {Request}
   * @throws {ValidationException}
   */
  public build<T extends Request>(options?: RequestOptions<T>): AxiosRequest {
    if (options && options.endpoint) {
      this.setEndpoint(options.endpoint);
    }

    return this.requestBuilder.build();
  };

  /**
   * Adds all the common headers
   * 
   * @param {RequestBuilder} requestBuilder 
   */
  private addCommmonHeaders (): void {
    this.requestBuilder
      .addHeader('Accept', 'application/json')
      .addHeader('Content-Type', 'application/json');
  }

  /**
   * Sets the endpoint that we should request against
   * 
   * @param {Endpoint} endpoint 
   * @returns {BinanceRequest}
   */
  public setEndpoint (endpoint: Endpoint): Request {
    const baseURL = this.configReader.get<string>(`binance.endpoints.${endpoint}`);
    this.requestBuilder.setBaseURL(baseURL);
    return this;
  }

  /**
   * Set the request endpoint (path) for the given request
   * 
   * @param configReader 
   * @param request 
   */
  private setRequestEndpoint (request: RequestType): void {
    const endpoint = this.configReader.get<string>(`binance.requests.${request}.endpoint`);
    this.requestBuilder.setUrl(endpoint);
  }
}

export default Request;