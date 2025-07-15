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

@Component({
  selector: 'app-task-detail',
  imports: [NgIcon, FormsModule],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  task: Task = {} as Task;

  ngOnInit(): void {
    this.getTaskDetail();
    $("#modal-task-detail").toggle("fast");
    $(".modal-container").animate({ width: '450px' }, 150);
  }

  toggleEditField(field: 'status' | 'priority' | 'type' | 'estimated-hours' | 'start-date'
    | 'end-date' | 'actual-hours' | 'title' | 'description') {
    $(`.${field}-select`).toggle();
    $(`.${field}-span`).toggle();
    this.setInputValue(field, $(`.${field}-span`).text());
  }

  setInputValue(field: 'status' | 'priority' | 'type' | 'estimated-hours' | 'start-date'
    | 'end-date' | 'actual-hours' | 'title' | 'description', value: string) {
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
    const [month, day, year] = new Date(date).toLocaleDateString().split('/').map(Number);  
    let monthFormatted = month+'';
    let dayFormatted = day+'';
    if(month < 10) {
      monthFormatted = '0' + month;
    }
    if(day < 10) {
      dayFormatted = '0' + day;
    } 
    return `${year}-${monthFormatted}-${dayFormatted}`; 
  }

  closeModal() {
    $(".modal-container").animate({ width: '0px' }, 150, () => {
      $("#modal-task-detail").toggle("fast", () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    });

  }

  getTaskDetail() {
    const taskId = Number(this.route.snapshot.queryParamMap.get('task_id'));
    const sprintId = Number(this.route.snapshot.queryParamMap.get('sprint_id'));
    this.taskService.getTaskById(taskId, sprintId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.task = response.object;
        console.log(this.task);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
