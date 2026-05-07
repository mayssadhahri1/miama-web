import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/recipes">
          <div class="bg-warning rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm" style="width: 42px; height: 42px; font-size: 1.2rem;">
            🍳
          </div>
          <span class="fw-bold fs-4 text-dark" style="letter-spacing: -1px;">
            Miam<span style="color: #ff7e5f;">App</span>
          </span>
        </a>

        <div class="ms-auto d-flex align-items-center">
          <ng-container *ngIf="auth.isLoggedIn()">
            <a class="nav-link px-3 d-none d-md-block fw-semibold text-secondary" routerLink="/recipes">🍽️ Recettes</a>
            <a class="nav-link px-3 d-none d-md-block fw-semibold text-secondary" routerLink="/favorites">❤️ Favoris</a>
            <button class="btn btn-outline-danger rounded-pill px-4 ms-2 fw-bold btn-sm" (click)="logout()">Déconnexion</button>
          </ng-container>

          <ng-container *ngIf="!auth.isLoggedIn()">
            <a class="nav-link px-3 fw-semibold text-dark d-none d-sm-block" routerLink="/login">Connexion</a>
            <a class="btn text-white rounded-pill px-4 ms-2 fw-bold shadow-sm" 
               style="background: #ff7e5f;" routerLink="/register">S'inscrire</a>
          </ng-container>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}