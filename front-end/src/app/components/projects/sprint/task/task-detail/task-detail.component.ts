import { Component, inject } from '@angular/core';
import $ from 'jquery';
import { TaskService } from '../../../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark, } from '@ng-icons/heroicons/outline';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Task } from '../../../../../core/model/entity/task';
import { FormsModule } from '@angular/forms';
import { BacklogService } from '../../../../../services/backlog.service';
import { BacklogItem } from '../../../../../core/model/entity/backlog-item.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-task-detail',
  imports: [NgIcon, FormsModule,CommonModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  private taskService = inject(TaskService);
  private backlogService = inject(BacklogService); 
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  task: Task = {} as Task;
  backlogItem: BacklogItem = {} as BacklogItem;

  ngOnInit(): void {
    this.getTaskDetail();
    $("#modal-task-detail").toggle("fast");
    $(".modal-container").animate({ width: '450px' }, 150);
  }

  toggleEditField(field: 'status' | 'priority' | 'type' | 'estimated_hours' | 'start_date'
    | 'end_date' | 'actual_hours' | 'title' | 'description') {
    $(`.${field}-select`).toggle();
    $(`.${field}-span`).toggle();
    this.setInputValue(field, $(`.${field}-span`).text());
  }

  setInputValue(field: 'status' | 'priority' | 'type' | 'estimated_hours' | 'start_date'
    | 'end_date' | 'actual_hours' | 'title' | 'description', value: string) {
    if(field === 'status' || field === 'priority' || field === 'type') { 
      $(`#${field}-input option[value='${value}']`).prop("selected", true);
    }else{
      $(`.${field}-input`).val(value);
    }
  }

  dateFormat(date: string) {
    return new Date(date).toDateString();
  }

  dateFormatInput(date: string) {
    const d = new Date(date);
    let monthFormatted = (d.getMonth()+1)+'';
    let dayFormatted = d.getDate()+'';
    let yearFormatted = d.getFullYear()+'';         

    monthFormatted = Number(monthFormatted) < 10 ? '0' + Number(monthFormatted) : monthFormatted;
    dayFormatted = Number(dayFormatted) < 10 ? '0' + Number(dayFormatted) : dayFormatted;
    return `${yearFormatted}-${monthFormatted}-${dayFormatted}`; 
  }

  closeModal() {
    $(".modal-container").animate({ width: '0px' }, 150, () => {
      $("#modal-task-detail").toggle("fast", () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    });
  }

  getBacklogItem( backlogItemId: number) {

    this.backlogService.getBacklogItemById(backlogItemId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.backlogItem = response.object; 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getTaskDetail() {
    this.task = this.taskService.taskSelected();
    this.getBacklogItem(this.task.backlog_item_id);    
  }

  updateTask(taskId: number, inputName: 'status' | 'priority' | 'type' | 'estimated_hours' | 'start_date' | 
    'end_date' | 'actual_hours' | 'title' | 'description') {
    const data = {
      [inputName]: $(`#task-${inputName}-input`).val()
    };
    this.taskService.updateTask(taskId, this.task.sprint_id, data).pipe( 
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.toggleEditField(inputName); 
        this.task = response.object;
        this.taskService.tasks.update((tasks) => tasks.map(task => task.task_id === taskId ? response.object : task));
        this.taskService.taskSelected.set(this.task);
        this.toastService.toast('Task updated successfully', 'success');
      },
      error: (error) => {
        console.log(error);
      }
    }) 
    
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId, this.task.sprint_id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.taskService.tasks.update((tasks) => tasks.filter(task => task.task_id !== taskId));
        this.taskService.taskSelected.set({} as Task);
        this.toastService.toast('Task deleted successfully', 'success');
        this.closeModal();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showBoxTaskAssigment() {
    $(".box-task-assigment").animate({ height: "toggle" }, "fast");
  }


}
