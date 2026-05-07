import { Component, OnInit } from '@angular/core';


import { Router, RouterLink } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';     
import { CategoryService } from '../../services/category.service'; 


import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-add-recipe',                        
  standalone: true,                                   
  imports: [CommonModule, FormsModule, RouterLink],   
  templateUrl: './add-recipe.component.html',         
  styleUrls: ['./add-recipe.component.css']           
})

export class AddRecipeComponent implements OnInit {

 
  recipe: any = {
    title: '',        
    category: '',     
    description: '',  
    ingredients: '', 
    difficulty: 'facile', 
    image: ''         
  };

 
  categories: any[] = [];

  
  loading = false;

  
  errorMsg = '';



  constructor(
    private recipeService: RecipeService,       
    private categoryService: CategoryService,   
    private router: Router                      
  ) {}


  
  ngOnInit(): void {
    
    this.loadCategories();
  }


  // ===== CHARGER LES CATÉGORIES =====
  loadCategories() {
    
    this.categoryService.getAll().subscribe({

      
      // (res.data si le serveur renvoie { data: [...] }, sinon res directement)
      next: (res: any) => {
        this.categories = res.data || res;
      },

      error: (err) => {
        console.error('Erreur catégories:', err);
      }
    });
  }


  // ===== SOUMETTRE LE FORMULAIRE =====
  submit() {

    this.errorMsg = '';

   
    if (!this.recipe.title || !this.recipe.category || !this.recipe.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs obligatoires'
      });
      return; 
    }

    
    this.loading = true;

    // ===== PRÉPARATION DES DONNÉES À ENVOYER =====
    const payload = {
      title: this.recipe.title,
      description: this.recipe.description,
      category: this.recipe.category,   // On envoie l'ID de la catégorie
      difficulty: this.recipe.difficulty,
      image: this.recipe.image,

      
      ingredients: this.recipe.ingredients
        ? this.recipe.ingredients
            .split(',')           
            .map((i: string) => i.trim()) // On enlève les espaces 
            .filter(Boolean)      
        : []                    
    };

    console.log("DATA SENT 👉", payload); 


    //  CRÉER LA RECETTE =====
    this.recipeService.create(payload).subscribe({

      
      next: (res: any) => {
        this.loading = false; 

        console.log("RESPONSE 👉", res); 

        Swal.fire({
          icon: 'success',
          title: 'Recette ajoutée 🎉',
          text: 'Redirection vers la liste...',
          timer: 1500,            // Fermeture automatique après 1.5s
          showConfirmButton: false 
        });

        
        setTimeout(() => {
          this.router.navigate(['/recipes']);
        }, 1500);
      },

      error: (err) => {
        this.loading = false; 

        console.error("ERROR 👉", err);

     
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err?.error?.message || 'Erreur serveur'
        });
      }
    });
  }
}