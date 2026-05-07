
import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { CategoryService } from '../../services/category.service';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-category-detail',             
  standalone: true,                             
  imports: [CommonModule, RouterModule],        
  templateUrl: './category-detail.component.html', 
  styleUrls: ['./category-detail.component.css']   
})

export class CategoryDetailComponent implements OnInit {

  // Variable qui contiendra les données de la catégorie récupérée depuis le serevur
  category: any;


  constructor(
    private route: ActivatedRoute,     
    private service: CategoryService    
  ) {}


  // ===== AU CHARGEMENT DU COMPOSANT =====
  ngOnInit(): void {

   
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe({

      // Si succès → on stocke les données de la catégorie
      next: (data) => {
        this.category = data;
      },

    
      error: (err) => console.error('Erreur de récupération:', err)
    });
  }
}