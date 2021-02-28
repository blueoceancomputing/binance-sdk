import { hasIn } from 'ramda';
import ValidationException from '../../Exceptions/ValidationException';
import Request from '../Request';
import RequestOptions from '../Options/RequestOptions';

abstract class Validation<T extends Request> {
  /**
   * Validates the request options and returns the validated options
   * 
   * @param {RequestOptions<T> | undefined} options
   * 
   * @returns {RequestOptions<T>}
   * @throws {ValidationException}
   */
  abstract validate(options?: RequestOptions<T>): RequestOptions<T>;

  /**
   * Ensure that the options have been passed in
   * 
   * @param {RequestOptions<T>} options
   * @param {string} message
   * @throws {ValidationException}
   */
  protected ensureOptions(
    options?: RequestOptions<T>,
    message: string = 'Options are required for this request'
  ): void {
    if (!options) {
      throw new ValidationException(message);
    }
  }

  /**
   * Validates that the fields are all present in the options
   * 
   * @param {string[]} fields 
   * @param {RequestOptions<T>} options 
   * @param {string} message
   * @throws {ValidationException}
   */
  protected fieldsPresent(
    fields: string[],
    options: RequestOptions<T>,
    message = 'The property ":field" is required in the request'
  ): void {
    for (const field of fields) {
      if (!hasIn(field, options)) {
        throw new ValidationException(message.replace(':field', field));
      }
    }
  }

  /**
   * Validates that that only a single field is present in the options
   * 
   * @param {string[]} fields 
   * @param {RequestOptions<T>} options 
   * @param {string} message
   * @throws {ValidationException}
   */
  protected fieldsPresentXor(
    fields: string[],
    options: RequestOptions<T>,
    message = 'Only one of the follow (:fields) is required in the request'
  ): void {
    let fieldsPresent = [];

    for (const field of fields) {
      if (hasIn(field, options)) {
        fieldsPresent.push(field);
      }
    }

    if (fieldsPresent.length !== 1) {
      throw new ValidationException(
        message.replace(':fields', fields.map(field => `"${field}"`).join(', '))
      );
    }
  }
}

export default Validation;