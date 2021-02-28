import { injectable } from 'inversify';
import container from "./Container/Container";
import Types from "./Container/Types";
import Options from "./Options";
import EventManager from './EventHandling/EventManager';
import ExchangeInfoResource from './Resources/ExchangeInfoResource';
import NewOrderRequestOptions from './Requests/Options/NewOrderRequestOptions';
import NewOrderResource from './Resources/NewOrderResource';
import Resource from './Resources/Resource';
import CallRunner from './Calls/CallRunner';
import RequestType from './Requests/RequestType';
import OrderResource from './Resources/OrderResource';
import OrderBookResource from './Resources/OrderBookResource';
import OrderBookRequestOptions from './Requests/Options/OrderBookRequestOptions';

@injectable()
class Client {
  /**
   * Runner for executing requests
   * @member {CallRunner} runner
   */
  private readonly runner: CallRunner;

  /**
   * Event manager for hooking into the event bus
   * @member {EventManager} events
   */
  public readonly events: EventManager;

  public constructor() {
    this.runner = container.get<CallRunner>(Types.CallRunner);
    this.events = container.get<EventManager>(Types.EventManager);
  }

  /**
   * Sets the options for the client
   * 
   * @param {Options} options
   * @returns {BinanceFacade}
   */
  public options(options: Options): Client {
    this.runner
        .setApiKey(options.apiKey)
        .setEndpoint(options.endpoint)
        .setApiSecret(options.apiSecret);
    return this;
  }

  /**
   * Pings the Binance API
   * 
   * @returns {Promise<Resource>}
   */
  public async ping(): Promise<Resource> {
    return this.runner.execute(RequestType.PING);
  }

  /**
   * Obtains the server time from the Binance API.
   * 
   * @returns {Promise<Resource>}
   */
  public async serverTime(): Promise<Resource> {
    return this.runner.execute(RequestType.SERVER_TIME);
  }

  /**
   * Obtains the exchange information
   * 
   * @return {Promise<ExchangeInfoResource>}
   */
  public async exchangeInfo(): Promise<ExchangeInfoResource> {
    return this.runner.execute(RequestType.EXCHANGE_INFO);
  }

  /**
   * Fetches the order book of bids and asks
   * 
   * @param {OrderBookRequestOptions} options 
   * @returns {Promise<OrderBookResource>}
   * @throws {ValidationException}
   */
  public async orderBook(options: OrderBookRequestOptions): Promise<OrderBookResource> {
    return this.runner.execute(RequestType.ORDER_BOOK, options);
  }

  /**
   * Conducts a new trade
   * 
   * @param {NewOrderRequestOptions} options
   * @returns {Promise<NewOrderResource>}
   * @throws {ValidationException}
   */
  public async newOrder(options: NewOrderRequestOptions): Promise<NewOrderResource> {
    return this.runner.execute(RequestType.NEW_ORDER, options);
  }

  /**
   * Conducts a test new order
   * 
   * @param {NewOrderRequestOptions} options
   * @returns {Promise<OrderResource>}
   * @throws {ValidationException}
   */
  public async newOrderTest(options: NewOrderRequestOptions): Promise<OrderResource> {
    return this.runner.execute(RequestType.NEW_ORDER_TEST, options);
  }
}

export default Client;