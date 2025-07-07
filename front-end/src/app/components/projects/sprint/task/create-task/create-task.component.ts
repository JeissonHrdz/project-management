import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  formTask: FormGroup;
  backlogItems: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formTask = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
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
