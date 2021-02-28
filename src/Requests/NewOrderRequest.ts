import { inject, injectable, interfaces } from "inversify";
import { IConfig } from "config";
import Types from "../Container/Types";
import AxiosRequest from "../Http/AxiosRequest";
import RequestBuilder from "../Http/RequestBuilder";
import SignedRequest from "./SignedRequest";
import NewOrderRequestOptions from './Options/NewOrderRequestOptions';
import NewOrderRequestValidation from './Validations/NewOrderRequestValidation';
import RequestType from "./RequestType";

@injectable()
class NewOrderRequest extends SignedRequest {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.NEW_ORDER;
  }

  /**
   * Build the request
   * 
   * @param {Endpoint} endpoint
   * @param {NewOrderRequestOptions} options
   * 
   * @returns {Request}
   * @throws {InvalidArgumentException}
   */
  public build(options?: NewOrderRequestOptions): AxiosRequest {
    const validator = new NewOrderRequestValidation();
    const opts: NewOrderRequestOptions = validator.validate(options);

    this.requestBuilder.addParameter('symbol', opts.symbol);
    this.requestBuilder.addParameter('side', opts.side);
    this.requestBuilder.addParameter('type', opts.type);
    this.requestBuilder.addParameter('timeInForce', opts.timeInForce);
    this.requestBuilder.addParameter('quantity', opts.quantity);
    this.requestBuilder.addParameter('quoteOrderQty', opts.quoteOrderQty);
    this.requestBuilder.addParameter('price', opts.price);
    this.requestBuilder.addParameter('newClientOrderId', opts.newClientOrderId);
    this.requestBuilder.addParameter('stopPrice', opts.stopPrice);
    this.requestBuilder.addParameter('icebergQty', opts.icebergQty);
    this.requestBuilder.addParameter('newOrderRespType', opts.newOrderRespType);
    this.requestBuilder.addParameter('recvWindow', opts.recvWindow);

    return super.build(opts);
  }
}

export default NewOrderRequest;