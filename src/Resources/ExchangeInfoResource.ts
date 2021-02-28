import Resource from './Resource';
import Coin from '../Models/Coin';
import OrderType from '../Models/OrderType';
import SymbolStatus from '../Models/SymbolStatus';

interface RateLimitResource {
  rateLimitType: string,
  interval: string,
  intervalNum: number,
  limit: number
}

// interface ExchangeFilterResource {
//   filterType: string,
//   maxNumOrders: number,
// }

interface SymbolResource {
  symbol: string,
  status: SymbolStatus,
  baseAsset: Coin,
  baseAssetPrecision: number,
  quoteAsset: Coin,
  quotePrecision: number,
  quoteAssetPrecision: number,
  baseCommissionPrecision: number,
  quoteCommissionPrecision: number,
  orderTypes: OrderType[],
  icebergAllowed: boolean,
  ocoAllowed: boolean,
  quoteOrderQtyMarketAllowed: boolean,
  isSpotTradingAllowed: boolean,
  isMarginTradingAllowed: boolean,
  filters: any, // TODO: Investigate this
  permissions: string // TODO: Investigate this
}

interface ExchangeInfoResource extends Resource {
  rateLimits: RateLimitResource[],
  exchangeFilters: any, // TODO: Investigate this
  symbols: SymbolResource[]
}

export default ExchangeInfoResource;