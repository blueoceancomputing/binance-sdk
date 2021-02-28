
import Endpoint from '../../Endpoint';
import Request from '../Request';

interface RequestOptions <T extends Request> {
  endpoint?: Endpoint;
}

export default RequestOptions;