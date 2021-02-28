import { AxiosRequestConfig, Method } from 'axios';

class AxiosRequest implements AxiosRequestConfig {
  /**
   * Method to be used for the the request (e.g: GET, POST, etc...)
   * @member {Method} method
   */
  public method: Method;

  /**
   * The base url to use will consist of the domain and static path for an endpoint
   * @member {string} string
   */
  public baseURL: string;

  /**
   * Headers that are applied to the request
   * @member {object} headers
   */
  public headers: { [key: string]: string };

  /**
   * Payload to be sent in the body of the request
   * @member {any} data
   */
  public data: any = {};

  /**
   * Path for the request
   * @member {string} url
   */
  public url: string;

  /**
   * Parameters that are applied to the request
   * @member {object} params
   */
  public params: { [key: string]: string };

  /**
   * Create new a request
   * 
   * @param {Method} method   Method to be used for the the request (e.g: GET, POST, etc...)
   * @param {string} baseURL  The base url to use will consist of the domain and static path for an endpoint
   * @param {any} headers     Headers that are applied to the request
   * @param {any} data        Payload to be sent in the body of the request
   * @param {string} url      Path for the request
   * @param {any} params      Parameters to be appended to the request path
   */
  public constructor(
    method: Method,
    baseURL: string,
    headers: any,
    data: any,
    url: string,
    params: any
  ) {
    this.method = method;
    this.baseURL = baseURL;
    this.headers = headers;
    this.data = data;
    this.url = url;
    this.params = params;
  }
}

export default AxiosRequest;