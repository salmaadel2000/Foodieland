import { Component,OnInit } from '@angular/core';
import { Recipe } from '../../../../shared/interfaces/recipe.model';
import { CarouselService } from '../../../../shared/services/carousel.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {
  carouselItems: Recipe[] = [];

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.getCarouselItems().subscribe(items => {
      this.carouselItems = items;
    });
  }

  viewRecipe(id: string): void {
    this.carouselService.getRecipeById(id).subscribe(recipe => {
      console.log(recipe); 
    });
  }
}