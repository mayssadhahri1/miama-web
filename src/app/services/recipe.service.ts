import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private api = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  getAll(params: any) {
  return this.http.get('http://localhost:3000/api/recipes', { params });
}

  getById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  getCategories() {
    return this.http.get<string[]>(`${this.api}/categories`);
  }
}