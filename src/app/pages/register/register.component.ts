import { Component } from '@angular/core';


import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { FormsModule } from '@angular/forms';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-register',              
  standalone: true,                       
  imports: [FormsModule, RouterModule],   
  templateUrl: './register.component.html' 
})

export class RegisterComponent {

  user = {
    username: '',
    email: '',    
    password: ''  
  };


  constructor(
    private auth: AuthService, 
    private router: Router     
  ) {}


  // ===== INSCRIPTION =====
  register() {

    this.auth.register(this.user).subscribe({

      // ===== SI L'INSCRIPTION EST UN SUCCÈS =====
      next: () => {
        alert("Compte créé ! Connectez-vous.");

        // On redirige vers la page de connexion
        this.router.navigate(['/login']);
      },

      // ===== SI UNE ERREUR SURVIENT =====
      error: (err) => {
        // On affiche le message d'erreur reçu du serveur
        // Si pas de message → on affiche "Erreur d'inscription" par défaut
        alert(err.error.message || "Erreur d'inscription");
      }
    });
  }
}