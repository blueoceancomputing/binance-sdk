import { createHmac } from 'crypto';
import { injectable } from 'inversify';
import Request  from './Request'
import SignedRequestOptions from './Options/SignedRequestOptions';
import AxiosRequest from '../Http/AxiosRequest';
import ValidationException from '../Exceptions/ValidationException';

@injectable()
abstract class SignedRequest extends Request {
  /**
   * @member {string | undefined} apiKey
   * @private
   */
  private apiKey?: string;

  /**
   * @member {string | undefined} apiSecret
   * @private
   */
  private apiSecret?: string;

  /**
   * Build the request
   * 
   * @param {SignedRequestOptions} options
   * 
   * @returns {Request}
   * @throws {ValidationException}
   */
  public build<T extends SignedRequest>(options?: SignedRequestOptions<T>): AxiosRequest {
    if (options) {
      if (options.apiKey)     this.apiKey = options.apiKey;
      if (options.apiSecret)  this.apiSecret = options.apiSecret;
    }

    if (!this.apiKey || !this.apiSecret) {
      throw new ValidationException('An API key and secret are required for this request');
    }

    this.setKeyHeader(this.apiKey);
    this.setSignature(this.apiSecret);
    this.requestBuilder.addParameter('timestamp', new Date().getTime())

    return super.build(options);
  };
  
  /**
   * Sets the API key on the request builder
   * 
   * @param {string} apiKey 
   * @returns {SignedBinanceRequest}
   */
  public setApiKey (apiKey: string): SignedRequest {
    this.apiKey = apiKey;
    return this;
  }

  /**
   * Sets the API client secret on the request builder
   * 
   * @param {string} apiSecret 
   * @returns {SignedBinanceRequest}
   */
  public setApiSecret (apiSecret: string): SignedRequest {
    this.apiSecret = apiSecret;
    return this;
  }

  /**
   * Sets the API key in the header
   * @param {string} apiKey 
   */
  private setKeyHeader (apiKey: string): void {
    this.requestBuilder.addHeader('X-MBX-APIKEY', apiKey);
  }

  /**
   * Generates and sets the signature in request parameters
   * @param {string} apiSecret 
   */
  private setSignature (apiSecret: string): void {
    const query = this.requestBuilder.queryString();
    const signature = this.generateSignature(apiSecret, query);
    this.requestBuilder.addParameter('signature', signature);
  }

  /**
   * Generates the authorisation signature for a binance request
   * 
   * @param {string} query 
   * @param {body} query 
   * @returns {string}
   */
  private generateSignature (apiSecret: string, query: string = '', body: string = ''): string {
    return createHmac('sha256', apiSecret)
            .update(query.concat(body))
            .digest('hex')
  }
} 

export default SignedRequest;