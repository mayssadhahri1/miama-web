import { Component, OnInit } from '@angular/core';


import { CommonModule } from '@angular/common';


import { RouterModule, Router } from '@angular/router';


import { FavoriteService } from '../../services/favorite.service';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-favorite-list',       // Nom de la balise HTML
  standalone: true,                     // Ce composant fonctionne seul 
  imports: [CommonModule, RouterModule], 
  templateUrl: './favorite-list.component.html', 
  styleUrls: ['./favorite-list.component.css']   
})

export class FavoriteListComponent implements OnInit {

  
  favorites: any[] = [];

  userId: string = '69e88e8fbe9dc7ccb6822d63';

  
  
  constructor(private favoriteService: FavoriteService, private router: Router) {}


  // ===== AU CHARGEMENT DU COMPOSANT =====
 
  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {
      // On convertit le texte JSON en objet JavaScript
      const user = JSON.parse(userData);

      // On récupère l'ID de l'utilisateur ydhabet les deux form sdeucx id 
      
      this.userId = user.id || user._id;
    }

    this.loadFavorites();
  }


  // ===== CHARGER LES FAVORIS =====
  loadFavorites() {
    this.favoriteService.getUserFavorites(this.userId).subscribe({

      // Si la réponse est succes en enregister les faavoirs  dans un tablleau 
      next: (data) => {
        console.log("Favoris reçus :", data); 
        this.favorites = data;
      },

      
      error: (err) => console.error(err)
    });
  }


  // ===== SUPPRIMER UN FAVORI =====
  deleteFromFav(recipe: any, event: Event) {

    event.stopPropagation();

    // On récupère l'ID de la recette 
    const id = recipe._id || recipe.id;

    this.favoriteService.removeFavorite(this.userId, id).subscribe({

      
      next: (newList) => this.favorites = newList,

      error: (err) => console.error("Erreur suppression", err)
    });
  }


  // ===== ALLER VERS LA PAGE DÉTAIL D'UNE RECETTE =====
  goToRecipeDetail(r: any) {
    this.router.navigate(['/recipe', r._id || r.id]);
  }


  // ===== RÉCUPÉRER L'IMAGE D'UNE RECETTE =====
  getImage(img: any): string {

    
    if (!img) {
      return 'https://via.placeholder.com/400x300?text=Image+Indisponible';
    }

    
 
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('data:'))) {
      return img;
    }

    
    return `http://localhost:3000/uploads/${img}`;
  }
}