import Listener from "./Listener";
import Disposable from "./Disposable";
import Event from "../Events/Event";

interface EventContract<T extends Event> {
  /**
   * Register an event listener
   * 
   * @param {Listener<T>} listener 
   * @returns {Disposable}
   */
  register(listener: Listener<T>): Disposable;

  /**
   * Unregister a given listener from the event
   * 
   * @param {Listener<T>} listener 
   * @returns {void}
   */
  unregister(listener: Listener<T>): void;

  /**
   * Emits the event to all the listeners
   * 
   * @param {T} event
   * @returns {void}
   */ 
  emit(event: T): void;
}

export default EventContract;