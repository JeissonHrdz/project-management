import { Component } from '@angular/core';
import { MainMenuComponent } from "../dashboard/main-menu/main-menu.component";
import { CreateProjectModalComponent } from "./create-project-modal/create-project-modal.component";

@Component({
  selector: 'app-projects',
  imports: [MainMenuComponent, CreateProjectModalComponent], 
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
