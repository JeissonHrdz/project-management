import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-dashboard-project', 
  imports: [ NgIcon,RouterModule ],
  providers: [ provideIcons({ heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck }) ],
  templateUrl: './dashboard-project.component.html',
  styleUrl: './dashboard-project.component.css'
})
export class DashboardProjectComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);


  openItem(item: string) {
    if(item == 'backlog') {
      this.router.navigate(['/projects/backlog'],{
        relativeTo: this.route
      });
    }
  }

}
