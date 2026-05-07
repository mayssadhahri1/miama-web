
import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


// ===== DÉCLARATION DU COMPOSANT =====
@Component({
  selector: 'app-login',                        
  standalone: true,                              
  imports: [FormsModule, RouterModule],          
  templateUrl: './login.component.html',         
  styleUrls: ['./login.component.css']           
})

export class LoginComponent {

  // Objet qui contient les données du formulaire de connexion Lié au HTML avec [(ngModel)]
   
  credentials = {
    email: '',    
    password: ''  
  };

  loading = false;


  constructor(
    private auth: AuthService, 
    private router: Router     
  ) {}


  // ===== CONNEXION =====
  login() {

    // ===== VALIDATION DES CHAMPS =====
    if (!this.credentials.email || !this.credentials.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs obligatoires',
        text: 'Email et mot de passe sont requis'
      });
      return; 
    }

    this.auth.login(this.credentials).subscribe({

      // ===== SI LA CONNEXION EST UN SUCCÈS =====
      next: (res: any) => {

        
        Swal.fire({
          icon: 'success',
          title: 'Bienvenue 👋',
          text: res.user.username || 'Utilisateur',
          timer: 1500,              
          showConfirmButton: false  
        });

        this.router.navigate(['/recipes']);
      },

      // ===== SI UNE ERREUR SURVIENT =====
      error: () => {

        Swal.fire({
          icon: 'error',
          title: 'Erreur login',
          text: 'Email ou mot de passe incorrect'
        });
      }
    });
  }
}