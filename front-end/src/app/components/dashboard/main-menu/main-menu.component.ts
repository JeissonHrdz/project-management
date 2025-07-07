import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroSquares2x2, heroRectangleGroup, heroUsers, heroCog6Tooth, heroMagnifyingGlass, heroQuestionMarkCircle, heroArrowLeftStartOnRectangle,
   heroBell, heroChevronDown } from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { Project } from '../../../core/model/entity/project.model';
import { ProjectService } from '../../../services/project.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-main-menu',
  imports: [NgIcon, RouterLink, CommonModule,],
  providers: [provideIcons({ heroSquares2x2, heroRectangleGroup, heroUsers, heroCog6Tooth, heroQuestionMarkCircle,
     heroMagnifyingGlass, heroBell, heroChevronDown, heroArrowLeftStartOnRectangle })],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  private projectService = inject(ProjectService)
  private authService = inject(AuthServiceService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  projects: Project[] = [];

  ngOnInit() {
    this.projectService.getAllProjects(this.authService.getIdfromToken() ?? "").pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.projects = data.object;
    })
  }

  gotoProject(projectId: number) {
    console.log(projectId);
    this.projectService._projectId.set(projectId);
    localStorage.setItem('PPIN', projectId.toString());
    this.router.navigate(['app/project/dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  openMenuProjects() {
    $('.menu-projects').animate({ height: "toggle" }, "fast");
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
