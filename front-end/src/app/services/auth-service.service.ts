import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { UserLoginDTO } from '../core/model/dto/user-login-dto';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRegisterDTO } from '../core/model/dto/user-register-dto';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private urlBase: string = environment.baseUrl + '/auth';
  private http = inject(HttpClient);


  currentUser = signal<String>('');
  isAuthenticated = signal<Boolean>(false);

  constructor() {

    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentUser.set(localStorage.getItem('token') ?? '');
      if (this.currentUser() != '') {
        const expiration = this.getTimeExpiration();
        if (expiration && new Date() > new Date(Number(expiration) * 1000)) {
          this.isAuthenticated.set(false);
          this.currentUser.set('');
        } else {
          this.isAuthenticated = signal<Boolean>(localStorage.getItem('token') != null);
        }
      }


    }
  }

  login(credentials: UserLoginDTO): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.currentUser.set(response.token);
          this.isAuthenticated.set(true); // Set the authentication status to true
        }
      }),
      catchError((error) => {
        console.error('Login error:', error.message);
        throw error; // Rethrow the error for further handling if needed
      })
    )

  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set('');
    this.isAuthenticated.set(false);
  }

  register(credentials: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/register`, credentials).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => {
        console.error('Register error:', error.message);
        throw error; // Rethrow the error for further handling if needed
      })
    )
  }

  getTimeExpiration(): string {
    const token = this.currentUser();
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp;
  }

  getIdfromToken(): string {
    const token = this.currentUser();
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.UUID;
  }

  get userToken(): String {
    return this.currentUser();
  }

}
