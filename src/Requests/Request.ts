import { inject, injectable, interfaces } from 'inversify';
import Endpoints from '../Config/Endpoints';
import Requests from '../Config/Requests';
import Endpoint from '../Endpoint';
import AxiosRequest from '../Http/AxiosRequest';
import RequestBuilder from '../Http/RequestBuilder';
import RequestOptions from './Options/RequestOptions';
import RequestType from './RequestType';

@injectable()
abstract class Request {
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
    @inject('Factory<RequestBuilder>') requestBuilderFactory: interfaces.Factory<RequestBuilder>
  ) {
    const requestType = this.requestType();
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
    this.requestBuilder.setBaseURL(Endpoints[endpoint]);
    return this;
  }

  /**
   * Set the request endpoint (path) for the given request
   * 
   * @param configReader 
   * @param request 
   */
  private setRequestEndpoint (request: RequestType): void {
    const requestConfig = Requests[request];
    this.requestBuilder.setUrl(requestConfig.endpoint);
  }
}

export default Request;