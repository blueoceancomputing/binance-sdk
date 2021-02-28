import { AxiosResponse } from 'axios';
import ExchangeInfoResource from '../Resources/ExchangeInfoResource';
import BaseTransformer from './BaseTransformer';

class OrderBookTransformer extends BaseTransformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {ExchangeInfoResource}
   */
  public transform(response: AxiosResponse<any>): ExchangeInfoResource {
    return {
      ...super.transform(response),
      ...response.data
    };
  }
}

export default OrderBookTransformer;