import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthServiceService } from "../../../services/auth-service.service";

@Injectable()
export class ClassInterceptor implements HttpInterceptor{

    private authService = inject(AuthServiceService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepting request:', req);
            const token = this.authService.userToken
            const modifiedReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Allow-Access-Control-Origin', '*')
                    .set('Authorization', `Bearer ${token}`)
            });
            return next.handle(modifiedReq);
    }

}