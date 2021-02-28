import { AxiosResponse } from 'axios';
import NewOrderResource from '../Resources/NewOrderResource';
import OrderTransformer from './OrderTransformer';

class NewOrderTransformer extends OrderTransformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {NewOrderResource}
   */
  public transform(response: AxiosResponse<any>): NewOrderResource {
    return {
      ...super.transform(response),
      ...response.data
    };
  }
}

export default NewOrderTransformer;