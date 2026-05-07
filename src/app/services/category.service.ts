import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(params?: any): Observable<Category[]> {
    return this.http.get<Category[]>(this.api, { params });
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
  }

  create(data: Category): Observable<Category> {
    return this.http.post<Category>(this.api, data);
  }

  update(id: string, data: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }


}