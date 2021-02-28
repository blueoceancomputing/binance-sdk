import { inject, injectable, interfaces } from "inversify";
import RequestBuilder from "../Http/RequestBuilder";
import Request from "./Request";
import RequestType from './RequestType';
import Types from "../Container/Types";
import { IConfig } from "config";

@injectable()
class ServerTimeRequest extends Request {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.SERVER_TIME;
  }
}

export default ServerTimeRequest;