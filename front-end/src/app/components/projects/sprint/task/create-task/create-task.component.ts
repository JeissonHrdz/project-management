import { Component, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';
import { BacklogItem } from '../../../../../core/model/entity/backlog-item.model';
import { BacklogService } from '../../../../../services/backlog.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../../../../services/task.service';
import { ToastService } from '../../../../../services/toast.service';
import { EventEmitter } from 'node:stream';
import { Task } from '../../../../../core/model/entity/task';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private backlogService = inject(BacklogService);
  private taskService = inject(TaskService);
  private projectId = parseInt(localStorage.getItem('PPIN') ?? '0');
  private toastService = inject(ToastService);


  formTask: FormGroup;
  backlogItems: BacklogItem[] = [];
  epics: BacklogItem[] = [];
 

  ngOnInit(): void {
   
    $("#modal-create-task").toggle('fast');
    
    this.getBacklogItems();    
  }

  constructor(private formBuilder: FormBuilder) {
    this.formTask = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      project_id: [this.projectId, Validators.required],
      sprint_id: [this.route.snapshot.queryParams['sprint_id'], Validators.required],
      backlog_item_id: ['', Validators.required],
      priority: ['', Validators.required],
      type: ['', Validators.required],      
      estimated_hours: ['',Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['pending', Validators.required],
    });
  }

  getBacklogItems() {
    this.backlogService.getStories(this.projectId).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.backlogItems = data.object;
    });
    this.backlogService.getEpics(this.projectId).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.epics = data.object;
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
    console.log(this.formTask.value);
    if (this.formTask.valid) {     
      this.taskService.createTask(this.formTask.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.taskService.tasks.update((tasks:Task[]) => [...tasks, data.object]);
          this.toastService.toast('Task created successfully', 'success');
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.formTask.markAllAsTouched();
      this.formTask.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
