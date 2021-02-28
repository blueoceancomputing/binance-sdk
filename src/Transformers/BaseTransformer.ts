import { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import Resource from '../Resources/Resource';
import Transformer from './Transformer';

@injectable()
class BaseTransformer implements Transformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {Resource}
   */
  public transform(response: AxiosResponse): Resource {
    return {
      httpStatus: response.status,
      weightUsed: parseInt(response.headers['x-mbx-used-weight']),
      weightUsed10s: parseInt(response.headers['x-mbx-used-weight-1m'])
    };
  }
}

export default BaseTransformer;