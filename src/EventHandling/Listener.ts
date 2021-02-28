import Event from "../Events/Event";

interface Listener<T extends Event> {
  (event: T): any;
}

export default Listener;