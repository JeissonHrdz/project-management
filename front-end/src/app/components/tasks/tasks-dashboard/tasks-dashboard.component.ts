import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentText, heroRectangleStack, heroListBullet, heroArrowPathRoundedSquare, heroCalendar, heroViewColumns } from '@ng-icons/heroicons/outline';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-tasks-dashboard',
  imports: [NgIcon, RouterModule],
  providers: [provideIcons({heroDocumentText,heroRectangleStack, heroListBullet, heroArrowPathRoundedSquare, heroCalendar, heroViewColumns})],
  templateUrl: './tasks-dashboard.component.html', 
  styleUrl: './tasks-dashboard.component.css'
})
export class TasksDashboardComponent {

private router = inject(Router);
private route = inject(ActivatedRoute);

  openItem(item: string, id?: string) {
    $(".active").removeClass("active");
    $("#"+id).addClass("active");
    if (item == 'board') {
      this.router.navigate(['board'], {
        relativeTo: this.route
      });
    }
    if (item == 'list') {
      this.router.navigate(['list'], {
        relativeTo: this.route
      });
    } 
    if (item == 'calendar') {
      this.router.navigate(['calendar'], {
        relativeTo: this.route
      });
    } 
  }


}
