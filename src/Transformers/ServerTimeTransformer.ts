import { AxiosResponse } from 'axios';
import ServerTimeResource from '../Resources/ServerTimeResource';
import BaseTransformer from './BaseTransformer';

class ServerTimeTransformer extends BaseTransformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {ServerTimeResource}
   */
  public transform(response: AxiosResponse<any>): ServerTimeResource {
    return {
      ...super.transform(response),
      time: response.data.serverTime
    };
  }
}

export default ServerTimeTransformer;