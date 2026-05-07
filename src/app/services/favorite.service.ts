import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // Vérifie bien que ton port est le 3000
  private apiUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer les favoris d'un utilisateur
   */
  getUserFavorites(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  /**
   * Ajouter une recette aux favoris
   * On envoie userId et recipeId dans le corps (body)
   */
  addFavorite(userId: string, recipeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, recipeId });
  }

  /**
   * Supprimer une recette des favoris
   * Note : On utilise POST car ton contrôleur attend userId et recipeId dans le req.body
   */
  removeFavorite(userId: string, recipeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove`, { userId, recipeId });
  }
}