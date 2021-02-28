import { AxiosResponse } from 'axios';
import OrderResource from '../Resources/OrderResource';
import BaseTransformer from './BaseTransformer';

class OrderTransformer extends BaseTransformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {OrderResource}
   */
  public transform(response: AxiosResponse<any>): OrderResource {
    return {
      ...super.transform(response),
      orderCount10s: parseInt(response.headers['x-mbx-order-count-10s']),
      orderCount1d: parseInt(response.headers['x-mbx-order-count-1d']),
    };
  }
}

export default OrderTransformer;