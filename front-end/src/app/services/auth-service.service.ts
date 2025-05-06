import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { UserLoginDTO } from '../core/model/dto/user-login-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private urlBase: string = environment.baseUrl + '/auth';

  private http  = inject(HttpClient);

  login(credentials: UserLoginDTO): Observable<any> {
    return this.http.post(`${this.urlBase}/login`, credentials, { observe: 'response' });
  }

}
