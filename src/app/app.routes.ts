import { Routes } from '@angular/router';

import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';

import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';

import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

// 👇 AJOUT IMPORTANT
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  // 🔄 REDIRECTION PAR DÉFAUT VERS LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  // 🔐 AUTH
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🍽️ RECIPES (On change le path vide par 'recipes')
  { path: 'recipes', component: RecipeListComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: 'edit/:id', component: EditRecipeComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },

  // 📂 CATEGORIES
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryAddComponent },
  { path: 'categories/edit/:id', component: CategoryEditComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },

  // ❤️ FAVORITES
  { path: 'favorites', component: FavoriteListComponent },
];