import { Component, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { MainMenuComponent } from "../dashboard/main-menu/main-menu.component";
import { CreateProjectModalComponent } from "./create-project-modal/create-project-modal.component";
import $ from 'jquery';

import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DashboardProjectComponent } from "./dashboard-project/dashboard-project.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, DashboardProjectComponent], 
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
      animations: [
           trigger('fade', [
               state('visible', style({
                   opacity: 1
                  
               })),
               state('hide', style({
                   opacity: 0
                 
               })),
               transition('visible => hide', animate('300ms ease-out')),
               transition('hide => visible', animate('300ms ease-in'))
           ])
       ]
  
})
export class ProjectsComponent {
  openModalCreateProject = signal(false); 

  showModalCreateProject() { 
   // alert("showModalCreateProject");
    this.openModalCreateProject.update(value => !value);
  }

  handlerModalCreateProject(event: any) { 
   this.openModalCreateProject.set(event);
  }
 

}
