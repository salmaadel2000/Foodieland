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
        console.log(this.loadFavoriteRecipes)
      }
      this.isLoading = false;
    });
  }

  loadFavoriteRecipes(): void {
    if (this.isAuthenticated) {
      this.recipesService.getFavoriteRecipes().subscribe(
        (recipes) => {
          console.log(recipes);
          this.favoriteRecipes = recipes;

        
        },
        (error) => {
          console.error('Error loading favorite recipes:', error);
        }
      );
    } 
  }

  async removeHeart(recipe: Recipe):Promise<void> {
    console.log(recipe)
    console.log(this.isAuthenticated)
    console.log(recipe.isHearted)
    if (this.isAuthenticated && recipe.isHearted) {
     console.log(recipe.docId)
     await this.recipesService.removeFavoriteRecipe(recipe.docId).then(() => {
        recipe.isHearted = false;
        this.favoriteRecipes = this.favoriteRecipes.filter(r => r.docId != recipe.docId);
        console.log('Recipe removed from favorites:', recipe);
        
      }).catch(error => {
        console.error('Error removing recipe from favorites in database:', error);
      });
    }
  }
}
