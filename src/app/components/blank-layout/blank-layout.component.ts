import { Component } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlankComponent,RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
