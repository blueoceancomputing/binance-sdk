import { inject, injectable, interfaces } from "inversify";
import { IConfig } from "config";
import Types from "../Container/Types";
import RequestBuilder from "../Http/RequestBuilder";
import Request from "./Request";
import RequestType from "./RequestType";

@injectable()
class ExchangeInfoRequest extends Request {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.EXCHANGE_INFO;
  }
}

export default ExchangeInfoRequest;