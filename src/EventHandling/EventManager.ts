import { injectable } from 'inversify';
import container from "../Container/Container";
import Types from "../Container/Types";
import Event from '../Events/Event';
import EventContract from "./EventContract";
import EventType from '../Events/EventTypes';
import AxiosErrorEvent from '../Events/AxiosErrorEvent';
import RequestSentEvent from '../Events/RequestSentEvent';
import ResponseReceivedEvent from '../Events/ResponseReceivedEvent';

/**
 * Axios request event source
 */
export interface RequestEventSource {
  sent: EventContract<RequestSentEvent>;
  error: EventContract<AxiosErrorEvent>;
}

/**
 * Axios response event source
 */
export interface ResponseEventSource {
  received: EventContract<ResponseReceivedEvent>;
  error: EventContract<AxiosErrorEvent>;
}

@injectable()
class EventManager {

  /**
   * Axios request events
   * 
   * @member {RequestEventSource}
   * @readonly
   * @public
   */
  public readonly request: RequestEventSource;

  /**
   * Axios response events
   * 
   * @member {RequestEventSource}
   * @readonly
   * @public
   */
  public readonly response: ResponseEventSource;

  public constructor () {
    this.request = {
      sent: this.get<RequestSentEvent>(EventType.REQUEST_SENT),
      error: this.get<AxiosErrorEvent>(EventType.REQUEST_ERROR),
    };

    this.response = {
      received: this.get<ResponseReceivedEvent>(EventType.RESPONSE_RECEIVED),
      error: this.get<AxiosErrorEvent>(EventType.RESPONSE_ERROR),
    };
  }

  /**
   * Obtains the name event contract for a given type
   * 
   * @param {EventType} type 
   * @returns {EventContract<T>}
   */
  private get<T extends Event>(type: EventType): EventContract<T> {
    return container.getNamed<EventContract<T>>(Types.Event, type);
  }
}

export default EventManager;