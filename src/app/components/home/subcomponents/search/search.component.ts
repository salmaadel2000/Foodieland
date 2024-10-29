import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleRecipesComponent } from '../simple-recipes/simple-recipes.component';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../../../shared/interfaces/recipe.model';
import { RecipesService } from '../../../../shared/services/recipes.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleRecipesComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  recipesItems: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm: string = '';
  noResults: boolean = false; 

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.getrecipesItems().subscribe(items => {
      this.recipesItems = items;
      this.filteredRecipes = items;
    });
  }

  onSearchChange() {
    this.filteredRecipes = this.recipesItems.filter(item =>
      item.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    this.noResults = this.filteredRecipes.length === 0 && this.searchTerm !== '';
  }
}
