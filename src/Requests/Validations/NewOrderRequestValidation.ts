import { hasIn } from 'ramda';
import Validation from "./Validation";
import ValidationException from '../../Exceptions/ValidationException';
import NewOrderRequest from "../NewOrderRequest";
import NewOrderRequestOptions from "../Options/NewOrderRequestOptions";
import OrderType from '../../Models/OrderType';

class NewOrderRequestValidation extends Validation<NewOrderRequest> {
  /**
   * The fields that are always required in a request
   * @private
   */
  private requiredFields: string[] = [
    'symbol',
    'side',
    'type'
  ];

  /**
   * The fields that are ALL required based on the OrderType
   * @private
   */
  private allRequiredFields: { [id: string]: string[] } = {
    [OrderType.LIMIT]: ['timeInForce', 'quantity', 'price'],
    [OrderType.MARKET]: [],
    [OrderType.STOP_LOSS]: ['quantity', 'stopPrice'],
    [OrderType.STOP_LOSS_LIMIT]: ['timeInForce', 'quantity', 'price', 'stopPrice'],
    [OrderType.TAKE_PROFIT]: ['quantity', 'stopPrice'],
    [OrderType.TAKE_PROFIT_LIMIT]: ['timeInForce', 'quantity', 'price', 'stopPrice'],
    [OrderType.LIMIT_MAKER]: ['quantity', 'price']
  };

  /**
   * The fields that are XOR required based on the OrderType
   * @private
   */
  private xorRequiredFields: { [id: string]: string[] } = {
    [OrderType.MARKET]: ['quantity', 'quoteOrderQty'],
  };

  /**
   * Validates the request options and returns the validated options
   * 
   * @param {NewOrderRequestOptions | undefined} options
   * 
   * @returns {NewOrderRequestOptions}
   * @throws {ValidationException}
   */
  public validate(options?: NewOrderRequestOptions): NewOrderRequestOptions {
    this.ensureOptions(options);
    this.fieldsPresent(this.requiredFields, options!);
    this.validateTypeDependents(options!);

    return options!;
  }

  /**
   * Validates dependent on the order type that has been provided
   * 
   * @param {NewOrderRequestOptions} options 
   * @throws {ValidationException}
   */
  private validateTypeDependents(options: NewOrderRequestOptions): void {
    if (!hasIn(options.type, this.allRequiredFields)) {
      throw new ValidationException('The type specifed is not valid');
    }

    switch (options.type) {
      case OrderType.MARKET:
        this.fieldsPresentXor(this.xorRequiredFields[options.type], options);
        break;

      default:
        this.fieldsPresent(this.allRequiredFields[options.type], options);
        break
    }
  }

}

export default NewOrderRequestValidation;