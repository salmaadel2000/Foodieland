import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Recipe } from '../../../../shared/interfaces/recipe.model';
import { RecipesService } from '../../../../shared/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simple-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-recipes.component.html',
  styleUrls: ['./simple-recipes.component.scss']
})
export class SimpleRecipesComponent implements OnInit {
  recipesItems: Recipe[] = [];
  favorites: { id: number; docId: string }[] = [];

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedFavorites = localStorage.getItem('favorites');
      this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    } else {
      this.favorites = [];
    }

    this.recipesService.getrecipesItems().subscribe(items => {
      this.recipesItems = items.map(item => {
        const favoriteItem = this.favorites.find(fav => fav.id === item.id);
        item.isHearted = !!favoriteItem;
        item.docId = favoriteItem?.docId || '';
        return item;
      });
    });
  }

  toggleHeart(item: Recipe): void {
    const token = localStorage.getItem('token');

    if (token) {
      if (!item.isHearted) {
        item.isHearted = true;
        this.recipesService.saveFavoriteRecipe(item).then((docId) => {
          item.docId = docId;
          console.log('Recipe added to favorites!', item);
          this.updateFavorites(item, true);
          console.log('Updated favorites in localStorage:', this.favorites);
        }).catch((error) => {
          console.error('Error adding recipe to favorites: ', error);
        });
      } else if (item.docId) {
        this.recipesService.removeFavoriteRecipe(item.docId).then(() => {
          item.isHearted = false;
          console.log('Recipe removed from favorites!', item);
          this.updateFavorites(item, false);
          console.log('Updated favorites in localStorage:', this.favorites);
        }).catch((error) => {
          console.error('Error removing recipe from favorites: ', error);
        });
      }
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'You should login first',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private updateFavorites(recipe: Recipe, isHearted: boolean): void {
    if (isHearted) {
      if (!this.favorites.some(fav => fav.id === recipe.id)) {
        this.favorites.push({ id: recipe.id, docId: recipe.docId });
      }
    } else {
      this.favorites = this.favorites.filter(fav => fav.id !== recipe.id);
    }

    // Save updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
