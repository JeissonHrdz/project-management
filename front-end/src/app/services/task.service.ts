import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { TaskCreateDTO } from '../core/model/dto/task-create-dto';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Task } from '../core/model/entity/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlBase: string = environment.baseUrl + '/project';
  private http = inject(HttpClient);
  private projectId = inject(ProjectService)._projectId();

  private taskCreated = new BehaviorSubject<Task>({} as Task);
  taskCreated$ = this.taskCreated.asObservable();


  createTask(task: TaskCreateDTO): Observable<any> {
    return this.http.post<any>(this.urlBase + '/' + this.projectId + '/sprint/' + task.sprint_id + '/task/create', task).pipe(
      catchError(this.handleError),
      tap((data) => {
        this.taskCreated.next(data.object);
      })
    )

  }
  getTasksBySprint(sprint_id: number): Observable<any> {
    return this.http.get<any>(this.urlBase + '/' + this.projectId + '/sprint/' + sprint_id + '/task/tasks').pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

}