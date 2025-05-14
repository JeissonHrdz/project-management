import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { sign } from 'crypto';
import $ from 'jquery';


@Component({
  selector: 'app-create-project-modal',
  imports: [NgIcon,CommonModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {
  
  @Input() isModalOpen: boolean = false;
  openModalCreateProject = signal(true);
  @Output() childEvent = new EventEmitter<any>();
  
  close(){
    this.isModalOpen = false;
    this.openModalCreateProject.set(false);
    this.childEvent.emit(this.isModalOpen);
  }
  

  moveSlideForm(direction : string){
    if(direction == "left"){
      $("#gridForm").animate({scrollLeft: "+=600px"}, "fast");
    } else {
    $("#gridForm").animate({scrollLeft: "-=600px"}, "fast");
    }
  
  }

}
