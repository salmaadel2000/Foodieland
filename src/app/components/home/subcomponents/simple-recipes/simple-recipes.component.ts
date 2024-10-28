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
  favorites: number[] = []; 


  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipesService.getrecipesItems().subscribe(items => {
      this.recipesItems = items;

    });
  }

  toggleHeart(item: Recipe): void {
    const token = localStorage.getItem('token');
    if (token) {
      item.isHearted = !item.isHearted;
  
      if (!item.isHearted) {
        this.recipesService.saveFavoriteRecipe(item).then((docId) => {
          item.docId = docId; 
          console.log('Recipe added to favorites!' ,item);
          this.updateFavorites(item, true);
        }).catch((error) => {
          console.error('Error adding recipe to favorites: ', error);
        });
      } else {
        this.recipesService.removeFavoriteRecipe(item.docId!).then(() => { 
          console.log('Recipe removed from favorites!', item);
          this.updateFavorites(item, false); 
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
    const docId = recipe.id;

    if (!isHearted) {
      if (!this.favorites.includes(docId)) {
        this.favorites.push(docId);
      }
    } else {

      const index = this.favorites.indexOf(docId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    }


    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
