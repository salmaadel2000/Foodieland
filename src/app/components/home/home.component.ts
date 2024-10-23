import { Component } from '@angular/core';
import { SliderComponent } from './subcomponents/slider/slider.component';
import { CategoriesComponent } from './subcomponents/categories/categories.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
