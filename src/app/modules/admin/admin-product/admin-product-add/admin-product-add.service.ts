import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "../model/adminProductUpdate";
import {Observable} from "rxjs";
import {UploadResponse} from "../model/uploadResponse";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) { }

  saveProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>("api/admin/products", product)
  }
}
