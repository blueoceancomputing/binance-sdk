import { AxiosResponse } from "axios";
import Resource from "../Resources/Resource";

interface Transformer {
  /**
   * Transform the axios response into a resource we can return
   * 
   * @param {AxiosResponse} response
   * @returns {Resource}
   */
  transform (response: AxiosResponse): Resource;
}

export default Transformer;