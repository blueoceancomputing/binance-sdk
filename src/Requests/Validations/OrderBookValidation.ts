import Validation from "./Validation";
import OrderBookRequestOptions from "../Options/OrderBookRequestOptions";
import OrderBookRequest from '../OrderBookRequest';

class OrderBookValidation extends Validation<OrderBookRequest> {
  /**
   * The fields that are always required in a request
   * @private
   */
  private requiredFields: string[] = [
    'symbol'
  ];

  /**
   * Validates the request options and returns the validated options
   * 
   * @param {OrderBookRequestOptions | undefined} options
   * 
   * @returns {OrderBookRequestOptions}
   * @throws {ValidationException}
   */
  public validate(options?: OrderBookRequestOptions): OrderBookRequestOptions {
    this.ensureOptions(options);
    this.fieldsPresent(this.requiredFields, options!);

    return options!;
  }

}

export default OrderBookValidation;