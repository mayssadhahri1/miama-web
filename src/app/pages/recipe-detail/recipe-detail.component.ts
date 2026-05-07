import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { RecipeService } from '../../services/recipe.service';

import Swal from 'sweetalert2';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-recipe-detail',                      
  standalone: true,                                    
  imports: [CommonModule, RouterLink],                 
  templateUrl: './recipe-detail.component.html',       
  styleUrls: ['./recipe-detail.component.css']         
})

export class RecipeDetailComponent implements OnInit {

  
  recipe: any = null;

  // Permet d'afficher un message d'erreur dans le HTML lorsque ne charge 
  error = false;


  constructor(
    private route: ActivatedRoute,          
    private router: Router,                 
    private recipeService: RecipeService    
  ) {}


  // ===== AU CHARGEMENT DU COMPOSANT =====
  ngOnInit(): void {

  
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getById(id).subscribe({

        // Si succès → on stocke la recette avec ses ingrédients nettoyés
        next: (data: any) => {
          this.recipe = {
            ...data, // On garde toutes les données de la recette

            // On nettoie les ingrédients pour avoir un tableau propre
            ingredients: this.cleanIngredients(data.ingredients)
          };
        },

        error: (err) => {
          console.error(err);
          this.error = true; 
        }
      });
    }
  }


  // ===== NETTOYER LES INGRÉDIENTS =====
  // Cette fonction les transforme toujours le ingridient ert propre 
  cleanIngredients(ingredients: any): string[] {

    // Cas 1 : Pas d'ingrediebnt vide 
    if (!ingredients) return [];

    // Cas 2 : Les ingrédients sont déjà un tableau
    if (Array.isArray(ingredients)) {
      return ingredients
        .map(i => typeof i === 'string'  
          ? i
          : i?.name || i?.label)          
        .filter(Boolean);                 // On supprime les valeurs vides ou nulles
    }

    // Cas 3 : Les ingrédients arrivent en texte séparé par des virgules
    if (typeof ingredients === 'string') {
      return ingredients
        .split(',')           
        .map(i => i.trim())   // On enlève les espaces en trop
        .filter(Boolean);     
    }

    // Cas 4 : Format inconnu 
    return [];
  }


  // ===== SUPPRIMER LA RECETTE =====
  confirmDelete() {

    Swal.fire({
      title: 'Supprimer cette recette ?',
      text: this.recipe?.title,       
      icon: 'warning',
      showCancelButton: true,         
      confirmButtonText: 'Oui',     
      cancelButtonText: 'Annuler'    
    }).then((result) => {

      if (result.isConfirmed) {

        this.recipeService.delete(this.recipe._id).subscribe({

          next: () => {
            Swal.fire('Supprimée', '', 'success'); 
            this.router.navigate(['/recipes']);     
          },

          error: () => {
            Swal.fire('Erreur', 'Suppression impossible', 'error'); 
          }
        });
      }
    });
  }
}