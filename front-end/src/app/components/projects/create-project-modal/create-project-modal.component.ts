import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { sign } from 'crypto';
import $ from 'jquery';
import { ProjectService } from '../../../services/project.service';
import { ClassInterceptor } from '../../../core/auth/interceptors/class-interceptor';


@Component({
  selector: 'app-create-project-modal',
  imports: [NgIcon,CommonModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {

  formProject: FormGroup | any

  private projectService = inject(ProjectService)

  
  @Input() isModalOpen: boolean = false;
  openModalCreateProject = signal(true);
  @Output() childEvent = new EventEmitter<any>();

  constructor(private form: FormBuilder) {
    this.formProject = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      estimated_end_date: ['', [Validators.required]],
      product_owner_id: ['', [Validators.required]],
      scrum_master_id: ['', [Validators.required]]
    })
   }

   sendFormCreateProject(){ 
    if(this.formProject.valid){
      this.projectService.createProject(this.formProject.value).subscribe({
        next: (response) => {
          console.log(response);
          this.close();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
   }
  
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

    hasErrors(controlName: string, errorType: string) {
    return (
      this.formProject.get(controlName)?.hasError(errorType) &&
      this.formProject.get(controlName)?.touched
    );
  }

}
