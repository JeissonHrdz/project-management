import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTurnDownRight, heroEllipsisHorizontal } from '@ng-icons/heroicons/outline'; 
import $ from 'jquery';

@Component({
  selector: 'app-backlog',
  imports: [ NgIcon ],
  providers: [provideIcons({ heroArrowTurnDownRight, heroEllipsisHorizontal })],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
}) 
export class BacklogComponent {


  viewMenu(id: string): void {
    const menu = document.getElementById(id);
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  showFormEpic(){
    $("#form-epic").animate({ height: "toggle" }, "fast");
  }

}
