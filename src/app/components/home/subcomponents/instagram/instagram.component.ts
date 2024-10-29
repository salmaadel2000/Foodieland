import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram.component.html',
  styleUrl: './instagram.component.scss'
})
export class InstagramComponent implements OnInit{
  foodImages: string[] = [];
  counter: number = 1;
  ngOnInit() {
    while (this.foodImages.length < 4) {
      this.addImage();
    }
  }
  addImage() {
    if (this.foodImages.length < 4) {
      this.foodImages.push(`food${this.counter}.png`);
      this.counter++;
    }
  }
}
