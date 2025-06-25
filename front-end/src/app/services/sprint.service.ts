import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { catchError, Observable, throwError } from 'rxjs';
import { SprintCreateDTO } from '../core/model/dto/sprint-create.dto';
import { Sprint } from '../core/model/entity/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

    private urlBase: string = environment.baseUrl + '/project';  
    private http = inject(HttpClient);
    private projectId = inject(ProjectService)._projectId();


    createSprint(sprint: SprintCreateDTO): Observable<any> {
      return this.http.post<any>(this.urlBase + '/' + this.projectId + '/sprint/create', sprint).pipe(
        catchError(this.handleError)
      )
    }

    updateSprint(sprintId: number, sprint: Sprint): Observable<any> {
      return this.http.patch<any>(this.urlBase + '/' + this.projectId + '/sprint/update/' + sprintId, sprint).pipe(
        catchError(this.handleError)
      )
    }

    getSprints(): Observable<any> {
      return this.http.get<any>(this.urlBase + '/' + this.projectId + '/sprint/sprints').pipe(
        catchError(this.handleError)
      )
    }

    deleteSprint(sprintId: number): Observable<any> {
      return this.http.delete<any>(this.urlBase + '/' + this.projectId + '/sprint/delete/' + sprintId).pipe(
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

  constructor() { }
}
