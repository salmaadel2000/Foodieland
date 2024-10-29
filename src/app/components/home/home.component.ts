import { Component } from '@angular/core';
import { SliderComponent } from './subcomponents/slider/slider.component';
import { CategoriesComponent } from './subcomponents/categories/categories.component';
import { SimpleRecipesComponent } from './subcomponents/simple-recipes/simple-recipes.component';
import { InstagramComponent } from './subcomponents/instagram/instagram.component';
import { SearchComponent } from './subcomponents/search/search.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategoriesComponent, SimpleRecipesComponent, InstagramComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
