import { Method } from 'axios';
import AxiosRequest from './AxiosRequest';

class RequestBuilder {
  /**
   * Method to be used for the the request (e.g: GET, POST, etc...)
   * @member {Method} method
   */
  public readonly method: Method;

  /**
   * The base url to use will consist of the domain and static path for an endpoint
   * @member {string} string
   */
  public baseURL: string;

  /**
   * Headers that are applied to the request
   * @member {object} headers
   */
  private readonly headers: { [key: string]: string };

  /**
   * Payload to be sent in the body of the request
   * @member {any} data
   */
  private data: any;

  /**
   * Path for the request
   * @member {string} url
   */
  private url: string;

  /**
   * Parameters that are applied to the request
   * @member {object} params
   */
  private readonly params: { [key: string]: string };

  /**
   * @param {Method} method 
   * @param {string} baseURL 
   */
  public constructor (method: Method, baseURL: string) {
    this.method = method;
    this.baseURL = baseURL;
    this.headers = {};
    this.url = ''
    this.params = {};
  }

  /**
   * Set base URL
   * 
   * @param {string} baseURL
   * @returns {RequestBuilder}
   */
  public setBaseURL (baseURL: string): RequestBuilder {
    this.baseURL = baseURL;
    return this;
  }

  /**
   * Add a new header to the request
   * 
   * @param {string} name
   * @param {string} value
   * @returns {RequestBuilder}
   */
  public addHeader (name: string, value: string): RequestBuilder {
    this.headers[name] = value;
    return this;
  }

  /**
   * Set the body data of the request
   * 
   * @param {string} data 
   * @returns {RequestBuilder}
   */
  public setData (data: string): RequestBuilder {
    this.data = data;
    return this;
  }

  /**
   * Set the URL (path) of the request (e.g. /order)
   * 
   * @param {string} url 
   * @returns {RequestBuilder}
   */
  public setUrl (url: string): RequestBuilder {
    this.url = url;
    return this;
  }

  /**
   * Add a new parameter to the request
   * 
   * @param {string} name
   * @param {string} value 
   * @returns {RequestBuilder}
   */
  public addParameter (name: string, value: any): RequestBuilder {
    if (value) {
      this.params[name] = value;
    }
    return this;
  }

  /**
   * Builds the query string for the request
   * 
   * @returns {string}
   */
  public queryString (): string {
    return Object.keys(this.params)
      .reduce((acc, key) => acc.concat(`${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}&`), '')
      .slice(0, -1);
  }

  /**
   * Build a new request
   * 
   * @returns {AxiosRequest}
   */
  public build(): AxiosRequest {
    return new AxiosRequest(
      this.method,
      this.baseURL,
      this.headers,
      this.data,
      this.url,
      this.params
    );
  }
}

export default RequestBuilder;