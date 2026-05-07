import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component'; // ✅ CORRECT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,RouterModule],
  templateUrl: './app.component.html'
})
export class AppComponent {}