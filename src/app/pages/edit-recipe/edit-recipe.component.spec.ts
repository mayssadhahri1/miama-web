import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRecipeComponent } from './edit-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// MOCK SERVICE
const recipeServiceMock = {
  getById: () => of({ nom: 'test', prix: 10, quantite: 2 }),
  update: () => of({})
};

// MOCK ROUTE
const activatedRouteMock = {
  paramMap: of({
    get: () => '1'
  })
};

// MOCK ROUTER
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

describe('EditRecipeComponent', () => {

  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EditRecipeComponent, ReactiveFormsModule],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});