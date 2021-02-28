import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import Types from '../Container/Types';
import EventManager from "../EventHandling/EventManager";

@injectable()
class AxiosBuilder {
  /**
   * @member {EventManager} events
   * @private
   */
  private events: EventManager;


  /**
   * @param {EventManager} events
   */
  public constructor (
    @inject(Types.EventManager) events: EventManager
  ) {
    this.events = events;
  }

  /**
   * Create a new axios instance
   * 
   * @returns {AxiosInstance}
   */
  public build (): AxiosInstance {
    const instance = axios.create();
    this.applyLogging(instance);
    return instance;
  }

  /**
   * Apply logging to the axios instance
   * 
   * @param {AxiosInstance} instance 
   * @private
   */
  private applyLogging (instance: AxiosInstance): void {
    instance.interceptors.request.use (
      (request: AxiosRequestConfig): AxiosRequestConfig => {
        this.events.request.sent.emit({ request });
        return request;
      },
      (error) => {
        this.events.request.error.emit({ error });
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use (
      (response): AxiosResponse => {
        this.events.response.received.emit({ response });
        return response;
      },
      (error) => {
        this.events.response.error.emit({ error });
        return Promise.reject(error);
      }
    );
  }
}

export default AxiosBuilder;