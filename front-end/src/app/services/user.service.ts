import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../core/model/entity/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = environment.baseUrl + '/users';
  private http = inject(HttpClient);
  userAssignedByTask = signal<{ [task_id: number]: User[] }>({}); 


  getEmailUser(email: string ): Observable<any> {
    return this.http.get<any>(this.urlBase + '/find-email', { params: { email: email } }).pipe(
      catchError(this.handleError)
    );
  }

  getUsersByTaskAssigned(task_id: number): Observable<any> {
    return this.http.get<any>(this.urlBase +  '/users-task', { params: { task_id: task_id } }).pipe(
      catchError(this.handleError)
    );
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
