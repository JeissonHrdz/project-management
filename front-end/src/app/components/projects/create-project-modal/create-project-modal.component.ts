import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import $ from 'jquery';

@Component({
  selector: 'app-create-project-modal',
  imports: [NgIcon,CommonModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {

  showDescriptionElement: boolean = false;  

  moveSlideForm(direction : string){
    if(direction == "left"){
      $("#gridForm").animate({scrollLeft: "+=600px"}, "fast");
    } else {
    $("#gridForm").animate({scrollLeft: "-=600px"}, "fast");
    }
  
  }

}
