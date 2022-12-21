import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AdminCategoryNameDto} from "../common/dto/adminCategoryNameDto";
import {HttpClient} from "@angular/common/http";
import {AdminCategory} from './model/AdminCategory';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>("/api/admin/categories");
  }

  getCategory(id: number): Observable<AdminCategory> {
    return this.http.get<AdminCategory>("/api/admin/categories/" + id);
  }

  saveCategory(category: AdminCategory): Observable<AdminCategory> {
    return this.http.post<AdminCategory>("api/admin/categories", category)
  }

  updateCategory(id: number, category: AdminCategory) {
    return this.http.put<AdminCategory>("/api/admin/categories/" + id, category)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/categories/${id}`);
  }
}
