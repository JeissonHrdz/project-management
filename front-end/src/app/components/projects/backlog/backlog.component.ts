import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTurnDownRight, heroEllipsisHorizontal } from '@ng-icons/heroicons/outline'; 

@Component({
  selector: 'app-backlog',
  imports: [ NgIcon ],
  providers: [provideIcons({ heroArrowTurnDownRight, heroEllipsisHorizontal })],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
}) 
export class BacklogComponent {

}
