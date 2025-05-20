import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import $ from 'jquery';
import { ProjectService } from '../../../services/project.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ToastService } from '../../../services/toast.service';


@Component({
  selector: 'app-create-project-modal',
  imports: [NgIcon, CommonModule, ReactiveFormsModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {

  formProject: FormGroup | any
  user_id: string = "";
  errorDate: boolean = true

  private projectService = inject(ProjectService)
  private authService = inject(AuthServiceService)
  private toastService = inject(ToastService)


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
      product_owner_id: ['' + this.user_id, [Validators.required]],
      scrum_master_id: ['' + this.user_id, [Validators.required]]
    })
  }

  sendFormCreateProject() {   

      if (this.formProject.valid) {
         if (Date.parse(this.formProject.value.start_date) < Date.parse(this.formProject.value.estimated_end_date)) {
        this.projectService.createProject(this.formProject.value).subscribe({
          next: (response) => {
            console.log(response);
            this.close();
            this.toastService.toast('Project created successfully', 'success');
          },
          error: (error) => {
            console.log(error);
          }
        })
      } else {
        this.errorDate = false
         $('#start_date').addClass('is-invalid');
        $('#estimated_end_date').addClass('is-invalid');
     
      }
    } else {
         this.formProject.markAllAsTouched();
        $('#name').addClass('is-invalid');
        $('#description').addClass('is-invalid');
        $('#start_date').addClass('is-invalid');
        $('#estimated_end_date').addClass('is-invalid'); 
        this.toastService.toast('Please fill in all fields correctly', 'error');

       
    }
  }

  close() {
    this.isModalOpen = false;
    this.openModalCreateProject.set(false);
    this.childEvent.emit(this.isModalOpen);
  }


  moveSlideForm(direction: string) {
    if (direction == "left") {
      $("#gridForm").animate({ scrollLeft: "+=600px" }, "fast");
    } else {
      $("#gridForm").animate({ scrollLeft: "-=600px" }, "fast");
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formProject.get(controlName)?.hasError(errorType) &&
      this.formProject.get(controlName)?.touched
    );
  }

}
