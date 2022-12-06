import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProduct} from "../admin-product/adminProduct";
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) { }

  saveProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>("api/admin/products", product)
  }
}
