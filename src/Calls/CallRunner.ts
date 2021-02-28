import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable, interfaces } from "inversify";
import Types from "../Container/Types";
import Endpoint from "../Endpoint";
import Request from '../Requests/Request';
import RequestOptions from "../Requests/Options/RequestOptions";
import RequestType from "../Requests/RequestType";
import Resource from "../Resources/Resource";
import Transformer from "../Transformers/Transformer";

@injectable()
class CallRunner {
  /**
   * @member {Factory<Request>} requestFactory
   * @private
   */
  private readonly requestFactory: interfaces.Factory<Request>;

  /**
   * @member {Factory<Transformer>} transformerFactory
   * @private
   */
  private readonly transformerFactory: interfaces.Factory<Transformer>;

  /**
   * @member {Factory<AxiosInstance>} axios
   * @private
   */
  private readonly axios: AxiosInstance;

  /**
   * The Binance API endpoint to send requests to.
   * @member {Endpoint}
   * @private
   */
  private endpoint: Endpoint = Endpoint.PRIMARY;

  /**
   * The Binance API key for authentication with the service.
   * @member {string}
   * @private
   */
  private apiKey: string = '';

  /**
   * The Binance API client secret to sign requests.
   * @member {string}
   * @private
   */
  private apiSecret: string = '';

  /**
   * @param {Factory<Request>} requestFactory 
   * @param {Factory<Transformer>} transformerFactory 
   * @param {Factory<AxiosInstance>} axiosFactory 
   */
  public constructor (
    @inject(Types.RequestFactory)
      requestFactory: interfaces.Factory<Request>,
    @inject(Types.TransformerFactory)
      transformerFactory: interfaces.Factory<Transformer>,
    @inject('Factory<AxiosInstance>')
      axiosFactory: interfaces.Factory<AxiosInstance>,
  ) {
    this.requestFactory = requestFactory;
    this.transformerFactory = transformerFactory;
    this.axios = <AxiosInstance> axiosFactory();
  }

  /**
   * Set the base API endpoint to be used
   * 
   * @param {Endpoint | undefined} endpoint
   * @returns {CallRunner}
   */
  public setEndpoint (endpoint?: Endpoint): CallRunner {
    if (endpoint) {
      this.endpoint = endpoint;
    }
    return this;
  }

  /**
   * Set the Binance API key
   * 
   * @param {string | undefined} key 
   * @returns {CallRunner}
   */
  public setApiKey (key?: string): CallRunner {
    if (key) {
      this.apiKey = key;
    }
    return this;
  }

  /**
   * Set the Binance API client secret
   * 
   * @param {string | undefined} secret 
   * @returns {CallRunner}
   */
  public setApiSecret (secret?: string): CallRunner {
    if (secret) {
      this.apiSecret = secret;
    }
    return this;
  }

  /**
   * Executes a given request with options provided and transforms the response into a given resource
   * 
   * @param {RequestType} type 
   * @param {RequestOptions<Request>} options 
   * @returns {Promise<Resource>}
   * @throws {ValidationException}
   */
  public async execute (type: RequestType, options?: RequestOptions<Request>): Promise<any> {
    const request = this.getRequest(type).build(options);
    const response = await this.executeRequest(request);
    return this.transformResponse(type, response);
  }

  /**
   * Obtain the request for the given request type
   * 
   * @param {RequestType} requestType
   * @returns {BinanceRequest}
   */
  private getRequest (type: RequestType): Request {
    return <Request> this.requestFactory(
      type, this.endpoint, this.apiKey, this.apiSecret
    );
  }

  /**
   * Executes the request, ensuring an error is caught.
   * 
   * @param {AxiosRequestConfig} request
   * @returns {Promise<AxiosResponse>}
   */
  private async executeRequest (request: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await this.axios.request(request);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  /**
   * Transforms an axios response into a resource
   * 
   * @param {RequestType} type 
   * @param {AxiosResponse} response 
   * @returns {Promise<Resource>}
   */
  private async transformResponse (type: RequestType, response: AxiosResponse): Promise<Resource> {
    const transformer = <Transformer> this.transformerFactory(response.status, type);
    return transformer.transform(response);
  }
}

export default CallRunner;