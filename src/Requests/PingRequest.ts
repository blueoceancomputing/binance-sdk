import { inject, injectable, interfaces } from "inversify";
import { IConfig } from "config";
import RequestBuilder from "../Http/RequestBuilder";
import Request from "./Request";
import RequestType from './RequestType';
import Types from "../Container/Types";

@injectable()
class PingRequest extends Request {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.PING;
  }
}

export default PingRequest;