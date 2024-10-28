import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories = [
    { name: 'Breakfast', image: 'assets/images/car1.png', gradient: 'gradient-black' },
    { name: 'Vegan', image: 'assets/images/car5.png', gradient: 'gradient-green' },
    { name: 'Meat', image: 'assets/images/car4.png', gradient: 'gradient-red' },
    { name: 'Dessert', image: 'assets/images/car3.png', gradient: 'gradient-orange' },
    { name: 'Lunch', image: 'assets/images/car2.png', gradient: 'gradient-black' },
    { name: 'Chocolate', image: 'assets/images/car6.png', gradient: 'gradient-black' }
  ];
  
  getGradient(gradient: string) {
    switch (gradient) {
      case 'gradient-black':
        return 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.05) 100%)';
      case 'gradient-orange':
        return 'linear-gradient(180deg, rgba(240, 158, 0, 0.00) 0%, rgba(240, 158, 0, 0.10) 100%)';
      case 'gradient-red':
        return 'linear-gradient(180deg, rgba(204, 38, 27, 0.00) 0%, rgba(204, 38, 27, 0.10) 100%)';
      case 'gradient-green':
        return 'linear-gradient(180deg, rgba(108, 198, 63, 0.00) 0%, rgba(108, 198, 63, 0.10) 100%)';
      case 'gradient-blue':
        return 'linear-gradient(180deg, rgba(231, 249, 253, 0.00) 0%, #E7F9FD 100%)';
      default:
        return 'none';
    }
  }
  
}
