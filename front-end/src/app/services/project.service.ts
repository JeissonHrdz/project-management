import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Project } from '../core/model/entity/project.model';
import { ClassInterceptor } from '../core/auth/interceptors/class-interceptor';
import { ProjectCreateDTO } from '../core/model/dto/project-create-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private urlBase: string = environment.baseUrl + '/project';  
  private http = inject(HttpClient);
   _projectId = signal<number>(0);

  createProject(project: ProjectCreateDTO): Observable<Project> {
    return this.http.post<Project>(this.urlBase + '/create', project).pipe(
      catchError(this.handleError)
    )
  }

  getAllProjects(scrum_master_id: string ): Observable<any> {
    return this.http.get<any>(this.urlBase + '/projects', { params: { scrum_master_id: scrum_master_id } }).pipe(    
      catchError(this.handleError)
    )
  }

  getProjectById(projectId: number): Observable<any> {
    this._projectId.set(projectId);   
    return this.http.get<any>(this.urlBase + '/' + projectId).pipe(  
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

  constructor() { }
}
