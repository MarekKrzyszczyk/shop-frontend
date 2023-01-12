import {Payment} from "./payment";

export interface OrderSummary {
  id: number,
  placementDate: Date,
  status: string,
  grossValue: number,
  payment: Payment
}
