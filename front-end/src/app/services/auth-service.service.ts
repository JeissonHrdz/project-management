import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { UserLoginDTO } from '../core/model/dto/user-login-dto';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'jquery';
import { ClassInterceptor } from '../core/auth/interceptors/class-interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private urlBase: string = environment.baseUrl + '/auth';
  private http  = inject(HttpClient);
 

  currentUser = signal<String>('');
  isAuthenticated = signal<Boolean>(false);

  constructor() {    
  this.currentUser = signal<String>(localStorage.getItem('token') || '');
 
    const token = this.currentUser();
    const expiration = token ? this.getTimeExpiration(token) : null;

    if (expiration && new Date() > new Date(Number(expiration)*1000) ) {
        this.isAuthenticated.set(false); 
        this.currentUser.set('');     
    } else{      
      this.isAuthenticated = signal<Boolean>(localStorage.getItem('token') != null);
    }

  }

  login(credentials: UserLoginDTO): Observable<any> {
  return this.http.post<any>(`${this.urlBase}/login`, credentials).pipe(
    tap((response) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this.currentUser.set(response.user); // Assuming the user object is in the response
        this.isAuthenticated.set(true); // Set the authentication status to true
      }
    }),
    catchError((error) => {
      console.error('Login error:', error.message);
      throw error; // Rethrow the error for further handling if needed
    })
  )
    
  }

    getTimeExpiration(token: String): string | null {       
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const values = JSON.parse(payloadDecoded);
        return values.exp;
      }

  get userToken() : String {
    return this.currentUser()
  }

}
