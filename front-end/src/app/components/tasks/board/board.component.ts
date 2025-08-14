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

@Component({
  selector: 'app-board',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent { 

  private destroy$ = new Subject<void>();
  private taskService = inject(TaskService);
  private authService = inject(AuthServiceService)
  user_id = this.authService.getIdfromToken() ?? ""

  tasksTodo: Task[] = [];
  tasksProgress: Task[] = [];
  tasksDone: Task[] = [];



  ngOnInit(): void {
    this.taskService.getTasksByUser(this.user_id, 0).pipe(
      takeUntil(this.destroy$) 
    ).subscribe(data => {
      this.tasksTodo = data.object.filter((task: Task) => task.status === 'pending');    
      console.log(this.tasksTodo);   
      this.tasksProgress = data.object.filter((task: Task) => task.status === 'in_progress');       
      this.tasksDone = data.object.filter((task: Task) => task.status === 'completed');       
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
