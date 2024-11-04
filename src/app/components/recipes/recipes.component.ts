import { Component } from '@angular/core';
import { InboxComponent } from '../home/subcomponents/inbox/inbox.component';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [InboxComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {

}
