import { AxiosResponse } from "axios";
import Event from "./Event";

interface ResponseReceivedEvent extends Event {
  response: AxiosResponse;
}

export default ResponseReceivedEvent;