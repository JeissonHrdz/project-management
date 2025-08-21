import { Component, inject, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,} from '@angular/cdk/drag-drop';
import { TaskService } from '../../../services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Task } from '../../../core/model/entity/task';
import { SprintService } from '../../../services/sprint.service';
import { Sprint } from '../../../core/model/entity/sprint.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgIcon,provideIcons } from '@ng-icons/core';
import { heroEllipsisVertical } from '@ng-icons/heroicons/outline'; 

@Component({
  selector: 'app-board',
  imports: [CdkDrag, CdkDropList, RouterOutlet, NgIcon],
  providers: [provideIcons({heroEllipsisVertical})],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent { 

  private destroy$ = new Subject<void>();
  private taskService = inject(TaskService);
  private sprintService = inject(SprintService);
  private authService = inject(AuthServiceService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  user_id = this.authService.getIdfromToken() ?? ""
  sprints: Sprint[] = [];
  tasks: Task[] = [];

  tasksTodo: Task[] = [];
  tasksProgress: Task[] = [];
  tasksDone: Task[] = [];

  colorPriority = signal<{ [key: string]: string }>({})



  ngOnInit(): void {
    this.taskService.getTasksByUser(this.user_id, 0).pipe(
      takeUntil(this.destroy$) 
    ).subscribe(data => {
      this.tasks = data.object;    
      this.tasksTodo = data.object.filter((task: Task) => task.status === 'pending');    
      this.tasksProgress = data.object.filter((task: Task) => task.status === 'in_progress');       
      this.tasksDone = data.object.filter((task: Task) => task.status === 'completed'); 
      data.object.forEach((task: Task) => {
        this.getSprintById(task.sprint_id);
      })      
    })

    this.colorPriority.set({
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low',
      critical: 'priority-critical'
    })
  }

  getSprintById(sprintId: number) {
    this.sprintService.getSprintById(sprintId).pipe(
      takeUntil(this.destroy$) 
    ).subscribe(data => {     
      this.sprints.push(data.object);
    })
  }

  updateTask(taskId: number, statusNew: string) {
    const status: { [key: string]: string } = {
      'cdk-drop-list-0': 'pending',
      'cdk-drop-list-1': 'in_progress',
      'cdk-drop-list-2': 'completed'
    };
    const data = {
      status: status[statusNew] 
    };
    this.taskService.updateTask(taskId, 0, data).pipe( 
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
      
      },
      error: (error) => {
        console.log(error);
      }
    })     
  }

  progressBarDasy( start_date: string, end_date: string) {
    const dateNow = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); 
    const elapsedDays = Math.ceil((dateNow.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const progress = (elapsedDays / diffDays) * 100;
    if(progress > 100){
      return 100;
    }
    return progress.toFixed();
    
  }

  dateFormat(date: string) {
    return new Date(date).getDay()
  }

  openModalTaskDetail(taskId: number, sprintId: number) {   
    this.taskService.taskSelected.set(this.tasks.find(task => task.task_id === taskId) ?? {} as Task);
 
    this.router.navigate(['task-detail'], {
      relativeTo: this.route,
      queryParams: {
        task_id: taskId,
        sprint_id: sprintId
      },
      skipLocationChange: true
    });
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {   
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);    
    } else {
     const task_id: number = Number(event.item.element.nativeElement.id.split('-')[1]);
     const status =  event.container.id   
     alert(status) 
      this.updateTask(task_id, status);   
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
