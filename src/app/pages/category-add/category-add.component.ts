import { Component } from '@angular/core';


import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category.service';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-category-add',                          
  standalone: true,                                       
  imports: [CommonModule, FormsModule, RouterModule],     
  templateUrl: './category-add.component.html',           
  styleUrls: ['./category-add.component.css']             
})

export class CategoryAddComponent {

  // ===== OBJET CATÉGORIE =====
  category = {
    name: '',        
    description: ''  
  };


  constructor(
    private service: CategoryService, // Pour envoyer la nouvelle catégorie au serveur
    private router: Router            // Pour rediriger après la création
  ) {}


  submit() {

    this.service.create(this.category).subscribe({

      // Si la catégorie est créée avec succès
      next: () => {
        // On redirige vers la liste des catégories
        this.router.navigate(['/categories']);
      },

    
      error: (err) => {
        console.error('Erreur lors de la création', err);
      }
    });
  }
}