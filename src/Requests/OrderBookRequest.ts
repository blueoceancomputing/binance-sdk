import { injectable } from "inversify";
import AxiosRequest from "../Http/AxiosRequest";
import Request from "./Request";
import RequestType from './RequestType';
import OrderBookRequestOptions from './Options/OrderBookRequestOptions';
import OrderBookValidation from './Validations/OrderBookValidation';

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
    const validator = new OrderBookValidation();
    const opts = validator.validate(options);

    this.requestBuilder.addParameter('symbol', opts.symbol);
    this.requestBuilder.addParameter('limit', opts.limit);

    return super.build(options);
  }
}

export default OrderBookRequest;