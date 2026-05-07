
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';


import { RecipeService } from '../../services/recipe.service';    
import { CategoryService } from '../../services/category.service'; 

import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-recipe',                          
  standalone: true,                                      
  imports: [ReactiveFormsModule, CommonModule],         
  templateUrl: './edit-recipe.component.html',          
  styleUrls: ['./edit-recipe.component.css']             
})

export class EditRecipeComponent implements OnInit {

 
  recipeForm!: FormGroup;

  // ID de la recette à modifier, lu depuis l'URL
  id!: string;

  // Tableau qui contiendra la liste des catégories pour le menu déroulant
  categories: any[] = [];


  constructor(
    private fb: FormBuilder,                    
    private route: ActivatedRoute,              
    private recipeService: RecipeService,       
    private categoryService: CategoryService,   
    private router: Router                      
  ) {}


  
  ngOnInit(): void {

    
    this.recipeForm = this.fb.group({
      title: [''],           
      description: [''],     
      ingredients: [''],    
      category: [''],       
      difficulty: ['facile'],
      image: ['']     
    });

    this.loadCategories();

    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // On lit l'ID depuis l'URL

      if (!id) return;

      this.id = id;         // On stocke l'ID
      this.loadRecipe();    // On charge les données de la recette
    });
  }


  // ===== CHARGER LES CATÉGORIES =====
  loadCategories() {
    this.categoryService.getAll().subscribe({

      
      next: (res: any) => {
        this.categories = res.data || res;
      },

      error: (err) => console.error(err)
    });
  }


  // ===== CHARGER LA RECETTE À MODIFIER =====
  loadRecipe() {
    this.recipeService.getById(this.id).subscribe({

      next: (data: any) => {

       
        this.recipeForm.patchValue({
          title: data.title,
          description: data.description,

         
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients.join(', ')
            : data.ingredients,

        
          category: data.category?._id || data.category,

          difficulty: data.difficulty,
          image: data.image
        });
      },

      error: (err) => console.error(err)
    });
  }


  // ===== METTRE À JOUR LA RECETTE =====
  updateRecipe() {

    if (this.recipeForm.invalid) return;

    // On récupère toutes les valeurs du formulaire
    const formValue = this.recipeForm.value;

    const payload = {
      ...formValue, 

    
      ingredients: formValue.ingredients
        ? formValue.ingredients.split(',').map((i: string) => i.trim())
        : [] 
    };

    this.recipeService.update(this.id, payload).subscribe({

      // Si la modification est un succès
      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Recette modifiée 🎉',
          text: 'Modification réussie',
          timer: 2000,              
          showConfirmButton: false 
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },

      error: () => {

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Modification échouée'
        });
      }
    });
  }
}