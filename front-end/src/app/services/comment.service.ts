import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from '../core/model/entity/comment.model';

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

  getCommentsByTask(taskId: number): Observable<any> {
    return this.http.get<any>(this.urlBase + '/comment-task/' + taskId).pipe(
      catchError(this.handleError)
    )
  }

  updateComment(comment: any): Observable<any> {
    return this.http.put<any>(this.urlBase + '/update', comment).pipe(
      catchError(this.handleError)
    )
  }

  deleteComment(comment_id: number): Observable<any> {
    return this.http.delete<any>(this.urlBase + '/delete/' + comment_id).pipe(
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
