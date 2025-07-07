import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  formTask: FormGroup;
  backlogItems: any[] = [];

  ngOnInit(): void {
    $("#modal-create-task").toggle('fast');
  }

  constructor(private formBuilder: FormBuilder) {
    this.formTask = this.formBuilder.group({
      title: ['', Validators.required],
      backlog_item: ['', Validators.required],
      priority: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      estimated_hours: ['', Validators.required],
      status: ['', Validators.required],
      project_id: ['', Validators.required],
      sprint_id: ['', Validators.required]
    });
  }

  closeModal() {
    $("#modal-create-task").toggle('fast',()=>{
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

  hasErrors(controlName: string, validation: string, type: string): boolean {
    const control = this.formTask.get(controlName);
    if (!control) return false;
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  createTask() {
    if (this.formTask.valid) {
      console.log(this.formTask.value);
    }
  }
}
