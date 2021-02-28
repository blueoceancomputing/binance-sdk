export default {
  Logger: Symbol.for('Logger'),
  CallRunner: Symbol.for('CallRunner'),

  // Events
  Event: Symbol.for('Event'),
  EventManager: Symbol.for('EventManager'),

  // HTTP
  AxiosBuilder: Symbol.for('AxiosBuilder'),
  RequestBuilderFactory: Symbol.for('Factory<RequestBuilder>'),

  // Requests
  Request: Symbol.for('Request'),
  RequestFactory: Symbol.for('RequestFactory'),

  // Transformers
  Transformer: Symbol.for('Transformer'),
  TransformerFactory: Symbol.for('Factory<Transformer>'),
}