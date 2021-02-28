import Request from '../Request';
import RequestOptions from './RequestOptions';

interface SignedRequestOptions<T extends Request> extends RequestOptions<T> {
  apiKey?: string;
  apiSecret?: string;
} 

export default SignedRequestOptions;