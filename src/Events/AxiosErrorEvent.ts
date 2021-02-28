import { AxiosError } from "axios";
import Event from "./Event";

interface AxiosErrorEvent extends Event {
  error: AxiosError;
}

export default AxiosErrorEvent;