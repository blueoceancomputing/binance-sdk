import { AxiosRequestConfig } from "axios";
import Event from "./Event";

interface RequestSentEvent extends Event {
  request: AxiosRequestConfig;
}

export default RequestSentEvent;