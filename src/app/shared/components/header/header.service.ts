import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getCountProducts(id: number): Observable<number> {
    return this.http.get<number>("/api/cartItems/count/" + id);
  }
}
