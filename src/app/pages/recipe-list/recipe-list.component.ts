
import { Component, OnInit } from '@angular/core';


import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';

import { RecipeService } from '../../services/recipe.service';     
import { CategoryService } from '../../services/category.service'; 
import { FavoriteService } from '../../services/favorite.service'; 


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-recipe-list',                                  
  standalone: true,                                             
  imports: [CommonModule, FormsModule, RouterModule],           
  templateUrl: './recipe-list.component.html',                  
  styleUrls: ['./recipe-list.component.css']                    
})

export class RecipeListComponent implements OnInit {

  recipes: any[] = [];     // Tableau des recettes affichées sur la page
  categories: any[] = [];  // Tableau des catégories pour le menu déroulant de filtre
  favorites: string[] = []; // Tableau des IDs des recettes mises en favori par l'utilisateur

  userId = '69e88e8fbe9dc7ccb6822d63';

  filters = {
    search: '',     
    category: '',   
    difficulty: ''  
  };

  currentPage = 1;  
  limit = 5;        
  totalPages = 1;   // Nombre total de pages (calculé depuis le serveur)


  constructor(
    private recipeService: RecipeService,       
    private categoryService: CategoryService,   
    private favoriteService: FavoriteService,   
    private router: Router                      
  ) {}


  // ===== AU CHARGEMENT DU COMPOSANT =====
  ngOnInit(): void {
    this.loadRecipes();    
    this.loadCategories(); 
    this.syncFavorites(); 
  }


  // ===== CHARGER LES RECETTES =====
  loadRecipes() {

    // On prépare tous les paramètres à envoyer au serveur
    const params = {
      search: this.filters.search,       
      category: this.filters.category,   
      difficulty: this.filters.difficulty, 
      page: this.currentPage,            
      limit: this.limit                  
    };

    this.recipeService.getAll(params).subscribe({

      next: (res: any) => {
        console.log("API RESPONSE:", res); 

       // yerje3lk hajitin ya fer4 yA mw3abi 
        this.recipes = res.data || res || [];

        this.totalPages = res.totalPages || 1;

        if (!Array.isArray(this.recipes)) {
          this.recipes = [];
        }
      },

      error: (err) => {
        console.error(err);
        this.recipes = [];
      }
    });
  }


  // ===== QUAND UN FILTRE CHANGE =====
  onFilterChange() {
    this.currentPage = 1; 
    this.loadRecipes();   
  }


  // ===== PAGINATION : PAGE SUIVANTE =====
  nextPage() {
  
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // On passe à la page suivante
      this.loadRecipes(); // On recharge les recettes de cette page
    }
  }

  // ===== PAGINATION : PAGE PRÉCÉDENTE =====
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--; 
      this.loadRecipes(); 
    }
  }


  loadCategories() {
    this.categoryService.getAll().subscribe({

      next: (res: any) => {
        this.categories = res.data || res;
      },

      error: (err) => console.error(err)
    });
  }


  syncFavorites() {
    this.favoriteService.getUserFavorites(this.userId).subscribe({

      // On extrait uniquement les IDs des recettes favorites
      // pour savoir rapidement si une recette est en favori ou non
      next: (data: any[]) => {
        this.favorites = data.map(f => f._id);
      }
    });
  }

  // ===== VÉRIFIER SI UNE RECETTE EST EN FAVORI =====
  
  isFavorite(r: any): boolean {
    return this.favorites.includes(r._id);
  }

  // ===== AJOUTER OU RETIRER UN FAVORI =====
  toggleFavorite(r: any, event: Event) {

    
    event.stopPropagation();

    const id = r._id;

    // Si la recette est déjà en favori → on la retire
    if (this.isFavorite(r)) {
      this.favoriteService.removeFavorite(this.userId, id).subscribe(() => {
        this.favorites = this.favorites.filter(x => x !== id);
      });

    // Si la recette n'est pas en favori → on l'ajoute
    } else {
      this.favoriteService.addFavorite(this.userId, id).subscribe(() => {
        // On ajoute l'ID dans le tableau sans recharger toute la liste
        this.favorites.push(id);
      });
    }
  }


  // ===== ALLER VERS LE DÉTAIL D'UNE RECETTE =====
  goToDetail(r: any, event: Event) {
    event.stopPropagation(); // On évite la propagation du clic 
    this.router.navigate(['/recipe', r._id]);
  }


  // ===== RÉCUPÉRER L'IMAGE D'UNE RECETTE =====
  getImage(r: any): string {

    
    if (!r?.image) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }

    // → on la retourne directement
    if (r.image.startsWith('http')) {
      return r.image;
    }

    return `http://localhost:3000/uploads/${r.image}`;
  }
}