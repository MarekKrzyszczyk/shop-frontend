import {AdminOrderRow} from "./adminOrderRow";
import {AdminPayment} from "./adminPayment";
import {AdminOrderLog} from "./AdminOrderLog";

export interface AdminOrder{
  id: number,
  placementDate: Date,
  orderStatus: string,
  orderRows: Array<AdminOrderRow>
  grossValue: number,
  firstname: string,
  lastname: string,
  street: string,
  zipcode: string,
  city: string,
  email: string,
  phone: string,
  payment: AdminPayment,
  orderLogs: Array<AdminOrderLog>
}
