import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/interfaces/recipe.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-fav-recipes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './fav-recipes.component.html',
  styleUrls: ['./fav-recipes.component.scss']
})
export class FavRecipesComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  favorites: number[] = [];

  constructor(private recipesService: RecipesService, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loadFavoriteRecipes();
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

  removeHeart(recipe: Recipe): void {
    if (this.isAuthenticated && !recipe.isHearted) {
      this.recipesService.removeFavoriteRecipe(recipe.docId!).then(() => {
        recipe.isHearted = true;
        this.favoriteRecipes = this.favoriteRecipes.filter(r => r.docId !== recipe.docId);
        this.updateFavorites(recipe, false);
        console.log('Recipe removed from favorites:', recipe);
      }).catch(error => {
        console.error('Error removing recipe from favorites:', error);
      });
    }
  }

  private updateFavorites(recipe: Recipe, isHearted: boolean): void {
    const docId = recipe.id;
    if (isHearted) {
      const index = this.favorites.indexOf(docId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
