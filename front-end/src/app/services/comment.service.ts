import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlBase: string = environment.baseUrl + '/comments';
  private http = inject(HttpClient);

  constructor() { }

  createComment(comment: Comment): Observable<any> {
    return this.http.post<any>(this.urlBase + '/create', comment).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code ${error.status}`;
    }
    return throwError(errorMessage);
  }

}
