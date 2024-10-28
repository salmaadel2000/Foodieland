import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Recipe } from '../../../../shared/interfaces/recipe.model';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'] 
})
export class SliderComponent implements OnInit {
  recipesItems: Recipe[] = [];
  isSmallScreen: boolean = false;

  constructor(private RecipesService: RecipesService, @Inject(PLATFORM_ID) private platformId: Object) {} 

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.isSmallScreen = window.innerWidth <= 670; 
    }
  }

  ngOnInit(): void {
    this.RecipesService.getrecipesItems().subscribe(items => {
      this.recipesItems = items.slice(0, 2); 
      this.onResize(); 
    });
  }
  
  viewRecipe(id: string): void {
    this.RecipesService.getRecipeById(id).subscribe(recipe => {
      console.log(recipe); 
    });
  }
}
