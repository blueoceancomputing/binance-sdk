import { AxiosResponse } from 'axios';
import ErrorResource from '../Resources/ErrorResource';
import BaseTransformer from './BaseTransformer';

class ErrorTransformer extends BaseTransformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {ErrorResource}
   */
  public transform(response: AxiosResponse<any>): ErrorResource {
    return {
      ...super.transform(response),
      code: response.data.code,
      message: response.data.msg
    };
  }
}

export default ErrorTransformer;