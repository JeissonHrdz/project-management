import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dashboard-project', 
  imports: [ NgIcon ],
  providers: [ provideIcons({ heroDocumentText, heroRectangleStack, heroArrowPathRoundedSquare, heroDocumentCheck }) ],
  templateUrl: './dashboard-project.component.html',
  styleUrl: './dashboard-project.component.css'
})
export class DashboardProjectComponent {

}
