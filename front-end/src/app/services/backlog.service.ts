import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BacklogItem } from '../core/model/entity/backlog-item.model';
import { BacklogEpicCreateDTO } from '../core/model/dto/Backlog-epic-create-dto';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

    private projectId:number = Number(localStorage.getItem('projectId')); // Assuming you have a ProjectService to get the current project ID
    private urlBase: string = environment.baseUrl + '/project'  

  constructor(private http : HttpClient) { }

  createEpic(epic: BacklogEpicCreateDTO ): Observable<any> {      
   
    return this.http.post<any>(this.urlBase + '/' + epic.project_id + '/backlog/create-epic', epic).pipe(
      catchError(this.handleError)
    )
  }

  createStory(story: BacklogItem): Observable<any> {
    return this.http.post<any>(this.urlBase + '/' + this.projectId + '/backlog/create-story', story).pipe(
      catchError(this.handleError)
    )
  }

  getEpics(projectId: number): Observable<any> {
    return this.http.get<any>(this.urlBase + '/' + projectId + '/backlog/items/EPIC').pipe(
      catchError(this.handleError)
    )
  }

  getStories(projectId: number): Observable<any> {
    return this.http.get<any>(this.urlBase + '/' + projectId + '/backlog/items/USER_STORY').pipe(
      catchError(this.handleError)
    )
  }

  getBacklogItemById(itemId: number): Observable<any> {
    return this.http.get<any>(this.urlBase + '/' + this.projectId + '/backlog/item/' + itemId).pipe(
      catchError(this.handleError)
    )
  }

  updateItem(item: BacklogItem, itemId: number, projectId: number): Observable<any> {  
    return this.http.patch<any>(this.urlBase + '/' + projectId + '/backlog/update/' + itemId, item).pipe(
      catchError(this.handleError)
    )
  }

  deleteEpic(epicId: number): Observable<any> {
    return this.http.delete<any>(this.urlBase + '/' + this.projectId + '/backlog/delete/' + epicId).pipe(
      catchError(this.handleError)
    )
  }

  deleteStory(itemId: number): Observable<any> {
    return this.http.delete<any>(this.urlBase + '/' + this.projectId + '/backlog/delete-story/' + itemId).pipe(
      catchError(this.handleError)
    )
  }

    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('Se ha producio un error ', error.error);
      }
      else {
        console.error('Backend retornó el código de estado ', error.status, error.error);
      }
      return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
    }

}
