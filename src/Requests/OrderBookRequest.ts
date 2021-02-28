import { inject, injectable, interfaces } from "inversify";
import { IConfig } from "config";
import Types from "../Container/Types";
import RequestBuilder from "../Http/RequestBuilder";
import AxiosRequest from "../Http/AxiosRequest";
import Request from "./Request";
import RequestType from './RequestType';
import OrderBookRequestOptions from './Options/OrderBookRequestOptions';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException';

@injectable()
class OrderBookRequest extends Request {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.ORDER_BOOK;
  }

  /**
   * Build the request
   * 
   * @returns {Request}
   */
  public build(options?: OrderBookRequestOptions): AxiosRequest {
    const opts = this.validate(options);

    this.requestBuilder.addParameter('symbol', opts.symbol);
    this.requestBuilder.addParameter('limit', opts.limit);

    return super.build(options);
  }

  private validate(options?: OrderBookRequestOptions): OrderBookRequestOptions {
    if (!options) {
      throw new InvalidArgumentException(
        'Options are required for this request'
      );
    }
    if (!options.symbol) {
      throw new InvalidArgumentException(
        'A symbol is required for the order book request'
      );
    }
    return options;
  }
}

export default OrderBookRequest;