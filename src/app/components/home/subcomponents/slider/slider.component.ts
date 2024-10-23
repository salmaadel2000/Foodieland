import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Recipe } from '../../../../shared/interfaces/recipe.model';
import { CarouselService } from '../../../../shared/services/carousel.service';
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
  carouselItems: Recipe[] = [];
  isSmallScreen: boolean = false;

  constructor(private carouselService: CarouselService, @Inject(PLATFORM_ID) private platformId: Object) {} 

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.isSmallScreen = window.innerWidth <= 670; 
    }
  }

  ngOnInit(): void {
    this.carouselService.getCarouselItems().subscribe(items => {
      this.carouselItems = items;
      this.onResize(); // Call without arguments
    });
  }

  viewRecipe(id: string): void {
    this.carouselService.getRecipeById(id).subscribe(recipe => {
      console.log(recipe); 
    });
  }
}
