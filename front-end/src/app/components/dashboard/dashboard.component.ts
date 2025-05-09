import { Component } from '@angular/core';
import { MainMenuComponent } from "./main-menu/main-menu.component";

@Component({
  selector: 'app-dashboard',
  imports: [MainMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
