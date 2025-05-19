import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { ProjectService } from '../../../services/project.service';
import { AuthServiceService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-create-project-modal',
  imports: [NgIcon,CommonModule, ReactiveFormsModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {

  formProject: FormGroup | any
  user_id:string = "" ;

  private projectService = inject(ProjectService)
  private authService = inject(AuthServiceService)

  
  @Input() isModalOpen: boolean = false;
  openModalCreateProject = signal(true);
  @Output() childEvent = new EventEmitter<any>();

  constructor(private form: FormBuilder) {

    this.user_id = this.authService.getIdfromToken(this.authService.userToken) ?? ""

    this.formProject = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      estimated_end_date: ['', [Validators.required]],
      product_owner_id: [''+this.user_id, [Validators.required]],
      scrum_master_id: [''+this.user_id, [Validators.required]]
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
    } else {
       this.formProject.markAllAsTouched();    
      $('#name').addClass('is-invalid');
      $('#description').addClass('is-invalid');
      $('#start_date').addClass('is-invalid');
      $('#estimated_end_date').addClass('is-invalid');     
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
