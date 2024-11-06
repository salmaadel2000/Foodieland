
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/interfaces/recipe.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-fav-recipes',
  standalone: true,
  imports:[FormsModule,CommonModule],
   templateUrl: './fav-recipes.component.html',
  styleUrl: './fav-recipes.component.scss'
})
export class FavRecipesComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  constructor(private recipesService: RecipesService, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.loadFavoriteRecipes(); 
      } else {
        this.isAuthenticated = false;
      }
      this.isLoading = false;
    });
  }

  loadFavoriteRecipes(): void {
    if (this.isAuthenticated) {
      this.recipesService.getFavoriteRecipes().subscribe(
        (recipes) => {
          this.favoriteRecipes = recipes;
        },
        (error) => {
          console.error('Error loading favorite recipes:', error);
        }
      );
    } else {
      console.error('User is not authenticated');
    }
  }
}
