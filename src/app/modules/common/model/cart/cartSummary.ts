import {Summary} from "./summary";
import {CartSummaryItem} from "./cartSummaryItem";

export interface CartSummary {
  id: number;
  items: Array<CartSummaryItem> ;
  summary: Summary;
}
