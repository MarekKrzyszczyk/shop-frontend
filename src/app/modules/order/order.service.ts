import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartCommonService} from "../common/service/cart-common.service";
import {Observable} from "rxjs";
import {OrderSummary} from "./model/orderSummary";
import {OrderDto} from "./model/orderDto";
import {InitData} from "./model/initData";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private cartCommonService: CartCommonService) {
  }

  getCart(cartId: number) {
    return this.cartCommonService.getCart(cartId);
  }

  placeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("/api/orders", order);
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("/api/orders/initData");
  }
}
