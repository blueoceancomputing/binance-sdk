import NewOrderRequest from './NewOrderRequest';
import RequestType from "./RequestType";

class NewOrderTestRequest extends NewOrderRequest {
  /**
   * Obtain the request type
   * 
   * @returns {RequestType}
   */
  public requestType(): RequestType {
    return RequestType.NEW_ORDER_TEST;
  }
}

export default NewOrderTestRequest;