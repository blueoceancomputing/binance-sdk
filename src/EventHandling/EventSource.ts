import Listener from "./Listener";
import Disposable from "./Disposable";
import EventContract from "./EventContract";
import { injectable } from "inversify";
import Event from "../Events/Event";

@injectable()
class EventSource<T extends Event> implements EventContract<T> {
  /**
   * Reference to all listeners to the event.
   * @member {Array<Listener<T>>}
   */
  private listeners: Array<Listener<T>> = [];

  /**
   * Register an event listener
   * 
   * @param {Listener<T>} listener 
   * @returns {Disposable}
   */
  public register(listener: Listener<T>): Disposable {
    this.listeners.push(listener);
    return {
      dispose: (): void => this.unregister(listener)
    };
  }

  /**
   * Unregister a given listener from the event
   * 
   * @param {Listener<T>} listener 
   * @returns {void}
   */
  public unregister(listener: Listener<T>): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) this.listeners.splice(index, 1);
  }

  /**
   * Emits the event to all the listeners
   * 
   * @param {T} event
   * @returns {void}
   */
  public emit(event: T): void {
    this.listeners.forEach(
      (listener: Listener<T>) => listener(event)
    );
  }
}

export default EventSource;