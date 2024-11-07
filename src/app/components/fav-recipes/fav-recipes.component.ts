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
          console.log("Fetched favorite recipes with docId:", recipes);
          this.favoriteRecipes = recipes;
        },
        (error) => {
          console.error('Error loading favorite recipes:', error);
        }
      );
    } 
  }
  
   
  deleteHeart(item: Recipe): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (item.isHearted) {
        item.isHearted = false;
        this.updateFavorites(item, false);
  
        if (item.docId) {
          this.recipesService.removeFavoriteRecipe(item.docId).then(() => {
            console.log("delllllllllllllllll", item);
          }).catch((error) => {
            console.error('Error removing recipe from favorites: ', error);
          });
        } else {
          console.error('Document ID is missing for recipe:', item);
        }
      }
    }
  }
  
  
  
  private updateFavorites(recipe: Recipe, isHearted: boolean): void {
    const recipeId = recipe.id;
    if (isHearted) {
      if (!this.favorites.includes(recipeId)) {
        this.favorites.push(recipeId);
      }
    } else {
      const index = this.favorites.indexOf(recipeId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    }
  }
  
}
