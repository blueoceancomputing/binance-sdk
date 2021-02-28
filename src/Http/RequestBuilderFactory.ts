import { injectable } from "inversify";
import RequestBuilder from "./RequestBuilder";
import Endpoints from '../Config/Endpoints';
import Requests from '../Config/Requests';
import RequestType from "../Requests/RequestType";

@injectable()
class RequestBuilderFactory {
  /**
   * Make a new request builder
   * 
   * @param {RequestType} request 
   * @returns {RequestBuilder}
   */
  public make (request: RequestType): RequestBuilder {
    return new RequestBuilder (Requests[request].method, Endpoints.primary);
  }
}

export default RequestBuilderFactory;