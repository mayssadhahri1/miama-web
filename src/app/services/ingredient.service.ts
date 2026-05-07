import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class IngredientService {

  api = 'http://localhost:3000/api/ingredients';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.api);
  }

}