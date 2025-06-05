import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck } from '@ng-icons/heroicons/outline';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../core/model/entity/project.model';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from '../../dashboard/main-menu/main-menu.component';


@Component({
  selector: 'app-dashboard-project', 
  imports: [ NgIcon,RouterModule, CommonModule, MainMenuComponent ],
  providers: [ provideIcons({ heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck }) ],
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

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap(params => { 
        this.projectId = Number(params.get('projectId'));
        return this.projectService.getProjectById(this.projectId).pipe(
          catchError(error => {
            console.error('Error fetching project:', error);
            return of(null); // Return null or handle the error as needed
          }) 
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(project => {
      if (project) {      
        this.project = project.object;
        if (this.project) {
          this.projectService.projectId.set(this.project.project_id); // Set the projectId in the service
        }
      }
    }); 
    
  }


  openItem(item: string) {
    if(item == 'backlog') {
      this.router.navigate(['/project/' + this.projectId + '/dashboard/backlog'],{
        relativeTo: this.route
      });
    }
  }

}
