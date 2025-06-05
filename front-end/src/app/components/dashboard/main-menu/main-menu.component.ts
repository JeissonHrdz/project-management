import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell, heroChevronDown} from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { Project } from '../../../core/model/entity/project.model';
import { ProjectService } from '../../../services/project.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-main-menu',
  imports: [ NgIcon,RouterLink, CommonModule],
  providers: [provideIcons( { heroSquares2x2, heroRectangleGroup, heroUsers,heroCog6Tooth, heroMagnifyingGlass, heroBell, heroChevronDown } )],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
}) 
export class MainMenuComponent {

  private projectService = inject(ProjectService)
  private authService = inject(AuthServiceService)
  private destroy$ = new Subject<void>();
  
  projects:Project[] = [];

  ngOnInit(){
        this.projectService.getAllProjects(this.authService.getIdfromToken() ?? "").pipe( 
      takeUntil(this.destroy$)
      ).subscribe(data => {
        this.projects = data.object;      
      })     
  }

  openMenuProjects(){       
    $('.menu-projects').animate({ height: "toggle" }, "fast");
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
