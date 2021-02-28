import { interfaces } from 'inversify'
import Types from './Types';
import Event from '../EventHandling/EventSource';
import EventContract from '../EventHandling/EventContract';
import EventTypes from '../Events/EventTypes';
import ErrorEvent from '../Events/AxiosErrorEvent';
import RequestSentEvent from '../Events/RequestSentEvent';
import ResponseReceivedEvent from '../Events/ResponseReceivedEvent';

import Bind = interfaces.Bind;
import EventManager from '../EventHandling/EventManager';

module.exports = (bind: Bind) => {
  bind<EventManager>(Types.EventManager)
    .to(EventManager)
    .inSingletonScope();

  // Axios requests
  bind<EventContract<RequestSentEvent>>(Types.Event)
    .to(Event)
    .inSingletonScope()
    .whenTargetNamed(EventTypes.REQUEST_SENT);

  bind<EventContract<ErrorEvent>>(Types.Event)
    .to(Event)
    .inSingletonScope()
    .whenTargetNamed(EventTypes.REQUEST_ERROR);

  // Axios responses
  bind<EventContract<ResponseReceivedEvent>>(Types.Event)
    .to(Event)
    .inSingletonScope()
    .whenTargetNamed(EventTypes.RESPONSE_RECEIVED);
    
  bind<EventContract<ErrorEvent>>(Types.Event)
    .to(Event)
    .inSingletonScope()
    .whenTargetNamed(EventTypes.RESPONSE_ERROR);  
};