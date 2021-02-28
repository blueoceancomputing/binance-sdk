import OrderResource from './OrderResource';
import Side from "../Models/Side";
import Coin from "../Models/Coin";
import OrderType from "../Models/OrderType";
import TimeInForce from "../Models/TimeInForce";

interface FillResource {
  price: number;
  qty: number;
  commission: number;
  commissionAsset: Coin;
}

interface NewOrderResource extends OrderResource {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: number;
  origQty: number;
  executedQty: number;
  cummulativeQuoteQty: number;
  status: string;
  timeInForce: TimeInForce;
  type: OrderType;
  side: Side;
  fills: FillResource[];
}

export default NewOrderResource;