import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-board',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent { 

  private destroy$ = new Subject<void>();
  private taskService = inject(TaskService);
  private sprintService = inject(SprintService);
  private authService = inject(AuthServiceService)
  user_id = this.authService.getIdfromToken() ?? ""
  sprints: Sprint[] = [];
  

  tasksTodo: Task[] = [];
  tasksProgress: Task[] = [];
  tasksDone: Task[] = [];

  colorPriority: { [key: string]: string } = {
    high: 'orange',
    medium: 'yellow',
    low: 'green',
    critical: 'red'
  }



  ngOnInit(): void {
    this.taskService.getTasksByUser(this.user_id, 0).pipe(
      takeUntil(this.destroy$) 
    ).subscribe(data => {
      this.tasksTodo = data.object.filter((task: Task) => task.status === 'pending');    
      this.tasksProgress = data.object.filter((task: Task) => task.status === 'in_progress');       
      this.tasksDone = data.object.filter((task: Task) => task.status === 'completed'); 
      data.object.forEach((task: Task) => {
        this.getSprintById(task.sprint_id);
      })      
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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {   
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);    
    } else {
     const task_id: number = Number(event.item.element.nativeElement.id.split('-')[1]);
     const status =  event.container.id    
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
