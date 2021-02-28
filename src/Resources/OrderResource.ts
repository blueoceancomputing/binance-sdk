import Resource from "./Resource";

interface OrderResource extends Resource {
  orderCount10s: number;
  orderCount1d: number;
}

export default OrderResource;