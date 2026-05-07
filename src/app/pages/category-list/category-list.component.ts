
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category-list',                          
  standalone: true,                                        
  imports: [CommonModule, RouterModule, FormsModule],      
  templateUrl: './category-list.component.html',           
  styleUrls: ['./category-list.component.css'],            
  encapsulation: ViewEncapsulation.None                   
                                                           
})

export class CategoryListComponent implements OnInit {

  categories: any[] = [];

  search: string = '';


  constructor(private service: CategoryService) {}



  ngOnInit(): void {
    this.load(); // On charge toutes les catégories 
  }


  // ===== CHARGER LES CATÉGORIES =================
  load() {
    
    this.service.getAll({ search: this.search }).subscribe({

      
      next: (res: any) => {
        this.categories = res.data || res;
        console.log('CATEGORIES:', this.categories); 
      },

      error: (err) => console.error(err)
    });
  }


  // ===== RECHERCHE =================
  onSearch() {
    this.load();
  }


  // ===== SUPPRIMER UNE CATÉGORIE =================
  delete(id: string) {

    if (!id) return;

    if (confirm('Voulez-vous supprimer cette catégorie ?')) {

      this.service.delete(id).subscribe({

        // Si succès → on retire la catégorie du tableau SANS recharger toute la liste
        // .filter() garde toutes les catégories SAUF celle qu'on vient de supprimer
        next: () => {
          this.categories = this.categories.filter(c => c._id !== id);
        },

        error: (err) => console.error(err)
      });
    }
  }


  // ===== EMOJI PAR CATÉGORIE =================
  getCategoryEmoji(name: string): string {

    
    const n = (name || '').toLowerCase();

    if (n.includes('pizza'))   return '🍕';
    if (n.includes('burger'))  return '🍔';
    if (n.includes('dessert')) return '🍰';
    if (n.includes('pasta'))   return '🍝';
    if (n.includes('salade'))  return '🥗';
    if (n.includes('viande'))  return '🥩';
    if (n.includes('poisson')) return '🐟';

    // Si aucun mot clé trouvé → emoji dossier par défaut
    return '📂';
  }
}