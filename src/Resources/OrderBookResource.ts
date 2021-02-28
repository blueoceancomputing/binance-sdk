import Resource from "./Resource";

interface FillResource {
  price: number;
  qty: number;
}

interface OrderBookResource extends Resource {
  lastUpdateId: number,
  bids: FillResource[];
  asks: FillResource[];
}

export default OrderBookResource;