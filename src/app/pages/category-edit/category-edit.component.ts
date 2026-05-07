
import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category.service';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-category-edit',                        
  standalone: true,                                      
  imports: [CommonModule, FormsModule, RouterModule],    
  templateUrl: './category-edit.component.html',         
  styleUrls: ['./category-edit.component.css']           
})

export class CategoryEditComponent implements OnInit {

  
  // Pré-rempli avec des valeur 
  category: any = { name: '', description: '' };


  // Le "!" indique à TypeScript que cette variable sera remplie avant utilisation
  id!: string;



  constructor(
    private route: ActivatedRoute,    
    private service: CategoryService, 
    private router: Router           
  ) {}


  ngOnInit(): void {

   
    this.id = this.route.snapshot.params['id'];

    
    this.service.getById(this.id).subscribe({

      next: (data) => {
        this.category = data;
      },

      error: (err) => console.error('Erreur lors de la récupération:', err)
    });
  }


  // ===== METTRE À JOUR LA CATÉGORIE =====
  update() {

    this.service.update(this.id, this.category).subscribe({

     
      next: () => {
        this.router.navigate(['/categories']);
      },

      error: (err) => console.error('Erreur lors de la mise à jour:', err)
    });
  }
}