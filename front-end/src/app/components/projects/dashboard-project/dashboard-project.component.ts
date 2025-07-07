import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck } from '@ng-icons/heroicons/outline';
import {  Subject,  takeUntil } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../core/model/entity/project.model';
import { CommonModule } from '@angular/common';
import $ from 'jquery';


@Component({
  selector: 'app-dashboard-project',
  imports: [NgIcon, RouterModule, CommonModule],
  providers: [provideIcons({ heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck })],
  templateUrl: './dashboard-project.component.html',
  styleUrl: './dashboard-project.component.css'
})
export class DashboardProjectComponent {

  private destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  projectId: number = 0;
  project: Project | null = null;


  constructor() {
    // Effect to log projectId changes
    effect(() => {     
        this.getProjectInfo();
    });    // Subscribe to projectId changes
  
  }  

  ngOnInit() {
    this.getProjectInfo();
  }
  

  getProjectInfo() {
    this.projectId = this.projectService._projectId() ?? 0;
    if (this.projectId == 0) {
      this.projectId = parseInt(localStorage.getItem('PPIN') ?? '0');
    }  
    
    this.projectService.getProjectById(this.projectId).pipe(
      takeUntil(this.destroy$))
      .subscribe(project => {
        this.project = project;
        if (project) {
          this.project = project.object;    
            
        }
      })
  }


  openItem(item: string, id?: string) {
    $(".active").removeClass("active");
    $("#"+id).addClass("active");
    if (item == 'backlog') {
      this.router.navigate(['backlog'], {
        relativeTo: this.route
      });
    }
    if (item == 'sprints') {
      this.router.navigate(['sprints'], {
        relativeTo: this.route
      });
    } 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
